import { cn } from '@/lib/cn';

export default function PageTitle(
  { children, className }: { children: React.ReactNode; className?: string },
) {
  return (
    <h1 className={cn('text-amber-950 text-4xl font-extrabold tracking-tight', className)}>
      {children}
    </h1>
  );
}
