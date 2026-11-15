import React from 'react';
import { MORAL_LESSONS } from '../data/seerahData';

interface LessonsViewProps {
  lang: 'ar' | 'en';
}

export const LessonsView: React.FC<LessonsViewProps> = ({ lang }) => {
  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="bg-[#FCFBF8] dark:bg-[#14211A] p-6 rounded-2xl border border-[#DDD5C3] dark:border-[#253A2E] shadow-sm text-right">
        <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#161B18] dark:text-[#F6F2E8]">
          {lang === 'ar' ? 'الدروس والعبر والقيم المستفادة' : 'Lessons & Values'}
        </h1>
        <p className="text-xs text-[#4F544E] dark:text-[#D5CFC2]/80 mt-1">
          {lang === 'ar' ? 'استخراج الهدايات التربوية والقيادية والأخلاقية من السيرة الشريفة لتطبيقها في الواقع المعاصر' : 'Moral, spiritual, and strategic principles extracted from Prophetic history'}
        </p>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MORAL_LESSONS.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-[#FCFBF8] dark:bg-[#14211A] p-6 rounded-2xl border border-[#DDD5C3] dark:border-[#253A2E] hover:border-[#0E5335] dark:hover:border-[#D4AF37] shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between text-right"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EFEAE0] dark:bg-[#0F1A14] text-[#0E5335] dark:text-[#E2C15A] border border-[#D4AF37]/40 flex items-center justify-center font-bold">
                <span className="material-symbols-outlined">lightbulb</span>
              </div>

              <h3 className="text-xl font-bold font-serif text-[#161B18] dark:text-[#F6F2E8]">
                {lesson.title}
              </h3>

              <p className="text-xs text-[#4F544E] dark:text-[#D5CFC2]/85 leading-relaxed">
                {lesson.summary}
              </p>

              <div className="p-3 rounded-xl bg-[#EFEAE0]/70 dark:bg-[#0F1A14] border border-[#DDD5C3] dark:border-[#253A2E] text-xs space-y-1">
                <span className="font-bold text-[#0E5335] dark:text-[#E2C15A] block">السياق في السيرة:</span>
                <p className="text-[#4F544E] dark:text-[#D5CFC2]/80">{lesson.storyContext}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-[#8B6514] dark:text-[#E2C15A] block">
                  التطبيقات العملية المعاصرة:
                </span>
                <ul className="list-disc list-inside text-xs text-[#161B18] dark:text-[#F6F2E8] space-y-1">
                  {lesson.practicalApplications.map((app, idx) => (
                    <li key={idx}>{app}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-[#DDD5C3] dark:border-[#253A2E] text-[11px] text-[#4F544E] dark:text-[#D5CFC2]/75">
              المصادر: {lesson.relatedSources.join('، ')}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
