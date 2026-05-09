import { ShoppingCart } from 'lucide-react';

interface Book {
  id: number;
  title: string;
  subtitle: string;
  grade: string;
  coverBg: string;
  coverText: string;
  label: string;
}

const books: Book[] = [
  {
    id: 1,
    title: 'משבצת — כיתה א׳',
    subtitle: 'חלק א׳ · תרגול וגילוי',
    grade: "כיתה א׳",
    coverBg: '#DBEAFE',
    coverText: '#1D4ED8',
    label: 'א׳',
  },
  {
    id: 2,
    title: 'משבצת — כיתה ב׳',
    subtitle: 'חלק א׳ · מספרים ופעולות',
    grade: "כיתה ב׳",
    coverBg: '#FEF9C3',
    coverText: '#A16207',
    label: 'ב׳',
  },
  {
    id: 3,
    title: 'משבצת — כיתה ג׳',
    subtitle: 'חלק א׳ · כפל, חילוק וגאומטריה',
    grade: "כיתה ג׳",
    coverBg: '#F3E8FF',
    coverText: '#7E22CE',
    label: 'ג׳',
  },
  {
    id: 4,
    title: 'משבצת — כיתה ד׳',
    subtitle: 'חלק א׳ · שברים וחשיבה מתמטית',
    grade: "כיתה ד׳",
    coverBg: '#CCFBF1',
    coverText: '#0F766E',
    label: 'ד׳',
  },
];

export default function Bestsellers() {
  return (
    <section className="bg-[#F5F5F5] px-6 flex flex-col justify-center" style={{ minHeight: 'calc(100vh - 64px)' }}>
      <div className="max-w-6xl mx-auto w-full">
        {/* Section header */}
        <div className="mb-10">
          <span className="text-xs font-semibold text-[#16A34A] tracking-widest uppercase">
            הספרים שלנו
          </span>
          <h2 className="text-3xl font-black text-[#1A1A1A] mt-1 mb-2">רבי המכר</h2>
          <p className="text-[#555555]">הספרים הנרכשים ביותר מסדרת משבצת</p>
        </div>

        {/* Book grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden flex flex-col"
            >
              {/* Cover */}
              <div
                className="h-44 flex items-center justify-center"
                style={{ backgroundColor: book.coverBg }}
              >
                <div className="text-center">
                  <div
                    className="text-5xl font-black leading-none"
                    style={{ color: book.coverText }}
                  >
                    {book.label}
                  </div>
                  <div className="text-xs text-[#888888] mt-2 font-medium">משבצת</div>
                </div>
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col flex-1">
                <span className="inline-block text-xs bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0] rounded-full px-2 py-0.5 mb-3 self-start">
                  {book.grade}
                </span>
                <h3 className="font-bold text-[#1A1A1A] text-base mb-1 leading-snug">
                  {book.title}
                </h3>
                <p className="text-[#888888] text-xs mb-5 flex-1">{book.subtitle}</p>
                <button className="w-full bg-[#16A34A] text-white text-sm font-semibold py-2.5 rounded-[30px] hover:bg-[#15803D] transition-colors flex items-center justify-center gap-2">
                  <ShoppingCart size={15} />
                  רכישה מהירה
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
