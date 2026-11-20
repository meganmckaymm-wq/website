import { useReveal } from '../hooks/useReveal';

export default function Reveal({ delay = 0, className = '', children, ...rest }) {
  const ref = useReveal();
  return (
    <div ref={ref} data-reveal="in" style={{ transitionDelay: `${delay}ms` }} className={className} {...rest}>
      {children}
    </div>
  );
}
