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
import html2pdf from 'html2pdf.js';
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
    <section id="fleet" className="bg-[#080808] py-20 px-4 md:px-6 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#c4a661]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12 relative z-10" dir="rtl">
        
        {/* Sidebar Categories */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-xl md:text-2xl font-black text-white mb-6 md:mb-8 flex items-center gap-3 font-['Cairo']">
            <span className="w-1.5 h-8 bg-[#c4a661] rounded-full"></span> تصفح حسب الفئة
          </h3>
          <div className="flex flex-col gap-3">
            {['كل السيارات', 'اقتصادية', 'رياضية', 'فاخرة', 'دفع رباعي'].map((cat) => (
              <button 
                key={cat} 
                onClick={() => setCategoryFilter(cat)}
                className={`w-full text-right p-4 md:p-5 rounded-2xl font-black transition-all duration-300 flex justify-between items-center group font-['Cairo'] ${categoryFilter === cat ? 'bg-[#c4a661] text-black shadow-lg shadow-[#c4a661]/20' : 'bg-white/[0.03] text-gray-400 hover:bg-white/[0.07] cursor-pointer'}`}
              >
                <span>{cat}</span>
                <span className={`text-xs opacity-0 group-hover:opacity-100 transition-all ${categoryFilter === cat ? 'opacity-100' : ''}`}>←</span>
              </button>
            ))}
          </div>
        </div>

        {/* Car Cards Grid */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => {
              const displayImage = car.images && car.images.length > 0 ? car.images[0] : car.image;
              
              return (
                <div key={car._id} className="group bg-[#111111] border border-white/[0.05] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden hover:border-[#c4a661]/40 transition-all duration-500 shadow-2xl flex flex-col">
                  <div className="h-48 md:h-56 bg-[#1a1a1a] relative overflow-hidden">
                    <img 
                      src={displayImage || 'https://via.placeholder.com/400x300'} 
                      alt={car.brand} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 ease-in-out" 
                    />
                    <div className="absolute top-4 right-4 md:top-5 md:right-5 bg-black/70 backdrop-blur-md text-[#c4a661] px-3 md:px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-[#c4a661]/20">
                      {car.category}
                    </div>
                  </div>
                  <div className="p-6 md:p-8 space-y-6 font-['Cairo'] text-right flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg md:text-xl font-black text-white group-hover:text-[#c4a661] transition-colors">{car.brand}</h4>
                          <p className="text-gray-500 text-xs md:text-sm font-bold">{car.model}</p>
                          <p className="text-[#c4a661] text-[10px] font-bold mt-1">📍 {car.location || 'المغرب'}</p>
                        </div>
                        <div className="text-left">
                           <span className="block text-xl md:text-2xl font-black text-[#c4a661]">{car.pricePerDay} DH</span>
                           <span className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase">/ يومياً</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-[10px] md:text-[11px] text-gray-400 font-bold border-y border-white/[0.05] py-4 md:py-5">
                        <span className="flex items-center gap-2 md:gap-3">⚙️ أوتوماتيك</span>
                        <span className="flex items-center gap-2 md:gap-3">👤 5 مقاعد</span>
                      </div>
                    </div>

                    <Link 
                      to={`/car/${car._id}`}
                      className="w-full bg-white text-black hover:bg-[#c4a661] py-3 md:py-4 rounded-xl md:rounded-2xl font-black transition-all duration-300 shadow-xl cursor-pointer text-center block mt-auto"
                    >
                      احجز الآن
                    </Link>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="col-span-full py-20 text-center space-y-4">
              <span className="text-5xl md:text-6xl block">🔍</span>
              <h3 className="text-xl md:text-2xl font-black text-white font-['Cairo']">عذراً، لم نجد سيارات تطابق بحثك</h3>
              <p className="text-gray-500 text-sm md:text-base font-bold font-['Cairo']">حاول تغيير المعايير أو تصفح كل السيارات</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// --- 2. مكون المميزات ---
const Features = () => {
  const items = [
    { title: 'تأمين شامل', desc: 'تأمين على جميع السيارات', icon: '🛡️' },
    { title: 'دعم 24/7', desc: 'دعم فني على مدار الساعة', icon: '📞' },
    { title: 'أفضل الأسعار', desc: 'ضمان أقل سعر في السوق', icon: '💰' },
    { title: 'حجز سريع', desc: 'احجز في أقل من دقيقة', icon: '⚡' }
  ];

  return (
    <section className="bg-[#080808] py-12 md:py-16 border-y border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" dir="rtl">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-4 group cursor-default bg-[#111] sm:bg-transparent p-4 sm:p-0 rounded-2xl sm:rounded-none border border-white/5 sm:border-none">
            <span className="text-3xl md:text-4xl bg-white/5 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-2xl group-hover:bg-[#c4a661]/20 transition-all duration-500 shrink-0">
              {item.icon}
            </span>
            <div className="text-right">
              <h4 className="text-white font-black text-base md:text-lg">{item.title}</h4>
              <p className="text-gray-500 text-[11px] md:text-xs font-bold">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- 3. لوحة تحكم الأدمين (النسخة الفخمة والـ Responsive 📱💎) ---
const Admin = ({ cars, fetchCars, setToken }) => {
  const [newCar, setNewCar] = useState({ 
    brand: '', model: '', registration: '', pricePerDay: '', category: 'اقتصادية', location: '', imagesArray: [] 
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editCarId, setEditCarId] = useState(null);

  const [bookings, setBookings] = useState([]);
  const [selectedDossier, setSelectedDossier] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // 👈 هادي ديال البحث
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, id: null, type: '', newStatus: '' });
  // فلترة الحجوزات على حسب شنو كتب الأدمين فـ البحث
  const filteredBookings = bookings.filter(b => 
      (b.customer?.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.customer?.phone || '').includes(searchTerm) ||
      (b.referenceCode || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  const fetchBookings = () => {
    // 🔥 بدل هاد الرابط بالرابط ديال Replit ملي تبغي تلوح لـ Vercel
    axios.get('https://backend--olpkmmkjhh266.replit.app/api/bookings').then(res => setBookings(res.data));
  };

  useEffect(() => {
    fetchBookings();
  }, []);
  // 📊 دالة تحميل تقرير الإكسيل
  const exportToExcel = () => {
    // العناوين ديال الجدول فـ الإكسيل
    const headers = ['الكود المرجعي', 'الزبون', 'رقم الهاتف', 'رقم البطاقة الوطنية', 'تاريخ الاستلام', 'تاريخ الإرجاع', 'المبلغ الاجمالي (درهم)', 'حالة الطلب'];
    
    // تحويل البيانات
    const rows = bookings.map(b => [
      b.referenceCode || 'N/A',
      b.customer?.fullName || 'N/A',
      b.customer?.phone || 'N/A',
      b.customer?.idCard || 'N/A',
      new Date(b.startDate).toLocaleDateString('ar-MA'),
      new Date(b.endDate).toLocaleDateString('ar-MA'),
      b.totalPrice,
      b.status
    ]);

    // تجميع الملف مع دعم اللغة العربية (UTF-8 BOM)
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    // تحميل الملف
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `تقرير_حجوزات_NINJACARS.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    toast.success('تم تحميل التقرير بنجاح! 📊');
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    Promise.all(files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    })).then(base64Images => {
      setNewCar(prev => ({ ...prev, imagesArray: [...(prev.imagesArray || []), ...base64Images] }));
    });
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      const carData = { ...newCar, images: newCar.imagesArray };

      if (isEditing) {
        axios.put(`https://backend--olpkmmkjhh266.replit.app/api/cars/${editCarId}`, carData).then(() => {
          fetchCars();
          resetCarForm();
          toast.success('تم تعديل السيارة بنجاح! ✏️');
        }).catch(err => toast.error('حدث خطأ أثناء التعديل.'));
      } else {
        carData.registration = 'NINJA-' + Math.floor(Math.random() * 1000000);
        axios.post('https://backend--olpkmmkjhh266.replit.app/api/cars', carData).then(() => {
          fetchCars();
          resetCarForm();
          toast.success('تمت إضافة السيارة بنجاح! 🚗');
        }).catch(err => toast.error('حدث خطأ أثناء الإضافة.'));
      }
  };

  const resetCarForm = () => {
    setNewCar({ brand: '', model: '', registration: '', pricePerDay: '', category: 'اقتصادية', location: '', imagesArray: [] });
    setIsEditing(false);
    setEditCarId(null);
  };

  const handleEditClick = (car) => {
    setNewCar({
      brand: car.brand, model: car.model, registration: car.registration, pricePerDay: car.pricePerDay,
      category: car.category || 'اقتصادية', location: car.location || '', imagesArray: car.images || [car.image].filter(Boolean)
    });
    setIsEditing(true);
    setEditCarId(car._id);
  };

  const executeAction = async () => {
    const { id, type, newStatus } = confirmDialog;
    try {
      if (type === 'status') {
        await axios.put(`https://backend--olpkmmkjhh266.replit.app/api/bookings/${id}/status`, { status: newStatus });
        fetchBookings();
        toast.success(`تم ${newStatus === 'Accepted' ? 'قبول ✅' : 'رفض ❌'} الطلب بنجاح!`);
      } else if (type === 'deleteBooking') {
        await axios.delete(`https://backend--olpkmmkjhh266.replit.app/api/bookings/${id}`);
        fetchBookings();
        toast.success('تم مسح الحجز نهائياً! 🗑️');
      } else if (type === 'deleteCar') {
        await axios.delete(`https://backend--olpkmmkjhh266.replit.app/api/cars/${id}`);
        fetchCars();
        toast.success('تم مسح السيارة من الأسطول بنجاح! 🗑️');
      }
    } catch (err) {
      toast.error('حدث خطأ أثناء تنفيذ العملية.');
    }
    setConfirmDialog({ isOpen: false, id: null, type: '', newStatus: '' });
  };
// دالة توليد عقد الكراء PDF
  const generateContract = (booking) => {
    // كود HTML مخفي غيتحول لـ PDF
    const element = document.createElement('div');
    element.innerHTML = `
      <div style="padding: 40px; font-family: 'Arial', sans-serif; direction: rtl; text-align: right; background: white; color: black;">
          <div style="text-align: center; border-bottom: 2px solid #c4a661; padding-bottom: 20px; margin-bottom: 30px;">
              <h1 style="color: #000; margin: 0;">NINJA CARS</h1>
              <h3 style="color: #666; margin: 5px 0 0 0;">عقد كراء سيارة - Contrat de Location</h3>
              <p style="color: #c4a661; font-weight: bold; margin-top: 10px;">رقم العقد: ${booking.referenceCode}</p>
          </div>
          
          <div style="margin-top: 30px; display: flex; justify-content: space-between;">
              <div style="width: 48%; border: 1px solid #eee; padding: 15px; border-radius: 8px;">
                  <h3 style="color: #c4a661; border-bottom: 1px solid #eee; padding-bottom: 10px;">معلومات الزبون / Locataire</h3>
                  <p><strong>الاسم الكامل:</strong> ${booking.customer?.fullName}</p>
                  <p><strong>رقم الهاتف:</strong> ${booking.customer?.phone}</p>
                  <p><strong>رقم البطاقة الوطنية:</strong> ${booking.customer?.idCard}</p>
              </div>
              
              <div style="width: 48%; border: 1px solid #eee; padding: 15px; border-radius: 8px;">
                  <h3 style="color: #c4a661; border-bottom: 1px solid #eee; padding-bottom: 10px;">معلومات الحجز / Détails</h3>
                  <p><strong>تاريخ الاستلام:</strong> ${new Date(booking.startDate).toLocaleDateString('ar-MA')}</p>
                  <p><strong>تاريخ الإرجاع:</strong> ${new Date(booking.endDate).toLocaleDateString('ar-MA')}</p>
                  <p><strong>المبلغ الإجمالي:</strong> <span style="color: #c4a661; font-weight: bold; font-size: 18px;">${booking.totalPrice} DH</span></p>
              </div>
          </div>

          <div style="margin-top: 40px; border: 1px solid #eee; padding: 15px; border-radius: 8px;">
              <h3 style="color: #c4a661; border-bottom: 1px solid #eee; padding-bottom: 10px;">الشروط والأحكام / Conditions</h3>
              <ul style="font-size: 12px; color: #555; line-height: 1.8;">
                  <li>يقر المكتري أنه تسلم السيارة في حالة جيدة وصالحة للاستعمال.</li>
                  <li>يتحمل المكتري جميع المسؤوليات القانونية والمادية في حالة وقوع حادث أو مخالفة مرورية.</li>
                  <li>يجب إرجاع السيارة في الوقت المتفق عليه، وأي تأخير يؤدي إلى دفع غرامة إضافية.</li>
              </ul>
          </div>
          
          <div style="margin-top: 50px; display: flex; justify-content: space-between; text-align: center;">
              <div style="width: 45%;">
                  <h4 style="color: #333;">توقيع وإمضاء الوكالة</h4>
                  <div style="height: 100px; margin-top: 10px; border-bottom: 1px dashed #ccc;">
                     <h2 style="color: #c4a661; opacity: 0.5; transform: rotate(-10deg); margin-top: 30px;">NINJA CARS</h2>
                  </div>
              </div>
              <div style="width: 45%;">
                  <h4 style="color: #333;">توقيع المكتري (Signature)</h4>
                  <div style="height: 100px; margin-top: 10px; border-bottom: 1px dashed #ccc; display: flex; justify-content: center; align-items: center;">
                      ${booking.signatureImage ? `<img src="${booking.signatureImage}" style="max-height: 80px; filter: contrast(1.5) grayscale(1);" />` : '<p style="color: #999;">لم يتم التوقيع</p>'}
                  </div>
              </div>
          </div>
      </div>
    `;

    // إعدادات الـ PDF
    const opt = {
      margin:       0.5,
      filename:     `Contract_${booking.referenceCode}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    // توليد وتحميل الملف
    toast.loading('جاري تجهيز العقد...', { duration: 2000 });
    html2pdf().set(opt).from(element).save();
  };
  const openWhatsApp = (phone, refCode) => {
    let formattedPhone = phone;
    if (phone.startsWith('0')) formattedPhone = '212' + phone.substring(1);
    const message = `مرحباً، نتواصل معك من وكالة NINJA CARS بخصوص طلب الحجز رقم *${refCode}*.`;
    window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };
// فلترة الحجوزات على حسب شنو كتب الأدمين فـ البحث

  return (
    <div className="max-w-[1400px] mx-auto py-16 md:py-24 px-4 sm:px-6 text-white font-['Cairo'] relative" dir="rtl">
      
      {/* خلفية فخمة للوحة التحكم (معدلة باش ما تخرجش على الشاشة فـ التيليفون) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] md:h-[400px] bg-[#c4a661]/5 blur-[100px] md:blur-[150px] pointer-events-none"></div>

      {/* الهيدر الفخم */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center mb-8 bg-[#111] p-6 md:p-8 rounded-[2rem] border border-[#c4a661]/20 shadow-[0_0_40px_rgba(196,166,97,0.05)] w-full">
        <div className="text-center md:text-right mb-6 md:mb-0">
          <h2 className="text-2xl md:text-3xl font-black text-white">لوحة القيادة <span className="text-[#c4a661]">الاحترافية</span></h2>
          <p className="text-gray-400 text-xs md:text-sm mt-2 font-bold tracking-wide">أهلاً بك أيها المدير، تحكم في أسطولك وحجوزاتك من مكان واحد.</p>
        </div>
        <button onClick={() => { localStorage.removeItem('token'); setToken(null); window.location.reload(); }} className="w-full md:w-auto bg-red-500/10 text-red-500 border border-red-500/20 px-8 py-3.5 md:py-3 rounded-xl font-black hover:bg-red-500 hover:text-white transition-all hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] cursor-pointer text-sm md:text-base">
          تسجيل الخروج
        </button>
      </div>

      {/* بطاقات الإحصائيات (Stats Cards) */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12">
        <div className="bg-[#111] p-5 md:p-6 rounded-3xl border border-white/5 flex items-center gap-4 md:gap-6 shadow-xl">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#c4a661]/10 flex items-center justify-center text-2xl md:text-3xl shrink-0">🚘</div>
          <div>
            <p className="text-gray-500 font-bold text-xs md:text-sm">إجمالي السيارات</p>
            <h4 className="text-2xl md:text-3xl font-black text-white">{cars?.length || 0}</h4>
          </div>
        </div>
        <div className="bg-[#111] p-5 md:p-6 rounded-3xl border border-white/5 flex items-center gap-4 md:gap-6 shadow-xl">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-2xl md:text-3xl shrink-0">📥</div>
          <div>
            <p className="text-gray-500 font-bold text-xs md:text-sm">إجمالي الحجوزات</p>
            <h4 className="text-2xl md:text-3xl font-black text-white">{bookings?.length || 0}</h4>
          </div>
        </div>
        <div className="bg-[#111] p-5 md:p-6 rounded-3xl border border-white/5 flex items-center gap-4 md:gap-6 shadow-xl sm:col-span-2 md:col-span-1">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-green-500/10 flex items-center justify-center text-2xl md:text-3xl shrink-0">✅</div>
          <div>
            <p className="text-gray-500 font-bold text-xs md:text-sm">الطلبات المقبولة</p>
            <h4 className="text-2xl md:text-3xl font-black text-white">{bookings?.filter(b => b.status === 'Accepted' || b.status === 'Paid_Online').length || 0}</h4>
          </div>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 w-full">
        
        {/* === إضافة / تعديل سيارة === */}
        <div className="lg:col-span-1 space-y-4 md:space-y-6">
          <h3 className="text-lg md:text-xl font-black flex items-center gap-2 text-[#c4a661]">
            <span className="w-1.5 h-6 bg-[#c4a661] rounded-full"></span>
            {isEditing ? 'تعديل سيارة' : 'إضافة سيارة جديدة'}
          </h3>
          <form onSubmit={handleSubmit} className="bg-[#111111] p-6 md:p-8 rounded-[2rem] border border-white/5 space-y-4 md:space-y-5 shadow-2xl relative overflow-hidden w-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#c4a661]/10 blur-[50px] rounded-full pointer-events-none"></div>

            <div className="w-full bg-white/[0.02] border border-dashed border-white/20 hover:border-[#c4a661]/50 p-5 md:p-6 rounded-2xl transition-all relative overflow-hidden text-center group cursor-pointer">
              <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              <div className="text-2xl md:text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">📸</div>
              <div className="text-xs md:text-sm font-bold text-gray-400 group-hover:text-[#c4a661] transition-colors">
                اضغط لرفع صور السيارة
              </div>
            </div>
            
            {newCar.imagesArray.length > 0 && (
              <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2">
                {newCar.imagesArray.map((img, idx) => (
                   <img key={idx} src={img} alt="preview" className="w-12 h-12 md:w-14 md:h-14 rounded-xl object-cover border border-[#c4a661]/30 shadow-lg shrink-0" />
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input className="w-full bg-black/50 border border-white/10 p-3.5 md:p-4 rounded-xl outline-none focus:border-[#c4a661] transition-colors font-bold text-sm" type="text" placeholder="الماركة (Dacia)" value={newCar.brand} onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })} required />
              <input className="w-full bg-black/50 border border-white/10 p-3.5 md:p-4 rounded-xl outline-none focus:border-[#c4a661] transition-colors font-bold text-sm" type="text" placeholder="الموديل (Logan)" value={newCar.model} onChange={(e) => setNewCar({ ...newCar, model: e.target.value })} required />
            </div>
            
            <select className="w-full bg-black/50 border border-white/10 p-3.5 md:p-4 rounded-xl outline-none focus:border-[#c4a661] transition-colors font-bold text-sm text-gray-300" value={newCar.location} onChange={(e) => setNewCar({ ...newCar, location: e.target.value })} required>
              <option value="" className="bg-black text-gray-500">📍 اختر مدينة التواجد</option>
              <option value="Casablanca" className="bg-black">الدار البيضاء</option>
              <option value="Tangier" className="bg-black">طنجة</option>
              <option value="Marrakech" className="bg-black">مراكش</option>
              <option value="Agadir" className="bg-black">أݣادير</option>
            </select>
            
            <input className="w-full bg-black/50 border border-white/10 p-3.5 md:p-4 rounded-xl outline-none focus:border-[#c4a661] transition-colors font-bold text-sm" type="number" placeholder="الثمن لليوم (بالدرهم)" value={newCar.pricePerDay} onChange={(e) => setNewCar({ ...newCar, pricePerDay: e.target.value })} required />
            
            <select className="w-full bg-black/50 border border-white/10 p-3.5 md:p-4 rounded-xl outline-none focus:border-[#c4a661] transition-colors font-bold text-sm text-gray-300" value={newCar.category} onChange={(e) => setNewCar({ ...newCar, category: e.target.value })}>
              <option className="bg-black">اقتصادية</option>
              <option className="bg-black">رياضية</option>
              <option className="bg-black">فاخرة</option>
              <option className="bg-black">دفع رباعي</option>
            </select>
            
            <button type="submit" className={`w-full text-black font-black py-3.5 md:py-4 rounded-xl transition-all cursor-pointer text-base md:text-lg mt-2 ${isEditing ? 'bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]' : 'bg-[#c4a661] hover:shadow-[0_0_20px_rgba(196,166,97,0.5)]'}`}>
              {isEditing ? 'تحديث السيارة 🔄' : 'حفظ في الأسطول 🚗'}
            </button>
            
            {isEditing && (
              <button type="button" onClick={resetCarForm} className="w-full bg-white/5 text-gray-400 font-bold py-3 rounded-xl hover:bg-white/10 transition-all cursor-pointer text-sm">
                إلغاء التعديل
              </button>
            )}
          </form>
        </div>

        {/* === أسطول السيارات === */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6 w-full">
          <h3 className="text-lg md:text-xl font-black flex items-center gap-2 text-[#c4a661]">
            <span className="w-1.5 h-6 bg-[#c4a661] rounded-full"></span>
            إدارة الأسطول
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {cars && cars.map(car => {
              const displayImage = car.images && car.images.length > 0 ? car.images[0] : car.image;
              return (
              <div key={car._id} className="bg-[#111111] p-4 md:p-5 rounded-[2rem] border border-white/5 flex items-center gap-4 group hover:border-[#c4a661]/30 hover:bg-white/[0.02] transition-all shadow-lg w-full">
                <img src={displayImage || 'https://via.placeholder.com/150'} className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-xl md:rounded-2xl border border-white/10 shadow-md shrink-0" alt={car.brand} />
                <div className="flex-1 min-w-0">
                  <h4 className="font-black text-sm md:text-lg text-white truncate">{car.brand} {car.model}</h4>
                  <p className="text-[#c4a661] text-xs md:text-sm font-bold">{car.pricePerDay} DH <span className="text-[10px] text-gray-500">/يوم</span></p>
                  <p className="text-gray-500 text-[10px] md:text-[11px] mt-1 font-bold truncate">📍 {car.location}</p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300">
                  <button onClick={() => handleEditClick(car)} className="p-2 md:p-3 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white cursor-pointer shadow-lg shadow-blue-500/10 transition-all text-xs md:text-base">✏️</button>
                  <button onClick={() => setConfirmDialog({ isOpen: true, id: car._id, type: 'deleteCar' })} className="p-2 md:p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white cursor-pointer shadow-lg shadow-red-500/10 transition-all text-xs md:text-base">🗑️</button>
                </div>
              </div>
            )})}
          </div>
        </div>

        {/* === جدول الحجوزات (CRM) === */}
        <div className="lg:col-span-3 mt-6 md:mt-10 space-y-4 md:space-y-6 w-full overflow-hidden">
          <h3 className="text-lg md:text-xl font-black flex items-center gap-2 text-[#c4a661]">
            <span className="w-1.5 h-6 bg-[#c4a661] rounded-full"></span>
            سجل طلبات الحجز (CRM)
          </h3>
          <div className="flex gap-3 w-full md:w-auto">
              <input 
                type="text" 
                placeholder="🔍 ابحث بالاسم، الهاتف، أو الكود..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#111] border border-white/10 px-4 py-2 rounded-xl text-sm font-bold outline-none focus:border-[#c4a661] transition-all w-full md:w-64"
              />
              <button 
                onClick={exportToExcel}
                className="bg-green-600/20 text-green-500 border border-green-600/30 hover:bg-green-600 hover:text-white px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap shadow-lg shadow-green-600/10 cursor-pointer"
              >
                📊 تصدير Excel
              </button>
            </div>
          {/* هاد الديف هو اللي كيحمي الشاشة من التمدد إيلا كان الجدول طويل */}
          <div className="w-full overflow-x-auto custom-scrollbar pb-4">
            <div className="bg-[#111111] rounded-[2rem] border border-white/5 shadow-2xl min-w-[800px] md:min-w-[1000px]">
              <table className="w-full text-right">
                <thead className="bg-[#1a1a1a] text-gray-400 text-[10px] md:text-[11px] uppercase tracking-widest border-b border-white/5">
                  <tr>
                    <th className="p-4 md:p-6 font-black whitespace-nowrap">الزبون / الكود المرجعي</th>
                    <th className="p-4 md:p-6 font-black whitespace-nowrap">التاريخ والإجمالي</th>
                    <th className="p-4 md:p-6 font-black whitespace-nowrap">الوثائق (الدوسي)</th>
                    <th className="p-4 md:p-6 font-black whitespace-nowrap">حالة الطلب والقرارات</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {filteredBookings.slice().reverse().map(b => (
                    <tr key={b._id} className="border-b border-white/[0.02] hover:bg-[#151515] transition-all group">
                      
                      <td className="p-4 md:p-6">
                        <div className="font-black text-white text-base md:text-lg">{b.customer?.fullName}</div>
                        <div className="text-[10px] md:text-[11px] text-gray-400 font-mono mt-1 font-bold">📞 {b.customer?.phone} <span className="text-[#c4a661] px-1 md:px-2">|</span> 🪪 {b.customer?.idCard}</div>
                        <div className="mt-2 md:mt-3 text-[10px] md:text-xs font-black text-[#c4a661] tracking-widest bg-[#c4a661]/10 border border-[#c4a661]/20 inline-block px-2 md:px-3 py-1 md:py-1.5 rounded-lg shadow-[0_0_15px_rgba(196,166,97,0.1)]">
                          {b.referenceCode || 'N/A'}
                        </div>
                      </td>
                      
                      <td className="p-4 md:p-6 font-bold text-gray-300 text-xs space-y-2 md:space-y-3">
                        <div className="bg-black/30 inline-block px-2 md:px-3 py-1.5 md:py-2 rounded-lg border border-white/5 text-gray-400 text-[10px] md:text-xs">
                          {new Date(b.startDate).toLocaleDateString()} <span className="text-[#c4a661]">←</span> {new Date(b.endDate).toLocaleDateString()}
                        </div>
                        <div className="font-black text-white text-lg md:text-xl">{b.totalPrice} <span className="text-[#c4a661] text-xs md:text-sm">DH</span></div>
                      </td>
                      
                      <td className="p-4 md:p-6">
                        <button 
                          onClick={() => setSelectedDossier(b)}
                          className="bg-black text-[#c4a661] border border-[#c4a661]/30 hover:bg-[#c4a661] hover:text-black px-3 md:px-5 py-2 md:py-3 rounded-xl text-[10px] md:text-xs font-black transition-all flex items-center gap-2 md:gap-3 cursor-pointer shadow-lg shadow-[#c4a661]/5 group-hover:border-[#c4a661] whitespace-nowrap"
                        >
                          <span className="text-base md:text-lg">📂</span> عرض الملف
                        </button>
                      </td>

                      <td className="p-4 md:p-6">
                        <div className="flex flex-col gap-2 md:gap-3">
                          {b.status === 'Pending_Review' && <span className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-[11px] font-black w-fit flex items-center gap-2 shadow-[0_0_10px_rgba(234,179,8,0.1)] whitespace-nowrap"><span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-yellow-500 animate-pulse"></span> قيد المراجعة</span>}
                          {b.status === 'Accepted' && <span className="bg-green-500/10 border border-green-500/20 text-green-500 px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-[11px] font-black w-fit shadow-[0_0_10px_rgba(34,197,94,0.1)] whitespace-nowrap">مقبول - بانتظار الدفع ✅</span>}
                          {b.status === 'Rejected' && <span className="bg-red-500/10 border border-red-500/20 text-red-500 px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-[11px] font-black w-fit whitespace-nowrap">مرفوض ❌</span>}
                          {b.status === 'Paid_Online' && <span className="bg-blue-500/10 border border-blue-500/20 text-blue-500 px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-[11px] font-black w-fit shadow-[0_0_10px_rgba(59,130,246,0.1)] whitespace-nowrap">تم الدفع 💳</span>}
                          {b.status === 'Pending_Payment_Verification' && <span className="bg-purple-500/10 border border-purple-500/20 text-purple-400 px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-[11px] font-black w-fit shadow-[0_0_10px_rgba(168,85,247,0.1)] whitespace-nowrap">تأكيد الوصل 🧾</span>}

                          {b.status === 'Pending_Review' && (
                            <div className="flex gap-2 mt-1 md:mt-2">
                              <button onClick={() => setConfirmDialog({ isOpen: true, id: b._id, type: 'status', newStatus: 'Accepted' })} className="bg-green-500/20 text-green-400 hover:bg-green-500 hover:text-white px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-[10px] md:text-[11px] font-black transition-all cursor-pointer flex-1">قبول</button>
                              <button onClick={() => setConfirmDialog({ isOpen: true, id: b._id, type: 'status', newStatus: 'Rejected' })} className="bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-[10px] md:text-[11px] font-black transition-all cursor-pointer flex-1">رفض</button>
                            </div>
                          )}

                          <div className="flex gap-2 mt-1">
                            <button 
                              onClick={() => openWhatsApp(b.customer?.phone, b.referenceCode)}
                              className="bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-[10px] md:text-[11px] font-black transition-all flex items-center justify-center gap-1 md:gap-2 cursor-pointer flex-1 whitespace-nowrap"
                            >
                              💬 واتساب
                            </button>
                            <button 
                              onClick={() => setConfirmDialog({ isOpen: true, id: b._id, type: 'deleteBooking' })}
                              className="bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-[10px] md:text-[11px] font-black transition-all cursor-pointer"
                            >
                              🗑️
                            </button>
                            <button 
                              onClick={() => generateContract(b)}
                              className="w-full bg-white/5 border border-white/10 hover:bg-white hover:text-black text-white px-4 py-2 rounded-xl text-[11px] font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm mb-2"
                            >
                              📄 تحميل العقد (PDF)
                            </button>
                            <div className="text-[10px] text-[#c4a661] mt-2 font-bold bg-[#c4a661]/10 w-fit px-2 py-1 rounded">
                            📍 {
                              !b.customer?.deliveryType 
                                ? 'الاستلام في الوكالة' // هادي كتحمينا من الحجوزات القديمة اللي مافيهمش هاد المعلومة
                                : b.customer?.deliveryType === 'agency' 
                                  ? 'الاستلام في الوكالة' 
                                  : `التوصيل إلى: ${b.customer?.deliveryAddress || 'لم يتم تحديد العنوان'}`
                            }
                          </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      {/* 📂 النافذة المنبثقة لعرض الدوسي (Modal) */}
      {selectedDossier && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#111111] border border-white/10 rounded-[2rem] max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-10 relative shadow-[0_0_60px_rgba(0,0,0,0.8)] custom-scrollbar">
            <button onClick={() => setSelectedDossier(null)} className="absolute top-4 left-4 md:top-6 md:left-6 w-10 h-10 md:w-12 md:h-12 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-full flex justify-center items-center font-black text-xl md:text-2xl transition-all cursor-pointer">✕</button>
            
            <h3 className="text-xl md:text-3xl font-black text-[#c4a661] mb-6 md:mb-10 border-b border-white/5 pb-4 md:pb-6 pr-8">
              ملف الزبون: <br className="md:hidden" /><span className="text-white text-base md:text-3xl">{selectedDossier.customer?.fullName}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-2 md:space-y-3">
                <h4 className="text-gray-400 font-bold text-xs md:text-sm uppercase tracking-widest flex items-center gap-2"><span className="text-lg md:text-xl">🪪</span> البطاقة الوطنية</h4>
                {selectedDossier.cinImage ? (
                  <a href={selectedDossier.cinImage} target="_blank" rel="noreferrer">
                    <img src={selectedDossier.cinImage} alt="CIN" className="w-full h-40 md:h-56 object-cover rounded-2xl border border-white/10 hover:border-[#c4a661] hover:shadow-[0_0_20px_rgba(196,166,97,0.2)] transition-all cursor-zoom-in" />
                  </a>
                ) : <div className="h-40 md:h-56 bg-white/5 rounded-2xl flex items-center justify-center text-gray-500 text-xs md:text-sm font-bold border border-dashed border-white/10">لا توجد صورة</div>}
              </div>

              <div className="space-y-2 md:space-y-3">
                <h4 className="text-gray-400 font-bold text-xs md:text-sm uppercase tracking-widest flex items-center gap-2"><span className="text-lg md:text-xl">🚘</span> رخصة السياقة</h4>
                {selectedDossier.permisImage ? (
                  <a href={selectedDossier.permisImage} target="_blank" rel="noreferrer">
                    <img src={selectedDossier.permisImage} alt="Permis" className="w-full h-40 md:h-56 object-cover rounded-2xl border border-white/10 hover:border-[#c4a661] hover:shadow-[0_0_20px_rgba(196,166,97,0.2)] transition-all cursor-zoom-in" />
                  </a>
                ) : <div className="h-40 md:h-56 bg-white/5 rounded-2xl flex items-center justify-center text-gray-500 text-xs md:text-sm font-bold border border-dashed border-white/10">لا توجد صورة</div>}
              </div>

              <div className="space-y-2 md:space-y-3">
                <h4 className="text-gray-400 font-bold text-xs md:text-sm uppercase tracking-widest flex items-center gap-2"><span className="text-lg md:text-xl">✍️</span> التوقيع الإلكتروني</h4>
                {selectedDossier.signatureImage ? (
                  <div className="bg-[#050505] border border-dashed border-[#c4a661]/40 rounded-2xl p-4 md:p-6 flex justify-center h-40 md:h-56 items-center">
                    <img src={selectedDossier.signatureImage} alt="Signature" className="h-24 md:h-32 object-contain filter drop-shadow-[0_0_15px_rgba(196,166,97,0.6)]" />
                  </div>
                ) : <div className="h-40 md:h-56 bg-white/5 rounded-2xl flex items-center justify-center text-gray-500 text-xs md:text-sm font-bold border border-dashed border-white/10">لا يوجد توقيع</div>}
              </div>

              <div className="space-y-2 md:space-y-3">
                <h4 className="text-green-500 font-bold text-xs md:text-sm uppercase tracking-widest flex items-center gap-2"><span className="text-lg md:text-xl">🧾</span> إثبات الدفع</h4>
                {selectedDossier.paymentProofImage ? (
                  <a href={selectedDossier.paymentProofImage} target="_blank" rel="noreferrer">
                    <img src={selectedDossier.paymentProofImage} alt="Payment Proof" className="w-full h-40 md:h-56 object-cover rounded-2xl border border-green-500/30 hover:border-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-all cursor-zoom-in" />
                  </a>
                ) : <div className="h-40 md:h-56 bg-green-500/5 border border-dashed border-green-500/20 rounded-2xl flex items-center justify-center text-green-700/50 text-xs md:text-sm font-bold">لم يتم رفع الوصل بعد</div>}
              </div>
            </div>

            <div className="mt-8 md:mt-10 flex justify-center">
              <button onClick={() => setSelectedDossier(null)} className="w-full sm:w-auto bg-[#c4a661] text-black font-black px-12 py-3.5 md:py-4 rounded-xl hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all cursor-pointer text-base md:text-lg">إغلاق الملف</button>
            </div>
          </div>
        </div>
      )}

      {/* ⚠️ النافذة الذكية الفخمة */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#111111] border border-white/10 p-6 md:p-8 rounded-[2rem] w-full max-w-md text-center shadow-[0_0_60px_rgba(0,0,0,0.6)] relative overflow-hidden">
            
            <div className={`absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 blur-[60px] rounded-full pointer-events-none ${
              confirmDialog.type === 'status' && confirmDialog.newStatus === 'Accepted' ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}></div>

            <div className={`w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full flex items-center justify-center text-3xl md:text-4xl mb-4 md:mb-6 shadow-inner relative z-10 ${
              confirmDialog.type === 'status' && confirmDialog.newStatus === 'Accepted' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
            }`}>
              {confirmDialog.type === 'status' && confirmDialog.newStatus === 'Accepted' ? '✅' : '⚠️'}
            </div>
            
            <h3 className="text-xl md:text-2xl font-black text-white mb-2 md:mb-3 relative z-10">تأكيد الإجراء</h3>
            
            <p className="text-gray-400 font-bold mb-6 md:mb-8 text-xs md:text-sm leading-relaxed relative z-10">
              {confirmDialog.type === 'status' ? (
                <>هل أنت متأكد أنك تريد <span className={confirmDialog.newStatus === 'Accepted' ? 'text-green-500' : 'text-red-500'}>{confirmDialog.newStatus === 'Accepted' ? 'قبول' : 'رفض'}</span> هذا الطلب نهائياً؟</>
              ) : confirmDialog.type === 'deleteBooking' ? (
                <>هل أنت متأكد من <span className="text-red-500">مسح هذا الحجز</span> نهائياً؟<br/>لا يمكن التراجع عن هذا القرار. 🗑️</>
              ) : (
                <>هل أنت متأكد من <span className="text-red-500">مسح هذه السيارة</span> من الأسطول نهائياً؟ 🗑️</>
              )}
            </p>

            <div className="flex gap-3 md:gap-4 relative z-10">
              <button onClick={() => setConfirmDialog({ isOpen: false, id: null, type: '', newStatus: '' })} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-black py-3 md:py-4 rounded-xl transition-all cursor-pointer border border-white/5 text-sm md:text-base">
                إلغاء
              </button>
              <button onClick={executeAction} className={`flex-1 font-black py-3 md:py-4 rounded-xl transition-all cursor-pointer text-white text-sm md:text-base ${
                confirmDialog.type === 'status' && confirmDialog.newStatus === 'Accepted' 
                ? 'bg-green-500 hover:bg-green-600 shadow-[0_0_20px_rgba(34,197,94,0.3)]' 
                : 'bg-red-500 hover:bg-red-600 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
              }`}>
                {confirmDialog.type === 'status' ? 'تأكيد القرار' : 'مسح نهائي'}
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
      {/* 🔥 زدنا overflow-x-hidden هنا باش نحميو السيت كامل من أي حاجة كتخرج على الشاشة فالتليفون */}
      <div className="bg-[#080808] min-h-screen overflow-x-hidden">
        <Navbar />
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
            error: { iconTheme: { primary: '#ef4444', secondary: '#111' } },
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
        </Routes>
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
