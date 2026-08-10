import React from 'react';
import { MORAL_LESSONS } from '../data/seerahData';

interface LessonsViewProps {
  lang: 'ar' | 'en';
}

export const LessonsView: React.FC<LessonsViewProps> = ({ lang }) => {
  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#2D2926] p-6 rounded-2xl border border-[#E5E1D8] dark:border-[#3A3530] shadow-sm text-right">
        <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#1A1816] dark:text-[#FDFBF7]">
          {lang === 'ar' ? 'الدروس والعبر والقيم المستفادة' : 'Lessons & Values'}
        </h1>
        <p className="text-xs text-[#5D574F] dark:text-[#E5E1D8]/70 mt-1">
          {lang === 'ar' ? 'استخراج الهدايات التربوية والقيادية والأخلاقية من السيرة الشريفة لتطبيقها في الواقع المعاصر' : 'Moral, spiritual, and strategic principles extracted from Prophetic history'}
        </p>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MORAL_LESSONS.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-white dark:bg-[#2D2926] p-6 rounded-2xl border border-[#E5E1D8] dark:border-[#3A3530] hover:border-[#8E6E37] shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between text-right"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF8F4] dark:bg-[#1A1816] text-[#8E6E37] dark:text-[#C5A059] border border-[#E5E1D8] dark:border-[#3A3530] flex items-center justify-center font-bold">
                <span className="material-symbols-outlined">lightbulb</span>
              </div>

              <h3 className="text-xl font-bold font-serif text-[#1A1816] dark:text-[#FDFBF7]">
                {lesson.title}
              </h3>

              <p className="text-xs text-[#5D574F] dark:text-[#E5E1D8]/80 leading-relaxed">
                {lesson.summary}
              </p>

              <div className="p-3 rounded-xl bg-[#FAF8F4] dark:bg-[#1A1816] border border-[#E5E1D8] dark:border-[#3A3530] text-xs space-y-1">
                <span className="font-bold text-[#8E6E37] dark:text-[#C5A059] block">السياق في السيرة:</span>
                <p className="text-[#5D574F] dark:text-[#E5E1D8]/70">{lesson.storyContext}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-[#8E6E37] dark:text-[#C5A059] block">
                  التطبيقات العملية المعاصرة:
                </span>
                <ul className="list-disc list-inside text-xs text-[#1A1816] dark:text-[#FDFBF7] space-y-1">
                  {lesson.practicalApplications.map((app, idx) => (
                    <li key={idx}>{app}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5E1D8] dark:border-[#3A3530] text-[11px] text-[#5D574F] dark:text-[#E5E1D8]/70">
              المصادر: {lesson.relatedSources.join('، ')}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
