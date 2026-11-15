import React, { useState } from 'react';
import { SOURCE_REFERENCES, DIGITAL_LIBRARIES } from '../data/seerahData';
import { DigitalLibraryPublication } from '../types';

interface SourcesViewProps {
  lang: 'ar' | 'en';
}

const BookCoverCard: React.FC<{ pub: DigitalLibraryPublication }> = ({ pub }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative aspect-[3/4] w-full max-w-[180px] mx-auto rounded-xl overflow-hidden shadow-xl border-2 border-[#D4AF37] bg-gradient-to-br from-[#0E5335] via-[#0A3422] to-[#081F15] flex flex-col justify-between p-3.5 group-hover:scale-105 transition-all duration-300">
      
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
      <div className="absolute inset-1 border border-[#D4AF37]/50 rounded-lg pointer-events-none z-10 flex flex-col justify-between p-1">
        <div className="flex justify-between text-[8px] text-[#E2C15A]/70 font-serif">
          <span>❖</span>
          <span>❖</span>
        </div>
        <div className="flex justify-between text-[8px] text-[#E2C15A]/70 font-serif">
          <span>❖</span>
          <span>❖</span>
        </div>
      </div>

      {/* Book Spine Texture Effect */}
      <div className="absolute top-0 right-0 bottom-0 w-3 bg-gradient-to-r from-black/60 via-[#D4AF37]/25 to-black/40 border-l border-[#D4AF37]/45 pointer-events-none z-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#081F15]/95 via-[#0A2E1E]/40 to-transparent pointer-events-none z-10" />

      {/* Cover Top Metadata */}
      <div className="relative z-20 flex items-center justify-between gap-1 text-[9px] font-bold text-[#E2C15A]">
        <span>{pub.categoryTag || 'إصدار حديث'}</span>
        {pub.badge && <span className="text-[#F6F2E8]/90">{pub.badge}</span>}
      </div>

      {/* Cover Title & Author Calligraphy Effect */}
      <div className="relative z-20 space-y-1.5 text-center py-2 px-1">
        <div className="w-6 h-6 mx-auto rounded-full bg-[#0E5335]/80 border border-[#D4AF37]/60 flex items-center justify-center text-[#E2C15A] text-xs">
          📖
        </div>
        <h5 className="text-xs md:text-sm font-bold font-serif text-[#FCFBF8] drop-shadow-md leading-snug line-clamp-2">
          {pub.title}
        </h5>
        <p className="text-[10px] text-[#E2C15A]/90 font-serif line-clamp-1 border-t border-[#D4AF37]/35 pt-1">
          {pub.authorOrCenter}
        </p>
      </div>

      {/* Footer Institution Tag */}
      <div className="relative z-20 text-center">
        <span className="text-[8px] text-[#E2C15A]/80 font-mono tracking-wider uppercase">
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
      <div className="bg-[#FCFBF8] dark:bg-[#14211A] p-6 md:p-8 rounded-3xl border border-[#DDD5C3] dark:border-[#253A2E] shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#0E5335] dark:text-[#E2C15A] block mb-1">
              المكتبة والمصادر الرقمية والحديثة
            </span>
            <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#161B18] dark:text-[#F6F2E8]">
              {lang === 'ar' ? 'المصادر والمراجع والمكتبات المعتمدة' : 'Sources & Approved Digital Libraries'}
            </h1>
          </div>
          
          <a
            href="https://books.almaaref.org/section.php?id=116"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0E5335] hover:bg-[#0A3D27] text-white border border-[#D4AF37]/50 text-xs font-bold transition-all shadow-sm"
          >
            <span>زيارة قسم السيرة بمكتبة المعارف</span>
            <span className="material-symbols-outlined text-base text-[#E2C15A]">open_in_new</span>
          </a>
        </div>

        <p className="text-xs md:text-sm text-[#4F544E] dark:text-[#D5CFC2]/85 leading-relaxed max-w-4xl">
          {lang === 'ar' 
            ? 'تعتمد المنصة حصرياً على أمهات كتب السيرة النبوية والأحاديث الموثوقة المحققة علمياً، بالإضافة إلى الربط المباشر بـ «مكتبة المعارف الإسلامية - قسم السيرة والتاريخ» لعرض أحدث الإصدارات والدراسات التخصصية.'
            : 'Authenticated bibliography guaranteeing factual accuracy, complemented by direct links to Almaaref Islamic Digital Library.'
          }
        </p>
      </div>

      {/* Featured Digital Library Section: Almaaref Islamic Library */}
      {DIGITAL_LIBRARIES.map((lib) => (
        <section key={lib.id} className="bg-gradient-to-b from-[#EFEAE0]/60 via-[#FCFBF8] to-[#EFEAE0]/60 dark:from-[#0F1A14] dark:via-[#14211A] dark:to-[#0F1A14] p-6 md:p-8 rounded-3xl border-2 border-[#0E5335]/60 dark:border-[#D4AF37]/70 shadow-md space-y-6">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#DDD5C3] dark:border-[#253A2E] pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#8B6514] dark:text-[#E2C15A]">
                <span>مكتبة إسلامية معتمدة</span>
                <span aria-hidden="true">·</span>
                <span>{lib.publisher}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#161B18] dark:text-[#F6F2E8] flex items-center gap-2">
                <span>{lib.name}</span>
                <span className="text-base text-[#0E5335] dark:text-[#E2C15A] font-sans font-normal">({lib.sectionName})</span>
              </h2>
            </div>

            <a
              href={lib.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#0E5335] hover:bg-[#0A3D27] text-white border border-[#D4AF37]/50 text-xs font-bold transition-all shadow-md shrink-0"
            >
              <span>تصفح قسم السيرة بالمكتبة (قسم 116)</span>
              <span className="material-symbols-outlined text-base text-[#E2C15A]">open_in_new</span>
            </a>
          </div>

          <p className="text-xs md:text-sm text-[#161B18] dark:text-[#F6F2E8] font-serif leading-relaxed">
            {lib.description}
          </p>

          {/* Publications Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-t border-[#DDD5C3] dark:border-[#253A2E] pt-4">
              <h3 className="text-base font-bold font-serif text-[#0E5335] dark:text-[#E2C15A] flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">auto_stories</span>
                <span>أحدث الإصدارات والدراسات الجديدة (قسم السيرة والتاريخ):</span>
              </h3>
              <span className="text-xs text-[#4F544E] dark:text-[#D5CFC2]/80 font-bold tabular-nums">
                {lib.publications.length} إصدارات رقمية متاحة
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {lib.publications.map((pub) => (
                <div
                  key={pub.id}
                  className="bg-[#FCFBF8] dark:bg-[#0F1A14] p-5 rounded-2xl border border-[#DDD5C3] dark:border-[#253A2E] hover:border-[#0E5335] dark:hover:border-[#D4AF37] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    
                    {/* Book Cover Container */}
                    <BookCoverCard pub={pub} />

                    <div className="space-y-1.5 pt-1">
                      <h4 className="text-base font-bold font-serif text-[#161B18] dark:text-[#F6F2E8] group-hover:text-[#0E5335] dark:group-hover:text-[#E2C15A] transition-colors text-center sm:text-right">
                        {pub.title}
                      </h4>

                      <p className="text-[11px] text-[#8B6514] dark:text-[#E2C15A] font-bold text-center sm:text-right">
                        {pub.authorOrCenter} · <span className="text-[#4F544E] dark:text-[#D5CFC2]/75 font-normal">{pub.yearOrEdition}</span>
                      </p>

                      <p className="text-xs text-[#4F544E] dark:text-[#D5CFC2]/85 leading-relaxed font-serif line-clamp-3">
                        {pub.summary}
                      </p>
                    </div>

                  </div>

                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-[#EFEAE0] dark:bg-[#14211A] group-hover:bg-[#0E5335] text-[#0E5335] dark:text-[#E2C15A] group-hover:text-white border border-[#DDD5C3] dark:border-[#253A2E] group-hover:border-[#D4AF37]/50 text-xs font-bold transition-all shadow-sm"
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
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#DDD5C3] dark:border-[#253A2E] pb-4">
          <h2 className="text-xl md:text-2xl font-bold font-serif text-[#161B18] dark:text-[#F6F2E8] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0E5335] dark:text-[#E2C15A]">menu_book</span>
            <span>أمهات كتب السيرة والمؤلفات الكلاسيكية</span>
          </h2>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs bg-[#EFEAE0] dark:bg-[#0F1A14] p-1.5 rounded-xl border border-[#DDD5C3] dark:border-[#253A2E]">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#0E5335] text-white shadow-sm'
                  : 'text-[#4F544E] dark:text-[#D5CFC2]/80 hover:text-[#161B18] dark:hover:text-white'
              }`}
            >
              الكل ({SOURCE_REFERENCES.length})
            </button>

            <button
              onClick={() => setSelectedCategory('primary')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedCategory === 'primary'
                  ? 'bg-[#0E5335] text-white shadow-sm'
                  : 'text-[#4F544E] dark:text-[#D5CFC2]/80 hover:text-[#161B18] dark:hover:text-white'
              }`}
            >
              كلاسيكي رئيسي
            </button>

            <button
              onClick={() => setSelectedCategory('hadith_compilation')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedCategory === 'hadith_compilation'
                  ? 'bg-[#0E5335] text-white shadow-sm'
                  : 'text-[#4F544E] dark:text-[#D5CFC2]/80 hover:text-[#161B18] dark:hover:text-white'
              }`}
            >
              جوامع الأحاديث
            </button>

            <button
              onClick={() => setSelectedCategory('modern_study')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedCategory === 'modern_study'
                  ? 'bg-[#0E5335] text-white shadow-sm'
                  : 'text-[#4F544E] dark:text-[#D5CFC2]/80 hover:text-[#161B18] dark:hover:text-white'
              }`}
            >
              دراسات معاصرة
            </button>

            <button
              onClick={() => setSelectedCategory('digital_library')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedCategory === 'digital_library'
                  ? 'bg-[#0E5335] text-white shadow-sm'
                  : 'text-[#4F544E] dark:text-[#D5CFC2]/80 hover:text-[#161B18] dark:hover:text-white'
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
              className="bg-[#FCFBF8] dark:bg-[#14211A] p-6 rounded-2xl border border-[#DDD5C3] dark:border-[#253A2E] shadow-sm space-y-4 text-right flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#DDD5C3] dark:border-[#253A2E] pb-3">
                  <div>
                    <span className="text-xs font-bold text-[#8B6514] dark:text-[#E2C15A]">
                      {src.category === 'primary' ? 'مرجع كلاسيكي رئيسي' : src.category === 'hadith_compilation' ? 'صحيح حديثي' : src.category === 'digital_library' ? 'مكتبة رقمية معتمدة' : 'دراسة موثقة معاصرة'}
                    </span>
                    <h3 className="text-xl font-bold font-serif text-[#161B18] dark:text-[#F6F2E8]">
                      {src.title}
                    </h3>
                  </div>
                  <span className="text-xs text-[#4F544E] dark:text-[#D5CFC2]/80 font-mono tabular-nums">
                    {src.deathYearHijri}
                  </span>
                </div>

                <p className="text-xs text-[#4F544E] dark:text-[#D5CFC2]/85 leading-relaxed">
                  <span className="font-bold text-[#0E5335] dark:text-[#E2C15A]">المؤلف/الجهة: </span>
                  {src.author}
                </p>

                <p className="text-xs text-[#4F544E] dark:text-[#D5CFC2]/85 leading-relaxed font-serif">
                  {src.description}
                </p>

                <div className="p-3 rounded-xl bg-[#EFEAE0]/70 dark:bg-[#0F1A14] border border-[#DDD5C3] dark:border-[#253A2E] text-xs space-y-1">
                  <span className="font-bold text-[#0E5335] dark:text-[#E2C15A] block">المنهجية والتأصيل العلمي:</span>
                  <p className="text-[#4F544E] dark:text-[#D5CFC2]/80">{src.methodologyNote}</p>
                </div>
              </div>

              {src.url && (
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-4 rounded-xl bg-[#0E5335]/10 dark:bg-[#D4AF37]/15 hover:bg-[#0E5335] text-[#0E5335] dark:text-[#E2C15A] hover:text-white border border-[#0E5335]/30 dark:border-[#D4AF37]/40 text-xs font-bold transition-all mt-2"
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

