import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Login from './Login';
import Footer from './components/Footer';
import CarDetails from './pages/CarDetails';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import Cars from './pages/Cars';
import Offers from './pages/Offers';
import { Toaster, toast } from 'react-hot-toast';
import TrackBooking from './pages/TrackBooking';
import WhatsAppButton from './components/WhatsAppButton';
// --- 1. مكون عرض السيارات (Fleet Section) ---
const CarFleet = ({ cars, filters }) => {
  const [categoryFilter, setCategoryFilter] = useState('كل السيارات');

  const filteredCars = cars.filter(car => {
    const matchesCategory = categoryFilter === 'كل السيارات' || car.category === categoryFilter;
    const matchesCity = !filters.city || (car.location && car.location === filters.city);
    const matchesName = !filters.carName || car.brand.toLowerCase().includes(filters.carName.toLowerCase());
    return matchesCategory && matchesCity && matchesName;
  });

  return (
    <section id="fleet" className="bg-[#080808] py-20 px-6 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#c4a661]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12 relative z-10" dir="rtl">
        
        {/* Sidebar Categories */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3 font-['Cairo']">
            <span className="w-1.5 h-8 bg-[#c4a661] rounded-full"></span> تصفح حسب الفئة
          </h3>
          <div className="flex flex-col gap-3">
            {['كل السيارات', 'اقتصادية', 'رياضية', 'فاخرة', 'دفع رباعي'].map((cat) => (
              <button 
                key={cat} 
                onClick={() => setCategoryFilter(cat)}
                className={`w-full text-right p-5 rounded-2xl font-black transition-all duration-300 flex justify-between items-center group font-['Cairo'] ${categoryFilter === cat ? 'bg-[#c4a661] text-black shadow-lg shadow-[#c4a661]/20' : 'bg-white/[0.03] text-gray-400 hover:bg-white/[0.07] cursor-pointer'}`}
              >
                <span>{cat}</span>
                <span className={`text-xs opacity-0 group-hover:opacity-100 transition-all ${categoryFilter === cat ? 'opacity-100' : ''}`}>←</span>
              </button>
            ))}
          </div>
        </div>

        {/* Car Cards Grid */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => {
              // ✅ الإصلاح هنا: كنجبدو التصويرة اللولة من المصفوفة
              const displayImage = car.images && car.images.length > 0 ? car.images[0] : car.image;
              
              return (
                <div key={car._id} className="group bg-[#111111] border border-white/[0.05] rounded-[2.5rem] overflow-hidden hover:border-[#c4a661]/40 transition-all duration-500 shadow-2xl">
                  <div className="h-56 bg-[#1a1a1a] relative overflow-hidden">
                    <img 
                      src={displayImage || 'https://via.placeholder.com/400x300'} 
                      alt={car.brand} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 ease-in-out" 
                    />
                    <div className="absolute top-5 right-5 bg-black/70 backdrop-blur-md text-[#c4a661] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-[#c4a661]/20">
                      {car.category}
                    </div>
                  </div>
                  <div className="p-8 space-y-6 font-['Cairo'] text-right">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xl font-black text-white group-hover:text-[#c4a661] transition-colors">{car.brand}</h4>
                        <p className="text-gray-500 text-sm font-bold">{car.model}</p>
                        <p className="text-[#c4a661] text-[10px] font-bold mt-1">📍 {car.location || 'المغرب'}</p>
                      </div>
                      <div className="text-left">
                         <span className="block text-2xl font-black text-[#c4a661]">{car.pricePerDay} DH</span>
                         <span className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase">/ يومياً</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-[11px] text-gray-400 font-bold border-y border-white/[0.05] py-5">
                      <span className="flex items-center gap-3">⚙️ أوتوماتيك</span>
                      <span className="flex items-center gap-3">👤 5 مقاعد</span>
                    </div>

                    <Link 
                      to={`/car/${car._id}`}
                      className="w-full bg-white text-black hover:bg-[#c4a661] py-4 rounded-2xl font-black transition-all duration-300 shadow-xl cursor-pointer text-center block"
                    >
                      احجز الآن
                    </Link>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="col-span-full py-20 text-center space-y-4">
              <span className="text-6xl block">🔍</span>
              <h3 className="text-2xl font-black text-white font-['Cairo']">عذراً، لم نجد سيارات تطابق بحثك</h3>
              <p className="text-gray-500 font-bold font-['Cairo']">حاول تغيير المعايير أو تصفح كل السيارات</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// بقية الكود (Features, Admin, App) كيبقاو كيفما هما حيت ديجا مريݣلين
const Features = () => {
  const items = [
    { title: 'تأمين شامل', desc: 'تأمين على جميع السيارات', icon: '🛡️' },
    { title: 'دعم 24/7', desc: 'دعم فني على مدار الساعة', icon: '📞' },
    { title: 'أفضل الأسعار', desc: 'ضمان أقل سعر في السوق', icon: '💰' },
    { title: 'حجز سريع', desc: 'احجز في أقل من دقيقة', icon: '⚡' }
  ];

  return (
    <section className="bg-[#080808] py-16 border-y border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8" dir="rtl">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-4 group cursor-default">
            <span className="text-4xl bg-white/5 w-16 h-16 flex items-center justify-center rounded-2xl group-hover:bg-[#c4a661]/20 transition-all duration-500">
              {item.icon}
            </span>
            <div className="text-right">
              <h4 className="text-white font-black text-lg">{item.title}</h4>
              <p className="text-gray-500 text-xs font-bold">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- 2. صفحة الأدمين (Admin) ---
const Admin = ({ cars, fetchCars, setToken }) => {
  const [newCar, setNewCar] = useState({ 
    brand: '', model: '', registration: '', pricePerDay: '', category: 'اقتصادية', location: '', imagesString: '' 
  });
  const [bookings, setBookings] = useState([]);
  
  // State باش نحلو النافذة ديال الدوسي (الوثائق)
  const [selectedDossier, setSelectedDossier] = useState(null);
  
  // 👇 State جديد ديال النافذة الاحترافية ديال التأكيد
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, id: null, newStatus: '' });

  const fetchBookings = () => {
    axios.get('https://backend--olpkmmkjhh266.replit.app/api/bookings').then(res => setBookings(res.data));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleSubmit = (e) => {
      e.preventDefault();
      const imagesArray = newCar.imagesString.split(',').map(url => url.trim()).filter(url => url !== '');
      const randomRegistration = 'NINJA-' + Math.floor(Math.random() * 1000000);
      
      const carData = { 
        ...newCar, 
        registration: randomRegistration,
        images: imagesArray.length > 0 ? imagesArray : undefined 
      };

      axios.post('https://backend--olpkmmkjhh266.replit.app/api/cars', carData).then(() => {
        fetchCars();
        setNewCar({ brand: '', model: '', registration: '', pricePerDay: '', category: 'اقتصادية', location: '', imagesString: '' });
        toast.success('تمت إضافة السيارة بنجاح! 🚗');
      }).catch(err => {
        toast.error('حدث خطأ أثناء الإضافة.');
      });
  };

  const handleDeleteCar = (id) => {
    if (window.confirm('هل أنت متأكد من مسح هذه السيارة؟')) {
      axios.delete(`https://backend--olpkmmkjhh266.replit.app/api/cars/${id}`).then(() => fetchCars());
    }
  };

  // 👇 الدالة اللي كتاخد القرار بعدما كيكليكي الأدمين فـ النافذة الجديدة
  const executeUpdateStatus = async () => {
      const { id, newStatus } = confirmDialog;
      try {
        await axios.put(`https://backend--olpkmmkjhh266.replit.app/api/bookings/${id}/status`, { status: newStatus });
        fetchBookings(); // تحديث الجدول
        toast.success(`تم ${newStatus === 'Accepted' ? 'قبول ✅' : 'رفض ❌'} الطلب بنجاح!`);
      } catch (err) {
        toast.error('حدث خطأ أثناء التحديث.');
      }
      // سد النافذة مورا التحديث
      setConfirmDialog({ isOpen: false, id: null, newStatus: '' });
  };

  // دالة لفتح الواتساب والتواصل مع الكليان
  const openWhatsApp = (phone, refCode) => {
    let formattedPhone = phone;
    if (phone.startsWith('0')) formattedPhone = '212' + phone.substring(1);
    const message = `مرحباً، نتواصل معك من وكالة NINJA CARS بخصوص طلب الحجز رقم *${refCode}*.`;
    window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto py-32 px-6 text-white font-['Cairo']" dir="rtl">
      
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-4xl font-black text-[#c4a661]">لوحة تحكم <span className="text-white">النينجا</span></h2>
        <button onClick={() => { localStorage.removeItem('token'); setToken(null); window.location.reload(); }} className="bg-red-500/10 text-red-500 border border-red-500/20 px-6 py-2 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all cursor-pointer">
          تسجيل الخروج
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* === إضافة سيارة === */}
        <div className="lg:col-span-1 space-y-6">
          <h3 className="text-xl font-black flex items-center gap-2">✨ إضافة سيارة</h3>
          <form onSubmit={handleSubmit} className="bg-[#111111] p-6 rounded-[30px] border border-white/5 space-y-4 shadow-xl">
            <textarea className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-[#c4a661] text-left text-sm" placeholder="روابط الصور (افصل بينها بفاصلة , )" rows="3" value={newCar.imagesString} onChange={(e) => setNewCar({ ...newCar, imagesString: e.target.value })} required></textarea>
            <div className="grid grid-cols-2 gap-2">
              <input className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-[#c4a661]" type="text" placeholder="الماركة" value={newCar.brand} onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })} required />
              <input className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-[#c4a661]" type="text" placeholder="الموديل" value={newCar.model} onChange={(e) => setNewCar({ ...newCar, model: e.target.value })} required />
            </div>
            <select className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-[#c4a661]" value={newCar.location} onChange={(e) => setNewCar({ ...newCar, location: e.target.value })} required>
              <option value="" className="bg-black text-gray-500">اختر المدينة</option>
              <option value="Casablanca" className="bg-black">الدار البيضاء</option>
              <option value="Tangier" className="bg-black">طنجة</option>
              <option value="Marrakech" className="bg-black">مراكش</option>
              <option value="Agadir" className="bg-black">أݣادير</option>
            </select>
            <input className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-[#c4a661]" type="number" placeholder="الثمن لليوم (درهم)" value={newCar.pricePerDay} onChange={(e) => setNewCar({ ...newCar, pricePerDay: e.target.value })} required />
            <select className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-[#c4a661]" value={newCar.category} onChange={(e) => setNewCar({ ...newCar, category: e.target.value })}>
              <option className="bg-black">اقتصادية</option>
              <option className="bg-black">رياضية</option>
              <option className="bg-black">فاخرة</option>
              <option className="bg-black">دفع رباعي</option>
            </select>
            <button type="submit" className="w-full bg-[#c4a661] text-black font-black py-4 rounded-xl hover:shadow-[0_0_20px_rgba(196,166,97,0.4)] transition-all cursor-pointer">حفظ السيارة</button>
          </form>
        </div>

        {/* === أسطول السيارات === */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-black flex items-center gap-2">🚗 أسطول السيارات ({cars?.length || 0})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {cars && cars.map(car => {
              const displayImage = car.images && car.images.length > 0 ? car.images[0] : car.image;
              return (
              <div key={car._id} className="bg-[#111111] p-4 rounded-2xl border border-white/5 flex items-center gap-4 group">
                <img src={displayImage || 'https://via.placeholder.com/150'} className="w-20 h-20 object-cover rounded-xl border border-white/10" alt={car.brand} />
                <div className="flex-1">
                  <h4 className="font-black text-sm text-white">{car.brand} {car.model}</h4>
                  <p className="text-[#c4a661] text-xs font-bold">{car.pricePerDay} DH/يوم</p>
                  <p className="text-gray-500 text-[10px] mt-1">📍 {car.location}</p>
                </div>
                <button onClick={() => handleDeleteCar(car._id)} className="p-3 bg-red-500/10 text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white cursor-pointer">🗑️</button>
              </div>
            )})}
          </div>
        </div>

        {/* === جدول الحجوزات (CRM) === */}
        <div className="lg:col-span-3 mt-10 space-y-6">
          <h3 className="text-xl font-black flex items-center gap-2">📥 طلبات الحجز والملفات</h3>
          <div className="bg-[#111111] rounded-[30px] border border-white/5 overflow-x-auto shadow-2xl custom-scrollbar">
            <table className="w-full text-right min-w-[1000px]">
              <thead className="bg-white/5 text-gray-400 text-[10px] uppercase tracking-widest">
                <tr>
                  <th className="p-6">الزبون / الكود المرجعي</th>
                  <th className="p-6">التاريخ والإجمالي</th>
                  <th className="p-6">الوثائق (الدوسي)</th>
                  <th className="p-6">حالة الطلب والقرارات</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {bookings.slice().reverse().map(b => (
                  <tr key={b._id} className="border-t border-white/5 hover:bg-white/[0.02] transition-all">
                    {/* معلومات الزبون والكود */}
                    <td className="p-6">
                      <div className="font-black text-white text-lg">{b.customer?.fullName}</div>
                      <div className="text-[10px] text-gray-400 font-mono mt-1">📞 {b.customer?.phone} | 🪪 {b.customer?.idCard}</div>
                      <div className="mt-2 text-xs font-black text-[#c4a661] tracking-widest bg-[#c4a661]/10 inline-block px-2 py-1 rounded">
                        {b.referenceCode || 'N/A'}
                      </div>
                    </td>
                    
                    {/* التاريخ والثمن */}
                    <td className="p-6 font-bold text-gray-300 text-xs space-y-2">
                      <div className="text-gray-400">{new Date(b.startDate).toLocaleDateString()} ← {new Date(b.endDate).toLocaleDateString()}</div>
                      <div className="font-black text-white text-base">{b.totalPrice} DH</div>
                    </td>
                    
                    {/* زر عرض الوثائق */}
                    <td className="p-6">
                      <button 
                        onClick={() => setSelectedDossier(b)}
                        className="bg-[#c4a661]/10 text-[#c4a661] border border-[#c4a661]/30 hover:bg-[#c4a661] hover:text-black px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer"
                      >
                        📂 عرض الملف والتوقيع
                      </button>
                    </td>

                    {/* الحالة والقرارات */}
                    <td className="p-6">
                      <div className="flex flex-col gap-2">
                        {/* Status Badge */}
                        {b.status === 'Pending_Review' && <span className="bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full text-[10px] font-black w-fit">قيد المراجعة ⏳</span>}
                        {b.status === 'Accepted' && <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-[10px] font-black w-fit">مقبول - بانتظار الدفع ✅</span>}
                        {b.status === 'Rejected' && <span className="bg-red-500/10 text-red-500 px-3 py-1 rounded-full text-[10px] font-black w-fit">مرفوض ❌</span>}
                        {b.status === 'Paid_Online' && <span className="bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-[10px] font-black w-fit">تم الدفع بالبطاقة 💳</span>}
                        {b.status === 'Pending_Payment_Verification' && <span className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-[10px] font-black w-fit">وصل الدفع قيد التأكيد 🧾</span>}

                        {/* 👇 هنا بدلنا window.confirm بـ الدالة اللي كتحل Modal ديالتنا */}
                        {b.status === 'Pending_Review' && (
                          <div className="flex gap-2 mt-2">
                            <button onClick={() => setConfirmDialog({ isOpen: true, id: b._id, newStatus: 'Accepted' })} className="bg-green-500/20 text-green-400 hover:bg-green-500 hover:text-white px-3 py-1.5 rounded-lg text-[10px] font-black transition-all cursor-pointer">قبول</button>
                            <button onClick={() => setConfirmDialog({ isOpen: true, id: b._id, newStatus: 'Rejected' })} className="bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded-lg text-[10px] font-black transition-all cursor-pointer">رفض</button>
                          </div>
                        )}

                        {/* بوطونة الواتساب */}
                        <button 
                          onClick={() => openWhatsApp(b.customer?.phone, b.referenceCode)}
                          className="bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white px-3 py-1.5 rounded-lg text-[10px] font-black transition-all flex items-center gap-1 w-fit mt-1 cursor-pointer"
                        >
                          💬 تواصل عبر الواتساب
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* 📂 النافذة المنبثقة لعرض الدوسي (Modal) */}
      {selectedDossier && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#111111] border border-white/10 rounded-[30px] max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 relative shadow-2xl custom-scrollbar">
            <button onClick={() => setSelectedDossier(null)} className="absolute top-6 left-6 w-10 h-10 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-full flex justify-center items-center font-black text-xl transition-all cursor-pointer">✕</button>
            
            <h3 className="text-3xl font-black text-[#c4a661] mb-8 border-b border-white/5 pb-4">
              ملف الزبون: <span className="text-white">{selectedDossier.customer?.fullName}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* البطاقة الوطنية */}
              <div className="space-y-2">
                <h4 className="text-gray-400 font-bold text-sm uppercase tracking-widest">🪪 البطاقة الوطنية (CIN)</h4>
                {selectedDossier.cinImage ? (
                  <a href={selectedDossier.cinImage} target="_blank" rel="noreferrer">
                    <img src={selectedDossier.cinImage} alt="CIN" className="w-full h-48 object-cover rounded-xl border border-white/10 hover:border-[#c4a661] transition-all cursor-zoom-in" />
                  </a>
                ) : <div className="h-48 bg-white/5 rounded-xl flex items-center justify-center text-gray-500 text-xs">لا توجد صورة</div>}
              </div>

              {/* رخصة السياقة */}
              <div className="space-y-2">
                <h4 className="text-gray-400 font-bold text-sm uppercase tracking-widest">🚘 رخصة السياقة (Permis)</h4>
                {selectedDossier.permisImage ? (
                  <a href={selectedDossier.permisImage} target="_blank" rel="noreferrer">
                    <img src={selectedDossier.permisImage} alt="Permis" className="w-full h-48 object-cover rounded-xl border border-white/10 hover:border-[#c4a661] transition-all cursor-zoom-in" />
                  </a>
                ) : <div className="h-48 bg-white/5 rounded-xl flex items-center justify-center text-gray-500 text-xs">لا توجد صورة</div>}
              </div>

              {/* التوقيع الإلكتروني */}
              <div className="md:col-span-2 space-y-2">
                <h4 className="text-gray-400 font-bold text-sm uppercase tracking-widest">✍️ التوقيع الإلكتروني للزبون</h4>
                {selectedDossier.signatureImage ? (
                  <div className="bg-[#050505] border border-dashed border-[#c4a661]/40 rounded-xl p-4 flex justify-center">
                    <img src={selectedDossier.signatureImage} alt="Signature" className="h-32 object-contain filter drop-shadow-[0_0_10px_rgba(196,166,97,0.5)]" />
                  </div>
                ) : <div className="h-32 bg-white/5 rounded-xl flex items-center justify-center text-gray-500 text-xs">لا يوجد توقيع</div>}
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button onClick={() => setSelectedDossier(null)} className="bg-[#c4a661] text-black font-black px-10 py-3 rounded-xl hover:bg-white transition-all cursor-pointer">إغلاق الملف</button>
            </div>
          </div>
        </div>
      )}

      {/* ⚠️ النافذة المنبثقة الجديدة لتأكيد القرار (عوض window.confirm) */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#111111] border border-white/10 p-8 rounded-[30px] w-full max-w-sm text-center shadow-2xl">
            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl mb-4 ${confirmDialog.newStatus === 'Accepted' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
              {confirmDialog.newStatus === 'Accepted' ? '✅' : '⚠️'}
            </div>
            <h3 className="text-xl font-black text-white mb-2">تأكيد القرار</h3>
            <p className="text-gray-400 font-bold mb-8 text-sm">
              هل أنت متأكد أنك تريد <span className={confirmDialog.newStatus === 'Accepted' ? 'text-green-500' : 'text-red-500'}>{confirmDialog.newStatus === 'Accepted' ? 'قبول' : 'رفض'}</span> هذا الطلب نهائياً؟
            </p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDialog({ isOpen: false, id: null, newStatus: '' })} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-black py-3 rounded-xl transition-all cursor-pointer">
                إلغاء
              </button>
              <button onClick={executeUpdateStatus} className={`flex-1 font-black py-3 rounded-xl transition-all cursor-pointer text-white ${confirmDialog.newStatus === 'Accepted' ? 'bg-green-500 hover:bg-green-600 shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'bg-red-500 hover:bg-red-600 shadow-[0_0_15px_rgba(239,68,68,0.3)]'}`}>
                تأكيد
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
function App() {
  const [cars, setCars] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [searchFilters, setSearchFilters] = useState({ city: '', carName: '' });
  const fetchCars = () => axios.get('https://backend--olpkmmkjhh266.replit.app/api/cars').then(res => setCars(res.data));
  useEffect(() => { fetchCars(); }, []);

  return (
    <Router>
      <div className="bg-[#080808] min-h-screen">
        <Navbar />
        {/* 🔥 هادا هو اللي غيخلي الـ Popups يبانو فخام بالأسود والذهبي */}
        <Toaster 
          position="top-center" 
          toastOptions={{
            style: {
              background: '#111111',
              color: '#fff',
              border: '1px solid rgba(196,166,97,0.3)',
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 'bold',
            },
            success: { iconTheme: { primary: '#c4a661', secondary: '#111' } },
          }}/>
        <Routes>
          <Route path="/" element={
            <>
              <Hero onSearch={(filters) => setSearchFilters(filters)} />
              <Features />
              <CarFleet cars={cars} filters={searchFilters} />              
              <Footer />
            </>
          } />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/admin" element={token ? <Admin cars={cars} fetchCars={fetchCars} setToken={setToken} /> : <Login setToken={setToken} />} />
          <Route path="/car/:id" element={<CarDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cars" element={<Cars cars={cars} />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/track" element={<TrackBooking />} />
          <WhatsAppButton />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
