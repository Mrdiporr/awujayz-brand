import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BrandHub from "./pages/BrandHub";
import MagicPotionHome from "./pages/magic-potion/MagicPotionHome";
import EasilyMoversHome from "./pages/easily-movers/EasilyMoversHome";
import CravinsHome from "./pages/cravins/CravinsHome";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Brand Hub - Main Landing */}
          <Route path="/" element={<BrandHub />} />
          
          {/* Magic Potion Apparel Routes */}
          <Route path="/magic-potion" element={<MagicPotionHome />} />
          <Route path="/magic-potion/*" element={<MagicPotionHome />} />
          
          {/* Easily Movers / Elixir.TX Routes */}
          <Route path="/easily-movers" element={<EasilyMoversHome />} />
          <Route path="/easily-movers/*" element={<EasilyMoversHome />} />
          
          {/* Cravins TX Routes */}
          <Route path="/cravins" element={<CravinsHome />} />
          <Route path="/cravins/*" element={<CravinsHome />} />
          
          {/* Catch-all 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
