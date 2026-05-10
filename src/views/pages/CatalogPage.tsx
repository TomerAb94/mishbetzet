import { Search } from 'lucide-react';
import { useBooks } from '../../hooks/useBooks';
import BookGrid from '../components/book/BookGrid';
import SectionHeader from '../components/ui/SectionHeader';
import type { Category } from '../../models/book';

const CATEGORIES: { label: string; value: Category | undefined }[] = [
  { label: 'הכל', value: undefined },
  { label: 'יסודי', value: 'יסודי' },
  { label: 'חטיבה', value: 'חטיבה' },
  { label: 'תיכון', value: 'תיכון' },
  { label: 'דיגיטלי', value: 'דיגיטלי' },
];

export default function CatalogPage() {
  const { books, loading, error, setCategory, setSearch } = useBooks();

  return (
    <section className="bg-[#F5F5F5] min-h-screen px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="הקטלוג שלנו"
          title="כל הספרים"
          subtitle="סדרת משבצת לכיתות א׳–ט׳"
        />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute top-1/2 -translate-y-1/2 right-3 text-[#888888]" />
            <input
              type="text"
              placeholder="חיפוש ספר..."
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-[#E5E5E5] rounded-lg pr-9 pl-3 py-2 text-sm focus:outline-none focus:border-[#16A34A] transition-colors bg-white"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setCategory(cat.value)}
                className="px-4 py-2 rounded-full text-sm font-semibold border border-[#E5E5E5] bg-white text-[#555555] hover:border-[#16A34A] hover:text-[#16A34A] transition-colors"
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white border border-[#E5E5E5] rounded-lg h-72 animate-pulse" />
            ))}
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-20 text-[#888888]">
            <p className="text-lg font-semibold">לא נמצאו ספרים</p>
            <p className="text-sm mt-1">נסו לשנות את מונחי החיפוש</p>
          </div>
        ) : (
          <BookGrid books={books} />
        )}
      </div>
    </section>
  );
}
