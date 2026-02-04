import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { HomeOutlined, MinusOutlined, PlusOutlined, WhatsAppOutlined, MessageOutlined, SafetyCertificateOutlined, CarOutlined } from '@ant-design/icons';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import ProductGrid from '@/components/product/ProductGrid';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from '@/components/ui/accordion';
import { useCartContext } from '@/contexts/CartContext';
import useRecentlyViewed from '@/hooks/useRecentlyViewed';
import { getProductBySlug, getCategoryBySlug, getProductsByCategory } from '@/lib/data';
const ProductPage = () => {
  const { category, slug } = useParams();
  const product = getProductBySlug(slug || '');
  const currentCategory = getCategoryBySlug(category || '');
  const { addItem, openCart } = useCartContext();
  const { products: recentlyViewed, addProduct } = useRecentlyViewed();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  // Add to recently viewed
  useEffect(() => {
    if (product) {
      addProduct(product);
    }
  }, [product, addProduct]);
  if (!product || !currentCategory) {
    return (<div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">
            Product Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist.
          </p>
          <Link to="/" className="btn-hero-primary px-6 py-3 rounded-lg inline-block">
            Go Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>);
  }
  const savings = product.oldPrice ? product.oldPrice - product.price : 0;
  const relatedProducts = getProductsByCategory(product.categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);
  const filteredRecentlyViewed = recentlyViewed
    .filter((p) => p.id !== product.id)
    .slice(0, 4);
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    }, quantity);
    openCart();
  };
  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in ${product.name} (৳${product.price})`;
    window.open(`https://wa.me/8801234567890?text=${encodeURIComponent(message)}`, '_blank');
  };
  return (<>
    <Helmet>
      <title>{product.name} | TanzeenFood</title>
      <meta name="description" content={product.description} />
      <meta property="og:title" content={`${product.name} | TanzeenFood`} />
      <meta property="og:description" content={product.description} />
      <meta property="og:image" content={product.images[0]} />
      <meta property="og:type" content="product" />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": product.name,
          "image": product.images,
          "description": product.description,
          "offers": {
            "@type": "Offer",
            "priceCurrency": "BDT",
            "price": product.price,
            "availability": product.inStock
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock"
          }
        })}
      </script>
    </Helmet>

    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-background">
        {/* Breadcrumb */}
        <div className="bg-secondary/50 py-4">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                <HomeOutlined />
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link to={`/collections/${category}`} className="text-muted-foreground hover:text-foreground transition-colors">
                {currentCategory.name}
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Details */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Images */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex gap-4">
                {/* Thumbnails */}
                <div className="hidden sm:flex flex-col gap-3">
                  {product.images.map((image, index) => (<button key={index} onClick={() => setSelectedImage(index)} className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index
                    ? 'border-accent'
                    : 'border-transparent hover:border-border'}`}>
                    <img src={image} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>))}
                </div>

                {/* Main Image */}
                <div className="flex-1 aspect-square rounded-xl overflow-hidden bg-secondary">
                  <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
                </div>
              </motion.div>

              {/* Product Info */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div>
                  <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {product.name}
                  </h1>

                  {/* Price */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl font-bold text-forest">৳{product.price}</span>
                    {product.oldPrice && (<>
                      <span className="text-xl text-muted-foreground line-through opacity-60">
                        ৳{product.oldPrice}
                      </span>
                      <span className="price-save">
                        You save ৳{savings}
                      </span>
                    </>)}
                  </div>

                  {/* Stock Status */}
                  <p className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-destructive'}`}>
                    {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                  </p>
                </div>

                {/* Quantity & Add to Cart */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-muted-foreground">Quantity:</span>
                    <div className="flex items-center border border-border rounded-lg">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors">
                        <MinusOutlined />
                      </button>
                      <span className="w-12 text-center font-medium">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors">
                        <PlusOutlined />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button onClick={handleAddToCart} disabled={!product.inStock} className="flex-1 btn-hero-gold py-6 text-lg">
                      Add to Cart
                    </Button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" className="flex-1 py-5">
                      <SafetyCertificateOutlined className="mr-2" />
                      Cash on Delivery
                    </Button>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={handleWhatsApp} className="flex-1">
                      <WhatsAppOutlined className="mr-2" />
                      WhatsApp Us
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <MessageOutlined className="mr-2" />
                      Messenger
                    </Button>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-4 py-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CarOutlined className="text-primary" />
                    <span>Free delivery over ৳1000</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <SafetyCertificateOutlined className="text-primary" />
                    <span>100% Authentic</span>
                  </div>
                </div>

                {/* Description & Details */}
                <Accordion type="single" collapsible defaultValue="description">
                  <AccordionItem value="description">
                    <AccordionTrigger className="font-display text-lg">
                      Description
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {product.description}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="details">
                    <AccordionTrigger className="font-display text-lg">
                      Product Details
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {product.details.map((detail, index) => (<li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <span className="text-gold mt-1">•</span>
                          {detail}
                        </li>))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </motion.div>
            </div>
          </div>
        </section>

        {/* You Might Also Like */}
        {relatedProducts.length > 0 && (<section className="py-12 bg-secondary/50">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
              You Might Also Like
            </h2>
            <ProductGrid products={relatedProducts} columns={4} />
          </div>
        </section>)}

        {/* Recently Viewed */}
        {filteredRecentlyViewed.length > 0 && (<section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
              Recently Viewed
            </h2>
            <ProductGrid products={filteredRecentlyViewed} columns={4} />
          </div>
        </section>)}
      </main>

      <Footer />
    </div>
  </>);
};
export default ProductPage;
