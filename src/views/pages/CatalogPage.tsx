import { useState } from 'react';
import { Search } from 'lucide-react';
import { useBooks } from '../../hooks/useBooks';
import BookGrid from '../components/book/BookGrid';
import SectionHeader from '../components/ui/SectionHeader';
import type { Category } from '../../models/book';

const FILTERS: { label: string; value: Category | undefined }[] = [
  { label: 'הכל', value: undefined },
  { label: 'יסודי (א–ו)', value: 'יסודי' },
  { label: 'חטיבה (ז–ט)', value: 'חטיבה' },
  { label: 'תיכון', value: 'תיכון' },
  { label: 'דיגיטלי', value: 'דיגיטלי' },
];

export default function CatalogPage() {
  const { books, loading, error, setCategory, setSearch } = useBooks();
  const [active, setActive] = useState<Category | undefined>(undefined);

  const handleCategory = (val: Category | undefined) => {
    setActive(val);
    setCategory(val);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Page header */}
      <div className="bg-white border-b border-[#E5E5E5] px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="הקטלוג שלנו"
            title="כל הספרים"
            subtitle={`${loading ? '...' : books.length} ספרים בסדרת משבצת — כיתות א׳ עד יב׳`}
          />

          {/* Search */}
          <div className="relative max-w-md">
            <Search size={16} className="absolute top-1/2 -translate-y-1/2 right-3 text-[#888888]" />
            <input
              type="text"
              placeholder="חיפוש לפי שם, כיתה, שאלון..."
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-[#E5E5E5] rounded-lg pr-9 pl-3 py-2.5 text-sm focus:outline-none focus:border-[#16A34A] transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap mb-8">
          {FILTERS.map((f) => (
            <button
              key={f.label}
              onClick={() => handleCategory(f.value)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                active === f.value
                  ? 'bg-[#16A34A] text-white border-[#16A34A]'
                  : 'bg-white text-[#555555] border-[#E5E5E5] hover:border-[#16A34A] hover:text-[#16A34A]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white border border-[#E5E5E5] rounded-lg h-80 animate-pulse" />
            ))}
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-24 text-[#888888]">
            <p className="text-lg font-semibold">לא נמצאו ספרים</p>
            <p className="text-sm mt-1">נסו לשנות את מונחי החיפוש</p>
          </div>
        ) : (
          <BookGrid books={books} />
        )}
      </div>
    </div>
  );
}
