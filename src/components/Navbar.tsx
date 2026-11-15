import React, { useState } from 'react';
import { PageType, BookmarkItem } from '../types';

interface NavbarProps {
  currentPage: PageType;
  onSelectPage: (page: PageType) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  lang: 'ar' | 'en';
  onToggleLang: () => void;
  readingMode: boolean;
  onToggleReadingMode: () => void;
  bookmarks: BookmarkItem[];
  onOpenBookmarks: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onSelectPage,
  darkMode,
  onToggleDarkMode,
  lang,
  onToggleLang,
  readingMode,
  onToggleReadingMode,
  bookmarks,
  onOpenBookmarks
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageType; labelAr: string; labelEn: string; icon: string }[] = [
    { id: 'home', labelAr: 'الرئيسية', labelEn: 'Home', icon: 'home' },
    { id: 'seerah', labelAr: 'السيرة النبوية', labelEn: 'Biography', icon: 'auto_stories' },
    { id: 'farewell_article', labelAr: 'الرحلة الأخيرة', labelEn: 'Farewell Journey', icon: 'history_edu' },
    { id: 'timeline', labelAr: 'الخط الزمني', labelEn: 'Timeline', icon: 'timeline' },
    { id: 'events', labelAr: 'الأحداث والغزوات', labelEn: 'Events', icon: 'swords' },
    { id: 'characters', labelAr: 'الشخصيات', labelEn: 'Companions', icon: 'group' },
    { id: 'maps', labelAr: 'الأماكن والخرائط', labelEn: 'Maps', icon: 'map' },
    { id: 'quran_hadith', labelAr: 'القرآن والأحاديث', labelEn: 'Quran & Hadith', icon: 'menu_book' },
    { id: 'lessons', labelAr: 'الدروس والعبر', labelEn: 'Lessons', icon: 'lightbulb' },
    { id: 'sources', labelAr: 'المصادر', labelEn: 'Sources', icon: 'library_books' },
    { id: 'search', labelAr: 'البحث', labelEn: 'Search', icon: 'search' },
    { id: 'ai_rag', labelAr: 'اسأل عن السيرة', labelEn: 'Ask AI', icon: 'smart_toy' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F6F2E8]/95 dark:bg-[#0D1511]/95 backdrop-blur-md border-b border-[#DDD5C3] dark:border-[#253A2E] shadow-xs transition-all">
      {/* Decorative Architectural Top Border (Rawdah Emerald, Royal Gold & Mihrab Lapis) */}
      <div className="h-2 w-full bg-gradient-to-l from-[#0E5335] via-[#D4AF37] to-[#1B3B68]" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between flex-row-reverse">
        
        {/* Brand / Logo */}
        <button 
          onClick={() => onSelectPage('home')} 
          className="flex items-center gap-3.5 text-right group focus:outline-none"
        >
          <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] bg-[#0E5335] text-[#F6F2E8] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
            <span className="text-2xl font-serif leading-none text-[#E2C15A]">ﷺ</span>
          </div>
          <div>
            <span className="font-bold text-xl md:text-2xl text-[#161B18] dark:text-[#F6F2E8] tracking-tight font-serif block">
              {lang === 'ar' ? 'بوابة السيرة النبوية' : 'Prophetic Seerah'}
            </span>
            <span className="text-[10px] text-[#0E5335] dark:text-[#E2C15A] font-semibold uppercase tracking-[0.2em] block">
              {lang === 'ar' ? 'الموسوعة المعرفية الشاملة' : 'Authentic Knowledge Portal'}
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-2 xl:gap-4 flex-row-reverse text-xs xl:text-sm font-semibold">
          {navLinks.slice(0, 10).map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onSelectPage(link.id)}
                className={`py-1 transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#0E5335] dark:text-[#E2C15A] border-b-2 border-[#0E5335] dark:border-[#E2C15A] font-bold'
                    : 'text-[#161B18] dark:text-[#D5CFC2] hover:text-[#0E5335] dark:hover:text-[#E2C15A]'
                }`}
              >
                {lang === 'ar' ? link.labelAr : link.labelEn}
              </button>
            );
          })}
          
          {/* AI RAG Button */}
          <button
            onClick={() => onSelectPage('ai_rag')}
            className={`px-4 py-2 rounded text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 border whitespace-nowrap shrink-0 ${
              currentPage === 'ai_rag'
                ? 'bg-[#0A3D27] text-[#F6F2E8] border-[#D4AF37]'
                : 'bg-[#0E5335] text-[#F6F2E8] border-[#D4AF37]/60 hover:bg-[#0A3D27]'
            }`}
          >
            <span className="material-symbols-outlined text-sm text-[#E2C15A]" style={{ fontVariationSettings: "'FILL' 1" }}>
              smart_toy
            </span>
            <span>{lang === 'ar' ? 'اسأل الذكاء الاصطناعي' : 'Ask AI'}</span>
          </button>
        </nav>

        {/* Actions Controls */}
        <div className="flex items-center gap-2">
          {/* Search Trigger */}
          <button
            onClick={() => onSelectPage('search')}
            title={lang === 'ar' ? 'البحث' : 'Search'}
            className="p-2 border border-[#DDD5C3] dark:border-[#253A2E] rounded hover:bg-[#EFEAE0] dark:hover:bg-[#14211A] text-[#4F544E] dark:text-[#D5CFC2] transition-colors"
          >
            <span className="material-symbols-outlined text-xl">search</span>
          </button>

          {/* Reading Mode Button */}
          <button
            onClick={onToggleReadingMode}
            title={lang === 'ar' ? 'وضع القراءة' : 'Reading Mode'}
            className={`p-2 border border-[#DDD5C3] dark:border-[#253A2E] rounded transition-colors ${
              readingMode
                ? 'bg-[#0E5335] text-white border-[#D4AF37]/50'
                : 'text-[#4F544E] dark:text-[#D5CFC2] hover:bg-[#EFEAE0] dark:hover:bg-[#14211A]'
            }`}
          >
            <span className="material-symbols-outlined text-xl">
              {readingMode ? 'menu_book' : 'book'}
            </span>
          </button>

          {/* Bookmarks Trigger */}
          <button
            onClick={onOpenBookmarks}
            title={lang === 'ar' ? 'المفضلة' : 'Bookmarks'}
            className="p-2 border border-[#DDD5C3] dark:border-[#253A2E] rounded text-[#4F544E] dark:text-[#D5CFC2] hover:bg-[#EFEAE0] dark:hover:bg-[#14211A] relative transition-colors"
          >
            <span className="material-symbols-outlined text-xl">bookmark</span>
            {bookmarks.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#0E5335] text-[#E2C15A] border border-[#D4AF37] text-[10px] font-bold rounded-full flex items-center justify-center">
                {bookmarks.length}
              </span>
            )}
          </button>

          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            className="px-3 py-1.5 border border-[#DDD5C3] dark:border-[#253A2E] rounded text-xs font-bold text-[#161B18] dark:text-[#F6F2E8] hover:bg-[#EFEAE0] dark:hover:bg-[#14211A] transition-colors"
          >
            {lang === 'ar' ? 'English' : 'عربي'}
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleDarkMode}
            title={darkMode ? (lang === 'ar' ? 'التحويل إلى الوضع النهاري' : 'Switch to Light Mode') : (lang === 'ar' ? 'التحويل إلى الوضع الليلي' : 'Switch to Dark Mode')}
            aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 border border-[#DDD5C3] dark:border-[#253A2E] rounded text-[#4F544E] dark:text-[#D5CFC2] hover:bg-[#EFEAE0] dark:hover:bg-[#14211A] transition-colors flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-xl">
              {darkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 border border-[#DDD5C3] dark:border-[#253A2E] rounded text-[#0E5335] dark:text-[#E2C15A]"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#DDD5C3] dark:border-[#253A2E] bg-[#F6F2E8] dark:bg-[#0D1511] px-6 py-4 flex flex-col gap-2">
          
          {/* Quick Controls in Mobile Menu */}
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#DDD5C3] dark:border-[#253A2E]">
            <span className="text-xs font-bold text-[#0E5335] dark:text-[#E2C15A]">
              {lang === 'ar' ? 'إعدادات العرض' : 'Display Controls'}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={onToggleDarkMode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DDD5C3] dark:border-[#253A2E] text-xs font-bold text-[#161B18] dark:text-[#F6F2E8] bg-[#EFEAE0] dark:bg-[#14211A]"
              >
                <span className="material-symbols-outlined text-sm">{darkMode ? 'light_mode' : 'dark_mode'}</span>
                <span>{darkMode ? (lang === 'ar' ? 'نهار' : 'Light') : (lang === 'ar' ? 'ليل' : 'Dark')}</span>
              </button>
              
              <button
                onClick={onToggleLang}
                className="px-3 py-1.5 rounded-lg border border-[#DDD5C3] dark:border-[#253A2E] text-xs font-bold text-[#161B18] dark:text-[#F6F2E8] bg-[#EFEAE0] dark:bg-[#14211A]"
              >
                {lang === 'ar' ? 'English' : 'عربي'}
              </button>
            </div>
          </div>

          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onSelectPage(link.id);
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-right text-base font-medium transition-all ${
                currentPage === link.id
                  ? 'bg-[#0E5335] text-white font-bold border border-[#D4AF37]/40'
                  : 'text-[#161B18] dark:text-[#F6F2E8] hover:bg-[#EFEAE0] dark:hover:bg-[#14211A]'
              }`}
            >
              <span className="material-symbols-outlined text-xl">{link.icon}</span>
              <span>{lang === 'ar' ? link.labelAr : link.labelEn}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
