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
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Programming/Development/artisan-eats/src/models/Admin.js [app-route] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/Programming/Development/artisan-eats/src/lib/password.js [app-route] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/Programming/Development/artisan-eats/src/lib/authOptions.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>handler,
    "POST",
    ()=>handler,
    "authOptions",
    ()=>authOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/node_modules/next-auth/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/node_modules/next-auth/providers/credentials.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f40$auth$2f$core$2f$providers$2f$credentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/node_modules/@auth/core/providers/credentials.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$mongodb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/lib/mongodb.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Admin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/models/Admin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$password$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/lib/password.js [app-route] (ecmascript)");
;
;
;
;
;
const authOptions = {
    providers: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f40$auth$2f$core$2f$providers$2f$credentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])({
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
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$mongodb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDB"])();
                const admin = await __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Admin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
                    email: credentials.email.toLowerCase()
                });
                // 🔐 Always verify password (timing-safe)
                const isValid = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$password$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyPassword"])(credentials.password, admin?.passwordHash);
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
const handler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(authOptions);
;
}),
"[project]/Programming/Development/artisan-eats/src/lib/auth.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "auth",
    ()=>auth,
    "handlers",
    ()=>handlers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/node_modules/next-auth/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$authOptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/lib/authOptions.js [app-route] (ecmascript)");
;
;
const { auth, handlers } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$authOptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authOptions"]);
}),
"[project]/Programming/Development/artisan-eats/src/lib/permissions.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "requireAdmin",
    ()=>requireAdmin,
    "requireSession",
    ()=>requireSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/lib/auth.js [app-route] (ecmascript)");
;
async function requireSession() {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["auth"])();
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
"[project]/Programming/Development/artisan-eats/src/models/Order.js [app-route] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/Programming/Development/artisan-eats/src/lib/notifications.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "notifyAdminOrderPlaced",
    ()=>notifyAdminOrderPlaced,
    "notifyCustomerOrderPlaced",
    ()=>notifyCustomerOrderPlaced
]);
async function notifyAdminOrderPlaced({ orderNumber, customerName, phone, total, paymentMethod }) {
    console.log(`[ADMIN NOTIFY] New order ${orderNumber} | ${customerName} | ${phone} | Total ৳${total} | ${paymentMethod}`);
}
async function notifyCustomerOrderPlaced({ orderNumber, total, phone, supportContact }) {
    console.log(`[CUSTOMER NOTIFY] Order ${orderNumber} placed. Total ৳${total}. We will confirm delivery soon. Support: ${supportContact}. Phone: ${phone}`);
}
}),
"[project]/Programming/Development/artisan-eats/src/lib/orderNumber.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateUniqueOrderNumber",
    ()=>generateUniqueOrderNumber
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Order$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/models/Order.js [app-route] (ecmascript)");
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
        const exists = await __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Order$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].exists({
            orderNumber: candidate
        });
        if (!exists) return candidate;
    }
    throw new Error("Failed to generate unique order number");
}
}),
"[project]/Programming/Development/artisan-eats/src/app/api/orders/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$mongodb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/lib/mongodb.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$permissions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/lib/permissions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Order$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/models/Order.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$notifications$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/lib/notifications.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$orderNumber$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Programming/Development/artisan-eats/src/lib/orderNumber.js [app-route] (ecmascript)");
;
;
;
;
;
;
const normalizeItems = (items = [])=>items.map((item)=>{
        const product = item.productId || item.product || item.id;
        const productName = item.productName || item.name || "Item";
        const price = Number(item.price || 0);
        const quantity = Math.max(1, Number(item.quantity || 1));
        return {
            product,
            productName,
            price,
            quantity,
            image: item.image || ""
        };
    }).filter((item)=>item.product && item.price >= 0 && item.quantity >= 1);
async function GET(req) {
    const auth = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$permissions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireAdmin"])();
    if (!auth.ok) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: auth.status === 401 ? "Unauthorized" : "Forbidden"
        }, {
            status: auth.status
        });
    }
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$mongodb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDB"])();
        const { searchParams } = new URL(req.url);
        const page = Math.max(1, Number(searchParams.get("page") || 1));
        const limit = Math.max(1, Number(searchParams.get("limit") || 20));
        const skip = (page - 1) * limit;
        const total = await __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Order$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].countDocuments({});
        const orders = await __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Order$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({}).sort({
            createdAt: -1
        }).skip(skip).limit(limit).lean();
        const normalized = orders.map((order)=>({
                id: order._id.toString(),
                orderNumber: order.orderNumber,
                customer: order.customer,
                items: order.items,
                subtotal: order.subtotal,
                discount: order.discount || 0,
                coupon: order.coupon,
                shipping: order.shipping || 0,
                total: order.total,
                paymentType: order.paymentType,
                status: order.status,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt
            }));
        const totalPages = Math.max(1, Math.ceil(total / limit));
        return __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            orders: normalized,
            total,
            page,
            totalPages
        });
    } catch (error) {
        console.error("GET /api/orders failed:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to load orders"
        }, {
            status: 500
        });
    }
}
async function POST(req) {
    try {
        const body = await req.json();
        const customer = body?.customer || {};
        const items = normalizeItems(body?.items || []);
        const paymentType = body?.paymentType === "online" ? "online" : "cod";
        if (!customer.name || !customer.phone || !customer.address) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Name, phone, and address are required."
            }, {
                status: 400
            });
        }
        if (items.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Cart is empty."
            }, {
                status: 400
            });
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$mongodb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDB"])();
        const subtotal = items.reduce((sum, item)=>sum + item.price * item.quantity, 0);
        const shipping = Math.max(0, Number(body?.shipping || 0));
        const discount = 0;
        const total = Math.max(0, subtotal + shipping - discount);
        const orderNumber = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$orderNumber$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateUniqueOrderNumber"])();
        const order = await __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$models$2f$Order$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].create({
            orderNumber,
            customer: {
                name: customer.name,
                phone: customer.phone,
                address: customer.address,
                city: customer.city || "",
                note: customer.note || ""
            },
            items,
            subtotal,
            discount,
            coupon: undefined,
            shipping,
            total,
            paymentType,
            status: "pending"
        });
        const notificationPayload = {
            orderId: order._id.toString(),
            orderNumber: order.orderNumber,
            customerName: order.customer.name,
            phone: order.customer.phone,
            total: order.total,
            paymentMethod: paymentType === "online" ? "Online" : "COD"
        };
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$notifications$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["notifyAdminOrderPlaced"])(notificationPayload);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$src$2f$lib$2f$notifications$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["notifyCustomerOrderPlaced"])({
                ...notificationPayload,
                supportContact: "+8801234567890"
            });
        } catch (notifyError) {
            console.error("Order notification failed:", notifyError);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            orderId: order._id.toString(),
            orderNumber: order.orderNumber,
            status: order.status,
            total: order.total,
            paymentMethod: paymentType === "online" ? "Online" : "COD"
        });
    } catch (error) {
        console.error("POST /api/orders failed:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Programming$2f$Development$2f$artisan$2d$eats$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to place order."
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__12f44038._.js.map