// Mock data for Campus Connect

export const colleges = [
  { id: 'all', name: 'All', shortName: 'All' },
  { id: 'nst', name: 'Newton School of Technology', shortName: 'NST', description: 'A tech-first university focused on practical learning and industry partnerships', location: 'Pune' },
  { id: 'sst', name: 'Scaler School of Technology', shortName: 'SST', description: 'Building the next generation of tech leaders with hands-on experience', location: 'Bangalore' },
  { id: 'vedam', name: 'Vedam School of Technology', shortName: 'Vedam', description: 'Where ancient wisdom meets modern technology education', location: 'Hyderabad' },
  { id: 'niat', name: 'NxtWave Institute of Advanced Technology', shortName: 'NIAT', description: 'Pioneering advanced tech education with industry-ready curriculum', location: 'Hyderabad' },
  { id: 'polaris', name: 'Polaris School of Technology', shortName: 'Polaris', description: 'Guiding students towards stellar careers in technology', location: 'Chennai' },
  { id: '100x', name: '100x School of Technology', shortName: '100x', description: 'Guiding students towards stellar careers in technology', location: 'Bangalore' },
  { id: 'lst', name: 'LeapStart School of Technology', shortName: 'LST', description: 'Fast-track your tech career with industry-focused curriculum', location: 'Delhi' }
];

export const mentors = [
  {
    id: '1',
    name: 'Harsh Hirawat',
    year: '2nd Year Student',
    college: 'Newton School of Technology- Pune',
    collegeId: 'nst',
    rating: 4.9,
    price: 49,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    bio: 'Computer Science student passionate about web development and AI. Happy to share insights about NST campus life, placements, and academics.',
    expertise: ['Campus Life', 'Placements', 'Academics', 'Hostel'],
    languages: ['English', 'Hindi'],
    sessionsCompleted: 45
  },
  {
    id: '2',
    name: 'Nitya Jain',
    year: '2nd Year Student',
    college: 'Newton School of Technology-Pune',
    collegeId: 'nst',
    rating: 5,
    price: 49,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    bio: 'Aspiring software engineer with interests in machine learning. Can guide you through the admission process and what to expect.',
    expertise: ['Admissions', 'Faculty', 'Campus Life', 'Projects'],
    languages: ['English', 'Hindi'],
    sessionsCompleted: 38
  },
  {
    id: '3',
    name: 'Agrima Gupta',
    year: '1st year student',
    college: 'Vedam School of Technology',
    collegeId: 'vedam',
    rating: 5,
    price: 49,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    bio: 'Freshly admitted student who recently went through the entire admission process. Perfect for understanding the latest procedures.',
    expertise: ['Admission Process', 'NSAT Exam', 'Campus Tour', 'Hostel Life'],
    languages: ['English', 'Hindi', 'Telugu'],
    sessionsCompleted: 12
  },
  {
    id: '4',
    name: 'Kellampalli Saathvik',
    year: '1st year student',
    college: 'LeapStart School of Technology',
    collegeId: 'lst',
    rating: 5,
    price: 49,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    bio: 'Tech enthusiast exploring various domains of computer science. Can share fresh perspectives on college life.',
    expertise: ['Campus Life', 'Coding Culture', 'Events', 'Clubs'],
    languages: ['English', 'Telugu'],
    sessionsCompleted: 8
  },
  {
    id: '5',
    name: 'Prince Tiwari',
    year: '1st year student at Vedam school of Technology',
    college: 'Vedam School of Technology',
    collegeId: 'vedam',
    rating: 5,
    price: 49,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    bio: 'Passionate about competitive programming and web development. Here to help you make the right college decision.',
    expertise: ['Coding', 'Placements', 'Faculty', 'Infrastructure'],
    languages: ['English', 'Hindi'],
    sessionsCompleted: 15
  },
  {
    id: '6',
    name: 'Devesh Singh',
    year: '1st year student at 100x school',
    college: '100x School of Technology',
    collegeId: '100x',
    rating: 5,
    price: 49,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    bio: 'Full-stack developer in making. Can guide you about the intensive curriculum and learning environment at 100x.',
    expertise: ['Curriculum', 'Projects', 'Learning Environment', 'Career'],
    languages: ['English', 'Hindi'],
    sessionsCompleted: 20
  },
  {
    id: '7',
    name: 'Priya Sharma',
    year: '3rd Year Student',
    college: 'Scaler School of Technology',
    collegeId: 'sst',
    rating: 4.8,
    price: 49,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    bio: 'Senior student with internship experience at top tech companies. Can share placement insights and interview preparation tips.',
    expertise: ['Placements', 'Internships', 'Interview Prep', 'Resume Building'],
    languages: ['English', 'Hindi'],
    sessionsCompleted: 67
  },
  {
    id: '8',
    name: 'Arjun Mehta',
    year: '2nd Year Student',
    college: 'Polaris School of Technology',
    collegeId: 'polaris',
    rating: 4.9,
    price: 49,
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop',
    bio: 'Data science enthusiast with multiple project wins. Happy to discuss the analytics and AI focus at Polaris.',
    expertise: ['Data Science', 'AI/ML', 'Projects', 'Hackathons'],
    languages: ['English', 'Tamil', 'Hindi'],
    sessionsCompleted: 33
  }
];

export const pricingPlans = [
  {
    id: 'quick',
    name: 'Quick Chat',
    price: 49,
    duration: '15 min',
    features: [
      '15 min video call',
      'Ask quick doubts',
      'Get honest answers'
    ],
    popular: false,
    available: true
  },
  {
    id: 'deep',
    name: 'Deep Dive',
    price: 98,
    duration: '30 min',
    features: [
      '30 min video call',
      'Detailed college insights',
      'Admission guidance',
      'All your questions answered'
    ],
    popular: true,
    available: true
  },
  {
    id: 'group',
    name: 'Group Session',
    price: 49,
    duration: '60 min',
    features: [
      '60 min group call',
      'Q&A with current students',
      'Learn from others\' questions',
      'Recording available'
    ],
    popular: false,
    available: false
  }
];

export const faqs = [
  {
    question: 'What is Campus Connect?',
    answer: 'Campus Connect is a platform that connects prospective students with current students at new-gen tech colleges. Get honest, unfiltered insights about campus life, placements, faculty, and everything that matters before making your college decision.'
  },
  {
    question: 'How do I book a session?',
    answer: 'Simply browse through our mentor profiles, select a mentor from your preferred college, choose a session type (Quick Chat or Deep Dive), and book a time slot that works for you. You\'ll receive a confirmation with meeting details via email.'
  },
  {
    question: 'What can I ask during a session?',
    answer: 'You can ask anything! Campus life, hostel facilities, mess food, faculty quality, placement statistics, admission process, entrance exam tips, coding culture, events, clubs, internships, or anything else you want to know before joining.'
  },
  {
    question: 'Is this career counselling or job guidance?',
    answer: 'No, this is peer mentorship focused specifically on helping you choose the right college. Our mentors are current students who share their real experiences, not career counselors. For career guidance, we recommend specialized career counseling services.'
  },
  {
    question: 'Can I reschedule my session?',
    answer: 'Yes! You can reschedule your session up to 6 hours before the scheduled time. Simply go to your bookings dashboard and select a new time slot. Cancellations made less than 6 hours before the session are non-refundable.'
  },
  {
    question: 'Who are the mentors on this platform?',
    answer: 'All our mentors are verified current students at new-gen tech colleges like NST, Vedam, NIAT, Polaris, and more. They go through a verification process to ensure they provide authentic insights and maintain professional conduct during sessions.'
  }
];

export const reviews = [
  {
    id: '1',
    mentorId: '1',
    studentName: 'Rahul Kumar',
    rating: 5,
    comment: 'Harsh was super helpful! Got all my doubts about NST cleared. Highly recommend!',
    date: '2025-01-15'
  },
  {
    id: '2',
    mentorId: '2',
    studentName: 'Sneha Patel',
    rating: 5,
    comment: 'Very detailed insights about the campus and placements. Worth every rupee!',
    date: '2025-01-10'
  },
  {
    id: '3',
    mentorId: '7',
    studentName: 'Amit Singh',
    rating: 5,
    comment: 'Priya shared amazing placement tips and her internship experience. Very valuable session!',
    date: '2025-01-08'
  }
];

export const features = [
  {
    title: 'Get Real Clarity',
    description: 'Get genuine, unfiltered insights about the college you're considering. No marketing fluff, just real experiences.',
    icon: 'CheckCircle2'
  },
  {
    title: 'Compare New-Gen Colleges',
    description: 'Confused between NST, Vedam, NIAT, or Polaris? Talk to students and make an informed comparison.',
    icon: 'GitCompare'
  },
  {
    title: 'Prepare Before Admission',
    description: 'From laptop requirements to coding prerequisites, get fully prepared for Day 1 at your new college.',
    icon: 'BookOpen'
  },
  {
    title: 'Entrance Exam & Prep Tips',
    description: 'Get insider tips on NSAT, interviews, and admission processes. Learn what actually gets you selected.',
    icon: 'GraduationCap'
  },
  {
    title: 'Real Campus Life Insights',
    description: 'Hostel life, mess food, social scene, clubs, and daily routines. Know what your 4 years will look like.',
    icon: 'Users'
  },
  {
    title: 'Placement & Career Reality',
    description: 'Get honest placement statistics, internship opportunities, and career growth prospects from real students.',
    icon: 'Briefcase'
  }
];