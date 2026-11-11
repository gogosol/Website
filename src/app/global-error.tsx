"use client";
import { useEffect } from "react";
import "./globals.css";
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error("[ui] Unhandled page error", { digest: error.digest }); }, [error]);
  return <html lang="en"><body><main className="container error-page"><title>Something went wrong | QCertify</title><p className="eyebrow">Page unavailable</p><h1>We couldn’t load this page.</h1><p>Try again, or email contact@qcertify.io if the problem continues.</p><button type="button" className="button" onClick={reset}>Try again</button></main></body></html>;
}
