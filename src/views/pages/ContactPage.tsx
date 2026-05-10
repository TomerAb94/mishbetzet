import { Phone, Mail, CheckCircle } from 'lucide-react';
import { useContactForm } from '../../hooks/useContactForm';
import SectionHeader from '../components/ui/SectionHeader';

const inputCls =
  'w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#16A34A] transition-colors bg-white';
const labelCls = 'block text-sm font-semibold text-[#1A1A1A] mb-1';

export default function ContactPage() {
  const { formData, handleChange, handleSubmit, submitting, submitted, error } = useContactForm();

  return (
    <div className="min-h-screen bg-[#F5F5F5] px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          eyebrow="פנו אלינו"
          title="צרו קשר"
          subtitle="נשמח לענות על כל שאלה בנוגע לספרים, הזמנות ומשלוחים"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="space-y-6">
            <div className="bg-white border border-[#E5E5E5] rounded-lg p-5">
              <div className="flex items-center gap-3 justify-end mb-2">
                <span className="font-semibold text-[#1A1A1A] text-sm">טלפון</span>
                <Phone size={18} className="text-[#16A34A]" />
              </div>
              <a href="tel:04-8401003" className="text-[#555555] text-sm hover:text-[#16A34A] transition-colors">
                04-8401003
              </a>
            </div>

            <div className="bg-white border border-[#E5E5E5] rounded-lg p-5">
              <div className="flex items-center gap-3 justify-end mb-2">
                <span className="font-semibold text-[#1A1A1A] text-sm">אימייל</span>
                <Mail size={18} className="text-[#16A34A]" />
              </div>
              <a href="mailto:info@mishbetzet.co.il" className="text-[#555555] text-sm hover:text-[#16A34A] transition-colors">
                info@mishbetzet.co.il
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            {submitted ? (
              <div className="bg-white border border-[#E5E5E5] rounded-lg p-10 flex flex-col items-center text-center gap-4">
                <CheckCircle size={48} className="text-[#16A34A]" />
                <h3 className="font-bold text-[#1A1A1A] text-xl">הטופס נשלח בהצלחה!</h3>
                <p className="text-[#555555]">ניצור איתך קשר בקרוב.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-[#E5E5E5] rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>שם מלא</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={inputCls}
                      placeholder="ישראל ישראלי"
                    />
                  </div>
                  <div>
                    <label className={labelCls}>טלפון</label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className={inputCls}
                      placeholder="050-0000000"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>אימייל</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputCls}
                    placeholder="example@school.co.il"
                  />
                </div>

                <div>
                  <label className={labelCls}>שם בית הספר (אופציונלי)</label>
                  <input
                    name="schoolName"
                    value={formData.schoolName ?? ''}
                    onChange={handleChange}
                    className={inputCls}
                    placeholder="בית ספר יסודי..."
                  />
                </div>

                <div>
                  <label className={labelCls}>הודעה</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className={inputCls}
                    placeholder="כתבו את הודעתכם כאן..."
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#16A34A] text-white font-semibold py-3 rounded-[30px] hover:bg-[#15803D] transition-colors disabled:opacity-60"
                >
                  {submitting ? 'שולח...' : 'שליחת הטופס'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
