import { ArrowUpRight } from 'lucide-react';

const variants = {
  primary: 'bg-wine text-paper hover:-translate-y-0.5 hover:shadow-pop',
  secondary: 'border-2 border-wine text-wine hover:bg-wine hover:text-paper',
  light: 'bg-butter text-wine hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#f5bad5]',
};

export default function Button({ href, variant = 'primary', arrow = true, className = '', children, ...props }) {
  const Tag = href ? 'a' : 'button';
  const extra = href ? {} : { type: 'button' };
  return (
    <Tag
      href={href}
      {...extra}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-display text-base font-semibold transition duration-200 ease-out ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {arrow && (
        <ArrowUpRight
          aria-hidden="true"
          className="size-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </Tag>
  );
}
