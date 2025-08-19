import { cn } from '@/lib/cn';

interface ProseProps extends React.ComponentProps<'div'> {
  children?: React.ReactNode;
}

export default function Prose(
  { children, className, ...props }: ProseProps) {
  return (
    <div
      className={cn(`
        prose prose-stone
        max-w-none
        prose-a:text-amber-700 prose-a:hover:text-amber-900 prose-a:hover:underline prose-a:visited:text-amber-800
        prose-blockquote:font-normal
        `, className)}
      {...props}
    >
      {children}
    </div>
  );
}
