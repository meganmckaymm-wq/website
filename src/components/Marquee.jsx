import { Sparkles } from 'lucide-react';
import { marqueeItems } from '../data/content';

function Row({ hidden = false }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {marqueeItems.map((item) => (
        <li key={item} className="flex items-center gap-8 pr-8 font-poppins text-xl font-medium tracking-wide sm:text-2xl">
          {item}
          <Sparkles aria-hidden="true" className="size-6 fill-butter stroke-butter" />
        </li>
      ))}
    </ul>
  );
}

export default function Marquee() {
  return (
    <div className="overflow-hidden py-8" role="presentation">
      <div className="-rotate-1 scale-[1.03] bg-wine py-4 text-blush">
        <div className="flex w-max animate-marquee">
          <Row />
          <Row hidden />
        </div>
      </div>
    </div>
  );
}
