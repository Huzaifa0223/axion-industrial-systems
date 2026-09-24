"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Send, CheckCircle2, Linkedin, Twitter, Youtube, MapPin, Phone, Mail, Clock } from "lucide-react";

interface FooterProps {
  site: any;
}

export function Footer({ site }: FooterProps) {
  const currentYear = new Date().getFullYear().toString();
  const copyrightText = site.footer.copyright.replace("{year}", currentYear);

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Mock subscription
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setEmail("");
    }, 600);
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "linkedin":
        return <Linkedin className="w-4 h-4" />;
      case "x":
      case "twitter":
        return <Twitter className="w-4 h-4" />;
      case "youtube":
        return <Youtube className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-surface border-t border-border/80 pt-16 pb-12 mt-20 relative overflow-hidden">
      {/* Background glow ornament */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-border/60">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={site.brand.logo.mark}
                alt={site.brand.name}
                width={36}
                height={36}
                className="w-9 h-9"
              />
              <span className="font-display font-bold text-2xl tracking-tight text-text">
                {site.brand.name}
              </span>
            </Link>
            <p className="text-sm text-text-muted max-w-sm leading-relaxed">
              {site.seo.description}
            </p>
            <div className="flex items-center gap-3 pt-2">
              {site.social.map((s: any) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${s.platform} page`}
                  className="w-9 h-9 rounded-full bg-surface-raised border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/40 transition-colors"
                >
                  {getSocialIcon(s.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-text">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {site.footer.quickLinks.map((link: any) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-muted hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-text">
              Headquarters
            </h4>
            <ul className="space-y-3 text-xs text-text-muted">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>{site.contact.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{site.contact.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{site.contact.email}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{site.contact.hours}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-text">
              {site.footer.newsletter.title}
            </h4>
            <p className="text-xs text-text-muted leading-relaxed">
              {site.footer.newsletter.subtitle}
            </p>
            {submitted ? (
              <div className="flex items-center gap-2 text-xs text-success bg-success/10 p-3 rounded-lg border border-success/20">
                <CheckCircle2 className="w-4 h-4" />
                <span>You are subscribed. Thank you!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-surface-raised border border-border text-text placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    aria-label="Subscribe to newsletter"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-primary hover:bg-primary-hover text-white rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar & Giant Wordmark Watermark */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>{copyrightText}</p>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Verified ISO 9001 Integration
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
