import { useState, useCallback } from 'react';
import type { Book, BookFormData } from '../models/book';
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from '../services/bookService';
import { useEffect } from 'react';

export function useAdminBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBooks();
      setBooks(data);
    } catch {
      setError('שגיאה בטעינת הספרים');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const select = (id: string) => {
    setSelectedBook(books.find((b) => b.id === id) ?? null);
  };

  const clear = () => setSelectedBook(null);

  const create = async (data: BookFormData) => {
    await createBook(data);
    await refresh();
  };

  const update = async (id: string, data: Partial<BookFormData>) => {
    await updateBook(id, data);
    await refresh();
    setSelectedBook(null);
  };

  const remove = async (id: string) => {
    await deleteBook(id);
    await refresh();
    if (selectedBook?.id === id) setSelectedBook(null);
  };

  return { books, loading, error, selectedBook, select, clear, create, update, remove };
}
