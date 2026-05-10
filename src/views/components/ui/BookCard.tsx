import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Book } from '../../../models/book';
import Badge from './Badge';

interface Props {
  book: Book;
  onAddToCart?: (id: string) => void;
}

export default function BookCard({ book, onAddToCart }: Props) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden flex flex-col cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate(`/books/${book.id}`)}
    >
      {/* Cover */}
      <div className="h-44 flex items-center justify-center" style={{ backgroundColor: book.coverBg }}>
        <div className="text-center">
          <div className="text-5xl font-black leading-none" style={{ color: book.coverText }}>
            {book.label}
          </div>
          <div className="text-xs text-[#888888] mt-2 font-medium">משבצת</div>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <Badge variant="green">{book.grade}</Badge>
        <h3 className="font-bold text-[#1A1A1A] text-base mb-1 leading-snug mt-3">{book.title}</h3>
        <p className="text-[#888888] text-xs mb-5 flex-1">{book.subtitle}</p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[#16A34A] font-bold text-sm">₪{book.price}</span>
        </div>
        <button
          disabled={!book.isAvailable}
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.(book.id);
          }}
          className={`w-full text-white text-sm font-semibold py-2.5 rounded-[30px] transition-colors flex items-center justify-center gap-2 ${
            book.isAvailable
              ? 'bg-[#16A34A] hover:bg-[#15803D]'
              : 'bg-[#E5E5E5] text-[#AAAAAA] cursor-not-allowed'
          }`}
        >
          <ShoppingCart size={15} />
          רכישה מהירה
        </button>
      </div>
    </div>
  );
}
