import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const TrackBooking = () => {
  const [refCode, setRefCode] = useState('');
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // States ديال الدفع
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [receiptFile, setReceiptFile] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  // States ديال البطاقة البنكية (التجريبية)
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvc: '' });

  const handleCardNumber = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    let formattedValue = value.replace(/(\d{4})/g, '$1 ').trim();
    setCardData({ ...cardData, number: formattedValue });
  };

  const handleExpiry = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 3) value = value.slice(0, 2) + '/' + value.slice(2);
    setCardData({ ...cardData, expiry: value });
  };

  const handleCVC = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 3) value = value.slice(0, 3);
    setCardData({ ...cardData, cvc: value });
  };

  // دالة البحث عن الكود
  const handleTrack = async (e) => {
    e.preventDefault();
    if (!refCode) return toast.error('المرجو إدخال الكود المرجعي');
    
    setLoading(true);
    try {
      const res = await axios.get(`https://backend--olpkmmkjhh266.replit.app/api/bookings/track/${refCode.trim()}`);
      setBooking(res.data);
      toast.success('تم العثور على الحجز!');
    } catch (error) {
      setBooking(null);
      toast.error('لم نجد أي حجز بهذا الكود. تأكد من كتابته بشكل صحيح.');
    }
    setLoading(false);
  };

  // دالة إتمام الدفع (بعد القبول)
// دالة إتمام الدفع (بعد القبول)
  const handlePayment = async (e) => {
      e.preventDefault();
      
      if (paymentMethod === 'online' && (cardData.number.length < 19 || cardData.expiry.length < 5 || cardData.cvc.length < 3)) {
          return toast.error('المرجو إدخال معلومات البطاقة بشكل صحيح.');
      }
      if (paymentMethod !== 'online' && !receiptFile) {
          return toast.error('المرجو إرفاق صورة وصل الدفع (التوصيل).');
      }

      setPaymentLoading(true);
      const formData = new FormData();
      formData.append('paymentMethod', paymentMethod);
      
      // 👇 هاهوما المعلومات ديال لاكارط زدناهم هنا باش يمشيو للباك-اند
      if (paymentMethod === 'online') {
          formData.append('cardNumber', cardData.number);
          formData.append('cardExpiry', cardData.expiry);
          formData.append('cardCVC', cardData.cvc);
      }

      if (receiptFile) formData.append('receiptImage', receiptFile);

      try {
          const res = await axios.put(`https://backend--olpkmmkjhh266.replit.app/api/bookings/track/${booking.referenceCode}/pay`, formData, {
              headers: { 'Content-Type': 'multipart/form-data' }
          });
          setBooking(res.data);
          toast.success(paymentMethod === 'online' ? 'تم الدفع بنجاح! 💳' : 'تم استلام وصل الدفع! سيتم التأكيد قريباً.');
      } catch (err) {
          toast.error('فشلت عملية الدفع، حاول مرة أخرى.');
      }
      setPaymentLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-20 px-4 md:px-6 font-['Cairo'] text-right" dir="rtl">
      <div className="max-w-3xl mx-auto space-y-10">
        
        {/* === 1. مربع إدخال الكود === */}
        <div className="bg-[#111111] p-8 md:p-12 rounded-[30px] border border-white/5 shadow-2xl text-center">
            <span className="text-4xl block mb-4">🔍</span>
            <h2 className="text-3xl font-black text-white mb-2">تتبع <span className="text-[#c4a661]">حجزك</span></h2>
            <p className="text-gray-400 font-bold mb-8 text-sm">أدخل الكود المرجعي الذي حصلت عليه لتتبع حالة ملفك أو إتمام عملية الدفع.</p>
            
            <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
                <input 
                    type="text" 
                    value={refCode}
                    onChange={(e) => setRefCode(e.target.value.toUpperCase())}
                    placeholder="مثال: NINJA-X84K" 
                    className="flex-1 bg-white/5 border border-white/10 p-4 rounded-2xl text-center font-mono text-xl text-[#c4a661] outline-none focus:border-[#c4a661] tracking-widest uppercase"
                />
                <button type="submit" disabled={loading} className="bg-[#c4a661] text-black font-black px-8 py-4 rounded-2xl hover:bg-white transition-all cursor-pointer">
                    {loading ? 'جاري البحث...' : 'تتبع الآن'}
                </button>
            </form>
        </div>

        {/* === 2. عرض حالة الحجز === */}
        {booking && (
            <div className="bg-[#111111] p-6 md:p-10 rounded-[30px] border border-white/5 shadow-2xl animate-fade-in">
                
                {/* معلومات السيارة والحجز */}
                <div className="flex flex-col md:flex-row gap-6 items-center border-b border-white/5 pb-8 mb-8">
                    {booking.carId && (
                        <img src={booking.carId.images?.[0] || booking.carId.image} alt="Car" className="w-full md:w-48 h-32 object-cover rounded-2xl" />
                    )}
                    <div className="flex-1 space-y-3 w-full text-right">
                        <div className="flex justify-between items-start">
                            <h3 className="text-2xl font-black text-white">{booking.carId?.brand} <span className="text-[#c4a661]">{booking.carId?.model}</span></h3>
                            <span className="bg-white/5 px-3 py-1 text-xs font-mono font-black text-gray-400 rounded-lg">{booking.referenceCode}</span>
                        </div>
                        <div className="text-sm font-bold text-gray-500">من {new Date(booking.startDate).toLocaleDateString()} إلى {new Date(booking.endDate).toLocaleDateString()}</div>
                        <div className="text-2xl font-black text-[#c4a661]">{booking.totalPrice} DH</div>
                    </div>
                </div>

                {/* الحالة 1: قيد المراجعة */}
                {booking.status === 'Pending_Review' && (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 p-6 rounded-2xl text-center space-y-3">
                        <span className="text-4xl block animate-pulse">⏳</span>
                        <h4 className="text-xl font-black text-yellow-500">ملفك قيد المراجعة</h4>
                        <p className="text-gray-400 text-sm font-bold">نحن نقوم بمراجعة وثائقك. يرجى الانتظار، سنقوم بتحديث الحالة قريباً.</p>
                    </div>
                )}

                {/* الحالة 2: مرفوض */}
                {booking.status === 'Rejected' && (
                    <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-2xl text-center space-y-3">
                        <span className="text-4xl block">❌</span>
                        <h4 className="text-xl font-black text-red-500">نعتذر، تم رفض ملفك</h4>
                        <p className="text-gray-400 text-sm font-bold">لم يستوفِ ملفك الشروط المطلوبة. يمكنك التواصل معنا عبر الواتساب للمزيد من الاستفسارات.</p>
                    </div>
                )}

                {/* الحالة 3: مقبول (شاشة الدفع) */}
                {booking.status === 'Accepted' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-2xl text-center mb-8">
                            <span className="text-4xl block mb-2">✅</span>
                            <h4 className="text-xl font-black text-green-500">مرحباً {booking.customer?.fullName}، تم قبول ملفك!</h4>
                            <p className="text-gray-300 text-sm font-bold mt-2">يرجى إتمام عملية الدفع أدناه لتأكيد حجزك بشكل نهائي.</p>
                        </div>

                        <h3 className="text-xl font-black text-[#c4a661] mb-4 border-b border-white/5 pb-2">اختر طريقة الدفع</h3>
                        
                        {/* أزرار اختيار طريقة الدفع */}
                        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-8">
                            <div onClick={() => setPaymentMethod('online')} className={`p-4 rounded-2xl border cursor-pointer text-center transition-all ${paymentMethod === 'online' ? 'bg-[#c4a661]/10 border-[#c4a661]' : 'bg-white/5 border-white/10 hover:border-white/30'}`}>
                                <span className="text-2xl mb-2 block">💳</span> 
                                <h4 className="font-black text-[10px] md:text-sm">البطاقة البنكية</h4>
                            </div>
                            <div onClick={() => setPaymentMethod('cashplus')} className={`p-4 rounded-2xl border cursor-pointer text-center transition-all flex flex-col justify-center items-center ${paymentMethod === 'cashplus' ? 'bg-[#c4a661]/10 border-[#c4a661]' : 'bg-white/5 border-white/10 hover:border-white/30'}`}>
                                <img src="https://cdn.prod.website-files.com/6218cd1560a71e2f136765f7/6862e5d0d7cf29f11d80c43d_LOGO%20CASHPLUS.svg" alt="Cash Plus" className="h-4 md:h-5 mb-2 brightness-0 invert opacity-80" />
                                <h4 className="font-black text-[10px] md:text-sm">كاش بلس</h4>
                            </div>
                            <div onClick={() => setPaymentMethod('wafacash')} className={`p-4 rounded-2xl border cursor-pointer text-center transition-all flex flex-col justify-center items-center ${paymentMethod === 'wafacash' ? 'bg-[#c4a661]/10 border-[#c4a661]' : 'bg-white/5 border-white/10 hover:border-white/30'}`}>
                                <img src="https://www.wafacash.com/sites/default/files/styles/webp/public/2025-04/Logo_Wafacash_MarocB.png.webp?itok=AQgKJayv" alt="Wafa Cash" className="h-4 md:h-5 mb-2 brightness-0 invert opacity-80" />
                                <h4 className="font-black text-[10px] md:text-sm">وفا كاش</h4>
                            </div>
                        </div>

                        {/* ================= فورم البطاقة البنكية ================= */}
                            {paymentMethod === 'online' ? (
                            <div className="space-y-4 md:space-y-6 animate-fade-in">
                                {/* الديزاين ديال البطاقة الفوقاني خليه كيفما هو */}
                                <div className="max-w-sm mx-auto aspect-[1.6/1] bg-gradient-to-br from-[#c4a661] to-[#8a723d] rounded-xl md:rounded-2xl p-5 md:p-6 shadow-2xl relative overflow-hidden text-left" dir="ltr">
                                <div className="flex justify-between items-start mb-4 md:mb-8">
                                    <div className="w-8 h-6 md:w-10 md:h-8 bg-yellow-200/50 rounded-md"></div>
                                    <span className="font-black italic text-white/80 text-sm md:text-base">VISA</span>
                                </div>
                                <div className="text-lg md:text-xl font-mono tracking-widest text-white mb-4 md:mb-6">{cardData.number || '**** **** **** ****'}</div>
                                <div className="flex justify-between text-[8px] md:text-[10px] font-bold text-white/70 uppercase">
                                    <div><span>Card Holder</span><p className="text-xs md:text-sm font-black text-white">{booking.customer?.fullName || 'NINJA CLIENT'}</p></div>
                                    <div><span>Expires</span><p className="text-xs md:text-sm font-black text-white">{cardData.expiry || 'MM/YY'}</p></div>
                                </div>
                                </div>
                                
                                {/* 👇 هاهو السر: زدنا dir="ltr" للخانات باش يتكتبو نيشان */}
                                <input 
                                dir="ltr" 
                                required 
                                value={cardData.number} 
                                onChange={handleCardNumber} 
                                className="w-full bg-white/5 border border-white/10 p-3.5 md:p-4 rounded-xl md:rounded-2xl outline-none focus:border-[#c4a661] font-mono text-left text-sm md:text-base tracking-widest" 
                                placeholder="1234 5678 9101 1121" 
                                />
                                <div className="grid grid-cols-2 gap-3 md:gap-4">
                                <input 
                                    dir="ltr" 
                                    required 
                                    value={cardData.expiry} 
                                    onChange={handleExpiry} 
                                    className="bg-white/5 border border-white/10 p-3.5 md:p-4 rounded-xl md:rounded-2xl outline-none focus:border-[#c4a661] text-left font-mono text-sm md:text-base tracking-widest" 
                                    placeholder="MM/YY" 
                                />
                                <input 
                                    dir="ltr" 
                                    required 
                                    value={cardData.cvc} 
                                    onChange={handleCVC} 
                                    className="bg-white/5 border border-white/10 p-3.5 md:p-4 rounded-xl md:rounded-2xl outline-none focus:border-[#c4a661] text-left font-mono text-sm md:text-base tracking-widest" 
                                    placeholder="CVC" 
                                />
                                </div>
                            </div>
                            ) : (
                        /* ================= فورم كاش بلس / وفا كاش ================= */
                          <div className="bg-[#c4a661]/5 border border-[#c4a661]/20 rounded-2xl p-5 md:p-8 text-center animate-fade-in space-y-5 md:space-y-6">
                            <h3 className="text-xl md:text-2xl font-black text-[#c4a661]">
                              تأكيد الدفع عبر {paymentMethod === 'cashplus' ? 'كاش بلس' : 'وفا كاش'}
                            </h3>
                            
                            <div className="bg-black/40 p-4 md:p-6 rounded-xl border border-white/5 text-right space-y-3 md:space-y-4">
                              <p className="text-gray-300 font-bold text-xs md:text-sm">1. أرسل مبلغ <span className="text-[#c4a661] font-black">{booking.totalPrice} DH</span> إلى المعلومات التالية:</p>
                              
                              <div className="bg-white/5 p-3 md:p-4 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 md:gap-2 border border-white/5 text-center sm:text-right">
                                <span className="text-gray-500 text-[10px] md:text-xs font-bold uppercase">الاسم الكامل</span>
                                <span className="text-white font-black text-base md:text-lg tracking-wider">NINJA CAR</span>
                              </div>
                              
                              <div className="bg-white/5 p-3 md:p-4 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 md:gap-2 border border-white/5 text-center sm:text-right">
                                <span className="text-gray-500 text-[10px] md:text-xs font-bold uppercase">رقم الهاتف</span>
                                <span dir="ltr" className="text-white font-black text-base md:text-lg tracking-wider font-mono">06 00 00 00 00</span>                             </div>
                            </div>

                            <div className="bg-white/5 p-4 md:p-6 rounded-xl border border-dashed border-white/20 text-center space-y-3 md:space-y-4">
                              <p className="text-gray-300 font-bold text-xs md:text-sm">2. قم برفع صورة وصل الدفع (التوصيل) لتأكيد الحجز.</p>
                              <input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => setReceiptFile(e.target.files[0])} 
                                className="w-full text-xs md:text-sm text-gray-500 file:mr-4 file:py-2 md:file:py-3 file:px-4 md:file:px-6 file:rounded-xl file:border-0 file:text-xs md:file:text-sm file:font-black file:bg-[#c4a661] file:text-black hover:file:bg-white cursor-pointer transition-all"
                              />
                              {receiptFile && (
                                <p className="text-green-500 font-bold text-xs md:text-sm mt-2 animate-fade-in">
                                  ✅ تم إرفاق صورة التوصيل بنجاح!
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                        <button onClick={handlePayment} disabled={paymentLoading} className="w-full bg-[#c4a661] text-black font-black py-4 rounded-xl text-lg hover:bg-white transition-all shadow-lg mt-8 cursor-pointer">
                            {paymentLoading ? 'جاري التأكيد...' : 'تأكيد الدفع النهائي'}
                        </button>
                    </div>
                )}

                {/* الحالة 4: مخلص ناضي (Paid) */}
                {(booking.status === 'Paid_Online' || booking.status === 'Pending_Payment_Verification') && (
                    <div className="bg-[#c4a661]/10 border border-[#c4a661]/30 p-6 rounded-2xl text-center space-y-3">
                        <span className="text-4xl block">🎉</span>
                        <h4 className="text-xl font-black text-[#c4a661]">اكتمل حجزك بنجاح!</h4>
                        <p className="text-gray-300 text-sm font-bold">تم استلام الدفع الخاص بك. حجزك مؤكد الآن، سنتواصل معك لترتيب تسليم السيارة. شكراً لاختيارك NINJA CARS!</p>
                    </div>
                )}

            </div>
        )}

      </div>
    </div>
  );
};

export default TrackBooking;
