import type { Book } from '../../../models/book';
import BookCard from '../ui/BookCard';

interface Props {
  books: Book[];
  onAddToCart?: (id: string) => void;
}

export default function BookGrid({ books, onAddToCart }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}
