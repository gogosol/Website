/**
 * Worker entry for the Cloudflare Workers deployment (wrangler.jsonc).
 *
 * Static files in out/ are served by Workers static assets, which also apply _headers and
 * _redirects. Only requests matching `run_worker_first` (/api/*) reach this script: /api/contact
 * runs the same handler as the Pages Function, and any other /api/ path falls through to the
 * assets, which answer with 404.html.
 */
import { onRequest, type ContactEnv } from "../functions/api/contact";

interface Env extends ContactEnv {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (new URL(request.url).pathname === "/api/contact") return onRequest({ request, env });
    return env.ASSETS.fetch(request);
  },
};

export default worker;
