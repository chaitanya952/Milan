export interface SubEvent {
  id: string;
  name: string;
  category: string;
  description: string;
  icon?: string;
  teamSize: 'solo' | 'group';
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
  coordinators: {
    name: string;
    phone: string;
  }[];
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

export const eventsData: MainEvent[] = [
  {
    id: 'ignitron',
    name: 'Ignitron',
    title: 'IGNITRON',
    tagline: 'Ignite Your Entrepreneurial Spirit',
    description: 'Where innovation meets execution. Transform your ideas into reality.',
    summary: 'The ultimate entrepreneurship fest featuring startup pitches, business model challenges, and innovation workshops. Connect with investors, mentors, and fellow entrepreneurs to build the next big thing.',
    eventDate: 'February 18-19, 2026',
    icon: 'Lightbulb',
    color: 'neon-blue',
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    coverImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=600&fit=crop',
    upiQrCode: '/images/upi/ignitron-qr.png',
    googleFormUrl: 'https://forms.gle/ignitron2026',
    subEvents: [
      {
        id: 'ignitron-pitch',
        name: 'Startup Pitch Competition',
        category: 'Entrepreneurship',
        description: 'Present your startup idea to a panel of investors and win funding opportunities.',
        teamSize: 'group',
        minTeamSize: 2,
        maxTeamSize: 5,
        entryFee: { single: 0, group: 500 },
        prizes: '1st: ₹50,000 | 2nd: ₹30,000 | 3rd: ₹20,000',
        date: 'Feb 18, 2026',
        time: '10:00 AM - 4:00 PM',
        venue: 'Main Auditorium',
        rules: [
          'Team must have 2-5 members',
          'Pitch duration: 10 minutes + 5 minutes Q&A',
          'Bring a working prototype or detailed mockup',
          'Business plan must be submitted 24 hours before',
          'All members must be present during the pitch'
        ],
        coordinators: [
          { name: 'Arjun Reddy', phone: '+91 98765 43210' },
          { name: 'Priya Sharma', phone: '+91 98765 43211' }
        ]
      },
      {
        id: 'ignitron-case',
        name: 'Business Case Study',
        category: 'Entrepreneurship',
        description: 'Solve real-world business challenges and present strategic solutions.',
        teamSize: 'group',
        minTeamSize: 3,
        maxTeamSize: 4,
        entryFee: { single: 0, group: 300 },
        prizes: '1st: ₹20,000 | 2nd: ₹15,000 | 3rd: ₹10,000',
        date: 'Feb 19, 2026',
        time: '11:00 AM - 3:00 PM',
        venue: 'Conference Hall A',
        rules: [
          'Teams of 3-4 members',
          'Case study will be revealed on the spot',
          'Preparation time: 2 hours',
          'Presentation time: 15 minutes',
          'Use of laptops and internet allowed'
        ],
        coordinators: [
          { name: 'Karthik Rao', phone: '+91 98765 43212' }
        ]
      },
      {
        id: 'ignitron-hackathon',
        name: 'Innovation Hackathon',
        category: 'Entrepreneurship',
        description: '24-hour hackathon to build innovative solutions for social problems.',
        teamSize: 'group',
        minTeamSize: 2,
        maxTeamSize: 4,
        entryFee: { single: 0, group: 400 },
        prizes: '1st: ₹40,000 | 2nd: ₹25,000 | 3rd: ₹15,000',
        date: 'Feb 18-19, 2026',
        time: '9:00 AM (Day 1) - 9:00 AM (Day 2)',
        venue: 'Tech Lab',
        rules: [
          '24-hour continuous hackathon',
          'Problem statements will be given at the start',
          'All code must be original',
          'Any programming language/framework allowed',
          'Final demo and presentation required'
        ],
        coordinators: [
          { name: 'Sneha Patel', phone: '+91 98765 43213' }
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
    summary: 'A high-octane sports extravaganza featuring cricket, football, basketball, athletics, and more. Battle it out on the field, showcase your skills, and bring home the trophy in the ultimate test of physical excellence.',
    eventDate: 'February 19-20, 2026',
    icon: 'Trophy',
    color: 'neon-pink',
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    coverImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=600&fit=crop',
    upiQrCode: '/images/upi/kritansh-qr.png',
    subEvents: [
      {
        id: 'kritansh-cricket',
        name: 'Box Cricket Tournament',
        category: 'Sports',
        description: 'Fast-paced box cricket matches with exciting knockouts and finals.',
        teamSize: 'group',
        minTeamSize: 8,
        maxTeamSize: 12,
        entryFee: { single: 0, group: 1000 },
        prizes: '1st: ₹30,000 | 2nd: ₹20,000 | 3rd: ₹10,000',
        date: 'Feb 19, 2026',
        time: '8:00 AM - 6:00 PM',
        venue: 'Sports Arena',
        rules: [
          'Team of 8-12 players (8 playing + 4 substitutes)',
          '6 overs per innings',
          'Knockout format',
          'Standard cricket rules apply',
          'Team jerseys recommended'
        ],
        coordinators: [
          { name: 'Rahul Kumar', phone: '+91 98765 43220' },
          { name: 'Vikas Singh', phone: '+91 98765 43221' }
        ]
      },
      {
        id: 'kritansh-football',
        name: '5-a-Side Football',
        category: 'Sports',
        description: 'Intense 5-a-side football matches on turf with league and knockout stages.',
        teamSize: 'group',
        minTeamSize: 5,
        maxTeamSize: 8,
        entryFee: { single: 0, group: 800 },
        prizes: '1st: ₹25,000 | 2nd: ₹15,000 | 3rd: ₹8,000',
        date: 'Feb 20, 2026',
        time: '9:00 AM - 5:00 PM',
        venue: 'Football Turf',
        rules: [
          'Team of 5-8 players (5 playing + 3 substitutes)',
          'Two halves of 15 minutes each',
          'FIFA futsal rules modified for 5-a-side',
          'Proper football boots required',
          'Rolling substitutions allowed'
        ],
        coordinators: [
          { name: 'Aditya Menon', phone: '+91 98765 43222' }
        ]
      },
      {
        id: 'kritansh-basketball',
        name: '3x3 Basketball',
        category: 'Sports',
        description: 'FIBA 3x3 basketball tournament with rapid-fire games.',
        teamSize: 'group',
        minTeamSize: 3,
        maxTeamSize: 4,
        entryFee: { single: 0, group: 600 },
        prizes: '1st: ₹20,000 | 2nd: ₹12,000 | 3rd: ₹6,000',
        date: 'Feb 19, 2026',
        time: '10:00 AM - 4:00 PM',
        venue: 'Basketball Court',
        rules: [
          'Team of 3-4 players (3 playing + 1 substitute)',
          'First to 21 points or 10 minutes',
          'FIBA 3x3 official rules',
          'Shot clock: 12 seconds',
          'Half-court game'
        ],
        coordinators: [
          { name: 'Rohan Joshi', phone: '+91 98765 43223' }
        ]
      },
      {
        id: 'kritansh-athletics',
        name: 'Athletics Championship',
        category: 'Sports',
        description: 'Track and field events including sprints, relays, long jump, and more.',
        teamSize: 'solo',
        entryFee: { single: 200, group: 0 },
        prizes: '₹5,000 per event winner',
        date: 'Feb 20, 2026',
        time: '7:00 AM - 2:00 PM',
        venue: 'Athletic Track',
        rules: [
          'Individual participation in multiple events allowed',
          'Events: 100m, 200m, 400m, 4x100m relay, Long Jump, Shot Put',
          'Proper athletic wear required',
          'Timing will be electronic',
          'Top 3 in each event get medals'
        ],
        coordinators: [
          { name: 'Amit Verma', phone: '+91 98765 43224' }
        ]
      },
      {
        id: 'kritansh-badminton',
        name: 'Badminton Singles & Doubles',
        category: 'Sports',
        description: 'Fast-paced badminton tournament with singles and doubles categories.',
        teamSize: 'solo',
        entryFee: { single: 150, group: 0 },
        prizes: 'Singles: ₹8,000 | Doubles: ₹12,000',
        date: 'Feb 19, 2026',
        time: '8:00 AM - 6:00 PM',
        venue: 'Indoor Stadium',
        rules: [
          'Singles and doubles categories',
          'Best of 3 games to 21 points',
          'BWF rules apply',
          'Own racket required',
          'Knockout format'
        ],
        coordinators: [
          { name: 'Neha Gupta', phone: '+91 98765 43225' }
        ]
      }
    ]
  },
  {
    id: 'chrysalis',
    name: 'Chrysalis',
    title: 'CHRYSALIS',
    tagline: 'Metamorphosis of Talent',
    description: 'Where art meets soul. Express, perform, and shine.',
    summary: 'A spectacular cultural carnival celebrating dance, music, drama, fashion, and art. From classical to contemporary, from traditional to trendy - witness performances that transcend boundaries and touch hearts.',
    eventDate: 'February 20-21, 2026',
    icon: 'PartyPopper',
    color: 'neon-purple',
    gradient: 'from-purple-500 via-pink-500 to-rose-500',
    coverImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&h=600&fit=crop',
    upiQrCode: '/images/upi/chrysalis-qr.png',
    subEvents: [
      {
        id: 'chrysalis-solo-dance',
        name: 'Solo Dance Battle',
        category: 'Dance',
        description: 'Showcase your individual dancing prowess in any style - from classical to contemporary.',
        teamSize: 'solo',
        entryFee: { single: 200, group: 0 },
        prizes: '1st: ₹12,000 | 2nd: ₹8,000 | 3rd: ₹5,000',
        date: 'Feb 20, 2026',
        time: '2:00 PM - 6:00 PM',
        venue: 'Main Stage',
        rules: [
          'Performance duration: 3-5 minutes',
          'Any dance style allowed',
          'Own music track required (submit in advance)',
          'Props allowed but must be arranged by participant',
          'Costume is mandatory'
        ],
        coordinators: [
          { name: 'Ananya Das', phone: '+91 98765 43230' }
        ]
      },
      {
        id: 'chrysalis-group-dance',
        name: 'Group Dance Championship',
        category: 'Dance',
        description: 'Synchronize, energize, and mesmerize with your dance crew.',
        teamSize: 'group',
        minTeamSize: 6,
        maxTeamSize: 15,
        entryFee: { single: 0, group: 1000 },
        prizes: '1st: ₹40,000 | 2nd: ₹25,000 | 3rd: ₹15,000',
        date: 'Feb 21, 2026',
        time: '3:00 PM - 7:00 PM',
        venue: 'Main Stage',
        rules: [
          'Team size: 6-15 members',
          'Performance duration: 6-10 minutes',
          'Any style or fusion allowed',
          'Music track and choreography must be original',
          'Props and costumes recommended'
        ],
        coordinators: [
          { name: 'Riya Malhotra', phone: '+91 98765 43231' },
          { name: 'Aryan Kapoor', phone: '+91 98765 43232' }
        ]
      },
      {
        id: 'chrysalis-singing',
        name: 'Voice of MILAN',
        category: 'Music',
        description: 'Solo singing competition across multiple genres and languages.',
        teamSize: 'solo',
        entryFee: { single: 150, group: 0 },
        prizes: '1st: ₹10,000 | 2nd: ₹6,000 | 3rd: ₹4,000',
        date: 'Feb 20, 2026',
        time: '10:00 AM - 2:00 PM',
        venue: 'Music Hall',
        rules: [
          'Solo performance only',
          'Duration: 3-5 minutes',
          'Any language, any genre',
          'Karaoke track allowed (no live music)',
          'Prelims and finals rounds'
        ],
        coordinators: [
          { name: 'Kavya Nair', phone: '+91 98765 43233' }
        ]
      },
      {
        id: 'chrysalis-band',
        name: 'Battle of Bands',
        category: 'Music',
        description: 'Rock the stage with your band and original compositions.',
        teamSize: 'group',
        minTeamSize: 3,
        maxTeamSize: 8,
        entryFee: { single: 0, group: 1500 },
        prizes: '1st: ₹50,000 | 2nd: ₹30,000 | 3rd: ₹20,000',
        date: 'Feb 21, 2026',
        time: '6:00 PM - 10:00 PM',
        venue: 'Open Air Theater',
        rules: [
          'Band size: 3-8 members',
          'Performance time: 15-20 minutes',
          'Minimum 2 original compositions required',
          'Basic sound system provided',
          'Own instruments must be brought'
        ],
        coordinators: [
          { name: 'Kabir Mehta', phone: '+91 98765 43234' },
          { name: 'Shreya Iyer', phone: '+91 98765 43235' }
        ]
      },
      {
        id: 'chrysalis-fashion',
        name: 'Fashion Fiesta',
        category: 'Fashion',
        description: 'Walk the ramp and showcase your style, confidence, and creativity.',
        teamSize: 'solo',
        entryFee: { single: 300, group: 0 },
        prizes: 'Mr. & Ms. MILAN: ₹15,000 each | Runners: ₹8,000 each',
        date: 'Feb 21, 2026',
        time: '7:00 PM - 10:00 PM',
        venue: 'Grand Hall',
        rules: [
          'Individual participation',
          'Three rounds: Introduction, Talent, Q&A',
          'Traditional and western wear rounds',
          'Choreography and styling by participant',
          'Professional grooming required'
        ],
        coordinators: [
          { name: 'Isha Sharma', phone: '+91 98765 43236' }
        ]
      },
      {
        id: 'chrysalis-drama',
        name: 'Street Play Competition',
        category: 'Drama',
        description: 'Perform powerful social message through street theater.',
        teamSize: 'group',
        minTeamSize: 5,
        maxTeamSize: 12,
        entryFee: { single: 0, group: 800 },
        prizes: '1st: ₹25,000 | 2nd: ₹15,000 | 3rd: ₹10,000',
        date: 'Feb 20, 2026',
        time: '11:00 AM - 3:00 PM',
        venue: 'Central Plaza',
        rules: [
          'Team size: 5-12 members',
          'Duration: 8-12 minutes',
          'Social theme mandatory',
          'Minimal props allowed',
          'No microphones or sound system'
        ],
        coordinators: [
          { name: 'Rajat Khanna', phone: '+91 98765 43237' }
        ]
      },
      {
        id: 'chrysalis-standup',
        name: 'Stand-Up Comedy Night',
        category: 'Drama',
        description: 'Make the crowd roar with laughter in this stand-up comedy showdown.',
        teamSize: 'solo',
        entryFee: { single: 150, group: 0 },
        prizes: '1st: ₹8,000 | 2nd: ₹5,000 | 3rd: ₹3,000',
        date: 'Feb 21, 2026',
        time: '8:00 PM - 11:00 PM',
        venue: 'Comedy Club',
        rules: [
          'Solo performance',
          'Set duration: 5-7 minutes',
          'Original content only',
          'No offensive or explicit content',
          'English, Hindi, or regional languages allowed'
        ],
        coordinators: [
          { name: 'Aakash Jain', phone: '+91 98765 43238' }
        ]
      }
    ]
  }
];