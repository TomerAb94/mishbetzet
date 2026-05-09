import { useState } from 'react';
import { BookOpen, Menu, X } from 'lucide-react';

const tabs = [
  { label: 'כל הספרים', id: 'books', active: true },
  { label: 'ספרים דיגיטליים', id: 'digital', active: false },
  { label: 'ממשק מורים', id: 'teachers', active: false },
];

const secondaryLinks = [
  'מכירות',
  'כיתה ז',
  'כיתה ח',
  'כיתה ט',
  '3 יחידות 2026',
  '4 יחידות 2026',
  '5 יחידות 2026',
  'מבחני בגרות',
  'אודות',
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50">
        {/* Upper bar */}
        <div className="bg-white border-b border-[#E5E5E5]">
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
            {/* Logo — right in RTL */}
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-[#1A1A1A] tracking-tight">משבצת</span>
              <BookOpen size={22} className="text-[#16A34A]" />
            </div>

            {/* Left side: desktop tabs OR mobile burger */}
            <div className="flex items-center gap-8">
              <div className="hidden md:flex items-center gap-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    disabled={!tab.active}
                    title={!tab.active ? 'בקרוב' : undefined}
                    className={`text-md font-semibold pb-1 border-b-2 transition-colors ${
                      tab.active
                        ? 'border-[#16A34A] text-[#16A34A]'
                        : 'border-transparent text-[#BBBBBB] cursor-not-allowed'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <button
                className="md:hidden p-1 text-[#1A1A1A]"
                onClick={() => setOpen(true)}
                aria-label="תפריט"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Lower bar — desktop only */}
        <div className="hidden md:block bg-[#1A1A1A] h-16">
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-full overflow-x-auto">
            {secondaryLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-md text-[#CCCCCC] hover:text-white whitespace-nowrap transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Full-screen mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col md:hidden">
          {/* Overlay header */}
          <div className="flex items-center justify-between px-6 h-16 border-b border-[#E5E5E5] shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-[#1A1A1A] tracking-tight">משבצת</span>
              <BookOpen size={22} className="text-[#16A34A]" />
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="סגור"
              className="p-1 text-[#1A1A1A]"
            >
              <X size={26} />
            </button>
          </div>

          {/* Links */}
          <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-1">
            {/* Tabs */}
            <p className="text-xs font-semibold text-[#888888] uppercase tracking-widest mb-3">ראשי</p>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                disabled={!tab.active}
                className={`text-right text-lg font-semibold py-3 border-b border-[#F0F0F0] transition-colors ${
                  tab.active ? 'text-[#1A1A1A] hover:text-[#16A34A]' : 'text-[#BBBBBB] cursor-not-allowed'
                }`}
              >
                {tab.label}
              </button>
            ))}

            <p className="text-xs font-semibold text-[#888888] uppercase tracking-widest mt-6 mb-3">ספרים</p>
            {secondaryLinks.map((link) => (
              <a
                key={link}
                href="#"
                onClick={() => setOpen(false)}
                className="text-right text-lg font-semibold py-3 border-b border-[#F0F0F0] text-[#1A1A1A] hover:text-[#16A34A] transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
