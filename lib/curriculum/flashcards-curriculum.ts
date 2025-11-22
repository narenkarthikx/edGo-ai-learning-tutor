// Flashcard System for Tamil Nadu Curriculum
// Grade-specific flashcards for intuitive learning

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  hint?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  chapter: number;
}

export interface FlashcardSet {
  subject: string;
  grade: number;
  chapter: number;
  chapterTitle: string;
  cards: Flashcard[];
}

// Class 7 Flashcards - Foundation Building
export const CLASS_7_FLASHCARDS: Record<string, FlashcardSet[]> = {
  mathematics: [
    {
      subject: 'mathematics',
      grade: 7,
      chapter: 1,
      chapterTitle: 'Integers',
      cards: [
        {
          id: 'math-7-1-1',
          question: 'What are integers?',
          answer: 'Integers are whole numbers that can be positive, negative, or zero. Examples: -3, -2, -1, 0, 1, 2, 3',
          hint: 'Think of numbers on a number line going both directions',
          difficulty: 'easy',
          topic: 'Basic Concepts',
          chapter: 1
        },
        {
          id: 'math-7-1-2',
          question: 'What is (-5) + 3?',
          answer: '-2. Start at -5 on the number line and move 3 steps to the right.',
          hint: 'Use a number line to visualize',
          difficulty: 'easy',
          topic: 'Addition of Integers',
          chapter: 1
        },
        {
          id: 'math-7-1-3',
          question: 'What is (-2) × (-3)?',
          answer: '6. When you multiply two negative numbers, the result is positive.',
          hint: 'Remember: negative × negative = positive',
          difficulty: 'medium',
          topic: 'Multiplication of Integers',
          chapter: 1
        },
        {
          id: 'math-7-1-4',
          question: 'What is the additive inverse of -7?',
          answer: '7. The additive inverse is the number that, when added to the original, gives 0.',
          hint: 'What number + (-7) = 0?',
          difficulty: 'medium',
          topic: 'Properties of Integers',
          chapter: 1
        }
      ]
    },
    {
      subject: 'mathematics',
      grade: 7,
      chapter: 2,
      chapterTitle: 'Fractions and Decimals',
      cards: [
        {
          id: 'math-7-2-1',
          question: 'What is 1/2 + 1/4?',
          answer: '3/4. Convert to common denominator: 2/4 + 1/4 = 3/4',
          hint: 'Find a common denominator first',
          difficulty: 'easy',
          topic: 'Addition of Fractions',
          chapter: 2
        },
        {
          id: 'math-7-2-2',
          question: 'Convert 0.75 to a fraction',
          answer: '3/4. 0.75 = 75/100 = 3/4 (simplified)',
          hint: '0.75 means 75 hundredths',
          difficulty: 'medium',
          topic: 'Decimals to Fractions',
          chapter: 2
        },
        {
          id: 'math-7-2-3',
          question: 'What is 2/3 of 15?',
          answer: '10. Multiply: (2/3) × 15 = 30/3 = 10',
          hint: 'Multiply the fraction by the number',
          difficulty: 'medium',
          topic: 'Fraction of a Number',
          chapter: 2
        }
      ]
    }
  ],
  
  science: [
    {
      subject: 'science',
      grade: 7,
      chapter: 1,
      chapterTitle: 'Nutrition in Plants',
      cards: [
        {
          id: 'sci-7-1-1',
          question: 'What is photosynthesis?',
          answer: 'The process by which green plants make their own food using sunlight, water, and carbon dioxide.',
          hint: 'Photo = light, synthesis = making',
          difficulty: 'easy',
          topic: 'Plant Nutrition',
          chapter: 1
        },
        {
          id: 'sci-7-1-2',
          question: 'What is chlorophyll?',
          answer: 'The green pigment in leaves that absorbs sunlight for photosynthesis.',
          hint: 'What makes leaves green?',
          difficulty: 'easy',
          topic: 'Photosynthesis',
          chapter: 1
        },
        {
          id: 'sci-7-1-3',
          question: 'What gas do plants release during photosynthesis?',
          answer: 'Oxygen (O₂). Plants take in CO₂ and release O₂.',
          hint: 'The gas we breathe',
          difficulty: 'easy',
          topic: 'Photosynthesis',
          chapter: 1
        },
        {
          id: 'sci-7-1-4',
          question: 'What are stomata?',
          answer: 'Tiny pores on the surface of leaves through which gases enter and exit.',
          hint: 'Small openings on leaves',
          difficulty: 'medium',
          topic: 'Leaf Structure',
          chapter: 1
        }
      ]
    }
  ]
};

// Class 10 Flashcards - Board Exam Preparation
export const CLASS_10_FLASHCARDS: Record<string, FlashcardSet[]> = {
  mathematics: [
    {
      subject: 'mathematics',
      grade: 10,
      chapter: 1,
      chapterTitle: 'Real Numbers',
      cards: [
        {
          id: 'math-10-1-1',
          question: 'What is Euclid\'s Division Lemma?',
          answer: 'For any positive integers a and b, there exist unique integers q and r such that a = bq + r, where 0 ≤ r < b.',
          hint: 'Think of division: dividend = divisor × quotient + remainder',
          difficulty: 'medium',
          topic: 'Euclid\'s Division Algorithm',
          chapter: 1
        },
        {
          id: 'math-10-1-2',
          question: 'What is the Fundamental Theorem of Arithmetic?',
          answer: 'Every composite number can be expressed as a product of prime numbers, and this factorization is unique.',
          hint: 'Every number has a unique prime factorization',
          difficulty: 'medium',
          topic: 'Prime Factorization',
          chapter: 1
        },
        {
          id: 'math-10-1-3',
          question: 'Is √2 rational or irrational?',
          answer: 'Irrational. It cannot be expressed as p/q where p and q are integers.',
          hint: 'Can you write √2 as a simple fraction?',
          difficulty: 'easy',
          topic: 'Irrational Numbers',
          chapter: 1
        },
        {
          id: 'math-10-1-4',
          question: 'If HCF(a,b) = 12 and LCM(a,b) = 180, and a = 36, find b.',
          answer: 'b = 60. Use formula: a × b = HCF × LCM. So 36 × b = 12 × 180, b = 60.',
          hint: 'Remember: a × b = HCF × LCM',
          difficulty: 'hard',
          topic: 'HCF and LCM',
          chapter: 1
        }
      ]
    },
    {
      subject: 'mathematics',
      grade: 10,
      chapter: 4,
      chapterTitle: 'Quadratic Equations',
      cards: [
        {
          id: 'math-10-4-1',
          question: 'What is the standard form of a quadratic equation?',
          answer: 'ax² + bx + c = 0, where a ≠ 0',
          hint: 'Form with x², x, and constant term',
          difficulty: 'easy',
          topic: 'Standard Form',
          chapter: 4
        },
        {
          id: 'math-10-4-2',
          question: 'What is the quadratic formula?',
          answer: 'x = (-b ± √(b² - 4ac)) / 2a',
          hint: 'Formula using a, b, c from ax² + bx + c = 0',
          difficulty: 'medium',
          topic: 'Quadratic Formula',
          chapter: 4
        },
        {
          id: 'math-10-4-3',
          question: 'What is the discriminant?',
          answer: 'b² - 4ac. It determines the nature of roots: if > 0, two distinct real roots; if = 0, two equal roots; if < 0, no real roots.',
          hint: 'The part under the square root in quadratic formula',
          difficulty: 'medium',
          topic: 'Discriminant',
          chapter: 4
        },
        {
          id: 'math-10-4-4',
          question: 'Solve: x² - 5x + 6 = 0',
          answer: 'x = 2 or x = 3. Factor as (x-2)(x-3) = 0',
          hint: 'Try factoring: find two numbers that multiply to 6 and add to -5',
          difficulty: 'medium',
          topic: 'Solving Equations',
          chapter: 4
        }
      ]
    },
    {
      subject: 'mathematics',
      grade: 10,
      chapter: 8,
      chapterTitle: 'Introduction to Trigonometry',
      cards: [
        {
          id: 'math-10-8-1',
          question: 'What is sin θ?',
          answer: 'Opposite side / Hypotenuse in a right triangle',
          hint: 'SOH - Sine is Opposite over Hypotenuse',
          difficulty: 'easy',
          topic: 'Trigonometric Ratios',
          chapter: 8
        },
        {
          id: 'math-10-8-2',
          question: 'What is sin² θ + cos² θ?',
          answer: '1. This is a fundamental trigonometric identity.',
          hint: 'The most important trig identity',
          difficulty: 'medium',
          topic: 'Trigonometric Identities',
          chapter: 8
        },
        {
          id: 'math-10-8-3',
          question: 'What is sin 30°?',
          answer: '1/2',
          hint: 'Common angle - memorize this!',
          difficulty: 'easy',
          topic: 'Standard Angles',
          chapter: 8
        }
      ]
    }
  ],
  
  science: [
    {
      subject: 'science',
      grade: 10,
      chapter: 3,
      chapterTitle: 'Electricity',
      cards: [
        {
          id: 'sci-10-3-1',
          question: 'What is Ohm\'s Law?',
          answer: 'V = IR. Voltage is directly proportional to current when resistance is constant.',
          hint: 'Relates voltage, current, and resistance',
          difficulty: 'easy',
          topic: 'Electric Current',
          chapter: 3
        },
        {
          id: 'sci-10-3-2',
          question: 'What is the SI unit of electric current?',
          answer: 'Ampere (A)',
          hint: 'Named after a French physicist',
          difficulty: 'easy',
          topic: 'Electric Current',
          chapter: 3
        },
        {
          id: 'sci-10-3-3',
          question: 'What is the formula for electric power?',
          answer: 'P = VI = I²R = V²/R',
          hint: 'Power relates voltage and current',
          difficulty: 'medium',
          topic: 'Electric Power',
          chapter: 3
        },
        {
          id: 'sci-10-3-4',
          question: 'In series circuit, how is total resistance calculated?',
          answer: 'R_total = R₁ + R₂ + R₃ + ... (resistances add up)',
          hint: 'In series, resistances are added',
          difficulty: 'medium',
          topic: 'Resistors in Series',
          chapter: 3
        }
      ]
    },
    {
      subject: 'science',
      grade: 10,
      chapter: 5,
      chapterTitle: 'Acids, Bases and Salts',
      cards: [
        {
          id: 'sci-10-5-1',
          question: 'What is the pH of a neutral solution?',
          answer: '7. Pure water is neutral with pH 7.',
          hint: 'Right in the middle of the pH scale',
          difficulty: 'easy',
          topic: 'pH Scale',
          chapter: 5
        },
        {
          id: 'sci-10-5-2',
          question: 'What color does litmus turn in acid?',
          answer: 'Red. Acids turn blue litmus to red.',
          hint: 'Remember: Acids are RED',
          difficulty: 'easy',
          topic: 'Indicators',
          chapter: 5
        },
        {
          id: 'sci-10-5-3',
          question: 'What is produced when acid reacts with base?',
          answer: 'Salt and water. This is called neutralization reaction.',
          hint: 'Acid + Base → ?',
          difficulty: 'easy',
          topic: 'Neutralization',
          chapter: 5
        },
        {
          id: 'sci-10-5-4',
          question: 'What is the chemical formula of baking soda?',
          answer: 'NaHCO₃ (Sodium hydrogen carbonate)',
          hint: 'Contains sodium, hydrogen, carbon, and oxygen',
          difficulty: 'medium',
          topic: 'Common Salts',
          chapter: 5
        }
      ]
    }
  ]
};

// Get flashcards for specific grade, subject, and chapter
export function getFlashcards(grade: number, subject: string, chapter?: number): FlashcardSet[] {
  const flashcardData = grade === 7 ? CLASS_7_FLASHCARDS : CLASS_10_FLASHCARDS;
  const subjectFlashcards = flashcardData[subject.toLowerCase()] || [];
  
  if (chapter) {
    return subjectFlashcards.filter(set => set.chapter === chapter);
  }
  
  return subjectFlashcards;
}

// Get all chapters with flashcards for a subject
export function getAvailableChapters(grade: number, subject: string): number[] {
  const flashcardSets = getFlashcards(grade, subject);
  return flashcardSets.map(set => set.chapter).sort((a, b) => a - b);
}

// Get random flashcards from a subject
export function getRandomFlashcards(grade: number, subject: string, count: number = 10): Flashcard[] {
  const allSets = getFlashcards(grade, subject);
  const allCards: Flashcard[] = [];
  
  allSets.forEach(set => {
    allCards.push(...set.cards);
  });
  
  // Shuffle and return requested count
  const shuffled = allCards.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Get flashcards by difficulty
export function getFlashcardsByDifficulty(
  grade: number, 
  subject: string, 
  difficulty: 'easy' | 'medium' | 'hard'
): Flashcard[] {
  const allSets = getFlashcards(grade, subject);
  const allCards: Flashcard[] = [];
  
  allSets.forEach(set => {
    allCards.push(...set.cards.filter(card => card.difficulty === difficulty));
  });
  
  return allCards;
}
