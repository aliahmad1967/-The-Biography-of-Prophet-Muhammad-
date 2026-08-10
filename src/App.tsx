import React, { useState, useEffect } from 'react';
import { PageType, BookmarkItem, SeerahEvent } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { SeerahView } from './components/SeerahView';
import { TimelineView } from './components/TimelineView';
import { EventsView } from './components/EventsView';
import { CharactersView } from './components/CharactersView';
import { MapsView } from './components/MapsView';
import { QuranHadithView } from './components/QuranHadithView';
import { LessonsView } from './components/LessonsView';
import { SourcesView } from './components/SourcesView';
import { FarewellArticleView } from './components/FarewellArticleView';
import { SearchView } from './components/SearchView';
import { AiRagView } from './components/AiRagView';
import { BookmarksDrawer } from './components/BookmarksDrawer';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('seerah_dark_mode');
      if (saved !== null) {
        return JSON.parse(saved);
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [readingMode, setReadingMode] = useState<boolean>(false);
  const [bookmarksDrawerOpen, setBookmarksDrawerOpen] = useState<boolean>(false);
  
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() => {
    try {
      const saved = localStorage.getItem('seerah_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [_selectedEventForModal, setSelectedEventForModal] = useState<SeerahEvent | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('seerah_bookmarks', JSON.stringify(bookmarks));
    } catch {
      // Ignore quota errors
    }
  }, [bookmarks]);

  useEffect(() => {
    try {
      localStorage.setItem('seerah_dark_mode', JSON.stringify(darkMode));
    } catch {
      // Ignore quota errors
    }

    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const handleToggleDarkMode = () => setDarkMode(!darkMode);
  const handleToggleLang = () => setLang(lang === 'ar' ? 'en' : 'ar');
  const handleToggleReadingMode = () => setReadingMode(!readingMode);

  const handleAddBookmark = (item: BookmarkItem) => {
    if (!bookmarks.some(b => b.id === item.id)) {
      setBookmarks(prev => [item, ...prev]);
    }
  };

  const handleRemoveBookmark = (id: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  };

  const handleSelectEvent = (event: SeerahEvent) => {
    setSelectedEventForModal(event);
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between ${readingMode ? 'bg-[#F4EFE6] dark:bg-[#0F1213]' : ''}`}>
      
      {/* Texture Background Overlay */}
      <div className="fixed inset-0 texture-overlay z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        {/* Top Navbar */}
        <Navbar
          currentPage={currentPage}
          onSelectPage={setCurrentPage}
          darkMode={darkMode}
          onToggleDarkMode={handleToggleDarkMode}
          lang={lang}
          onToggleLang={handleToggleLang}
          readingMode={readingMode}
          onToggleReadingMode={handleToggleReadingMode}
          bookmarks={bookmarks}
          onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
        />

        {/* Main Content Area */}
        <main className={`flex-1 max-w-[1280px] w-full mx-auto px-4 md:px-8 pt-8 ${readingMode ? 'max-w-4xl' : ''}`}>
          {currentPage === 'home' && (
            <HomeView
              onSelectPage={setCurrentPage}
              onSelectEvent={handleSelectEvent}
              lang={lang}
            />
          )}

          {currentPage === 'seerah' && (
            <SeerahView
              readingMode={readingMode}
              onAddBookmark={handleAddBookmark}
              onSelectPage={setCurrentPage}
              lang={lang}
            />
          )}

          {currentPage === 'farewell_article' && (
            <FarewellArticleView
              onAddBookmark={handleAddBookmark}
              onSelectPage={setCurrentPage}
              lang={lang}
            />
          )}

          {currentPage === 'timeline' && (
            <TimelineView
              onSelectEvent={handleSelectEvent}
              lang={lang}
            />
          )}

          {currentPage === 'events' && (
            <EventsView
              onSelectEvent={handleSelectEvent}
              lang={lang}
            />
          )}

          {currentPage === 'characters' && (
            <CharactersView
              lang={lang}
            />
          )}

          {currentPage === 'maps' && (
            <MapsView
              lang={lang}
            />
          )}

          {currentPage === 'quran_hadith' && (
            <QuranHadithView
              lang={lang}
            />
          )}

          {currentPage === 'lessons' && (
            <LessonsView
              lang={lang}
            />
          )}

          {currentPage === 'sources' && (
            <SourcesView
              lang={lang}
            />
          )}

          {currentPage === 'search' && (
            <SearchView
              onSelectEvent={handleSelectEvent}
              lang={lang}
            />
          )}

          {currentPage === 'ai_rag' && (
            <AiRagView
              readingMode={readingMode}
              onToggleReadingMode={handleToggleReadingMode}
              lang={lang}
            />
          )}
        </main>

        {/* Footer */}
        <Footer
          onSelectPage={setCurrentPage}
          lang={lang}
        />
      </div>

      {/* Bookmarks Side Drawer */}
      <BookmarksDrawer
        isOpen={bookmarksDrawerOpen}
        onClose={() => setBookmarksDrawerOpen(false)}
        bookmarks={bookmarks}
        onRemoveBookmark={handleRemoveBookmark}
        onSelectPage={setCurrentPage}
        lang={lang}
      />

    </div>
  );
}

export default App;
