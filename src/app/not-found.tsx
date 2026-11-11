import Link from "next/link";
export default function NotFound() {
  return <section className="container error-page"><p className="eyebrow">404 / Page not found</p><h1>Let’s get you back on the right path.</h1><p>The address may be incomplete, or the page may have moved. Explore QuantumHalon or return to the homepage.</p><div className="actions"><Link prefetch={false} className="button" href="/">Return to QCertify</Link><Link prefetch={false} className="button-secondary" href="/platform">Explore the platform</Link><Link prefetch={false} className="button-secondary" href="/demo?intent=demo">Request a demo</Link></div></section>;
}
