"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightOutlined } from "@ant-design/icons";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import ProductGrid from "@/components/product/ProductGrid";
import { categories, getAllProducts, getBestSellers } from "@/lib/data";

const IndexPage = () => {
  const allProducts = getAllProducts();
  const bestSellers = getBestSellers();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="relative h-[70vh] min-h-[500px] max-h-[700px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/assets/hero-banner.jpg"
              alt="Premium organic products"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/80 via-forest-dark/50 to-transparent" />
          </div>

          <div className="relative container mx-auto px-4 h-full flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-xl"
            >
              <span className="inline-block px-4 py-1.5 bg-gold/90 text-forest-dark text-sm font-semibold rounded-full mb-4">
                100% Natural & Organic
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
                Pure Goodness,
                <br />
                <span className="text-gold-light">Delivered Fresh</span>
              </h1>
              <p className="text-primary-foreground/90 text-lg mb-8 leading-relaxed">
                Discover our handpicked collection of premium organic products. From raw honey to
                pure ghee, we bring nature&apos;s finest to your table.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/collections/best-seller"
                  className="btn-hero-gold px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2"
                >
                  Shop Best Sellers
                  <ArrowRightOutlined />
                </Link>
                <Link
                  href="/collections/offer"
                  className="px-8 py-3 rounded-lg font-semibold border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
                >
                  View Offers
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Shop by Category
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our curated collections of premium organic products
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/collections/${category.slug}`} className="group block">
                    <div className="aspect-square rounded-xl overflow-hidden mb-3 bg-secondary">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <h3 className="font-display text-center font-semibold text-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-secondary/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10"
            >
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Best Sellers
                </h2>
                <p className="text-muted-foreground">Our most loved products by customers</p>
              </div>
              <Link
                href="/collections/best-seller"
                className="text-primary font-semibold hover:text-primary/80 inline-flex items-center gap-2 transition-colors"
              >
                View All
                <ArrowRightOutlined />
              </Link>
            </motion.div>

            <ProductGrid products={bestSellers} columns={4} />
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                All Products
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Browse our complete collection of premium organic products
              </p>
            </motion.div>

            <ProductGrid products={allProducts} columns={4} />
          </div>
        </section>

        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Get Fresh Updates
              </h2>
              <p className="text-primary-foreground/80 mb-8">
                Subscribe to our newsletter for exclusive offers and new product announcements
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-primary-foreground text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                />
                <button className="btn-hero-gold px-6 py-3 rounded-lg font-semibold whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default IndexPage;
