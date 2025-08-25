import { TopNavigation } from "./TopNavigation";

interface ModernLayoutProps {
  children: React.ReactNode;
}

export function ModernLayout({ children }: ModernLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-guardey-dark via-guardey-teal to-guardey-dark">
      <TopNavigation />
      <main className="container mx-auto px-6 py-8 bg-white/95 backdrop-blur-sm rounded-t-2xl mt-4 shadow-2xl min-h-[calc(100vh-6rem)]">
        {children}
      </main>
    </div>
  );
}