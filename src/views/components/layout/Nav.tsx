import { useState } from 'react';
import { BookOpen, Menu, X } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';

const tabs = [
  { label: 'כל הספרים', to: '/catalog', active: true },
  { label: 'ספרים דיגיטליים', to: '/digital', active: false },
  { label: 'ממשק מורים', to: '/admin', active: false },
];

const secondaryLinks = [
  { label: 'מכירות', to: '/catalog' },
  { label: "כיתה ז'", to: '/catalog?grade=ז׳' },
  { label: "כיתה ח'", to: '/catalog?grade=ח׳' },
  { label: "כיתה ט'", to: '/catalog?grade=ט׳' },
  { label: '3 יחידות 2026', to: '/catalog' },
  { label: '4 יחידות 2026', to: '/catalog' },
  { label: '5 יחידות 2026', to: '/catalog' },
  { label: 'מבחני בגרות', to: '/catalog' },
  { label: 'אודות', to: '/contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50">
        {/* Upper bar */}
        <div className="bg-white border-b border-[#E5E5E5]">
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-black text-[#1A1A1A] tracking-tight">משבצת</span>
              <BookOpen size={22} className="text-[#16A34A]" />
            </Link>

            {/* Desktop tabs */}
            <div className="flex items-center gap-8">
              <div className="hidden md:flex items-center gap-8">
                {tabs.map((tab) =>
                  tab.active ? (
                    <NavLink
                      key={tab.to}
                      to={tab.to}
                      className={({ isActive }) =>
                        `text-md font-semibold pb-1 border-b-2 transition-colors ${
                          isActive
                            ? 'border-[#16A34A] text-[#16A34A]'
                            : 'border-transparent text-[#1A1A1A] hover:text-[#16A34A]'
                        }`
                      }
                    >
                      {tab.label}
                    </NavLink>
                  ) : (
                    <button
                      key={tab.to}
                      disabled
                      title="בקרוב"
                      className="text-md font-semibold pb-1 border-b-2 border-transparent text-[#BBBBBB] cursor-not-allowed"
                    >
                      {tab.label}
                    </button>
                  )
                )}
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
        <div className="hidden md:block bg-[#1A1A1A] h-16 shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-full overflow-x-auto">
            {secondaryLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-md text-[#CCCCCC] hover:text-white whitespace-nowrap transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col md:hidden">
          <div className="flex items-center justify-between px-6 h-16 border-b border-[#E5E5E5] shrink-0">
            <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
              <span className="text-2xl font-black text-[#1A1A1A] tracking-tight">משבצת</span>
              <BookOpen size={22} className="text-[#16A34A]" />
            </Link>
            <button onClick={() => setOpen(false)} aria-label="סגור" className="p-1 text-[#1A1A1A]">
              <X size={26} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-1">
            <p className="text-xs font-semibold text-[#888888] uppercase tracking-widest mb-3">ראשי</p>
            {tabs.map((tab) =>
              tab.active ? (
                <NavLink
                  key={tab.to}
                  to={tab.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `text-right text-lg font-semibold py-3 border-b border-[#F0F0F0] transition-colors ${
                      isActive ? 'text-[#16A34A]' : 'text-[#1A1A1A] hover:text-[#16A34A]'
                    }`
                  }
                >
                  {tab.label}
                </NavLink>
              ) : (
                <button
                  key={tab.to}
                  disabled
                  className="text-right text-lg font-semibold py-3 border-b border-[#F0F0F0] text-[#BBBBBB] cursor-not-allowed"
                >
                  {tab.label}
                </button>
              )
            )}

            <p className="text-xs font-semibold text-[#888888] uppercase tracking-widest mt-6 mb-3">ספרים</p>
            {secondaryLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setOpen(false)}
                className="text-right text-lg font-semibold py-3 border-b border-[#F0F0F0] text-[#1A1A1A] hover:text-[#16A34A] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
