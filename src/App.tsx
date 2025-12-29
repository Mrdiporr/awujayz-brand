import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import BrandHub from "./pages/BrandHub";
import MagicPotionHome from "./pages/magic-potion/MagicPotionHome";
import MagicPotionShop from "./pages/magic-potion/MagicPotionShop";
import MagicPotionAbout from "./pages/magic-potion/MagicPotionAbout";
import EasilyMoversHome from "./pages/easily-movers/EasilyMoversHome";
import EasilyMoversContact from "./pages/easily-movers/EasilyMoversContact";
import EasilyMoversAbout from "./pages/easily-movers/EasilyMoversAbout";
import CravinsHome from "./pages/cravins/CravinsHome";
import CravinsMenu from "./pages/cravins/CravinsMenu";
import CravinsCatering from "./pages/cravins/CravinsCatering";
import CravinsAbout from "./pages/cravins/CravinsAbout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminInquiries from "./pages/admin/AdminInquiries";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminMenuItems from "./pages/admin/AdminMenuItems";
import AdminServices from "./pages/admin/AdminServices";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Brand Hub - Main Landing */}
            <Route path="/" element={<BrandHub />} />
            
            {/* Magic Potion Apparel Routes */}
            <Route path="/magic-potion" element={<MagicPotionHome />} />
            <Route path="/magic-potion/shop" element={<MagicPotionShop />} />
            <Route path="/magic-potion/about" element={<MagicPotionAbout />} />
            
            {/* Easily Movers / Elixir.TX Routes */}
            <Route path="/easily-movers" element={<EasilyMoversHome />} />
            <Route path="/easily-movers/contact" element={<EasilyMoversContact />} />
            <Route path="/easily-movers/about" element={<EasilyMoversAbout />} />
            
            {/* Cravins TX Routes */}
            <Route path="/cravins" element={<CravinsHome />} />
            <Route path="/cravins/menu" element={<CravinsMenu />} />
            <Route path="/cravins/catering" element={<CravinsCatering />} />
            <Route path="/cravins/about" element={<CravinsAbout />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="inquiries" element={<AdminInquiries />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="menu" element={<AdminMenuItems />} />
              <Route path="services" element={<AdminServices />} />
            </Route>
            
            {/* Catch-all 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
