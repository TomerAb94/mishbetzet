import type { BookFormData, Grade, Category, Level } from '../../../models/book';

const GRADES: Grade[] = [
  "א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳",
  "ז׳", "ח׳", "ט׳",
  "י׳", "יא׳", "יב׳",
];
const CATEGORIES: Category[] = ["יסודי", "חטיבה", "תיכון", "דיגיטלי"];
const LEVELS: Level[] = ["בסיסי", "מורחב"];

const EMPTY: BookFormData = {
  title: '',
  subtitle: '',
  description: '',
  grade: "א׳",
  category: 'יסודי',
  coverBg: '#DBEAFE',
  coverText: '#1D4ED8',
  label: "א׳",
  price: 89,
  isDigital: false,
  isAvailable: true,
  imgUrl: '',
  examCode: '',
  units: '',
  level: undefined,
  author: '',
  publishYear: new Date().getFullYear(),
  pages: 150,
  tags: [],
};

interface Props {
  initialData?: Partial<BookFormData>;
  onSubmit: (data: BookFormData) => void;
  onCancel: () => void;
  submitting: boolean;
}

const inputCls =
  'w-full border border-[#E5E5E5] rounded-lg px-3 py-2 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#16A34A] transition-colors';
const labelCls = 'block text-xs font-semibold text-[#888888] mb-1';

export default function BookForm({ initialData, onSubmit, onCancel, submitting }: Props) {
  const defaults = { ...EMPTY, ...initialData };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const tagsRaw = (fd.get('tags') as string).trim();
    const data: BookFormData = {
      title: fd.get('title') as string,
      subtitle: fd.get('subtitle') as string,
      description: fd.get('description') as string,
      grade: fd.get('grade') as Grade,
      category: fd.get('category') as Category,
      coverBg: fd.get('coverBg') as string,
      coverText: fd.get('coverText') as string,
      label: fd.get('label') as string,
      price: Number(fd.get('price')),
      isDigital: fd.get('isDigital') === 'true',
      isAvailable: fd.get('isAvailable') === 'true',
      imgUrl: (fd.get('imgUrl') as string) || undefined,
      examCode: (fd.get('examCode') as string) || undefined,
      units: (fd.get('units') as string) || undefined,
      level: (fd.get('level') as Level) || undefined,
      author: (fd.get('author') as string) || undefined,
      publishYear: Number(fd.get('publishYear')) || undefined,
      pages: Number(fd.get('pages')) || undefined,
      tags: tagsRaw ? tagsRaw.split(',').map((t) => t.trim()).filter(Boolean) : undefined,
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-h-[70vh] overflow-y-auto pl-1">
      <div className="grid grid-cols-2 gap-3">

        <div className="col-span-2">
          <label className={labelCls}>שם הספר</label>
          <input name="title" defaultValue={defaults.title} required className={inputCls} />
        </div>

        <div className="col-span-2">
          <label className={labelCls}>תת-כותרת</label>
          <input name="subtitle" defaultValue={defaults.subtitle} required className={inputCls} />
        </div>

        <div className="col-span-2">
          <label className={labelCls}>תיאור</label>
          <textarea name="description" defaultValue={defaults.description} rows={3} className={inputCls} />
        </div>

        <div>
          <label className={labelCls}>כיתה</label>
          <select name="grade" defaultValue={defaults.grade} className={inputCls}>
            {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>

        <div>
          <label className={labelCls}>קטגוריה</label>
          <select name="category" defaultValue={defaults.category} className={inputCls}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="col-span-2">
          <label className={labelCls}>קישור לתמונת כריכה (URL)</label>
          <input name="imgUrl" defaultValue={defaults.imgUrl ?? ''} className={inputCls} placeholder="https://..." />
        </div>

        <div>
          <label className={labelCls}>שאלון (לתיכון)</label>
          <input name="examCode" defaultValue={defaults.examCode ?? ''} className={inputCls} placeholder="שאלון 581" />
        </div>

        <div>
          <label className={labelCls}>יחידות לימוד</label>
          <input name="units" defaultValue={defaults.units ?? ''} className={inputCls} placeholder="4 יחידות לימוד" />
        </div>

        <div>
          <label className={labelCls}>רמה</label>
          <select name="level" defaultValue={defaults.level ?? ''} className={inputCls}>
            <option value="">—</option>
            {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        <div>
          <label className={labelCls}>מחיר (₪)</label>
          <input name="price" type="number" min={0} defaultValue={defaults.price} required className={inputCls} />
        </div>

        <div>
          <label className={labelCls}>מחבר</label>
          <input name="author" defaultValue={defaults.author ?? ''} className={inputCls} />
        </div>

        <div>
          <label className={labelCls}>שנת הוצאה</label>
          <input name="publishYear" type="number" defaultValue={defaults.publishYear} className={inputCls} />
        </div>

        <div>
          <label className={labelCls}>מספר עמודים</label>
          <input name="pages" type="number" defaultValue={defaults.pages} className={inputCls} />
        </div>

        <div>
          <label className={labelCls}>תווית כריכה</label>
          <input name="label" defaultValue={defaults.label} required className={inputCls} />
        </div>

        <div>
          <label className={labelCls}>צבע רקע כריכה</label>
          <input name="coverBg" type="color" defaultValue={defaults.coverBg} className="w-full h-9 border border-[#E5E5E5] rounded-lg cursor-pointer" />
        </div>

        <div>
          <label className={labelCls}>צבע טקסט כריכה</label>
          <input name="coverText" type="color" defaultValue={defaults.coverText} className="w-full h-9 border border-[#E5E5E5] rounded-lg cursor-pointer" />
        </div>

        <div>
          <label className={labelCls}>סוג</label>
          <select name="isDigital" defaultValue={String(defaults.isDigital)} className={inputCls}>
            <option value="false">פיזי</option>
            <option value="true">דיגיטלי</option>
          </select>
        </div>

        <div>
          <label className={labelCls}>זמינות</label>
          <select name="isAvailable" defaultValue={String(defaults.isAvailable)} className={inputCls}>
            <option value="true">זמין</option>
            <option value="false">אזל מהמלאי</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className={labelCls}>תגיות (מופרדות בפסיקים)</label>
          <input name="tags" defaultValue={defaults.tags?.join(', ') ?? ''} className={inputCls} placeholder="אלגברה, פונקציות, בגרות" />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 bg-[#16A34A] text-white font-semibold py-2.5 rounded-lg hover:bg-[#15803D] transition-colors disabled:opacity-60"
        >
          {submitting ? 'שומר...' : 'שמור'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 border border-[#E5E5E5] text-[#555555] font-semibold py-2.5 rounded-lg hover:bg-[#F5F5F5] transition-colors"
        >
          ביטול
        </button>
      </div>
    </form>
  );
}
