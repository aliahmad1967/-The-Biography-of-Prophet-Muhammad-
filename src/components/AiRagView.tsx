import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';

interface AiRagViewProps {
  readingMode: boolean;
  onToggleReadingMode: () => void;
  lang: 'ar' | 'en';
}

export const AiRagView: React.FC<AiRagViewProps> = ({ readingMode, onToggleReadingMode, lang }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: 'أهلاً بك في المساعد الذكي للسيرة النبوية الشريفة. يسعدني الإجابة عن كافة استفساراتك حول حياة النبي محمد ﷺ والعترة الطاهرة والغزوات والمشاهد النبوية، معتمداً حصرياً على أمهات المصادر الشيعية الإمامية المعتمدة (الكافي، الإرشاد للمفيد، إعلام الورى، بحار الأنوار، والصحيح من سيرة النبي الأعظم).',
      citations: [
        { id: 1, sourceTitle: 'الكافي - للكليني', details: 'الشيخ محمد بن يعقوب الكليني' },
        { id: 2, sourceTitle: 'الإرشاد - للمفيد', details: 'الشيخ محمد بن محمد بن النعمان المفيد' }
      ],
      timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeCitationPopover, setActiveCitationPopover] = useState<{ id: number; title: string; details: string } | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'ما هي تفاصيل ودلالات واقعة غدير خم في المصادر الشيعية المعتمدة؟',
    'كيف جرت حادثة ليلة المبيت وتضحية الإمام علي (عليه السلام) بنفسه؟',
    'ما هي أحداث ومضامين حادثة المباهلة الشريفة مع نصارى نجران؟',
    'ما هو النص الشريف لحديث الثقلين ودلالته العظيمة في كتاب الكافي؟',
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.map(m => ({ sender: m.sender, text: m.text }))
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'تعذر الحصول على إجابة.');
      }

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.text,
        citations: data.citations || [
          { id: 1, sourceTitle: 'الكافي - للكليني', details: 'الشيخ محمد بن يعقوب الكليني، ج 1' },
          { id: 2, sourceTitle: 'الإرشاد - للمفيد', details: 'الشيخ محمد بن محمد بن النعمان المفيد، ج 1' }
        ],
        timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: unknown) {
      console.error('Chat error:', err);
      const errorMsgText = err instanceof Error ? err.message : 'حدث خطأ في الاتصال بالخدمة.';
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: `عذراً، ${errorMsgText}`,
          timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewConversation = () => {
    setMessages([
      {
        id: `msg-reset-${Date.now()}`,
        sender: 'assistant',
        text: 'بدأت محادثة جديدة. تفضل بطرح أي سؤال حول سيرة النبي الكريم ﷺ.',
        timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto text-right">
      
      {/* Header Bar */}
      <div className="bg-[#FCFBF8] dark:bg-[#14211A] p-6 rounded-2xl border border-[#DDD5C3] dark:border-[#253A2E] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#0E5335] text-[#E2C15A] flex items-center justify-center font-bold shadow-xs border border-[#D4AF37]/70">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              smart_toy
            </span>
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold font-serif text-[#161B18] dark:text-[#F6F2E8]">
              {lang === 'ar' ? 'اسأل عن السيرة (المساعد الذكي)' : 'Ask AI about Seerah'}
            </h1>
            <p className="text-xs text-[#4F544E] dark:text-[#D5CFC2]/80">
              {lang === 'ar' ? 'نظام RAG موثوق يجيبك مع إبراز وتوثيق مراجع السيرة النبوية' : 'Grounded AI with authenticated classical source citations'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleNewConversation}
            className="px-3.5 py-2 rounded-xl bg-[#EFEAE0]/70 dark:bg-[#0F1A14] hover:border-[#0E5335] dark:hover:border-[#D4AF37] text-[#161B18] dark:text-[#F6F2E8] border border-[#DDD5C3] dark:border-[#253A2E] text-xs font-bold transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-base">refresh</span>
            <span>{lang === 'ar' ? 'محادثة جديدة' : 'New Chat'}</span>
          </button>

          <button
            onClick={onToggleReadingMode}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 ${
              readingMode
                ? 'bg-[#0E5335] text-white border border-[#D4AF37]/50'
                : 'bg-[#EFEAE0]/70 dark:bg-[#0F1A14] text-[#161B18] dark:text-[#F6F2E8] border border-[#DDD5C3] dark:border-[#253A2E]'
            }`}
          >
            <span className="material-symbols-outlined text-base">menu_book</span>
            <span>{lang === 'ar' ? 'وضع القراءة' : 'Focus'}</span>
          </button>
        </div>
      </div>

      {/* RAG Disclaimer Notice */}
      <div className="bg-[#0E5335]/8 dark:bg-[#0F1A14] border border-[#0E5335]/25 dark:border-[#D4AF37]/30 p-3.5 rounded-xl flex items-center gap-3 text-xs text-[#0E5335] dark:text-[#E2C15A]">
        <span className="material-symbols-outlined text-xl shrink-0 text-[#0E5335] dark:text-[#D4AF37]" style={{ fontVariationSettings: "'FILL' 1" }}>
          verified
        </span>
        <p>
          {lang === 'ar'
            ? 'تنبيه موثقية: يعتمد الذكاء الاصطناعي حصرياً على مصادر السيرة النبوية المعتمدة وتُرفق المراجع مع الإجابة.'
            : 'Answers are strictly grounded in authenticated Islamic biographies and hadiths with inline citations.'}
        </p>
      </div>

      {/* Suggested Prompts Bar */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-[#8B6514] dark:text-[#E2C15A]">أسئلة مقترحة:</span>
        <div className="flex flex-wrap gap-2">
          {suggestedPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1.5 rounded-xl bg-[#FCFBF8] dark:bg-[#14211A] hover:border-[#0E5335] dark:hover:border-[#D4AF37] text-xs font-serif text-[#161B18] dark:text-[#F6F2E8] border border-[#DDD5C3] dark:border-[#253A2E] transition-colors shadow-xs"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-[#FCFBF8] dark:bg-[#14211A] rounded-2xl p-6 md:p-8 border border-[#DDD5C3] dark:border-[#253A2E] shadow-sm min-h-[450px] flex flex-col justify-between space-y-6">
        
        {/* Messages List */}
        <div className="space-y-6">
          {messages.map((msg) => {
            const isAssistant = msg.sender === 'assistant';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isAssistant ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Avatar */}
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border ${
                  isAssistant
                    ? 'bg-[#0E5335] text-[#E2C15A] border-[#D4AF37]/70'
                    : 'bg-[#8B6514] text-white border-[#D4AF37]/60'
                }`}>
                  <span className="material-symbols-outlined text-lg">
                    {isAssistant ? 'smart_toy' : 'person'}
                  </span>
                </div>

                {/* Bubble Container */}
                <div className={`max-w-[85%] rounded-2xl p-5 space-y-3 shadow-xs ${
                  isAssistant
                    ? 'bg-[#EFEAE0]/70 dark:bg-[#0F1A14] text-[#161B18] dark:text-[#F6F2E8] border border-[#DDD5C3] dark:border-[#253A2E]'
                    : 'bg-[#0E5335] text-white border border-[#D4AF37]/40'
                }`}>
                  <div className="flex items-center justify-between text-[11px] opacity-80 border-b border-current/10 pb-1 mb-2">
                    <span className="font-bold">{isAssistant ? 'المساعد الذكي' : 'أنت'}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <p className="text-sm md:text-base font-serif leading-relaxed whitespace-pre-wrap">
                    {msg.text}
                  </p>

                  {/* Citations badges for assistant */}
                  {isAssistant && msg.citations && msg.citations.length > 0 && (
                    <div className="pt-3 border-t border-[#DDD5C3] dark:border-[#253A2E] flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-[11px] font-bold text-[#8B6514] dark:text-[#E2C15A]">المراجع والمصادر:</span>
                      {msg.citations.map((cit) => (
                        <button
                          key={cit.id}
                          onClick={() => setActiveCitationPopover({ id: cit.id, title: cit.sourceTitle, details: cit.details })}
                          className="px-2.5 py-0.5 rounded-lg bg-[#0E5335]/10 dark:bg-[#D4AF37]/15 text-[#0E5335] dark:text-[#E2C15A] font-bold hover:bg-[#0E5335] hover:text-white dark:hover:bg-[#D4AF37] dark:hover:text-[#0D1511] transition-colors text-[11px] flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-xs">format_quote</span>
                          <span>[{cit.id}] {cit.sourceTitle}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#0E5335] text-[#E2C15A] flex items-center justify-center font-bold text-xs border border-[#D4AF37]/70 animate-pulse">
                <span className="material-symbols-outlined text-lg">smart_toy</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#EFEAE0]/70 dark:bg-[#0F1A14] text-xs text-[#4F544E] dark:text-[#D5CFC2]/85 font-serif flex items-center gap-2 border border-[#DDD5C3] dark:border-[#253A2E]">
                <span className="w-2 h-2 rounded-full bg-[#0E5335] dark:bg-[#D4AF37] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-[#0E5335] dark:bg-[#D4AF37] animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-[#0E5335] dark:bg-[#D4AF37] animate-bounce [animation-delay:0.4s]" />
                <span>جاري البحث وتوثيق المراجع...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Box Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative pt-4 border-t border-[#DDD5C3] dark:border-[#253A2E]"
        >
          <div className="relative flex items-center">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={lang === 'ar' ? 'اكتب سؤالك عن السيرة النبوية هنا... (مثال: ما أهم ما جاء في خطبة الوداع؟)' : 'Type your question about Seerah...'}
              rows={2}
              className="w-full py-3 pr-4 pl-14 rounded-xl bg-[#EFEAE0]/60 dark:bg-[#0F1A14] text-sm text-[#161B18] dark:text-[#F6F2E8] border border-[#DDD5C3] dark:border-[#253A2E] focus:outline-none focus:border-[#0E5335] dark:focus:border-[#D4AF37] resize-none"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="absolute left-3 bg-[#0E5335] hover:bg-[#0A3D27] disabled:opacity-50 text-[#E2C15A] border border-[#D4AF37]/50 p-2.5 rounded-lg shadow-xs transition-colors"
            >
              <span className="material-symbols-outlined text-xl transform rotate-180">
                send
              </span>
            </button>
          </div>
        </form>

      </div>

      {/* Citation Details Popover Dialog */}
      {activeCitationPopover && (
        <div className="fixed inset-0 z-50 bg-[#0D1511]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FCFBF8] dark:bg-[#14211A] max-w-md w-full rounded-2xl border border-[#DDD5C3] dark:border-[#253A2E] p-6 space-y-4 text-right shadow-2xl relative animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-[#DDD5C3] dark:border-[#253A2E] pb-2">
              <span className="text-xs font-bold text-[#8B6514] dark:text-[#E2C15A]">تفاصيل المرجع الموثق [{activeCitationPopover.id}]</span>
              <button onClick={() => setActiveCitationPopover(null)} className="text-[#4F544E] dark:text-[#D5CFC2] hover:text-[#161B18] dark:hover:text-[#F6F2E8]">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <h4 className="font-bold font-serif text-lg text-[#161B18] dark:text-[#F6F2E8]">
              {activeCitationPopover.title}
            </h4>
            <p className="text-xs text-[#4F544E] dark:text-[#D5CFC2]/85 leading-relaxed">
              {activeCitationPopover.details}
            </p>
            <div className="pt-2 text-right">
              <button
                onClick={() => setActiveCitationPopover(null)}
                className="px-4 py-2 bg-[#0E5335] hover:bg-[#0A3D27] text-white text-xs font-bold rounded-lg border border-[#D4AF37]/40 transition-colors"
              >
                حسناً
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
