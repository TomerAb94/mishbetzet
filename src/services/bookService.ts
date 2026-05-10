import type { Book, BookFormData } from '../models/book';
import { MOCK_BOOKS } from '../models/mock/books.mock';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// In-memory store for mock CRUD (simulates a database)
let store: Book[] = [...MOCK_BOOKS];

export async function getBooks(): Promise<Book[]> {
  await delay(120);
  return [...store];
}

export async function getBookById(id: string): Promise<Book | undefined> {
  await delay(80);
  return store.find((b) => b.id === id);
}

export async function searchBooks(query: string): Promise<Book[]> {
  await delay(100);
  const q = query.toLowerCase();
  return store.filter(
    (b) =>
      b.title.includes(q) ||
      b.subtitle.includes(q) ||
      b.grade.includes(q) ||
      b.category.includes(q)
  );
}

export async function createBook(data: BookFormData): Promise<Book> {
  await delay(150);
  const newBook: Book = {
    ...data,
    id: String(Date.now()),
  };
  store = [...store, newBook];
  return newBook;
}

export async function updateBook(id: string, data: Partial<BookFormData>): Promise<Book> {
  await delay(150);
  const idx = store.findIndex((b) => b.id === id);
  if (idx === -1) throw new Error(`ספר עם מזהה ${id} לא נמצא`);
  const updated = { ...store[idx], ...data };
  store = store.map((b) => (b.id === id ? updated : b));
  return updated;
}

export async function deleteBook(id: string): Promise<void> {
  await delay(120);
  store = store.filter((b) => b.id !== id);
}
