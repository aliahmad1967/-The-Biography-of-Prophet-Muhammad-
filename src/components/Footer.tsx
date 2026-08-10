import React from 'react';
import { PageType } from '../types';

interface FooterProps {
  onSelectPage: (page: PageType) => void;
  lang: 'ar' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ onSelectPage, lang }) => {
  return (
    <footer className="bg-[#1A1816] text-[#FDFBF7] border-t border-[#E5E1D8]/20 py-12 px-6 mt-16 font-serif">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-right">
        
        {/* Col 1: About Platform */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-[#8E6E37] bg-[#2D2926] text-[#C5A059] flex items-center justify-center font-serif text-xl">
              <span>ﷺ</span>
            </div>
            <span className="font-bold text-xl text-[#C5A059]">
              {lang === 'ar' ? 'بوابة السيرة النبوية' : 'Prophetic Seerah'}
            </span>
          </div>
          <p className="text-xs text-[#E5E1D8]/80 leading-relaxed">
            {lang === 'ar'
              ? 'منصة معرفية تفاعلية موثوقة تقدم سيرة النبي محمد ﷺ بأسلوب حديث، يعتمد على المصادر الكلاسيكية والدراسات المعاصرة المعتمدة.'
              : 'An authentic interactive platform exploring the life and biography of Prophet Muhammad (PBUH) with grounded references.'}
          </p>
          <div className="pt-2 text-[11px] text-[#C5A059] flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">verified_user</span>
            <span>{lang === 'ar' ? 'مصادر موثوقة ومراجعة علمياً' : 'Scientifically Verified Sources'}</span>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div>
          <h4 className="font-bold text-[#C5A059] text-sm mb-4 border-b border-[#E5E1D8]/20 pb-2">
            {lang === 'ar' ? 'أقسام المنصة' : 'Navigation'}
          </h4>
          <ul className="space-y-2 text-xs text-[#E5E1D8]/90">
            <li>
              <button onClick={() => onSelectPage('seerah')} className="hover:text-[#C5A059] transition-colors">
                {lang === 'ar' ? 'السيرة النبوية الشريفة' : 'Prophetic Biography'}
              </button>
            </li>
            <li>
              <button onClick={() => onSelectPage('timeline')} className="hover:text-[#C5A059] transition-colors">
                {lang === 'ar' ? 'الخط الزمني التفاعلي' : 'Interactive Timeline'}
              </button>
            </li>
            <li>
              <button onClick={() => onSelectPage('events')} className="hover:text-[#C5A059] transition-colors">
                {lang === 'ar' ? 'الأحداث والغزوات الكبرى' : 'Major Battles & Events'}
              </button>
            </li>
            <li>
              <button onClick={() => onSelectPage('maps')} className="hover:text-[#C5A059] transition-colors">
                {lang === 'ar' ? 'الأماكن والخرائط التاريخية' : 'Maps & Historical Places'}
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Research & AI */}
        <div>
          <h4 className="font-bold text-[#C5A059] text-sm mb-4 border-b border-[#E5E1D8]/20 pb-2">
            {lang === 'ar' ? 'الذكاء الاصطناعي والمصادر' : 'AI & References'}
          </h4>
          <ul className="space-y-2 text-xs text-[#E5E1D8]/90">
            <li>
              <button onClick={() => onSelectPage('ai_rag')} className="hover:text-[#C5A059] transition-colors font-semibold text-[#C5A059]">
                {lang === 'ar' ? 'اسأل عن السيرة (نظام RAG)' : 'Ask AI (RAG System)'}
              </button>
            </li>
            <li>
              <button onClick={() => onSelectPage('sources')} className="hover:text-[#C5A059] transition-colors">
                {lang === 'ar' ? 'المراجع والمصادر الكلاسيكية' : 'Classical Sources'}
              </button>
            </li>
            <li>
              <button onClick={() => onSelectPage('lessons')} className="hover:text-[#C5A059] transition-colors">
                {lang === 'ar' ? 'الدروس والقيم المستفادة' : 'Lessons & Values'}
              </button>
            </li>
            <li>
              <button onClick={() => onSelectPage('quran_hadith')} className="hover:text-[#C5A059] transition-colors">
                {lang === 'ar' ? 'القرآن والأحاديث المرتبطة' : 'Quran & Hadith References'}
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Guarantee Notice */}
        <div className="bg-[#2D2926] p-4 rounded-xl border border-[#E5E1D8]/20 space-y-3">
          <span className="text-xs font-bold text-[#C5A059] block">
            {lang === 'ar' ? 'تنبيه وأخلاقيات المنصة' : 'Ethical Framework'}
          </span>
          <p className="text-[11px] text-[#E5E1D8]/80 leading-normal">
            {lang === 'ar'
              ? 'يلتزم موقع السيرة النبوية بالضوابط الشرعية في عدم تجسيد الرسول الكريم ﷺ، والاعتماد الحصري على الأحاديث والروايات الموثوقة.'
              : 'Strict adherence to Islamic etiquette without depictions of Prophet Muhammad (PBUH) and grounded solely in authentic traditions.'}
          </p>
        </div>

      </div>

      <div className="max-w-[1280px] mx-auto mt-8 pt-6 border-t border-[#E5E1D8]/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#E5E1D8]/60">
        <p>© {new Date().getFullYear()} بوابة السيرة النبوية الشريفة. جميع الحقوق محفوظة.</p>
        <p className="mt-2 sm:mt-0 font-serif">صلى الله عليه وعلى آله</p>
      </div>
    </footer>
  );
};
