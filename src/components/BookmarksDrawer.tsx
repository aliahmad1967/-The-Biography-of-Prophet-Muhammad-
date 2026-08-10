import React from 'react';
import { BookmarkItem, PageType } from '../types';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: BookmarkItem[];
  onRemoveBookmark: (id: string) => void;
  onSelectPage: (page: PageType) => void;
  lang: 'ar' | 'en';
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarks,
  onRemoveBookmark,
  onSelectPage,
  lang
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1816]/70 backdrop-blur-xs flex justify-end">
      <div className="bg-white dark:bg-[#2D2926] w-full max-w-md h-full shadow-2xl p-6 flex flex-col justify-between text-right border-l border-[#E5E1D8] dark:border-[#3A3530] animate-in slide-in-from-left duration-200">
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between border-b border-[#E5E1D8] dark:border-[#3A3530] pb-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#8E6E37] text-2xl">bookmark</span>
              <h2 className="text-xl font-bold font-serif text-[#1A1816] dark:text-[#FDFBF7]">
                {lang === 'ar' ? 'المفضلة والملاحظات' : 'Saved Bookmarks'}
              </h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-[#FAF8F4] dark:hover:bg-[#1A1816] text-[#5D574F]">
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {/* Bookmarks List */}
          <div className="space-y-3 overflow-y-auto max-h-[70vh] pr-1">
            {bookmarks.length === 0 ? (
              <div className="p-12 text-center text-[#5D574F] dark:text-[#E5E1D8]/70 space-y-2">
                <span className="material-symbols-outlined text-4xl text-[#8E6E37]">bookmark_border</span>
                <p className="text-xs font-bold text-[#1A1816] dark:text-[#FDFBF7]">لا توجد عناصر محفوظة في المفضلة بعد.</p>
                <p className="text-[11px]">يمكنك إحفاظ الأحداث والفصول والدروس أثناء القراءة.</p>
              </div>
            ) : (
              bookmarks.map((bm) => (
                <div
                  key={bm.id}
                  className="p-4 rounded-xl bg-[#FAF8F4] dark:bg-[#1A1816] border border-[#E5E1D8] dark:border-[#3A3530] flex items-center justify-between gap-3 group"
                >
                  <div
                    onClick={() => {
                      onSelectPage(bm.pathPage);
                      onClose();
                    }}
                    className="cursor-pointer space-y-0.5 flex-1"
                  >
                    <span className="text-[10px] font-bold text-[#8E6E37] block">{bm.subtitle}</span>
                    <h4 className="font-bold font-serif text-sm text-[#1A1816] dark:text-[#FDFBF7] group-hover:text-[#8E6E37] transition-colors">
                      {bm.title}
                    </h4>
                    <span className="text-[10px] text-[#5D574F] dark:text-[#E5E1D8]/60 block">أضيفت في: {bm.addedAt}</span>
                  </div>

                  <button
                    onClick={() => onRemoveBookmark(bm.id)}
                    className="p-1.5 rounded-lg text-[#5D574F] hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#E5E1D8] dark:border-[#3A3530] text-center text-xs text-[#5D574F] dark:text-[#E5E1D8]/70">
          يتم حفظ مفضلتك تلقائياً في المتصفح LocalStorage
        </div>

      </div>
    </div>
  );
};
