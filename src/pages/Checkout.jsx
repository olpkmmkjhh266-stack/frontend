import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import SignatureCanvas from 'react-signature-canvas';

const Checkout = () => {
  const { state } = useLocation();
  const { car, date, totalPrice } = state || {};
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [reference, setReference] = useState(null); // باش نخبيو الكود المرجعي
  const sigCanvas = useRef({}); // مرجع (Ref) لكانفا التوقيع

  const [formData, setFormData] = useState({
    fullName: '', phone: '', idCard: ''
  });

  // ملفات الدوسي
  const [cinFile, setCinFile] = useState(null);
  const [permisFile, setPermisFile] = useState(null);

  // دالة باش نحولو التوقيع من Base64 لـ ملف (Blob) باش يقبلو الباك-اند
  const dataURLtoBlob = (dataurl) => {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){ u8arr[n] = bstr.charCodeAt(n); }
    return new Blob([u8arr], {type:mime});
  };

    const handleBooking = async (e) => {
        e.preventDefault();
        if (step === 1) { setStep(2); return; }
        
        if (step === 2) {
            if (!cinFile || !permisFile) {
                toast.error('المرجو إرفاق صورة البطاقة الوطنية ورخصة السياقة.');
                return;
            }
            if (sigCanvas.current.isEmpty()) {
                toast.error('المرجو وضع توقيعك الإلكتروني أسفل العقد.');
                return;
            }

            setLoading(true);
            
            try {
                // تجهيز البيانات كـ FormData
                const submitData = new FormData();
                submitData.append('carId', car._id);
                submitData.append('startDate', date[0]);
                submitData.append('endDate', date[1]);
                submitData.append('totalPrice', totalPrice);
                submitData.append('customer', JSON.stringify(formData));
                submitData.append('cinImage', cinFile);
                submitData.append('permisImage', permisFile);
                
                // تحويل التوقيع وإضافته
                const signatureBlob = dataURLtoBlob(sigCanvas.current.getCanvas().toDataURL('image/png'));
                submitData.append('signatureImage', signatureBlob, 'signature.png');

                console.log("🚀 جاري إرسال الطلب للسيرفور...");

                const response = await axios.post('https://25ae9fba-373f-4c87-9e13-4f6d9e897713-00-2lenq371o9y9p.picard.replit.dev:3000/api/bookings', submitData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                toast.success('تم رفع ملفك بنجاح! 🚀');
                setReference(response.data.referenceCode);
                setStep(3); 
            } catch (error) {
                console.error("🔴 إيرور في الفرونت-اند:", error);
                toast.error('حدث خطأ! المرجو تفقد الكونسول (F12).');
            } finally {
                setLoading(false); // هادي غتحبس ديك "جاري الإرسال..." واخا يوقع إيرور
            }
        }
    };

  if (!car) return <div className="pt-40 text-center text-white">بيانات مفقودة</div>;

  return (
    <div className="min-h-screen bg-[#050505] pt-28 md:pt-32 pb-20 px-4 md:px-6 text-white text-right font-['Cairo']" dir="rtl">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        
        {/* ================= Sidebar (معلومات الطوموبيل) ================= */}
        <div className={`lg:col-span-4 order-2 lg:order-1 ${step === 3 ? 'hidden lg:block' : ''}`}>
          <div className="bg-[#111111] p-6 md:p-8 rounded-[30px] border border-white/5 shadow-2xl lg:sticky top-32">
            <img src={car.images && car.images.length > 0 ? car.images[0] : car.image} className="w-full h-32 md:h-40 object-cover rounded-2xl mb-6" alt={car.brand} />
            <h3 className="text-xl md:text-2xl font-black mb-4">{car.brand} <span className="text-[#c4a661]">{car.model}</span></h3>
            <div className="space-y-3 text-sm border-t border-white/5 pt-4">
              <div className="flex justify-between text-gray-500 font-bold">
                <span>الأيام:</span> <span>{Math.ceil(Math.abs(date[1] - date[0]) / (1000 * 60 * 60 * 24)) || 1} يوم</span>
              </div>
              <div className="flex justify-between text-xl md:text-2xl font-black text-[#c4a661] pt-4">
                <span>المجموع:</span> <span>{totalPrice} DH</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= Main Content ================= */}
        <div className={`lg:col-span-8 order-1 lg:order-2 ${step === 3 ? 'lg:col-span-12 flex justify-center' : ''}`}>
          
          {/* شريط المراحل */}
          {step < 3 && (
            <div className="flex items-center gap-3 md:gap-4 mb-8 justify-center md:justify-start">
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-black text-sm md:text-base ${step === 1 ? 'bg-[#c4a661] text-black' : 'bg-green-500 text-white'}`}>1</div>
              <div className="h-0.5 w-6 md:w-10 bg-white/10"></div>
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-black text-sm md:text-base ${step === 2 ? 'bg-[#c4a661] text-black' : 'bg-white/10 text-white'}`}>2</div>
              <h2 className="text-2xl md:text-3xl font-black mr-2 md:mr-4">{step === 1 ? 'معلومات الزبون' : 'العقد والتوقيع'}</h2>
            </div>
          )}

          {step < 3 ? (
            <form onSubmit={handleBooking} className="bg-[#111111] p-6 md:p-10 rounded-[30px] md:rounded-[40px] border border-white/10 shadow-3xl">
              
              {/* ----------------- المرحلة 1: معلومات الزبون ----------------- */}
              {step === 1 && (
                <div className="space-y-5 md:space-y-6 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] md:text-xs font-black text-[#c4a661] uppercase mr-2">الاسم الكامل</label>
                      <input required className="w-full bg-white/5 border border-white/10 p-3.5 md:p-4 rounded-xl md:rounded-2xl outline-none focus:border-[#c4a661]" type="text" onChange={(e)=>setFormData({...formData, fullName: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] md:text-xs font-black text-[#c4a661] uppercase mr-2">رقم الهاتف</label>
                      <input required className="w-full bg-white/5 border border-white/10 p-3.5 md:p-4 rounded-xl md:rounded-2xl outline-none focus:border-[#c4a661] text-left font-mono" type="tel" placeholder="06XXXXXXXX" onChange={(e)=>setFormData({...formData, phone: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] md:text-xs font-black text-[#c4a661] uppercase mr-2">رقم البطاقة الوطنية (CIN)</label>
                    <input required className="w-full bg-white/5 border border-white/10 p-3.5 md:p-4 rounded-xl md:rounded-2xl outline-none focus:border-[#c4a661]" type="text" onChange={(e)=>setFormData({...formData, idCard: e.target.value})} />
                  </div>
                  
                  <button className="w-full bg-[#c4a661] text-black font-black py-4 md:py-5 rounded-xl md:rounded-2xl text-lg md:text-xl mt-8 cursor-pointer hover:bg-white transition-all shadow-lg">
                    متابعة للعقد والتوقيع
                  </button>
                </div>
              )}

              {/* ----------------- المرحلة 2: رفع الدوسي والتوقيع ----------------- */}
              {step === 2 && (
                <div className="space-y-6 md:space-y-8 animate-fade-in">
                  <p className="text-gray-400 font-bold text-sm md:text-base border-b border-white/5 pb-4">
                    المرجو إرفاق الوثائق المطلوبة (يجب أن تكون رخصة السياقة أقدم من سنتين).
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* البطاقة الوطنية */}
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
                        <span className="text-2xl block mb-2">🪪</span>
                        <h4 className="text-[#c4a661] font-black text-sm mb-2">البطاقة الوطنية (CIN)</h4>
                        <input type="file" accept="image/*" onChange={(e) => setCinFile(e.target.files[0])} className="w-full text-xs text-gray-500 file:mr-0 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-white/10 file:text-white hover:file:bg-[#c4a661] hover:file:text-black cursor-pointer transition-all" />
                    </div>
                    {/* رخصة السياقة */}
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
                        <span className="text-2xl block mb-2">🚘</span>
                        <h4 className="text-[#c4a661] font-black text-sm mb-2">رخصة السياقة (Permis)</h4>
                        <input type="file" accept="image/*" onChange={(e) => setPermisFile(e.target.files[0])} className="w-full text-xs text-gray-500 file:mr-0 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-white/10 file:text-white hover:file:bg-[#c4a661] hover:file:text-black cursor-pointer transition-all" />
                    </div>
                  </div>

                  {/* التوقيع الإلكتروني */}
                  <div className="bg-black/50 p-4 md:p-6 rounded-2xl border border-[#c4a661]/30 relative">
                      <h4 className="text-white font-black text-sm md:text-base mb-4 flex justify-between items-center">
                          <span>✍️ التوقيع الإلكتروني</span>
                          <button type="button" onClick={() => sigCanvas.current.clear()} className="text-xs text-red-400 hover:text-red-500 bg-red-400/10 px-3 py-1 rounded-md transition-all cursor-pointer">مسح التوقيع</button>
                      </h4>
                      <div className="bg-[#0a0a0a] rounded-xl border border-dashed border-white/20 overflow-hidden cursor-crosshair">
                         <SignatureCanvas 
                            ref={sigCanvas} 
                            penColor="#c4a661" // لون الستيلو ذهبي 👑
                            canvasProps={{ className: 'w-full h-40 md:h-48' }} 
                         />
                      </div>
                      <p className="text-gray-500 text-[10px] mt-2 font-bold text-center">قم بالتوقيع داخل المربع أعلاه (بإصبعك أو بالفأرة)</p>
                  </div>

                  <div className="flex gap-3 md:gap-4 mt-8 md:mt-10">
                    <button type="button" onClick={() => setStep(1)} className="w-1/3 bg-white/5 hover:bg-white/10 text-white font-black py-4 md:py-5 rounded-xl md:rounded-2xl transition-all cursor-pointer text-sm md:text-base">
                      رجوع
                    </button>
                    <button type="submit" disabled={loading} className="w-2/3 bg-[#c4a661] hover:bg-white text-black font-black py-4 md:py-5 rounded-xl md:rounded-2xl text-base md:text-xl transition-all shadow-lg cursor-pointer flex justify-center items-center gap-2">
                      {loading ? <span className="animate-pulse">جاري إرسال الملف...</span> : 'تأكيد وإرسال الملف'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          ) : (
            /* ----------------- المرحلة 3: شاشة النجاح والكود المرجعي ----------------- */
            <div className="bg-[#111111] p-8 md:p-14 rounded-[30px] md:rounded-[40px] border border-[#c4a661]/30 shadow-[0_0_50px_rgba(196,166,97,0.1)] text-center animate-fade-in max-w-2xl w-full">
                <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center text-5xl mx-auto mb-6 border border-green-500/20">✓</div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">تم استلام ملفك بنجاح!</h2>
                <p className="text-gray-400 font-bold mb-8 leading-relaxed">
                    ملفك الآن قيد المراجعة من طرف الإدارة للتأكد من الوثائق. يرجى الاحتفاظ بالكود المرجعي أسفله لتتبع حالة حجزك وإتمام الدفع لاحقاً.
                </p>
                
                <div className="bg-black/50 border border-[#c4a661]/40 p-6 rounded-2xl mb-8">
                    <span className="block text-xs text-gray-500 font-bold uppercase tracking-widest mb-2">الكود المرجعي الخاص بك</span>
                    <span className="block text-4xl md:text-5xl font-black text-[#c4a661] tracking-widest font-mono">{reference}</span>
                </div>

                <p className="text-xs text-gray-500 font-bold mb-8">سيتم التواصل معك عبر الواتساب فور الموافقة على ملفك.</p>

                <button onClick={() => navigate('/')} className="bg-white/10 hover:bg-[#c4a661] text-white hover:text-black font-black py-4 px-10 rounded-xl transition-all cursor-pointer">
                    العودة للرئيسية
                </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Checkout;