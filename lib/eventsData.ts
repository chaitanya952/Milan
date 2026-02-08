export interface Coordinator {
  name: string;
  phone: string;
}

export interface EntryFee {
  single: number;
  group: number;
}

export interface SubEvent {
  id: string;
  name: string;
  category: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  teamSize: 'solo' | 'group' | 'solo/duo/group';
  minTeamSize?: number;
  maxTeamSize?: number;
  entryFee: EntryFee;
  prizes: string;
  rules: string[];
  coordinators: Coordinator[];
  pptUrl?: string;
}

export interface MainEvent {
  id: string;
  name: string;
  title: string;
  icon: string;
  color: string;
  gradient: string;
  tagline: string;
  description: string;
  summary: string;
  eventDate: string;
  upiQrCode: string;
  subEvents: SubEvent[];
  googleFormUrl?: string;
  pptUrl?: string;
}

export const eventsData: MainEvent[] = [
  {
    id: 'ignitron',
    name: 'Ignitron',
    title: 'IGNITRON',
    icon: 'BriefcaseBusiness',
    color: 'neon-orange',
    gradient: 'from-neon-orange via-neon-yellow to-neon-red',
    tagline: 'Ignite Your Entrepreneurial Spirit',
    description: 'A premier entrepreneurship event where innovation meets opportunity',
    summary: 'Ignitron is Milan\'s flagship entrepreneurship event, bringing together aspiring entrepreneurs, industry leaders, and investors. Showcase your business ideas, participate in pitch competitions, and network with like-minded innovators.',
    eventDate: 'February 18, 2026',
    upiQrCode: '/qr-codes/ignitron-upi.jpeg',
    pptUrl: '/downloads/IGNITRON.pptx',
    googleFormUrl: 'https://forms.google.com/ignitron',
    subEvents: [
      {
        id: 'ignitron-entrepreneurship',
        name: 'Entrepreneurship',
        category: 'Academic',
        description: 'Test your marketing acumen and strategic thinking in this challenging competition.',
        date: 'Feb 18',
        time: '10:00 AM - 4:00 PM',
        venue: 'On Campus',
        teamSize: 'group',
        minTeamSize: 2,
        maxTeamSize: 5,
        entryFee: {
          single: 1000,
          group: 1000
        },
        prizes: '50,000',
        rules: [
          'Team size: 2-5 members',
          'Presentation rounds',
          'All team members must participate',
          'Time limit will be strictly enforced',
          'Judging based on creativity, feasibility, and presentation'
        ],
        coordinators: [
          { name: 'G. Anusree', phone: '9502211025' },
          { name: 'T. SAI TEJA', phone: '8247507793' },
          { name: 'SRI VATSAVA', phone: '9392067800' }
        ]
      }
    ]
  },
  {
    id: 'chrysalis',
    name: 'Chrysalis',
    title: 'CHRYSALIS',
    icon: 'Theater',
    color: 'neon-blue',
    gradient: 'from-neon-blue via-blue-500 to-neon-purple',
    tagline: 'Celebrate Culture & Creativity',
    description: 'Premier sports and academic tournament featuring multiple competitions',
    summary: 'Chrysalis is the vibrant fusion of intellect and creativity at VJIM ,where academic brilliance meets cultural expression in one unforgettable celebration. ✨',
    eventDate: 'February 21, 2026',
    upiQrCode: '/qr-codes/Chrysalis.jpeg',
    pptUrl: '/downloads/Chrysalis.pptx',
    subEvents: [
      // Academic Events
      {
        id: 'marketing-mad',
        name: 'Marketing (MAD)',
        category: 'Academic',
        description: 'Test your marketing acumen and strategic thinking in this challenging competition.',
        date: 'Feb 19',
        time: '10:00 AM - 4:00 PM',
        venue: 'In Campus',
        teamSize: 'group',
        minTeamSize: 2,
        maxTeamSize: 3,
        entryFee: {
          single: 0,
          group: 200
        },
        prizes: '₹3,000',
        rules: [
          'Team size: 2-3 members',
          'Club / Vertical: Marketing Club (Academic)',
          'Case study and presentation rounds',
          'Judging based on creativity, feasibility, and presentation'
        ],
        coordinators: [
          { name: 'SVS Rishitha', phone: '6305614798' },
          { name: 'Muskan Singh', phone: '7013124225' }
        ]
      },
      {
        id: 'operations-optimops',
        name: 'Operations (OPTIMOPS)',
        category: 'Academic',
        description: 'Optimize processes and demonstrate operational excellence in this strategic challenge.',
        date: 'Feb 19',
        time: '10:00 AM - 4:00 PM',
        venue: 'In Campus',
        teamSize: 'group',
        minTeamSize: 2,
        maxTeamSize: 3,
        entryFee: {
          single: 0,
          group: 200
        },
        prizes: '₹3,000',
        rules: [
          'Team size: 2-3 members',
          'Club / Vertical: Operations Club (Academic)',
          'Operations and supply chain problem solving',
          'Presentation and Q&A rounds'
        ],
        coordinators: [
          { name: 'C. Saakshi', phone: '7989194934' },
          { name: 'Sahithi', phone: '8688351758' }
        ]
      },
      {
        id: 'hr-humaneers',
        name: 'HR (HUMANEER)',
        category: 'Academic',
        description: 'Showcase your people management and HR strategy skills in this comprehensive challenge.',
        date: 'Feb 20',
        time: '10:00 AM - 4:00 PM',
        venue: 'In Campus',
        teamSize: 'group',
        minTeamSize: 2,
        maxTeamSize: 3,
        entryFee: {
          single: 0,
          group: 200
        },
        prizes: '₹3,000',
        rules: [
          'Team size: 2-3 members',
          'Club / Vertical: HR Club (Academic)',
          'HR case study and role play',
          'Policy formulation and presentation'
        ],
        coordinators: [
          { name: 'Prachi Kushwaha', phone: '8004596042' },
          { name: 'YDSN Sathwika', phone: '6302136641' }
        ]
      },
      {
        id: 'finance-finfunda',
        name: 'Finance (FINFUNDA)',
        category: 'Academic',
        description: 'Demonstrate your financial analysis and investment strategy expertise.',
        date: 'Feb 20',
        time: '10:00 AM - 4:00 PM',
        venue: 'In Campus',
        teamSize: 'group',
        minTeamSize: 3,
        maxTeamSize: 5,
        entryFee: {
          single: 0,
          group: 200
        },
        prizes: '₹3,000',
        rules: [
          'Team size: 3-5 members',
          'Club / Vertical: Finance Club (Academic)',
          'Financial modeling and analysis',
          'Investment pitch presentation'
        ],
        coordinators: [
          { name: 'P. V. Karthikeya', phone: '7601033418' },
          { name: 'Vaishnavi', phone: '7907343214' }
        ]
      },
      // Chrysalis (Non-Academic) Events
      {
        id: 'singing-competition',
        name: 'Singing Competition',
        category: 'Music',
        description: 'Showcase your vocal talent in solo, duo, or group performances.',
        date: 'Feb 19',
        time: '2:00 PM onwards',
        venue: 'On Campus',
        teamSize: 'solo/duo/group',
        minTeamSize: 1,
        maxTeamSize: 4,
        entryFee: {
          single: 0,
          group: 200
        },
        prizes: '₹3,000',
        rules: [
          'Solo / Duo / Group (up to 4 members)',
          'Entry Fee: ₹200 per head',
          'Club / Vertical: Chrysalis (Non-Academic)'
        ],
        coordinators: [
          { name: 'Chatla Shivani', phone: '9701050561' },
          { name: 'D. Yuktha Sai Harshitha', phone: '8074412297' }
        ]
      },
      {
        id: 'dancing-competition',
        name: 'Dancing Competition',
        category: 'Dance',
        description: 'Express yourself through dance in solo or group categories.',
        date: 'Feb 20',
        time: '2:00 PM onwards',
        venue: 'Main Stage',
        teamSize: 'solo/duo/group',
        minTeamSize: 1,
        maxTeamSize: 8,
        entryFee: {
          single: 200,
          group: 500
        },
        prizes: 'Solo: ₹3,000 | Group: ₹5,000',
        rules: [
          'Solo OR Group (3–8 members)',
          'Entry Fee: Solo ₹200 | Group ₹500',
          'Club / Vertical: Chrysalis (Non-Academic)'
        ],
        coordinators: [
          { name: 'B. Srichand', phone: '9100326064' },
          { name: 'Kunaparaju Lahari', phone: '7981098421' }
        ]
      },
      {
        id: 'ramp-walk',
        name: 'Ramp Walk Competition',
        category: 'Fashion',
        description: 'Flaunt your style and confidence on the ramp.',
        date: 'Feb 21',
        time: '4:00 PM onwards',
        venue: 'Main Stage',
        teamSize: 'solo',
        entryFee: {
          single: 150,
          group: 0
        },
        prizes: '₹3,000',
        rules: [
          'Single Participant',
          'Entry Fee: ₹150 per head',
          'Club / Vertical: Chrysalis (Non-Academic)'
        ],
        coordinators: [
          { name: 'Meghana', phone: '9059054180' },
          { name: 'P. Akshaya Reddy', phone: '9858288898' }
        ]
      },
      {
        id: 'painting-competition',
        name: 'Painting Competition',
        category: 'Art',
        description: 'Let your creativity flow on canvas.',
        date: 'Feb 19',
        time: '10:00 AM onwards',
        venue: 'In Campus',
        teamSize: 'solo',
        entryFee: {
          single: 200,
          group: 0
        },
        prizes: '₹2,000',
        rules: [
          'Single Participant',
          'Entry Fee: ₹200 per head',
          'Club / Vertical: Chrysalis (Non-Academic)'
        ],
        coordinators: [
          { name: 'L. Nanditha', phone: '9032605728' },
          { name: 'Hema Priya', phone: '7330763229' }
        ]
      },
      {
        id: 'photography-competition',
        name: 'Photography Competition',
        category: 'Art',
        description: 'Capture the best moments and perspectives.',
        date: 'Feb 18-21',
        time: 'Throughout Fest',
        venue: 'Campus Wide',
        teamSize: 'solo',
        entryFee: {
          single: 200,
          group: 0
        },
        prizes: '₹2,000',
        rules: [
          'Single Participant',
          'Entry Fee: ₹200',
          'Club / Vertical: Chrysalis (Non-Academic)'
        ],
        coordinators: [
          { name: 'Vashist', phone: '63059 34905' },
          { name: 'Deeksha', phone: '93462 54603' }
        ]
      },
      {
        id: 'treasure-hunt',
        name: 'Treasure Hunt',
        category: 'Adventure',
        description: 'Solve clues and find the hidden treasure.',
        date: 'Feb 20',
        time: '10:00 AM onwards',
        venue: 'Campus Wide',
        teamSize: 'solo/duo/group',
        minTeamSize: 1,
        maxTeamSize: 5,
        entryFee: {
          single: 100,
          group: 300
        },
        prizes: '₹3,000',
        rules: [
          'Individual OR Group (3–5 members)',
          'Entry Fee: Group ₹300',
          'Club / Vertical: Chrysalis (Non-Academic)'
        ],
        coordinators: [
          { name: 'Pranathi', phone: '73969 51050' },
          { name: 'Srikanth', phone: '72072 05774' }
        ]
      }
    ]
  },
  {
    id: 'kritansh',
    name: 'Kritansh',
    title: 'KRITANSH',
    icon: 'Target',
    color: 'neon-pink',
    gradient: 'from-neon-pink via-neon-purple to-neon-blue',
    tagline: 'Transform through Competition',
    description: 'A vibrant cultural fest showcasing talent across dance, music, coding, and gaming',
    summary: 'Kritansh is the dynamic celebration of strength and sportsmanship at VJIM, where passion meets performance and champions rise through the spirit of the game. 🏆🔥',
    eventDate: 'February 14-21, 2026',
    upiQrCode: '/qr-codes/Kritansh.png',
    pptUrl: '/downloads/Kritansh.pdf',
    subEvents: [
      {
        id: 'cricket-men',
        name: 'Cricket (MEN)',
        category: 'Sports',
        description: 'Traditional cricket tournament with group stages.',
        date: 'Feb 14-21',
        time: '9:00 AM onwards',
        venue: 'Main Ground',
        teamSize: 'group',
        minTeamSize: 11,
        maxTeamSize: 15,
        entryFee: {
          single: 0,
          group: 3500
        },
        prizes: '₹22,500',
        rules: [
          'GROUP STAGES format',
          'White jersey is mandatory',
          'Bring your own kits.',
          'Standard cricket rules apply'
        ],
        coordinators: [
          { name: 'K. Kaushik', phone: '8458040099' },
          { name: 'Lokesh Reddy', phone: '9392617621' }
        ]
      },
      {
        id: 'box-cricket-girls',
        name: 'BOX CRICKET (GIRLS)',
        category: 'Sports',
        description: 'Exciting box cricket tournament for girls.',
        date: 'Feb 19-20',
        time: '10:00 AM onwards',
        venue: 'Tennis Court',
        teamSize: 'group',
        minTeamSize: 8,
        maxTeamSize: 10,
        entryFee: {
          single: 0,
          group: 800
        },
        prizes: '₹6,000',
        rules: [
          'Team size: 8-10 members',
          'Standard box cricket rules apply',
          'Conducted from Feb 19-20th'
        ],
        coordinators: [
          { name: 'Bharat Abhinay', phone: '9294007889' },
          { name: 'Y Lahari', phone: '8341723268' }
        ]
      },
      {
        id: 'futsal',
        name: 'Futsal',
        category: 'Sports',
        description: 'Fast-paced indoor football tournament.',
        date: 'Feb 19-20',
        time: '10:00 AM onwards',
        venue: 'Futsal Court',
        teamSize: 'group',
        minTeamSize: 8,
        maxTeamSize: 10,
        entryFee: {
          single: 0,
          group: 1500
        },
        prizes: '₹11,000',
        rules: [
          'Team size: 8-10 members',
          'Standard futsal rules apply',
          'Conducted from Feb 19-20th'
        ],
        coordinators: [
          { name: 'B. Praneet', phone: '6371740744' },
          { name: 'Mani Sai', phone: '7799882603' }
        ]
      },
      {
        id: 'basketball-men',
        name: 'Basket Ball (MEN)',
        category: 'Sports',
        description: 'Competitive basketball tournament.',
        date: 'Feb 19-20',
        time: '10:00 AM onwards',
        venue: 'Basketball Court',
        teamSize: 'group',
        minTeamSize: 5,
        maxTeamSize: 12,
        entryFee: {
          single: 0,
          group: 1200
        },
        prizes: '₹15,000',
        rules: [
          'Team size: 5-12 members',
          'Standard basketball rules apply',
          'Conducted from Feb 19-20th'
        ],
        coordinators: [
          { name: 'Manhith', phone: '8328011495' },
          { name: 'Sasanka', phone: '8639435680' }
        ]
      },
      {
        id: 'badminton',
        name: 'Badminton (Men and Women)',
        category: 'Sports',
        description: 'Badminton tournament for singles and doubles.',
        date: 'Feb 19-20',
        time: '9:00 AM onwards',
        venue: 'Indoor Stadium',
        teamSize: 'solo', 
        minTeamSize: 1,
        maxTeamSize: 2,
        entryFee: {
          single: 300,
          group: 600
        },
        prizes: '₹22,000',
        rules: [
          'Solo: ₹300 | Doubles: ₹600',
          'No mixed in Doubles',
          'Non marking Badminton shoes mandatory',
          'Conducted from Feb 19-20th'
        ],
        coordinators: [
          { name: 'Rakesh', phone: '6304625785' },
          { name: 'M K Vinish', phone: '9995045211' }
        ]
      },
      {
        id: 'carrom',
        name: 'Carrom',
        category: 'Sports',
        description: 'Classic carrom tournament in doubles format.',
        date: 'Feb 19-20',
        time: '10:00 AM onwards',
        venue: 'Common Room',
        teamSize: 'group',
        minTeamSize: 2,
        maxTeamSize: 2,
        entryFee: {
          single: 0,
          group: 500
        },
        prizes: '₹3,000',
        rules: [
          'Entry fee: ₹500 per head',
          'Double player format',
          'Conducted from Feb 19-20th'
        ],
        coordinators: [
          { name: 'Vineet Kumar', phone: '8639620923' },
          { name: 'R Yuktha', phone: '9848548000' }
        ]
      },
      {
        id: 'chess',
        name: 'Chess',
        category: 'Sports',
        description: 'Strategic chess tournament.',
        date: 'Feb 19-20',
        time: '10:00 AM onwards',
        venue: 'Seminar Hall',
        teamSize: 'solo',
        entryFee: {
          single: 300,
          group: 0
        },
        prizes: '₹2,500',
        rules: [
          'Solo participation',
          'Standard chess rules apply',
          'Conducted from Feb 19-20th'
        ],
        coordinators: [
          { name: 'Sai Ganesh', phone: '9078488091' },
          { name: 'Tarak', phone: '9390466006' }
        ]
      },
      {
        id: 'bgmi',
        name: 'BGMI',
        category: 'E-Sports',
        description: 'Battle royale squad competition.',
        date: 'Feb 19-20',
        time: '11:00 AM onwards',
        venue: 'Gaming Arena',
        teamSize: 'group',
        minTeamSize: 4,
        maxTeamSize: 5,
        entryFee: {
          single: 0,
          group: 500
        },
        prizes: '₹3,000',
        rules: [
          'Entry fee: ₹500 Per Squad',
          'Team size: 4-5 members',
          'Conducted from Feb 19-20th'
        ],
        coordinators: [
          { name: 'Azhar', phone: '8555846725' },
          { name: 'Surya Kiran', phone: '9348995922' }
        ]
      },
      {
        id: 'throwball-girls',
        name: 'Throwball (GIRLS)',
        category: 'Sports',
        description: 'Throwball tournament for girls.',
        date: 'Feb 19-20',
        time: '10:00 AM onwards',
        venue: 'Sports Ground',
        teamSize: 'group',
        minTeamSize: 9,
        maxTeamSize: 12,
        entryFee: {
          single: 0,
          group: 1200
        },
        prizes: '₹10,000',
        rules: [
          'Team Size: 9-12 members',
          'Standard throwball rules apply',
          'Conducted from Feb 19-20th'
        ],
        coordinators: [
          { name: 'V B Meera', phone: '8897697811' },
          { name: 'D.Gnanika', phone: '6303815210' }
        ]
      },
      {
        id: 'kabaddi-mens',
        name: 'Kabaddi (MENS)',
        category: 'Sports',
        description: 'Intense kabaddi tournament.',
        date: 'Feb 18-21',
        time: '10:00 AM onwards',
        venue: 'Kabaddi Court',
        teamSize: 'group',
        minTeamSize: 7,
        maxTeamSize: 12,
        entryFee: {
          single: 0,
          group: 1000
        },
        prizes: '₹10,000',
        rules: [
          'Team size: 7-12 members',
          'Standard kabaddi rules apply',
          'Conducted from Feb 18-21'
        ],
        coordinators: [
          { name: 'Sai Vardhan', phone: '9121754433' },
          { name: 'Sahitya', phone: '7989664920' }
        ]
      },
      {
        id: 'volleyball-men',
        name: 'Volleyball (MEN)',
        category: 'Sports',
        description: 'Exciting volleyball tournament.',
        date: 'Feb 19-20',
        time: '10:00 AM onwards',
        venue: 'Volleyball Court',
        teamSize: 'group',
        minTeamSize: 6,
        maxTeamSize: 12,
        entryFee: {
          single: 0,
          group: 1200
        },
        prizes: '₹12,000',
        rules: [
          'Team size: 6-12 members',
          'Best of 3 sets',
          'Conducted from Feb 19-20th'
        ],
        coordinators: [
          { name: 'Prasad', phone: '9392585742' },
          { name: 'K. Raman', phone: '8658677344' }
        ]
      }
    ]
  }
];

// Helper function to get event by ID
export function getEventById(id: string): MainEvent | undefined {
  return eventsData.find(event => event.id === id);
}

// Helper function to get sub-event by ID
export function getSubEventById(eventId: string, subEventId: string): SubEvent | undefined {
  const event = getEventById(eventId);
  return event?.subEvents.find(subEvent => subEvent.id === subEventId);
}

// Helper function to get all coordinators
export function getAllCoordinators(): { event: string; subEvent: string; coordinators: Coordinator[] }[] {
  const allCoordinators: { event: string; subEvent: string; coordinators: Coordinator[] }[] = [];
  
  eventsData.forEach(event => {
    event.subEvents.forEach(subEvent => {
      allCoordinators.push({
        event: event.name,
        subEvent: subEvent.name,
        coordinators: subEvent.coordinators
      });
    });
  });
  
  return allCoordinators;
}
