import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

interface ModernLayoutProps {
  children: React.ReactNode;
}

export function ModernLayout({ children }: ModernLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-guardey-dark via-guardey-teal to-guardey-dark">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top bar with sidebar trigger */}
          <header className="h-14 flex items-center justify-between px-6 border-b border-guardey-teal/30 bg-white/95 backdrop-blur-sm">
            <SidebarTrigger className="text-guardey-dark hover:bg-guardey-lime/20" />
            <div className="text-sm text-guardey-teal">
              Question Bank - Professional Dashboard
            </div>
          </header>
          
          {/* Main content */}
          <main className="flex-1 p-6 bg-white/95 backdrop-blur-sm overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}