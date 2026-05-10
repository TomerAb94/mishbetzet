import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useAdminBooks } from '../../hooks/useAdminBooks';
import BookForm from '../components/book/BookForm';
import type { Book, BookFormData } from '../../models/book';
import Badge from '../components/ui/Badge';
import SectionHeader from '../components/ui/SectionHeader';

type Mode = 'view' | 'create' | 'edit';

export default function AdminPage() {
  const { books, loading, error, selectedBook, select, clear, create, update, remove } = useAdminBooks();
  const [mode, setMode] = useState<Mode>('view');
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openCreate = () => { clear(); setMode('create'); };
  const openEdit = (book: Book) => { select(book.id); setMode('edit'); };
  const closePanel = () => { clear(); setMode('view'); };

  const handleSubmit = async (data: BookFormData) => {
    setSubmitting(true);
    try {
      if (mode === 'create') await create(data);
      else if (mode === 'edit' && selectedBook) await update(selectedBook.id, data);
      closePanel();
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    await remove(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-10">
          <SectionHeader eyebrow="ניהול" title="ממשק מנהל" subtitle="ניהול ספרי הקטלוג" />
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-[#16A34A] text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-[#15803D] transition-colors text-sm mt-1"
          >
            <Plus size={16} />
            ספר חדש
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="flex gap-6">
          {/* Book list */}
          <div className="flex-1">
            {loading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-white border border-[#E5E5E5] rounded-lg h-20 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {books.map((book) => (
                  <div
                    key={book.id}
                    className={`bg-white border rounded-lg p-4 flex items-center gap-4 transition-all ${
                      selectedBook?.id === book.id ? 'border-[#16A34A]' : 'border-[#E5E5E5]'
                    }`}
                  >
                    {/* Mini cover */}
                    <div
                      className="w-12 h-14 rounded flex items-center justify-center shrink-0"
                      style={{ backgroundColor: book.coverBg }}
                    >
                      <span className="text-lg font-black" style={{ color: book.coverText }}>
                        {book.label}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#1A1A1A] text-sm truncate">{book.title}</p>
                      <p className="text-[#888888] text-xs truncate">{book.subtitle}</p>
                      <div className="flex gap-1 mt-1">
                        <Badge variant="green">{book.grade}</Badge>
                        <Badge variant="gray">{book.category}</Badge>
                        {!book.isAvailable && <Badge variant="disabled">אזל</Badge>}
                      </div>
                    </div>

                    {/* Price */}
                    <span className="text-[#16A34A] font-bold text-sm shrink-0">₪{book.price}</span>

                    {/* Actions */}
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => openEdit(book)}
                        className="text-xs font-semibold text-[#555555] border border-[#E5E5E5] px-3 py-1.5 rounded-lg hover:bg-[#F5F5F5] transition-colors"
                      >
                        עריכה
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(book.id)}
                        className="text-xs font-semibold text-red-500 border border-[#E5E5E5] px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        מחיקה
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Side panel */}
          {mode !== 'view' && (
            <div className="w-96 shrink-0">
              <div className="bg-white border border-[#E5E5E5] rounded-lg p-6 sticky top-36">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-[#1A1A1A]">
                    {mode === 'create' ? 'הוספת ספר חדש' : 'עריכת ספר'}
                  </h3>
                  <button onClick={closePanel} className="text-[#888888] hover:text-[#1A1A1A]">
                    <X size={18} />
                  </button>
                </div>
                <BookForm
                  initialData={mode === 'edit' && selectedBook ? selectedBook : undefined}
                  onSubmit={handleSubmit}
                  onCancel={closePanel}
                  submitting={submitting}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-6">
          <div className="bg-white rounded-lg p-8 max-w-sm w-full shadow-xl">
            <h3 className="font-bold text-[#1A1A1A] text-lg mb-2">מחיקת ספר</h3>
            <p className="text-[#555555] text-sm mb-6">האם אתם בטוחים שברצונכם למחוק את הספר? לא ניתן לבטל פעולה זו.</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 bg-red-500 text-white font-semibold py-2.5 rounded-lg hover:bg-red-600 transition-colors text-sm"
              >
                מחיקה
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 border border-[#E5E5E5] text-[#555555] font-semibold py-2.5 rounded-lg hover:bg-[#F5F5F5] transition-colors text-sm"
              >
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
