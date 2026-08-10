# Historical Secret Incident Response — QCertify Website

This runbook governs a confirmed credential exposure in this repository's
reachable Git history. It deliberately contains no credential values.

Removing a secret from Git is not containment. **Rotate or revoke the affected
credential first.** A value removed from history can still exist in clones,
forks, pull-request refs, GitHub's own caches, CI logs, OneDrive, backups and
chat transcripts.

## Confirmed evidence

Verified with `gitleaks 8.30.1` (`gitleaks git`, the same pinned version and
scan mode QuantumHalon and Vendor_Plane gate on) without printing the value:

| Field | Value |
| --- | --- |
| Commit | `9564c5bda7da95185116a384f1050af6c6f8a17e` ("Resend API", 2026-04-14) |
| Path | `.dev.vars` |
| Material | Live Resend transactional-email API key (`RESEND_API_KEY`) |
| Rule | `generic-api-key`, Shannon entropy 4.63 |
| Reachability | Ancestor of `main` **and `origin/main`** — published on GitHub |

Commit `05f2555` ("chore: remove leaked .dev.vars from index") removed the file
from the index. **That did not remediate anything.** It removed the file from
the working tree and from future checkouts; the blob stayed reachable from
`main`, so the key remained readable by anyone who could read the repository,
and by every clone and fork already taken. At the time of writing there are 25
commits on top of it.

## Why it was not caught

QuantumHalon gates every push with a full-history gitleaks scan, and
Vendor_Plane has had the equivalent since 2026-08-04. **This repository had no
CI at all**, so nothing ever looked at it. The sibling repositories were green
because they were the only ones being checked.

`.github/workflows/secret-scan.yml` closes that gap: same pinned scanner, same
full-history surface, plus an explicit refusal to track `.dev.vars` again.

## Blast radius

A Resend API key authorises sending mail as the verified sending domain. Assume
an adversary holding it could:

- send mail that authentically originates from the qcertify.io sending domain,
  which is a credible phishing primitive against customers and prospects;
- read the account's delivery metadata (recipients, subjects, timestamps) via
  the Resend API, i.e. the contact-form correspondents;
- consume quota or damage domain reputation.

The key is used by the contact form only (`src/app/api/contact/route.ts:75`,
via `process.env.RESEND_API_KEY`). The current tree reads it from the
environment and ships only a placeholder in `.env.example`; no live value is
tracked today.

## Phase 1 — contain and rotate (do this first, and independently of Git)

1. Revoke the exposed key in the Resend dashboard (API Keys → revoke). Do not
   wait for the history rewrite; revocation is what ends the exposure.
2. Issue a replacement key and store it only in the deployment platform's secret
   store and in a local `.dev.vars`, which is gitignored.
3. Review Resend's sending and API logs from 2026-04-14 onward for sends or API
   calls the team does not recognise.
4. Confirm SPF/DKIM/DMARC on the sending domain, and review DMARC aggregate
   reports over the same window for unfamiliar sources.
5. Record the revocation time. Everything before it is the exposure window.

## Phase 2 — history rewrite: DONE 2026-08-10

Performed with the owner's explicit approval, with `git-filter-repo` 2.47.0 in an
isolated `--mirror` clone, never from an active working copy.

```sh
git clone --mirror git@github.com:gogosol/Website.git
cd Website.git
git filter-repo --invert-paths --path .dev.vars --force
git push --force origin 'refs/heads/*:refs/heads/*'
```

Refs before the rewrite (recorded first, per this runbook):

| Ref | Before | After |
| --- | --- | --- |
| `refs/heads/main` | `0005501` | `dcd007d` |
| `refs/heads/cloudflare/workers-autoconfig` | `2b315cb` | `e5dcd49` |
| `refs/heads/cloudflare/workers-autoconfig-2` | `ba84ce3` | `c65dd71` |

There were no tags, and no unpushed local commits.

Verification:

- `gitleaks git --log-opts=--all` on the rewritten mirror: **no leaks found**
  (it reported the leak on the same mirror before the rewrite).
- `.dev.vars` appears in no commit on any branch.
- The `main` HEAD **tree hash is unchanged** at `a1fe43e`, and the commit count
  is unchanged at 51 — the rewrite removed the blob from history and changed no
  file content.
- A fresh **normal** `git clone` of the remote scans clean.

## Residual exposure — NOT closed by the rewrite

**`refs/pull/1/merge` and `refs/pull/2/merge` still contain the original
commits**, including the credential blob. These are GitHub-generated refs for
open pull requests #1 and #2. They cannot be force-pushed or deleted by a
client; force-pushing the head branches updated `refs/pull/N/head` but left the
computed `/merge` refs pointing at the old graph.

They are not fetched by a normal `git clone`, but they are reachable to anyone
who fetches `refs/pull/*`, and the original commit remains retrievable by SHA
through the GitHub web UI and API until GitHub garbage-collects it.

To close this out:

1. Close or merge PRs #1 and #2 so the merge refs stop being maintained.
2. Ask GitHub Support to expire the unreachable objects and cached commit views
   for `9564c5bd…` and `05f2555…`.
3. Confirm no fork of this repository exists; a fork is a separate repository and
   is not rewritten by a force-push here.

Every collaborator must re-clone. A stale clone still holds the old graph and
will reintroduce it on its next push. Locally, `git stash` entries created before
the rewrite also pin the old objects.

**None of this replaces revoking the key.** Rewriting history narrows who can
stumble onto the value; only revocation ends what the value can do.
