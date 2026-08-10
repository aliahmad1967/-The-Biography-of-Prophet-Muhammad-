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
      <div className="bg-white dark:bg-[#2D2926] p-6 rounded-2xl border border-[#E5E1D8] dark:border-[#3A3530] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-right">
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#1A1816] dark:text-[#FDFBF7]">
            {lang === 'ar' ? 'أعلام السيرة النبوية والصحابة الكرام' : 'Companions & Historical Figures'}
          </h1>
          <p className="text-xs text-[#5D574F] dark:text-[#E5E1D8]/70">
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
            className="w-full py-2 pr-9 pl-3 rounded-xl bg-[#FAF8F4] dark:bg-[#1A1816] text-xs text-[#1A1816] dark:text-[#FDFBF7] border border-[#E5E1D8] dark:border-[#3A3530] focus:outline-none"
          />
          <span className="material-symbols-outlined absolute right-2.5 top-2 text-[#8E6E37] text-lg">
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
                  ? 'bg-[#8E6E37] text-white shadow-xs'
                  : 'bg-white dark:bg-[#2D2926] text-[#1A1816] dark:text-[#FDFBF7] border border-[#E5E1D8] dark:border-[#3A3530] hover:bg-[#FAF8F4]'
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
            className="bg-white dark:bg-[#2D2926] p-6 rounded-2xl border border-[#E5E1D8] dark:border-[#3A3530] hover:border-[#8E6E37] shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3 border-b border-[#E5E1D8] dark:border-[#3A3530] pb-3">
                <div className="w-12 h-12 rounded-full bg-[#FAF8F4] dark:bg-[#1A1816] text-[#8E6E37] dark:text-[#C5A059] border border-[#E5E1D8] dark:border-[#3A3530] flex items-center justify-center font-bold text-lg shrink-0">
                  <span className="material-symbols-outlined">person</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif text-[#1A1816] dark:text-[#FDFBF7]">
                    {char.name}
                  </h3>
                  <span className="text-xs text-[#8E6E37] dark:text-[#C5A059] font-medium block">
                    {char.title}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#5D574F] dark:text-[#E5E1D8]/80 leading-relaxed">
                {char.bio}
              </p>

              {/* Relation */}
              <div className="p-2.5 rounded-lg bg-[#FAF8F4] dark:bg-[#1A1816] text-xs font-medium text-[#5D574F] dark:text-[#E5E1D8]/80 border border-[#E5E1D8] dark:border-[#3A3530]">
                <span className="font-bold text-[#8E6E37] dark:text-[#C5A059]">صلته بالنبي ﷺ: </span>
                {char.relationToProphet}
              </div>

              {/* Quote if available */}
              {char.famousQuote && (
                <div className="p-3 rounded-xl bg-[#FAF8F4] dark:bg-[#1A1816] border-r-2 border-[#8E6E37] italic text-xs text-[#5D574F] dark:text-[#E5E1D8]/90">
                  "{char.famousQuote}"
                </div>
              )}
            </div>

            {/* Key Moments */}
            <div className="pt-3 border-t border-[#E5E1D8] dark:border-[#3A3530] text-[11px] text-[#5D574F] dark:text-[#E5E1D8]/70 space-y-1">
              <span className="font-bold text-[#8E6E37] dark:text-[#C5A059]">أبرز المواقف: </span>
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
