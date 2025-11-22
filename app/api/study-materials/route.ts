import { NextRequest, NextResponse } from 'next/server';

interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  grade: number;
  type: 'pdf' | 'video' | 'article' | 'exercise';
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  url: string;
  source: string;
  language: 'en' | 'hi';
  boardAlignment: 'NCERT' | 'STATE';
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get('subject') || 'Math';
    const grade = parseInt(searchParams.get('grade') || '10');
    const language = (searchParams.get('language') || 'en') as 'en' | 'hi';

    console.log('Study materials request:', { subject, grade, language });

    const materials = generateEducationalContent(subject, grade, language);

    return NextResponse.json({
      success: true,
      materials,
      meta: {
        subject,
        grade,
        language,
        totalMaterials: materials.length
      }
    });

  } catch (error) {
    console.error('Study materials API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch study materials',
        materials: []
      },
      { status: 500 }
    );
  }
}

function generateEducationalContent(subject: string, grade: number, language: 'en' | 'hi'): StudyMaterial[] {
  if (grade === 7) {
    return generateGrade7Content(subject, language)
  } else {
    return generateGrade10Content(subject, language)
  }
}

function generateGrade7Content(subject: string, language: 'en' | 'hi'): StudyMaterial[] {
  const grade7Content = {
    Math: [
      {
        id: 'tn7-math-1',
        title: language === 'hi' ? 'पूर्णांक संख्याएं' : 'Integers',
        subject: 'Mathematics',
        grade: 7,
        type: 'pdf' as const,
        duration: '30 min',
        difficulty: 'Easy' as const,
        description: language === 'hi'
          ? 'पूर्णांक संख्याओं की संक्रियाएं और उनके गुणधर्म।'
          : 'Operations on integers and their properties. Learn addition, subtraction, multiplication with positive and negative numbers.',
        url: 'https://www.selfstudys.com/books/tamilnadu/class-7th/mathematics',
        source: 'TNSCERT Class 7 Mathematics',
        language,
        boardAlignment: 'STATE' as const
      },
      {
        id: 'tn7-math-2',
        title: language === 'hi' ? 'भिन्न और दशमलव' : 'Fractions and Decimals',
        subject: 'Mathematics',
        grade: 7,
        type: 'exercise' as const,
        duration: '25 min',
        difficulty: 'Medium' as const,
        description: language === 'hi'
          ? 'भिन्न और दशमलव संख्याओं की संक्रियाएं।'
          : 'Operations on fractions and decimals with real-world applications.',
        url: 'https://www.selfstudys.com/books/tamilnadu/class-7th/mathematics',
        source: 'TNSCERT Grade 7',
        language,
        boardAlignment: 'STATE' as const
      },
      {
        id: 'tn7-math-3',
        title: language === 'hi' ? 'सरल समीकरण' : 'Simple Equations',
        subject: 'Mathematics',
        grade: 7,
        type: 'video' as const,
        duration: '20 min',
        difficulty: 'Easy' as const,
        description: language === 'hi'
          ? 'एक चर वाले सरल समीकरण हल करना।'
          : 'Solving simple linear equations with one variable.',
        url: 'https://www.selfstudys.com/books/tamilnadu/class-7th/mathematics',
        source: 'TN Grade 7 Algebra',
        language,
        boardAlignment: 'STATE' as const
      }
    ],
    Science: [
      {
        id: 'tn7-sci-1',
        title: language === 'hi' ? 'पौधों में पोषण' : 'Nutrition in Plants',
        subject: 'Science',
        grade: 7,
        type: 'article' as const,
        duration: '20 min',
        difficulty: 'Easy' as const,
        description: language === 'hi'
          ? 'प्रकाश संश्लेषण की प्रक्रिया और पौधों में पोषण।'
          : 'Learn about photosynthesis and how plants make their own food.',
        url: 'https://www.selfstudys.com/books/tamilnadu/class-7th/science',
        source: 'TNSCERT Class 7 Science',
        language,
        boardAlignment: 'STATE' as const
      },
      {
        id: 'tn7-sci-2',
        title: language === 'hi' ? 'जंतुओं में पोषण' : 'Nutrition in Animals',
        subject: 'Science',
        grade: 7,
        type: 'video' as const,
        duration: '30 min',
        difficulty: 'Medium' as const,
        description: language === 'hi'
          ? 'जंतुओं में पाचन तंत्र और पोषण की प्रक्रिया।'
          : 'Understanding digestive system and nutrition process in animals.',
        url: 'https://www.selfstudys.com/books/tamilnadu/class-7th/science',
        source: 'TNSCERT Biology Grade 7',
        language,
        boardAlignment: 'STATE' as const
      }
    ],
    English: [
      {
        id: 'tn7-eng-1',
        title: language === 'hi' ? 'अंग्रेजी व्याकरण मूल बातें' : 'English Grammar Basics',
        subject: 'English',
        grade: 7,
        type: 'pdf' as const,
        duration: '25 min',
        difficulty: 'Easy' as const,
        description: language === 'hi'
          ? 'संज्ञा, सर्वनाम, क्रिया और विशेषण की मूल बातें।'
          : 'Learn basic grammar concepts: nouns, pronouns, verbs, and adjectives.',
        url: 'https://www.selfstudys.com/books/tamilnadu/class-7th/english',
        source: 'TNSCERT English Grade 7',
        language,
        boardAlignment: 'STATE' as const
      }
    ],
    'Social Studies': [
      {
        id: 'tn7-soc-1',
        title: language === 'hi' ? 'भारत का इतिहास' : 'History of India',
        subject: 'Social Studies',
        grade: 7,
        type: 'article' as const,
        duration: '30 min',
        difficulty: 'Medium' as const,
        description: language === 'hi'
          ? 'भारत के प्राचीन इतिहास और संस्कृति का परिचय।'
          : 'Introduction to ancient Indian history and culture for Class 7.',
        url: 'https://www.selfstudys.com/books/tamilnadu/class-7th/social-science',
        source: 'TNSCERT History Grade 7',
        language,
        boardAlignment: 'STATE' as const
      }
    ]
  }

  const govtTextbooks: StudyMaterial[] = [
    {
      id: `tn7-${subject.toLowerCase()}-textbook`,
      title: language === 'hi' ? `कक्षा 7 ${subject} पुस्तक` : `Class 7 ${subject} Textbook`,
      subject,
      grade: 7,
      type: 'pdf',
      duration: '45 min',
      difficulty: 'Easy',
      description: language === 'hi'
        ? `तमिलनाडु सरकार की कक्षा 7 ${subject} पाठ्यपुस्तक।`
        : `Tamil Nadu Government Class 7 ${subject} textbook with foundation concepts.`,
      url: `https://www.selfstudys.com/books/tamilnadu/class-7th/${subject.toLowerCase().replace(' ', '-')}`,
      source: 'TN Govt Free Textbooks Class 7',
      language: language as 'en' | 'hi',
      boardAlignment: 'STATE'
    }
  ]

  const subjectContent = grade7Content[subject as keyof typeof grade7Content] || grade7Content.Math
  return [...subjectContent, ...govtTextbooks]
}

function generateGrade10Content(subject: string, language: 'en' | 'hi'): StudyMaterial[] {
  const grade10Content = {
    Math: [
      {
        id: 'tn10-math-1',
        title: language === 'hi' ? 'द्विघातीय समीकरण' : 'Quadratic Equations',
        subject: 'Mathematics',
        grade: 10,
        type: 'pdf' as const,
        duration: '45 min',
        difficulty: 'Hard' as const,
        description: language === 'hi'
          ? 'द्विघातीय समीकरणों को हल करने की विधियां और अनुप्रयोग।'
          : 'Methods to solve quadratic equations with real-world applications for Class 10 Board preparation.',
        url: 'https://www.selfstudys.com/books/tamilnadu/class-10th/mathematics',
        source: 'TNSCERT Class 10 Mathematics',
        language,
        boardAlignment: 'STATE' as const
      },
      {
        id: 'tn10-math-2',
        title: language === 'hi' ? 'त्रिकोणमिति का परिचय' : 'Introduction to Trigonometry',
        subject: 'Mathematics',
        grade: 10,
        type: 'exercise' as const,
        duration: '40 min',
        difficulty: 'Hard' as const,
        description: language === 'hi'
          ? 'त्रिकोणमितीय अनुपात और उनके अनुप्रयोग।'
          : 'Trigonometric ratios and their applications in solving triangles.',
        url: 'https://www.selfstudys.com/books/tamilnadu/class-10th/mathematics',
        source: 'TNSCERT Board Exam Prep',
        language,
        boardAlignment: 'STATE' as const
      },
      {
        id: 'tn10-math-3',
        title: language === 'hi' ? 'निर्देशांक ज्यामिति' : 'Coordinate Geometry',
        subject: 'Mathematics',
        grade: 10,
        type: 'video' as const,
        duration: '35 min',
        difficulty: 'Hard' as const,
        description: language === 'hi'
          ? 'निर्देशांक तल पर बिंदुओं और रेखाओं का अध्ययन।'
          : 'Study of points and lines in coordinate plane for board exam preparation.',
        url: 'https://www.selfstudys.com/books/tamilnadu/class-10th/mathematics',
        source: 'TN Board Class 10',
        language,
        boardAlignment: 'STATE' as const
      }
    ],
    Science: [
      {
        id: 'tn10-sci-1',
        title: language === 'hi' ? 'प्रकाश - अपवर्तन' : 'Light - Refraction',
        subject: 'Science',
        grade: 10,
        type: 'article' as const,
        duration: '40 min',
        difficulty: 'Medium' as const,
        description: language === 'hi'
          ? 'प्रकाश का अपवर्तन और लेंस की गुणधर्म।'
          : 'Understanding refraction of light and properties of lenses for Class 10 boards.',
        url: 'https://www.selfstudys.com/books/tamilnadu/class-10th/science',
        source: 'TNSCERT Physics Class 10',
        language,
        boardAlignment: 'STATE' as const
      },
      {
        id: 'tn10-sci-2',
        title: language === 'hi' ? 'विद्युत धारा और उसके प्रभाव' : 'Electric Current and its Effects',
        subject: 'Science',
        grade: 10,
        type: 'video' as const,
        duration: '45 min',
        difficulty: 'Hard' as const,
        description: language === 'hi'
          ? 'विद्युत धारा, प्रतिरोध और विद्युत शक्ति का अध्ययन।'
          : 'Study of electric current, resistance, and electrical power with board exam focus.',
        url: 'https://www.selfstudys.com/books/tamilnadu/class-10th/science',
        source: 'TN Board Physics',
        language,
        boardAlignment: 'STATE' as const
      },
      {
        id: 'tn10-sci-3',
        title: language === 'hi' ? 'आनुवंशिकता और विकास' : 'Heredity and Evolution',
        subject: 'Science',
        grade: 10,
        type: 'pdf' as const,
        duration: '35 min',
        difficulty: 'Medium' as const,
        description: language === 'hi'
          ? 'आनुवंशिकता के नियम और विकास के सिद्धांत।'
          : 'Laws of inheritance and principles of evolution for Class 10 Biology.',
        url: 'https://www.selfstudys.com/books/tamilnadu/class-10th/science',
        source: 'TNSCERT Biology',
        language,
        boardAlignment: 'STATE' as const
      }
    ],
    English: [
      {
        id: 'tn10-eng-1',
        title: language === 'hi' ? 'उन्नत व्याकरण और लेखन' : 'Advanced Grammar and Writing',
        subject: 'English',
        grade: 10,
        type: 'pdf' as const,
        duration: '40 min',
        difficulty: 'Medium' as const,
        description: language === 'hi'
          ? 'उन्नत व्याकरण, निबंध लेखन और पत्र लेखन।'
          : 'Advanced grammar concepts, essay writing, and letter writing for board exams.',
        url: 'https://www.selfstudys.com/books/tamilnadu/class-10th/english',
        source: 'TNSCERT English Class 10',
        language,
        boardAlignment: 'STATE' as const
      },
      {
        id: 'tn10-eng-2',
        title: language === 'hi' ? 'साहित्य विश्लेषण' : 'Literature Analysis',
        subject: 'English',
        grade: 10,
        type: 'article' as const,
        duration: '35 min',
        difficulty: 'Hard' as const,
        description: language === 'hi'
          ? 'कविता और गद्य का विश्लेषण और व्याख्या।'
          : 'Analysis and interpretation of poetry and prose for board examination.',
        url: 'https://www.selfstudys.com/books/tamilnadu/class-10th/english',
        source: 'TN Board Literature',
        language,
        boardAlignment: 'STATE' as const
      }
    ],
    'Social Studies': [
      {
        id: 'tn10-soc-1',
        title: language === 'hi' ? 'आधुनिक भारत का इतिहास' : 'Modern History of India',
        subject: 'Social Studies',
        grade: 10,
        type: 'article' as const,
        duration: '45 min',
        difficulty: 'Medium' as const,
        description: language === 'hi'
          ? 'स्वतंत्रता संग्राम और आधुनिक भारत का निर्माण।'
          : 'Freedom struggle and the making of modern India for Class 10 boards.',
        url: 'https://www.selfstudys.com/books/tamilnadu/class-10th/social-science',
        source: 'TNSCERT History Class 10',
        language,
        boardAlignment: 'STATE' as const
      },
      {
        id: 'tn10-soc-2',
        title: language === 'hi' ? 'भारतीय अर्थव्यवस्था' : 'Indian Economy',
        subject: 'Social Studies',
        grade: 10,
        type: 'pdf' as const,
        duration: '40 min',
        difficulty: 'Hard' as const,
        description: language === 'hi'
          ? 'भारत की अर्थव्यवस्था और विकास की चुनौतियां।'
          : 'Indian economy and challenges of development for board exam preparation.',
        url: 'https://www.selfstudys.com/books/tamilnadu/class-10th/social-science',
        source: 'TN Board Economics',
        language,
        boardAlignment: 'STATE' as const
      }
    ]
  }

  const boardExamMaterials: StudyMaterial[] = [
    {
      id: `tn10-${subject.toLowerCase()}-board-prep`,
      title: language === 'hi' ? `कक्षा 10 ${subject} बोर्ड परीक्षा तैयारी` : `Class 10 ${subject} Board Exam Preparation`,
      subject,
      grade: 10,
      type: 'exercise',
      duration: '60 min',
      difficulty: 'Hard',
      description: language === 'hi'
        ? `तमिलनाडु बोर्ड कक्षा 10 ${subject} के लिए व्यापक परीक्षा तैयारी।`
        : `Comprehensive board exam preparation for Tamil Nadu Class 10 ${subject} with previous year questions.`,
      url: `https://www.selfstudys.com/books/tamilnadu/class-10th/${subject.toLowerCase().replace(' ', '-')}`,
      source: 'TN Board Exam Materials',
      language: language as 'en' | 'hi',
      boardAlignment: 'STATE'
    }
  ]

  const subjectContent = grade10Content[subject as keyof typeof grade10Content] || grade10Content.Math
  return [...subjectContent, ...boardExamMaterials]
}