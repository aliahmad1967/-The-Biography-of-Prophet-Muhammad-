import React from 'react';
import { PageType } from '../types';

interface FooterProps {
  onSelectPage: (page: PageType) => void;
  lang: 'ar' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ onSelectPage, lang }) => {
  return (
    <footer className="bg-gradient-to-b from-[#0A2E1E] to-[#081F15] text-[#F6F2E8] border-t-2 border-[#D4AF37]/50 py-12 px-6 mt-16 font-serif">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-right">
        
        {/* Col 1: About Platform */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-[#D4AF37] bg-[#0E5335] text-[#E2C15A] flex items-center justify-center font-serif text-xl">
              <span>ﷺ</span>
            </div>
            <span className="font-bold text-xl text-[#E2C15A]">
              {lang === 'ar' ? 'بوابة السيرة النبوية' : 'Prophetic Seerah'}
            </span>
          </div>
          <p className="text-xs text-[#F6F2E8]/80 leading-relaxed">
            {lang === 'ar'
              ? 'منصة معرفية تفاعلية موثوقة تقدم سيرة النبي محمد ﷺ بأسلوب حديث، يعتمد على المصادر الكلاسيكية والدراسات المعاصرة المعتمدة.'
              : 'An authentic interactive platform exploring the life and biography of Prophet Muhammad (PBUH) with grounded references.'}
          </p>
          <div className="pt-2 text-[11px] text-[#E2C15A] flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">verified_user</span>
            <span>{lang === 'ar' ? 'مصادر موثوقة ومراجعة علمياً' : 'Scientifically Verified Sources'}</span>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div>
          <h4 className="font-bold text-[#E2C15A] text-sm mb-4 border-b border-[#D4AF37]/30 pb-2">
            {lang === 'ar' ? 'أقسام المنصة' : 'Navigation'}
          </h4>
          <ul className="space-y-2 text-xs text-[#F6F2E8]/90">
            <li>
              <button onClick={() => onSelectPage('seerah')} className="hover:text-[#E2C15A] transition-colors">
                {lang === 'ar' ? 'السيرة النبوية الشريفة' : 'Prophetic Biography'}
              </button>
            </li>
            <li>
              <button onClick={() => onSelectPage('timeline')} className="hover:text-[#E2C15A] transition-colors">
                {lang === 'ar' ? 'الخط الزمني التفاعلي' : 'Interactive Timeline'}
              </button>
            </li>
            <li>
              <button onClick={() => onSelectPage('events')} className="hover:text-[#E2C15A] transition-colors">
                {lang === 'ar' ? 'الأحداث والغزوات الكبرى' : 'Major Battles & Events'}
              </button>
            </li>
            <li>
              <button onClick={() => onSelectPage('maps')} className="hover:text-[#E2C15A] transition-colors">
                {lang === 'ar' ? 'الأماكن والخرائط التاريخية' : 'Maps & Historical Places'}
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Research & AI */}
        <div>
          <h4 className="font-bold text-[#E2C15A] text-sm mb-4 border-b border-[#D4AF37]/30 pb-2">
            {lang === 'ar' ? 'الذكاء الاصطناعي والمصادر' : 'AI & References'}
          </h4>
          <ul className="space-y-2 text-xs text-[#F6F2E8]/90">
            <li>
              <button onClick={() => onSelectPage('ai_rag')} className="hover:text-[#E2C15A] transition-colors font-semibold text-[#E2C15A]">
                {lang === 'ar' ? 'اسأل عن السيرة (نظام RAG)' : 'Ask AI (RAG System)'}
              </button>
            </li>
            <li>
              <button onClick={() => onSelectPage('sources')} className="hover:text-[#E2C15A] transition-colors">
                {lang === 'ar' ? 'المراجع والمصادر الكلاسيكية' : 'Classical Sources'}
              </button>
            </li>
            <li>
              <button onClick={() => onSelectPage('lessons')} className="hover:text-[#E2C15A] transition-colors">
                {lang === 'ar' ? 'الدروس والقيم المستفادة' : 'Lessons & Values'}
              </button>
            </li>
            <li>
              <button onClick={() => onSelectPage('quran_hadith')} className="hover:text-[#E2C15A] transition-colors">
                {lang === 'ar' ? 'القرآن والأحاديث المرتبطة' : 'Quran & Hadith References'}
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Guarantee Notice */}
        <div className="bg-[#0E442C]/60 p-4 rounded-xl border border-[#D4AF37]/35 space-y-3">
          <span className="text-xs font-bold text-[#E2C15A] block">
            {lang === 'ar' ? 'تنبيه وأخلاقيات المنصة' : 'Ethical Framework'}
          </span>
          <p className="text-[11px] text-[#F6F2E8]/85 leading-normal">
            {lang === 'ar'
              ? 'يلتزم موقع السيرة النبوية بالضوابط الشرعية في عدم تجسيد الرسول الكريم ﷺ، والاعتماد الحصري على الأحاديث والروايات الموثوقة.'
              : 'Strict adherence to Islamic etiquette without depictions of Prophet Muhammad (PBUH) and grounded solely in authentic traditions.'}
          </p>
        </div>

      </div>

      <div className="max-w-[1280px] mx-auto mt-8 pt-6 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#F6F2E8]/70">
        <p>© {new Date().getFullYear()} بوابة السيرة النبوية الشريفة. جميع الحقوق محفوظة.</p>
        <p className="mt-2 sm:mt-0 font-serif text-[#E2C15A]">صلى الله عليه وعلى آله</p>
      </div>
    </footer>
  );
};
