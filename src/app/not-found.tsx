import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import styles from "./home.module.css";

export default function NotFound() {
  return (
    <main className={styles.errorPage}>
      <p>404 / PATH UNAVAILABLE</p>
      <h1>This path is not part of the policy.</h1>
      <span>The page may have moved, or the address may be incomplete.</span>
      <Link href="/"><ArrowLeft aria-hidden="true" size={16} /> Return to QCertify</Link>
    </main>
  );
}
