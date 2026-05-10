export type Grade =
  | "א׳" | "ב׳" | "ג׳" | "ד׳" | "ה׳" | "ו׳" | "ז׳" | "ח׳" | "ט׳";

export type Category = "יסודי" | "חטיבה" | "תיכון" | "דיגיטלי";

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  grade: Grade;
  category: Category;
  coverBg: string;
  coverText: string;
  label: string;
  price: number;
  isDigital: boolean;
  isAvailable: boolean;
  description?: string;
  imageUrl?: string;
}

export type BookFormData = Omit<Book, "id">;
