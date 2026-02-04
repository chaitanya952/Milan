export interface Coordinator {
  name: string;
  phone: string;
}

export interface SubEvent {
  coordinators: Coordinator[];
  pptUrl: string; // Changed from 'any' to string since you're using string paths
  id: string;
  name: string;
  description: string;
  category: string;
  type: 'formal' | 'non-formal';
  rules: string[];
  prizes: string | string[]; // Made more flexible
  teamSize: 'single' | 'group';
  minTeamSize?: number;
  maxTeamSize?: number;
  entryFee: {
    single?: number;
    group?: number;
  };
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
  coordinator: {
    name: string;
    phone: string;
  };
  pptUrl: string;
  subEvents: SubEvent[];
  googleFormUrl?: string;
  upiQrCode: string;
}

export const eventsData: MainEvent[] = [
  {
    id: 'ignitron',
    name: 'Ignitron',
    title: 'IGNITRON',
    description: 'Technical Events Showcasing Innovation And Technology',
    summary:
      'Unleash your technical prowess through intense coding challenges, innovative hackathons, and electronics competitions. Ignitron is where brilliance meets technology!',
    tagline: 'Ignite Your Tech Spirit',
    eventDate: 'February 18, 2026',
    color: 'neon-blue',
    gradient: 'from-neon-blue to-neon-purple',
    icon: '💻',
    coordinator: {
      name: '',
      phone: '+91 98765 00001'
    },
    pptUrl: '/downloads/IGNITRON.pptx',
    googleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSffZ4GtQw9OBUJLqadW_b_r-WHs1_vN_E73bYMwDEpI3ynSQg/viewform?usp=dialog',
    upiQrCode: '/qr-codes/ignitron-upi.jpeg',
    subEvents: [
      {
        id: 'ignitron-1',
        name: 'Entrepreneurship',
        description: 'Entrepreneurship',
        category: 'Marketing',
        type: 'formal',
        rules: ['Team size: 2-5 members'],
        prizes: '50000 INR for the winning team',
        teamSize: 'group',
        minTeamSize: 2,
        maxTeamSize: 5,
        entryFee: { group: 1000 },
        venue: 'College Premises',
        date: 'February 18',
        time: '09:00 AM onwards',
        coordinators: [
    { name: 'G. ANUSREE', phone: '9502211025' },
    { name: 'T. SAI TEJA', phone: '8247507793' },
    { name: 'SRI VATSAVA', phone: '9392067800' }
  ], // Added missing coordinators array
        pptUrl: '/downloads/IGNITRON.pptx' // Added missing pptUrl
      },
      
    ]
  },
  {
    id: 'kritansh',
    name: 'Kritansh',
    title: 'KRITANSH',
    description: 'Cultural Events Celebrating Art Music And Performance',
    summary:
      'Express yourself through dance, music, and fashion. Kritansh celebrates the vibrant colors of culture and the rhythm of creativity!',
    tagline: 'Celebrate Creativity',
    eventDate: 'February 19-20, 2026',
    color: 'neon-pink',
    gradient: 'from-neon-pink to-neon-purple',
    icon: '🎭',
    coordinator: {
      name: 'Prof. Ananya Sharma',
      phone: '+91 98765 00002'
    },
    pptUrl: '/downloads/kritansh-details.pptx',
    upiQrCode: '/qr-codes/kritansh-upi.png',
    subEvents: [
      {
        id: 'kritansh-1',
        name: 'Badminton',
        description: 'Badminton',
        category: 'Sports',
        type: 'non-formal',
        rules: ['Solo or Doubles'],
        prizes: '22,000 INR',
        teamSize: 'group',
        minTeamSize: 2,
        entryFee: { single: 300, group: 600 },
        venue: 'College Premises',
        date: 'February 19',
        time: '9:00 AM - 7:00 PM',
        coordinators: [
    { name: 'G. ANUSREE', phone: '9502211025' },
    { name: 'T. SAI TEJA', phone: '8247507793' },
    { name: 'SRI VATSAVA', phone: '9392067800' }
  ], // Added missing coordinators array
        pptUrl: '' // Added missing pptUrl
      },
      {
        id: 'kritansh-2',
        name: 'Futsal',
        description: 'Futsal',
        category: 'Sports',
        type: 'non-formal',
        rules: ['Team size: 10 members'],
        prizes: '11,000 INR',
        teamSize: 'group',
        minTeamSize: 10,
        maxTeamSize: 10,
        entryFee: { group: 1500 },
        venue: 'College Premises',
        date: 'February 20',
        time: '5:00 PM onwards',
        coordinators: [
   { name: 'G. ANUSREE', phone: '9502211025' },
    { name: 'T. SAI TEJA', phone: '8247507793' },
    { name: 'SRI VATSAVA', phone: '9392067800' }
  ], // Added missing coordinators array
        pptUrl: '' // Added missing pptUrl
      },
      {
        id: 'kritansh-3',
        name: 'Cricket',
        description: 'Cricket',
        category: 'Sports',
        type: 'non-formal',
        rules: ['Team size: 11 members'],
        prizes: '22,500 INR',
        teamSize: 'group',
        minTeamSize: 11,
        maxTeamSize: 11,
        entryFee: { group: 3500 },
        venue: 'College Premises',
        date: 'February 19',
        time: '6:00 PM - 9:00 PM',
        coordinators: [
    { name: 'G. ANUSREE', phone: '9502211025' },
    { name: 'T. SAI TEJA', phone: '8247507793' },
    { name: 'SRI VATSAVA', phone: '9392067800' }
  ], // Added missing pptUrl
        pptUrl: '/downloads/kritansh-cricket.pptx'
      },
      {
        id: 'kritansh-4',
        name: 'Box Cricket For Women',
        description: 'Box Cricket For Women',
        category: 'Sports',
        type: 'non-formal',
        rules: ['Team size: 10 members'],
        prizes: '6,000 INR',
        teamSize: 'group',
        minTeamSize: 10,
        maxTeamSize: 10,
        entryFee: { group: 800 },
        venue: 'College Premises',
        date: 'February 19',
        time: '6:00 PM - 9:00 PM',
        coordinators: [
    { name: 'G. ANUSREE', phone: '9502211025' },
    { name: 'T. SAI TEJA', phone: '8247507793' },
    { name: 'SRI VATSAVA', phone: '9392067800' }
  ], // Added missing coordinators array
        pptUrl: '/downloads/kritansh-box-cricket-women.pptx' // Added missing pptUrl
      },
      {
        id: 'kritansh-5',
        name: 'Basketball For Men',
        description: 'Basketball For Men',
        category: 'Sports',
        type: 'non-formal',
        rules: ['Team size as per standard rules'],
        prizes: '15,000 INR',
        teamSize: 'group',
        maxTeamSize: 12,
        entryFee: { group: 1200 },
        venue: 'College Premises',
        date: 'February 19',
        time: '6:00 PM - 9:00 PM',
        coordinators: [
    { name: 'G. ANUSREE', phone: '9502211025' },
    { name: 'T. SAI TEJA', phone: '8247507793' },
    { name: 'SRI VATSAVA', phone: '9392067800' }
  ], // Added missing coordinators array
        pptUrl: '/downloads/kritansh-basketball-men.pptx' // Added missing pptUrl
      },
      {
        id: 'kritansh-6',
        name: 'Carroms',
        description: 'Carroms',
        category: 'Indoor Sports',
        type: 'non-formal',
        rules: ['Doubles format'],
        prizes: '3,000 INR',
        teamSize: 'group',
        minTeamSize: 2,
        maxTeamSize: 2,
        entryFee: { group: 500 },
        venue: 'College Premises',
        date: 'February 19',
        time: '6:00 PM - 9:00 PM',
        coordinators: [
    { name: 'G. ANUSREE', phone: '9502211025' },
    { name: 'T. SAI TEJA', phone: '8247507793' },
    { name: 'SRI VATSAVA', phone: '9392067800' }
  ], // Added missing coordinators array
        pptUrl: '/downloads/kritansh-carroms.pptx' // Added missing pptUrl
      },
      {
        id: 'kritansh-7',
        name: 'Chess',
        description: 'Chess',
        category: 'Indoor Sports',
        type: 'non-formal',
        rules: ['Individual participation'],
        prizes: '2,500 INR',
        teamSize: 'single',
        entryFee: { single: 300 },
        venue: 'College Premises',
        date: 'February 19',
        time: '6:00 PM - 9:00 PM',
        coordinators: [
    { name: 'G. ANUSREE', phone: '9502211025' },
    { name: 'T. SAI TEJA', phone: '8247507793' },
    { name: 'SRI VATSAVA', phone: '9392067800' }
  ], // Added missing coordinators array
        pptUrl: '/downloads/kritansh-chess.pptx' // Added missing pptUrl
      }
    ]
  },
  {
    id: 'chrysalis',
    name: 'Chrysalis',
    title: 'CHRYSALIS',
    description: 'Gaming And Sports Events For The Competitive Spirit',
    summary:
      'Transform into a champion through intense gaming battles and strategic competitions. Chrysalis is where legends are born!',
    tagline: 'Transform Through Competition',
    eventDate: 'February 21, 2026',
    color: 'neon-green',
    gradient: 'from-neon-green to-neon-blue',
    icon: '🎮',
    coordinator: {
      name: 'Dr. B. Amarnath Reddy',
      phone: '+91 77996 39977'
    },
    pptUrl: '/downloads/chrysalis-details.pptx',
    upiQrCode: '/qr-codes/chrysalis-upi.png',
    subEvents: [
      {
        id: 'chrysalis-1',
        name: 'Marketing Mad',
        description: 'Mad',
        category: 'Mind Sports',
        type: 'formal',
        rules: ['Team size: 2-3 members'],
        prizes: '1st: ₹40,000 | 2nd: ₹25,000 | 3rd: ₹15,000',
        teamSize: 'group',
        minTeamSize: 2,
        maxTeamSize: 3,
        entryFee: { group: 200 },
        venue: 'Gaming Arena',
        date: 'February 21',
        time: '10:00 AM onwards',
        coordinators: [
  { "name": "SAI PRANEETH", "phone": "+91 7993931713" },
  { "name": "CHARAN", "phone": "+91 9949162851" },
  { "name": "ANNIKA", "phone": "+91 9618682968" },
  { "name": "HARSHITHA", "phone": "+91 8712143102" }
  ], // Added missing coordinators array
        pptUrl: '/downloads/chrysalis-marketing-mad.pptx' // Added missing pptUrl
      },
      {
        id: 'chrysalis-2',
        name: 'Optimops',
        description: 'Optimops',
        category: 'E-Sports',
        type: 'formal',
        rules: ['Individual participation'],
        prizes: '1st: ₹15,000 | 2nd: ₹10,000 | 3rd: ₹5,000',
        teamSize: 'single',
        entryFee: { single: 200 },
        venue: 'Gaming Arena',
        date: 'February 21',
        time: '2:00 PM - 6:00 PM',
        coordinators: [
     { "name": "SAI PRANEETH", "phone": "+91 7993931713" },
  { "name": "CHARAN", "phone": "+91 9949162851" },
  { "name": "ANNIKA", "phone": "+91 9618682968" },
  { "name": "HARSHITHA", "phone": "+91 8712143102" }
  ], // Added missing coordinators array
        pptUrl: '/downloads/chrysalis-optimops.pptx' // Added missing pptUrl
      },
      {
        id: 'chrysalis-3',
        name: 'Humaneer',
        description: 'Humaneer',
        category: 'Mind Sports',
        type: 'formal',
        rules: ['Team size: 2-3 members'],
        prizes: '1st: ₹10,000 | 2nd: ₹6,000 | 3rd: ₹4,000',
        teamSize: 'group',
        minTeamSize: 2,
        maxTeamSize: 3,
        entryFee: { group: 200 },
        venue: 'Seminar Hall',
        date: 'February 21',
        time: '9:00 AM - 2:00 PM',
        coordinators: [
    { name: 'G. ANUSREE', phone: '9502211025' },
    { name: 'T. SAI TEJA', phone: '8247507793' },
    { name: 'SRI VATSAVA', phone: '9392067800' }
  ], // Added missing coordinators array
        pptUrl: '/downloads/chrysalis-humaneer.pptx' // Added missing pptUrl
      },
      {
        id: 'chrysalis-4',
        name: 'Finfunda',
        description: 'Finfunda',
        category: 'Finance',
        type: 'formal',
        rules: ['Team size: 3-5 members'],
        prizes: '1st: ₹10,000 | 2nd: ₹6,000 | 3rd: ₹4,000',
        teamSize: 'group',
        minTeamSize: 3,
        maxTeamSize: 5,
        entryFee: { group: 200 },
        venue: 'Seminar Hall',
        date: 'February 21',
        time: '9:00 AM - 2:00 PM',
        coordinators: [
    { name: 'G. ANUSREE', phone: '9502211025' },
    { name: 'T. SAI TEJA', phone: '8247507793' },
    { name: 'SRI VATSAVA', phone: '9392067800' }
  ],// Added missing coordinators array
        pptUrl: '/downloads/chrysalis-finfunda.pptx' // Added missing pptUrl
      },
      {
        id: 'chrysalis-5',
        name: 'Singing Battle',
        description: 'Singing Battle',
        category: 'Performing Arts',
        type: 'non-formal',
        rules: ['Solo or Group up to 4 members'],
        prizes: '1st: ₹10,000 | 2nd: ₹6,000 | 3rd: ₹4,000',
        teamSize: 'single',
        entryFee: { single: 250 },
        venue: 'Seminar Hall',
        date: 'February 21',
        time: '9:00 AM - 2:00 PM',
        coordinators: [
     { "name": "SAI PRANEETH", "phone": "+91 7993931713" },
  { "name": "CHARAN", "phone": "+91 9949162851" },
  { "name": "ANNIKA", "phone": "+91 9618682968" },
  { "name": "HARSHITHA", "phone": "+91 8712143102" }
  ], // Added missing coordinators array
        pptUrl: '/downloads/chrysalis-singing-battle.pptx' // Added missing pptUrl
      },
      {
        id: 'chrysalis-6',
        name: 'Dancing Battle',
        description: 'Dancing Battle',
        category: 'Performing Arts',
        type: 'non-formal',
        rules: ['Solo performance'],
        prizes: '1st: ₹10,000 | 2nd: ₹6,000 | 3rd: ₹4,000',
        teamSize: 'single',
        entryFee: { single: 200 },
        venue: 'Seminar Hall',
        date: 'February 21',
        time: '9:00 AM - 2:00 PM',
        coordinators: [
     { "name": "SAI PRANEETH", "phone": "+91 7993931713" },
  { "name": "CHARAN", "phone": "+91 9949162851" },
  { "name": "ANNIKA", "phone": "+91 9618682968" },
  { "name": "HARSHITHA", "phone": "+91 8712143102" }
  ], // Added missing coordinators array
        pptUrl: '/downloads/chrysalis-dancing-battle.pptx' // Added missing pptUrl
      },
      {
        id: 'chrysalis-7',
        name: 'Dancing Group',
        description: 'Dancing Group',
        category: 'Performing Arts',
        type: 'non-formal',
        rules: ['Team size: 3-8 members'],
        prizes: '', // Added missing prizes field
        teamSize: 'group',
        minTeamSize: 3,
        maxTeamSize: 8,
        entryFee: { group: 600 },
        venue: 'Seminar Hall',
        date: 'February 21',
        time: '9:00 AM - 2:00 PM',
        coordinators: [
    { name: 'G. ANUSREE', phone: '9502211025' },
    { name: 'T. SAI TEJA', phone: '8247507793' },
    { name: 'SRI VATSAVA', phone: '9392067800' }
  ], // Added missing coordinators array
        pptUrl: '/downloads/chrysalis-dancing-group.pptx' // Added missing pptUrl
      },
      {
        id: 'chrysalis-8',
        name: 'Ramp Walk',
        description: 'Ramp Walk',
        category: 'Fashion',
        type: 'non-formal',
        rules: ['Individual participation'],
        prizes: '', // Added missing prizes field
        teamSize: 'single',
        entryFee: { single: 150 },
        venue: 'Seminar Hall',
        date: 'February 21',
        time: '9:00 AM - 2:00 PM',
        coordinators: [
    { name: 'G. ANUSREE', phone: '9502211025' },
    { name: 'T. SAI TEJA', phone: '8247507793' },
    { name: 'SRI VATSAVA', phone: '9392067800' }
  ], // Added missing coordinators array
        pptUrl: '/downloads/chrysalis-ramp-walk.pptx' // Added missing pptUrl
      },
      {
        id: 'chrysalis-9',
        name: 'Painting Competition',
        description: 'Painting Competition',
        category: 'Visual Arts',
        type: 'non-formal',
        rules: ['Individual participation'],
        prizes: '', // Added missing prizes field
        teamSize: 'single',
        entryFee: { single: 200 },
        venue: 'Seminar Hall',
        date: 'February 21',
        time: '9:00 AM - 2:00 PM',
        coordinators: [
     { "name": "SAI PRANEETH", "phone": "+91 7993931713" },
  { "name": "CHARAN", "phone": "+91 9949162851" },
  { "name": "ANNIKA", "phone": "+91 9618682968" },
  { "name": "HARSHITHA", "phone": "+91 8712143102" }
  ],// Added missing coordinators array
        pptUrl: '/downloads/chrysalis-painting-competition.pptx' // Added missing pptUrl
      },
      {
        id: 'chrysalis-10',
        name: 'Treasure Hunt',
        description: 'Treasure Hunt',
        category: 'Mind Sports',
        type: 'formal',
        rules: ['Team size: 3-5 members'],
        prizes: '', // Added missing prizes field
        teamSize: 'group',
        minTeamSize: 3,
        maxTeamSize: 5,
        entryFee: { group: 500 },
        venue: 'Seminar Hall',
        date: 'February 21',
        time: '9:00 AM - 2:00 PM',
       coordinators: [
    { name: 'G. ANUSREE', phone: '9502211025' },
    { name: 'T. SAI TEJA', phone: '8247507793' },
    { name: 'SRI VATSAVA', phone: '9392067800' }
  ], // Added missing coordinators array
        pptUrl: '/downloads/chrysalis-treasure-hunt.pptx' // Added missing pptUrl
      },
      {
        id: 'chrysalis-11',
        name: 'Treasure Hunt Individual',
        description: 'Treasure Hunt Individual',
        category: 'Mind Sports',
        type: 'non-formal',
        rules: ['Individual participation'],
        prizes: '', // Added missing prizes field
        teamSize: 'single',
        entryFee: { single: 100 },
        venue: 'Seminar Hall',
        date: 'February 21',
        time: '9:00 AM - 2:00 PM',
        coordinators: [
    { name: 'G. ANUSREE', phone: '9502211025' },
    { name: 'T. SAI TEJA', phone: '8247507793' },
    { name: 'SRI VATSAVA', phone: '9392067800' }
  ], // Added missing coordinators array
        pptUrl: '/downloads/chrysalis-treasure-hunt-individual.pptx' // Added missing pptUrl
      },
      {
        id: 'chrysalis-12',
        name: 'Photography Competition',
        description: 'Photography Competition',
        category: 'Visual Arts',
        type: 'non-formal',
        rules: ['Individual participation'],
        prizes: '', // Added missing prizes field
        teamSize: 'single',
        entryFee: { single: 200 },
        venue: 'Seminar Hall',
        date: 'February 21',
        time: '9:00 AM - 2:00 PM',
        coordinators: [
    { name: 'G. ANUSREE', phone: '9502211025' },
    { name: 'T. SAI TEJA', phone: '8247507793' },
    { name: 'SRI VATSAVA', phone: '9392067800' }
  ], // Added missing coordinators array
        pptUrl: '/downloads/chrysalis-photography-competition.pptx' // Added missing pptUrl
      }
    ]
  }
];

export function getEventById(eventId: string): MainEvent | undefined {
  return eventsData.find(event => event.id === eventId);
}

export function getSubEventById(
  eventId: string,
  subEventId: string
): SubEvent | undefined {
  const event = getEventById(eventId);
  return event?.subEvents.find(subEvent => subEvent.id === subEventId);
}