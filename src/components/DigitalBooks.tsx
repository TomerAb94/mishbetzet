import { Tablet } from 'lucide-react';

export default function DigitalBooks() {
  return (
    <section className="bg-white px-6 flex flex-col justify-center" style={{ minHeight: 'calc(100vh - 64px)' }}>
      <div className="max-w-xl mx-auto text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F0FDF4] rounded-full mb-6">
          <Tablet size={28} className="text-[#16A34A]" />
        </div>

        {/* Badge */}
        <div className="mb-4">
          <span className="inline-block bg-[#16A34A] text-white text-xs font-semibold px-3 py-1 rounded-full">
            בקרוב
          </span>
        </div>

        <h2 className="text-3xl font-black text-[#1A1A1A] mb-3">ספרים דיגיטליים</h2>
        <p className="text-[#555555] leading-relaxed mb-8">
          הסדרה הדיגיטלית של משבצת בדרך אליכם — חוויית למידה אינטראקטיבית לכיתות א׳–ה׳,
          מותאמת לכל מכשיר.
        </p>

        <button
          disabled
          className="bg-[#E5E5E5] text-[#AAAAAA] font-semibold px-8 py-3 rounded-[30px] cursor-not-allowed text-sm"
        >
          כניסה לספרים הדיגיטליים
        </button>
      </div>
    </section>
  );
}
