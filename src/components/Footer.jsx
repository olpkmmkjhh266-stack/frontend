import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0a0a0a] pt-16 pb-8 border-t border-white/5 font-['Cairo'] text-white" dir="rtl">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* ================= القسم العلوي (3 أعمدة) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start pb-12">
          
          {/* 1. تابعنا على (اليمين) */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-right lg:pl-10 lg:border-l border-white/5 h-full">
            <h3 className="text-xl font-black mb-3">تابعنا على</h3>
            <p className="text-gray-400 text-xs font-bold mb-8">تابعنا على وسائل التواصل الاجتماعي لأحدث العروض والأخبار</p>
            
            {/* الدوائر الذهبية بالأيقونات الأصلية (SVGs) */}
            <div className="flex gap-3">
              {/* Facebook */}
              <a href="#" className="w-10 h-10 rounded-full border border-[#c4a661]/50 flex items-center justify-center text-[#c4a661] hover:bg-[#c4a661] hover:text-black transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" className="w-10 h-10 rounded-full border border-[#c4a661]/50 flex items-center justify-center text-[#c4a661] hover:bg-[#c4a661] hover:text-black transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              {/* TikTok */}
              <a href="#" className="w-10 h-10 rounded-full border border-[#c4a661]/50 flex items-center justify-center text-[#c4a661] hover:bg-[#c4a661] hover:text-black transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.23-1.13 4.39-2.85 5.76-1.57 1.25-3.66 1.81-5.63 1.5-2.48-.36-4.59-1.92-5.65-4.14-1.11-2.31-1.07-5.11.16-7.37 1.05-1.95 2.98-3.37 5.14-3.79.29-.05.58-.09.88-.11v4.02c-1.05.15-2.09.7-2.73 1.53-.87 1.12-1.07 2.71-.53 4.02.48 1.16 1.56 2.05 2.81 2.27 1.4.24 2.9-.22 3.84-1.28 1.01-1.11 1.46-2.63 1.43-4.15-.04-4.81-.01-9.63-.03-14.44h-1.06z"/></svg>
              </a>
              {/* YouTube */}
              <a href="#" className="w-10 h-10 rounded-full border border-[#c4a661]/50 flex items-center justify-center text-[#c4a661] hover:bg-[#c4a661] hover:text-black transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M21.582 5.49a2.988 2.988 0 0 0-2.103-2.115C17.616 3 12 3 12 3s-5.616 0-7.48.375a2.986 2.986 0 0 0-2.102 2.115C2 7.378 2 12 2 12s0 4.622.418 6.51a2.988 2.988 0 0 0 2.103 2.114C6.384 21 12 21 12 21s5.616 0 7.479-.376a2.986 2.986 0 0 0 2.103-2.114C22 16.622 22 12 22 12s0-4.622-.418-6.51zM10 15V9l5.2 3-5.2 3z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="w-10 h-10 rounded-full border border-[#c4a661]/50 flex items-center justify-center text-[#c4a661] hover:bg-[#c4a661] hover:text-black transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
              </a>
            </div>
          </div>

          {/* 2. النشرة البريدية (الوسط) */}
          <div className="flex flex-col items-center text-center px-4 lg:px-10 lg:border-l border-white/5 h-full">
            <div className="w-12 h-12 rounded-full border border-[#c4a661]/50 flex items-center justify-center text-[#c4a661] mb-4">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/></svg>
            </div>
            <h3 className="text-xl font-black mb-2">اشترك في <span className="text-[#c4a661]">نشرتنا البريدية</span></h3>
            <p className="text-gray-400 text-xs font-bold mb-6">اشترك الآن وكن أول من يعرف عن العروض والخصومات الحصرية.</p>
            
            <form className="w-full max-w-sm flex bg-transparent border border-white/10 rounded-lg overflow-hidden h-10">
              <input type="email" placeholder="أدخل بريدك الإلكتروني" className="flex-1 bg-transparent px-4 text-white text-[11px] outline-none text-right" required />
              <button type="submit" className="bg-[#c4a661] text-black text-xs font-black px-6 hover:bg-white transition-colors cursor-pointer">اشترك الآن</button>
            </form>
          </div>

          {/* 3. حمل تطبيقنا (اليسار) */}
          <div className="flex items-center justify-center lg:justify-end gap-6 h-full">
            <div className="text-right">
              <h3 className="text-xl font-black mb-2">حمل تطبيقنا <span className="text-[#c4a661]">الآن</span></h3>
              <p className="text-gray-400 text-xs font-bold mb-6">احجز سيارتك أينما كنت<br/>وبكل سهولة</p>
              
              <div className="flex gap-2 justify-end">
                {/* Google Play Button */}
                <a href="#" className="bg-black border border-white/20 rounded-md px-3 py-1.5 flex items-center gap-2 hover:border-white/50 transition-colors">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5.38 0 .74.15 1.01.42l11.4 11.4-2.8 2.8L3 5.3v15.2zM18.8 15.3l3.4-1.9c.7-.4 1.2-1.1 1.2-1.9s-.5-1.5-1.2-1.9l-3.4-1.9-2.8 2.8 2.8 2.8z"/></svg>
                  <div className="text-left">
                    <div className="text-[7px] text-gray-400 uppercase leading-none">Get it on</div>
                    <div className="text-[10px] font-bold text-white leading-tight">Google Play</div>
                  </div>
                </a>
                {/* App Store Button */}
                <a href="#" className="bg-black border border-white/20 rounded-md px-3 py-1.5 flex items-center gap-2 hover:border-white/50 transition-colors">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M18.7 15.4c-.1-3.2 2.6-4.8 2.8-4.9-1.5-2.2-3.8-2.5-4.6-2.6-2-.2-3.9 1.2-4.9 1.2-1 0-2.6-1.2-4.2-1.1-2.1.1-4 1.2-5.1 3.1-2.2 3.8-.6 9.4 1.5 12.5 1 1.5 2.2 3.2 3.8 3.1 1.5-.1 2.1-1 3.9-1 1.8 0 2.4 1 3.9 1 1.6.1 2.6-1.5 3.6-3 1.2-1.7 1.7-3.4 1.8-3.5-.1-.1-2.5-1-2.5-4.8zM15.4 4.5c.8-1 1.4-2.4 1.2-3.8-1.2.1-2.7.8-3.6 1.8-.7.8-1.4 2.2-1.2 3.6 1.4.1 2.8-.6 3.6-1.6z"/></svg>
                  <div className="text-left">
                    <div className="text-[7px] text-gray-400 uppercase leading-none">Download on the</div>
                    <div className="text-[10px] font-bold text-white leading-tight">App Store</div>
                  </div>
                </a>
              </div>
            </div>
            {/* Phone Image */}
            <div className="w-20 md:w-24 flex-shrink-0">
            </div>
          </div>

        </div>

        {/* ================= القسم السفلي ================= */}
        <div className="border-t border-white/5 pt-6 flex flex-col-reverse md:flex-row justify-between items-center gap-6">
          
          {/* Copyrights + Arrow */}
          <div className="flex items-center gap-4">
            <p className="text-gray-500 text-[10px] font-bold">أكراء السيارات. جميع الحقوق محفوظة.</p>
            <button onClick={scrollToTop} className="w-8 h-8 border border-white/10 rounded-md flex items-center justify-center text-gray-500 hover:text-[#c4a661] hover:border-[#c4a661] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7"/></svg>
            </button>
          </div>

          {/* Secure text */}
          <div className="flex items-center gap-3">
             <div className="text-[#c4a661] border border-[#c4a661] rounded-full w-8 h-8 flex items-center justify-center">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.4 0 2.8 1.1 2.8 2.5V11c.6 0 1.2.6 1.2 1.2v3.5c0 .7-.6 1.3-1.2 1.3H9.2c-.7 0-1.2-.6-1.2-1.3v-3.5c0-.7.6-1.2 1.2-1.2V9.5C9.2 8.1 10.6 7 12 7zm0 1c-.8 0-1.5.7-1.5 1.5V11h3V9.5c0-.8-.7-1.5-1.5-1.5z"/></svg>
             </div>
             <div className="text-right">
                <p className="text-white text-xs font-black">موقع آمن ومشفر</p>
                <p className="text-gray-500 text-[9px] font-bold">جميع بياناتك محمية ومؤمنة</p>
             </div>
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-3">
             <span className="text-[10px] text-gray-400 mr-2">طرق الدفع الآمنة</span>
             <div className="flex gap-2">
                {/* رسمنا مستطيلات صغار فيهم السميات بحال اللوغويات باش يجي داكشي نقي ومتناسق */}
                {['VISA', 'MASTERCARD', 'AMEX', 'Apple Pay', 'PayPal'].map((pay, i) => (
                  <div key={i} className="bg-white px-2 py-0.5 rounded text-[8px] font-black text-black tracking-wider flex items-center justify-center h-5">
                    {pay}
                  </div>
                ))}
             </div>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;