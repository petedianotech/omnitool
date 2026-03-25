export const tools = [
  // AI Tools
  { id: "ai-summarizer", name: "AI Text Summarizer", category: "AI Tools", icon: "Sparkles", description: "Instantly summarize long articles, emails, or notes." },
  { id: "ai-rewriter", name: "AI Text Rewriter", category: "AI Tools", icon: "Type", description: "Fix grammar, improve flow, and change the tone of your text." },

  // Life Logistics
  { id: "subscription-manager", name: "Subscription Tracker", category: "Life Logistics", icon: "CreditCard", description: "Track your monthly and yearly subscriptions." },
  { id: "currency-converter", name: "Visual Currency Converter", category: "Life Logistics", icon: "DollarSign", description: "Convert currencies with visual buying power." },
  { id: "tip-split", name: "Smart Tip & Split", category: "Life Logistics", icon: "Calculator", description: "Split bills easily among friends." },
  { id: "timezone-meeter", name: "Time Zone Meeter", category: "Life Logistics", icon: "Globe", description: "Find the perfect meeting time across time zones." },
  { id: "date-calculator", name: "Date 'How Long?'", category: "Life Logistics", icon: "Calendar", description: "Calculate days until or since an event." },
  
  // Quick-Fix Document & Text Hub
  { id: "image-resizer", name: "Privacy-First Image Resizer", category: "Document & Text", icon: "Image", description: "Resize images locally without uploading." },
  { id: "text-cleaner", name: "The 'Clean Text' Machine", category: "Document & Text", icon: "Type", description: "Fix formatting, ALL CAPS, and extra spaces." },
  { id: "pdf-converter", name: "Instant PDF Converter", category: "Document & Text", icon: "FileText", description: "Turn text into a simple PDF for printing." },
  { id: "qr-generator", name: "QR Code Generator", category: "Document & Text", icon: "QrCode", description: "Generate QR codes for links or Wi-Fi." },
  
  // Well-Being & Focus
  { id: "breath-timer", name: "The 'Deep Breath' Timer", category: "Well-Being", icon: "Wind", description: "A 60-second guided breathing exercise." },
  { id: "pomodoro", name: "Modern Pomodoro", category: "Well-Being", icon: "Clock", description: "Sleek timer for work/study sessions." },
  { id: "hydration-tracker", name: "Hydration Tracker", category: "Well-Being", icon: "Droplets", description: "Track your daily water intake." },
  { id: "bluelight-tester", name: "Blue Light 'Warmth' Tester", category: "Well-Being", icon: "Sun", description: "Test different screen tints for late-night reading." },
  
  // Security & Safety
  { id: "password-gen", name: "Unbreakable Password Gen", category: "Security", icon: "Key", description: "Create memorable or highly secure passwords." },
  { id: "digital-shredder", name: "Digital 'Shredder'", category: "Security", icon: "Trash2", description: "Paste sensitive info, copy once, then wipe forever." },
  { id: "metadata-stripper", name: "Metadata Stripper", category: "Security", icon: "Shield", description: "Remove GPS and camera info from photos." },
];

export const categories = [
  { id: "ai-tools", name: "AI Power Tools", tools: ["ai-summarizer", "ai-rewriter", "text-cleaner"] },
  { id: "developers", name: "Developers", tools: ["subscription-manager", "pomodoro", "text-cleaner", "password-gen", "timezone-meeter"] },
  { id: "designers", name: "Designers", tools: ["subscription-manager", "image-resizer", "metadata-stripper", "bluelight-tester", "pomodoro"] },
  { id: "students", name: "Students", tools: ["subscription-manager", "ai-summarizer", "ai-rewriter", "pomodoro", "pdf-converter", "date-calculator", "text-cleaner"] },
  { id: "teachers", name: "Teachers", tools: ["ai-summarizer", "ai-rewriter", "qr-generator", "pomodoro", "pdf-converter", "breath-timer"] },
  { id: "freelancers", name: "Freelancers", tools: ["subscription-manager", "ai-rewriter", "currency-converter", "timezone-meeter", "pomodoro", "pdf-converter"] },
  { id: "travelers", name: "Travelers", tools: ["currency-converter", "timezone-meeter", "tip-split", "metadata-stripper"] },
  { id: "writers", name: "Writers", tools: ["ai-summarizer", "ai-rewriter", "text-cleaner", "pomodoro", "breath-timer", "bluelight-tester"] },
  { id: "marketers", name: "Marketers", tools: ["subscription-manager", "ai-summarizer", "ai-rewriter", "qr-generator", "image-resizer", "text-cleaner", "currency-converter"] },
  { id: "managers", name: "Managers", tools: ["timezone-meeter", "pomodoro", "date-calculator", "breath-timer"] },
  { id: "healthcare", name: "Healthcare Workers", tools: ["hydration-tracker", "breath-timer", "date-calculator", "pomodoro"] },
  { id: "retail", name: "Retail Workers", tools: ["tip-split", "currency-converter", "hydration-tracker", "breath-timer"] },
  { id: "parents", name: "Parents", tools: ["date-calculator", "hydration-tracker", "image-resizer", "qr-generator"] },
  { id: "fitness", name: "Fitness Enthusiasts", tools: ["hydration-tracker", "pomodoro", "breath-timer", "date-calculator"] },
  { id: "events", name: "Event Planners", tools: ["date-calculator", "tip-split", "qr-generator", "currency-converter"] },
  { id: "realestate", name: "Real Estate Agents", tools: ["image-resizer", "pdf-converter", "currency-converter", "timezone-meeter"] },
  { id: "photographers", name: "Photographers", tools: ["metadata-stripper", "image-resizer", "bluelight-tester", "currency-converter"] },
  { id: "chefs", name: "Chefs/Cooks", tools: ["pomodoro", "tip-split", "hydration-tracker", "currency-converter"] },
  { id: "musicians", name: "Musicians", tools: ["pomodoro", "breath-timer", "qr-generator", "timezone-meeter"] },
  { id: "gamers", name: "Gamers", tools: ["bluelight-tester", "timezone-meeter", "pomodoro", "hydration-tracker"] },
  { id: "retirees", name: "Retirees", tools: ["password-gen", "digital-shredder", "currency-converter", "date-calculator"] },
];
