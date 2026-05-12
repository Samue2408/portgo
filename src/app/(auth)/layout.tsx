export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-muted/30 px-4 py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(14,165,233,0.15),transparent_40%),radial-gradient(circle_at_80%_0%,_rgba(30,58,138,0.12),transparent_35%)]" />
      <div className="relative z-10 w-full max-w-md">{children}</div>
    </div>
  );
}
