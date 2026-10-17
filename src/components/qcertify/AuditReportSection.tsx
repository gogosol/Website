import { ArrowDownToLine, FileText } from "lucide-react";
import { Reveal } from "./Reveal";
import pageStyles from "@/app/home.module.css";
import styles from "./GovernanceSections.module.css";

const reportContents = [
  ["Scope & coverage", "The organisation or gateway, the period covered, and the records included."],
  ["Recorded activity", "Who did what and when: sign-ins, policy changes, certificate actions, and administrative operations."],
  ["Gateway reports", "Reported configuration changes, command outcomes, and security events, including fallbacks and authentication failures."],
  ["Integrity evidence", "A digitally signed PDF with supporting records and verification material for independent review."],
];

export function AuditReportSection() {
  return (
    <section id="audit-reports" className={`${pageStyles.section} ${styles.section}`} aria-labelledby="audit-reports-title">
      <Reveal className={styles.heading}>
        <div>
          <p className={pageStyles.sectionLabel}>09 / AUDIT REPORTS</p>
          <h2 id="audit-reports-title">The activity record.<br /><span>Ready for review.</span></h2>
        </div>
        <p className={styles.lead}>
          Download an audit report from the QuantumHalon platform and share it with
          your auditors. It brings the recorded actions and gateway reports together
          in a PDF they can examine and verify independently.
        </p>
      </Reveal>

      <Reveal className={styles.auditBoundary}>
        <FileText size={23} strokeWidth={1.4} aria-hidden="true" />
        <div>
          <h3>Evidence for an audit. Not a certified audit.</h3>
          <p>
            This is a platform-generated activity report, not an independent audit
            opinion, certification, or guarantee of compliance. The auditor assesses
            the evidence and draws their own conclusions.
          </p>
        </div>
      </Reveal>

      <div className={styles.auditLayout}>
        <Reveal>
          <div className={styles.reportContents}>
            <p className={styles.eyebrow}>WHAT YOUR AUDITOR RECEIVES</p>
            <dl>
              {reportContents.map(([title, description]) => (
                <div key={title}>
                  <dt>{title}</dt>
                  <dd>{description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <Reveal className={styles.downloadGuide} delay={0.08}>
          <div className={styles.downloadHeader}>
            <ArrowDownToLine size={22} strokeWidth={1.4} aria-hidden="true" />
            <span>AVAILABLE IN THE PLATFORM</span>
          </div>
          <h3>Choose the report scope.</h3>
          <div className={styles.downloadOption}>
            <h4>Organisation report</h4>
            <p>Open <strong>Audit</strong> and select <strong>Download audit report</strong>.</p>
          </div>
          <div className={styles.downloadOption}>
            <h4>Individual gateway report</h4>
            <p>Open the gateway’s <strong>Change history &amp; rollback</strong> and select <strong>Download this gateway’s audit report</strong>.</p>
          </div>
          <p className={styles.downloadNote}>Downloads are available to users with permission to read the audit trail.</p>
        </Reveal>
      </div>

      <Reveal className={styles.coverageNote}>
        <p>
          <strong>Coverage is explicit.</strong> The report describes what the platform
          recorded within its scope. Gateway history depends on retained data and export
          limits; the report states its coverage and any omitted gateway records.
        </p>
        <p>
          <strong>A signature protects document integrity.</strong> It helps an auditor
          check whether the exported file has changed. It does not certify the
          organisation or its controls.
        </p>
      </Reveal>
    </section>
  );
}
