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
    <div className="fixed inset-0 z-50 bg-[#0D1511]/80 backdrop-blur-xs flex justify-end">
      <div className="bg-[#FCFBF8] dark:bg-[#14211A] w-full max-w-md h-full shadow-2xl p-6 flex flex-col justify-between text-right border-l border-[#D4AF37]/40 animate-in slide-in-from-left duration-200">
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between border-b border-[#DDD5C3] dark:border-[#253A2E] pb-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0E5335] dark:text-[#E2C15A] text-2xl">bookmark</span>
              <h2 className="text-xl font-bold font-serif text-[#161B18] dark:text-[#F6F2E8]">
                {lang === 'ar' ? 'المفضلة والملاحظات' : 'Saved Bookmarks'}
              </h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-[#EFEAE0] dark:hover:bg-[#0F1A14] text-[#4F544E] dark:text-[#D5CFC2]">
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {/* Bookmarks List */}
          <div className="space-y-3 overflow-y-auto max-h-[70vh] pr-1">
            {bookmarks.length === 0 ? (
              <div className="p-12 text-center text-[#4F544E] dark:text-[#D5CFC2]/80 space-y-2">
                <span className="material-symbols-outlined text-4xl text-[#0E5335] dark:text-[#E2C15A]">bookmark_border</span>
                <p className="text-xs font-bold text-[#161B18] dark:text-[#F6F2E8]">لا توجد عناصر محفوظة في المفضلة بعد.</p>
                <p className="text-[11px]">يمكنك حفظ الأحداث والفصول والدروس أثناء القراءة.</p>
              </div>
            ) : (
              bookmarks.map((bm) => (
                <div
                  key={bm.id}
                  className="p-4 rounded-xl bg-[#EFEAE0]/70 dark:bg-[#0F1A14] border border-[#DDD5C3] dark:border-[#253A2E] flex items-center justify-between gap-3 group"
                >
                  <div
                    onClick={() => {
                      onSelectPage(bm.pathPage);
                      onClose();
                    }}
                    className="cursor-pointer space-y-0.5 flex-1"
                  >
                    <span className="text-[10px] font-bold text-[#8B6514] dark:text-[#E2C15A] block">{bm.subtitle}</span>
                    <h4 className="font-bold font-serif text-sm text-[#161B18] dark:text-[#F6F2E8] group-hover:text-[#0E5335] dark:group-hover:text-[#E2C15A] transition-colors">
                      {bm.title}
                    </h4>
                    <span className="text-[10px] text-[#4F544E] dark:text-[#D5CFC2]/65 block">أضيفت في: {bm.addedAt}</span>
                  </div>

                  <button
                    onClick={() => onRemoveBookmark(bm.id)}
                    className="p-1.5 rounded-lg text-[#4F544E] hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#DDD5C3] dark:border-[#253A2E] text-center text-xs text-[#4F544E] dark:text-[#D5CFC2]/75">
          يتم حفظ مفضلتك تلقائياً في المتصفح LocalStorage
        </div>

      </div>
    </div>
  );
};
