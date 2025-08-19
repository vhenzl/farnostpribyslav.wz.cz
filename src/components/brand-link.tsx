import { cn } from '@/lib/cn';
import Link from 'next/link';

interface BrandLinkProps extends React.ComponentProps<typeof Link> {
  children: React.ReactNode;
}

export default function BrandLink(
  { children, className, ...props }: BrandLinkProps) {
  return (
    <Link
      className={cn('text-amber-700 hover:text-amber-900 hover:underline visited:text-amber-800', className)}
      {...props}
    >
      {children}
    </Link>
  );
}
