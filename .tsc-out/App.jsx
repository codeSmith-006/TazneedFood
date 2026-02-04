import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CartProvider } from "@/contexts/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import Index from "./pages/Index";
import CollectionPage from "./pages/CollectionPage";
import ProductPage from "./pages/ProductPage";
import AdminLayout from "./pages/admin/AdminLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import ProductsPage from "./pages/admin/ProductsPage";
import OrdersPage from "./pages/admin/OrdersPage";
import CategoriesPage from "./pages/admin/CategoriesPage";
import NotFound from "./pages/NotFound";
const queryClient = new QueryClient();
const App = () => (<HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <CartDrawer />
            <Routes>
              {/* Storefront Routes */}
              <Route path="/" element={<Index />}/>
              <Route path="/collections/:category" element={<CollectionPage />}/>
              <Route path="/collections/:category/:slug" element={<ProductPage />}/>
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardPage />}/>
                <Route path="products" element={<ProductsPage />}/>
                <Route path="orders" element={<OrdersPage />}/>
                <Route path="categories" element={<CategoriesPage />}/>
              </Route>
              
              {/* Catch-all */}
              <Route path="*" element={<NotFound />}/>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  </HelmetProvider>);
export default App;
