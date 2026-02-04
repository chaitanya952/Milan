export interface SubEvent {
  id: string;
  name: string;
  description: string;
  category: string;
  type: 'formal' | 'non-formal';
  rules: string[];
  prizes: string;
  teamSize: 'single' | 'group';
  minTeamSize?: number;
  maxTeamSize?: number;
  entryFee: {
    single?: number;
    group?: number;
  };
  coordinators: {
    name: string;
    phone: string;
  }[];
  pptUrl?: string;
  venue: string;
  date: string;
  time: string;
}

export interface MainEvent {
  id: string;
  name: string;
  title: string;
  description: string;
  summary: string;
  tagline: string;
  eventDate: string;
  color: string;
  gradient: string;
  icon: string;
  subEvents: SubEvent[];
  googleFormUrl?: string;
  upiQrCode: string;
}

export const eventsData: MainEvent[] = [
  {
    id: 'ignitron',
    name: 'Ignitron',
    title: 'IGNITRON',
    description: 'Technical events showcasing innovation and technology',
    summary: 'Unleash your technical prowess through intense coding challenges, innovative hackathons, and electronics competitions. Ignitron is where brilliance meets technology!',
    tagline: 'Ignite Your Tech Spirit',
    eventDate: 'February 18, 2026',
    color: 'neon-blue',
    gradient: 'from-neon-blue to-neon-purple',
    icon: '💻',
    googleFormUrl: '', // You'll provide this
    upiQrCode: '/qr-codes/ignitron-upi.png',
    subEvents: [
      {
        id: 'ignitron-1',
        name: 'Tech Hackathon',
        description: '24-hour coding marathon to build innovative solutions',
        category: 'Coding',
        type: 'formal',
        rules: [
          'Team size: 2-4 members',
          'Bring your own laptops',
          'Internet will be provided',
          'Original code only',
          'No plagiarism'
        ],
        prizes: '1st: ₹25,000 | 2nd: ₹15,000 | 3rd: ₹10,000',
        teamSize: 'group',
        minTeamSize: 2,
        maxTeamSize: 4,
        entryFee: {
          group: 500
        },
        coordinators: [
          { name: 'Rahul Kumar', phone: '+91 98765 43210' },
          { name: 'Priya Sharma', phone: '+91 98765 43211' }
        ],
        pptUrl: '/downloads/tech-hackathon.pptx',
        venue: 'Computer Lab A',
        date: 'February 18',
        time: '10:00 AM onwards'
      },
      {
        id: 'ignitron-2',
        name: 'Code Combat',
        description: 'Competitive programming challenge',
        category: 'Coding',
        type: 'formal',
        rules: [
          'Individual participation',
          'Duration: 3 hours',
          'Online platform: HackerRank',
          'No external help allowed'
        ],
        prizes: '1st: ₹15,000 | 2nd: ₹10,000 | 3rd: ₹5,000',
        teamSize: 'single',
        entryFee: {
          single: 200
        },
        coordinators: [
          { name: 'Amit Patel', phone: '+91 98765 43212' }
        ],
        pptUrl: '/downloads/code-combat.pptx',
        venue: 'Computer Lab B',
        date: 'February 18',
        time: '2:00 PM - 5:00 PM'
      },
      {
        id: 'ignitron-3',
        name: 'Circuit Mastery',
        description: 'Electronics circuit design competition',
        category: 'Electronics',
        type: 'formal',
        rules: [
          'Team size: 2-3 members',
          'Components will be provided',
          'Design and implement given circuit',
          'Time limit: 2 hours'
        ],
        prizes: '1st: ₹12,000 | 2nd: ₹8,000 | 3rd: ₹5,000',
        teamSize: 'group',
        minTeamSize: 2,
        maxTeamSize: 3,
        entryFee: {
          group: 400
        },
        coordinators: [
          { name: 'Sneha Reddy', phone: '+91 98765 43213' }
        ],
        pptUrl: '/downloads/circuit-mastery.pptx',
        venue: 'Electronics Lab',
        date: 'February 18',
        time: '11:00 AM - 1:00 PM'
      }
    ]
  },
  {
    id: 'kritansh',
    name: 'Kritansh',
    title: 'KRITANSH',
    description: 'Cultural events celebrating art, music, and performance',
    summary: 'Express yourself through dance, music, and fashion. Kritansh celebrates the vibrant colors of culture and the rhythm of creativity!',
    tagline: 'Celebrate Creativity',
    eventDate: 'February 19-20, 2026',
    color: 'neon-pink',
    gradient: 'from-neon-pink to-neon-purple',
    icon: '🎭',
    upiQrCode: '/qr-codes/kritansh-upi.png',
    subEvents: [
      {
        id: 'kritansh-1',
        name: 'Dance Battle',
        description: 'Showcase your dance moves and win',
        category: 'Dance',
        type: 'non-formal',
        rules: [
          'Solo or group (max 8 members)',
          'Duration: 4-6 minutes',
          'Any dance style allowed',
          'Props allowed',
          'No vulgarity'
        ],
        prizes: '1st: ₹20,000 | 2nd: ₹12,000 | 3rd: ₹8,000',
        teamSize: 'group',
        minTeamSize: 1,
        maxTeamSize: 8,
        entryFee: {
          single: 200,
          group: 800
        },
        coordinators: [
          { name: 'Arjun Mehta', phone: '+91 98765 43214' },
          { name: 'Kavya Singh', phone: '+91 98765 43215' }
        ],
        pptUrl: '/downloads/dance-battle.pptx',
        venue: 'Main Auditorium',
        date: 'February 19',
        time: '4:00 PM - 7:00 PM'
      },
      {
        id: 'kritansh-2',
        name: 'Battle of Bands',
        description: 'Rock the stage with your band',
        category: 'Music',
        type: 'non-formal',
        rules: [
          'Band size: 3-6 members',
          'Original or cover songs',
          'Duration: 10-12 minutes',
          'Basic equipment provided',
          '2 songs maximum'
        ],
        prizes: '1st: ₹30,000 | 2nd: ₹18,000 | 3rd: ₹12,000',
        teamSize: 'group',
        minTeamSize: 3,
        maxTeamSize: 6,
        entryFee: {
          group: 1000
        },
        coordinators: [
          { name: 'Rohan Verma', phone: '+91 98765 43216' }
        ],
        pptUrl: '/downloads/battle-of-bands.pptx',
        venue: 'Open Air Theater',
        date: 'February 20',
        time: '5:00 PM onwards'
      },
      {
        id: 'kritansh-3',
        name: 'Fashion Show',
        description: 'Walk the ramp with style and grace',
        category: 'Fashion',
        type: 'non-formal',
        rules: [
          'Team size: 4-10 members',
          'Theme-based rounds',
          'Duration: 8-10 minutes',
          'Own costumes required',
          'Props allowed'
        ],
        prizes: '1st: ₹25,000 | 2nd: ₹15,000 | 3rd: ₹10,000',
        teamSize: 'group',
        minTeamSize: 4,
        maxTeamSize: 10,
        entryFee: {
          group: 1200
        },
        coordinators: [
          { name: 'Ananya Kapoor', phone: '+91 98765 43217' },
          { name: 'Karan Bajaj', phone: '+91 98765 43218' }
        ],
        pptUrl: '/downloads/fashion-show.pptx',
        venue: 'Main Auditorium',
        date: 'February 19',
        time: '6:00 PM - 9:00 PM'
      }
    ]
  },
  {
    id: 'chrysalis',
    name: 'Chrysalis',
    title: 'CHRYSALIS',
    description: 'Gaming and sports events for the competitive spirit',
    summary: 'Transform into a champion through intense gaming battles and strategic competitions. Chrysalis is where legends are born!',
    tagline: 'Transform Through Competition',
    eventDate: 'February 21, 2026',
    color: 'neon-green',
    gradient: 'from-neon-green to-neon-blue',
    icon: '🎮',
    upiQrCode: '/qr-codes/chrysalis-upi.png',
    subEvents: [
      {
        id: 'chrysalis-1',
        name: 'BGMI Tournament',
        description: 'Battle royale gaming championship',
        category: 'E-Sports',
        type: 'formal',
        rules: [
          'Squad mode (4 players)',
          'TPP perspective',
          'Classic mode only',
          'No emulators allowed',
          'Bring your own devices'
        ],
        prizes: '1st: ₹40,000 | 2nd: ₹25,000 | 3rd: ₹15,000',
        teamSize: 'group',
        minTeamSize: 4,
        maxTeamSize: 4,
        entryFee: {
          group: 600
        },
        coordinators: [
          { name: 'Aditya Rao', phone: '+91 98765 43219' },
          { name: 'Vivek Joshi', phone: '+91 98765 43220' }
        ],
        pptUrl: '/downloads/bgmi-tournament.pptx',
        venue: 'Gaming Arena',
        date: 'February 21',
        time: '10:00 AM onwards'
      },
      {
        id: 'chrysalis-2',
        name: 'FIFA Championship',
        description: 'Virtual football tournament',
        category: 'E-Sports',
        type: 'non-formal',
        rules: [
          'Individual or duo participation',
          'FIFA 23',
          '10-minute matches',
          'Knockout format',
          'Controllers provided'
        ],
        prizes: '1st: ₹15,000 | 2nd: ₹10,000 | 3rd: ₹5,000',
        teamSize: 'single',
        entryFee: {
          single: 150
        },
        coordinators: [
          { name: 'Siddharth Nair', phone: '+91 98765 43221' }
        ],
        pptUrl: '/downloads/fifa-championship.pptx',
        venue: 'Gaming Arena',
        date: 'February 21',
        time: '2:00 PM - 6:00 PM'
      },
      {
        id: 'chrysalis-3',
        name: 'Chess Championship',
        description: 'Classic strategy board game tournament',
        category: 'Mind Sports',
        type: 'formal',
        rules: [
          'Individual participation',
          'Rapid chess format',
          '15 minutes per player',
          'Swiss system tournament',
          'FIDE rules apply'
        ],
        prizes: '1st: ₹10,000 | 2nd: ₹6,000 | 3rd: ₹4,000',
        teamSize: 'single',
        entryFee: {
          single: 100
        },
        coordinators: [
          { name: 'Nisha Gupta', phone: '+91 98765 43222' }
        ],
        pptUrl: '/downloads/chess-championship.pptx',
        venue: 'Seminar Hall',
        date: 'February 21',
        time: '9:00 AM - 2:00 PM'
      }
    ]
  }
];

export function getEventById(eventId: string): MainEvent | undefined {
  return eventsData.find(event => event.id === eventId);
}

export function getSubEventById(eventId: string, subEventId: string): SubEvent | undefined {
  const event = getEventById(eventId);
  return event?.subEvents.find(subEvent => subEvent.id === subEventId);
}
