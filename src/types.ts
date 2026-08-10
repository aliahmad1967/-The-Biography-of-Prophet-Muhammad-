export type PageType = 
  | 'home' 
  | 'seerah' 
  | 'farewell_article'
  | 'timeline' 
  | 'events' 
  | 'characters' 
  | 'maps' 
  | 'quran_hadith' 
  | 'lessons' 
  | 'sources' 
  | 'search' 
  | 'ai_rag';

export interface SeerahPhase {
  id: string;
  title: string;
  period: string;
  hijriPeriod: string;
  summary: string;
  description: string;
  icon: string;
  keyEvents: string[];
  lessons: string[];
  sources: string[];
}

export interface SeerahEvent {
  id: string;
  title: string;
  yearCE: number;
  yearHijri: string;
  phaseId: string;
  category: 'battle' | 'pledge' | 'revelation' | 'migration' | 'milestone' | 'treaty';
  locationName: string;
  locationCoords?: { lat: number; lng: number };
  summary: string;
  details: string;
  outcomeOrImpact?: string;
  companionsInvolved?: string[];
  quranVerses?: Array<{ text: string; surah: string; number: string; translationEn?: string }>;
  hadiths?: Array<{ text: string; source: string; number?: string }>;
  lessons: string[];
  sources: Array<{ name: string; pageOrVolume?: string }>;
}

export interface Character {
  id: string;
  name: string;
  title: string;
  category: 'caliph' | 'family' | 'companion' | 'supporter' | 'historical_figure';
  bio: string;
  keyMoments: string[];
  relationToProphet: string;
  famousQuote?: string;
  sources: string[];
}

export interface HistoricalPlace {
  id: string;
  name: string;
  arabicTitle: string;
  type: 'city' | 'mountain' | 'cave' | 'battlefield' | 'mosque' | 'region';
  description: string;
  significance: string;
  linkedEventIds: string[];
  coordinates: { xPercentage: number; yPercentage: number; lat: number; lng: number };
}

export interface QuranHadithRef {
  id: string;
  type: 'quran' | 'hadith';
  textArabic: string;
  textEnglish?: string;
  reference: string;
  context: string;
  linkedEventTitle: string;
  linkedEventId: string;
  authenticityGrade?: string;
}

export interface MoralLesson {
  id: string;
  title: string;
  category: 'spiritual' | 'leadership' | 'social' | 'moral' | 'patience';
  summary: string;
  storyContext: string;
  practicalApplications: string[];
  relatedSources: string[];
}

export interface SourceReference {
  id: string;
  title: string;
  author: string;
  deathYearHijri?: string;
  category: 'primary' | 'hadith_compilation' | 'modern_study' | 'digital_library';
  description: string;
  methodologyNote: string;
  totalVolumesOrPages?: string;
  url?: string;
  coverImage?: string;
}

export interface DigitalLibraryPublication {
  id: string;
  title: string;
  authorOrCenter: string;
  yearOrEdition: string;
  summary: string;
  url: string;
  badge?: string;
  categoryTag?: string;
  coverImage?: string;
}

export interface DigitalLibrarySource {
  id: string;
  name: string;
  url: string;
  sectionName: string;
  description: string;
  publisher: string;
  publications: DigitalLibraryPublication[];
}

export interface BookmarkItem {
  id: string;
  type: 'event' | 'character' | 'place' | 'lesson' | 'verse';
  title: string;
  subtitle: string;
  pathPage: PageType;
  targetId: string;
  addedAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  citations?: Array<{
    id: number;
    sourceTitle: string;
    details: string;
  }>;
  timestamp: string;
  isDisclaimer?: boolean;
}
