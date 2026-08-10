import React, { useState } from 'react';
import { SOURCE_REFERENCES, DIGITAL_LIBRARIES } from '../data/seerahData';
import { DigitalLibraryPublication } from '../types';

interface SourcesViewProps {
  lang: 'ar' | 'en';
}

const BookCoverCard: React.FC<{ pub: DigitalLibraryPublication }> = ({ pub }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative aspect-[3/4] w-full max-w-[180px] mx-auto rounded-xl overflow-hidden shadow-xl border-2 border-[#8E6E37] dark:border-[#C5A059] bg-gradient-to-br from-[#2D2926] via-[#1A1816] to-[#3D352E] flex flex-col justify-between p-3.5 group-hover:scale-105 transition-all duration-300">
      
      {/* Background Image or Fallback Ornamentation */}
      {pub.coverImage && !imgError ? (
        <img
          src={pub.coverImage}
          alt={pub.title}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="absolute inset-0 w-full h-full object-cover rounded-lg opacity-90 group-hover:opacity-100 transition-opacity"
        />
      ) : null}

      {/* Decorative Leather Texture & Gold Foil Border Frame */}
      <div className="absolute inset-1 border border-amber-500/40 rounded-lg pointer-events-none z-10 flex flex-col justify-between p-1">
        <div className="flex justify-between text-[8px] text-amber-400/60 font-serif">
          <span>❖</span>
          <span>❖</span>
        </div>
        <div className="flex justify-between text-[8px] text-amber-400/60 font-serif">
          <span>❖</span>
          <span>❖</span>
        </div>
      </div>

      {/* Book Spine Texture Effect */}
      <div className="absolute top-0 right-0 bottom-0 w-3 bg-gradient-to-r from-black/60 via-amber-200/20 to-black/40 border-l border-amber-500/40 pointer-events-none z-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10" />

      {/* Cover Top Badges */}
      <div className="relative z-20 flex items-start justify-between gap-1">
        <span className="px-2 py-0.5 rounded bg-[#8E6E37] text-white text-[9px] font-bold shadow-md border border-amber-300/30">
          {pub.categoryTag || 'إصدار حديث'}
        </span>
        {pub.badge && (
          <span className="px-2 py-0.5 rounded-full bg-emerald-700 text-white text-[9px] font-bold shadow-md border border-emerald-400/30">
            {pub.badge}
          </span>
        )}
      </div>

      {/* Cover Title & Author Calligraphy Effect */}
      <div className="relative z-20 space-y-1.5 text-center py-2 px-1">
        <div className="w-6 h-6 mx-auto rounded-full bg-[#8E6E37]/30 border border-amber-400/50 flex items-center justify-center text-amber-300 text-xs">
          📖
        </div>
        <h5 className="text-xs md:text-sm font-bold font-serif text-amber-100 drop-shadow-md leading-snug line-clamp-2">
          {pub.title}
        </h5>
        <p className="text-[10px] text-amber-200/80 font-serif line-clamp-1 border-t border-amber-500/30 pt-1">
          {pub.authorOrCenter}
        </p>
      </div>

      {/* Footer Institution Tag */}
      <div className="relative z-20 text-center">
        <span className="text-[8px] text-amber-300/70 font-mono tracking-wider uppercase">
          مكتبة المعارف الإسلامية
        </span>
      </div>
    </div>
  );
};

export const SourcesView: React.FC<SourcesViewProps> = ({ lang }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'primary' | 'hadith_compilation' | 'modern_study' | 'digital_library'>('all');

  const filteredSources = selectedCategory === 'all' 
    ? SOURCE_REFERENCES 
    : SOURCE_REFERENCES.filter(s => s.category === selectedCategory);

  return (
    <div className="space-y-10 pb-12 text-right">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#2D2926] p-6 md:p-8 rounded-3xl border border-[#E5E1D8] dark:border-[#3A3530] shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8E6E37]/10 text-[#8E6E37] dark:text-[#C5A059] text-xs font-bold border border-[#8E6E37]/20 mb-2">
              <span className="material-symbols-outlined text-sm">menu_book</span>
              <span>المكتبة والمصادر الرقمية والحديثة</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#1A1816] dark:text-[#FDFBF7]">
              {lang === 'ar' ? 'المصادر والمراجع والمكتبات المعتمدة' : 'Sources & Approved Digital Libraries'}
            </h1>
          </div>
          
          <a
            href="https://books.almaaref.org/section.php?id=116"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8E6E37] hover:bg-[#72572B] text-white text-xs font-bold transition-all shadow-sm"
          >
            <span>زيارة قسم السيرة بمكتبة المعارف</span>
            <span className="material-symbols-outlined text-base">open_in_new</span>
          </a>
        </div>

        <p className="text-xs md:text-sm text-[#5D574F] dark:text-[#E5E1D8]/80 leading-relaxed max-w-4xl">
          {lang === 'ar' 
            ? 'تعتمد المنصة حصرياً على أمهات كتب السيرة النبوية والأحاديث الموثوقة المحققة علمياً، بالإضافة إلى الربط المباشر بـ «مكتبة المعارف الإسلامية - قسم السيرة والتاريخ» لعرض أحدث الإصدارات والدراسات التخصصية.'
            : 'Authenticated bibliography guaranteeing factual accuracy, complemented by direct links to Almaaref Islamic Digital Library.'
          }
        </p>
      </div>

      {/* Featured Digital Library Section: Almaaref Islamic Library */}
      {DIGITAL_LIBRARIES.map((lib) => (
        <section key={lib.id} className="bg-gradient-to-b from-[#FAF8F4] via-white to-[#FAF8F4] dark:from-[#252220] dark:via-[#2D2926] dark:to-[#252220] p-6 md:p-8 rounded-3xl border-2 border-[#8E6E37] dark:border-[#C5A059] shadow-md space-y-6">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#8E6E37]/30 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#8E6E37] text-white text-[11px] font-bold">
                  مكتبة إسلامية معتمدة
                </span>
                <span className="text-xs font-bold text-[#8E6E37] dark:text-[#C5A059]">
                  {lib.publisher}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#1A1816] dark:text-[#FDFBF7] flex items-center gap-2">
                <span>{lib.name}</span>
                <span className="text-base text-[#8E6E37] dark:text-[#C5A059] font-sans font-normal">({lib.sectionName})</span>
              </h2>
            </div>

            <a
              href={lib.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#8E6E37] hover:bg-[#72572B] text-white text-xs font-bold transition-all shadow-md shrink-0"
            >
              <span>تصفح قسم السيرة بالمكتبة (قسم 116)</span>
              <span className="material-symbols-outlined text-base">open_in_new</span>
            </a>
          </div>

          <p className="text-xs md:text-sm text-[#1A1816] dark:text-[#FDFBF7] font-serif leading-relaxed">
            {lib.description}
          </p>

          {/* Publications Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-t border-[#8E6E37]/20 pt-4">
              <h3 className="text-base font-bold font-serif text-[#8E6E37] dark:text-[#C5A059] flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">auto_stories</span>
                <span>أحدث الإصدارات والدراسات الجديدة (قسم السيرة والتاريخ):</span>
              </h3>
              <span className="text-xs text-[#5D574F] dark:text-[#E5E1D8]/70 font-bold">
                {lib.publications.length} إصدارات رقمية متاحة
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {lib.publications.map((pub) => (
                <div
                  key={pub.id}
                  className="bg-white dark:bg-[#1A1816] p-5 rounded-2xl border border-[#8E6E37]/30 hover:border-[#8E6E37] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    
                    {/* Book Cover Container */}
                    <BookCoverCard pub={pub} />

                    <div className="space-y-1.5 pt-1">
                      <h4 className="text-base font-bold font-serif text-[#1A1816] dark:text-[#FDFBF7] group-hover:text-[#8E6E37] transition-colors text-center sm:text-right">
                        {pub.title}
                      </h4>

                      <p className="text-[11px] text-[#8E6E37] dark:text-[#C5A059] font-bold text-center sm:text-right">
                        {pub.authorOrCenter} • <span className="text-[#5D574F] dark:text-[#E5E1D8]/60 font-normal">{pub.yearOrEdition}</span>
                      </p>

                      <p className="text-xs text-[#5D574F] dark:text-[#E5E1D8]/80 leading-relaxed font-serif line-clamp-3">
                        {pub.summary}
                      </p>
                    </div>

                  </div>

                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-[#FAF8F4] dark:bg-[#252220] group-hover:bg-[#8E6E37] text-[#8E6E37] dark:text-[#C5A059] group-hover:text-white border border-[#8E6E37]/30 text-xs font-bold transition-all shadow-sm"
                  >
                    <span>قراءة وتحميل الكتاب من مكتبة المعارف</span>
                    <span className="material-symbols-outlined text-sm">file_download</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

        </section>
      ))}

      {/* Classical Sources Filter & Grid */}
      <div className="space-y-6 pt-4">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E5E1D8] dark:border-[#3A3530] pb-4">
          <h2 className="text-xl md:text-2xl font-bold font-serif text-[#1A1816] dark:text-[#FDFBF7] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#8E6E37]">menu_book</span>
            <span>أمهات كتب السيرة والمؤلفات الكلاسيكية</span>
          </h2>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs bg-[#FAF8F4] dark:bg-[#1A1816] p-1.5 rounded-xl border border-[#E5E1D8] dark:border-[#3A3530]">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#8E6E37] text-white shadow-sm'
                  : 'text-[#5D574F] dark:text-[#E5E1D8]/70 hover:text-[#1A1816] dark:hover:text-white'
              }`}
            >
              الكل ({SOURCE_REFERENCES.length})
            </button>

            <button
              onClick={() => setSelectedCategory('primary')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedCategory === 'primary'
                  ? 'bg-[#8E6E37] text-white shadow-sm'
                  : 'text-[#5D574F] dark:text-[#E5E1D8]/70 hover:text-[#1A1816] dark:hover:text-white'
              }`}
            >
              كلاسيكي رئيسي
            </button>

            <button
              onClick={() => setSelectedCategory('hadith_compilation')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedCategory === 'hadith_compilation'
                  ? 'bg-[#8E6E37] text-white shadow-sm'
                  : 'text-[#5D574F] dark:text-[#E5E1D8]/70 hover:text-[#1A1816] dark:hover:text-white'
              }`}
            >
              جوامع الأحاديث
            </button>

            <button
              onClick={() => setSelectedCategory('modern_study')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedCategory === 'modern_study'
                  ? 'bg-[#8E6E37] text-white shadow-sm'
                  : 'text-[#5D574F] dark:text-[#E5E1D8]/70 hover:text-[#1A1816] dark:hover:text-white'
              }`}
            >
              دراسات معاصرة
            </button>

            <button
              onClick={() => setSelectedCategory('digital_library')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedCategory === 'digital_library'
                  ? 'bg-[#8E6E37] text-white shadow-sm'
                  : 'text-[#5D574F] dark:text-[#E5E1D8]/70 hover:text-[#1A1816] dark:hover:text-white'
              }`}
            >
              مكتبات رقمية
            </button>
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSources.map((src) => (
            <div
              key={src.id}
              className="bg-white dark:bg-[#2D2926] p-6 rounded-2xl border border-[#E5E1D8] dark:border-[#3A3530] shadow-sm space-y-4 text-right flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#E5E1D8] dark:border-[#3A3530] pb-3">
                  <div>
                    <span className="text-xs font-bold text-[#8E6E37] dark:text-[#C5A059]">
                      {src.category === 'primary' ? 'مرجع كلاسيكي رئيسي' : src.category === 'hadith_compilation' ? 'صحيح حديثي' : src.category === 'digital_library' ? 'مكتبة رقمية معتمدة' : 'دراسة موثقة معاصرة'}
                    </span>
                    <h3 className="text-xl font-bold font-serif text-[#1A1816] dark:text-[#FDFBF7]">
                      {src.title}
                    </h3>
                  </div>
                  <span className="text-xs text-[#5D574F] dark:text-[#E5E1D8]/70 font-mono">
                    {src.deathYearHijri}
                  </span>
                </div>

                <p className="text-xs text-[#5D574F] dark:text-[#E5E1D8]/80 leading-relaxed">
                  <span className="font-bold text-[#8E6E37] dark:text-[#C5A059]">المؤلف/الجهة: </span>
                  {src.author}
                </p>

                <p className="text-xs text-[#5D574F] dark:text-[#E5E1D8]/80 leading-relaxed font-serif">
                  {src.description}
                </p>

                <div className="p-3 rounded-xl bg-[#FAF8F4] dark:bg-[#1A1816] border border-[#E5E1D8] dark:border-[#3A3530] text-xs space-y-1">
                  <span className="font-bold text-[#8E6E37] dark:text-[#C5A059] block">المنهجية والتأصيل العلمي:</span>
                  <p className="text-[#5D574F] dark:text-[#E5E1D8]/70">{src.methodologyNote}</p>
                </div>
              </div>

              {src.url && (
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-4 rounded-xl bg-[#8E6E37]/10 hover:bg-[#8E6E37] text-[#8E6E37] hover:text-white border border-[#8E6E37]/30 text-xs font-bold transition-all mt-2"
                >
                  <span>زيارة رابط المكتبة/المصدر</span>
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              )}
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

