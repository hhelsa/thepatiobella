import type { ReactNode } from "react";

import { Header } from "../home/Header";
import { SiteFooter } from "../home/SiteFooter";

/** Header, page content and the shared canopy footer. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <div className="on-canopy bg-canopy text-light">
        <SiteFooter />
      </div>
    </>
  );
}
