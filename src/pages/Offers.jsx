import { Link } from 'react-router-dom';

const Offers = () => {
  const promos = [
    {
      id: 1,
      title: "باقة العرسان VIP",
      desc: "سيارة فاخرة مزينة بالكامل مع سائق شخصي محترف ليوم زفاف لا يُنسى.",
      discount: "خدمة مجانية",
      code: "WEDDING26",
      icon: "💍",
      color: "from-pink-500/20 to-purple-500/20",
      border: "hover:border-pink-500/50"
    },
    {
      id: 2,
      title: "عطلة نهاية الأسبوع",
      desc: "استلم السيارة الجمعة مساءً وسلمها الإثنين صباحاً واستفد من يوم مجاني.",
      discount: "-30%",
      code: "WEEKEND3",
      icon: "🌴",
      color: "from-[#c4a661]/20 to-yellow-600/20",
      border: "hover:border-[#c4a661]/50"
    },
    {
      id: 3,
      title: "الكراء طويل الأمد",
      desc: "هل تخطط للبقاء أكثر من 15 يوماً؟ احصل على خصم حصري على جميع السيارات.",
      discount: "-20%",
      code: "LONG20",
      icon: "⏳",
      color: "from-blue-500/20 to-cyan-500/20",
      border: "hover:border-blue-500/50"
    }
  ];

  return (
    <div className="min-h-screen bg-[#080808] pt-32 pb-20 px-6 font-['Cairo']" dir="rtl">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl font-black text-white">عروض <span className="text-[#c4a661]">استثنائية</span></h1>
          <p className="text-gray-400 text-lg font-bold">اكتشف باقاتنا المصممة خصيصاً لتناسب احتياجاتك وميزانيتك.</p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promos.map((promo) => (
            <div 
              key={promo.id} 
              className={`bg-[#111111] rounded-[30px] p-8 border border-white/5 transition-all duration-500 shadow-2xl relative overflow-hidden group ${promo.border}`}
            >
              {/* بقعة ضوء في الخلفية */}
              <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${promo.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-5xl">{promo.icon}</span>
                  <span className="bg-white text-black font-black px-4 py-1 rounded-full text-sm shadow-lg">
                    {promo.discount}
                  </span>
                </div>
                
                <h3 className="text-2xl font-black text-white mb-4">{promo.title}</h3>
                <p className="text-gray-400 font-bold text-sm leading-relaxed mb-8 h-16">
                  {promo.desc}
                </p>

                {/* كود الخصم (Coupon) */}
                <div className="bg-black/50 border border-dashed border-white/20 rounded-xl p-4 text-center mb-8">
                  <span className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1">كود الخصم</span>
                  <span className="text-xl font-black text-[#c4a661] tracking-widest">{promo.code}</span>
                </div>

                <Link 
                  to="/cars"
                  className="w-full block text-center bg-white/5 hover:bg-[#c4a661] text-white hover:text-black font-black py-4 rounded-xl transition-all border border-white/10 hover:border-[#c4a661]"
                >
                  استخدم العرض الآن
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Offers;