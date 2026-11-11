"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { FileCheck2, ArrowRight } from "lucide-react";
import styles from "./EvidencePreview.module.css";

const sections = [
  {
    label: "Scope",
    title: "Know what the evidence covers.",
    description: "The report identifies its source, period and boundaries before presenting the records.",
    fields: [
      ["Organisation & control plane", "Identifies the organisation and the control plane that generated the report."],
      ["Report scope", "All recorded activity, or activity associated with one selected gateway."],
      ["Period & record count", "The period and number of ledger records included in the export."],
      ["Generation details", "When the report was generated and which authorised account requested it."],
    ],
    note: "A report reflects the records held by the control plane. It does not establish complete visibility across an organisation.",
  },
  {
    label: "Actions",
    title: "Trace a decision to its record.",
    description: "The ledger records administrative actions and policy changes with the context needed for review.",
    fields: [
      ["Actor", "The account or system responsible for the recorded action."],
      ["Action & time", "What happened and when: for example, a sign-in or a configuration publication."],
      ["Change details", "The recorded scope and details of policy, certificate and administrative activity."],
      ["Sequence", "The record's position in the signed ledger chain."],
    ],
    note: "An action record provides traceability. It does not, by itself, prove the effectiveness of an organisation's security controls.",
  },
  {
    label: "Gateway events",
    title: "Review what enforcement reported.",
    description: "Gateway reports connect management decisions with reported operational and security outcomes.",
    fields: [
      ["Gateway identity", "The gateway associated with the reported event."],
      ["Configuration activity", "Reported configuration activations and signed-command results."],
      ["Security events", "Reported authentication failures, cryptographic fallbacks and related events."],
      ["Outcome & reference", "The result and identifying reference retained by the control plane."],
    ],
    note: "Gateway reports cover the retained telemetry window. They arrive over authenticated connections and are covered by the PDF signature, not individual gateway signatures.",
  },
  {
    label: "Integrity",
    title: "Check the evidence independently.",
    description: "The export includes verification material so an auditor can examine the records outside QuantumHalon.",
    fields: [
      ["Ledger chain", "Individual record signatures, sequence continuity and links to preceding records."],
      ["PDF signature", "An ECDSA P-384 document signature covering the report."],
      ["Verification material", "Embedded ledger records, public key and a verification script for independent checking."],
      ["Witness status", "Whether an external witness anchors the ledger, and the recorded extent of that anchoring."],
    ],
    note: "Integrity verification detects changes within its verification scope. It is not independent certification of the product or of an organisation's compliance.",
  },
];

export function EvidencePreview() {
  const id = useId();
  const [selected, setSelected] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const section = sections[selected];

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % sections.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + sections.length) % sections.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = sections.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    buttons.current[next]?.focus();
  }

  return (
    <div className={styles.preview}>
      <div className={styles.heading}>
        <span className={styles.document}><FileCheck2 size={20} aria-hidden="true" /> QuantumHalon audit report</span>
        <span className={styles.label}>Illustrative report anatomy</span>
      </div>
      <div className={styles.tabs} role="tablist" aria-label="Explore audit report contents">
        {sections.map((item, index) => (
          <button
            key={item.label}
            ref={(element) => { buttons.current[index] = element; }}
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-selected={selected === index}
            aria-controls={`${id}-panel-${index}`}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => navigate(event, index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {sections.map((item, index) => (
        <div
          key={item.label}
          role="tabpanel"
          id={`${id}-panel-${index}`}
          aria-labelledby={`${id}-tab-${index}`}
          tabIndex={0}
          hidden={selected !== index}
          className={styles.panel}
        >
          <div className={styles.intro}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
          <dl className={styles.fields}>
            {item.fields.map(([field, meaning]) => (
              <div key={field}>
                <dt><ArrowRight size={14} aria-hidden="true" />{field}</dt>
                <dd>{meaning}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
      <p className={styles.note}>{section.note}</p>
      <p className={styles.disclaimer}>This guide explains report contents. It contains no customer records and is not an exported product report.</p>
    </div>
  );
}
