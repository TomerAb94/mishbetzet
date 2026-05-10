import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useBook } from '../../hooks/useBook';
import BookDetail from '../components/book/BookDetail';

export default function BookDetailPage() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const { book, loading, error } = useBook(bookId ?? '');

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] px-6 py-16 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white border border-[#E5E5E5] rounded-lg h-96 animate-pulse" />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] px-6 py-16 flex flex-col items-center justify-center gap-4">
        <p className="text-[#888888] text-lg">{error ?? 'הספר לא נמצא'}</p>
        <button
          onClick={() => navigate('/catalog')}
          className="text-[#16A34A] font-semibold hover:underline"
        >
          חזרה לקטלוג
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-[#888888] hover:text-[#16A34A] transition-colors mb-8"
        >
          <ArrowRight size={16} />
          חזרה
        </button>
        <BookDetail book={book} />
      </div>
    </div>
  );
}
