import { ShoppingCart, Pencil, Trash2 } from 'lucide-react';
import type { Book } from '../../../models/book';
import Badge from '../ui/Badge';

interface Props {
  book: Book;
  onEdit?: (book: Book) => void;
  onDelete?: (id: string) => void;
}

export default function BookDetail({ book, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden max-w-2xl mx-auto">
      {/* Cover */}
      <div
        className="h-56 flex items-center justify-center"
        style={{ backgroundColor: book.coverBg }}
      >
        <div className="text-center">
          <div className="text-8xl font-black leading-none" style={{ color: book.coverText }}>
            {book.label}
          </div>
          <div className="text-sm text-[#888888] mt-3 font-medium">משבצת</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="green">{book.grade}</Badge>
          <Badge variant="gray">{book.category}</Badge>
          {!book.isAvailable && <Badge variant="disabled">אזל מהמלאי</Badge>}
        </div>

        <h1 className="text-2xl font-black text-[#1A1A1A] mb-1">{book.title}</h1>
        <p className="text-[#888888] text-sm mb-4">{book.subtitle}</p>

        {book.description && (
          <p className="text-[#555555] leading-relaxed mb-6">{book.description}</p>
        )}

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
