import React, { useState } from 'react';
import { SeerahEvent } from '../types';
import { SEERAH_EVENTS, SEERAH_PHASES } from '../data/seerahData';

interface TimelineViewProps {
  onSelectEvent: (event: SeerahEvent) => void;
  lang: 'ar' | 'en';
}

export const TimelineView: React.FC<TimelineViewProps> = ({ onSelectEvent, lang }) => {
  const [viewStyle, setViewStyle] = useState<'vertical' | 'horizontal'>('vertical');
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState<string>('all');
  const [activeModalEvent, setActiveModalEvent] = useState<SeerahEvent | null>(null);

  const filteredEvents = selectedPhaseFilter === 'all'
    ? SEERAH_EVENTS
    : SEERAH_EVENTS.filter(e => e.phaseId === selectedPhaseFilter);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header & Controls */}
      <div className="bg-white dark:bg-[#2D2926] p-6 rounded-2xl border border-[#E5E1D8] dark:border-[#3A3530] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-right">
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#1A1816] dark:text-[#FDFBF7]">
            {lang === 'ar' ? 'المخطط الزمني التفاعلي للسيرة' : 'Interactive Timeline'}
          </h1>
          <p className="text-xs text-[#5D574F] dark:text-[#E5E1D8]/70">
            {lang === 'ar' ? 'تتبع التسلسل الزمني للأحداث النبوية من المولد الشريف حتى حجة الوداع' : 'Chronological milestones of Prophetic history'}
          </p>
        </div>

        {/* View Switcher & Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Phase Filter Dropdown */}
          <select
            value={selectedPhaseFilter}
            onChange={(e) => setSelectedPhaseFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#FAF8F4] dark:bg-[#1A1816] text-[#1A1816] dark:text-[#FDFBF7] text-xs font-bold border border-[#E5E1D8] dark:border-[#3A3530] focus:outline-none"
          >
            <option value="all">{lang === 'ar' ? 'جميع المراحل التاريخية' : 'All Eras'}</option>
            {SEERAH_PHASES.map((p) => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>

          {/* Dual Mode Switcher (Vertical vs Horizontal) */}
          <div className="flex items-center bg-[#FAF8F4] dark:bg-[#1A1816] p-1 rounded-xl text-xs border border-[#E5E1D8] dark:border-[#3A3530]">
            <button
              onClick={() => setViewStyle('vertical')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-all ${
                viewStyle === 'vertical'
                  ? 'bg-[#8E6E37] text-white shadow-xs'
                  : 'text-[#5D574F] dark:text-[#E5E1D8]'
              }`}
            >
              <span className="material-symbols-outlined text-base">view_day</span>
              <span>{lang === 'ar' ? 'عمودي' : 'Vertical'}</span>
            </button>
            <button
              onClick={() => setViewStyle('horizontal')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-all ${
                viewStyle === 'horizontal'
                  ? 'bg-[#8E6E37] text-white shadow-xs'
                  : 'text-[#5D574F] dark:text-[#E5E1D8]'
              }`}
            >
              <span className="material-symbols-outlined text-base">view_array</span>
              <span>{lang === 'ar' ? 'أفقي (شريط)' : 'Horizontal'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* MODE 1: VERTICAL TIMELINE */}
      {viewStyle === 'vertical' && (
        <div className="relative max-w-4xl mx-auto py-8 px-4">
          {/* Central Gold Vertical Line */}
          <div className="absolute top-0 bottom-0 right-1/2 w-1 bg-gradient-to-b from-[#8E6E37] via-[#C5A059] to-[#8E6E37] transform translate-x-1/2 z-0 hidden md:block" />

          <div className="space-y-12 relative z-10">
            {filteredEvents.map((evt, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={evt.id}
                  className={`flex flex-col md:flex-row items-center justify-between gap-8 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card */}
                  <div className="w-full md:w-5/12 bg-white dark:bg-[#2D2926] p-6 rounded-2xl border border-[#E5E1D8] dark:border-[#3A3530] hover:border-[#8E6E37] shadow-sm hover:shadow-md transition-all space-y-3 group cursor-pointer"
                       onClick={() => setActiveModalEvent(evt)}
                  >
                    <div className="flex items-center justify-between border-b border-[#E5E1D8] dark:border-[#3A3530] pb-2">
                      <span className="text-xs font-bold text-[#8E6E37] dark:text-[#C5A059] font-mono">
                        {evt.yearHijri} ({evt.yearCE} م)
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-[#8E6E37]/10 text-[#8E6E37] dark:text-[#C5A059] font-bold">
                        {evt.locationName}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-serif text-[#1A1816] dark:text-[#FDFBF7] group-hover:text-[#8E6E37]">
                      {evt.title}
                    </h3>

                    <p className="text-xs text-[#5D574F] dark:text-[#E5E1D8]/80 leading-relaxed line-clamp-3">
                      {evt.summary}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-xs text-[#8E6E37] dark:text-[#C5A059] font-bold">
                      <span>{lang === 'ar' ? 'التفاصيل والدروس' : 'View Details'}</span>
                      <span className="material-symbols-outlined text-base">visibility</span>
                    </div>
                  </div>

                  {/* Central Node Badge */}
                  <div className="w-10 h-10 rounded-full bg-[#8E6E37] text-white flex items-center justify-center font-bold text-xs border-2 border-[#C5A059] shadow-md z-20 shrink-0">
                    <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                      verified
                    </span>
                  </div>

                  {/* Spacer for desktop symmetry */}
                  <div className="w-full md:w-5/12 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODE 2: HORIZONTAL TRACK */}
      {viewStyle === 'horizontal' && (
        <div className="bg-white dark:bg-[#2D2926] p-8 rounded-2xl border border-[#E5E1D8] dark:border-[#3A3530] shadow-sm space-y-6">
          <div className="text-right">
            <span className="text-xs font-bold text-[#8E6E37] dark:text-[#C5A059] uppercase tracking-wider block font-serif">
              {lang === 'ar' ? 'شريط المسار الزمني' : 'Horizontal Timeline Track'}
            </span>
            <p className="text-xs text-[#5D574F] dark:text-[#E5E1D8]/70 mt-0.5">
              {lang === 'ar' ? 'اسحب الشريط يميناً ويساراً للتنقل بين أحدث السيرة' : 'Scroll horizontally to traverse milestones'}
            </p>
          </div>

          {/* Horizontal Track Scroll Container */}
          <div className="overflow-x-auto pb-8 pt-4 hide-scrollbar">
            <div className="flex items-center gap-6 min-w-[1200px] relative px-4">
              {/* Connecting Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#8E6E37]/30 -translate-y-1/2 z-0" />

              {filteredEvents.map((evt) => (
                <div
                  key={evt.id}
                  onClick={() => setActiveModalEvent(evt)}
                  className="w-72 bg-[#FAF8F4] dark:bg-[#1A1816] p-5 rounded-2xl border border-[#E5E1D8] dark:border-[#3A3530] shadow-xs hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer relative z-10 shrink-0 space-y-2 text-right"
                >
                  <div className="w-8 h-8 rounded-full bg-[#8E6E37] text-white flex items-center justify-center text-xs font-bold mb-2">
                    <span className="material-symbols-outlined text-sm">flag</span>
                  </div>
                  <span className="text-xs font-bold text-[#8E6E37] dark:text-[#C5A059] block font-mono">
                    {evt.yearHijri}
                  </span>
                  <h4 className="font-bold font-serif text-base text-[#1A1816] dark:text-[#FDFBF7] line-clamp-1">
                    {evt.title}
                  </h4>
                  <p className="text-xs text-[#5D574F] dark:text-[#E5E1D8]/70 line-clamp-2">
                    {evt.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* EVENT DETAILS MODAL DIALOG */}
      {activeModalEvent && (
        <div className="fixed inset-0 z-50 bg-[#1A1816]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#2D2926] max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-2xl border border-[#E5E1D8] dark:border-[#3A3530] shadow-2xl p-6 md:p-8 space-y-6 text-right relative animate-in fade-in zoom-in duration-200">
            
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveModalEvent(null)}
              className="absolute top-4 left-4 p-2 rounded-full hover:bg-[#FAF8F4] dark:hover:bg-[#1A1816] text-[#5D574F]"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            {/* Modal Header */}
            <div className="space-y-1 border-b border-[#E5E1D8] dark:border-[#3A3530] pb-4">
              <span className="text-xs font-bold text-[#8E6E37] dark:text-[#C5A059]">
                {activeModalEvent.yearHijri} ({activeModalEvent.yearCE} م) - {activeModalEvent.locationName}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#1A1816] dark:text-[#FDFBF7]">
                {activeModalEvent.title}
              </h2>
            </div>

            {/* Modal Details Text */}
            <div className="space-y-4">
              <p className="text-sm md:text-base text-[#1A1816] dark:text-[#FDFBF7] font-serif leading-relaxed">
                {activeModalEvent.details}
              </p>

              {/* Verses */}
              {activeModalEvent.quranVerses && activeModalEvent.quranVerses.length > 0 && (
                <div className="p-4 rounded-xl bg-[#FAF8F4] dark:bg-[#1A1816] border border-[#E5E1D8] dark:border-[#3A3530] text-center">
                  <span className="text-xs font-bold text-[#8E6E37] block mb-1">شواهد من القرآن الكريم:</span>
                  {activeModalEvent.quranVerses.map((v, idx) => (
                    <p key={idx} className="text-base font-serif text-[#1A1816] dark:text-[#FDFBF7]">
                      " {v.text} " [سورة {v.surah}: {v.number}]
                    </p>
                  ))}
                </div>
              )}

              {/* Lessons */}
              {activeModalEvent.lessons && activeModalEvent.lessons.length > 0 && (
                <div className="p-4 rounded-xl bg-[#FAF8F4] dark:bg-[#1A1816] space-y-2 border border-[#E5E1D8] dark:border-[#3A3530]">
                  <h4 className="text-xs font-bold text-[#8E6E37] dark:text-[#C5A059]">الدروس والعبر المستفادة:</h4>
                  <ul className="list-disc list-inside text-xs text-[#1A1816] dark:text-[#FDFBF7] space-y-1">
                    {activeModalEvent.lessons.map((ls, idx) => (
                      <li key={idx}>{ls}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Sources */}
              <div className="text-xs text-[#5D574F] dark:text-[#E5E1D8]/80">
                <span className="font-bold text-[#8E6E37] dark:text-[#C5A059]">المصادر الموثوقة: </span>
                {activeModalEvent.sources.map(s => s.name).join('، ')}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-[#E5E1D8] dark:border-[#3A3530] flex items-center justify-end">
              <button
                onClick={() => setActiveModalEvent(null)}
                className="px-6 py-2.5 rounded-lg bg-[#8E6E37] text-white text-xs font-bold shadow-md"
              >
                إغلاق
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
