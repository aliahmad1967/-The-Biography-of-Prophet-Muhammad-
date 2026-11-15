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
      <div className="bg-[#FCFBF8] dark:bg-[#14211A] p-6 rounded-2xl border border-[#DDD5C3] dark:border-[#253A2E] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-right">
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#161B18] dark:text-[#F6F2E8]">
            {lang === 'ar' ? 'الأحداث والغزوات الكبرى' : 'Battles & Historic Events'}
          </h1>
          <p className="text-xs text-[#4F544E] dark:text-[#D5CFC2]/80">
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
            className="w-full py-2 pr-9 pl-3 rounded-xl bg-[#EFEAE0] dark:bg-[#0F1A14] text-xs text-[#161B18] dark:text-[#F6F2E8] border border-[#DDD5C3] dark:border-[#253A2E] focus:outline-none focus:border-[#0E5335] dark:focus:border-[#D4AF37]"
          />
          <span className="material-symbols-outlined absolute right-2.5 top-2 text-[#0E5335] dark:text-[#E2C15A] text-lg">
            search
          </span>
        </div>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-[#0E5335] text-white border border-[#D4AF37]/50 shadow-xs'
                  : 'bg-[#FCFBF8] dark:bg-[#14211A] text-[#161B18] dark:text-[#F6F2E8] border border-[#DDD5C3] dark:border-[#253A2E] hover:bg-[#EFEAE0] dark:hover:bg-[#0F1A14]'
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
            className="bg-[#FCFBF8] dark:bg-[#14211A] p-6 rounded-2xl border border-[#DDD5C3] dark:border-[#253A2E] hover:border-[#0E5335] dark:hover:border-[#D4AF37] shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#DDD5C3] dark:border-[#253A2E] pb-2">
                <span className="text-xs font-bold text-[#8B6514] dark:text-[#E2C15A] font-mono tabular-nums">
                  {evt.yearHijri} ({evt.yearCE} م)
                </span>
                <span className="text-[11px] text-[#0E5335] dark:text-[#E2C15A] font-bold">
                  {evt.locationName}
                </span>
              </div>

              <h3 className="text-xl font-bold font-serif text-[#161B18] dark:text-[#F6F2E8]">
                {evt.title}
              </h3>

              <p className="text-xs text-[#4F544E] dark:text-[#D5CFC2]/85 leading-relaxed">
                {evt.summary}
              </p>

              {/* Outcome / Impact */}
              {evt.outcomeOrImpact && (
                <div className="p-3 rounded-xl bg-[#EFEAE0]/70 dark:bg-[#0F1A14] text-xs font-serif text-[#0E5335] dark:text-[#E2C15A] border border-[#DDD5C3] dark:border-[#253A2E]">
                  <span className="font-bold">النتيجة والأثر: </span>
                  {evt.outcomeOrImpact}
                </div>
              )}
            </div>

            {/* Footer with Lessons and Sources */}
            <div className="pt-4 border-t border-[#DDD5C3] dark:border-[#253A2E] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#4F544E] dark:text-[#D5CFC2]/80">
                  المصادر: {evt.sources.map(s => s.name).join('، ')}
                </span>
                <button
                  onClick={() => onSelectEvent(evt)}
                  className="text-[#0E5335] dark:text-[#E2C15A] font-bold hover:underline flex items-center gap-1"
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
