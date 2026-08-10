import React, { useState } from 'react';
import { SeerahEvent } from '../types';
import { SEERAH_EVENTS } from '../data/seerahData';

interface EventsViewProps {
  onSelectEvent: (event: SeerahEvent) => void;
  lang: 'ar' | 'en';
}

export const EventsView: React.FC<EventsViewProps> = ({ onSelectEvent, lang }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = [
    { id: 'all', labelAr: 'جميع الأحداث', labelEn: 'All Events' },
    { id: 'battle', labelAr: 'الغزوات والمعارك', labelEn: 'Battles' },
    { id: 'treaty', labelAr: 'المعاهدات والصلح', labelEn: 'Treaties' },
    { id: 'revelation', labelAr: 'نزول الوحي', labelEn: 'Revelations' },
    { id: 'migration', labelAr: 'الهجرات', labelEn: 'Migrations' },
    { id: 'milestone', labelAr: 'المحطات الكبرى', labelEn: 'Milestones' },
  ];

  const filteredEvents = SEERAH_EVENTS.filter((evt) => {
    const matchesCategory = selectedCategory === 'all' || evt.category === selectedCategory;
    const matchesSearch =
      evt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.locationName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header & Controls */}
      <div className="bg-white dark:bg-[#2D2926] p-6 rounded-2xl border border-[#E5E1D8] dark:border-[#3A3530] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-right">
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#1A1816] dark:text-[#FDFBF7]">
            {lang === 'ar' ? 'الأحداث والغزوات الكبرى' : 'Battles & Historic Events'}
          </h1>
          <p className="text-xs text-[#5D574F] dark:text-[#E5E1D8]/70">
            {lang === 'ar' ? 'استعرض تفاصيل الغزوات والمعاهدات والمحطات التاريخية في السيرة' : 'Detailed records of major Prophetic battles and treaties'}
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={lang === 'ar' ? 'تصفية باسم الغزوة أو المكان...' : 'Filter events...'}
            className="w-full py-2 pr-9 pl-3 rounded-xl bg-[#FAF8F4] dark:bg-[#1A1816] text-xs text-[#1A1816] dark:text-[#FDFBF7] border border-[#E5E1D8] dark:border-[#3A3530] focus:outline-none"
          />
          <span className="material-symbols-outlined absolute right-2.5 top-2 text-[#8E6E37] text-lg">
            search
          </span>
        </div>
      </div>

      {/* Categories Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-[#8E6E37] text-white shadow-xs'
                  : 'bg-white dark:bg-[#2D2926] text-[#1A1816] dark:text-[#FDFBF7] border border-[#E5E1D8] dark:border-[#3A3530] hover:bg-[#FAF8F4]'
              }`}
            >
              {lang === 'ar' ? cat.labelAr : cat.labelEn}
            </button>
          );
        })}
      </div>

      {/* Events Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="bg-white dark:bg-[#2D2926] p-6 rounded-2xl border border-[#E5E1D8] dark:border-[#3A3530] hover:border-[#8E6E37] shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#E5E1D8] dark:border-[#3A3530] pb-2">
                <span className="text-xs font-bold text-[#8E6E37] dark:text-[#C5A059] font-mono">
                  {evt.yearHijri} ({evt.yearCE} م)
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#8E6E37]/10 text-[#8E6E37] dark:text-[#C5A059] font-bold">
                  {evt.locationName}
                </span>
              </div>

              <h3 className="text-xl font-bold font-serif text-[#1A1816] dark:text-[#FDFBF7]">
                {evt.title}
              </h3>

              <p className="text-xs text-[#5D574F] dark:text-[#E5E1D8]/80 leading-relaxed">
                {evt.summary}
              </p>

              {/* Outcome / Impact */}
              {evt.outcomeOrImpact && (
                <div className="p-3 rounded-xl bg-[#FAF8F4] dark:bg-[#1A1816] text-xs font-serif text-[#8E6E37] dark:text-[#C5A059] border border-[#E5E1D8] dark:border-[#3A3530]">
                  <span className="font-bold">النتيجة والأثر: </span>
                  {evt.outcomeOrImpact}
                </div>
              )}
            </div>

            {/* Footer with Lessons and Sources */}
            <div className="pt-4 border-t border-[#E5E1D8] dark:border-[#3A3530] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#5D574F] dark:text-[#E5E1D8]/70">
                  المصادر: {evt.sources.map(s => s.name).join('، ')}
                </span>
                <button
                  onClick={() => onSelectEvent(evt)}
                  className="text-[#8E6E37] dark:text-[#C5A059] font-bold hover:underline flex items-center gap-1"
                >
                  <span>عرض التفاصيل والدروس</span>
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
