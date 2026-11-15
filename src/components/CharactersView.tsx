import React, { useState } from 'react';
import { Character } from '../types';
import { CHARACTERS } from '../data/seerahData';

interface CharactersViewProps {
  lang: 'ar' | 'en';
}

export const CharactersView: React.FC<CharactersViewProps> = ({ lang }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = [
    { id: 'all', labelAr: 'جميع الصحابة والأعلام', labelEn: 'All Figures' },
    { id: 'caliph', labelAr: 'الخلفاء الراشدون', labelEn: 'Rightly Guided Caliphs' },
    { id: 'family', labelAr: 'آل البيت وأمهات المؤمنين', labelEn: 'Family & Mothers of Believers' },
    { id: 'companion', labelAr: 'الصحابة والشهداء', labelEn: 'Companions & Martyrs' },
  ];

  const filteredCharacters = CHARACTERS.filter((char) => {
    const matchesCategory = selectedCategory === 'all' || char.category === selectedCategory;
    const matchesSearch =
      char.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      char.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      char.bio.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header & Controls */}
      <div className="bg-[#FCFBF8] dark:bg-[#14211A] p-6 rounded-2xl border border-[#DDD5C3] dark:border-[#253A2E] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-right">
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#161B18] dark:text-[#F6F2E8]">
            {lang === 'ar' ? 'أعلام السيرة النبوية والصحابة الكرام' : 'Companions & Historical Figures'}
          </h1>
          <p className="text-xs text-[#4F544E] dark:text-[#D5CFC2]/80">
            {lang === 'ar' ? 'سير وحياة الرجال والنساء الذين عاصروا ونصروا الدعوة النبوية' : 'Biographies of those who supported and lived during the Prophetic era'}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={lang === 'ar' ? 'ابحث عن صحابي أو شخصية...' : 'Search companions...'}
            className="w-full py-2 pr-9 pl-3 rounded-xl bg-[#EFEAE0] dark:bg-[#0F1A14] text-xs text-[#161B18] dark:text-[#F6F2E8] border border-[#DDD5C3] dark:border-[#253A2E] focus:outline-none focus:border-[#0E5335] dark:focus:border-[#D4AF37]"
          />
          <span className="material-symbols-outlined absolute right-2.5 top-2 text-[#0E5335] dark:text-[#E2C15A] text-lg">
            search
          </span>
        </div>
      </div>

      {/* Category Tabs */}
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

      {/* Character Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCharacters.map((char) => (
          <div
            key={char.id}
            className="bg-[#FCFBF8] dark:bg-[#14211A] p-6 rounded-2xl border border-[#DDD5C3] dark:border-[#253A2E] hover:border-[#0E5335] dark:hover:border-[#D4AF37] shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3 border-b border-[#DDD5C3] dark:border-[#253A2E] pb-3">
                <div className="w-12 h-12 rounded-full bg-[#EFEAE0] dark:bg-[#0F1A14] text-[#0E5335] dark:text-[#E2C15A] border border-[#D4AF37]/50 flex items-center justify-center font-bold text-lg shrink-0">
                  <span className="material-symbols-outlined">person</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif text-[#161B18] dark:text-[#F6F2E8]">
                    {char.name}
                  </h3>
                  <span className="text-xs text-[#8B6514] dark:text-[#E2C15A] font-medium block">
                    {char.title}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#4F544E] dark:text-[#D5CFC2]/85 leading-relaxed">
                {char.bio}
              </p>

              {/* Relation */}
              <div className="p-2.5 rounded-lg bg-[#EFEAE0]/70 dark:bg-[#0F1A14] text-xs font-medium text-[#4F544E] dark:text-[#D5CFC2]/90 border border-[#DDD5C3] dark:border-[#253A2E]">
                <span className="font-bold text-[#0E5335] dark:text-[#E2C15A]">صلته بالنبي ﷺ: </span>
                {char.relationToProphet}
              </div>

              {/* Quote if available */}
              {char.famousQuote && (
                <div className="p-3 rounded-xl bg-[#EFEAE0]/70 dark:bg-[#0F1A14] border border-[#D4AF37]/40 italic text-xs text-[#161B18] dark:text-[#F6F2E8]">
                  "{char.famousQuote}"
                </div>
              )}
            </div>

            {/* Key Moments */}
            <div className="pt-3 border-t border-[#DDD5C3] dark:border-[#253A2E] text-[11px] text-[#4F544E] dark:text-[#D5CFC2]/80 space-y-1">
              <span className="font-bold text-[#0E5335] dark:text-[#E2C15A]">أبرز المواقف: </span>
              <ul className="list-disc list-inside space-y-0.5">
                {char.keyMoments.slice(0, 2).map((m, idx) => (
                  <li key={idx} className="line-clamp-1">{m}</li>
                ))}
              </ul>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
