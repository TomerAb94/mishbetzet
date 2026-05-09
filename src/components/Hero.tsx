import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    h1: 'הספרים שיכינו אותך לבגרות',
    sub: 'משבצת - הדרך הבטוחה לבגרות בהצטיינות',
    subAs: 'h3' as const,
    btn: 'לרשימת הספרים ›',
    bg: '#FFFFFF',
  },
  {
    id: 2,
    h1: 'כל הספרים מאושרים ע"י משרד החינוך',
    sub: 'הזמינו את הספרים החדשים ביותר',
    subAs: 'h2' as const,
    btn: 'צרו קשר להזמנה ›',
    bg: '#F0FDF4',
  },
  {
    id: 3,
    h1: 'לומדים בדיגיטל',
    sub: 'הספרים שלנו זמינים בגרסא דיגיטלית',
    subAs: 'h2' as const,
    btn: 'לצפייה ›',
    bg: '#EFF6FF',
  },
];

// Cloned track: [last, ...slides, first] — enables seamless infinite loop
const extended = [slides[slides.length - 1], ...slides, slides[0]];

const INTERVAL = 5000;
const NAV_H = 64; // px — matches Nav h-16

export default function Hero() {
  const [index, setIndex] = useState(1); // starts at real slide 0 (offset by 1 clone)
  const [animated, setAnimated] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const busy = useRef(false); // true while a transition is in flight

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (busy.current) return;
      busy.current = true;
      setAnimated(true);
      setIndex((prev) => prev + 1);
    }, INTERVAL);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  // After landing on a clone, instantly snap to the real equivalent slide
  const handleTransitionEnd = () => {
    if (index === 0) {
      setAnimated(false);
      setIndex(slides.length); // snap to real last
    } else if (index === extended.length - 1) {
      setAnimated(false);
      setIndex(1); // snap to real first
    } else {
      busy.current = false;
    }
  };

  // Re-enable animation one frame after the snap (so next move animates)
  useEffect(() => {
    if (!animated) {
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimated(true);
          busy.current = false;
        })
      );
      return () => cancelAnimationFrame(id);
    }
  }, [animated]);

  const go = (newIndex: number) => {
    if (busy.current) return;
    busy.current = true;
    setAnimated(true);
    setIndex(newIndex);
    startTimer();
  };

  // Which dot to highlight (0-based real index)
  const dotActive =
    index === 0
      ? slides.length - 1
      : index === extended.length - 1
      ? 0
      : index - 1;

  return (
    <section className="relative overflow-hidden" dir="ltr">
      <ul
        onTransitionEnd={handleTransitionEnd}
        className="flex"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: animated ? 'transform 500ms ease-in-out' : 'none',
        }}
      >
        {extended.map((slide, i) => (
          <li
            key={i}
            dir="rtl"
            className="min-w-full flex items-center px-6"
            style={{
              backgroundColor: slide.bg,
              minHeight: `calc(100vh - ${NAV_H}px)`,
            }}
          >
            <div className="max-w-4xl mx-auto w-full">
              <h1 className="text-5xl font-black text-[#1A1A1A] leading-tight tracking-tight mb-4">
                {slide.h1}
              </h1>
              {slide.subAs === 'h3' ? (
                <h3 className="text-xl text-[#555555] mb-10">{slide.sub}</h3>
              ) : (
                <h2 className="text-2xl font-semibold text-[#555555] mb-10">{slide.sub}</h2>
              )}
              <button className="bg-[#16A34A] text-white font-semibold px-6 py-3 rounded-[30px] hover:bg-[#15803D] transition-colors text-sm">
                {slide.btn}
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Right arrow → previous slide (RTL) */}
      <button
        onClick={() => go(index - 1)}
        aria-label="הקודם"
        className="absolute top-1/2 -translate-y-1/2 right-4 bg-white border border-[#E5E5E5] rounded-full p-2 hover:bg-[#F5F5F5] transition-colors"
      >
        <ChevronRight size={20} className="text-[#1A1A1A]" />
      </button>

      {/* Left arrow → next slide (RTL) */}
      <button
        onClick={() => go(index + 1)}
        aria-label="הבא"
        className="absolute top-1/2 -translate-y-1/2 left-4 bg-white border border-[#E5E5E5] rounded-full p-2 hover:bg-[#F5F5F5] transition-colors"
      >
        <ChevronLeft size={20} className="text-[#1A1A1A]" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i + 1)}
            aria-label={`מעבר לשקופית ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === dotActive ? 'bg-[#16A34A]' : 'bg-[#D1D5DB]'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
