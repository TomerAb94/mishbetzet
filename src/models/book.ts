export type Grade =
  | "א׳" | "ב׳" | "ג׳" | "ד׳" | "ה׳" | "ו׳"
  | "ז׳" | "ח׳" | "ט׳"
  | "י׳" | "יא׳" | "יב׳";

export type Category = "יסודי" | "חטיבה" | "תיכון" | "דיגיטלי";

export type Level = "בסיסי" | "מורחב";

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  grade: Grade;
  category: Category;
  coverBg: string;
  coverText: string;
  label: string;
  price: number;
  isDigital: boolean;
  isAvailable: boolean;
  imgUrl?: string;
  examCode?: string;    // e.g. "שאלון 582"
  units?: string;       // e.g. "4 יחידות לימוד"
  level?: Level;        // בסיסי / מורחב (high school only)
  author?: string;
  publishYear?: number;
  pages?: number;
  tags?: string[];
}

export type BookFormData = Omit<Book, "id">;
