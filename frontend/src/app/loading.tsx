import { PageContainer } from "@/components/layout/PageContainer";
import { Spinner } from "@/components/ui/Spinner";

export default function Loading() {
  return (
    <main className="min-h-dvh bg-background text-text-primary">
      <PageContainer
        maxWidth="auth"
        paddingY="none"
        className="flex min-h-dvh items-center justify-center"
      >
        <div
          className="flex flex-col items-center gap-3 text-center"
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          <Spinner size="lg" />
          <p className="text-sm text-text-secondary">Loading page...</p>
        </div>
      </PageContainer>
    </main>
  );
}
