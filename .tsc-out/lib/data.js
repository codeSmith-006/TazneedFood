// Product and Category Data
export const categories = [
    {
        id: "1",
        name: "Offer Zone",
        slug: "offer",
        description: "Special discounts and deals",
        image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400"
    },
    {
        id: "2",
        name: "Best Seller",
        slug: "best-seller",
        description: "Our most popular products",
        image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400"
    },
    {
        id: "3",
        name: "Oil",
        slug: "oil",
        description: "Premium quality natural oils",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400"
    },
    {
        id: "4",
        name: "Ghee",
        slug: "ghee",
        description: "Pure traditional ghee",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400"
    },
    {
        id: "5",
        name: "Dates",
        slug: "dates",
        description: "Premium quality dates",
        image: "https://images.unsplash.com/photo-1593164842264-854604db2260?w=400"
    },
    {
        id: "6",
        name: "Honey",
        slug: "honey",
        description: "Pure organic honey",
        image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400"
    }
];
export const products = [
    // Honey Products
    {
        id: "h1",
        name: "Black Seed Honey",
        slug: "black-seed-honey",
        category: "Honey",
        categorySlug: "honey",
        price: 850,
        oldPrice: 1000,
        description: "Premium quality black seed honey sourced from the finest apiaries. Rich in nutrients and natural enzymes.",
        details: [
            "100% Pure & Natural",
            "Rich in antioxidants",
            "No artificial additives",
            "Net Weight: 500g"
        ],
        images: [
            "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600",
            "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600"
        ],
        inStock: true,
        isBestSeller: true,
        isOffer: true
    },
    {
        id: "h2",
        name: "Sundarban Raw Honey",
        slug: "sundarban-raw-honey",
        category: "Honey",
        categorySlug: "honey",
        price: 750,
        oldPrice: 900,
        description: "Authentic raw honey from the Sundarbans mangrove forest. Unprocessed and full of natural goodness.",
        details: [
            "Sourced from Sundarbans",
            "Raw & Unprocessed",
            "Traditional collection method",
            "Net Weight: 500g"
        ],
        images: [
            "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600"
        ],
        inStock: true,
        isBestSeller: true
    },
    {
        id: "h3",
        name: "Litchi Flower Honey",
        slug: "litchi-flower-honey",
        category: "Honey",
        categorySlug: "honey",
        price: 650,
        description: "Delicate and fragrant honey from litchi orchards. Light color with a distinctive floral taste.",
        details: [
            "Light & Floral",
            "Perfect for tea",
            "No preservatives",
            "Net Weight: 400g"
        ],
        images: [
            "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600"
        ],
        inStock: true
    },
    // Oil Products
    {
        id: "o1",
        name: "Black Seed Oil",
        slug: "black-seed-oil",
        category: "Oil",
        categorySlug: "oil",
        price: 550,
        oldPrice: 650,
        description: "Cold-pressed black seed oil known for its numerous health benefits. Perfect for daily wellness routine.",
        details: [
            "Cold Pressed",
            "100% Pure",
            "Rich in Thymoquinone",
            "Volume: 250ml"
        ],
        images: [
            "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600"
        ],
        inStock: true,
        isOffer: true
    },
    {
        id: "o2",
        name: "Extra Virgin Olive Oil",
        slug: "extra-virgin-olive-oil",
        category: "Oil",
        categorySlug: "oil",
        price: 950,
        description: "Premium imported extra virgin olive oil. Perfect for cooking and dressing.",
        details: [
            "First Cold Press",
            "Imported from Spain",
            "Low Acidity",
            "Volume: 500ml"
        ],
        images: [
            "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600"
        ],
        inStock: true,
        isBestSeller: true
    },
    {
        id: "o3",
        name: "Coconut Oil Pure",
        slug: "coconut-oil-pure",
        category: "Oil",
        categorySlug: "oil",
        price: 450,
        description: "Pure virgin coconut oil for cooking, skincare, and haircare. Multi-purpose natural oil.",
        details: [
            "Virgin Coconut Oil",
            "Multi-purpose use",
            "No chemicals",
            "Volume: 500ml"
        ],
        images: [
            "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600"
        ],
        inStock: false
    },
    // Ghee Products
    {
        id: "g1",
        name: "Pure Cow Ghee",
        slug: "pure-cow-ghee",
        category: "Ghee",
        categorySlug: "ghee",
        price: 800,
        oldPrice: 950,
        description: "Traditional pure cow ghee made from fresh cream. Rich aroma and authentic taste.",
        details: [
            "From Grass-fed Cows",
            "Traditional Method",
            "Rich in Vitamins",
            "Net Weight: 500g"
        ],
        images: [
            "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600"
        ],
        inStock: true,
        isBestSeller: true,
        isOffer: true
    },
    {
        id: "g2",
        name: "Buffalo Ghee Premium",
        slug: "buffalo-ghee-premium",
        category: "Ghee",
        categorySlug: "ghee",
        price: 750,
        description: "Premium buffalo ghee with rich creamy texture. Perfect for traditional cooking.",
        details: [
            "High Fat Content",
            "Perfect for Sweets",
            "Long Shelf Life",
            "Net Weight: 500g"
        ],
        images: [
            "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600"
        ],
        inStock: true
    },
    // Dates Products
    {
        id: "d1",
        name: "Ajwa Dates Premium",
        slug: "ajwa-dates-premium",
        category: "Dates",
        categorySlug: "dates",
        price: 1200,
        oldPrice: 1400,
        description: "Premium Ajwa dates from Madinah. Known for their unique taste and health benefits.",
        details: [
            "From Madinah",
            "Soft & Fresh",
            "High in Fiber",
            "Net Weight: 500g"
        ],
        images: [
            "https://images.unsplash.com/photo-1593164842264-854604db2260?w=600"
        ],
        inStock: true,
        isBestSeller: true,
        isOffer: true
    },
    {
        id: "d2",
        name: "Medjool Dates",
        slug: "medjool-dates",
        category: "Dates",
        categorySlug: "dates",
        price: 1100,
        description: "Large, soft Medjool dates. The king of dates with caramel-like sweetness.",
        details: [
            "King of Dates",
            "Large Size",
            "Natural Sweetener",
            "Net Weight: 500g"
        ],
        images: [
            "https://images.unsplash.com/photo-1593164842264-854604db2260?w=600"
        ],
        inStock: true
    },
    {
        id: "d3",
        name: "Deglet Noor Dates",
        slug: "deglet-noor-dates",
        category: "Dates",
        categorySlug: "dates",
        price: 650,
        description: "Semi-dry dates with a delicate honey-like flavor. Perfect for cooking and snacking.",
        details: [
            "Semi-dry texture",
            "Mild sweetness",
            "Great for baking",
            "Net Weight: 500g"
        ],
        images: [
            "https://images.unsplash.com/photo-1593164842264-854604db2260?w=600"
        ],
        inStock: true
    }
];
export const getProductsByCategory = (categorySlug) => {
    if (categorySlug === "offer") {
        return products.filter(p => p.isOffer);
    }
    if (categorySlug === "best-seller") {
        return products.filter(p => p.isBestSeller);
    }
    return products.filter(p => p.categorySlug === categorySlug);
};
export const getProductBySlug = (slug) => {
    return products.find(p => p.slug === slug);
};
export const getCategoryBySlug = (slug) => {
    return categories.find(c => c.slug === slug);
};
export const getAllProducts = () => products;
export const getBestSellers = () => products.filter(p => p.isBestSeller);
export const getOffers = () => products.filter(p => p.isOffer);
export const getMaxPrice = () => {
    return Math.max(...products.map(p => p.price));
};
