import { Search, Phone } from 'lucide-react';
import { useState } from 'react';

export default function Hero() {
  const [query, setQuery] = useState('');

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Badge */}
        <span className="inline-block bg-[#16A34A] text-white text-xs font-semibold px-3 py-1 rounded-full mb-6">
          המוביל בהוראת המתמטיקה בבית הספר היסודי
        </span>

        {/* Heading */}
        <h1 className="text-5xl font-black text-[#1A1A1A] leading-tight tracking-tight mb-5">
          ספרי לימוד שמלמדים<br />
          <span className="text-[#16A34A]">מתמטיקה באמת</span>
        </h1>

        {/* Subtitle */}
        <p className="text-[#555555] text-lg leading-relaxed mb-10 max-w-2xl">
          סדרת <strong className="text-[#1A1A1A]">משבצת</strong> — ספרי מתמטיקה לכיתות א׳–ה׳,
          מאושרים ומוכחים בבתי ספר ברחבי ישראל.
        </p>

        {/* Search bar */}
        <div className="flex flex-col sm:flex-row gap-3 max-w-xl mb-4">
          <div className="relative flex-1">
            <Search
              size={17}
              className="absolute top-1/2 -translate-y-1/2 right-4 text-[#888888] pointer-events-none"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="חפש ספר לפי כיתה או נושא..."
              className="w-full border border-[#E5E5E5] rounded-md py-3 pr-11 pl-4 text-[#1A1A1A] placeholder-[#AAAAAA] focus:outline-none focus:border-[#16A34A] text-sm transition-colors"
            />
          </div>
          <button className="bg-[#16A34A] text-white font-semibold px-6 py-3 rounded-md hover:bg-[#15803D] transition-colors text-sm whitespace-nowrap flex items-center gap-2">
            <Phone size={15} />
            צרו קשר להזמנה
          </button>
        </div>

        {/* Trust line */}
        <p className="text-[#888888] text-sm">
          טלפון: <a href="tel:04-8401003" className="text-[#555555] font-medium hover:text-[#16A34A] transition-colors">04-8401003</a>
        </p>
      </div>
    </section>
  );
}
