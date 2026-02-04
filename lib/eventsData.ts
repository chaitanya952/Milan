// Event Data Types
export interface Coordinator {
  name: string;
  phone: string;
}

export interface SubEvent {
  id: string;
  name: string;
  category: string;
  description: string;
  icon?: string;
  teamSize: 'solo' | 'group' | 'solo/duo/group';
  minTeamSize?: number;
  maxTeamSize?: number;
  entryFee: {
    single: number;
    group: number;
  };
  prizes: string | string[];
  date: string;
  time: string;
  venue: string;
  rules: string[];
  coordinators: Coordinator[];
  pptUrl?: string;
}

export interface MainEvent {
  id: string;
  name: string;
  title: string;
  tagline: string;
  description: string;
  summary: string;
  eventDate: string;
  icon: string;
  color: string;
  gradient: string;
  coverImage: string;
  upiQrCode: string;
  googleFormUrl?: string;
  subEvents: SubEvent[];
}

// Event Data
export const eventsData: MainEvent[] = [
  {
    id: 'ignitron',
    name: 'Ignitron',
    title: 'IGNITRON',
    tagline: 'Where Business Ideas Take the Spotlight',
    description: 'Ignitron is a stage for bold thinkers and future entrepreneurs to bring their business ideas to life. It\'s not about slides or theory — it\'s about vision, clarity, and impact. If you have an idea that deserves to be heard, Ignitron is your moment.',
    summary: 'Ignitron is a stage for bold thinkers and future entrepreneurs to bring their business ideas to life. It\'s not about slides or theory — it\'s about vision, clarity, and impact.',
    eventDate: 'February 14-21, 2026',
    icon: '💡',
    color: 'blue-500',
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    coverImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=600&fit=crop',
    upiQrCode: '/public/qr-codes/ignitron-upi.jpeg',
    
    subEvents: [
      {
        id: 'ignitron-entrepreneurship',
        name: 'Entrepreneurship',
        category: 'Business',
        description: 'Present your startup idea to a panel of investors and industry experts. Showcase your vision, clarity, and impact.',
        teamSize: 'group',
        minTeamSize: 1,
        maxTeamSize: 5,
        entryFee: { single: 0, group: 0 },
        prizes: 'Prize Pool: ₹50,000',
        date: 'Feb 14-21, 2026',
        time: '9:00 AM',
        venue: 'On Campus',
        rules: [
          'Team size: 1-5 members',
          'Present your business idea with vision and clarity',
          'Focus on impact, not just slides',
          'Bring your bold thinking and entrepreneurial spirit',
          'All team members must be present during presentation'
        ],
        pptUrl: '/public/downloads/IGNITRON.pptx',
        coordinators: [
           {
      "name": "G. Anusree",
      "phone": "9502211025"
    },
    {
      "name": "T. Sai Teja",
      "phone": "8247507793"
    },
    {
      "name": "Sri Vatsava",
      "phone": "9392067800"
    }
        ]
      }
    ]
  },
  {
    id: 'kritansh',
    name: 'Kritansh',
    title: 'KRITANSH',
    tagline: 'Unleash Your Athletic Prowess',
    description: 'Where champions are made. Compete, conquer, and claim glory.',
    summary: 'A high-octane sports extravaganza featuring cricket, football, basketball, athletics, and more. Battle it out on the field, showcase your skills, and bring home the trophy.',
    eventDate: 'February 14-21, 2026',
    icon: '🏆',
    color: 'pink-500',
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    coverImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=600&fit=crop',
    upiQrCode: '/public/qr-codes/Kritansh.png',
    subEvents: [
      {
        id: 'kritansh-cricket',
        name: 'Cricket (Men)',
        category: 'Sports',
        description: 'Fast-paced cricket matches with exciting knockouts and finals.',
        teamSize: 'group',
        minTeamSize: 11,
        maxTeamSize: 15,
        entryFee: { single: 0, group: 1000 },
        prizes: '1st: ₹30,000 | 2nd: ₹20,000 | 3rd: ₹10,000',
        date: 'Feb 14-21, 2026',
        time: '9:00 AM',
        venue: 'Sports Arena',
        rules: [
          'Team of 11-15 players',
          'Knockout format',
          'Standard cricket rules apply',
          'Team jerseys recommended',
          'All equipment must be approved'
        ],
        
        coordinators: [
          { name: 'Coordinator 1', phone: '+91 XXXXXXXXXX' },
          { name: 'Coordinator 2', phone: '+91 XXXXXXXXXX' }
        ],
        pptUrl: '/public/downloads/Kritansh.pdf',
      },
      {
        id: 'kritansh-cricket-women',
        name: 'Box Cricket (Women)',
        category: 'Sports',
        description: 'Fast-paced box cricket tournament for women teams.',
        teamSize: 'group',
        minTeamSize: 8,
        maxTeamSize: 12,
        entryFee: { single: 0, group: 800 },
        prizes: '1st: ₹20,000 | 2nd: ₹12,000 | 3rd: ₹8,000',
        date: 'Feb 14-21, 2026',
        time: '9:00 AM',
        venue: 'Sports Arena',
        rules: [
          'Team of 8-12 players',
          '6 overs per innings',
          'Knockout format',
          'Box cricket rules apply',
          'Team jerseys recommended'
        ],
        coordinators: [
           {
      "name": "G. Anusree",
      "phone": "9502211025"
    },
    {
      "name": "T. Sai Teja",
      "phone": "8247507793"
    },
    {
      "name": "Sri Vatsava",
      "phone": "9392067800"
    }
        ],
        pptUrl: '/public/downloads/Kritansh.pdf',
      },
      {
        id: 'kritansh-futsal',
        name: 'Futsal',
        category: 'Sports',
        description: 'Intense futsal matches with league and knockout stages.',
        teamSize: 'group',
        minTeamSize: 5,
        maxTeamSize: 8,
        entryFee: { single: 0, group: 800 },
        prizes: '1st: ₹25,000 | 2nd: ₹15,000 | 3rd: ₹8,000',
        date: 'Feb 14-21, 2026',
        time: '9:00 AM',
        venue: 'Football Turf',
        rules: [
          'Team of 5-8 players',
          'Two halves of 10 minutes each',
          'FIFA futsal rules',
          'Proper football boots required',
          'Rolling substitutions allowed'
        ],
        coordinators: [
           {
      "name": "G. Anusree",
      "phone": "9502211025"
    },
    {
      "name": "T. Sai Teja",
      "phone": "8247507793"
    },
    {
      "name": "Sri Vatsava",
      "phone": "9392067800"
    }
        ],
        pptUrl: '/public/downloads/Kritansh.pdf',
      },
      {
        id: 'kritansh-basketball',
        name: 'Basketball',
        category: 'Sports',
        description: 'Basketball tournament with rapid-fire games.',
        teamSize: 'group',
        minTeamSize: 5,
        maxTeamSize: 9,
        entryFee: { single: 0, group: 600 },
        prizes: '1st: ₹20,000 | 2nd: ₹12,000 | 3rd: ₹6,000',
        date: 'Feb 14-21, 2026',
        time: '9:00 AM',
        venue: 'Basketball Court',
        rules: [
          'Team of 5-9 players',
          'Two halves of 10 minutes each',
          'Standard basketball rules',
          'Own jerseys recommended',
          'Proper basketball shoes required'
        ],
        coordinators: [
           {
      "name": "G. Anusree",
      "phone": "9502211025"
    },
    {
      "name": "T. Sai Teja",
      "phone": "8247507793"
    },
    {
      "name": "Sri Vatsava",
      "phone": "9392067800"
    }
        ],
        pptUrl: '/public/downloads/Kritansh.pdf',
      },
      {
        id: 'kritansh-badminton',
        name: 'Badminton',
        category: 'Sports',
        description: 'Badminton tournament with singles and doubles categories.',
        teamSize: 'solo',
        entryFee: { single: 300, group: 600 },
        prizes: 'Singles: ₹8,000 | Doubles: ₹12,000',
        date: 'Feb 14-21, 2026',
        time: '9:00 AM',
        venue: 'Indoor Stadium',
        rules: [
          'Singles: ₹300 per person',
          'Doubles: ₹600 per team',
          'Best of 3 games to 21 points',
          'BWF rules apply',
          'Own racket required'
        ],
        coordinators: [
          {
      "name": "G. Anusree",
      "phone": "9502211025"
    },
    {
      "name": "T. Sai Teja",
      "phone": "8247507793"
    },
    {
      "name": "Sri Vatsava",
      "phone": "9392067800"
    }
        ],
        pptUrl: '/public/downloads/Kritansh.pdf',
      },
      {
        id: 'kritansh-carrom',
        name: 'Carrom',
        category: 'Indoor Sports',
        description: 'Single format carrom tournament.',
        teamSize: 'solo',
        entryFee: { single: 150, group: 0 },
        prizes: '1st: ₹5,000 | 2nd: ₹3,000 | 3rd: ₹2,000',
        date: 'Feb 14-21, 2026',
        time: '9:00 AM',
        venue: 'Indoor Games Room',
        rules: [
          'Single player format',
          'Standard carrom rules',
          'Knockout tournament',
          'Best of 3 boards',
          'All equipment provided'
        ],
        coordinators: [
          {
      "name": "G. Anusree",
      "phone": "9502211025"
    },
    {
      "name": "T. Sai Teja",
      "phone": "8247507793"
    },
    {
      "name": "Sri Vatsava",
      "phone": "9392067800"
    }
        ],
        pptUrl: '/public/downloads/Kritansh.pdf',
      },
      {
        id: 'kritansh-chess',
        name: 'Chess',
        category: 'Indoor Sports',
        description: 'Strategic chess tournament.',
        teamSize: 'solo',
        entryFee: { single: 150, group: 0 },
        prizes: '1st: ₹5,000 | 2nd: ₹3,000 | 3rd: ₹2,000',
        date: 'Feb 14-21, 2026',
        time: '9:00 AM',
        venue: 'Indoor Games Room',
        rules: [
          'Individual participation',
          'Standard FIDE rules',
          'Time control will be announced',
          'Bring your own clock if available',
          'Tournament format: Swiss/Knockout'
        ],
        coordinators: [
           {
      "name": "G. Anusree",
      "phone": "9502211025"
    },
    {
      "name": "T. Sai Teja",
      "phone": "8247507793"
    },
    {
      "name": "Sri Vatsava",
      "phone": "9392067800"
    }
        ],
        pptUrl: '/public/downloads/Kritansh.pdf',
      },
      {
        id: 'kritansh-bgmi',
        name: 'BGMI',
        category: 'E-Sports',
        description: 'Battlegrounds Mobile India tournament.',
        teamSize: 'group',
        minTeamSize: 4,
        maxTeamSize: 5,
        entryFee: { single: 0, group: 500 },
        prizes: '1st: ₹15,000 | 2nd: ₹10,000 | 3rd: ₹5,000',
        date: 'Feb 14-21, 2026',
        time: '9:00 AM',
        venue: 'E-Sports Arena',
        rules: [
          'Squad format (4-5 players)',
          'Latest BGMI version required',
          'Own devices required',
          'Standard BGMI tournament rules',
          'Fair play policy strictly enforced'
        ],
        coordinators: [
           {
      "name": "G. Anusree",
      "phone": "9502211025"
    },
    {
      "name": "T. Sai Teja",
      "phone": "8247507793"
    },
    {
      "name": "Sri Vatsava",
      "phone": "9392067800"
    }
        ],
        pptUrl: '/public/downloads/Kritansh.pdf',
      },
      {
        id: 'kritansh-throwball',
        name: 'Throwball',
        category: 'Sports',
        description: 'Throwball tournament with team competition.',
        teamSize: 'group',
        minTeamSize: 7,
        maxTeamSize: 12,
        entryFee: { single: 0, group: 600 },
        prizes: '1st: ₹15,000 | 2nd: ₹10,000 | 3rd: ₹5,000',
        date: 'Feb 14-21, 2026',
        time: '9:00 AM',
        venue: 'Sports Ground',
        rules: [
          'Team of 7-12 players',
          'Standard throwball rules',
          'Best of 3 sets',
          'Team jerseys recommended',
          'All equipment provided'
        ],
        coordinators: [
           {
      "name": "G. Anusree",
      "phone": "9502211025"
    },
    {
      "name": "T. Sai Teja",
      "phone": "8247507793"
    },
    {
      "name": "Sri Vatsava",
      "phone": "9392067800"
    }
        ],
        pptUrl: '/public/downloads/Kritansh.pdf',
      },
      {
        id: 'kritansh-kabaddi',
        name: 'Kabaddi',
        category: 'Sports',
        description: 'Traditional kabaddi tournament.',
        teamSize: 'group',
        minTeamSize: 7,
        maxTeamSize: 12,
        entryFee: { single: 0, group: 700 },
        prizes: '1st: ₹20,000 | 2nd: ₹12,000 | 3rd: ₹8,000',
        date: 'Feb 14-21, 2026',
        time: '9:00 AM',
        venue: 'Kabaddi Court',
        rules: [
          'Team of 7-12 players',
          'Standard kabaddi rules',
          'Two halves of 20 minutes each',
          'Team jerseys required',
          'All safety equipment mandatory'
        ],
        coordinators: [
          {
      "name": "G. Anusree",
      "phone": "9502211025"
    },
    {
      "name": "T. Sai Teja",
      "phone": "8247507793"
    },
    {
      "name": "Sri Vatsava",
      "phone": "9392067800"
    }
        ],
        pptUrl: '/public/downloads/Kritansh.pdf',
      },
      {
        id: 'kritansh-volleyball',
        name: 'Volleyball',
        category: 'Sports',
        description: 'Volleyball tournament with team competition.',
        teamSize: 'group',
        minTeamSize: 6,
        maxTeamSize: 12,
        entryFee: { single: 0, group: 700 },
        prizes: '1st: ₹20,000 | 2nd: ₹12,000 | 3rd: ₹8,000',
        date: 'Feb 14-21, 2026',
        time: '9:00 AM',
        venue: 'Volleyball Court',
        rules: [
          'Team of 6-12 players',
          'Standard volleyball rules',
          'Best of 5 sets',
          'Team jerseys recommended',
          'All equipment provided'
        ],
        coordinators: [
          {
      "name": "G. Anusree",
      "phone": "9502211025"
    },
    {
      "name": "T. Sai Teja",
      "phone": "8247507793"
    },
    {
      "name": "Sri Vatsava",
      "phone": "9392067800"
    }
        ],
        pptUrl: '/public/downloads/Kritansh.pdf',
      }
    ]
  },
  {
    id: 'chrysalis',
    name: 'Chrysalis',
    title: 'CHRYSALIS',
    tagline: 'Metamorphosis of Talent',
    description: 'Where art meets soul. Express, perform, and shine.',
    summary: 'A spectacular cultural carnival celebrating dance, music, drama, fashion, and art. From classical to contemporary, witness performances that transcend boundaries and touch hearts.',
    eventDate: 'February 14-21, 2026',
    icon: '🎭',
    color: 'purple-500',
    gradient: 'from-purple-500 via-pink-500 to-rose-500',
    coverImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&h=600&fit=crop',
    upiQrCode: '/images/upi/chrysalis-qr.png',
    subEvents: [
      {
        id: 'chrysalis-group-dance',
        name: 'Group Dance',
        category: 'Dance',
        description: 'Synchronize, energize, and mesmerize with your dance crew.',
        teamSize: 'group',
        minTeamSize: 6,
        maxTeamSize: 15,
        entryFee: { single: 0, group: 500 },
        prizes: '1st: ₹40,000 | 2nd: ₹25,000 | 3rd: ₹15,000',
        date: 'Feb 14-21, 2026',
        time: '9:00 AM',
        venue: 'On Campus',
        rules: [
          'Team size: 6-15 members',
          'Performance duration: 6-10 minutes',
          'Any style or fusion allowed',
          'Music track and choreography must be original',
          'Props and costumes recommended'
        ],
        coordinators: [
          {
      "name": "Charan",
      "phone": "9949162851"
    },
    {
      "name": "Annika",
      "phone": "9618682968"
    },
        ]
      },
      {
        id: 'chrysalis-singing',
        name: 'Singing',
        category: 'Music',
        description: 'Solo, duo, or group singing competition across multiple genres.',
        teamSize: 'solo/duo/group',
        minTeamSize: 1,
        maxTeamSize: 4,
        entryFee: { single: 200, group: 200 },
        prizes: '1st: ₹10,000 | 2nd: ₹6,000 | 3rd: ₹4,000',
        date: 'Feb 14-21, 2026',
        time: '9:00 AM',
        venue: 'On Campus',
        rules: [
          'Solo/Duo/Group (up to 4 members)',
          '₹200 per head',
          'Duration: 3-5 minutes',
          'Any language, any genre',
          'Karaoke track allowed'
        ],
        coordinators: [
         {
      "name": "Charan",
      "phone": "9949162851"
    },
    {
      "name": "Annika",
      "phone": "9618682968"
    },
        ],
        pptUrl: '/public/downloads/Chrysalis.pptx',
      },
      {
        id: 'chrysalis-rampwalk',
        name: 'Ramp Walk',
        category: 'Fashion',
        description: 'Walk the ramp and showcase your style, confidence, and creativity.',
        teamSize: 'solo',
        entryFee: { single: 100, group: 0 },
        prizes: 'Mr. & Ms. MILAN: ₹15,000 each | Runners: ₹8,000 each',
        date: 'Feb 14-21, 2026',
        time: '9:00 AM',
        venue: 'On Campus',
        rules: [
          '₹100 per head',
          'Individual participation',
          'Three rounds: Introduction, Talent, Q&A',
          'Traditional and western wear rounds',
          'Professional grooming required'
        ],
        coordinators: [
         {
      "name": "Charan",
      "phone": "9949162851"
    },
    {
      "name": "Annika",
      "phone": "9618682968"
    },
        ],
        pptUrl: '/public/downloads/Chrysalis.pptx',
      },
      {
        id: 'chrysalis-treasurehunt',
        name: 'Treasure Hunt',
        category: 'Adventure',
        description: 'An exciting treasure hunt adventure across campus.',
        teamSize: 'group',
        minTeamSize: 3,
        maxTeamSize: 5,
        entryFee: { single: 0, group: 500 },
        prizes: '1st: ₹15,000 | 2nd: ₹10,000 | 3rd: ₹5,000',
        date: 'Feb 14-21, 2026',
        time: '9:00 AM',
        venue: 'On Campus',
        rules: [
          'Team of 3-5 members only',
          '₹500 per team',
          'Follow all clues and checkpoints',
          'No use of vehicles',
          'Complete all challenges within time limit'
        ],
        coordinators: [
          {
      "name": "Charan",
      "phone": "9949162851"
    },
    {
      "name": "Annika",
      "phone": "9618682968"
    },
        ],
        pptUrl: '/public/downloads/Chrysalis.pptx',
      },
      {
        id: 'chrysalis-optimops',
        name: 'Operations (OPTIMOPS)',
        category: 'Business',
        description: 'Operations management and optimization challenge.',
        teamSize: 'group',
        minTeamSize: 2,
        maxTeamSize: 3,
        entryFee: { single: 0, group: 300 },
        prizes: '1st: ₹15,000 | 2nd: ₹10,000 | 3rd: ₹5,000',
        date: 'Feb 14-21, 2026',
        time: '9:00 AM',
        venue: 'On Campus',
        rules: [
          'Team of 2-3 members',
          'Operations and supply chain challenges',
          'Case study based competition',
          'Presentation required',
          'Time-bound problem solving'
        ],
        coordinators: [
           {
      "name": "Sai Praneeth",
      "phone": "7993931713"
    },
         {
      "name": "Harshitha",
      "phone": "8712143102"
    }
        ],
        pptUrl: '/public/downloads/Chrysalis.pptx',
      }
    ]
  }
];

// Helper Functions
export function getEventById(id: string): MainEvent | undefined {
  return eventsData.find(event => event.id === id);
}

export function getAllEvents(): MainEvent[] {
  return eventsData;
}

export function getSubEventById(eventId: string, subEventId: string): SubEvent | undefined {
  const event = getEventById(eventId);
  return event?.subEvents.find(subEvent => subEvent.id === subEventId);
}