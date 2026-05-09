import { Phone, Mail, BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white py-14 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 justify-end mb-3">
              <span className="text-xl font-black">משבצת</span>
              <BookOpen size={20} className="text-[#16A34A]" />
            </div>
            <p className="text-[#888888] text-sm leading-relaxed text-right">
              סדרת ספרי מתמטיקה לבית הספר היסודי.
              מאושרת ומוכחת בכיתות ברחבי ישראל.
            </p>
          </div>

          {/* Contact */}
          <div className="text-right">
            <h4 className="text-xs font-semibold text-[#888888] uppercase tracking-widest mb-4">צרו קשר</h4>
            <div className="space-y-3">
              <a href="tel:04-8401003" className="flex items-center gap-2 justify-end text-sm text-[#CCCCCC] hover:text-[#16A34A] transition-colors">
                <span>04-8401003</span>
                <Phone size={15} className="text-[#16A34A] shrink-0" />
              </a>
              <a href="mailto:info@mishbetzet.co.il" className="flex items-center gap-2 justify-end text-sm text-[#CCCCCC] hover:text-[#16A34A] transition-colors">
                <span>info@mishbetzet.co.il</span>
                <Mail size={15} className="text-[#16A34A] shrink-0" />
              </a>
            </div>
          </div>

          {/* About */}
          <div className="text-right">
            <h4 className="text-xs font-semibold text-[#888888] uppercase tracking-widest mb-4">אודות</h4>
            <ul className="space-y-2 text-sm text-[#AAAAAA]">
              <li><a href="#" className="hover:text-white transition-colors">אודות משבצת</a></li>
              <li><a href="#" className="hover:text-white transition-colors">הספרים שלנו</a></li>
              <li><a href="#" className="hover:text-white transition-colors">צרו קשר</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#333333] pt-6 text-center">
          <p className="text-[#555555] text-xs">© 2025 משבצת. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
}
