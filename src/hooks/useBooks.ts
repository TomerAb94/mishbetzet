import { useState, useEffect, useCallback } from 'react';
import type { Book, Category } from '../models/book';
import { getBooks } from '../services/bookService';

export function useBooks(initialCategory?: Category) {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<Category | undefined>(initialCategory);
  const [search, setSearch] = useState('');

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBooks();
      setAllBooks(data);
    } catch {
      setError('שגיאה בטעינת הספרים');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBooks(); }, [fetchBooks]);

  useEffect(() => {
    let filtered = allBooks;
    if (category) filtered = filtered.filter((b) => b.category === category);
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (b) => b.title.includes(q) || b.subtitle.includes(q) || b.grade.includes(q)
      );
    }
    setBooks(filtered);
  }, [allBooks, category, search]);

  return { books, loading, error, setCategory, setSearch, refresh: fetchBooks };
}
