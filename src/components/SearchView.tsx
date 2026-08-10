import React, { useState } from 'react';
import { SeerahEvent, Character, HistoricalPlace } from '../types';
import { SEERAH_EVENTS, CHARACTERS, HISTORICAL_PLACES, QURAN_HADITH_REFS } from '../data/seerahData';

interface SearchViewProps {
  onSelectEvent: (event: SeerahEvent) => void;
  lang: 'ar' | 'en';
}

export const SearchView: React.FC<SearchViewProps> = ({ onSelectEvent, lang }) => {
  const [query, setQuery] = useState('');

  const trimmedQuery = query.trim().toLowerCase();

  const matchedEvents = trimmedQuery
    ? SEERAH_EVENTS.filter(e =>
        e.title.toLowerCase().includes(trimmedQuery) ||
        e.summary.toLowerCase().includes(trimmedQuery) ||
        e.details.toLowerCase().includes(trimmedQuery) ||
        e.locationName.toLowerCase().includes(trimmedQuery)
      )
    : [];

  const matchedCharacters = trimmedQuery
    ? CHARACTERS.filter(c =>
        c.name.toLowerCase().includes(trimmedQuery) ||
        c.title.toLowerCase().includes(trimmedQuery) ||
        c.bio.toLowerCase().includes(trimmedQuery)
      )
    : [];

  const matchedPlaces = trimmedQuery
    ? HISTORICAL_PLACES.filter(p =>
        p.name.toLowerCase().includes(trimmedQuery) ||
        p.description.toLowerCase().includes(trimmedQuery)
      )
    : [];

  const matchedRefs = trimmedQuery
    ? QURAN_HADITH_REFS.filter(r =>
        r.textArabic.toLowerCase().includes(trimmedQuery) ||
        r.context.toLowerCase().includes(trimmedQuery)
      )
    : [];

  const totalResults = matchedEvents.length + matchedCharacters.length + matchedPlaces.length + matchedRefs.length;

  return (
    <div className="space-y-8 pb-12 text-right">
      
      {/* Header & Search Bar */}
      <div className="bg-white dark:bg-[#2D2926] p-8 rounded-2xl border border-[#E5E1D8] dark:border-[#3A3530] shadow-sm space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#1A1816] dark:text-[#FDFBF7]">
            {lang === 'ar' ? 'البحث الشامل والموثق' : 'Comprehensive Search'}
          </h1>
          <p className="text-xs text-[#5D574F] dark:text-[#E5E1D8]/70 mt-1">
            {lang === 'ar' ? 'ابحث في الأحداث، الشخصيات، الأماكن والآيات القرآنية والأحاديث' : 'Search across events, companions, maps, and verses'}
          </p>
        </div>

        <div className="relative max-w-3xl">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={lang === 'ar' ? 'اكتب كلمة البحث (مثال: بدر، الحبشة، عمر بن الخطاب، الوحي...)' : 'Type search keyword...'}
            className="w-full py-4 pr-12 pl-4 rounded-xl bg-[#FAF8F4] dark:bg-[#1A1816] text-sm md:text-base text-[#1A1816] dark:text-[#FDFBF7] border border-[#E5E1D8] dark:border-[#3A3530] focus:outline-none focus:border-[#8E6E37]"
          />
          <span className="material-symbols-outlined absolute right-4 top-4 text-[#8E6E37] text-2xl">
            search
          </span>
        </div>

        {trimmedQuery && (
          <div className="text-xs font-bold text-[#8E6E37] dark:text-[#C5A059]">
            عُثر على ({totalResults}) نتيجة مطابقة لـ "{query}"
          </div>
        )}
      </div>

      {/* Results Section */}
      {trimmedQuery && (
        <div className="space-y-8">
          
          {/* Matched Events */}
          {matchedEvents.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-serif text-[#1A1816] dark:text-[#FDFBF7] border-b border-[#E5E1D8] dark:border-[#3A3530] pb-2">
                الأحداث والغزوات ({matchedEvents.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matchedEvents.map((ev) => (
                  <div
                    key={ev.id}
                    onClick={() => onSelectEvent(ev)}
                    className="p-5 rounded-xl bg-white dark:bg-[#2D2926] border border-[#E5E1D8] dark:border-[#3A3530] hover:border-[#8E6E37] transition-all cursor-pointer space-y-2 shadow-xs hover:shadow-md"
                  >
                    <span className="text-[11px] font-bold text-[#8E6E37] font-mono">{ev.yearHijri} - {ev.locationName}</span>
                    <h4 className="font-bold font-serif text-base text-[#1A1816] dark:text-[#FDFBF7]">{ev.title}</h4>
                    <p className="text-xs text-[#5D574F] dark:text-[#E5E1D8]/70 line-clamp-2">{ev.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Characters */}
          {matchedCharacters.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-serif text-[#1A1816] dark:text-[#FDFBF7] border-b border-[#E5E1D8] dark:border-[#3A3530] pb-2">
                الشخصيات والصحابة ({matchedCharacters.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matchedCharacters.map((c) => (
                  <div key={c.id} className="p-5 rounded-xl bg-white dark:bg-[#2D2926] border border-[#E5E1D8] dark:border-[#3A3530] space-y-2 shadow-xs">
                    <span className="text-[11px] font-bold text-[#8E6E37]">{c.title}</span>
                    <h4 className="font-bold font-serif text-base text-[#1A1816] dark:text-[#FDFBF7]">{c.name}</h4>
                    <p className="text-xs text-[#5D574F] dark:text-[#E5E1D8]/70 line-clamp-2">{c.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Places */}
          {matchedPlaces.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-serif text-[#1A1816] dark:text-[#FDFBF7] border-b border-[#E5E1D8] dark:border-[#3A3530] pb-2">
                الأماكن والخرائط ({matchedPlaces.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matchedPlaces.map((p) => (
                  <div key={p.id} className="p-5 rounded-xl bg-white dark:bg-[#2D2926] border border-[#E5E1D8] dark:border-[#3A3530] space-y-2 shadow-xs">
                    <span className="text-[11px] font-bold text-[#8E6E37]">{p.arabicTitle}</span>
                    <h4 className="font-bold font-serif text-base text-[#1A1816] dark:text-[#FDFBF7]">{p.name}</h4>
                    <p className="text-xs text-[#5D574F] dark:text-[#E5E1D8]/70 line-clamp-2">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {totalResults === 0 && (
            <div className="p-12 text-center text-[#5D574F] dark:text-[#E5E1D8]/70 bg-white dark:bg-[#2D2926] rounded-2xl border border-[#E5E1D8] dark:border-[#3A3530]">
              <span className="material-symbols-outlined text-4xl mb-2 text-[#8E6E37]">search_off</span>
              <p className="text-sm font-bold text-[#1A1816] dark:text-[#FDFBF7]">لم نجد نتائج مطابقة لـ "{query}"</p>
              <p className="text-xs mt-1">تأكد من كتابة الكلمات بشكل صحيح أو جرب مصطلحات أخرى.</p>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
