import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { ArrowRight, Boxes } from "lucide-react";

export default function ProductsPage() {
  const { categories } = getProducts();

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted mb-4 uppercase tracking-widest">
            <Link href="/" className="hover:text-accent">Home</Link>
            <span>/</span>
            <span className="text-accent">Products</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-text tracking-tight">
            Industrial Hardware & Automation Systems
          </h1>
          <p className="mt-4 text-lg text-text-muted">
            Official distributor of precision controllers, robotics, vision, motion, and sensor technology from world-leading automation manufacturers.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products/${cat.slug}`}
              className="group flex flex-col rounded-2xl bg-surface border border-border overflow-hidden hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300"
            >
              <div className="relative w-full h-44 overflow-hidden bg-surface-raised">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
                <div className="absolute bottom-3 left-4 p-2.5 rounded-xl bg-surface-raised/90 backdrop-blur-md border border-border text-primary group-hover:text-accent group-hover:-translate-y-1 transition-all shadow-md">
                  <Icon name={cat.icon} className="w-5 h-5" />
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-text group-hover:text-accent transition-colors">
                    {cat.title}
                  </h3>
                  <p className="mt-2 text-xs text-text-muted line-clamp-3 leading-relaxed">
                    {cat.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/40 flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1.5 font-mono text-text-muted">
                    <Boxes className="w-3.5 h-3.5 text-accent" />
                    {cat.items.length} Series
                  </span>
                  <span className="font-semibold text-primary group-hover:text-accent flex items-center gap-1">
                    Details
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
