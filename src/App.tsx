import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ModernLayout } from "./components/layout/ModernLayout";
import Dashboard from "./pages/Dashboard";
import CreateQuestion from "./pages/CreateQuestion";
import Index from "./pages/Index";
import Login from "./pages/Login";
import TeacherDashboard from "./pages/TeacherDashboard";
import NotFound from "./pages/NotFound";
import RoleList from "./pages/roles/RoleList";
import AddRole from "./pages/roles/AddRole";
import PermissionMatrix from "./pages/roles/PermissionMatrix";
import MenuList from "./pages/menus/MenuList";
import AddMenu from "./pages/menus/AddMenu";
import { GuardeyShowcase } from "./components/GuardeyShowcase";
import { GuardeyUpdateSummary } from "./components/GuardeyUpdateSummary";
import SidebarDemo from "./pages/SidebarDemo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ModernLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
            <Route path="/create-question" element={<CreateQuestion />} />
            <Route path="/books" element={<Index />} />
            <Route path="/question-library" element={<Index />} />
            <Route path="/package-management" element={<Index />} />
            <Route path="/profile-management" element={<Index />} />
            <Route path="/roles" element={<RoleList />} />
            <Route path="/roles/add" element={<AddRole />} />
            <Route path="/roles/permissions" element={<PermissionMatrix />} />
            <Route path="/menus" element={<MenuList />} />
            <Route path="/menus/add" element={<AddMenu />} />
            <Route path="/guardey-showcase" element={<GuardeyShowcase />} />
            <Route path="/sidebar-demo" element={<SidebarDemo />} />
            <Route path="/help-line" element={<Index />} />
            <Route path="/contact" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ModernLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
