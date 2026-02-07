module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Programming/Development/artisan-eats/src/lib/mongodb.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "connectDB",
    ()=>connectDB
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/Programming/Development/artisan-eats/node_modules/mongoose)");
;
const { MONGODB_URI } = process.env;
if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in .env.local");
}
let cached = /*TURBOPACK member replacement*/ __turbopack_context__.g.mongoose;
if (!cached) {
    cached = /*TURBOPACK member replacement*/ __turbopack_context__.g.mongoose = {
        conn: null,
        promise: null
    };
}
async function connectDB() {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$mongoose$29$__["default"].connect(MONGODB_URI, {
            bufferCommands: false
        }).then((mongooseInstance)=>mongooseInstance);
    }
    cached.conn = await cached.promise;
    return cached.conn;
}
}),
"[project]/Programming/Development/artisan-eats/src/models/Product.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/Programming/Development/artisan-eats/node_modules/mongoose)");
;
const ProductSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$mongoose$29$__["default"].Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true
    },
    category: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$mongoose$29$__["default"].Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    categorySlug: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    price: {
        type: Number,
        required: true
    },
    oldPrice: {
        type: Number
    },
    description: {
        type: String,
        default: ""
    },
    details: [
        {
            type: String
        }
    ],
    images: [
        {
            type: String
        }
    ],
    inStock: {
        type: Boolean,
        default: true
    },
    isBestSeller: {
        type: Boolean,
        default: false,
        index: true
    },
    isOffer: {
        type: Boolean,
        default: false,
        index: true
    }
}, {
    timestamps: true
});
ProductSchema.index({
    price: 1
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$mongoose$29$__["default"].models.Product || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$mongoose$29$__["default"].model("Product", ProductSchema, "products");
}),
"[project]/Programming/Development/artisan-eats/src/app/api/products/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$mongodb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/lib/mongodb.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Product$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/models/Product.js [app-route] (ecmascript)");
;
;
;
const parseBoolean = (value)=>{
    if (value === null || value === undefined) return null;
    if (value === "true") return true;
    if (value === "false") return false;
    return null;
};
async function GET(req) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$mongodb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDB"])();
        const { searchParams } = new URL(req.url);
        const filter = {};
        const category = searchParams.get("category");
        if (category) {
            if (category === "offer") {
                filter.isOffer = true;
            } else if (category === "best-seller") {
                filter.isBestSeller = true;
            } else {
                filter.categorySlug = category;
            }
        }
        const isOffer = parseBoolean(searchParams.get("isOffer"));
        if (isOffer !== null) filter.isOffer = isOffer;
        const isBestSeller = parseBoolean(searchParams.get("isBestSeller"));
        if (isBestSeller !== null) filter.isBestSeller = isBestSeller;
        const inStock = parseBoolean(searchParams.get("inStock"));
        if (inStock !== null) filter.inStock = inStock;
        const minPriceParam = searchParams.get("minPrice");
        const maxPriceParam = searchParams.get("maxPrice");
        const minPrice = minPriceParam !== null ? Number(minPriceParam) : null;
        const maxPrice = maxPriceParam !== null ? Number(maxPriceParam) : null;
        if (minPriceParam !== null || maxPriceParam !== null) {
            const priceFilter = {};
            if (minPriceParam !== null && !Number.isNaN(minPrice)) priceFilter.$gte = minPrice;
            if (maxPriceParam !== null && !Number.isNaN(maxPrice)) priceFilter.$lte = maxPrice;
            if (Object.keys(priceFilter).length > 0) {
                filter.price = priceFilter;
            }
        }
        const search = searchParams.get("search");
        if (search) {
            const regex = new RegExp(search, "i");
            filter.$or = [
                {
                    name: regex
                },
                {
                    description: regex
                }
            ];
        }
        const sortParam = searchParams.get("sort") || "newest";
        let sort = {
            createdAt: -1
        };
        if (sortParam === "price_asc") sort = {
            price: 1
        };
        if (sortParam === "price_desc") sort = {
            price: -1
        };
        if (sortParam === "name_asc") sort = {
            name: 1
        };
        if (sortParam === "name_desc") sort = {
            name: -1
        };
        const page = Math.max(1, Number(searchParams.get("page") || 1));
        const limit = Math.max(1, Number(searchParams.get("limit") || 12));
        const skip = (page - 1) * limit;
        const total = await __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Product$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].countDocuments(filter);
        let products = [];
        try {
            products = await __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Product$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find(filter).sort(sort).skip(skip).limit(limit).lean();
        } catch (queryError) {
            console.error("Product.find failed, falling back to raw collection:", queryError);
            products = await __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Product$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].collection.find(filter).sort(sort).skip(skip).limit(limit).toArray();
        }
        const normalized = products.map((product)=>({
                id: product._id.toString(),
                name: product.name,
                slug: product.slug,
                category: product.category?.toString(),
                categorySlug: product.categorySlug,
                price: product.price,
                oldPrice: product.oldPrice,
                description: product.description || "",
                details: product.details || [],
                images: product.images || [],
                inStock: Boolean(product.inStock),
                isBestSeller: Boolean(product.isBestSeller),
                isOffer: Boolean(product.isOffer),
                createdAt: product.createdAt,
                updatedAt: product.updatedAt
            }));
        const totalPages = Math.max(1, Math.ceil(total / limit));
        return __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            products: normalized,
            total,
            page,
            totalPages
        });
    } catch (error) {
        console.error("GET /api/products failed:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error?.message || "Failed to load products"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6f8e414a._.js.map