import { PageContainer } from "@/components/layout/page-container";

export default function RootPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-background text-text-primary">
      {/* Minimal Header */}
      <header className="border-b border-border bg-surface">
        <PageContainer maxWidth="lg" paddingY="none" className="h-16 flex items-center">
          <span className="text-xl font-bold tracking-tight text-brand-primary">
            FoodFighter
          </span>
        </PageContainer>
      </header>

      {/* Main Entry Placeholder */}
      <main className="flex-1 flex items-center justify-center py-16">
        <PageContainer maxWidth="sm" className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-primary">
            FoodFighter
          </h1>
          <p className="text-base text-text-secondary leading-relaxed">
            AI-Powered Group Meal Decision Platform
          </p>
        </PageContainer>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-border py-6 bg-surface">
        <PageContainer maxWidth="lg" paddingY="none" className="text-center text-xs text-text-muted">
          <span>© 2026 FoodFighter. All rights reserved.</span>
        </PageContainer>
      </footer>
    </div>
  );
}
