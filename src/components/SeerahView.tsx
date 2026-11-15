import React, { useState } from 'react';
import { SeerahPhase, BookmarkItem, PageType } from '../types';
import { SEERAH_PHASES, SEERAH_EVENTS, QURAN_HADITH_REFS } from '../data/seerahData';

interface SeerahViewProps {
  readingMode: boolean;
  onAddBookmark: (item: BookmarkItem) => void;
  onSelectPage?: (page: PageType) => void;
  lang: 'ar' | 'en';
}

export const SeerahView: React.FC<SeerahViewProps> = ({
  readingMode,
  onAddBookmark,
  onSelectPage,
  lang
}) => {
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>(SEERAH_PHASES[0].id);
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [tashkeelVisible, setTashkeelVisible] = useState(true);

  const activePhase = SEERAH_PHASES.find(p => p.id === selectedPhaseId) || SEERAH_PHASES[0];
  const phaseEvents = SEERAH_EVENTS.filter(e => e.phaseId === activePhase.id);

  const fontClasses = {
    sm: 'text-sm leading-relaxed',
    md: 'text-base leading-loose',
    lg: 'text-lg leading-loose',
    xl: 'text-xl leading-loose',
  };

  const handleBookmarkCurrentPhase = () => {
    onAddBookmark({
      id: `phase-${activePhase.id}-${Date.now()}`,
      type: 'event',
      title: activePhase.title,
      subtitle: `${activePhase.period} | ${activePhase.hijriPeriod}`,
      pathPage: 'seerah',
      targetId: activePhase.id,
      addedAt: new Date().toLocaleDateString('ar-SA')
    });
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Bar */}
      <div className="bg-[#FCFBF8] dark:bg-[#14211A] p-6 rounded-2xl border border-[#DDD5C3] dark:border-[#253A2E] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-right">
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#161B18] dark:text-[#F6F2E8]">
            {lang === 'ar' ? 'السيرة النبوية الشريفة' : 'Prophetic Biography'}
          </h1>
          <p className="text-xs text-[#4F544E] dark:text-[#D5CFC2]/80">
            {lang === 'ar' ? 'تصفح السيرة الشريفة بتبويب الفصول والمراحل التاريخية' : 'Comprehensive chapter-by-chapter reading'}
          </p>
        </div>

        {/* Reading Controls Toolbar */}
        <div className="flex items-center gap-2 bg-[#EFEAE0] dark:bg-[#0F1A14] p-1.5 rounded-xl text-xs border border-[#DDD5C3] dark:border-[#253A2E]">
          {/* Font Size controls */}
          <div className="flex items-center border-l border-[#DDD5C3] dark:border-[#253A2E] pl-2 ml-2">
            <span className="text-[11px] text-[#4F544E] dark:text-[#D5CFC2]/80 ml-2">حجم الخط:</span>
            {(['sm', 'md', 'lg', 'xl'] as const).map((sz) => (
              <button
                key={sz}
                onClick={() => setFontSize(sz)}
                className={`px-2 py-1 rounded-md font-bold uppercase transition-colors ${
                  fontSize === sz
                    ? 'bg-[#0E5335] text-white'
                    : 'text-[#4F544E] dark:text-[#D5CFC2] hover:bg-[#DDD5C3]/50 dark:hover:bg-[#14211A]'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>

          {/* Tashkeel Toggle */}
          <button
            onClick={() => setTashkeelVisible(!tashkeelVisible)}
            className={`px-3 py-1 rounded-md font-bold transition-colors ${
              tashkeelVisible ? 'bg-[#0E5335] text-white' : 'text-[#4F544E] dark:text-[#D5CFC2]'
            }`}
          >
            {lang === 'ar' ? 'التشكيل' : 'Diacritics'}
          </button>

          {/* Bookmark Button */}
          <button
            onClick={handleBookmarkCurrentPhase}
            className="px-3 py-1 rounded-md bg-[#0E5335]/10 dark:bg-[#D4AF37]/15 text-[#0E5335] dark:text-[#E2C15A] font-bold hover:bg-[#0E5335] hover:text-white transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">bookmark_add</span>
            <span>{lang === 'ar' ? 'حفظ الفصل' : 'Bookmark'}</span>
          </button>
        </div>
      </div>

      {/* Featured Article Banner Callout */}
      {onSelectPage && (
        <div className="bg-gradient-to-r from-[#0A3422] via-[#134B32] to-[#0D1511] text-[#F6F2E8] p-6 rounded-2xl border border-[#D4AF37]/50 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#082417]/70 text-[#E2C15A] text-[11px] font-bold border border-[#D4AF37]/40">
              <span className="material-symbols-outlined text-xs">auto_stories</span>
              <span>مقال موثق ومستفيض</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold font-serif text-[#FCFBF8]">
              الرحلة الأخيرة: خريطة زمنية للحظات الوداع واليقين في حياة النبي ﷺ 🕰️
            </h3>
            <p className="text-xs text-[#F6F2E8]/85 leading-relaxed font-serif max-w-2xl">
              دراسة موسعة وشاملة تتناول علامات الرحيل، واقعة غدير خم، خريطة التهديدات والمؤامرات النبوية، رزية الخميس، واستئذان ملك الموت حتى الدفن والوداع الشريف وفق المصادر الشيعية الإمامية المعتمدة.
            </p>
          </div>

          <button
            onClick={() => onSelectPage('farewell_article')}
            className="px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#E2C15A] text-[#0D1511] font-bold text-xs transition-colors shrink-0 flex items-center gap-2 shadow-sm"
          >
            <span>قراءة الدراسة الكاملة</span>
            <span className="material-symbols-outlined text-sm">arrow_back</span>
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar: Phase Selection Navigation */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-[#0E5335] dark:text-[#E2C15A] uppercase tracking-wider mb-2 font-serif">
            {lang === 'ar' ? 'فصول ومراحل السيرة' : 'Biography Chapters'}
          </h3>
          <div className="flex flex-col gap-2">
            {SEERAH_PHASES.map((phase) => {
              const isSelected = phase.id === selectedPhaseId;
              return (
                <button
                  key={phase.id}
                  onClick={() => setSelectedPhaseId(phase.id)}
                  className={`p-4 rounded-xl text-right transition-all flex items-center justify-between border ${
                    isSelected
                      ? 'bg-[#0E5335] text-white border-[#D4AF37]/60 shadow-sm font-bold'
                      : 'bg-[#FCFBF8] dark:bg-[#14211A] text-[#161B18] dark:text-[#F6F2E8] border-[#DDD5C3] dark:border-[#253A2E] hover:border-[#0E5335] dark:hover:border-[#D4AF37]'
                  }`}
                >
                  <div>
                    <span className="text-sm font-serif block">{phase.title}</span>
                    <span className={`text-[11px] block mt-0.5 ${isSelected ? 'text-[#E2C15A]' : 'text-[#4F544E] dark:text-[#D5CFC2]/75'}`}>
                      {phase.hijriPeriod}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-lg">
                    {isSelected ? 'arrow_back' : 'chevron_left'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Chapter Content Display */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Phase Banner */}
          <div className="bg-[#FCFBF8] dark:bg-[#14211A] p-8 rounded-2xl border border-[#DDD5C3] dark:border-[#253A2E] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#DDD5C3] dark:border-[#253A2E] pb-4">
              <div>
                <span className="text-xs font-bold text-[#8B6514] dark:text-[#E2C15A] block mb-1">
                  {activePhase.period} ({activePhase.hijriPeriod})
                </span>
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#161B18] dark:text-[#F6F2E8]">
                  {activePhase.title}
                </h2>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#EFEAE0] dark:bg-[#0F1A14] text-[#0E5335] dark:text-[#E2C15A] flex items-center justify-center font-bold text-xl border border-[#D4AF37]/50">
                {SEERAH_PHASES.findIndex(p => p.id === activePhase.id) + 1}
              </div>
            </div>

            <p className={`text-[#161B18] dark:text-[#F6F2E8] font-serif ${fontClasses[fontSize]}`}>
              {activePhase.description}
            </p>

            {/* Key Events List in Phase */}
            <div className="pt-4 border-t border-[#DDD5C3] dark:border-[#253A2E]">
              <h4 className="text-xs font-bold text-[#0E5335] dark:text-[#E2C15A] mb-3">
                {lang === 'ar' ? 'أهم المحطات والأحداث في هذا الفصل:' : 'Key Milestones in this chapter:'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activePhase.keyEvents.map((evt, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-[#EFEAE0]/60 dark:bg-[#0F1A14] border border-[#DDD5C3] dark:border-[#253A2E] text-xs font-medium text-[#161B18] dark:text-[#F6F2E8]">
                    <span className="text-[#8B6514] dark:text-[#E2C15A] font-bold">❖</span>
                    <span>{evt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Events Detailed Breakdown under Active Phase */}
          {phaseEvents.map((evt) => (
            <div key={evt.id} className="bg-[#FCFBF8] dark:bg-[#14211A] p-6 md:p-8 rounded-2xl border border-[#DDD5C3] dark:border-[#253A2E] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#8B6514] dark:text-[#E2C15A] block font-mono tabular-nums">
                    {evt.yearHijri} ({evt.yearCE} م) · {evt.locationName}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold font-serif text-[#161B18] dark:text-[#F6F2E8]">
                    {evt.title}
                  </h3>
                </div>
                <span className="text-xs font-bold text-[#0E5335] dark:text-[#E2C15A]">
                  {evt.category === 'battle' ? 'غزوة' : evt.category === 'revelation' ? 'نزول وحي' : 'حدث تاريخي'}
                </span>
              </div>

              <p className={`text-[#161B18] dark:text-[#F6F2E8] font-serif ${fontClasses[fontSize]}`}>
                {evt.details}
              </p>

              {/* Quranic Verses linked */}
              {evt.quranVerses && evt.quranVerses.length > 0 && (
                <div className="my-4 p-5 rounded-xl bg-[#EFEAE0]/70 dark:bg-[#0F1A14] border border-[#D4AF37]/40 text-center">
                  <span className="text-[11px] font-bold text-[#0E5335] dark:text-[#E2C15A] block mb-2">
                    القرآن الكريم المرتبط بالحدث:
                  </span>
                  {evt.quranVerses.map((v, i) => (
                    <div key={i} className="space-y-1">
                      <p className="text-lg font-serif text-[#161B18] dark:text-[#F6F2E8]">
                        " {v.text} "
                      </p>
                      <span className="text-xs text-[#4F544E] dark:text-[#D5CFC2]/80 block">
                        [سورة {v.surah} - الآية {v.number}]
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Hadith linked */}
              {evt.hadiths && evt.hadiths.length > 0 && (
                <div className="my-4 p-4 rounded-xl bg-[#EFEAE0]/70 dark:bg-[#0F1A14] border border-[#0E5335]/30 dark:border-[#D4AF37]/30">
                  <span className="text-xs font-bold text-[#0E5335] dark:text-[#E2C15A] block mb-1">
                    حديث نبوي شريف:
                  </span>
                  {evt.hadiths.map((h, i) => (
                    <p key={i} className="text-sm font-serif italic text-[#4F544E] dark:text-[#D5CFC2]">
                      "{h.text}" — <span className="text-xs font-sans text-[#8B6514] dark:text-[#E2C15A]">({h.source})</span>
                    </p>
                  ))}
                </div>
              )}

              {/* Lessons & Sources */}
              <div className="pt-4 border-t border-[#DDD5C3] dark:border-[#253A2E] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-[#0E5335] dark:text-[#E2C15A]">المصادر المعتمدة:</span>
                  <span className="text-[11px] text-[#4F544E] dark:text-[#D5CFC2]/85">
                    {evt.sources.map(s => `${s.name}${s.pageOrVolume ? ` (${s.pageOrVolume})` : ''}`).join(' · ')}
                  </span>
                </div>

                <button
                  onClick={() => onAddBookmark({
                    id: `event-${evt.id}`,
                    type: 'event',
                    title: evt.title,
                    subtitle: evt.yearHijri,
                    pathPage: 'seerah',
                    targetId: evt.id,
                    addedAt: new Date().toLocaleDateString('ar-SA')
                  })}
                  className="text-[#0E5335] dark:text-[#E2C15A] hover:underline font-bold flex items-center gap-1 shrink-0"
                >
                  <span className="material-symbols-outlined text-sm">bookmark</span>
                  <span>حفظ في المفضلة</span>
                </button>
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
};
