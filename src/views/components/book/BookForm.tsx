import type { BookFormData, Grade, Category } from '../../../models/book';

const GRADES: Grade[] = ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ז׳", "ח׳", "ט׳"];
const CATEGORIES: Category[] = ["יסודי", "חטיבה", "תיכון", "דיגיטלי"];

const EMPTY: BookFormData = {
  title: '',
  subtitle: '',
  grade: "א׳",
  category: 'יסודי',
  coverBg: '#DBEAFE',
  coverText: '#1D4ED8',
  label: "א׳",
  price: 89,
  isDigital: false,
  isAvailable: true,
  description: '',
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
    const data: BookFormData = {
      title: fd.get('title') as string,
      subtitle: fd.get('subtitle') as string,
      grade: fd.get('grade') as Grade,
      category: fd.get('category') as Category,
      coverBg: fd.get('coverBg') as string,
      coverText: fd.get('coverText') as string,
      label: fd.get('label') as string,
      price: Number(fd.get('price')),
      isDigital: fd.get('isDigital') === 'true',
      isAvailable: fd.get('isAvailable') === 'true',
      description: fd.get('description') as string,
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className={labelCls}>שם הספר</label>
          <input name="title" defaultValue={defaults.title} required className={inputCls} placeholder="משבצת — כיתה א׳" />
        </div>

        <div className="col-span-2">
          <label className={labelCls}>תת-כותרת</label>
          <input name="subtitle" defaultValue={defaults.subtitle} required className={inputCls} placeholder="חלק א׳ · תרגול וגילוי" />
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

        <div>
          <label className={labelCls}>צבע רקע כריכה</label>
          <input name="coverBg" type="color" defaultValue={defaults.coverBg} className="w-full h-9 border border-[#E5E5E5] rounded-lg cursor-pointer" />
        </div>

        <div>
          <label className={labelCls}>צבע טקסט כריכה</label>
          <input name="coverText" type="color" defaultValue={defaults.coverText} className="w-full h-9 border border-[#E5E5E5] rounded-lg cursor-pointer" />
        </div>

        <div>
          <label className={labelCls}>תווית כריכה</label>
          <input name="label" defaultValue={defaults.label} required className={inputCls} placeholder="א׳" />
        </div>

        <div>
          <label className={labelCls}>מחיר (₪)</label>
          <input name="price" type="number" min={0} defaultValue={defaults.price} required className={inputCls} />
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
          <label className={labelCls}>תיאור (אופציונלי)</label>
          <textarea name="description" defaultValue={defaults.description} rows={3} className={inputCls} placeholder="תיאור קצר של הספר..." />
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
