// Tamil Nadu Class 10 TNSCERT Curriculum Configuration
// This defines the exact scope and topics for the AI tutor

export interface CurriculumTopic {
  chapter: number;
  title: string;
  keyTopics: string[];
  examWeight: 'High' | 'Medium' | 'Low';
}

export interface Subject {
  name: string;
  code: string;
  totalChapters: number;
  topics: CurriculumTopic[];
  examPattern: {
    totalMarks: number;
    duration: string;
    sections: string[];
  };
}

export const TAMIL_NADU_CLASS_10_CURRICULUM: Record<string, Subject> = {
  mathematics: {
    name: "Mathematics",
    code: "MATH10",
    totalChapters: 16,
    topics: [
      {
        chapter: 1,
        title: "Real Numbers",
        keyTopics: ["Euclid's division algorithm", "HCF and LCM", "Irrational numbers", "Fundamental theorem of arithmetic"],
        examWeight: "High"
      },
      {
        chapter: 2,
        title: "Polynomials",
        keyTopics: ["Degree of polynomials", "Zeros of polynomials", "Relationship between zeros and coefficients"],
        examWeight: "High"
      },
      {
        chapter: 3,
        title: "Pair of Linear Equations in Two Variables",
        keyTopics: ["Graphical method", "Algebraic methods", "Substitution", "Elimination", "Cross multiplication"],
        examWeight: "High"
      },
      {
        chapter: 4,
        title: "Quadratic Equations",
        keyTopics: ["Standard form", "Factorization method", "Completing square", "Quadratic formula"],
        examWeight: "High"
      },
      {
        chapter: 5,
        title: "Arithmetic Progressions",
        keyTopics: ["nth term", "Sum of first n terms", "Common difference", "Applications"],
        examWeight: "Medium"
      },
      {
        chapter: 6,
        title: "Triangles",
        keyTopics: ["Similarity", "Pythagoras theorem", "Areas", "Basic proportionality theorem"],
        examWeight: "High"
      },
      {
        chapter: 7,
        title: "Coordinate Geometry",
        keyTopics: ["Distance formula", "Section formula", "Area of triangle", "Collinear points"],
        examWeight: "Medium"
      },
      {
        chapter: 8,
        title: "Introduction to Trigonometry",
        keyTopics: ["Trigonometric ratios", "Trigonometric identities", "Complementary angles"],
        examWeight: "High"
      },
      {
        chapter: 9,
        title: "Applications of Trigonometry",
        keyTopics: ["Heights and distances", "Angle of elevation", "Angle of depression"],
        examWeight: "Medium"
      },
      {
        chapter: 10,
        title: "Circles",
        keyTopics: ["Tangent to circle", "Number of tangents", "Length of tangent"],
        examWeight: "Medium"
      },
      {
        chapter: 11,
        title: "Areas related to Circles",
        keyTopics: ["Area of sector", "Area of segment", "Combination of figures"],
        examWeight: "Medium"
      },
      {
        chapter: 12,
        title: "Surface Areas and Volumes",
        keyTopics: ["Combination of solids", "Frustum of cone", "Volume and surface area"],
        examWeight: "High"
      },
      {
        chapter: 13,
        title: "Statistics",
        keyTopics: ["Mean of grouped data", "Median", "Mode", "Cumulative frequency"],
        examWeight: "Medium"
      },
      {
        chapter: 14,
        title: "Probability",
        keyTopics: ["Theoretical probability", "Experimental probability", "Basic concepts"],
        examWeight: "Low"
      }
    ],
    examPattern: {
      totalMarks: 100,
      duration: "3 hours",
      sections: ["Section A: 1 mark questions", "Section B: 2 mark questions", "Section C: 3 mark questions", "Section D: 5 mark questions"]
    }
  },
  
  science: {
    name: "Science",
    code: "SCI10",
    totalChapters: 16,
    topics: [
      {
        chapter: 1,
        title: "Light - Reflection and Refraction",
        keyTopics: ["Laws of reflection", "Spherical mirrors", "Refraction", "Lens formula", "Power of lens"],
        examWeight: "High"
      },
      {
        chapter: 2,
        title: "The Human Eye and Colourful World",
        keyTopics: ["Structure of eye", "Defects of vision", "Dispersion", "Atmospheric refraction"],
        examWeight: "Medium"
      },
      {
        chapter: 3,
        title: "Electricity",
        keyTopics: ["Electric current", "Potential difference", "Ohm's law", "Resistance", "Electric power"],
        examWeight: "High"
      },
      {
        chapter: 4,
        title: "Magnetic Effects of Electric Current",
        keyTopics: ["Magnetic field", "Fleming's rules", "Electric motor", "Electromagnetic induction"],
        examWeight: "Medium"
      },
      {
        chapter: 5,
        title: "Acids, Bases and Salts",
        keyTopics: ["Indicators", "pH scale", "Neutralization", "Preparation of salts", "Chemicals from common salt"],
        examWeight: "High"
      },
      {
        chapter: 6,
        title: "Metals and Non-metals",
        keyTopics: ["Physical properties", "Chemical properties", "Extraction", "Corrosion", "Alloys"],
        examWeight: "High"
      },
      {
        chapter: 7,
        title: "Carbon and its Compounds",
        keyTopics: ["Covalent bonding", "Versatile nature", "Homologous series", "Nomenclature", "Chemical properties"],
        examWeight: "High"
      },
      {
        chapter: 8,
        title: "Life Processes",
        keyTopics: ["Nutrition", "Respiration", "Transportation", "Excretion"],
        examWeight: "High"
      },
      {
        chapter: 9,
        title: "Control and Coordination",
        keyTopics: ["Nervous system", "Hormones", "Coordination in plants", "Tropism"],
        examWeight: "Medium"
      },
      {
        chapter: 10,
        title: "How do Organisms Reproduce",
        keyTopics: ["Asexual reproduction", "Sexual reproduction", "Reproductive health"],
        examWeight: "Medium"
      },
      {
        chapter: 11,
        title: "Heredity and Evolution",
        keyTopics: ["Mendel's experiments", "Sex determination", "Acquired traits", "Evolution"],
        examWeight: "Medium"
      }
    ],
    examPattern: {
      totalMarks: 100,
      duration: "3 hours",
      sections: ["Section A: 1 mark questions", "Section B: 2 mark questions", "Section C: 3 mark questions", "Section D: 5 mark questions"]
    }
  },

  english: {
    name: "English",
    code: "ENG10",
    totalChapters: 20,
    topics: [
      {
        chapter: 1,
        title: "First Flight - Prose",
        keyTopics: ["A Letter to God", "Nelson Mandela", "Two Stories about Flying", "From the Diary of Anne Frank", "The Hundred Dresses"],
        examWeight: "High"
      },
      {
        chapter: 2,
        title: "First Flight - Poetry",
        keyTopics: ["Dust of Snow", "Fire and Ice", "A Tiger in the Zoo", "How to Tell Wild Animals", "The Ball Poem"],
        examWeight: "High"
      },
      {
        chapter: 3,
        title: "Footprints without Feet",
        keyTopics: ["A Triumph of Surgery", "The Thief's Story", "The Midnight Visitor", "A Question of Trust", "Footprints without Feet"],
        examWeight: "Medium"
      },
      {
        chapter: 4,
        title: "Grammar",
        keyTopics: ["Tenses", "Voice", "Narration", "Determiners", "Prepositions", "Conjunctions"],
        examWeight: "High"
      },
      {
        chapter: 5,
        title: "Writing Skills",
        keyTopics: ["Letter writing", "Notice", "Message", "Article", "Story writing", "Diary entry"],
        examWeight: "High"
      }
    ],
    examPattern: {
      totalMarks: 100,
      duration: "3 hours",
      sections: ["Reading: 26 marks", "Writing: 30 marks", "Grammar: 16 marks", "Literature: 28 marks"]
    }
  },

  socialScience: {
    name: "Social Science",
    code: "SST10",
    totalChapters: 22,
    topics: [
      {
        chapter: 1,
        title: "Resources and Development",
        keyTopics: ["Types of resources", "Resource planning", "Land resources", "Soil resources", "Water resources"],
        examWeight: "High"
      },
      {
        chapter: 2,
        title: "Forest and Wildlife Resources",
        keyTopics: ["Biodiversity", "Conservation", "Forest types", "Wildlife protection"],
        examWeight: "Medium"
      },
      {
        chapter: 3,
        title: "Water Resources",
        keyTopics: ["Water scarcity", "Multi-purpose projects", "Rainwater harvesting", "Water conservation"],
        examWeight: "High"
      },
      {
        chapter: 4,
        title: "Agriculture",
        keyTopics: ["Types of farming", "Cropping pattern", "Major crops", "Agricultural development"],
        examWeight: "High"
      },
      {
        chapter: 5,
        title: "Minerals and Energy Resources",
        keyTopics: ["Types of minerals", "Distribution", "Conservation", "Energy resources"],
        examWeight: "Medium"
      },
      {
        chapter: 6,
        title: "Manufacturing Industries",
        keyTopics: ["Types of industries", "Location factors", "Industrial pollution", "Industrial development"],
        examWeight: "High"
      },
      {
        chapter: 7,
        title: "Power Sharing",
        keyTopics: ["Need for power sharing", "Forms of power sharing", "Federal form of government"],
        examWeight: "High"
      },
      {
        chapter: 8,
        title: "Federalism",
        keyTopics: ["Federal features", "Decentralization", "Language policy", "Centre-state relations"],
        examWeight: "High"
      }
    ],
    examPattern: {
      totalMarks: 100,
      duration: "3 hours",
      sections: ["Section A: 1 mark questions", "Section B: 3 mark questions", "Section C: 5 mark questions", "Section D: Map work"]
    }
  }
};

// Common examination keywords and patterns for Class 10
export const EXAM_KEYWORDS = {
  mathematics: [
    "prove", "verify", "find", "calculate", "solve", "construct", "draw", "show that",
    "hence", "also find", "using", "by", "method", "formula", "theorem"
  ],
  science: [
    "explain", "describe", "define", "distinguish", "compare", "list", "name",
    "draw diagram", "with example", "give reason", "why", "how", "what happens when"
  ],
  english: [
    "explain", "describe", "analyze", "comment", "elaborate", "justify",
    "character sketch", "theme", "message", "summary", "paraphrase"
  ],
  socialScience: [
    "explain", "describe", "analyze", "examine", "discuss", "evaluate",
    "give reasons", "compare", "distinguish", "locate", "identify"
  ]
};

// Board exam tips and important notes
export const EXAM_TIPS = {
  general: [
    "Always read questions carefully and understand what is being asked",
    "Show all steps in mathematical problems",
    "Use proper scientific terminology",
    "Draw neat diagrams where required",
    "Manage time effectively during exams"
  ],
  mathematics: [
    "Write given data clearly",
    "State formulas before using them",
    "Show all calculation steps",
    "Draw accurate graphs and diagrams",
    "Check your answers"
  ],
  science: [
    "Learn chemical equations and formulas",
    "Practice diagram drawing",
    "Understand concept connections",
    "Use scientific terms correctly",
    "Give examples for better explanation"
  ]
};

export function getCurriculumScope(subject: string): Subject | null {
  return TAMIL_NADU_CLASS_10_CURRICULUM[subject.toLowerCase()] || null;
}

export function getTopicsByChapter(subject: string, chapter: number): CurriculumTopic | null {
  const subjectData = getCurriculumScope(subject);
  if (!subjectData) return null;
  
  return subjectData.topics.find(topic => topic.chapter === chapter) || null;
}

export function getHighPriorityTopics(subject: string): CurriculumTopic[] {
  const subjectData = getCurriculumScope(subject);
  if (!subjectData) return [];
  
  return subjectData.topics.filter(topic => topic.examWeight === 'High');
}