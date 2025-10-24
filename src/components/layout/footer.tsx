"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex h-12 items-center justify-between px-6 text-sm">
        <div className="flex items-center gap-2 text-success">
          <CheckCircle className="h-4 w-4" />
          <span className="text-muted-foreground">All changes saved</span>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition">
            Privacy
          </Link>
          <Link href="/terms" className="text-muted-foreground hover:text-foreground transition">
            Terms
          </Link>
          <span className="text-muted-foreground">v1.0.0</span>
        </div>
      </div>
    </footer>
  );
}
