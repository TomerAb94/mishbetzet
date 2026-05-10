import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { HeroSlide } from '../../models/slide';
import { MOCK_SLIDES } from '../../models/mock/slides.mock';

const extended = [MOCK_SLIDES[MOCK_SLIDES.length - 1], ...MOCK_SLIDES, MOCK_SLIDES[0]];

const INTERVAL = 5000;
const NAV_H = 128;

export default function Hero() {
  const [index, setIndex] = useState(1);
  const [animated, setAnimated] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const busy = useRef(false);
  const navigate = useNavigate();

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

  const handleTransitionEnd = () => {
    if (index === 0) {
      setAnimated(false);
      setIndex(MOCK_SLIDES.length);
    } else if (index === extended.length - 1) {
      setAnimated(false);
      setIndex(1);
    } else {
      busy.current = false;
    }
  };

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

  const dotActive =
    index === 0
      ? MOCK_SLIDES.length - 1
      : index === extended.length - 1
      ? 0
      : index - 1;

  const handleSlideBtn = (slide: HeroSlide) => {
    if (slide.id === 1 || slide.id === 2) navigate('/catalog');
    else navigate('/catalog');
  };

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
              <h1 className="text-[60px] font-bold text-[#1A1A1A] leading-tight tracking-tight mb-4">
                {slide.h1}
              </h1>
              {slide.subAs === 'h3' ? (
                <h3 className="text-[33px] font-bold text-[#555555] mb-10">{slide.sub}</h3>
              ) : (
                <h2 className="text-[33px] font-bold text-[#555555] mb-10">{slide.sub}</h2>
              )}
              <button
                onClick={() => handleSlideBtn(slide)}
                className="bg-[#16A34A] text-white font-semibold px-6 py-3 rounded-[30px] hover:bg-[#15803D] transition-colors text-sm"
              >
                <span className="text-[15px]">{slide.btn}</span>
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button
        onClick={() => go(index + 1)}
        aria-label="הבא"
        className="absolute top-1/2 -translate-y-1/2 right-4 p-2 hover:opacity-60 transition-opacity"
      >
        <ChevronRight size={52} strokeWidth={1.2} className="text-[#1A1A1A]" />
      </button>

      <button
        onClick={() => go(index - 1)}
        aria-label="הקודם"
        className="absolute top-1/2 -translate-y-1/2 left-4 p-2 hover:opacity-60 transition-opacity"
      >
        <ChevronLeft size={52} strokeWidth={1.2} className="text-[#1A1A1A]" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {MOCK_SLIDES.map((_, i) => (
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
