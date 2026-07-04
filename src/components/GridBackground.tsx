export default function GridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-noise opacity-20" />
      <div className="absolute -left-40 top-[-10%] h-[500px] w-[500px] rounded-full bg-magenta/20 blur-[120px]" />
      <div className="absolute right-[-10%] top-[30%] h-[420px] w-[420px] rounded-full bg-cyan/15 blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[20%] h-[420px] w-[420px] rounded-full bg-acid/10 blur-[120px]" />
    </div>
  );
}
