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
          <header className="h-16 flex items-center justify-between px-8 border-b-2 border-guardey-teal bg-sage shadow-lg">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-guardey-dark hover:bg-guardey-lime/30 hover:text-guardey-dark p-2 rounded-xl border border-guardey-teal/20 transition-all duration-200" />
              <div className="text-lg font-semibold text-guardey-dark">
                Professional Dashboard
              </div>
            </div>
            <div className="text-sm text-sage-foreground">
              Question Bank System
            </div>
          </header>
          
          {/* Main content */}
          <main className="flex-1 p-8 bg-sage overflow-auto">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}