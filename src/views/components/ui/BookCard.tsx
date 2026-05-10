import { useState } from 'react';
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
  const [imgError, setImgError] = useState(false);
  const showImg = !!book.imgUrl && !imgError;

  return (
    <div
      className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden flex flex-col cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate(`/books/${book.id}`)}
    >
      {/* Cover */}
      <div className="h-52 relative overflow-hidden">
        {showImg ? (
          <img
            src={book.imgUrl}
            alt={book.title}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: book.coverBg }}>
            <div className="text-center">
              <div className="text-5xl font-black leading-none" style={{ color: book.coverText }}>
                {book.label}
              </div>
              <div className="text-xs text-[#888888] mt-2 font-medium">משבצת</div>
            </div>
          </div>
        )}

        {/* Grade label overlay when showing image */}
        {showImg && (
          <div className="absolute bottom-0 inset-x-0 px-3 py-2" style={{ backgroundColor: book.coverBg + 'DD' }}>
            <span className="text-xs font-black" style={{ color: book.coverText }}>{book.label}</span>
          </div>
        )}

        {/* Exam code badge */}
        {book.examCode && (
          <div className="absolute top-2 right-2">
            <span className="bg-[#1A1A1A]/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
              {book.examCode}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1 flex-wrap mb-2">
          <Badge variant="green">{book.grade}</Badge>
          {book.units && (
            <Badge variant="gray">{book.units}</Badge>
          )}
        </div>

        <h3 className="font-bold text-[#1A1A1A] text-sm mb-1 leading-snug">{book.title}</h3>
        <p className="text-[#888888] text-xs mb-4 flex-1 line-clamp-2">{book.subtitle}</p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-[#16A34A] font-bold text-sm">₪{book.price}</span>
          {book.author && <span className="text-[#888888] text-xs">{book.author}</span>}
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
          <ShoppingCart size={14} />
          רכישה מהירה
        </button>
      </div>
    </div>
  );
}
