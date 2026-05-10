import { useState } from 'react';
import { ShoppingCart, Pencil, Trash2, User, Calendar, BookOpen, Tag } from 'lucide-react';
import type { Book } from '../../../models/book';
import Badge from '../ui/Badge';

interface Props {
  book: Book;
  onEdit?: (book: Book) => void;
  onDelete?: (id: string) => void;
}

export default function BookDetail({ book, onEdit, onDelete }: Props) {
  const [imgError, setImgError] = useState(false);
  const showImg = !!book.imgUrl && !imgError;

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden">
      {/* Cover */}
      <div className="h-72 relative overflow-hidden">
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
              <div className="text-8xl font-black leading-none" style={{ color: book.coverText }}>
                {book.label}
              </div>
              <div className="text-sm text-[#888888] mt-3 font-medium">משבצת</div>
            </div>
          </div>
        )}

        {/* Overlay info on image */}
        {showImg && (
          <div className="absolute bottom-0 inset-x-0 px-6 py-4" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.6))' }}>
            <p className="text-white font-black text-2xl">{book.title}</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Badges */}
        <div className="flex items-center flex-wrap gap-2 mb-4">
          <Badge variant="green">{book.grade}</Badge>
          <Badge variant="gray">{book.category}</Badge>
          {book.units && <Badge variant="gray">{book.units}</Badge>}
          {book.examCode && (
            <span className="inline-block text-xs font-semibold bg-[#1A1A1A] text-white rounded-full px-3 py-0.5">
              {book.examCode}
            </span>
          )}
          {book.level && <Badge variant="gray">{book.level}</Badge>}
          {!book.isAvailable && <Badge variant="disabled">אזל מהמלאי</Badge>}
        </div>

        {/* Title (shown below cover when no image overlay) */}
        {!showImg && (
          <h1 className="text-2xl font-black text-[#1A1A1A] mb-1">{book.title}</h1>
        )}
        <p className="text-[#888888] text-sm mb-5">{book.subtitle}</p>

        {/* Meta row */}
        <div className="flex flex-wrap gap-5 text-sm text-[#555555] mb-6 border-y border-[#F0F0F0] py-4">
          {book.author && (
            <span className="flex items-center gap-1.5">
              <User size={14} className="text-[#16A34A]" />
              {book.author}
            </span>
          )}
          {book.publishYear && (
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-[#16A34A]" />
              {book.publishYear}
            </span>
          )}
          {book.pages && (
            <span className="flex items-center gap-1.5">
              <BookOpen size={14} className="text-[#16A34A]" />
              {book.pages} עמודים
            </span>
          )}
        </div>

        {/* Description */}
        {book.description && (
          <p className="text-[#555555] leading-relaxed mb-6">{book.description}</p>
        )}

        {/* Tags */}
        {book.tags && book.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mb-6">
            <Tag size={13} className="text-[#888888]" />
            {book.tags.map((tag) => (
              <span key={tag} className="text-xs text-[#555555] bg-[#F5F5F5] px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Buy row */}
        <div className="flex items-center gap-4 pt-4 border-t border-[#F0F0F0]">
          <span className="text-2xl font-bold text-[#16A34A]">₪{book.price}</span>

          <button
            disabled={!book.isAvailable}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[30px] font-semibold text-sm transition-colors ${
              book.isAvailable
                ? 'bg-[#16A34A] text-white hover:bg-[#15803D]'
                : 'bg-[#E5E5E5] text-[#AAAAAA] cursor-not-allowed'
            }`}
          >
            <ShoppingCart size={16} />
            רכישה מהירה
          </button>

          {onEdit && (
            <button
              onClick={() => onEdit(book)}
              className="p-3 border border-[#E5E5E5] rounded-lg hover:bg-[#F5F5F5] transition-colors"
              title="עריכה"
            >
              <Pencil size={16} className="text-[#555555]" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(book.id)}
              className="p-3 border border-[#E5E5E5] rounded-lg hover:bg-red-50 transition-colors"
              title="מחיקה"
            >
              <Trash2 size={16} className="text-red-500" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
