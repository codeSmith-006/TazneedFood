module.exports = [
"[project]/Programming/Development/artisan-eats/src/lib/mongodb.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/Programming/Development/artisan-eats/src/models/Admin.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/Programming/Development/artisan-eats/node_modules/mongoose)");
;
const AdminSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$mongoose$29$__["default"].Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        index: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "admin"
    }
}, {
    timestamps: true
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$mongoose$29$__["default"].models.Admin || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$mongoose$29$__["default"].model("Admin", AdminSchema, "adminusers");
}),
"[project]/Programming/Development/artisan-eats/src/lib/password.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hashPassword",
    ()=>hashPassword,
    "verifyPassword",
    ()=>verifyPassword
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$bcrypt__$5b$external$5d$__$28$bcrypt$2c$__cjs$2c$__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$bcrypt$29$__ = __turbopack_context__.i("[externals]/bcrypt [external] (bcrypt, cjs, [project]/Programming/Development/artisan-eats/node_modules/bcrypt)");
;
const SALT_ROUNDS = 12;
// Pre-generated bcrypt hash for timing-attack protection
const DUMMY_HASH = "$2b$12$CwTycUXWue0Thq9StjUM0uJ8y7jv1p7r1nq5n7vP2S2rZtGJ1e";
async function hashPassword(password) {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$bcrypt__$5b$external$5d$__$28$bcrypt$2c$__cjs$2c$__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$bcrypt$29$__["default"].hash(password, SALT_ROUNDS);
}
async function verifyPassword(password, hash) {
    // Always run bcrypt to avoid timing attacks
    return __TURBOPACK__imported__module__$5b$externals$5d2f$bcrypt__$5b$external$5d$__$28$bcrypt$2c$__cjs$2c$__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$bcrypt$29$__["default"].compare(password, hash || DUMMY_HASH);
}
}),
"[project]/Programming/Development/artisan-eats/src/lib/authOptions.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>handler,
    "POST",
    ()=>handler,
    "authOptions",
    ()=>authOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/node_modules/next-auth/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/node_modules/next-auth/providers/credentials.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f40$auth$2f$core$2f$providers$2f$credentials$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/node_modules/@auth/core/providers/credentials.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$mongodb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/lib/mongodb.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Admin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/models/Admin.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$password$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/lib/password.js [app-rsc] (ecmascript)");
;
;
;
;
;
const authOptions = {
    providers: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f40$auth$2f$core$2f$providers$2f$credentials$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])({
            name: "Admin Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "admin@example.com"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize (credentials) {
                // Generic failure response (no info leak)
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$mongodb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
                const admin = await __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Admin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findOne({
                    email: credentials.email.toLowerCase()
                });
                // 🔐 Always verify password (timing-safe)
                const isValid = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$password$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["verifyPassword"])(credentials.password, admin?.passwordHash);
                // Generic rejection
                if (!admin || !isValid || admin.role !== "admin") {
                    return null;
                }
                // Minimal safe user object
                return {
                    id: admin._id.toString(),
                    email: admin.email,
                    role: admin.role
                };
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt ({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session ({ session, token }) {
            session.user.role = token.role;
            return session;
        }
    },
    pages: {
        signIn: "/admin/login",
        error: "/admin/login"
    },
    secret: process.env.AUTH_SECRET
};
// 🔴 REQUIRED for App Router
const handler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(authOptions);
;
}),
"[project]/Programming/Development/artisan-eats/src/lib/auth.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "auth",
    ()=>auth,
    "handlers",
    ()=>handlers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/node_modules/next-auth/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$authOptions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/lib/authOptions.js [app-rsc] (ecmascript)");
;
;
const { auth, handlers } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$authOptions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["authOptions"]);
}),
"[project]/Programming/Development/artisan-eats/src/lib/permissions.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "requireAdmin",
    ()=>requireAdmin,
    "requireSession",
    ()=>requireSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/lib/auth.js [app-rsc] (ecmascript)");
;
async function requireSession() {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    if (!session?.user) {
        return {
            ok: false,
            status: 401,
            session: null
        };
    }
    return {
        ok: true,
        status: 200,
        session
    };
}
async function requireAdmin() {
    const { ok, status, session } = await requireSession();
    if (!ok) {
        return {
            ok,
            status,
            session: null
        };
    }
    if (session.user?.role !== "admin") {
        return {
            ok: false,
            status: 403,
            session
        };
    }
    return {
        ok: true,
        status: 200,
        session
    };
}
}),
"[project]/Programming/Development/artisan-eats/src/models/Product.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/Programming/Development/artisan-eats/src/models/Category.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/Programming/Development/artisan-eats/node_modules/mongoose)");
;
const CategorySchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$mongoose$29$__["default"].Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true
    },
    description: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$mongoose$29$__["default"].models.Category || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$mongoose$29$__["default"].model("Category", CategorySchema);
}),
"[project]/Programming/Development/artisan-eats/src/app/actions/products.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40f0334f71e0357d290b1d98dfdcc35013eebc03b8":"createProduct","40f33963c6f42562b5ad26ba581190ab4156cf2eec":"deleteProduct","60b8c073c6dd2f026d715c7728ae8837c1d3dac5f0":"updateProduct"},"",""] */ __turbopack_context__.s([
    "createProduct",
    ()=>createProduct,
    "deleteProduct",
    ()=>deleteProduct,
    "updateProduct",
    ()=>updateProduct
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$mongodb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/lib/mongodb.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$permissions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/lib/permissions.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Product$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/models/Product.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Category$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/models/Category.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
const toPayload = (product)=>({
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
    });
async function createProduct(data) {
    const auth = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$permissions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireAdmin"])();
    if (!auth.ok) {
        throw new Error(auth.status === 401 ? "Unauthorized" : "Forbidden");
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$mongodb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
    const categoryId = data.categoryId || data.category;
    const category = await __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Category$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findById(categoryId);
    if (!category) {
        throw new Error("Category not found");
    }
    const product = await __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Product$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].create({
        name: data.name,
        slug: data.slug,
        category: category._id,
        categorySlug: category.slug,
        price: data.price,
        oldPrice: data.oldPrice,
        description: data.description || "",
        details: data.details || [],
        images: data.images || [],
        inStock: Boolean(data.inStock),
        isBestSeller: Boolean(data.isBestSeller),
        isOffer: Boolean(data.isOffer)
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"])("products");
    return toPayload(product);
}
async function updateProduct(id, data) {
    const auth = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$permissions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireAdmin"])();
    if (!auth.ok) {
        throw new Error(auth.status === 401 ? "Unauthorized" : "Forbidden");
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$mongodb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
    let categoryId = data.categoryId || data.category;
    let categorySlug = data.categorySlug;
    if (categoryId) {
        const category = await __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Category$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findById(categoryId);
        if (!category) {
            throw new Error("Category not found");
        }
        categorySlug = category.slug;
    }
    const updates = {
        name: data.name,
        slug: data.slug,
        price: data.price,
        oldPrice: data.oldPrice,
        description: data.description || "",
        details: data.details || [],
        images: data.images || [],
        inStock: Boolean(data.inStock),
        isBestSeller: Boolean(data.isBestSeller),
        isOffer: Boolean(data.isOffer)
    };
    if (categoryId) {
        updates.category = categoryId;
        updates.categorySlug = categorySlug;
    }
    const product = await __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Product$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findByIdAndUpdate(id, updates, {
        new: true
    });
    if (!product) {
        throw new Error("Product not found");
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"])("products");
    return toPayload(product);
}
async function deleteProduct(id) {
    const auth = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$permissions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireAdmin"])();
    if (!auth.ok) {
        throw new Error(auth.status === 401 ? "Unauthorized" : "Forbidden");
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$mongodb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
    const deleted = await __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Product$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findByIdAndDelete(id);
    if (!deleted) {
        throw new Error("Product not found");
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"])("products");
    return {
        id
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createProduct,
    updateProduct,
    deleteProduct
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createProduct, "40f0334f71e0357d290b1d98dfdcc35013eebc03b8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateProduct, "60b8c073c6dd2f026d715c7728ae8837c1d3dac5f0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteProduct, "40f33963c6f42562b5ad26ba581190ab4156cf2eec", null);
}),
"[project]/Programming/Development/artisan-eats/src/app/actions/categories.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"402b471a910c034fcdb26872e39ff3023797a2a329":"deleteCategory","40804d377932c5e04aed853f174c3a927bbf6eb50d":"createCategory","6020d2f51bfe44fc1164367153201523579a42f348":"updateCategory"},"",""] */ __turbopack_context__.s([
    "createCategory",
    ()=>createCategory,
    "deleteCategory",
    ()=>deleteCategory,
    "updateCategory",
    ()=>updateCategory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$mongodb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/lib/mongodb.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$permissions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/lib/permissions.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Category$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/models/Category.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Product$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/models/Product.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
const toPayload = (category)=>({
        id: category._id.toString(),
        name: category.name,
        slug: category.slug,
        description: category.description || "",
        image: category.image || "",
        createdAt: category.createdAt,
        updatedAt: category.updatedAt
    });
async function createCategory(data) {
    const auth = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$permissions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireAdmin"])();
    if (!auth.ok) {
        throw new Error(auth.status === 401 ? "Unauthorized" : "Forbidden");
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$mongodb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
    const category = await __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Category$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].create({
        name: data.name,
        slug: data.slug,
        description: data.description || "",
        image: data.image || ""
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"])("categories");
    return toPayload(category);
}
async function updateCategory(id, data) {
    const auth = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$permissions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireAdmin"])();
    if (!auth.ok) {
        throw new Error(auth.status === 401 ? "Unauthorized" : "Forbidden");
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$mongodb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
    const category = await __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Category$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findByIdAndUpdate(id, {
        name: data.name,
        slug: data.slug,
        description: data.description || "",
        image: data.image || ""
    }, {
        new: true
    });
    if (!category) {
        throw new Error("Category not found");
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"])("categories");
    return toPayload(category);
}
async function deleteCategory(id) {
    const auth = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$permissions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireAdmin"])();
    if (!auth.ok) {
        throw new Error(auth.status === 401 ? "Unauthorized" : "Forbidden");
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$mongodb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
    const productCount = await __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Product$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].countDocuments({
        category: id
    });
    if (productCount > 0) {
        throw new Error("Category has products");
    }
    const deleted = await __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Category$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findByIdAndDelete(id);
    if (!deleted) {
        throw new Error("Category not found");
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidateTag"])("categories");
    return {
        id
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createCategory,
    updateCategory,
    deleteCategory
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createCategory, "40804d377932c5e04aed853f174c3a927bbf6eb50d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateCategory, "6020d2f51bfe44fc1164367153201523579a42f348", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteCategory, "402b471a910c034fcdb26872e39ff3023797a2a329", null);
}),
"[project]/Programming/Development/artisan-eats/src/models/Order.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/Programming/Development/artisan-eats/node_modules/mongoose)");
;
const OrderItemSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$mongoose$29$__["default"].Schema({
    product: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$mongoose$29$__["default"].Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    image: {
        type: String,
        default: ""
    }
}, {
    _id: false
});
const OrderSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$mongoose$29$__["default"].Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    customer: {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            default: ""
        },
        note: {
            type: String,
            default: ""
        }
    },
    items: {
        type: [
            OrderItemSchema
        ],
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    coupon: {
        type: String
    },
    shipping: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        required: true
    },
    paymentType: {
        type: String,
        enum: [
            "cod",
            "online"
        ],
        required: true
    },
    status: {
        type: String,
        enum: [
            "pending",
            "confirmed",
            "delivered",
            "cancelled"
        ],
        default: "pending",
        index: true
    }
}, {
    timestamps: true
});
OrderSchema.index({
    createdAt: -1
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$mongoose$29$__["default"].models.Order || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$mongoose$29$__["default"].model("Order", OrderSchema, "orders");
}),
"[project]/Programming/Development/artisan-eats/src/lib/orderAnalytics.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getOrderAnalytics",
    ()=>getOrderAnalytics
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Order$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/models/Order.js [app-rsc] (ecmascript)");
;
async function getOrderAnalytics() {
    const totalsByStatus = await __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Order$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].aggregate([
        {
            $group: {
                _id: "$status",
                count: {
                    $sum: 1
                }
            }
        }
    ]);
    const totalsMap = totalsByStatus.reduce((acc, item)=>{
        acc[item._id] = item.count;
        return acc;
    }, {});
    const revenueAgg = await __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Order$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].aggregate([
        {
            $match: {
                status: "delivered"
            }
        },
        {
            $group: {
                _id: null,
                total: {
                    $sum: "$total"
                }
            }
        }
    ]);
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayAgg = await __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Order$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].aggregate([
        {
            $match: {
                status: "delivered",
                createdAt: {
                    $gte: todayStart
                }
            }
        },
        {
            $group: {
                _id: null,
                total: {
                    $sum: "$total"
                }
            }
        }
    ]);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);
    const perDayAgg = await __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Order$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].aggregate([
        {
            $match: {
                createdAt: {
                    $gte: sevenDaysAgo
                }
            }
        },
        {
            $group: {
                _id: {
                    $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$createdAt"
                    }
                },
                count: {
                    $sum: 1
                }
            }
        },
        {
            $sort: {
                _id: 1
            }
        }
    ]);
    return {
        totalOrders: totalsByStatus.reduce((sum, item)=>sum + item.count, 0),
        pendingOrders: totalsMap.pending || 0,
        deliveredOrders: totalsMap.delivered || 0,
        cancelledOrders: totalsMap.cancelled || 0,
        totalRevenue: revenueAgg[0]?.total || 0,
        todayRevenue: todayAgg[0]?.total || 0,
        ordersPerDay: perDayAgg.map((item)=>({
                date: item._id,
                count: item.count
            }))
    };
}
}),
"[project]/Programming/Development/artisan-eats/src/lib/orderNumber.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateUniqueOrderNumber",
    ()=>generateUniqueOrderNumber
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Order$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/models/Order.js [app-rsc] (ecmascript)");
;
const ORDER_NUMBER_LENGTH = 8;
const MAX_ATTEMPTS = 8;
const generateDigits = ()=>{
    let value = "";
    for(let i = 0; i < ORDER_NUMBER_LENGTH; i += 1){
        value += Math.floor(Math.random() * 10);
    }
    return value;
};
async function generateUniqueOrderNumber() {
    for(let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1){
        const candidate = generateDigits();
        // Ensure uniqueness at DB level; retry if collision
        const exists = await __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Order$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].exists({
            orderNumber: candidate
        });
        if (!exists) return candidate;
    }
    throw new Error("Failed to generate unique order number");
}
}),
"[project]/Programming/Development/artisan-eats/src/app/actions/orders.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"007273b29446854df9b3e80577c28f76af2c32cf34":"getOrderAnalytics","4006dbba23328691a353b41a597f4ed9679d4a4c34":"deleteOrder","40409eae04945f160c4158748439c339bc5a71112e":"createOrder","60b567005ab4fe5efef19697223d2a57d40b4dd211":"updateOrderStatus"},"",""] */ __turbopack_context__.s([
    "createOrder",
    ()=>createOrder,
    "deleteOrder",
    ()=>deleteOrder,
    "getOrderAnalytics",
    ()=>getOrderAnalytics,
    "updateOrderStatus",
    ()=>updateOrderStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$mongodb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/lib/mongodb.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$permissions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/lib/permissions.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Order$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/models/Order.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Product$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/models/Product.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$orderAnalytics$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/lib/orderAnalytics.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$orderNumber$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/lib/orderNumber.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
async function createOrder(orderData) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$mongodb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
    const customer = orderData?.customer || {};
    const items = Array.isArray(orderData?.items) ? orderData.items : [];
    const paymentType = orderData?.paymentType === "online" ? "online" : "cod";
    const coupon = orderData?.coupon || undefined;
    if (!customer.name || !customer.phone || !customer.address) {
        throw new Error("Invalid customer information");
    }
    if (items.length === 0) {
        throw new Error("Order items are required");
    }
    const productIds = items.map((item)=>item.productId || item.product).filter(Boolean);
    if (productIds.length === 0) {
        throw new Error("Order items are invalid");
    }
    const products = await __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Product$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].find({
        _id: {
            $in: productIds
        }
    }).lean();
    const productById = new Map(products.map((product)=>[
            product._id.toString(),
            product
        ]));
    const normalizedItems = items.map((item)=>{
        const productId = item.productId || item.product;
        const product = productById.get(String(productId));
        if (!product) {
            throw new Error("Product not found for order item");
        }
        const quantity = Math.max(1, Number(item.quantity || 1));
        return {
            product: product._id,
            productName: product.name,
            price: product.price,
            quantity,
            image: product.images?.[0] || ""
        };
    });
    const subtotal = normalizedItems.reduce((sum, item)=>sum + item.price * item.quantity, 0);
    const discount = 0;
    const total = Math.max(0, subtotal - discount);
    const orderNumber = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$orderNumber$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateUniqueOrderNumber"])();
    const order = await __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Order$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].create({
        orderNumber,
        customer: {
            name: customer.name,
            phone: customer.phone,
            address: customer.address
        },
        items: normalizedItems,
        subtotal,
        discount,
        coupon,
        total,
        paymentType,
        status: "pending"
    });
    return {
        id: order._id.toString(),
        orderNumber: order.orderNumber,
        status: order.status
    };
}
async function updateOrderStatus(orderId, status) {
    const auth = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$permissions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireAdmin"])();
    if (!auth.ok) {
        throw new Error(auth.status === 401 ? "Unauthorized" : "Forbidden");
    }
    const allowedStatuses = [
        "pending",
        "confirmed",
        "delivered",
        "cancelled"
    ];
    if (!allowedStatuses.includes(status)) {
        throw new Error("Invalid order status");
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$mongodb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
    const order = await __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Order$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findById(orderId);
    if (!order) {
        throw new Error("Order not found");
    }
    const transitions = {
        pending: new Set([
            "confirmed",
            "cancelled"
        ]),
        confirmed: new Set([
            "delivered",
            "cancelled"
        ]),
        delivered: new Set([]),
        cancelled: new Set([])
    };
    if (order.status !== status && !transitions[order.status]?.has(status)) {
        throw new Error(`Invalid status transition from ${order.status} to ${status}`);
    }
    order.status = status;
    await order.save();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/orders");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/dashboard");
    return {
        id: order._id.toString(),
        status: order.status
    };
}
async function deleteOrder(orderId) {
    const auth = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$permissions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireAdmin"])();
    if (!auth.ok) {
        throw new Error(auth.status === 401 ? "Unauthorized" : "Forbidden");
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$mongodb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
    const deleted = await __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Order$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findByIdAndDelete(orderId);
    if (!deleted) {
        throw new Error("Order not found");
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/orders");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/dashboard");
    return {
        id: orderId
    };
}
async function getOrderAnalytics() {
    const auth = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$permissions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireAdmin"])();
    if (!auth.ok) {
        throw new Error(auth.status === 401 ? "Unauthorized" : "Forbidden");
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$mongodb$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$orderAnalytics$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getOrderAnalytics"])();
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createOrder,
    updateOrderStatus,
    deleteOrder,
    getOrderAnalytics
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createOrder, "40409eae04945f160c4158748439c339bc5a71112e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateOrderStatus, "60b567005ab4fe5efef19697223d2a57d40b4dd211", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteOrder, "4006dbba23328691a353b41a597f4ed9679d4a4c34", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getOrderAnalytics, "007273b29446854df9b3e80577c28f76af2c32cf34", null);
}),
"[project]/Programming/Development/artisan-eats/.next-internal/server/app/admin/(protected)/dashboard/page/actions.js { ACTIONS_MODULE0 => \"[project]/Programming/Development/artisan-eats/src/app/actions/products.js [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/Programming/Development/artisan-eats/src/app/actions/categories.js [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/Programming/Development/artisan-eats/src/app/actions/orders.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$app$2f$actions$2f$products$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/app/actions/products.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$app$2f$actions$2f$categories$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/app/actions/categories.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$app$2f$actions$2f$orders$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/app/actions/orders.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
}),
"[project]/Programming/Development/artisan-eats/.next-internal/server/app/admin/(protected)/dashboard/page/actions.js { ACTIONS_MODULE0 => \"[project]/Programming/Development/artisan-eats/src/app/actions/products.js [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/Programming/Development/artisan-eats/src/app/actions/categories.js [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/Programming/Development/artisan-eats/src/app/actions/orders.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "007273b29446854df9b3e80577c28f76af2c32cf34",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$app$2f$actions$2f$orders$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getOrderAnalytics"],
    "4006dbba23328691a353b41a597f4ed9679d4a4c34",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$app$2f$actions$2f$orders$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteOrder"],
    "402b471a910c034fcdb26872e39ff3023797a2a329",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$app$2f$actions$2f$categories$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteCategory"],
    "40804d377932c5e04aed853f174c3a927bbf6eb50d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$app$2f$actions$2f$categories$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createCategory"],
    "40f0334f71e0357d290b1d98dfdcc35013eebc03b8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$app$2f$actions$2f$products$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createProduct"],
    "40f33963c6f42562b5ad26ba581190ab4156cf2eec",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$app$2f$actions$2f$products$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteProduct"],
    "6020d2f51bfe44fc1164367153201523579a42f348",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$app$2f$actions$2f$categories$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateCategory"],
    "60b567005ab4fe5efef19697223d2a57d40b4dd211",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$app$2f$actions$2f$orders$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateOrderStatus"],
    "60b8c073c6dd2f026d715c7728ae8837c1d3dac5f0",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$app$2f$actions$2f$products$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateProduct"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f28$protected$292f$dashboard$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$app$2f$actions$2f$products$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$app$2f$actions$2f$categories$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$app$2f$actions$2f$orders$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/Programming/Development/artisan-eats/.next-internal/server/app/admin/(protected)/dashboard/page/actions.js { ACTIONS_MODULE0 => "[project]/Programming/Development/artisan-eats/src/app/actions/products.js [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/Programming/Development/artisan-eats/src/app/actions/categories.js [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/Programming/Development/artisan-eats/src/app/actions/orders.js [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$app$2f$actions$2f$products$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/app/actions/products.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$app$2f$actions$2f$categories$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/app/actions/categories.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$app$2f$actions$2f$orders$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/app/actions/orders.js [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f7608b1c._.js.map