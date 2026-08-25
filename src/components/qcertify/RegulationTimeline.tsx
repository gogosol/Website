"use client";

import { useState, useEffect } from "react";
import styles from "@/app/home.module.css";
import { Reveal } from "@/components/qcertify/Reveal";
import { 
  ListChecks, 
  SlidersHorizontal, 
  KeyRound, 
  RefreshCw, 
  ClipboardCheck, 
  FileCheck,
  ExternalLink 
} from "lucide-react";

export function RegulationTimeline() {
  const [daysEUStart, setDaysEUStart] = useState(0);
  const [daysEUCritical, setDaysEUCritical] = useState(0);
  const [daysUSGoal, setDaysUSGoal] = useState(0);

  useEffect(() => {
    const calcDays = () => {
      const now = new Date().getTime();
      const euStart = new Date("2026-12-31T00:00:00").getTime();
      const euCritical = new Date("2030-12-31T00:00:00").getTime();
      const usGoal = new Date("2035-12-31T00:00:00").getTime();

      setDaysEUStart(Math.max(0, Math.floor((euStart - now) / (1000 * 60 * 60 * 24))));
      setDaysEUCritical(Math.max(0, Math.floor((euCritical - now) / (1000 * 60 * 60 * 24))));
      setDaysUSGoal(Math.max(0, Math.floor((usGoal - now) / (1000 * 60 * 60 * 24))));
    };

    calcDays();
    const interval = setInterval(calcDays, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, []);

  const milestones = [
    { date: "May 2023", title: "U.S. federal crypto inventories", position: "10%" },
    { date: "Aug 2024", title: "NIST PQC standards approved", position: "25%" },
    { date: "End 2026", title: "EU PQC transition begins", position: "45%" },
    { date: "Jan 2027", title: "NSS acquisitions align to CNSA 2.0", position: "55%" },
    { date: "Dec 2030", title: "EU critical infrastructure deadline", position: "75%" },
    { date: "2035", title: "U.S. quantum-resistance end-state goal", position: "95%" },
  ];

  const cards = [
    { 
      title: "Inventory cryptographic exposure", 
      desc: "Identify systems, services, data flows, trust dependencies, and paths carrying long-lived sensitive data.",
      icon: ListChecks
    },
    { 
      title: "Prioritize traffic paths", 
      desc: "Select paths where HNDL risk, regulatory pressure, or operational sensitivity justify early protection.",
      icon: SlidersHorizontal
    },
    { 
      title: "Plan trust readiness", 
      desc: "For paths that require trusted handling, prepare required trust through centralized enterprise processes before activation.",
      icon: KeyRound
    },
    { 
      title: "Stage crypto-agile controls", 
      desc: "Use policy to choose protected, exception, or denied paths rather than baking assumptions into apps.",
      icon: RefreshCw
    },
    { 
      title: "Collect evidence", 
      desc: "Track deployment state, protected-path coverage, operational signals, and exception decisions.",
      icon: ClipboardCheck
    },
    { 
      title: "Prepare assurance packages", 
      desc: "Turn technical progress into material that security, risk, procurement, and auditors can understand.",
      icon: FileCheck
    },
  ];

  const regulations = [
    {
      date: "Aug 2024",
      title: "NIST standards approved",
      desc: "First set of finalized post-quantum cryptographic standards published by NIST.",
      source: "Source: NIST CSRC",
      url: "https://csrc.nist.gov/news/2024/postquantum-cryptography-fips-approved"
    },
    {
      date: "May 2023",
      title: "U.S. federal inventory cadence (OMB M-23-02)",
      desc: "Memorandum on migrating to post-quantum cryptography.",
      source: "Source: OMB M-23-02",
      url: "https://www.whitehouse.gov/wp-content/uploads/2022/11/M-23-02-M-Memo-on-Migrating-to-Post-Quantum-Cryptography.pdf"
    },
    {
      date: "End 2026",
      title: "EU transition starts",
      desc: "EU reinforces its cybersecurity post-quantum cryptography.",
      source: "Source: European Commission",
      url: "https://digital-strategy.ec.europa.eu/en/news/eu-reinforces-its-cybersecurity-post-quantum-cryptography"
    },
    {
      date: "Jan 2027",
      title: "NSS new acquisitions",
      desc: "Commercial National Security Algorithm Suite 2.0 FAQ.",
      source: "Source: NSA CNSA 2.0 FAQ",
      url: "https://media.defense.gov/2022/Sep/07/2003071836/-1/-1/0/CSI_CNSA_2.0_FAQ_.PDF"
    },
    {
      date: "Dec 2030",
      title: "Critical paths cannot wait",
      desc: "Coordinated implementation roadmap for transition to post-quantum cryptography.",
      source: "Source: EU PQC Roadmap",
      url: "https://digital-strategy.ec.europa.eu/en/library/coordinated-implementation-roadmap-transition-post-quantum-cryptography"
    }
  ];

  return (
    <div className={styles.regulationTimeline}>
      <Reveal delay={0.1}>
        <div className={styles.timelineContainer}>
          <div className={styles.timelineTrack}>
            <div className={styles.timelineHeader}>
              <span>GLOBAL COMPLIANCE TIMELINE</span>
              <span>
                <i />
                LIVE TRACKING
              </span>
            </div>

            <div className={styles.timelineAxis}>
              <div className={styles.timelineAxisLine} />
              
              <div className={styles.timelineTick} style={{ left: "10%" }}>
                <span>2023</span>
              </div>
              <div className={styles.timelineTick} style={{ left: "30%" }}>
                <span>2025</span>
              </div>
              <div className={styles.timelineTick} style={{ left: "50%" }}>
                <span>2027</span>
              </div>
              <div className={styles.timelineTick} style={{ left: "75%" }}>
                <span>2030</span>
              </div>
              <div className={styles.timelineTick} style={{ left: "95%" }}>
                <span>2035</span>
              </div>

              {milestones.map((milestone, i) => (
                <div 
                  key={i} 
                  className={`${styles.timelineMilestone} ${i % 2 === 0 ? styles.timelineMilestoneAbove : styles.timelineMilestoneBelow}`}
                  style={{ left: milestone.position }}
                >
                  <div className={styles.timelineMilestoneDot} />
                  <div className={styles.timelineMilestoneCard}>
                    <small>{milestone.date}</small>
                    <strong>{milestone.title}</strong>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.timelineMobileList}>
              {milestones.map((milestone, i) => (
                <div key={i} className={styles.timelineMobileItem}>
                  <small>{milestone.date}</small>
                  <strong>{milestone.title}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.countdownGrid}>
            <div className={styles.countdownItem}>
              <small>EU TRANSITION START</small>
              <div className={styles.countdownValue}>
                <span>{daysEUStart}</span>
                <span>DAYS</span>
              </div>
            </div>
            <div className={styles.countdownItem}>
              <small>EU CRITICAL INFRASTRUCTURE</small>
              <div className={styles.countdownValue}>
                <span>{daysEUCritical}</span>
                <span>DAYS</span>
              </div>
            </div>
            <div className={styles.countdownItem}>
              <small>U.S. END-STATE GOAL</small>
              <div className={styles.countdownValue}>
                <span>{daysUSGoal}</span>
                <span>DAYS</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.25}>
        <div className={styles.readinessGrid}>
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} className={styles.readinessCard}>
                <div className={styles.readinessIcon}>
                  <Icon size={18} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={0.35}>
        <div className={styles.regulationEntries}>
          {regulations.map((reg, i) => (
            <a 
              key={i} 
              href={reg.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.regulationEntry}
              style={{ textDecoration: "none" }}
            >
              <small>{reg.date}</small>
              <div>
                <h4>{reg.title}</h4>
                <p>{reg.desc}</p>
                <span>{reg.source}</span>
              </div>
              <ExternalLink size={14} />
            </a>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
