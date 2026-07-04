export default function Marquee({ items }: { items: string[] }) {
  const track = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden border-y-4 border-ink bg-ink py-3 text-void">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap font-display text-lg font-bold uppercase tracking-widest sm:text-xl">
        {track.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            {item}
            <span className="text-magenta">{"//"}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
