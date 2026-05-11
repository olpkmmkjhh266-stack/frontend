const About = () => (
  <div className="min-h-screen bg-[#080808] pt-40 pb-20 px-6 text-white text-right font-['Cairo']" dir="rtl">
    <div className="max-w-4xl mx-auto space-y-12">
      <h1 className="text-6xl font-black italic text-[#c4a661]">قصتنا...</h1>
      <p className="text-2xl text-gray-300 leading-relaxed font-light">
        نحن لسنا مجرد شركة لكراء السيارات، نحن رفقاء دربكم في المغرب. تأسست <span className="text-white font-black">NINJA DRIVE</span> لتقدم مفهوم الفخامة والالتزام بالمواعيد.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
        <div className="bg-white/5 p-8 rounded-[30px] border border-white/10">
          <h3 className="text-[#c4a661] text-2xl font-black mb-4">رؤيتنا</h3>
          <p className="text-gray-400 font-bold">أن نصبح الوجهة الأولى لكل من يبحث عن التميز والراحة في طرقات المملكة.</p>
        </div>
        <div className="bg-white/5 p-8 rounded-[30px] border border-white/10">
          <h3 className="text-[#c4a661] text-2xl font-black mb-4">قيمنا</h3>
          <p className="text-gray-400 font-bold">الشفافية المطلقة، السيارات الحديثة، والخدمة التي تليق بمقامكم.</p>
        </div>
      </div>
    </div>
  </div>
);
export default About;