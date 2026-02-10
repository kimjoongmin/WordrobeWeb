import { parseCSV } from "../utils/csvParser";

export interface Word {
  id: string;
  text: string;
}

export interface Level {
  id: number;
  description: string;
  sentences: {
    korean: string;
    english: string[]; // Correct order
  }[];
}

export interface ShopItem {
  id: string;
  name?: string;
  type: "avatar";
  cost: number;
  imagePath: string; // Restored path logic
  style?: React.CSSProperties; // Custom positioning
}

export interface Sentence {
  korean: string;
  english: string | string[];
}

// 🔴 TODO: Replace this with your own Google Sheet "Published to Web" CSV link
// Example: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ.../pub?output=csv"
export const GOOGLE_SHEET_URL = "";

export const fetchSentences = async (): Promise<Sentence[] | null> => {
  if (!GOOGLE_SHEET_URL) return null;

  try {
    const response = await fetch(GOOGLE_SHEET_URL);
    if (!response.ok) throw new Error("Network response was not ok");

    const text = await response.text();
    const data = parseCSV(text);

    // Map CSV columns to our Sentence structure
    // We look for 'korean' and 'english' headers (case-insensitive)
    return data
      .map((row) => ({
        korean: row["korean"] || Object.values(row)[0], // Fallback to 1st col
        english: row["english"] || Object.values(row)[1], // Fallback to 2nd col
      }))
      .filter((s) => s.korean && s.english);
  } catch (error) {
    console.warn(
      "Failed to fetch from Google Sheet, falling back to local data.",
      error,
    );
    return null;
  }
};

export const LEVELS: Level[] = [
  {
    id: 1,
    description: "Level 1: Basic Greetings & Introductions",
    sentences: [
      { korean: "나는 학생입니다.", english: ["I", "am", "a", "student"] },
      { korean: "만나서 반가워요 :)", english: ["Nice", "to", "meet", "you"] },
      { korean: "이것은 사과입니다.", english: ["This", "is", "an", "apple"] },
    ],
  },
  {
    id: 2,
    description: "Level 2: Simple Actions",
    sentences: [
      {
        korean: "그녀는 책을 읽습니다.",
        english: ["She", "reads", "a", "book"],
      },
      {
        korean: "우리는 학교에 갑니다.",
        english: ["We", "go", "to", "school"],
      },
      { korean: "그는 피자를 좋아합니다.", english: ["He", "likes", "pizza"] },
    ],
  },
  {
    id: 3,
    description: "Level 3: Questions",
    sentences: [
      {
        korean: "지금 몇 시인가요?",
        english: ["What", "time", "is", "it", "now"],
      },
      { korean: "어디에 사시나요?", english: ["Where", "do", "you", "live"] },
      {
        korean: "영어를 할 수 있나요?",
        english: ["Can", "you", "speak", "English"],
      },
    ],
  },
  {
    id: 4,
    description: "Level 4: Past Tense",
    sentences: [
      {
        korean: "나는 어제 공부를 했습니다.",
        english: ["I", "studied", "yesterday"],
      },
      {
        korean: "그들은 공원에 갔습니다.",
        english: ["They", "went", "to", "the", "park"],
      },
      { korean: "그녀는 행복했습니다.", english: ["She", "was", "happy"] },
    ],
  },
  {
    id: 5,
    description: "Level 5: Complex Sentences",
    sentences: [
      {
        korean: "비가 와서 나는 집에 있었습니다.",
        english: ["I", "stayed", "home", "because", "it", "rained"],
      },
      {
        korean: "내가 가장 좋아하는 색은 파란색입니다.",
        english: ["My", "favorite", "color", "is", "blue"],
      },
      {
        korean: "내일 친구를 만날 것입니다.",
        english: ["I", "will", "meet", "my", "friend", "tomorrow"],
      },
    ],
  },
];

export const SHOP_ITEMS: ShopItem[] = Array.from({ length: 20 }, (_, i) => ({
  id: `avatar${String(i + 1).padStart(2, "0")}`, // avatar01, avatar02...
  // name: `Avatar ${i + 1}`,
  type: "avatar",
  cost: 500 * (i + 1), // 500, 1000, 1500...
  imagePath: `/Wordrobe/assets/character/avatar${String(i + 1).padStart(2, "0")}.png`,
}));
