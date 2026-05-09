import { BookOpen } from 'lucide-react';

const tabs = [
  { label: 'ספרים', id: 'books', active: true },
  { label: 'ספרים דיגיטליים', id: 'digital', active: false },
  { label: 'ממשק מורים', id: 'teachers', active: false },
];

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#E5E5E5]">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo — right side in RTL (first child) */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-[#1A1A1A] tracking-tight">משבצת</span>
          <BookOpen size={22} className="text-[#16A34A]" />
        </div>

        {/* Tabs — left side in RTL (second child) */}
        <div className="flex items-center gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              disabled={!tab.active}
              title={!tab.active ? 'בקרוב' : undefined}
              className={`text-sm font-semibold pb-1 border-b-2 transition-colors ${
                tab.active
                  ? 'border-[#16A34A] text-[#16A34A]'
                  : 'border-transparent text-[#BBBBBB] cursor-not-allowed'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
