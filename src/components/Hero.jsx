const Hero = () => {
  const handleScroll = () => {
    // كتهبط الكليان ديريكت لقسم السيارات ملي كيكليكي
    document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" dir="rtl">
      
      {/* 1. الخلفية (التصويرة والضبابية) */}
      <div className="absolute inset-0">
        {/* 🔥 بدلت ليك رابط التصويرة حيت القديم طاح وما بقاش خدام */}
        <img 
          src="https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1932&auto=format&fit=crop" 
          alt="Luxury Car Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/60 to-transparent"></div>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* 2. المحتوى (الكتيبة والبوطونة) */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 space-y-6 md:space-y-8 mt-20">
        
        {/* 👇 هنا صغرنا الخط فالتليفون (text-4xl) وكبرناه فالبيسي (md:text-7xl lg:text-8xl) */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight md:leading-tight font-['Cairo'] tracking-wide">
          اختر سيارتك <br className="hidden sm:block" />
          <span className="text-[#c4a661] drop-shadow-[0_0_20px_rgba(196,166,97,0.3)] block mt-2 sm:mt-0 sm:inline"> وانطلق بثقة</span>
        </h1>
        
        {/* 👇 تا هادا صغرناه فالتليفون (text-sm) باش يجي مستّف */}
        <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-300 font-bold max-w-2xl mx-auto leading-relaxed font-['Cairo']">
          مجموعة متنوعة من السيارات الفاخرة والاقتصادية بأفضل الأسعار. 
          <br className="hidden md:block" />
          خدمة عملاء على مدار الساعة لضمان راحتك.
        </p>

        {/* 👇 صغرنا البوطونة شوية فالتليفون باش ما تخرجش على الجناب */}
        <div className="pt-6 md:pt-10">
          <button 
            onClick={handleScroll}
            className="bg-[#c4a661] text-black hover:bg-white px-8 py-4 md:px-12 md:py-5 rounded-full font-black text-lg md:text-2xl transition-all duration-300 shadow-[0_15px_40px_rgba(196,166,97,0.4)] hover:scale-105 cursor-pointer font-['Cairo']"
          >
            استكشف الأسطول
          </button>
        </div>

        {/* مميزات خفيفة لتحت (Trust Badges) - صغرناهم فالتليفون بـ scale-75 */}
        <div className="flex justify-center items-center gap-4 md:gap-8 pt-10 md:pt-16 opacity-80 scale-75 md:scale-100">
          <div className="flex flex-col items-center gap-2">
            <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center text-lg md:text-xl backdrop-blur-sm border border-white/20">🎧</span>
            <span className="text-white text-[10px] md:text-xs font-bold font-['Cairo']">دعم 24/7</span>
          </div>
          <div className="w-px h-8 md:h-10 bg-white/20"></div>
          <div className="flex flex-col items-center gap-2">
            <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center text-lg md:text-xl backdrop-blur-sm border border-white/20">🛡️</span>
            <span className="text-white text-[10px] md:text-xs font-bold font-['Cairo']">تأمين شامل</span>
          </div>
        </div>

      </div>

    </section>
  );
};

export default Hero;