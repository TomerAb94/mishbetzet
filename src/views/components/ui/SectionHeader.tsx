interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ eyebrow, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-10">
      <span className="text-xs font-semibold text-[#16A34A] tracking-widest uppercase">
        {eyebrow}
      </span>
      <h2 className="text-3xl font-black text-[#1A1A1A] mt-1 mb-2">{title}</h2>
      {subtitle && <p className="text-[#555555]">{subtitle}</p>}
    </div>
  );
}
