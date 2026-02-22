"use client";
import React, { useState, useEffect, MouseEvent } from 'react';
import { content,FeedbackCategory,TestimonialData } from './translations';
import Navbar from './components/Navbar';
import ClientProjects from './components/client-projects-cards';
import Footer from './components/Footer';
const getInitialLanguage = (): 'en' | 'hi' => {
  if (typeof window !== 'undefined') {
    const savedLang = localStorage.getItem('lyss-pref-lang');
    return (savedLang === 'en' || savedLang === 'hi') ? savedLang : 'en';
  }
  return 'en';
};
const App: React.FC = () => {
  
  
  
  // Language State
  const [language, setLanguage] = useState<'en' | 'hi'>(getInitialLanguage);
  
  const [feedbackCategory, setFeedbackCategory] = useState<string>('Business Owners');
  const [rating, setRating] = useState<number>(0);
  const [viewCategory, setViewCategory] = useState<string>('Business Owners');

  const t = content[language];

  const feedbackCategories: Record<string, FeedbackCategory[]> = {
    en: [
      { id: 'Business Owners', label: 'Business Owners', icon: 'fa-briefcase', placeholder: 'Company Name' },
      { id: 'Students', label: 'Students', icon: 'fa-user-graduate', placeholder: 'School/College Name' },
      { id: 'College Faculty', label: 'College Faculty', icon: 'fa-chalkboard-user', placeholder: 'Institution Name' },
      { id: 'Industry Experts', label: 'Industry Experts', icon: 'fa-user-tie', placeholder: 'Organization/Field' }
    ],
    hi: [
      { id: 'Business Owners', label: 'व्यापार मालिक', icon: 'fa-briefcase', placeholder: 'कंपनी का नाम' },
      { id: 'Students', label: 'छात्र', icon: 'fa-user-graduate', placeholder: 'स्कूल/कॉलेज का नाम' },
      { id: 'College Faculty', label: 'कॉलेज संकाय', icon: 'fa-chalkboard-user', placeholder: 'संस्थान का नाम' },
      { id: 'Industry Experts', label: 'उद्योग विशेषज्ञ', icon: 'fa-user-tie', placeholder: 'संगठन/क्षेत्र' }
    ]
  };

  const currentFeedbackCats = feedbackCategories[language];

  // We map the internal IDs (english keys) to display data to ensure logic consistency
  // Ideally, keys should be constants, but for this switch we will use the index or generic mapping
  
  const testimonialData: Record<string, TestimonialData> = {
    en: {
      'Business Owners': [
        { name: "Rajesh Verma", role: "Owner, Alpha Retail", text: "The POS software provided by LYSS has streamlined our daily operations significantly. Their support team is always just a call away.", rating: 5 },
        { name: "Sneha Kapoor", role: "Director, Kapoor Logistics", text: "Excellent hardware solutions for our fleet tracking. Very reliable, cost-effective, and the dashboard is incredibly intuitive.", rating: 5 }
      ],
      'Students': [
        { name: "Amit Kumar", role: "B.Tech CSE", text: "The Full Stack internship gave me the confidence to crack my first job interview. It wasn't just theory; we built real apps.", rating: 5 },
        { name: "Priya Sharma", role: "Class 10 Student", text: "I loved the robotics workshop! Making my own line-follower car was so much fun. I want to be an engineer now.", rating: 5 }
      ],
      'College Faculty': [
        { name: "Dr. A.P. Singh", role: "HOD, City Engineering College", text: "LYSS Technology's workshops bridge the gap between syllabus and industry requirements perfectly. Our students are much more practical-oriented now.", rating: 5 },
        { name: "Prof. M. Nair", role: "Principal, Govt Polytechnic", text: "Highly professional training team. They bring modern equipment and real-world case studies into the classroom.", rating: 4 }
      ],
      'Industry Experts': [
        { name: "Vikram Malhotra", role: "Senior IoT Architect", text: "I am impressed by the robust architecture of their industrial automation solutions. They adhere to global security standards at local pricing.", rating: 5 },
        { name: "Sarah Jenkins", role: "EdTech Consultant", text: "Their pedagogical approach to technical training is refreshing. They focus on 'doing' rather than just 'listening'.", rating: 5 }
      ]
    },
    hi: {
      'Business Owners': [
        { name: "राजेश वर्मा", role: "मालिक, अल्फा रिटेल", text: "LYSS द्वारा प्रदान किए गए POS सॉफ्टवेयर ने हमारे दैनिक कार्यों को काफी सुव्यवस्थित किया है। उनकी सपोर्ट टीम हमेशा एक कॉल दूर होती है।", rating: 5 },
        { name: "स्नेहा कपूर", role: "निदेशक, कपूर लॉजिस्टिक्स", text: "हमारे बेड़े की ट्रैकिंग के लिए उत्कृष्ट हार्डवेयर समाधान। बहुत विश्वसनीय, लागत प्रभावी, और डैशबोर्ड अविश्वसनीय रूप से सहज है।", rating: 5 }
      ],
      'Students': [
        { name: "अमित कुमार", role: "बी.टेक सीएसई", text: "फुल स्टैक इंटर्नशिप ने मुझे अपने पहले जॉब इंटरव्यू को क्रैक करने का आत्मविश्वास दिया। यह सिर्फ सिद्धांत नहीं था; हमने असली ऐप बनाए।", rating: 5 },
        { name: "प्रिया शर्मा", role: "कक्षा 10 की छात्रा", text: "मुझे रोबोटिक्स वर्कशॉप बहुत पसंद आई! अपनी खुद की लाइन-फॉलोअर कार बनाना बहुत मजेदार था। मैं अब इंजीनियर बनना चाहती हूं।", rating: 5 }
      ],
      'College Faculty': [
        { name: "डॉ. ए.पी. सिंह", role: "HOD, सिटी इंजीनियरिंग कॉलेज", text: "LYSS टेक्नोलॉजी की कार्यशालाएँ पाठ्यक्रम और उद्योग की आवश्यकताओं के बीच की खाई को पूरी तरह से पाटती हैं। हमारे छात्र अब अधिक व्यावहारिक हैं।", rating: 5 },
        { name: "प्रो. एम. नायर", role: "प्रिंसिपल, गवर्नमेंट पॉलिटेक्निक", text: "अत्यधिक पेशेवर प्रशिक्षण टीम। वे कक्षा में आधुनिक उपकरण और वास्तविक दुनिया के केस स्टडी लाते हैं।", rating: 4 }
      ],
      'Industry Experts': [
        { name: "विक्रम मल्होत्रा", role: "सीनियर IoT आर्किटेक्ट", text: "मैं उनके औद्योगिक स्वचालन समाधानों की मजबूत वास्तुकला से प्रभावित हूं। वे स्थानीय मूल्य निर्धारण पर वैश्विक सुरक्षा मानकों का पालन करते हैं।", rating: 5 },
        { name: "सारा जेनकिंस", role: "EdTech सलाहकार", text: "तकनीकी प्रशिक्षण के लिए उनका शैक्षणिक दृष्टिकोण ताज़ा है। वे सिर्फ 'सुनने' के बजाय 'करने' पर ध्यान केंद्रित करते हैं।", rating: 5 }
      ]
    }
  };

  

  return (
    <div className={`font-sans text-slate-600 antialiased bg-slate-50 selection:bg-purple-800 selection:text-white ${language === 'hi' ? 'font-hindi' : ''}`}>
      {/* External Resources */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Mukta:wght@300;400;500;600;700;800&display=swap');
          @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

          :root {
            --font-outfit: 'Outfit', sans-serif;
            --font-mukta: 'Mukta', sans-serif;
          }
          html {
                scroll-behavior: smooth;
              }
              section {
                scroll-margin-top: 100px; /* This replaces the headerOffset logic */
              }
          body {
            font-family: var(--font-outfit);
          }
          
          .font-hindi {
            font-family: var(--font-mukta), sans-serif;
          }

          .glass-nav {
            background: rgba(15, 23, 42, 0.9);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
          }
          
          .gradient-text {
            background: linear-gradient(135deg, #6b21a8 0%, #f59e0b 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .card-hover {
            transition: all 0.3s ease;
          }
          
          .card-hover:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }

          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `
      }} />

      {/* Navigation */}
      <div className={language === 'hi' ? 'font-hindi' : ''}>
    <Navbar 
      t={t.nav} 
      language={language} 
      setLanguage={setLanguage} 
    />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-900">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[100px]"></div>
          <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-amber-500/10 blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-purple-300 text-sm font-medium mb-6">
              <span className="flex h-2 w-2 relative mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-800"></span>
              </span>
              {t.hero.tag}
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
              {t.hero.title1}<br className="hidden lg:block"/>
              <span className="gradient-text"> {t.hero.title2}</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t.hero.desc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#contact" className="px-8 py-4 rounded-lg bg-purple-900 text-white font-bold hover:bg-purple-800 transition-all shadow-lg hover:shadow-purple-900/30 flex items-center justify-center gap-2">
                {t.hero.btnPrimary} <i className="fa-solid fa-arrow-right"></i>
              </a>
              <a href="#education" className="px-8 py-4 rounded-lg bg-transparent text-white font-bold hover:bg-slate-800 transition-all border border-slate-600 flex items-center justify-center gap-2">
                {t.hero.btnSecondary} <i className="fa-solid fa-graduation-cap"></i>
              </a>
            </div>
          </div>
          
          <div className="lg:w-1/2 flex justify-center lg:justify-end relative">
            {/* Decorative Graphic */}
            <div className="relative w-full max-w-md aspect-square animate-float">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-amber-500 rounded-full opacity-10 blur-2xl"></div>
              
              {/* Main Card */}
              <div className="relative bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-2xl h-full flex flex-col justify-center overflow-hidden">
                {/* Code Background Effect */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 text-[10px] text-green-500 p-4 font-mono leading-relaxed overflow-hidden whitespace-pre-wrap">
                  {t.hero.graphicCode}
                </div>

                <div className="grid grid-cols-2 gap-4 relative z-10">
                  {/* Box 1: Hardware */}
                  <div className="bg-slate-900/80 backdrop-blur-sm p-4 rounded-xl border border-slate-600 text-center">
                    <i className="fa-solid fa-microchip text-3xl text-purple-800 mb-2"></i>
                    <div className="font-bold text-white">{t.hero.graphicHardware}</div>
                    <div className="text-xs text-slate-400">IoT & Embedded</div>
                  </div>
                  {/* Box 2: Software */}
                  <div className="bg-slate-900/80 backdrop-blur-sm p-4 rounded-xl border border-slate-600 text-center">
                    <i className="fa-solid fa-code text-3xl text-amber-500 mb-2"></i>
                    <div className="font-bold text-white">{t.hero.graphicSoftware}</div>
                    <div className="text-xs text-slate-400">Web & Apps</div>
                  </div>
                  {/* Box 3: Training */}
                  <div className="col-span-2 bg-gradient-to-r from-purple-950 to-purple-900 p-4 rounded-xl border border-purple-800 flex items-center justify-between">
                    <div className="text-left">
                      <div className="font-bold text-white text-lg">{t.hero.graphicTraining}</div>
                      <div className="text-xs text-purple-300">{t.hero.graphicSchoolCollege}</div>
                    </div>
                    <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-purple-900 text-xl font-bold">
                      <i className="fa-solid fa-user-graduate"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-purple-900 font-bold tracking-wide uppercase text-sm mb-2">{t.services.tag}</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.services.title}</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">{t.services.desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div id="software-dev" className="card-hover bg-slate-50 rounded-2xl p-8 border border-slate-100 group scroll-mt-28">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-purple-900 text-2xl mb-6 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-code"></i>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">{t.services.s1Title}</h4>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t.services.s1Desc}
              </p>
            </div>

            {/* Service 2 */}
            <div id="hardware-dev" className="card-hover bg-slate-50 rounded-2xl p-8 border border-slate-100 group scroll-mt-28">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 text-2xl mb-6 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-server"></i>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">{t.services.s2Title}</h4>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t.services.s2Desc}
              </p>
            </div>

            {/* Service 3 */}
            <div id="automation" className="card-hover bg-slate-50 rounded-2xl p-8 border border-slate-100 group scroll-mt-28">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 text-2xl mb-6 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-wifi"></i>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">{t.services.s3Title}</h4>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t.services.s3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Flagship Product Spotlight: Stockman */}
<section id="innovations" className="py-24 bg-slate-900 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-2">
              {language === 'hi' ? 'हमारा नवाचार लैब' : 'Our Innovation Lab'}
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white">
              {language === 'hi' ? 'विशेष उत्पाद' : 'Flagship Products'}
            </h3>
          </div>

          {t.innovations.map((item: any, index: number) => (
            <div key={item.id} className={`flex flex-col lg:items-center gap-16 mb-32 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
              {/* Content Side */}
              <div className="lg:w-1/2">
                <div className={`inline-flex items-center px-3 py-1 rounded-full bg-${item.color}-500/10 border border-${item.color}-500/20 text-${item.color}-500 text-xs font-bold uppercase tracking-widest mb-6`}>
                  {item.tag}
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                  {language === 'hi' ? (
                    <>{item.title} के साथ <span className={`text-${item.color}-500`}>व्यापार का आधुनिकीकरण</span></>
                  ) : (
                    <>Modernizing Retail with <span className={`text-${item.color}-500`}>{item.title}</span></>
                  )}
                </h2>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                  {item.desc}
                </p>
                
                {/* Feature Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {item.features.map((feat: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 text-slate-300">
                      <div className={`w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-${item.color}-500 text-sm`}>
                        <i className="fa-solid fa-check"></i>
                      </div>
                      <span className="font-medium">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <button className={`px-8 py-4 bg-${item.color}-600 hover:bg-${item.color}-500 text-white font-bold rounded-xl transition-all shadow-lg`}>
                    {language === 'hi' ? 'विवरण देखें' : 'Explore Product'}
                  </button>
                  <div className="flex items-center gap-3 px-6 py-4 bg-slate-800/50 border border-slate-700 rounded-xl">
                    <span className="text-slate-400 text-sm italic">{language === 'hi' ? 'स्थिति:' : 'Status:'}</span>
                    <span className="text-green-400 text-sm font-bold flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span> 
                      {language === 'hi' ? 'बिहार में सक्रिय' : 'Live in Bihar'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Graphic Side */}
              <div className="lg:w-1/2 relative">
                <div className="relative z-10 bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl flex flex-col items-center justify-center aspect-video group">
                  <i className={`fa-solid ${item.image} text-8xl text-${item.color}-500 mb-4 transition-transform group-hover:scale-110 duration-500`}></i>
                  <div className="text-slate-500 font-mono text-sm uppercase tracking-widest">Powered by LYSS Tech</div>
                </div>
                <div className={`absolute -bottom-6 -right-6 w-64 h-64 bg-${item.color}-600/20 rounded-full blur-3xl z-0`}></div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Client Projects Section */}
      <ClientProjects t={t.projects} />

      {/* Education & Training Section */}
      <section id="education" className="py-24 bg-slate-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '32px 32px'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="text-amber-500 font-bold tracking-wide uppercase text-sm mb-2">{t.education.tag}</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.education.title}</h3>
              <p className="text-slate-400 text-lg">{t.education.desc}</p>
            </div>
            <div className="hidden md:block">
              <a href="https://atplc.in"  className="inline-flex items-center gap-2 text-white border-b border-purple-800 pb-1 hover:text-purple-300 transition-colors">
                {t.education.btnDownload} <i className="fa-solid fa-globe"></i>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Training Card 1: Schools */}
            <div className="bg-slate-800 rounded-2xl p-1 overflow-hidden hover:ring-2 hover:ring-purple-800 transition-all">
              <div className="bg-gradient-to-r from-purple-900 to-purple-950 p-6 rounded-t-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-bold text-white">{t.education.schoolTitle}</h4>
                    <span className="text-purple-300 text-sm">{t.education.schoolSub}</span>
                  </div>
                  <i className="fa-solid fa-school text-3xl text-white/50"></i>
                </div>
              </div>
              <div className="p-6 bg-slate-800">
                <ul className="space-y-4 text-slate-300">
                  <li className="flex gap-3">
                    <i className="fa-solid fa-robot text-purple-800 mt-1"></i>
                    <div>
                      <strong className="text-white block">{t.education.school1}</strong>
                      {t.education.school1Desc}
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <i className="fa-solid fa-lightbulb text-purple-800 mt-1"></i>
                    <div>
                      <strong className="text-white block">{t.education.school2}</strong>
                      {t.education.school2Desc}
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <i className="fa-brands fa-python text-purple-800 mt-1"></i>
                    <div>
                      <strong className="text-white block">{t.education.school3}</strong>
                      {t.education.school3Desc}
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Training Card 2: Colleges */}
            <div className="bg-slate-800 rounded-2xl p-1 overflow-hidden hover:ring-2 hover:ring-amber-500 transition-all">
              <div className="bg-gradient-to-r from-amber-600 to-amber-800 p-6 rounded-t-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-bold text-white">{t.education.collegeTitle}</h4>
                    <span className="text-amber-200 text-sm">{t.education.collegeSub}</span>
                  </div>
                  <i className="fa-solid fa-university text-3xl text-white/50"></i>
                </div>
              </div>
              <div className="p-6 bg-slate-800">
                <ul className="space-y-4 text-slate-300">
                  <li className="flex gap-3">
                    <i className="fa-solid fa-microchip text-amber-500 mt-1"></i>
                    <div>
                      <strong className="text-white block">{t.education.college1}</strong>
                      {t.education.college1Desc}
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <i className="fa-solid fa-laptop-code text-amber-500 mt-1"></i>
                    <div>
                      <strong className="text-white block">{t.education.college2}</strong>
                      {t.education.college2Desc}
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <i className="fa-solid fa-briefcase text-amber-500 mt-1"></i>
                    <div>
                      <strong className="text-white block">{t.education.college3}</strong>
                      {t.education.college3Desc}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center border-t border-slate-700 pt-8">
            <div>
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-slate-500 text-sm">{t.education.stat1}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">10+</div>
              <div className="text-slate-500 text-sm">{t.education.stat2}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-slate-500 text-sm">{t.education.stat3}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-slate-500 text-sm">{t.education.stat4}</div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-50">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
      
      {/* Column 1: Contact Info Card */}
      <div className="bg-purple-900 p-10 md:w-2/5 text-white flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-6">{t.contact.title}</h3>
          <p className="text-purple-100 mb-8">{t.contact.desc}</p>
          
          <div className="space-y-6">
            {/* Phone */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-800 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-phone"></i>
              </div>
              <div>
                <div className="text-xs text-purple-300">{t.contact.call}</div>
                <div className="font-medium">+91 62056 95667</div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-800 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div>
                <div className="text-xs text-purple-300">{t.contact.email}</div>
                <div className="font-medium">support@lyss.in</div>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-800 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div>
                <div className="text-xs text-purple-300">{t.contact.visit}</div>
                <div className="font-medium">
                  Madhubani, Bihar <br/>
                  PIN: 847211
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Social Links */}
        <div className="mt-12 flex gap-4">
          <a href="#" className="w-8 h-8 rounded-full bg-purple-800 hover:bg-white hover:text-purple-900 transition-colors flex items-center justify-center">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="#" className="w-8 h-8 rounded-full bg-purple-800 hover:bg-white hover:text-purple-900 transition-colors flex items-center justify-center">
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
        </div>
      </div>

      {/* Column 2: Contact Form */}
      <div className="p-10 md:w-3/5">
        <form 
          onSubmit={(e) => { 
            e.preventDefault(); 
            document.getElementById('success-msg')?.classList.remove('hidden'); 
          }} 
          className="space-y-6"
        >
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {t.contact.labelName}
            </label>
            <input 
              type="text" 
              required 
              className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 outline-none transition-all" 
              placeholder="John Doe" 
            />
          </div>

          {/* Category Select */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {t.contact.labelType}
            </label>
            <select className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 outline-none transition-all">
              {t.contact.types.map((option: string, idx: number) => (
                <option key={`type-${idx}`} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Service Select */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {t.contact.labelService}
            </label>
            <select className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 outline-none transition-all">
              {t.contact.services.map((service: string, idx: number) => (
                <option key={`service-${idx}`} value={service}>{service}</option>
              ))}
            </select>
          </div>

          {/* Message Textarea */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {t.contact.labelMessage}
            </label>
            <textarea 
              rows={4} 
              required 
              className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 outline-none transition-all" 
              placeholder={t.contact.placeholderMessage}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-purple-900 hover:bg-purple-800 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-purple-900/30"
          >
            {t.contact.btnSubmit}
          </button>
          
          {/* Success Message */}
          <div id="success-msg" className="hidden p-4 bg-green-50 text-green-700 rounded-lg text-sm flex items-center gap-2">
            <i className="fa-solid fa-check-circle"></i> {t.contact.success}
          </div>
        </form>
      </div>

    </div> {/* End of rounded-3xl container */}
  </div> {/* End of max-w-4xl container */}
</section>
      {/* Testimonials / Feedback View Section */}
      <section id="testimonials" className="py-24 bg-slate-50 relative border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12">
            <h2 className="text-purple-900 font-bold tracking-wide uppercase text-sm mb-2">{t.testimonials.tag}</h2>
            <h3 className="text-3xl font-bold text-slate-900">{t.testimonials.title}</h3>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
             {Object.keys(testimonialData[language]).map((cat, idx) => {
                // Find the display label corresponding to the key/id
                const catObj = currentFeedbackCats.find(c => c.id === cat) || currentFeedbackCats[idx]; 
                // Fallback to index if keys mismatch due to language switch
                return (
                  <button
                    key={cat}
                    className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                      viewCategory === (feedbackCategories['en'][idx]?.id || cat) // Check against english ID
                        ? 'bg-purple-900 text-white shadow-lg transform scale-105'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                    // Update state to the key that exists in testimonialData (which is localized now? Yes, updated testimonialData has EN keys for EN and HI keys for HI. Wait, looking at lines 152-187, I keyed them by 'Business Owners' etc even in Hindi for simplicity of structure, but inside the data is translated. 
                    // Correction: In lines 172 I used English keys for the 'hi' object too. 
                    onClick={() => setViewCategory(feedbackCategories['en'][idx].id)}
                  >
                    {currentFeedbackCats[idx].label}
                  </button>
               )
             })}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonialData[language][viewCategory]?.map((item, index) => (
               <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="flex text-amber-400 mb-4 text-sm">
                    {[...Array(item.rating)].map((_, i) => <i key={i} className="fa-solid fa-star"></i>)}
                  </div>
                  <p className="text-slate-600 mb-6 italic">"{item.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-xl">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{item.name}</div>
                      <div className="text-xs text-slate-500">{item.role}</div>
                    </div>
                  </div>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feedback Form Section */}
      <section id="feedback" className="py-24 bg-white relative border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-purple-900 font-bold tracking-wide uppercase text-sm mb-2">{t.feedback.tag}</h2>
            <h3 className="text-3xl font-bold text-slate-900">{t.feedback.title}</h3>
            <p className="text-slate-600 mt-3">{t.feedback.desc}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            {/* Category Tabs */}
            <div className="flex flex-wrap border-b border-slate-100 bg-slate-50">
              {currentFeedbackCats.map((cat, idx) => (
                <button
                  key={cat.id}
                  onClick={() => setFeedbackCategory(feedbackCategories['en'][idx].id)} // Keep internal state english for simplicity
                  className={`flex-1 py-4 px-4 text-sm font-medium transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
                    feedbackCategory === feedbackCategories['en'][idx].id
                      ? 'bg-white text-purple-900 border-t-2 border-purple-900 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <i className={`fa-solid ${cat.icon}`}></i> {cat.label}
                </button>
              ))}
            </div>

            {/* Feedback Form */}
            <div className="p-8">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-slate-800 mb-1">{t.feedback.subTitle} {currentFeedbackCats.find((_, i) => feedbackCategories['en'][i].id === feedbackCategory)?.label}</h4>
                <p className="text-sm text-slate-500">{t.feedback.subDesc}</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); alert(t.feedback.alert); }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t.feedback.labelName}</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t.feedback.labelEmail}</label>
                    <input type="email" required className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 outline-none transition-all" placeholder="john@example.com" />
                  </div>
                </div>

                {/* Dynamic Field based on Category */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                     {/* Find the placeholder for the current category in the current language */}
                     {currentFeedbackCats.find((_, i) => feedbackCategories['en'][i].id === feedbackCategory)?.placeholder}
                  </label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 outline-none transition-all" />
                </div>

                {/* Rating System */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.feedback.labelRating}</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`text-2xl transition-colors ${rating >= star ? 'text-amber-400' : 'text-slate-300 hover:text-amber-300'}`}
                      >
                        <i className="fa-solid fa-star"></i>
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-slate-500 self-center">{rating > 0 ? `${rating}/5` : ''}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.feedback.labelFeedback}</label>
                  <textarea rows={3} required className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-purple-800 focus:ring-2 focus:ring-purple-200 outline-none transition-all" ></textarea>
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="px-8 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-purple-900 transition-colors shadow-lg">
                    {t.feedback.btnSubmit}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer t={t} />
      
    </div>
    </div>
  );
};

export default App;