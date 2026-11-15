import React, { useState } from 'react';
import { HistoricalPlace } from '../types';
import { HISTORICAL_PLACES, SEERAH_EVENTS } from '../data/seerahData';

interface MapsViewProps {
  lang: 'ar' | 'en';
}

export const MapsView: React.FC<MapsViewProps> = ({ lang }) => {
  const [selectedPlace, setSelectedPlace] = useState<HistoricalPlace>(HISTORICAL_PLACES[0]);
  const [showHijrahRoute, setShowHijrahRoute] = useState<boolean>(true);

  const placeEvents = SEERAH_EVENTS.filter(e => selectedPlace.linkedEventIds.includes(e.id));

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="bg-[#FCFBF8] dark:bg-[#14211A] p-6 rounded-2xl border border-[#DDD5C3] dark:border-[#253A2E] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-right">
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#161B18] dark:text-[#F6F2E8]">
            {lang === 'ar' ? 'الأماكن والخرائط التاريخية' : 'Maps & Historical Places'}
          </h1>
          <p className="text-xs text-[#4F544E] dark:text-[#D5CFC2]/80">
            {lang === 'ar' ? 'استكشف الجغرافيا التاريخية للسيرة النبوية والمواقع والأحداث الفاصلة' : 'Geographic landmarks of the Arabian Peninsula during the Prophetic Era'}
          </p>
        </div>

        {/* Route Toggle */}
        <button
          onClick={() => setShowHijrahRoute(!showHijrahRoute)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            showHijrahRoute
              ? 'bg-[#0E5335] text-white border border-[#D4AF37]/50 shadow-xs'
              : 'bg-[#EFEAE0] dark:bg-[#0F1A14] text-[#4F544E] dark:text-[#D5CFC2] border border-[#DDD5C3] dark:border-[#253A2E]'
          }`}
        >
          <span className="material-symbols-outlined text-base">route</span>
          <span>{lang === 'ar' ? 'إظهار مسار الهجرة النبوية' : 'Show Hijrah Route'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Interactive Illuminated Map Canvas (2 cols) */}
        <div className="lg:col-span-2 bg-[#FCFBF8] dark:bg-[#14211A] rounded-2xl p-6 border border-[#DDD5C3] dark:border-[#253A2E] shadow-sm relative min-h-[500px] flex flex-col justify-between overflow-hidden">
          
          {/* Nabawi Gold Dot Texture Overlay */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D4AF37_2px,transparent_2px)] [background-size:24px_24px] pointer-events-none" />

          {/* Compass Rose Ornament */}
          <div className="absolute top-4 left-4 w-16 h-16 rounded-full border-2 border-[#0E5335]/30 dark:border-[#D4AF37]/30 flex items-center justify-center text-[#0E5335] dark:text-[#E2C15A] opacity-40 pointer-events-none">
            <span className="material-symbols-outlined text-3xl">explore</span>
          </div>

          <div className="relative z-10 text-right mb-4">
            <span className="text-[11px] font-bold text-[#0E5335] dark:text-[#E2C15A] uppercase tracking-widest block font-serif">
              خريطة شبه الجزيرة العربية - القرن السابع الميلادي
            </span>
            <p className="text-xs text-[#4F544E] dark:text-[#D5CFC2]/80 mt-0.5">
              انقر على أي موقع استراتيجي لعرض التفاصيل والأحداث المرتبطة
            </p>
          </div>

          {/* Map Area Canvas Container */}
          <div className="relative w-full h-[400px] bg-[#EFE9DA] dark:bg-[#0D1511] rounded-2xl border border-[#DDD5C3] dark:border-[#253A2E] overflow-hidden shadow-inner my-auto">
            
            {/* Drawn Hijrah Route Line Path */}
            {showHijrahRoute && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {/* Path connecting Mecca (x: 35%, y: 65%) to Medina (x: 30%, y: 35%) */}
                <path
                  d="M 35% 65% Q 25% 50% 30% 35%"
                  fill="none"
                  stroke="#B88A28"
                  strokeWidth="3"
                  strokeDasharray="6,6"
                />
              </svg>
            )}

            {/* Render Place Pins */}
            {HISTORICAL_PLACES.map((place) => {
              const isSelected = place.id === selectedPlace.id;
              return (
                <button
                  key={place.id}
                  onClick={() => setSelectedPlace(place)}
                  style={{
                    left: `${place.coordinates.xPercentage}%`,
                    top: `${place.coordinates.yPercentage}%`
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group z-10 transition-transform ${
                    isSelected ? 'scale-125' : 'hover:scale-110'
                  }`}
                >
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-serif text-xs font-bold shadow-md border transition-all ${
                    isSelected
                      ? 'bg-[#0E5335] text-white border-[#D4AF37] ring-2 ring-[#D4AF37]/50'
                      : 'bg-[#FCFBF8] dark:bg-[#14211A] text-[#161B18] dark:text-[#F6F2E8] border-[#DDD5C3] dark:border-[#253A2E]'
                  }`}>
                    <span className={`material-symbols-outlined text-sm ${isSelected ? 'text-[#E2C15A]' : 'text-[#0E5335] dark:text-[#E2C15A]'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                      location_on
                    </span>
                    <span>{place.name}</span>
                  </div>
                </button>
              );
            })}

          </div>

          {/* Map Legend */}
          <div className="relative z-10 mt-4 flex items-center justify-between text-[11px] text-[#4F544E] dark:text-[#D5CFC2]/80 border-t border-[#DDD5C3] dark:border-[#253A2E] pt-3">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0E5335] border border-[#D4AF37]" />
                موقع رئيسي
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-0.5 bg-[#B88A28] border-t border-dashed" />
                طريق الهجرة
              </span>
            </div>
            <span>إحداثيات تاريخية موثقة</span>
          </div>

        </div>

        {/* Place Detail Sidebar Panel (1 col) */}
        <div className="bg-[#FCFBF8] dark:bg-[#14211A] p-6 rounded-2xl border border-[#DDD5C3] dark:border-[#253A2E] shadow-sm space-y-6 text-right">
          <div className="border-b border-[#DDD5C3] dark:border-[#253A2E] pb-4 space-y-1">
            <span className="text-xs font-bold text-[#8B6514] dark:text-[#E2C15A] block">
              {selectedPlace.arabicTitle}
            </span>
            <h2 className="text-2xl font-bold font-serif text-[#161B18] dark:text-[#F6F2E8]">
              {selectedPlace.name}
            </h2>
          </div>

          <p className="text-xs text-[#4F544E] dark:text-[#D5CFC2]/85 leading-relaxed">
            {selectedPlace.description}
          </p>

          <div className="p-4 rounded-xl bg-[#EFEAE0]/70 dark:bg-[#0F1A14] border border-[#DDD5C3] dark:border-[#253A2E] space-y-1">
            <span className="text-xs font-bold text-[#0E5335] dark:text-[#E2C15A] block">
              الأهمية التاريخية والإسلامية:
            </span>
            <p className="text-xs text-[#161B18] dark:text-[#F6F2E8]">
              {selectedPlace.significance}
            </p>
          </div>

          {/* Linked Events */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#0E5335] dark:text-[#E2C15A]">
              الأحداث والغزوات في هذا المكان:
            </h4>
            <div className="space-y-2">
              {placeEvents.map((ev) => (
                <div key={ev.id} className="p-3 rounded-xl bg-[#EFEAE0]/70 dark:bg-[#0F1A14] border border-[#DDD5C3] dark:border-[#253A2E] text-xs">
                  <span className="font-bold text-[#161B18] dark:text-[#F6F2E8] block">{ev.title}</span>
                  <p className="text-[11px] text-[#4F544E] dark:text-[#D5CFC2]/80 mt-1 line-clamp-2">{ev.summary}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
