import React, { useState } from 'react';
import { PageType, SeerahEvent } from '../types';
import { SEERAH_EVENTS, SEERAH_PHASES, QURAN_HADITH_REFS } from '../data/seerahData';

interface HomeViewProps {
  onSelectPage: (page: PageType) => void;
  onSelectEvent: (event: SeerahEvent) => void;
  lang: 'ar' | 'en';
}

export const HomeView: React.FC<HomeViewProps> = ({ onSelectPage, onSelectEvent, lang }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const featuredVerse = QURAN_HADITH_REFS[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSelectPage('search');
    }
  };

  return (
    <div className="space-y-12 pb-12">
      
      {/* Hero Banner Section in Authentic Al-Rawdah Emerald & Nabawi Gold */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#0A3422] via-[#0E4A30] to-[#08291A] text-[#F6F2E8] shadow-xl border border-[#D4AF37]/40 p-8 md:p-14 text-center">
        {/* Subtle Decorative Gold Pattern */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        
        {/* Calligraphic Subtitle */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#082417]/70 text-[#E2C15A] text-xs font-bold mb-6 border border-[#D4AF37]/50">
          <span className="material-symbols-outlined text-base">auto_awesome</span>
          <span>{lang === 'ar' ? 'منصة معرفية تفاعلية موثوقة' : 'Authentic Knowledge Portal'}</span>
        </div>

        {/* Main Display Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-serif leading-tight text-[#FCFBF8] mb-6 tracking-tight">
          {lang === 'ar' ? 'سيرة النبي محمد ﷺ' : 'The Biography of Prophet Muhammad (PBUH)'}
        </h1>
        
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-[#F6F2E8]/85 leading-relaxed mb-8 font-serif">
          {lang === 'ar'
            ? 'منصة تفاعلية تجمع بين عظمة النص التاريخي وسلاسة العرض الحديث. استكشف المخطط الزمني، الخرائط التاريخية، الأحداث والغزوات، واستعن بنظام البحث الذكي الموثوق.'
            : 'Explore the life, timeline, interactive maps, battles, and lessons of the Prophet (PBUH) backed by authenticated references.'}
        </p>

        {/* Search Bar Input Teaser */}
        <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mb-10 relative">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'ar' ? 'ابحث عن حدث، غزوة، مكان، أو صحابي...' : 'Search events, battles, places, or companions...'}
              className="w-full py-4 pr-12 pl-32 rounded-xl bg-[#082417]/80 text-[#FCFBF8] text-sm md:text-base focus:outline-none focus:ring-1 focus:ring-[#E2C15A] shadow-inner border border-[#D4AF37]/50 placeholder-[#F6F2E8]/55"
            />
            <span className="material-symbols-outlined absolute right-4 text-[#E2C15A] text-2xl">
              search
            </span>
            <button
              type="submit"
              className="absolute left-2 bg-[#D4AF37] hover:bg-[#E2C15A] text-[#0D1511] px-5 py-2.5 rounded-lg text-xs md:text-sm font-bold shadow-md transition-colors"
            >
              {lang === 'ar' ? 'بحث موثوق' : 'Search'}
            </button>
          </div>
        </form>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onSelectPage('seerah')}
            className="px-6 py-3.5 rounded-lg bg-[#D4AF37] hover:bg-[#E2C15A] text-[#0D1511] font-bold text-sm shadow-md transition-all hover:-translate-y-0.5 flex items-center gap-2"
          >
            <span className="material-symbols-outlined">auto_stories</span>
            <span>{lang === 'ar' ? 'تصفح السيرة النبوية' : 'Read Biography'}</span>
          </button>

          <button
            onClick={() => onSelectPage('ai_rag')}
            className="px-6 py-3.5 rounded-lg bg-[#FCFBF8]/10 hover:bg-[#FCFBF8]/20 text-[#FCFBF8] font-bold text-sm border border-[#D4AF37]/50 shadow-md backdrop-blur-xs transition-all hover:-translate-y-0.5 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[#E2C15A]">smart_toy</span>
            <span>{lang === 'ar' ? 'اسأل المساعد الذكي' : 'Ask AI Assistant'}</span>
          </button>

          <button
            onClick={() => onSelectPage('timeline')}
            className="px-6 py-3.5 rounded-lg bg-transparent hover:bg-[#082417]/70 text-[#E2C15A] font-bold text-sm border border-[#D4AF37]/45 transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined">timeline</span>
            <span>{lang === 'ar' ? 'الخط الزمني' : 'Timeline'}</span>
          </button>

          <button
            onClick={() => onSelectPage('sources')}
            className="px-6 py-3.5 rounded-lg bg-[#1B3B68]/60 hover:bg-[#1B3B68]/85 text-[#F6F2E8] font-bold text-sm border border-[#D4AF37]/50 transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[#E2C15A]">library_books</span>
            <span>{lang === 'ar' ? 'مكتبة المعارف والمصادر' : 'Library & Sources'}</span>
          </button>
        </div>
      </section>

      {/* Featured Verse / Hadith Card */}
      {featuredVerse && (
        <section className="bg-[#FCFBF8] dark:bg-[#14211A] rounded-2xl p-6 md:p-8 border border-[#DDD5C3] dark:border-[#253A2E] shadow-sm text-center max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-[#0E5335] via-[#D4AF37] to-[#0E5335]" />
          <span className="text-xs font-bold text-[#0E5335] dark:text-[#E2C15A] uppercase tracking-widest block mb-2">
            {lang === 'ar' ? 'من مشكاة الهداية' : 'Featured Prophetic Reference'}
          </span>
          <blockquote className="text-xl md:text-2xl font-serif leading-relaxed text-[#161B18] dark:text-[#F6F2E8] my-4 px-4 italic">
            "{featuredVerse.textArabic}"
          </blockquote>
          <div className="mt-2 text-center">
            <span className="text-xs font-bold text-[#8B6514] dark:text-[#E2C15A]">
              {featuredVerse.reference} · ({featuredVerse.context})
            </span>
          </div>
        </section>
      )}

      {/* Featured Study / Article Banner */}
      <section 
        onClick={() => onSelectPage('farewell_article')}
        className="cursor-pointer group relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0A3422] via-[#134B32] to-[#0D1511] text-[#F6F2E8] border-2 border-[#D4AF37]/60 shadow-xl p-8 md:p-10 transition-all hover:border-[#E2C15A]"
      >
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#D4AF37]/20 rounded-full blur-3xl group-hover:scale-150 transition-transform" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#082417]/70 text-[#E2C15A] text-xs font-bold border border-[#D4AF37]/40">
              <span className="material-symbols-outlined text-sm">auto_stories</span>
              <span>دراسة وثائقية ختامية تفصيلية</span>
            </div>

            <h2 className="text-2xl md:text-4xl font-bold font-serif text-[#FCFBF8] group-hover:text-[#E2C15A] transition-colors leading-snug">
              الرحلة الأخيرة: خريطة زمنية للحظات الوداع واليقين في حياة النبي ﷺ 🕰️
            </h2>

            <p className="text-xs md:text-sm text-[#F6F2E8]/85 font-serif leading-relaxed max-w-3xl">
              تصفح مقالة حصرية توثق اللحظات الأخيرة من حياة الرسول الأعظم ﷺ، بدءاً من علامات الرحيل الكبرى، خطبة الغدير الخالدة، خريطة الاغتيالات والمؤامرات، رزية الخميس، واستئذان ملك الموت والتوصيف الهندسي للدفن النبوي الشريف وفق أمهات المراجع الشيعية.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-[#E2C15A]">
              <span>الكافي للكليني</span>
              <span aria-hidden="true">·</span>
              <span>الإرشاد للمفيد</span>
              <span aria-hidden="true">·</span>
              <span>إعلام الورى للطبرسي</span>
              <span aria-hidden="true">·</span>
              <span>الصحيح من سيرة النبي الأعظم</span>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#D4AF37] text-[#0D1511] font-bold text-xs group-hover:bg-[#E2C15A] transition-colors shadow-lg">
            <span>اقرأ المقالة الكاملة</span>
            <span className="material-symbols-outlined text-base group-hover:-translate-x-1 transition-transform">arrow_back</span>
          </div>
        </div>
      </section>

      {/* Grid Features Section */}
      <section className="space-y-6">
        <div className="text-right">
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#161B18] dark:text-[#F6F2E8]">
            {lang === 'ar' ? 'أبواب السيرة الشريفة' : 'Explore Sections'}
          </h2>
          <p className="text-xs text-[#4F544E] dark:text-[#D5CFC2]/80 mt-1">
            {lang === 'ar' ? 'اختر الباب للتعمق في محطات ونور النبوة الخالدة' : 'Navigate through specialized knowledge sections'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Timeline */}
          <div
            onClick={() => onSelectPage('timeline')}
            className="group cursor-pointer bg-[#FCFBF8] dark:bg-[#14211A] p-6 rounded-2xl border border-[#DDD5C3] dark:border-[#253A2E] hover:border-[#0E5335] dark:hover:border-[#D4AF37] shadow-sm hover:shadow-md transition-all relative flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#EFEAE0] dark:bg-[#0F1A14] text-[#0E5335] dark:text-[#E2C15A] border border-[#DDD5C3] dark:border-[#253A2E] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-2xl">timeline</span>
              </div>
              <h3 className="text-xl font-bold font-serif text-[#161B18] dark:text-[#F6F2E8] mb-2 group-hover:text-[#0E5335] dark:group-hover:text-[#E2C15A]">
                {lang === 'ar' ? 'الخط الزمني التفاعلي' : 'Interactive Timeline'}
              </h3>
              <p className="text-xs text-[#4F544E] dark:text-[#D5CFC2]/85 leading-relaxed">
                {lang === 'ar'
                  ? 'استعرض الأحداث بالترتيب الزمني من عام الفيل إلى الوفاة مع خيارات العرض العمودي والأفقي.'
                  : 'Chronological timeline from the Year of the Elephant to the Farewell Pilgrimage.'}
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs font-bold text-[#0E5335] dark:text-[#E2C15A]">
              <span>{lang === 'ar' ? 'استعرض المخطط' : 'View Timeline'}</span>
              <span className="material-symbols-outlined text-sm transform group-hover:-translate-x-1 transition-transform">arrow_back</span>
            </div>
          </div>

          {/* Card 2: Events & Battles */}
          <div
            onClick={() => onSelectPage('events')}
            className="group cursor-pointer bg-[#FCFBF8] dark:bg-[#14211A] p-6 rounded-2xl border border-[#DDD5C3] dark:border-[#253A2E] hover:border-[#0E5335] dark:hover:border-[#D4AF37] shadow-sm hover:shadow-md transition-all relative flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#EFEAE0] dark:bg-[#0F1A14] text-[#0E5335] dark:text-[#E2C15A] border border-[#DDD5C3] dark:border-[#253A2E] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-2xl">swords</span>
              </div>
              <h3 className="text-xl font-bold font-serif text-[#161B18] dark:text-[#F6F2E8] mb-2 group-hover:text-[#0E5335] dark:group-hover:text-[#E2C15A]">
                {lang === 'ar' ? 'الأحداث والغزوات الكبرى' : 'Battles & Key Events'}
              </h3>
              <p className="text-xs text-[#4F544E] dark:text-[#D5CFC2]/85 leading-relaxed">
                {lang === 'ar'
                  ? 'بدر، أحد، الخندق، فتح مكة، صلح الحديبية؛ بالتفاصيل والمواقع الاستراتيجية والدروس.'
                  : 'Detailed insights into Major Battles, pledges, and historic milestones.'}
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs font-bold text-[#0E5335] dark:text-[#E2C15A]">
              <span>{lang === 'ar' ? 'استكشف الغزوات' : 'Explore Events'}</span>
              <span className="material-symbols-outlined text-sm transform group-hover:-translate-x-1 transition-transform">arrow_back</span>
            </div>
          </div>

          {/* Card 3: Companions & Characters */}
          <div
            onClick={() => onSelectPage('characters')}
            className="group cursor-pointer bg-[#FCFBF8] dark:bg-[#14211A] p-6 rounded-2xl border border-[#DDD5C3] dark:border-[#253A2E] hover:border-[#0E5335] dark:hover:border-[#D4AF37] shadow-sm hover:shadow-md transition-all relative flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#EFEAE0] dark:bg-[#0F1A14] text-[#0E5335] dark:text-[#E2C15A] border border-[#DDD5C3] dark:border-[#253A2E] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-2xl">group</span>
              </div>
              <h3 className="text-xl font-bold font-serif text-[#161B18] dark:text-[#F6F2E8] mb-2 group-hover:text-[#0E5335] dark:group-hover:text-[#E2C15A]">
                {lang === 'ar' ? 'أعلام السيرة والصحابة' : 'Companions & Figures'}
              </h3>
              <p className="text-xs text-[#4F544E] dark:text-[#D5CFC2]/85 leading-relaxed">
                {lang === 'ar'
                  ? 'آل البيت الأطهار، أم المؤمنين خديجة، أبو طالب، سلمان المحمدي، والمستضعفون الذين نصروا الدين.'
                  : 'Biographies and key moments of Companions and figures around the Prophet (PBUH).'}
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs font-bold text-[#0E5335] dark:text-[#E2C15A]">
              <span>{lang === 'ar' ? 'تصفح الشخصيات' : 'View Companions'}</span>
              <span className="material-symbols-outlined text-sm transform group-hover:-translate-x-1 transition-transform">arrow_back</span>
            </div>
          </div>

          {/* Card 4: Interactive Maps & Places */}
          <div
            onClick={() => onSelectPage('maps')}
            className="group cursor-pointer bg-[#FCFBF8] dark:bg-[#14211A] p-6 rounded-2xl border border-[#DDD5C3] dark:border-[#253A2E] hover:border-[#0E5335] dark:hover:border-[#D4AF37] shadow-sm hover:shadow-md transition-all relative flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#EFEAE0] dark:bg-[#0F1A14] text-[#0E5335] dark:text-[#E2C15A] border border-[#DDD5C3] dark:border-[#253A2E] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-2xl">map</span>
              </div>
              <h3 className="text-xl font-bold font-serif text-[#161B18] dark:text-[#F6F2E8] mb-2 group-hover:text-[#0E5335] dark:group-hover:text-[#E2C15A]">
                {lang === 'ar' ? 'الخرائط والأماكن التاريخية' : 'Maps & Places'}
              </h3>
              <p className="text-xs text-[#4F544E] dark:text-[#D5CFC2]/85 leading-relaxed">
                {lang === 'ar'
                  ? 'خريطة تفاعلية توضح مكة، المدينة، غار حراء، طريق الهجرة، جبل أحد وأرض الحبشة.'
                  : 'Interactive geographic maps of historical sites and travel routes.'}
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs font-bold text-[#0E5335] dark:text-[#E2C15A]">
              <span>{lang === 'ar' ? 'افتح الخريطة' : 'Open Map'}</span>
              <span className="material-symbols-outlined text-sm transform group-hover:-translate-x-1 transition-transform">arrow_back</span>
            </div>
          </div>

          {/* Card 5: Lessons & Values */}
          <div
            onClick={() => onSelectPage('lessons')}
            className="group cursor-pointer bg-[#FCFBF8] dark:bg-[#14211A] p-6 rounded-2xl border border-[#DDD5C3] dark:border-[#253A2E] hover:border-[#0E5335] dark:hover:border-[#D4AF37] shadow-sm hover:shadow-md transition-all relative flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#EFEAE0] dark:bg-[#0F1A14] text-[#0E5335] dark:text-[#E2C15A] border border-[#DDD5C3] dark:border-[#253A2E] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-2xl">lightbulb</span>
              </div>
              <h3 className="text-xl font-bold font-serif text-[#161B18] dark:text-[#F6F2E8] mb-2 group-hover:text-[#0E5335] dark:group-hover:text-[#E2C15A]">
                {lang === 'ar' ? 'الدروس والقيم المستفادة' : 'Lessons & Moral Values'}
              </h3>
              <p className="text-xs text-[#4F544E] dark:text-[#D5CFC2]/85 leading-relaxed">
                {lang === 'ar'
                  ? 'الصبر، الشورى، التخطيط، الرحمة، والوفاء بالعهود واستنتاج تطبيقاتها المعاصرة.'
                  : 'Moral, spiritual, and strategic lessons extracted for everyday modern life.'}
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs font-bold text-[#0E5335] dark:text-[#E2C15A]">
              <span>{lang === 'ar' ? 'اقرأ الدروس' : 'Read Lessons'}</span>
              <span className="material-symbols-outlined text-sm transform group-hover:-translate-x-1 transition-transform">arrow_back</span>
            </div>
          </div>

          {/* Card 6: AI RAG Assistant */}
          <div
            onClick={() => onSelectPage('ai_rag')}
            className="group cursor-pointer bg-gradient-to-br from-[#0E5335] to-[#082B1C] text-[#F6F2E8] p-6 rounded-2xl border border-[#D4AF37]/60 shadow-md hover:shadow-xl transition-all relative flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37] text-[#0D1511] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  smart_toy
                </span>
              </div>
              <h3 className="text-xl font-bold font-serif text-[#E2C15A] mb-2">
                {lang === 'ar' ? 'اسأل عن السيرة (نظام RAG)' : 'Ask AI Assistant'}
              </h3>
              <p className="text-xs text-[#F6F2E8]/85 leading-relaxed">
                {lang === 'ar'
                  ? 'نظام ذكاء اصطناعي موثوق يجيب عن استفساراتك مستنداً حصرياً إلى المراجع الكلاسيكية والدراسات المعتمدة.'
                  : 'Grounded AI engine referencing authenticated sources with citations.'}
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs font-bold text-[#E2C15A]">
              <span>{lang === 'ar' ? 'اسأل الآن' : 'Start Asking'}</span>
              <span className="material-symbols-outlined text-sm transform group-hover:-translate-x-1 transition-transform">arrow_back</span>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Timeline Highlights */}
      <section className="bg-[#FCFBF8] dark:bg-[#14211A] rounded-2xl p-8 border border-[#DDD5C3] dark:border-[#253A2E] shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="text-right">
            <h3 className="text-2xl font-bold font-serif text-[#161B18] dark:text-[#F6F2E8]">
              {lang === 'ar' ? 'أبرز المحطات في السيرة' : 'Timeline Highlights'}
            </h3>
            <p className="text-xs text-[#4F544E] dark:text-[#D5CFC2]/80">
              {lang === 'ar' ? 'محطات غيرت مجرى التاريخ البشري' : 'Crucial turns in Islamic biography'}
            </p>
          </div>
          <button
            onClick={() => onSelectPage('timeline')}
            className="text-xs font-bold text-[#0E5335] dark:text-[#E2C15A] hover:underline flex items-center gap-1"
          >
            <span>{lang === 'ar' ? 'جميع المحطات' : 'View All'}</span>
            <span className="material-symbols-outlined text-sm">arrow_back</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SEERAH_EVENTS.slice(0, 4).map((ev) => (
            <div
              key={ev.id}
              onClick={() => {
                onSelectEvent(ev);
                onSelectPage('events');
              }}
              className="p-5 rounded-xl bg-[#EFEAE0]/60 dark:bg-[#0F1A14] border border-[#DDD5C3] dark:border-[#253A2E] hover:border-[#0E5335] dark:hover:border-[#D4AF37] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold text-[#8B6514] dark:text-[#E2C15A] block mb-1 font-mono tabular-nums">
                  {ev.yearHijri} ({ev.yearCE} م)
                </span>
                <h4 className="font-bold text-base text-[#161B18] dark:text-[#F6F2E8] font-serif mb-2 line-clamp-1">
                  {ev.title}
                </h4>
                <p className="text-xs text-[#4F544E] dark:text-[#D5CFC2]/85 line-clamp-3 leading-relaxed">
                  {ev.summary}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#DDD5C3] dark:border-[#253A2E] flex items-center justify-between text-[11px] text-[#0E5335] dark:text-[#E2C15A] font-semibold">
                <span>{ev.locationName}</span>
                <span className="material-symbols-outlined text-sm">visibility</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
