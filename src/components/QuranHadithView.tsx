import React, { useState } from 'react';
import { QURAN_HADITH_REFS } from '../data/seerahData';

interface QuranHadithViewProps {
  lang: 'ar' | 'en';
}

export const QuranHadithView: React.FC<QuranHadithViewProps> = ({ lang }) => {
  const [filterType, setFilterType] = useState<'all' | 'quran' | 'hadith'>('all');

  const filteredRefs = QURAN_HADITH_REFS.filter(r => filterType === 'all' || r.type === filterType);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="bg-[#FCFBF8] dark:bg-[#14211A] p-6 rounded-2xl border border-[#DDD5C3] dark:border-[#253A2E] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-right">
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#161B18] dark:text-[#F6F2E8]">
            {lang === 'ar' ? 'القرآن الكريم والأحاديث المرتبطة بالسيرة' : 'Quran & Hadith References'}
          </h1>
          <p className="text-xs text-[#4F544E] dark:text-[#D5CFC2]/80">
            {lang === 'ar' ? 'الآيات القرآنية والأحاديث النبوية الموثوقة التي أنزلت أو قيلت في أحداث السيرة' : 'Authenticated verses and traditions associated with biographical events'}
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 bg-[#EFEAE0] dark:bg-[#0F1A14] p-1 rounded-xl text-xs border border-[#DDD5C3] dark:border-[#253A2E]">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${filterType === 'all' ? 'bg-[#0E5335] text-white shadow-xs' : 'text-[#4F544E] dark:text-[#D5CFC2]'}`}
          >
            الكل
          </button>
          <button
            onClick={() => setFilterType('quran')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${filterType === 'quran' ? 'bg-[#0E5335] text-white shadow-xs' : 'text-[#4F544E] dark:text-[#D5CFC2]'}`}
          >
            آيات قرآنية
          </button>
          <button
            onClick={() => setFilterType('hadith')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${filterType === 'hadith' ? 'bg-[#0E5335] text-white shadow-xs' : 'text-[#4F544E] dark:text-[#D5CFC2]'}`}
          >
            أحاديث شريفة
          </button>
        </div>
      </div>

      {/* Cards List */}
      <div className="space-y-6">
        {filteredRefs.map((ref) => (
          <div
            key={ref.id}
            className="bg-[#FCFBF8] dark:bg-[#14211A] p-6 md:p-8 rounded-2xl border border-[#DDD5C3] dark:border-[#253A2E] shadow-sm space-y-4 text-right"
          >
            <div className="flex items-center justify-between border-b border-[#DDD5C3] dark:border-[#253A2E] pb-3">
              <span className="text-xs font-bold text-[#0E5335] dark:text-[#E2C15A]">
                {ref.type === 'quran' ? 'آية قرآنية مباركة' : 'حديث نبوي شريف'}
              </span>
              <span className="text-xs text-[#8B6514] dark:text-[#E2C15A] font-mono">
                {ref.reference}
              </span>
            </div>

            <blockquote className="text-xl md:text-2xl font-serif leading-loose text-[#161B18] dark:text-[#F6F2E8] px-5 py-4 bg-[#EFEAE0]/70 dark:bg-[#0F1A14] rounded-xl border border-[#D4AF37]/40">
              " {ref.textArabic} "
            </blockquote>

            <p className="text-xs text-[#4F544E] dark:text-[#D5CFC2]/85 leading-relaxed">
              <span className="font-bold text-[#0E5335] dark:text-[#E2C15A]">السياق والارتباط التاريخي: </span>
              {ref.context} ({ref.linkedEventTitle})
            </p>

            {ref.authenticityGrade && (
              <div className="text-[11px] text-[#8B6514] dark:text-[#E2C15A] font-bold">
                درجة الصحة: {ref.authenticityGrade}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};
