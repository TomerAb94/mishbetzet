import { useState, useEffect } from 'react';
import type { Book } from '../models/book';
import { getBookById } from '../services/bookService';

export function useBook(id: string) {
  const [book, setBook] = useState<Book | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getBookById(id)
      .then((data) => {
        if (!data) setError('הספר לא נמצא');
        else setBook(data);
      })
      .catch(() => setError('שגיאה בטעינת הספר'))
      .finally(() => setLoading(false));
  }, [id]);

  return { book, loading, error };
}
