import { TopNavigation } from "./TopNavigation";

interface ModernLayoutProps {
  children: React.ReactNode;
}

export function ModernLayout({ children }: ModernLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <TopNavigation />
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}