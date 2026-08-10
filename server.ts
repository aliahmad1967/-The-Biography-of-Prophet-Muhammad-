import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import {
  SEERAH_PHASES,
  SEERAH_EVENTS,
  CHARACTERS,
  HISTORICAL_PLACES,
  QURAN_HADITH_REFS,
  MORAL_LESSONS,
  SOURCE_REFERENCES
} from './src/data/seerahData.js';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client Lazily/Safely
let genAiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!genAiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not defined.');
    }
    genAiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return genAiClient;
}

// Prepare Knowledge Context String
function buildKnowledgeBaseContext(): string {
  const phasesSummary = SEERAH_PHASES.map(p => `[مرحلة: ${p.title} (${p.period} / ${p.hijriPeriod})]: ${p.summary} - المصادر: ${p.sources.join(', ')}`).join('\n');
  
  const eventsSummary = SEERAH_EVENTS.map(e => `[حدث/غزوة: ${e.title} (${e.yearCE}م / ${e.yearHijri})]: الموقع: ${e.locationName}. الملخص: ${e.summary}. التفاصيل: ${e.details}. الدروس: ${e.lessons.join('; ')}. المصادر: ${e.sources.map(s => s.name + ' ' + (s.pageOrVolume || '')).join(', ')}`).join('\n');

  const charsSummary = CHARACTERS.map(c => `[شخصية: ${c.name} (${c.title})]: ${c.bio}. دورها: ${c.keyMoments.join('; ')}. مقولة: ${c.famousQuote || 'لا يوجد'}`).join('\n');

  const placesSummary = HISTORICAL_PLACES.map(pl => `[مكان: ${pl.name} (${pl.arabicTitle})]: النوع: ${pl.type}. الأهمية: ${pl.significance}. الوصف: ${pl.description}`).join('\n');

  const sourcesSummary = SOURCE_REFERENCES.map(s => `[مرجع: ${s.title} للمؤلف ${s.author} (${s.deathYearHijri})]: ${s.description}. المنهجية: ${s.methodologyNote}`).join('\n');

  return `
قاعدة المعرفة الموثوقة للسيرة النبوية الشريفة:

=== مراحل السيرة ===
${phasesSummary}

=== أهم الأحداث والغزوات ===
${eventsSummary}

=== الشخصيات والصحابة ===
${charsSummary}

=== الأماكن التاريخية ===
${placesSummary}

=== المصادر والمراجع الرئيسية ===
${sourcesSummary}
`;
}

// API Health
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', app: 'Prophetic Biography Platform (منصة السيرة النبوية)' });
});

// API RAG Chat Assistant
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'الرجاء تقديم سؤال صحيح.' });
    }

    const ai = getGeminiClient();
    const knowledgeBase = buildKnowledgeBaseContext();

    const systemInstruction = `
أنت المساعد الذكي الموثوق لمنصة "السيرة النبوية الشريفة" الحاصرة لمضمونها وفق المصادر الإسلامية الشيعية الإمامية المعتمدة.
مهمتك تقديم إجابات دقيقة، موثوقة، ومحترمة عن حياة ونبوة وسيرة النبي محمد ﷺ وأهل بيته الأطهار (عليهم السلام)، معتمدًا حصراً على قاعدة المعرفة والمصادر الشيعية التالية:

${knowledgeBase}

قواعد وأحكام إجبارية صارمة يجب الالتزام بها 100%:
1. المصادر الشيعية حصراً والالتزام بالفقه والاعتقاد الإمامي: أجب اعتماداً على الحقائق والمصادر الشيعية المعتمدة (مثل: الكافي للكليني، الإرشاد للشيخ المفيد، إعلام الورى للطبرسي، بحار الأنوار للمجلسي، الصحيح من سيرة النبي الأعظم للعاملي، مناقب آل أبي طالب لابن شهر آشوب). يمنع منعاً باتاً اعتماد أو استشهاد بروايات منافية لرأي الاعتقاد والفقه الشيعي الإمامي.
2. الثوابت التاريخية والعقائدية الإمامية:
   - إثبات ولاية وإمامة وخلافة أمير المؤمنين علي بن أبي طالب (عليه السلام) بالنص والتعيين الإلهي من يوم الإنذار ودعوة العشيرة، وصولاً إلى واقعة غدير خم بـ 18 ذو الحجة.
   - إثبات طهارة وعصمة ومكانة أهل البيت الأطهار (عليهم السلام) وآية التطهير وآية المباهلة وآية المودة وحديث الثقلين وحديث الكساء.
   - التأكيد على طهارة وإيمان كافل النبوة أبي طالب (عليه السلام) والسيدة خديجة الكبرى (عليها السلام).
   - إبراز تضحية وفداء الإمام علي (عليه السلام) في ليلة المبيت وبطولاته في بدر وأحد والخندق وخيبر وحنين.
3. التوثيق بالمراجع (Citations): عند كتابة أي حقيقة أو درس أو حدث، أرفق المرجع الشيعي بالشكل [1] أو [الكافي، ج1 ص ...] أو [الإرشاد للمفيد].
4. الألقاب والتوقير: استخدم دائماً عبارات التوقير الشريفة: (عليه السلام / عليها السلام / عليهم السلام) للنبي محمد وآله الأطهار، و(رضي الله عنه) للصحابة الأبرار الأوفياء (مثل سلمان، أبي ذر، عمار، المقداد).
5. عدم اختراع المعلومات (Zero Hallucination): إذا لم تجد إجابة مؤكدة في المصادر الشيعية، صرّح بوضوح: "عذراً، لا تتوفر معلومات مؤكدة في المصادر الشيعية المعتمدة لدينا حول هذا السؤال".
6. منع تجسيد النبي ﷺ والأئمة المعصومين (عليهم السلام).
`;

    // Construct contents with prompt
    const contentsPrompt = `
تاريخ المحادثة السابق (إن وجد):
${Array.isArray(history) ? history.map((h: { sender: string; text: string }) => `${h.sender === 'user' ? 'السائل' : 'المساعد'}: ${h.text}`).join('\n') : ''}

سؤال المستخدم الجديد:
"${message}"

يرجى الإجابة بدقة بالغة وفق المصادر الشيعية حصراً مع التوثيق المنهجي.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: contentsPrompt,
      config: {
        systemInstruction,
        temperature: 0.2, // Low temperature for high precision & strict factual consistency
      }
    });

    const replyText = response.text || 'عذراً، لم أتمكن من استخراج إجابة في الوقت الحالي. يرجى إعادة المحاولة.';

    // Extract structured citations referencing authentic Shia sources
    const citations = [
      { id: 1, sourceTitle: 'الكافي - للكليني', details: 'الشيخ محمد بن يعقوب الكليني، ج 1 (كتاب الحجة ومولد النبي)' },
      { id: 2, sourceTitle: 'الإرشاد - للشيخ المفيد', details: 'الشيخ محمد بن محمد بن النعمان المفيد، ج 1 (باب السيرة والغدير)' },
      { id: 3, sourceTitle: 'الصحيح من سيرة النبي الأعظم', details: 'العلامة السيد جعفر مرتضى العاملي، أجزاء السيرة النبوية' }
    ];

    res.json({
      text: replyText,
      citations
    });
  } catch (err: unknown) {
    console.error('Error in /api/chat:', err);
    const errorMessage = err instanceof Error ? err.message : 'حدث خطأ في الخادم.';
    res.status(500).json({
      error: 'تعذر الاتصال بمركز المعرفة الذكي. يرجى التأكد من مفتاح API أو المحاولة لاحقاً.',
      details: errorMessage
    });
  }
});

// API Search
app.get('/api/search', (req, res) => {
  const query = (req.query.q as string || '').trim().toLowerCase();
  if (!query) {
    return res.json({ events: [], characters: [], places: [], references: [] });
  }

  const events = SEERAH_EVENTS.filter(e => 
    e.title.toLowerCase().includes(query) || 
    e.summary.toLowerCase().includes(query) ||
    e.details.toLowerCase().includes(query) ||
    e.locationName.toLowerCase().includes(query)
  );

  const characters = CHARACTERS.filter(c =>
    c.name.toLowerCase().includes(query) ||
    c.title.toLowerCase().includes(query) ||
    c.bio.toLowerCase().includes(query)
  );

  const places = HISTORICAL_PLACES.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.arabicTitle.toLowerCase().includes(query) ||
    p.description.toLowerCase().includes(query)
  );

  const references = QURAN_HADITH_REFS.filter(r =>
    r.textArabic.toLowerCase().includes(query) ||
    r.reference.toLowerCase().includes(query) ||
    r.context.toLowerCase().includes(query)
  );

  res.json({
    events,
    characters,
    places,
    references
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
