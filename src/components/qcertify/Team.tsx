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
    role: "CO-FOUNDER · CTO",
    title: "Technical Co-Founder & Cryptographic Architect",
    image: "/images/goncalo.png",
    linkedin: "https://www.linkedin.com/in/gon%C3%A7alo-magalh%C3%A3es-41671027b/",
    bio: "Leads cryptographic architecture, hybrid post-quantum key establishment (X25519 + ML-KEM), Dual-Cert authentication protocols, and hardware-enforced fail-closed inline gateway infrastructure.",
    focusBadge: "CRYPTOGRAPHIC ARCHITECTURE · INLINE DATA PLANE",
  },
  {
    name: "Gabriel Gestosa",
    role: "CO-FOUNDER · GROWTH & STRATEGY",
    title: "Co-Founder · Business Development, PR & Strategy",
    image: "/images/gabriel.png",
    linkedin: "https://www.linkedin.com/in/gabrielnevesgestosa/",
    bio: "Drives enterprise partnerships, business development, communications, and institutional regulatory alignment across global quantum transition mandates.",
    focusBadge: "BUSINESS DEVELOPMENT · PR · STRATEGIC GROWTH",
  },
];

export function Team() {
  return (
    <section id="team" className={styles.teamSection} aria-labelledby="team-title">
      <div className={styles.teamHeader}>
        <Reveal>
          <p className={styles.sectionLabel}>08 / LEADERSHIP &amp; FOUNDERS</p>
          <h2 id="team-title" className={styles.teamTitle}>
            Architected by cryptographers &amp; builders.
          </h2>
          <p className={styles.teamLead}>
            Directing quantum-safe protocol engineering, enterprise transition governance, and global regulatory execution.
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
                  className={styles.memberImage}
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
