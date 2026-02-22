export interface FeedbackCategory {
  id: string;
  label: string; // Added label for display vs id for logic
  icon: string;
  placeholder: string;
}

interface TestimonialItem {
  name: string;
  role: string;
  text: string;
  rating: number;
}
interface ProjectItem {
  tag: string;
  title: string;
  desc: string;
  icon: string;
}
export interface TestimonialData {
  [key: string]: TestimonialItem[];
}

// Translation Interface
export interface Translation {
  nav: {
    solutions: string;
    overview: string;
    allServices: string;
    softDev: string;
    hardDev: string;
    automation: string;
    projects: string;
    training: string;
    about: string;
    contact: string;
  };
  hero: {
    tag: string;
    title1: string;
    title2: string;
    desc: string;
    btnPrimary: string;
    btnSecondary: string;
    graphicCode: string;
    graphicHardware: string;
    graphicSoftware: string;
    graphicTraining: string;
    graphicSchoolCollege: string;
  };
  services: {
    tag: string;
    title: string;
    desc: string;
    s1Title: string;
    s1Desc: string;
    s2Title: string;
    s2Desc: string;
    s3Title: string;
    s3Desc: string;
  };
  innovations: {
    id: string;
    tag: string;
    title: string;
    desc: string;
    features: string[];
    image: string;
    color: string;
  }[];
  projects: {
    tag: string;
    title: string;
    desc: string;
   items: ProjectItem[]; 
  };
  education: {
    tag: string;
    title: string;
    desc: string;
    btnDownload: string;
    schoolTitle: string;
    schoolSub: string;
    school1: string;
    school1Desc: string;
    school2: string;
    school2Desc: string;
    school3: string;
    school3Desc: string;
    collegeTitle: string;
    collegeSub: string;
    college1: string;
    college1Desc: string;
    college2: string;
    college2Desc: string;
    college3: string;
    college3Desc: string;
    stat1: string;
    stat2: string;
    stat3: string;
    stat4: string;
  };
  contact: {
    title: string;
    desc: string;
    call: string;
    email: string;
    visit: string;
    formName: string;
    formType: string;
    formService: string;
    labelName: string,
    labelType: string,
    labelService: string,
     labelMessage: string,
    placeholderMessage:string,
    formMessage: string;
    btnSubmit: string;
    success: string;
    types: string[];
    services: string[];
  };
  testimonials: {
    tag: string;
    title: string;
  };
  feedback: {
    tag: string;
    title: string;
    desc: string;
    subTitle: string;
    subDesc: string;
    labelName: string;
    labelEmail: string;
    labelRating: string;
    labelFeedback: string;
    btnSubmit: string;
    alert: string;
  };
  footer: {
    desc: string;
    quickLinks: string;
    training: string;
    connect: string;
    rights: string;
  };
}

export const content: { en: Translation; hi: Translation } = {
  en: {
    nav: {
      solutions: "Business Solutions",
      overview: "Overview",
      allServices: "All services",
      softDev: "Software Dev",
      hardDev: "Hardware Dev",
      automation: "Smart Automation",
      projects: "Client Projects",
      training: "Student Training",
      about: "About",
      contact: "Contact Us"
    },
    hero: {
      tag: "Innovation meets Education",
      title1: "Empowering Business,",
      title2: "Inspiring Students",
      desc: "LYSS Technology delivers robust software & hardware solutions for local industries while providing practical, hands-on technical training to the next generation of engineers.",
      btnPrimary: "Get Business Solutions",
      btnSecondary: "View Training Programs",
      graphicCode: "import lyss\nclass Future:\n  def __init__(self):\n    self.skills = []\n  def train(self):\n    return 'Success'",
      graphicHardware: "Hardware",
      graphicSoftware: "Software",
      graphicTraining: "Practical Training",
      graphicSchoolCollege: "School & College Level"
    },
    services: {
      tag: "For Businesses",
      title: "Technical Solutions",
      desc: "We provide comprehensive IT and electronics support to help local businesses automate and grow.",
      s1Title: "Software Development",
      s1Desc: "Custom websites, billing software, and mobile apps tailored for local business needs.",
      s2Title: "Hardware Product Dev",
      s2Desc: "From PCB design to final casing. We prototype and manufacture electronic hardware products.",
      s3Title: "Smart Automation",
      s3Desc: "IoT solutions for shops and factories. Automate lighting, security, and inventory tracking."
    },
    innovations: [
  {
    id: "stockman",
    tag: "Retail SaaS",
    title: "Stockman",
    desc: "Developed entirely by LYSS Technology, Stockman is a specialized SaaS platform designed for Tier-2 and Tier-3 cities in India. It simplifies inventory management and sales management for businesses that need speed, reliability, and local relevance.",
    features: ["Instant bill Generation", "Real-time Stock", "GST Ready", "Offline Mode"],
    image: "fa-boxes-stacked",
    color: "amber"
  },
  
],
    projects: {
      tag: "Our Work",
      title: "Client Projects",
       desc: "Explore some of the innovative solutions we've delivered for our partners.",
      items: [
              {
                title: "LET'S INSPIRE BIHAR - Madhubani",
                desc: "Official digital platform for the Madhubani Chapter. Features event management systems, member registration, and a showcase for regional initiatives.",
                icon: "fa-hands-holding-child", // Represents community/inspiration
                tag: "Community & NGO"
        }
        
      ]
    },
    education: {
      tag: "A Technical & Practical Learning Club (ATPLC)",
      title: "Practical Oriented Training",
      desc: "We bridge the gap between academic theory and industry reality. Our hands-on programs for schools and colleges ensure students are future-ready.",
      btnDownload: "Visit ATPLC Website",
      schoolTitle: "For Schools",
      schoolSub: "Class 6th to 12th",
      school1: "Robotics Workshops",
      school1Desc: "Line followers, obstacle avoiders, and basic mechanics.",
      school2: "Basic Electronics",
      school2Desc: "Understanding circuits, sensors, and soldering.",
      school3: "Coding for Kids",
      school3Desc: "Logic building with Python and Scratch.",
      collegeTitle: "For Colleges",
      collegeSub: "Engineering & Diploma",
      college1: "Embedded Systems & IoT",
      college1Desc: "Arduino, ESP32, Raspberry Pi, and Cloud connectivity.",
      college2: "Full Stack Development",
      college2Desc: "Real-world project development using different tech stack.",
      college3: "Industrial Internship",
      college3Desc: "Work on live projects with our development team.",
      stat1: "Students Trained",
      stat2: "Partner Colleges",
      stat3: "Workshops Conducted",
      stat4: "Practical Learning"
    },
    contact: {
    title: "Get in Touch",
    desc: "Whether you need a business solution or want to organize a workshop, we are here to help.",
    call: "Call us",
    email: "Email us",
    visit: "Visit us",
    formName: "Full Name",
    formType: "Category",
    formService: "Service Needed",
    labelName: "Your Name",
    labelType: "Are you a?",
    labelService: "Select Service",
    labelMessage: "Message",
    placeholderMessage: "Tell us about your requirements in detail...",
    formMessage: "Your Message",
    btnSubmit: "Send Request",
    success: "Request sent successfully! We will contact you shortly.",
    types: [
        "Business Owner",
        "School/College Representative",
        "Student",
        "Other"
    ],
    services: [
        "Software Development",
        "Hardware Solutions",
        "Training / Workshop",
        "Internship Inquiry"
    ]
},
    testimonials: {
      tag: "Success Stories",
      title: "What People Say About Us"
    },
    feedback: {
      tag: "We Value Your Opinion",
      title: "Leave Your Feedback",
      desc: "Help us improve our solutions and training programs by sharing your experience.",
      subTitle: "Feedback as",
      subDesc: "Please let us know how we can better serve the community.",
      labelName: "Name",
      labelEmail: "Email",
      labelRating: "Rating",
      labelFeedback: "Your Feedback",
      btnSubmit: "Submit Feedback",
      alert: "Thank you for your feedback!"
    },
    footer: {
      desc: "Your partner in technical innovation and practical education. We build the future, one solution and one student at a time.",
      quickLinks: "Quick Links",
      training: "Training",
      connect: "Connect",
      rights: "All rights reserved."
    }
  },
  hi: {
    nav: {
      solutions: "व्यापार समाधान",
      overview: "अवलोकन",
      allServices: "सभी सेवाएं",
      softDev: "सॉफ्टवेयर विकास",
      hardDev: "हार्डवेयर विकास",
      automation: "स्मार्ट ऑटोमेशन",
      projects: "ग्राहक परियोजनाएं",
      training: "छात्र प्रशिक्षण",
      about: "हमारे बारे में",
      contact: "संपर्क करें"
    },
    hero: {
      tag: "नवाचार और शिक्षा का संगम",
      title1: "व्यापार को सशक्त,",
      title2: "छात्रों को प्रेरित",
      desc: "LYSS टेक्नोलॉजी स्थानीय उद्योगों के लिए मजबूत सॉफ्टवेयर और हार्डवेयर समाधान प्रदान करती है और साथ ही भविष्य के इंजीनियरों को व्यावहारिक तकनीकी प्रशिक्षण देती है।",
      btnPrimary: "व्यापार समाधान प्राप्त करें",
      btnSecondary: "प्रशिक्षण कार्यक्रम देखें",
      graphicCode: "import lyss\nclass Future:\n  def __init__(self):\n    self.kaushal = []\n  def train(self):\n    return 'Safalta'",
      graphicHardware: "हार्डवेयर",
      graphicSoftware: "सॉफ्टवेयर",
      graphicTraining: "व्यावहारिक प्रशिक्षण",
      graphicSchoolCollege: "स्कूल और कॉलेज स्तर"
    },
    services: {
      tag: "व्यवसायों के लिए",
      title: "तकनीकी समाधान",
      desc: "हम स्थानीय व्यवसायों को स्वचालित करने और बढ़ने में मदद करने के लिए व्यापक आईटी और इलेक्ट्रॉनिक्स सहायता प्रदान करते हैं।",
      s1Title: "सॉफ्टवेयर विकास",
      s1Desc: "स्थानीय व्यावसायिक आवश्यकताओं के लिए कस्टम वेबसाइट, बिलिंग सॉफ्टवेयर और मोबाइल ऐप्स।",
      s2Title: "हार्डवेयर उत्पाद विकास",
      s2Desc: "PCB डिज़ाइन से लेकर अंतिम केसिंग तक। हम इलेक्ट्रॉनिक हार्डवेयर उत्पादों का प्रोटोटाइप और निर्माण करते हैं।",
      s3Title: "स्मार्ट ऑटोमेशन",
      s3Desc: "दुकानों और कारखानों के लिए IoT समाधान। लाइटिंग, सुरक्षा और इन्वेंट्री ट्रैकिंग को स्वचालित करें।"
    },
    innovations: [
  {
  "id": "stockman",
  "tag": "रिटेल (Retail) SaaS",
  "title": "स्टॉकमैन (Stockman)",
  "desc": "LYSS टेक्नोलॉजी द्वारा पूर्ण रूप से विकसित, स्टॉकमैन एक विशेष SaaS प्लेटफॉर्म है जिसे भारत के टियर-2 और टियर-3 शहरों के लिए डिज़ाइन किया गया है। यह उन व्यवसायों के लिए इन्वेंट्री और बिक्री प्रबंधन को सरल बनाता है जिन्हें गति, विश्वसनीयता और स्थानीय प्रासंगिकता की आवश्यकता है।",
  "features": [
    "त्वरित बिल जनरेशन", 
    "रियल-टाइम स्टॉक अपडेट", 
    "GST के लिए तैयार", 
    "ऑफलाइन मोड"
  ],
  "image": "fa-boxes-stacked",
  "color": "amber"
}
  // You can add more innovations here following the same pattern
],
     projects: {
      tag: "हमारा काम",
      title: "ग्राहक परियोजनाएं",
      desc: "हमारे भागीदारों के लिए हमारे द्वारा वितरित कुछ नवीन समाधानों का अन्वेषण करें।",
      items: [
              {
                title: "LET'S INSPIRE BIHAR - मधुबनी",
                desc: "मधुबनी अध्याय के लिए आधिकारिक डिजिटल प्लेटफॉर्म। इसमें इवेंट मैनेजमेंट सिस्टम, सदस्य पंजीकरण और क्षेत्रीय पहलों का प्रदर्शन शामिल है।",
                icon: "fa-hands-holding-child",
                tag: "समुदाय और NGO"
        }
        
      ]
    },
    education: {
      tag: "LYSS अकादमी",
      title: "व्यावहारिक प्रशिक्षण",
      desc: "हम अकादमिक सिद्धांत और उद्योग की वास्तविकता के बीच की खाई को पाटते हैं। स्कूलों और कॉलेजों के लिए हमारे कार्यक्रम छात्रों को भविष्य के लिए तैयार करते हैं।",
      btnDownload: "ब्रोशर डाउनलोड करें",
      schoolTitle: "स्कूलों के लिए",
      schoolSub: "कक्षा 6वीं से 12वीं",
      school1: "रोबोटिक्स वर्कशॉप",
      school1Desc: "लाइन फॉलोअर्स, बाधा निवारक और बुनियादी यांत्रिकी।",
      school2: "बुनियादी इलेक्ट्रॉनिक्स",
      school2Desc: "सर्किट, सेंसर और सोल्डरिंग को समझना।",
      school3: "बच्चों के लिए कोडिंग",
      school3Desc: "Python और Scratch के साथ लॉजिक बिल्डिंग।",
      collegeTitle: "कॉलेजों के लिए",
      collegeSub: "इंजीनियरिंग और डिप्लोमा",
      college1: "एम्बेडेड सिस्टम और IoT",
      college1Desc: "Arduino, ESP32, Raspberry Pi, और क्लाउड कनेक्टिविटी।",
      college2: "फुल स्टैक डेवलपमेंट",
      college2Desc: "MERN स्टैक का उपयोग करके वास्तविक प्रोजेक्ट विकास।",
      college3: "औद्योगिक इंटर्नशिप",
      college3Desc: "हमारी विकास टीम के साथ लाइव प्रोजेक्ट्स पर काम करें।",
      stat1: "प्रशिक्षित छात्र",
      stat2: "पार्टनर स्कूल",
      stat3: "कार्यशालाएं आयोजित",
      stat4: "व्यावहारिक शिक्षा"
    },
    contact: {
    title: "संपर्क करें",
    desc: "चाहे आपको व्यावसायिक समाधान की आवश्यकता हो या कार्यशाला आयोजित करनी हो, हम आपकी सहायता के लिए यहाँ हैं।",
    call: "हमें कॉल करें",
    email: "हमें ईमेल करें",
    visit: "हमसे मिलें",
    formName: "आपका नाम",
    formType: "आपकी श्रेणी",
    formService: "आवश्यक सेवा",
    labelName: "आपका नाम",
    labelType: "आप कौन हैं?",
    labelService: "सेवा का चयन करें",
    labelMessage: "संदेश",
    placeholderMessage: "अपनी आवश्यकताओं के बारे में विस्तार से बताएं...",
    formMessage: "आपका संदेश",
    btnSubmit: "अनुरोध भेजें",
    success: "अनुरोध सफलतापूर्वक भेज दिया गया! हम जल्द ही आपसे संपर्क करेंगे।",
    types: [
        "व्यवसाय मालिक (Business Owner)",
        "स्कूल/कॉलेज प्रतिनिधि",
        "छात्र (Student)",
        "अन्य"
    ],
    services: [
        "सॉफ्टवेयर विकास (Software Dev)",
        "हार्डवेयर समाधान",
        "ट्रेनिंग / वर्कशॉप",
        "इंटर्नशिप पूछताछ"
    ]
},
    testimonials: {
      tag: "सफलता की कहानियां",
      title: "लोग हमारे बारे में क्या कहते हैं"
    },
    feedback: {
      tag: "हम आपकी राय का सम्मान करते हैं",
      title: "अपनी प्रतिक्रिया दें",
      desc: "अपने अनुभव को साझा करके हमारे समाधानों और प्रशिक्षण कार्यक्रमों को बेहतर बनाने में हमारी सहायता करें।",
      subTitle: "प्रतिक्रिया (श्रेणी)",
      subDesc: "कृपया हमें बताएं कि हम समुदाय की बेहतर सेवा कैसे कर सकते हैं।",
      labelName: "नाम",
      labelEmail: "ईमेल",
      labelRating: "रेटिंग",
      labelFeedback: "आपकी प्रतिक्रिया",
      btnSubmit: "प्रतिक्रिया जमा करें",
      alert: "आपकी प्रतिक्रिया के लिए धन्यवाद!"
    },
    footer: {
      desc: "तकनीकी नवाचार और व्यावहारिक शिक्षा में आपका भागीदार। हम भविष्य का निर्माण करते हैं, एक समय में एक समाधान और एक छात्र।",
      quickLinks: "त्वरित लिंक",
      training: "प्रशिक्षण",
      connect: "जुड़ें",
      rights: "सर्वाधिकार सुरक्षित।"
    }
  }
};