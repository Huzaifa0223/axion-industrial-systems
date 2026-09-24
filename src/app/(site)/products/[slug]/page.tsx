import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProducts, getProduct } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Check, FileText } from "lucide-react";

export function generateStaticParams() {
  const { categories } = getProducts();
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getProduct(slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-text-muted mb-6 uppercase tracking-widest">
          <Link href="/" className="hover:text-accent">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-accent">Products</Link>
          <span>/</span>
          <span className="text-accent">{category.title}</span>
        </div>

        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-accent mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Categories</span>
        </Link>

        {/* Hero Card */}
        <div className="relative rounded-3xl bg-surface border border-border p-8 sm:p-12 mb-16 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-accent">
                <Icon name={category.icon} className="w-6 h-6" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider">
                  Hardware Series
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-display font-bold text-text tracking-tight">
                {category.title}
              </h1>
              <p className="text-base sm:text-lg text-text-muted max-w-2xl leading-relaxed">
                {category.summary}
              </p>
              <div className="pt-4">
                <Button href="/contact" size="md" variant="primary">
                  Request Pricing & Lead Time
                </Button>
              </div>
            </div>

            <div className="lg:col-span-4 relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-border shadow-lg">
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Product Items Specification Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-2xl font-display font-bold text-text">
              Available Models & Technical Specifications
            </h2>
            <span className="text-xs font-mono text-accent">
              {category.items.length} Configured Models
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.items.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-surface border border-border hover:border-accent/40 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-accent font-semibold">
                      Model #{idx + 1}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-raised border border-border text-text-muted">
                      In Stock / Fast Dispatch
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-text mb-4">
                    {item.name}
                  </h3>

                  <ul className="space-y-2 mb-6">
                    {item.specs.map((spec, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2 text-xs text-text-muted">
                        <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-border/40 flex items-center justify-between text-xs">
                  <span className="text-text-muted/60 flex items-center gap-1 font-mono">
                    <FileText className="w-3.5 h-3.5" />
                    Datasheet available
                  </span>
                  <Link
                    href={`/contact?interest=${encodeURIComponent(category.title)}`}
                    className="font-semibold text-primary hover:text-accent transition-colors"
                  >
                    Enquire →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
