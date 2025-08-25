import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

interface ModernLayoutProps {
  children: React.ReactNode;
}

export function ModernLayout({ children }: ModernLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-guardey-dark via-guardey-teal to-guardey-dark">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar with sidebar trigger */}
          <header className="h-14 flex items-center justify-between px-4 md:px-8 border-b-2 border-guardey-teal bg-sage shadow-lg shrink-0">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-guardey-dark hover:bg-guardey-lime/30 hover:text-guardey-dark p-2 rounded-lg border border-guardey-teal/20 transition-all duration-200 md:hidden lg:flex" />
              <div className="text-base md:text-lg font-semibold text-guardey-dark truncate">
                Professional Dashboard
              </div>
            </div>
            <div className="text-xs md:text-sm text-sage-foreground hidden sm:block">
              Question Bank System
            </div>
          </header>
          
          {/* Main content */}
          <main className="flex-1 p-4 md:p-8 bg-sage overflow-auto">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}