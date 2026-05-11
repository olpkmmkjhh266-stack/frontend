import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { toast } from 'react-hot-toast';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [date, setDate] = useState([new Date(), new Date()]);
  const navigate = useNavigate();
  
  // States ديال طريقة الدفع
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  
  // 👇 State جديد ديال التصويرة الرئيسية اللي غتبان كبيرة
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    axios.get(`https://25ae9fba-373f-4c87-9e13-4f6d9e897713-00-2lenq371o9y9p.picard.replit.dev:3000/api/cars/${id}`).then(res => {
      setCar(res.data);
      // 👇 كنجبدو التصويرة اللولة باش تبان هي الأولى، إيلا مكانتش كنجبدو القديمة
      const firstImg = res.data.images && res.data.images.length > 0 ? res.data.images[0] : res.data.image;
      setMainImage(firstImg);
    });
  }, [id]);

  if (!car) return <div className="min-h-screen bg-black text-white p-20 text-center">جاري التحميل...</div>;

  const diffTime = Math.abs(date[1] - date[0]);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  const totalPrice = diffDays * car.pricePerDay;

  // دالة المتابعة لصفحة الدفع
  const handleProceedToCheckout = () => {
    if (!paymentMethod) {
        toast.error('المرجو اختيار طريقة الدفع أولاً');      
        return;
    }
    // كنصيفطو طريقة الدفع مع المعلومات لصفحة Checkout
    navigate('/checkout', { state: { car, date, totalPrice, paymentMethod } });
  };

  return (
    <div className="min-h-screen bg-[#080808] pt-32 pb-20 px-6 text-white font-['Cairo']" dir="rtl">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative">
        
        {/* ================= القسم الأيمن (الصور والتفاصيل) ================= */}
        <div className="space-y-6 md:space-y-8">
          
          {/* 🖼️ التصويرة الرئيسية الكبيرة */}
          <div className="rounded-3xl md:rounded-[40px] overflow-hidden border border-white/5 shadow-2xl relative bg-[#111111]">
            <img src={mainImage} alt={car.brand} className="w-full h-[250px] sm:h-[350px] lg:h-[500px] object-cover transition-all duration-500" />
            <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-black/80 text-[#c4a661] px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-black border border-[#c4a661]/20 backdrop-blur-sm">
              {car.category}
            </div>
          </div>

          {/* 📸 ألبوم الصور المصغرة (Gallery) */}
          {car.images && car.images.length > 1 && (
            <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2 custom-scrollbar">
              {car.images.map((img, index) => (
                <img 
                  key={index} 
                  src={img} 
                  alt={`${car.brand} ${index}`} 
                  onClick={() => setMainImage(img)} // ملي كيكليكي كتمشي للتصويرة الكبيرة
                  className={`flex-shrink-0 w-20 h-16 md:w-28 md:h-20 object-cover rounded-xl md:rounded-2xl cursor-pointer transition-all duration-300 border-2 ${mainImage === img ? 'border-[#c4a661] opacity-100 scale-105 shadow-lg' : 'border-transparent opacity-50 hover:opacity-100'}`} 
                />
              ))}
            </div>
          )}

          <div className="flex justify-between items-center pt-2 md:pt-4">
            <h1 className="text-3xl md:text-5xl font-black">{car.brand} <span className="text-[#c4a661]">{car.model}</span></h1>
          </div>
          
          <div className="grid grid-cols-3 gap-2 md:gap-4">
             <div className="bg-white/5 p-4 md:p-6 rounded-2xl md:rounded-3xl text-center border border-white/5">
                <span className="block text-xl md:text-2xl mb-1 md:mb-2">⚙️</span>
                <span className="text-[10px] md:text-xs text-gray-400 font-bold">ناقل الحركة</span>
                <p className="font-black mt-1 text-xs md:text-sm">أوتوماتيك</p>
             </div>
             <div className="bg-white/5 p-4 md:p-6 rounded-2xl md:rounded-3xl text-center border border-white/5">
                <span className="block text-xl md:text-2xl mb-1 md:mb-2">⛽</span>
                <span className="text-[10px] md:text-xs text-gray-400 font-bold">الوقود</span>
                <p className="font-black mt-1 text-xs md:text-sm">ديزل</p>
             </div>
             <div className="bg-white/5 p-4 md:p-6 rounded-2xl md:rounded-3xl text-center border border-white/5">
                <span className="block text-xl md:text-2xl mb-1 md:mb-2">👤</span>
                <span className="text-[10px] md:text-xs text-gray-400 font-bold">المقاعد</span>
                <p className="font-black mt-1 text-xs md:text-sm">5 مقاعد</p>
             </div>
          </div>
        </div>

        {/* ================= القسم الأيسر ديال الحجز ================= */}
        <div className="bg-[#111111] border border-white/10 p-6 md:p-10 rounded-[30px] md:rounded-[40px] h-fit lg:sticky top-32 shadow-3xl">
          <h3 className="text-xl md:text-2xl font-black mb-6 md:mb-8 border-b border-white/5 pb-4">تفاصيل الحجز</h3>
          
          <div className="space-y-6">
          <div className="calendar-container overflow-hidden" dir="ltr">
                <label className="text-[#c4a661] text-[10px] md:text-xs font-black mb-2 block uppercase tracking-widest mr-2">حدد فترة الحجز</label>
                 <Calendar 
                   onChange={setDate} 
                   selectRange={true} 
                   value={date} 
                   className="w-full border-none" 
                   locale="fr-FR" /* باش نتأكدو أن الأيام غيبقاو مقادين بالفرنسية */
                 />
               </div>

            <div className="bg-white/5 p-4 md:p-6 rounded-2xl space-y-4">
              <div className="flex justify-between font-bold text-sm md:text-base">
                <span className="text-gray-400 font-bold">السعر اليومي</span>
                <span className="text-white font-black">{car.pricePerDay} DH</span>
              </div>
              <div className="flex justify-between font-bold text-sm md:text-base">
                <span className="text-gray-400 font-bold">عدد الأيام</span>
                <span className="text-white font-black">{diffDays} يوم</span>
              </div>
              <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                <span className="text-base md:text-lg font-black">المجموع الإجمالي</span>
                <span className="text-2xl md:text-3xl font-black text-[#c4a661]">{totalPrice} DH</span>
              </div>
            </div>

            <button 
            onClick={() => navigate('/checkout', { state: { car, date, totalPrice } })}
            className="w-full bg-[#c4a661] hover:bg-white text-black font-black py-5 rounded-2xl text-xl transition-all shadow-[0_10px_40px_rgba(196,166,97,0.3)] cursor-pointer"
            >
            متابعة عملية الدفع
            </button>
            <p className="text-center text-gray-500 text-[10px] font-bold">لن يتم خصم أي مبلغ في هذه الخطوة</p>
          </div>
        </div>

      </div>

      {/* 💳 النافذة المنبثقة (Payment Modal) */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111111] border border-white/10 p-6 md:p-10 rounded-[30px] md:rounded-[40px] w-full max-w-lg shadow-2xl relative animate-fade-in">
            {/* زر الإغلاق */}
            <button 
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 left-4 md:top-6 md:left-6 text-gray-400 hover:text-white text-2xl transition-colors cursor-pointer"
            >
              ✕
            </button>
            
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">طريقة <span className="text-[#c4a661]">الدفع</span></h2>
            <p className="text-gray-400 font-bold mb-6 md:mb-8 text-xs md:text-sm">اختر الطريقة التي تناسبك لإتمام حجزك.</p>

            <div className="space-y-3 md:space-y-4 mb-8">
              {/* خيار الأداء عبر الإنترنت */}
              <label className={`flex items-center gap-4 p-4 md:p-5 rounded-2xl border cursor-pointer transition-all ${paymentMethod === 'online' ? 'bg-[#c4a661]/10 border-[#c4a661]' : 'bg-white/5 border-white/10 hover:border-white/30'}`}>
                <input type="radio" name="payment" className="hidden" onChange={() => setPaymentMethod('online')} />
                <span className="text-2xl md:text-3xl">💳</span>
                <div>
                  <h4 className={`font-black text-base md:text-lg ${paymentMethod === 'online' ? 'text-[#c4a661]' : 'text-white'}`}>الدفع عبر الإنترنت</h4>
                  <p className="text-[10px] md:text-xs text-gray-500 font-bold">أداء آمن بالبطاقة البنكية (CMI)</p>
                </div>
              </label>

              {/* خيار كاش بلس */}
              <label className={`flex items-center gap-4 p-4 md:p-5 rounded-2xl border cursor-pointer transition-all ${paymentMethod === 'cashplus' ? 'bg-[#c4a661]/10 border-[#c4a661]' : 'bg-white/5 border-white/10 hover:border-white/30'}`}>
                <input type="radio" name="payment" className="hidden" onChange={() => setPaymentMethod('cashplus')} />
                <img src="https://cdn.prod.website-files.com/6218cd1560a71e2f136765f7/6862e5d0d7cf29f11d80c43d_LOGO%20CASHPLUS.svg" alt="Cash Plus" className="h-4 md:h-5 brightness-0 invert opacity-80" />
                <div>
                  <h4 className={`font-black text-base md:text-lg ${paymentMethod === 'cashplus' ? 'text-[#c4a661]' : 'text-white'}`}>كاش بلس (Cash Plus)</h4>
                  <p className="text-[10px] md:text-xs text-gray-500 font-bold">الدفع نقداً في أقرب وكالة كاش بلس</p>
                </div>
              </label>

              {/* خيار وفا كاش */}
              <label className={`flex items-center gap-4 p-4 md:p-5 rounded-2xl border cursor-pointer transition-all ${paymentMethod === 'wafacash' ? 'bg-[#c4a661]/10 border-[#c4a661]' : 'bg-white/5 border-white/10 hover:border-white/30'}`}>
                <input type="radio" name="payment" className="hidden" onChange={() => setPaymentMethod('wafacash')} />
                <img src="https://www.wafacash.com/sites/default/files/styles/webp/public/2025-04/Logo_Wafacash_MarocB.png.webp?itok=AQgKJayv" alt="Wafacash" className="h-4 md:h-5 brightness-0 invert opacity-80" />
                <div>
                  <h4 className={`font-black text-base md:text-lg ${paymentMethod === 'wafacash' ? 'text-[#c4a661]' : 'text-white'}`}>وفا كاش (Wafacash)</h4>
                  <p className="text-[10px] md:text-xs text-gray-500 font-bold">الدفع نقداً عبر وكالات وفا كاش</p>
                </div>
              </label>
            </div>

            <button 
              onClick={handleProceedToCheckout}
              className="w-full bg-[#c4a661] hover:bg-white text-black font-black py-4 rounded-2xl text-lg md:text-xl transition-all shadow-lg cursor-pointer"
            >
              تأكيد والمتابعة
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default CarDetails;