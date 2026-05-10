import Hero from '../components/Hero';
import DigitalBooks from '../components/DigitalBooks';
import BookGrid from '../components/book/BookGrid';
import SectionHeader from '../components/ui/SectionHeader';
import Reveal from '../components/ui/Reveal';
import { useBooks } from '../../hooks/useBooks';

export default function HomePage() {
  const { books, loading } = useBooks();
  const featured = books.slice(0, 4);

  return (
    <>
      <Hero />

      <Reveal>
        <section className="bg-[#F5F5F5] px-6 flex flex-col justify-center" style={{ minHeight: 'calc(100vh - 64px)' }}>
          <div className="max-w-6xl mx-auto w-full">
            <SectionHeader
              eyebrow="הספרים שלנו"
              title="רבי המכר"
              subtitle="הספרים הנרכשים ביותר מסדרת משבצת"
            />
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white border border-[#E5E5E5] rounded-lg h-72 animate-pulse" />
                ))}
              </div>
            ) : (
              <BookGrid books={featured} />
            )}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <DigitalBooks />
      </Reveal>
    </>
  );
}
