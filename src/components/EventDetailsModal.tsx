import React, { useEffect } from 'react';
import { BookmarkItem, SeerahEvent } from '../types';

interface EventDetailsModalProps {
  event: SeerahEvent | null;
  onClose: () => void;
  onAddBookmark?: (item: BookmarkItem) => void;
  isBookmarked?: boolean;
  lang: 'ar' | 'en';
}

const CATEGORY_LABELS: Record<SeerahEvent['category'], { ar: string; en: string }> = {
  battle: { ar: 'غزوة ومعركة', en: 'Battle' },
  treaty: { ar: 'صلح ومعاهدة', en: 'Treaty' },
  pledge: { ar: 'بيعة وعهد', en: 'Pledge' },
  revelation: { ar: 'وحي ونبوة', en: 'Revelation' },
  migration: { ar: 'هجرة نبوية', en: 'Migration' },
  milestone: { ar: 'محطة كبرى', en: 'Milestone' },
};

export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  event,
  onClose,
  onAddBookmark,
  isBookmarked = false,
  lang,
}) => {
  useEffect(() => {
    if (!event) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [event, onClose]);

  if (!event) return null;

  const categoryLabel = CATEGORY_LABELS[event.category]
    ? lang === 'ar'
      ? CATEGORY_LABELS[event.category].ar
      : CATEGORY_LABELS[event.category].en
    : '';

  const handleBookmark = () => {
    if (!onAddBookmark) return;
    onAddBookmark({
      id: `event-${event.id}`,
      type: 'event',
      title: event.title,
      subtitle: `${event.yearHijri} · ${event.locationName}`,
      pathPage: 'events',
      targetId: event.id,
      addedAt: new Date().toLocaleDateString('ar-SA'),
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0D1511]/80 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-modal-title"
    >
      <div
        className="bg-[#FCFBF8] dark:bg-[#14211A] max-w-3xl w-full max-h-[88vh] overflow-y-auto rounded-2xl border border-[#D4AF37]/50 shadow-2xl p-6 md:p-8 space-y-6 text-right relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Strip */}
        <div className="absolute top-0 right-0 left-0 h-1 rounded-t-2xl bg-gradient-to-r from-[#0E5335] via-[#D4AF37] to-[#0E5335]" />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[#DDD5C3] dark:border-[#253A2E] pb-4 pt-1">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
              {categoryLabel && (
                <span className="text-[#0E5335] dark:text-[#E2C15A]">{categoryLabel}</span>
              )}
              {categoryLabel && <span className="text-[#4F544E] dark:text-[#D5CFC2]/60" aria-hidden="true">·</span>}
              <span className="text-[#8B6514] dark:text-[#E2C15A] font-mono tabular-nums">
                {event.yearHijri} ({event.yearCE} م)
              </span>
              <span className="text-[#4F544E] dark:text-[#D5CFC2]/60" aria-hidden="true">·</span>
              <span className="text-[#4F544E] dark:text-[#D5CFC2]/85">{event.locationName}</span>
            </div>

            <h2
              id="event-modal-title"
              className="text-2xl md:text-3xl font-bold font-serif text-[#161B18] dark:text-[#F6F2E8]"
            >
              {event.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={lang === 'ar' ? 'إغلاق' : 'Close'}
            className="p-2 rounded-xl hover:bg-[#EFEAE0] dark:hover:bg-[#0F1A14] text-[#4F544E] dark:text-[#D5CFC2] transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Full Details */}
        <div className="space-y-5">
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-[#8B6514] dark:text-[#E2C15A] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">menu_book</span>
              <span>{lang === 'ar' ? 'التفاصيل التاريخية الموثقة' : 'Historical Details'}</span>
            </h3>
            <p className="text-sm md:text-base text-[#161B18] dark:text-[#F6F2E8] font-serif leading-loose">
              {event.details}
            </p>
          </div>

          {/* Outcome / Impact */}
          {event.outcomeOrImpact && (
            <div className="p-4 rounded-xl bg-[#EFEAE0]/70 dark:bg-[#0F1A14] border border-[#D4AF37]/35 space-y-1">
              <span className="text-xs font-bold text-[#0E5335] dark:text-[#E2C15A] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">stars</span>
                <span>{lang === 'ar' ? 'النتيجة والأثر التاريخي' : 'Outcome & Impact'}</span>
              </span>
              <p className="text-xs md:text-sm font-serif text-[#161B18] dark:text-[#F6F2E8] leading-relaxed">
                {event.outcomeOrImpact}
              </p>
            </div>
          )}

          {/* Quranic Verses */}
          {event.quranVerses && event.quranVerses.length > 0 && (
            <div className="p-5 rounded-xl bg-[#EFEAE0]/70 dark:bg-[#0F1A14] border border-[#D4AF37]/40 text-center space-y-2">
              <span className="text-xs font-bold text-[#0E5335] dark:text-[#E2C15A] block">
                {lang === 'ar' ? 'شواهد من القرآن الكريم' : 'Quranic Verses'}
              </span>
              {event.quranVerses.map((v, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="text-base md:text-lg font-serif text-[#161B18] dark:text-[#F6F2E8] leading-relaxed">
                    ﴿ {v.text} ﴾
                  </p>
                  <span className="text-[11px] text-[#8B6514] dark:text-[#E2C15A] font-sans block">
                    [سورة {v.surah} · الآية {v.number}]
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Hadiths */}
          {event.hadiths && event.hadiths.length > 0 && (
            <div className="p-4 rounded-xl bg-[#EFEAE0]/60 dark:bg-[#0F1A14] border border-[#D4AF37]/35 space-y-2">
              <span className="text-xs font-bold text-[#0E5335] dark:text-[#E2C15A] block">
                {lang === 'ar' ? 'الأحاديث والروايات الشريفة' : 'Prophetic Narrations'}
              </span>
              {event.hadiths.map((h, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="text-sm font-serif italic text-[#161B18] dark:text-[#F6F2E8] leading-relaxed">
                    "{h.text}"
                  </p>
                  <span className="text-[11px] text-[#8B6514] dark:text-[#E2C15A] block">
                    — {h.source}{h.number ? ` (${h.number})` : ''}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Lessons & Values */}
          {event.lessons && event.lessons.length > 0 && (
            <div className="p-5 rounded-xl bg-[#0E5335]/8 dark:bg-[#0F1A14] border border-[#0E5335]/25 dark:border-[#D4AF37]/35 space-y-2.5">
              <h3 className="text-xs md:text-sm font-bold text-[#0E5335] dark:text-[#E2C15A] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">lightbulb</span>
                <span>{lang === 'ar' ? 'الدروس والعبر المستفادة' : 'Lessons & Takeaways'}</span>
              </h3>
              <ul className="space-y-2 text-xs md:text-sm text-[#161B18] dark:text-[#F6F2E8] font-serif leading-relaxed">
                {event.lessons.map((ls, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#0E5335] dark:text-[#D4AF37] font-bold mt-0.5">•</span>
                    <span>{ls}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Companions Involved */}
          {event.companionsInvolved && event.companionsInvolved.length > 0 && (
            <div className="text-xs text-[#4F544E] dark:text-[#D5CFC2]/85">
              <span className="font-bold text-[#0E5335] dark:text-[#E2C15A]">
                {lang === 'ar' ? 'أبرز الشخصيات المشاركة: ' : 'Key Figures: '}
              </span>
              <span>{event.companionsInvolved.join(' · ')}</span>
            </div>
          )}

          {/* Sources */}
          <div className="text-xs text-[#4F544E] dark:text-[#D5CFC2]/85 pt-2 border-t border-[#DDD5C3] dark:border-[#253A2E]">
            <span className="font-bold text-[#8B6514] dark:text-[#E2C15A]">
              {lang === 'ar' ? 'المصادر الموثوقة: ' : 'Authenticated Sources: '}
            </span>
            <span>
              {event.sources
                .map((s) => (s.pageOrVolume ? `${s.name} (${s.pageOrVolume})` : s.name))
                .join(' · ')}
            </span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-[#DDD5C3] dark:border-[#253A2E] flex flex-wrap items-center justify-between gap-3">
          {onAddBookmark ? (
            <button
              type="button"
              onClick={handleBookmark}
              disabled={isBookmarked}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border ${
                isBookmarked
                  ? 'bg-[#EFEAE0] dark:bg-[#0F1A14] text-[#8B6514] dark:text-[#E2C15A] border-[#D4AF37]/40 cursor-default'
                  : 'bg-[#0E5335]/10 dark:bg-[#D4AF37]/15 text-[#0E5335] dark:text-[#E2C15A] border-[#0E5335]/25 dark:border-[#D4AF37]/35 hover:bg-[#0E5335] hover:text-white dark:hover:bg-[#D4AF37] dark:hover:text-[#0D1511]'
              }`}
            >
              <span className="material-symbols-outlined text-base">
                {isBookmarked ? 'bookmark_added' : 'bookmark_add'}
              </span>
              <span>
                {isBookmarked
                  ? lang === 'ar'
                    ? 'محفوظ في المفضلة'
                    : 'Bookmarked'
                  : lang === 'ar'
                    ? 'حفظ في المفضلة'
                    : 'Bookmark Event'}
              </span>
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#0E5335] hover:bg-[#0A3D27] text-white text-xs font-bold border border-[#D4AF37]/40 shadow-sm transition-colors"
          >
            {lang === 'ar' ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
