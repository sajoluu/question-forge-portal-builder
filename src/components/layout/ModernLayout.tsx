import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

interface ModernLayoutProps {
  children: React.ReactNode;
}

export function ModernLayout({ children }: ModernLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gradient-hero relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary/8 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-accent/10 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        
        <AppSidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
          {/* Modern Top Bar */}
          <header className="h-16 flex items-center justify-between px-6 md:px-8 glass-card border-b border-white/10 shrink-0">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-foreground hover:bg-white/10 hover:text-accent-light p-3 rounded-xl transition-all duration-300 md:hidden lg:flex" />
              <div className="text-lg md:text-xl font-bold text-gradient truncate">
                Modern Dashboard
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm md:text-base text-muted-foreground hidden sm:block">
                Professional Interface
              </div>
              <div className="w-8 h-8 bg-gradient-primary rounded-full animate-glow"></div>
            </div>
          </header>
          
          {/* Main Content with Modern Background */}
          <main className="flex-1 p-6 md:p-8 bg-gradient-hero overflow-auto relative">
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-20 right-20 w-32 h-32 bg-primary/8 rounded-full blur-2xl animate-float"></div>
              <div className="absolute bottom-20 left-20 w-24 h-24 bg-accent/12 rounded-full blur-xl animate-float" style={{animationDelay: '3s'}}></div>
            </div>
            
            <div className="max-w-7xl mx-auto relative z-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}