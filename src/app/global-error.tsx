"use client";

import { useEffect } from "react";
import "./globals.css";
import styles from "./home.module.css";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[ui] Unhandled page error", { digest: error.digest });
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main className={styles.errorPage}>
          <title>Something went wrong | QCertify</title>
          <p>SYSTEM / SAFE STATE</p>
          <h1>The interface stopped safely.</h1>
          <span>No action was completed. Retry the page or contact QCertify if the problem continues.</span>
          <button type="button" onClick={reset}>Try again</button>
        </main>
      </body>
    </html>
  );
}
