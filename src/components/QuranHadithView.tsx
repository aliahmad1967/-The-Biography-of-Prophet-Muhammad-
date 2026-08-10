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
      <div className="bg-white dark:bg-[#2D2926] p-6 rounded-2xl border border-[#E5E1D8] dark:border-[#3A3530] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-right">
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#1A1816] dark:text-[#FDFBF7]">
            {lang === 'ar' ? 'القرآن الكريم والأحاديث المرتبطة بالسيرة' : 'Quran & Hadith References'}
          </h1>
          <p className="text-xs text-[#5D574F] dark:text-[#E5E1D8]/70">
            {lang === 'ar' ? 'الآيات القرآنية والأحاديث النبوية الموثوقة التي أنزلت أو قيلت في أحداث السيرة' : 'Authenticated verses and traditions associated with biographical events'}
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 bg-[#FAF8F4] dark:bg-[#1A1816] p-1 rounded-xl text-xs border border-[#E5E1D8] dark:border-[#3A3530]">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg font-bold ${filterType === 'all' ? 'bg-[#8E6E37] text-white shadow-xs' : 'text-[#5D574F] dark:text-[#E5E1D8]'}`}
          >
            الكل
          </button>
          <button
            onClick={() => setFilterType('quran')}
            className={`px-3 py-1.5 rounded-lg font-bold ${filterType === 'quran' ? 'bg-[#8E6E37] text-white shadow-xs' : 'text-[#5D574F] dark:text-[#E5E1D8]'}`}
          >
            آيات قرأنية
          </button>
          <button
            onClick={() => setFilterType('hadith')}
            className={`px-3 py-1.5 rounded-lg font-bold ${filterType === 'hadith' ? 'bg-[#8E6E37] text-white shadow-xs' : 'text-[#5D574F] dark:text-[#E5E1D8]'}`}
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
            className="bg-white dark:bg-[#2D2926] p-6 md:p-8 rounded-2xl border border-[#E5E1D8] dark:border-[#3A3530] shadow-sm space-y-4 text-right"
          >
            <div className="flex items-center justify-between border-b border-[#E5E1D8] dark:border-[#3A3530] pb-3">
              <span className="text-xs font-bold text-[#8E6E37] dark:text-[#C5A059]">
                {ref.type === 'quran' ? 'آية قرآنية مباركة' : 'حديث نبوي شريف'}
              </span>
              <span className="text-xs text-[#8E6E37] dark:text-[#C5A059] font-mono">
                {ref.reference}
              </span>
            </div>

            <blockquote className="text-xl md:text-2xl font-serif leading-loose text-[#1A1816] dark:text-[#FDFBF7] px-4 py-3 bg-[#FAF8F4] dark:bg-[#1A1816] rounded-xl border-r-4 border-[#8E6E37]">
              " {ref.textArabic} "
            </blockquote>

            <p className="text-xs text-[#5D574F] dark:text-[#E5E1D8]/80 leading-relaxed">
              <span className="font-bold text-[#8E6E37] dark:text-[#C5A059]">السياق والارتباط التاريخي: </span>
              {ref.context} ({ref.linkedEventTitle})
            </p>

            {ref.authenticityGrade && (
              <div className="text-[11px] text-[#8E6E37] dark:text-[#C5A059] font-bold">
                درجة الصحة: {ref.authenticityGrade}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};
