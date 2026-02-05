// Icon mapping for different event types
export const eventIconMap: { [key: string]: string } = {
  // Entrepreneurship Events (Ignitron)
  'Startup Pitch Competition': 'Lightbulb',
  'Business Case Study': 'BriefcaseBusiness',
  'Innovation Hackathon': 'Laptop',
  'Pitch Competition': 'Presentation',
  'Case Study': 'FileText',
  'Hackathon': 'Code2',
  'Business Plan': 'ClipboardList',
  'Entrepreneurship': 'TrendingUp',
  
  // Sports Events (Kritansh)
  'Box Cricket Tournament': 'Target',
  'Cricket': 'Target',
  '5-a-Side Football': 'Football',
  'Football': 'Football',
  '3x3 Basketball': 'CircleDot',
  'Basketball': 'CircleDot',
  'Athletics Championship': 'Footprints',
  'Athletics': 'Zap',
  'Badminton Singles & Doubles': 'Wind',
  'Badminton': 'Wind',
  'Volleyball': 'Circle',
  'Table Tennis': 'Circle',
  'Chess': 'Crown',
  'Carrom': 'Disc',
  'Kabaddi': 'Shield',
  'Throwball': 'Volleyball',
  
  // Cultural - Dance Events (Chrysalis)
  'Solo Dance Battle': 'User',
  'Solo Dance': 'User',
  'Group Dance Championship': 'Users',
  'Group Dance': 'Users',
  'Classical Dance': 'Music',
  'Hip Hop': 'Radio',
  'Folk Dance': 'Heart',
  'Fusion Dance': 'Sparkles',
  'Dance': 'Music4',
  
  // Cultural - Music Events (Chrysalis)
  'Voice of MILAN': 'Mic2',
  'Battle of Bands': 'Music2',
  'Solo Singing': 'Mic',
  'Group Singing': 'MicVocal',
  'DJ Night': 'Disc3',
  'Beat Boxing': 'AudioLines',
  'Rap Battle': 'Mic',
  'Music': 'Music',
  
  // Cultural - Drama/Theater (Chrysalis)
  'Street Play Competition': 'Drama',
  'Street Play': 'Drama',
  'Stand-Up Comedy Night': 'Laugh',
  'Mimicry': 'Smile',
  'Mono Acting': 'Theater',
  'Drama': 'Theater',
  
  // Cultural - Fashion (Chrysalis)
  'Fashion Fiesta': 'Sparkles',
  'Fashion Show': 'Shirt',
  'Mr & Ms': 'Star',
  'Cosplay': 'Sparkle',
  'Fashion': 'Sparkles',
  
  // Cultural - Art (Chrysalis)
  'Painting': 'Palette',
  'Photography': 'Camera',
  'Rangoli': 'Flower2',
  'Poster Making': 'PenTool',
  'Sketching': 'Pencil',
  'Art': 'Palette',
  
  // Cultural - Literary (Chrysalis)
  'Debate': 'MessageSquare',
  'Poetry': 'BookOpen',
  'Creative Writing': 'PenLine',
  'Quiz': 'CircleHelp',
  'Literary': 'BookText',
  
  // E-Sports/Gaming Events
  'BGMI': 'Crosshair',
  'Valorant': 'Target',
  'Free Fire': 'Flame',
  'FIFA': 'Football',
  'Call of Duty': 'Crosshair',
  'League of Legends': 'Sword',
  'Rocket League': 'Car',
  'Gaming Tournament': 'Trophy',
  'Esports Battle': 'Gamepad2',
  'E-Sports': 'Gamepad2',
  'Gaming': 'Gamepad',
  
  // Coding/Technical Events
  'Code Marathon': 'Code2',
  'Web Dev Challenge': 'Globe',
  'AI/ML Workshop': 'Brain',
  'Tech Quiz': 'HelpCircle',
  'Debugging Challenge': 'Bug',
  'App Development': 'Smartphone',
  'Cybersecurity': 'Shield',
  'Robotics': 'Bot',
  'IoT Project': 'Cpu',
  'Coding': 'Code',
  'Technical': 'Zap',
  
  // Default icons for main categories
  'Sports': 'Trophy',
  'Cultural': 'PartyPopper',
};

// Function to get icon name based on event name or category
export function getEventIcon(eventName: string, category?: string): string {
  // First try to match exact event name
  if (eventIconMap[eventName]) {
    return eventIconMap[eventName];
  }
  
  // Then try to match category
  if (category && eventIconMap[category]) {
    return eventIconMap[category];
  }
  
  // Try partial matching
  const lowerEventName = eventName.toLowerCase();
  for (const [key, icon] of Object.entries(eventIconMap)) {
    if (lowerEventName.includes(key.toLowerCase())) {
      return icon;
    }
  }
  
  // Default fallback
  return 'Trophy';
}