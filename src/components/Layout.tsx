import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AdSlot } from "./AdSlot";

interface LayoutProps {
  children: ReactNode;
  showHeaderAd?: boolean;
  showFooterAd?: boolean;
}

export function Layout({ children, showHeaderAd = true, showFooterAd = true }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {showHeaderAd && (
        <div className="mx-auto max-w-7xl w-full px-4 pt-2">
          <AdSlot variant="header" />
        </div>
      )}
      <main className="flex-1">{children}</main>
      {showFooterAd && (
        <div className="mx-auto max-w-7xl w-full px-4 pt-12">
          <AdSlot variant="footer" />
        </div>
      )}
      <Footer />
    </div>
  );
}
