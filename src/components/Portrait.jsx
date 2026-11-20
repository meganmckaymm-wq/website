import Placeholder from './Placeholder';

const portraitBg = {
  blush: 'bg-blush',
  sky: 'bg-sky',
  butter: 'bg-butter',
};

/* Round portrait on a colour block. Falls back to a placeholder
   until `src` is provided. */
export default function Portrait({ src, alt, tone = 'sky', align = 'center', className = '' }) {
  if (!src) return <Placeholder tone={tone} label="Portrait" alt={alt} className={className} />;
  return (
    <div className={`relative flex justify-center overflow-hidden ${align === 'bottom' ? 'items-end pb-[7%]' : 'items-center'} ${portraitBg[tone]} ${className}`}>
      <img src={src} alt={alt} className="aspect-square w-[86%] rounded-full border-[6px] border-paper object-cover object-[50%_75%] shadow-soft" />
    </div>
  );
}
