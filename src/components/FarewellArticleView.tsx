import React, { useState } from 'react';
import { BookmarkItem, PageType } from '../types';
import { FAREWELL_ARTICLE } from '../data/farewellArticleData';

interface FarewellArticleViewProps {
  onAddBookmark: (item: BookmarkItem) => void;
  onSelectPage: (page: PageType) => void;
  lang: 'ar' | 'en';
}

export const FarewellArticleView: React.FC<FarewellArticleViewProps> = ({
  onAddBookmark,
  onSelectPage,
  lang
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>(FAREWELL_ARTICLE.sections[0].id);
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('lg');
  const [copiedLink, setCopiedLink] = useState(false);

  const fontClasses = {
    sm: 'text-sm leading-relaxed',
    md: 'text-base leading-loose',
    lg: 'text-lg leading-loose',
    xl: 'text-xl leading-loose',
  };

  const handleBookmarkArticle = () => {
    onAddBookmark({
      id: `article-farewell-${Date.now()}`,
      type: 'event',
      title: FAREWELL_ARTICLE.title,
      subtitle: 'مقالة موسعة: دراسة وثائقية تفصيلية للحظات الوداع واليقين',
      pathPage: 'farewell_article',
      targetId: 'top',
      addedAt: new Date().toLocaleDateString('ar-SA')
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const scrollToSection = (id: string) => {
    setActiveSectionId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-8 pb-16 text-right">
      
      {/* Breadcrumb & Navigation Back */}
      <div className="flex items-center justify-between text-xs text-[#5D574F] dark:text-[#E5E1D8]/70">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onSelectPage('home')} 
            className="hover:text-[#8E6E37] transition-colors"
          >
            الرئيسية
          </button>
          <span>/</span>
          <button 
            onClick={() => onSelectPage('seerah')} 
            className="hover:text-[#8E6E37] transition-colors"
          >
            السيرة النبوية
          </button>
          <span>/</span>
          <span className="text-[#8E6E37] dark:text-[#C5A059] font-bold">دراسة الرحلة الأخيرة</span>
        </div>

        <button
          onClick={() => onSelectPage('seerah')}
          className="flex items-center gap-1 text-[#8E6E37] dark:text-[#C5A059] font-bold hover:underline"
        >
          <span>العودة لأبواب السيرة</span>
          <span className="material-symbols-outlined text-sm">arrow_back</span>
        </button>
      </div>

      {/* Main Hero Header Banner */}
      <div className="relative bg-white dark:bg-[#2D2926] p-8 md:p-12 rounded-3xl border border-[#E5E1D8] dark:border-[#3A3530] shadow-md overflow-hidden space-y-6">
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#8E6E37]/10 dark:bg-[#C5A059]/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8E6E37]/10 text-[#8E6E37] dark:text-[#C5A059] text-xs font-bold border border-[#8E6E37]/20">
          <span className="material-symbols-outlined text-sm">auto_stories</span>
          <span>دراسة توثيقية موسّعة وشاملة</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold font-serif text-[#1A1816] dark:text-[#FDFBF7] leading-tight">
          {FAREWELL_ARTICLE.title}
        </h1>

        <p className="text-base md:text-lg text-[#5D574F] dark:text-[#E5E1D8]/80 font-serif leading-relaxed">
          {FAREWELL_ARTICLE.subtitle}
        </p>

        {/* Note Box */}
        <div className="p-5 rounded-2xl bg-[#FAF8F4] dark:bg-[#1A1816] border-r-4 border-[#8E6E37] text-xs leading-relaxed text-[#1A1816] dark:text-[#FDFBF7]">
          <span className="font-bold text-[#8E6E37] dark:text-[#C5A059] block mb-1">تقديم القراءة:</span>
          {FAREWELL_ARTICLE.authorNote}
        </div>

        {/* Controls Toolbar */}
        <div className="pt-4 border-t border-[#E5E1D8] dark:border-[#3A3530] flex flex-wrap items-center justify-between gap-4 text-xs">
          
          {/* Font Size Adjuster */}
          <div className="flex items-center gap-1.5 bg-[#FAF8F4] dark:bg-[#1A1816] p-1.5 rounded-xl border border-[#E5E1D8] dark:border-[#3A3530]">
            <span className="text-[#5D574F] dark:text-[#E5E1D8]/70 ml-2 font-bold">حجم الخط:</span>
            {(['sm', 'md', 'lg', 'xl'] as const).map((sz) => (
              <button
                key={sz}
                onClick={() => setFontSize(sz)}
                className={`px-2.5 py-1 rounded-lg font-bold uppercase transition-colors ${
                  fontSize === sz
                    ? 'bg-[#8E6E37] text-white'
                    : 'text-[#5D574F] dark:text-[#E5E1D8] hover:bg-[#E5E1D8]/40'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleBookmarkArticle}
              className="px-4 py-2 rounded-xl bg-[#8E6E37]/10 text-[#8E6E37] dark:text-[#C5A059] font-bold hover:bg-[#8E6E37] hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">bookmark_add</span>
              <span>حفظ في المفضلة</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="px-4 py-2 rounded-xl bg-[#FAF8F4] dark:bg-[#1A1816] border border-[#E5E1D8] dark:border-[#3A3530] text-[#1A1816] dark:text-[#FDFBF7] font-bold hover:bg-[#E5E1D8]/30 transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">
                {copiedLink ? 'check' : 'share'}
              </span>
              <span>{copiedLink ? 'تم نسخ الرابط' : 'مشاركة المقال'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Grid: Sidebar Index & Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sticky Sidebar: Table of Contents */}
        <div className="lg:col-span-1 space-y-4">
          <div className="sticky top-24 bg-white dark:bg-[#2D2926] p-5 rounded-2xl border border-[#E5E1D8] dark:border-[#3A3530] shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-[#8E6E37] dark:text-[#C5A059] uppercase tracking-wider font-serif border-b border-[#E5E1D8] dark:border-[#3A3530] pb-2">
              فهرس المحتويات والأبواب
            </h3>
            
            <div className="space-y-1.5 text-xs">
              {FAREWELL_ARTICLE.sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`w-full text-right p-2.5 rounded-xl transition-all flex items-start gap-2 ${
                    activeSectionId === sec.id
                      ? 'bg-[#8E6E37] text-white font-bold shadow-xs'
                      : 'text-[#1A1816] dark:text-[#E5E1D8] hover:bg-[#FAF8F4] dark:hover:bg-[#1A1816]'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center shrink-0 ${
                    activeSectionId === sec.id ? 'bg-white text-[#8E6E37]' : 'bg-[#FAF8F4] dark:bg-[#1A1816] text-[#8E6E37]'
                  }`}>
                    {sec.number}
                  </span>
                  <span className="line-clamp-2 leading-relaxed">{sec.title}</span>
                </button>
              ))}

              <button
                onClick={() => scrollToSection('sec-architectural-note')}
                className="w-full text-right p-2.5 rounded-xl text-[#8E6E37] dark:text-[#C5A059] hover:bg-[#FAF8F4] dark:hover:bg-[#1A1816] font-bold flex items-center gap-2 transition-all mt-2 border-t border-[#E5E1D8] dark:border-[#3A3530] pt-3"
              >
                <span className="material-symbols-outlined text-base">architecture</span>
                <span>التوصيف الهندسي للدفن</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Reading Sections */}
        <div className="lg:col-span-3 space-y-10">
          
          {/* Article Introduction Card */}
          <div className="bg-white dark:bg-[#2D2926] p-8 rounded-2xl border border-[#E5E1D8] dark:border-[#3A3530] shadow-sm">
            <h2 className="text-xl font-bold font-serif text-[#8E6E37] dark:text-[#C5A059] mb-3">
              مقدمة المنهج والمدخل التاريخي
            </h2>
            <p className={`text-[#1A1816] dark:text-[#FDFBF7] font-serif ${fontClasses[fontSize]}`}>
              {FAREWELL_ARTICLE.introduction}
            </p>
          </div>

          {/* Render Sections */}
          {FAREWELL_ARTICLE.sections.map((sec) => (
            <section
              id={sec.id}
              key={sec.id}
              className={`p-8 rounded-2xl shadow-sm space-y-6 scroll-mt-28 transition-all ${
                sec.id === 'sec-threats-map'
                  ? 'bg-gradient-to-b from-[#FAF8F4] via-white to-[#FAF8F4] dark:from-[#252220] dark:via-[#2D2926] dark:to-[#252220] border-2 border-[#8E6E37] dark:border-[#C5A059]'
                  : 'bg-white dark:bg-[#2D2926] border border-[#E5E1D8] dark:border-[#3A3530]'
              }`}
            >
              {/* Section Header */}
              <div className="border-b border-[#E5E1D8] dark:border-[#3A3530] pb-4 flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-[#8E6E37] dark:text-[#C5A059] block mb-1">
                    الباب {sec.number}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#1A1816] dark:text-[#FDFBF7]">
                    {sec.title}
                  </h2>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#FAF8F4] dark:bg-[#1A1816] text-[#8E6E37] dark:text-[#C5A059] flex items-center justify-center font-bold border border-[#E5E1D8] dark:border-[#3A3530] shrink-0">
                  {sec.number}
                </div>
              </div>

              {/* Section Summary */}
              <div className="p-4 rounded-xl bg-[#FAF8F4] dark:bg-[#1A1816] text-xs font-semibold text-[#8E6E37] dark:text-[#C5A059] border border-[#8E6E37]/20">
                💡 خلاصة الباب: {sec.summary}
              </div>

              {/* Paragraphs */}
              <div className="space-y-4">
                {sec.content.map((paragraph, pIdx) => (
                  <p key={pIdx} className={`text-[#1A1816] dark:text-[#FDFBF7] font-serif ${fontClasses[fontSize]}`}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Special Threats Table Render if available */}
              {sec.threatsTable && (
                <div className="my-8 space-y-4">
                  <h3 className="text-lg font-bold font-serif text-[#8E6E37] dark:text-[#C5A059] flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl">shield</span>
                    <span>الجدول التوثيقي الموسّع للتهديدات والمؤامرات النبوية وفق المصادر الشيعية:</span>
                  </h3>

                  <div className="overflow-x-auto rounded-xl border border-[#E5E1D8] dark:border-[#3A3530]">
                    <table className="w-full text-right text-xs">
                      <thead className="bg-[#FAF8F4] dark:bg-[#1A1816] text-[#8E6E37] dark:text-[#C5A059] font-bold border-b border-[#E5E1D8] dark:border-[#3A3530]">
                        <tr>
                          <th className="p-3">الفترة والزمن</th>
                          <th className="p-3">اسم المؤامرة / الحدث</th>
                          <th className="p-3">طريقة الغدر والتنفيذ</th>
                          <th className="p-3">النتيجة والوقاية الإلهية</th>
                          <th className="p-3">المصادر الشيعية المعتمدة</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5E1D8] dark:divide-[#3A3530]">
                        {sec.threatsTable.map((item, tIdx) => (
                          <tr key={tIdx} className="hover:bg-[#FAF8F4]/50 dark:hover:bg-[#1A1816]/50 transition-colors">
                            <td className="p-3 font-bold text-[#8E6E37] whitespace-nowrap">{item.era}</td>
                            <td className="p-3 font-bold text-[#1A1816] dark:text-[#FDFBF7]">{item.threatName}</td>
                            <td className="p-3 text-[#5D574F] dark:text-[#E5E1D8]/80">{item.method}</td>
                            <td className="p-3 text-[#1A1816] dark:text-[#FDFBF7] leading-relaxed">{item.resultAndOutcome}</td>
                            <td className="p-3 text-[11px] text-[#8E6E37] dark:text-[#C5A059]">
                              {item.shiaSources.join('، ')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Quranic Verses Cards */}
              {sec.quranVerses && sec.quranVerses.length > 0 && (
                <div className="my-6 p-6 rounded-2xl bg-[#FAF8F4] dark:bg-[#1A1816] border border-[#E5E1D8] dark:border-[#3A3530] text-center space-y-3">
                  <span className="text-xs font-bold text-[#8E6E37] dark:text-[#C5A059] block">
                    الآيات القرآنيّة الشريفة المرتبطة بالحدث:
                  </span>
                  {sec.quranVerses.map((v, i) => (
                    <div key={i} className="space-y-1">
                      <p className="text-xl md:text-2xl font-serif text-[#1A1816] dark:text-[#FDFBF7] leading-relaxed">
                        ﴿ {v.text} ﴾
                      </p>
                      <span className="text-xs text-[#5D574F] dark:text-[#E5E1D8]/70 block font-sans">
                        [سورة {v.surah} - الآية {v.number}]
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Hadith Cards */}
              {sec.hadiths && sec.hadiths.length > 0 && (
                <div className="my-6 p-5 rounded-2xl bg-[#FAF8F4] dark:bg-[#1A1816] border-r-4 border-[#8E6E37] space-y-2">
                  <span className="text-xs font-bold text-[#8E6E37] dark:text-[#C5A059] block">
                    النص الشريف في أمهات المصادر الشيعية:
                  </span>
                  {sec.hadiths.map((h, i) => (
                    <div key={i} className="space-y-1">
                      <p className="text-base font-serif italic text-[#1A1816] dark:text-[#FDFBF7]">
                        "{h.text}"
                      </p>
                      <span className="text-xs text-[#8E6E37] font-sans block">
                        — ({h.source})
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Lessons & Values */}
              {sec.lessons && sec.lessons.length > 0 && (
                <div className="pt-4 border-t border-[#E5E1D8] dark:border-[#3A3530] space-y-2">
                  <h4 className="text-xs font-bold text-[#8E6E37] dark:text-[#C5A059]">
                    الدروس والعبر المنهجية:
                  </h4>
                  <ul className="space-y-1 text-xs text-[#1A1816] dark:text-[#FDFBF7] font-serif">
                    {sec.lessons.map((les, lIdx) => (
                      <li key={lIdx} className="flex items-start gap-2">
                        <span className="text-[#8E6E37] font-bold">•</span>
                        <span>{les}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Sources List */}
              <div className="pt-3 flex items-center gap-2 text-xs text-[#5D574F] dark:text-[#E5E1D8]/70">
                <span className="font-bold text-[#8E6E37] dark:text-[#C5A059]">المراجع الشيعية:</span>
                <span className="bg-[#FAF8F4] dark:bg-[#1A1816] px-2.5 py-1 rounded-lg border border-[#E5E1D8] dark:border-[#3A3530] text-[11px]">
                  {sec.sources.join(' | ')}
                </span>
              </div>

            </section>
          ))}

          {/* Section: Architectural & Jurisprudential Burial Breakdown */}
          <section
            id="sec-architectural-note"
            className="bg-white dark:bg-[#2D2926] p-8 rounded-2xl border-2 border-[#8E6E37]/40 dark:border-[#C5A059]/40 shadow-sm space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-[#E5E1D8] dark:border-[#3A3530] pb-4">
              <div className="w-12 h-12 rounded-xl bg-[#8E6E37]/10 text-[#8E6E37] dark:text-[#C5A059] flex items-center justify-center font-bold text-2xl">
                <span className="material-symbols-outlined">architecture</span>
              </div>
              <div>
                <span className="text-xs font-bold text-[#8E6E37] dark:text-[#C5A059] block">التوصيف الهندسي والفقهي</span>
                <h2 className="text-2xl font-bold font-serif text-[#1A1816] dark:text-[#FDFBF7]">
                  {FAREWELL_ARTICLE.architecturalNote.title}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Lahd Card */}
              <div className="p-6 rounded-2xl bg-[#FAF8F4] dark:bg-[#1A1816] border border-[#8E6E37]/30 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold font-serif text-[#8E6E37] dark:text-[#C5A059]">
                    1. اللَّحْد (السُنّة الهندسية للنبي ﷺ)
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#8E6E37] text-white text-[10px] font-bold">
                    ما تم للنبي ﷺ
                  </span>
                </div>
                <p className="text-xs text-[#1A1816] dark:text-[#FDFBF7] leading-relaxed">
                  {FAREWELL_ARTICLE.architecturalNote.lahdDescription}
                </p>
              </div>

              {/* Shaq Card */}
              <div className="p-6 rounded-2xl bg-[#FAF8F4] dark:bg-[#1A1816] border border-[#E5E1D8] dark:border-[#3A3530] space-y-3">
                <h3 className="text-lg font-bold font-serif text-[#5D574F] dark:text-[#E5E1D8]">
                  2. الشَّقّ (الطريقة البديلة)
                </h3>
                <p className="text-xs text-[#1A1816] dark:text-[#FDFBF7] leading-relaxed">
                  {FAREWELL_ARTICLE.architecturalNote.shaqDescription}
                </p>
              </div>

            </div>

            {/* Burial Execution Details */}
            <div className="p-5 rounded-xl bg-[#FAF8F4] dark:bg-[#1A1816] border border-[#E5E1D8] dark:border-[#3A3530] space-y-2">
              <h4 className="text-xs font-bold text-[#8E6E37] dark:text-[#C5A059]">
                إجراءات وتفاصيل الدفن الموثقة:
              </h4>
              <ul className="space-y-1.5 text-xs text-[#1A1816] dark:text-[#FDFBF7] font-serif">
                {FAREWELL_ARTICLE.architecturalNote.burialDetails.map((detail, dIdx) => (
                  <li key={dIdx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8E6E37]" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Final Conclusion Box */}
          <div className="bg-[#8E6E37] text-white p-8 md:p-10 rounded-3xl shadow-lg space-y-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-serif">
              خاتمة العهد والوصية النبوية الخالدة
            </h2>

            <p className="text-sm md:text-base leading-relaxed max-w-3xl mx-auto font-serif text-[#FDFBF7]">
              {FAREWELL_ARTICLE.conclusion.text}
            </p>

            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 max-w-2xl mx-auto space-y-2">
              <p className="text-lg font-serif italic text-white">
                "{FAREWELL_ARTICLE.conclusion.thaqalaynHadith.text}"
              </p>
              <span className="text-xs text-white/80 block font-sans">
                {FAREWELL_ARTICLE.conclusion.thaqalaynHadith.source}
              </span>
            </div>

            <div className="pt-4 flex items-center justify-center gap-4">
              <button
                onClick={() => onSelectPage('seerah')}
                className="px-6 py-2.5 rounded-xl bg-white text-[#8E6E37] font-bold text-xs hover:bg-[#FDFBF7] transition-colors"
              >
                تصفح فصول السيرة الشريفة
              </button>
              <button
                onClick={() => onSelectPage('ai_rag')}
                className="px-6 py-2.5 rounded-xl bg-black/20 text-white font-bold text-xs hover:bg-black/30 transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">smart_toy</span>
                <span>اسأل المساعد الذكي عن السيرة</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
