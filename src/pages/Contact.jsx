const Contact = () => (
  <div className="min-h-screen bg-[#080808] pt-40 pb-20 px-6 text-white text-right font-['Cairo']" dir="rtl">
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
      <div>
        <h2 className="text-5xl font-black mb-8">نحن في <span className="text-[#c4a661]">خدمتكم</span></h2>
        <p className="text-gray-400 text-lg mb-12 font-bold">فريقنا متواجد 24/7 للإجابة على تساؤلاتكم وتسهيل عملية حجزكم.</p>
      
      </div>
      <form className="bg-[#111111] p-10 rounded-[40px] border border-white/10 space-y-6">
        <input className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-[#c4a661]" type="text" placeholder="الاسم الكامل" />
        <input className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-[#c4a661]" type="email" placeholder="البريد الإلكتروني" />
        <textarea className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-[#c4a661] h-32" placeholder="رسالتك..."></textarea>
        <button className="w-full bg-[#c4a661] text-black font-black py-4 rounded-2xl hover:bg-white transition-all cursor-pointer">إرسال الرسالة</button>
      </form>
    </div>
  </div>
);
export default Contact;