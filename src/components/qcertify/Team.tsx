import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import styles from "./Team.module.css";

function LinkedinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.62 1.62 0 1 0 0-3.24 1.62 1.62 0 0 0 0 3.24m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  );
}

const teamMembers = [
  {
    name: "Gonçalo Magalhães",
    role: "CO-FOUNDER · ENGINEERING",
    title: "Co-Founder · Cryptographic Architecture & Systems",
    image: "/images/goncalo.png",
    imageClass: "goncaloImage" as const,
    linkedin: "https://www.linkedin.com/in/gon%C3%A7alo-magalh%C3%A3es-41671027b/",
    bio: "Leads core engineering, cryptographic systems architecture, and inline gateway infrastructure to deliver seamless, fail-closed post-quantum protection.",
    focusBadge: "CORE ENGINEERING · CRYPTOGRAPHIC SYSTEMS",
  },
  {
    name: "Gabriel Gestosa",
    role: "CO-FOUNDER · BUSINESS & PR",
    title: "Co-Founder · Business Development, PR & Strategy",
    image: "/images/gabriel.png",
    imageClass: "gabrielImage" as const,
    linkedin: "https://www.linkedin.com/in/gabrielnevesgestosa/",
    bio: "Drives enterprise partnerships, business development, communications, and public relations to accelerate commercial adoption and strategic stakeholder engagement.",
    focusBadge: "BUSINESS DEVELOPMENT · COMMUNICATIONS · PARTNERSHIPS",
  },
];

export function Team() {
  return (
    <section id="leadership" className={styles.teamSection} aria-labelledby="leadership-title">
      <span id="team" style={{ position: "absolute", top: 0, pointerEvents: "none" }} />
      <div className={styles.teamHeader}>
        <Reveal>
          <p className={styles.sectionLabel}>08 / EXECUTIVE LEADERSHIP</p>
          <h2 id="leadership-title" className={styles.teamTitle}>
            Engineered for trust. Led by founders.
          </h2>
          <p className={styles.teamLead}>
            Directing core cryptographic engineering, fail-closed platform architecture, and enterprise execution.
          </p>
        </Reveal>
      </div>

      <div className={styles.teamGrid}>
        {teamMembers.map((member, index) => (
          <Reveal key={member.name} delay={index * 0.08}>
            <article className={styles.teamCard}>
              <div className={styles.imageContainer}>
                <span className={styles.roleBadge}>{member.role}</span>
                <Image
                  src={member.image}
                  alt={`Portrait of ${member.name}`}
                  fill
                  sizes="(max-width: 860px) 100vw, 50vw"
                  className={`${styles.memberImage} ${styles[member.imageClass]}`}
                  priority={false}
                />
                <div className={styles.imageVignette} aria-hidden="true" />
              </div>

              <div className={styles.cardBody}>
                <div className={styles.cardHeader}>
                  <div className={styles.headerText}>
                    <h3 className={styles.memberName}>{member.name}</h3>
                    <p className={styles.memberTitle}>{member.title}</p>
                  </div>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkedinButton}
                    aria-label={`${member.name} on LinkedIn (opens in a new tab)`}
                  >
                    <LinkedinIcon size={14} />
                    <span>LinkedIn</span>
                    <ArrowUpRight size={13} strokeWidth={1.75} aria-hidden="true" />
                  </a>
                </div>

                <p className={styles.memberBio}>{member.bio}</p>

                <div className={styles.cardFooter}>
                  <span>{member.focusBadge}</span>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
