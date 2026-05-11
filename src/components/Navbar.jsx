import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State ديال قائمة التليفون
  const location = useLocation();

  // باش النافبار يولي كحل ملي كتهبط فـ السكرول
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // باش تسد القائمة أوتوماتيكيا ملي الكليان كيبدل الصفحة
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || isMobileMenuOpen ? 'bg-[#050505]/95 backdrop-blur-md py-4 shadow-2xl border-b border-white/5' : 'bg-transparent py-6'}`} dir="rtl">
      <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center font-['Cairo']">
        
        {/* 1. اللوݣو والسمية */}
        <Link to="/" className="flex items-center gap-3 group z-50">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#c4a661] to-[#8a723d] rounded-xl flex items-center justify-center text-xl md:text-2xl shadow-[0_0_15px_rgba(196,166,97,0.4)] group-hover:scale-105 transition-transform">
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-black text-white tracking-widest">
              NINJA <span className="text-[#c4a661]">CARS</span>
            </span>
            <span className="text-[7px] md:text-[9px] text-gray-400 font-bold tracking-[0.3em] uppercase mt-0.5">
              Premium Rent
            </span>
          </div>
        </Link>

        {/* 2. الروابط ديال البيسي (مخفيين فالتليفون) */}
        <div className="hidden lg:flex items-center gap-8">
          <Link to="/" className={`text-sm font-black transition-colors ${location.pathname === '/' ? 'text-[#c4a661]' : 'text-white hover:text-[#c4a661]'}`}>الرئيسية</Link>
          <Link to="/cars" className={`text-sm font-black transition-colors ${location.pathname === '/cars' ? 'text-[#c4a661]' : 'text-gray-300 hover:text-[#c4a661]'}`}>استكشف السيارات</Link>
          <Link to="/offers" className={`text-sm font-black transition-colors ${location.pathname === '/offers' ? 'text-[#c4a661]' : 'text-gray-300 hover:text-[#c4a661]'}`}>عروض خاصة</Link>
          <Link to="/contact" className={`text-sm font-black transition-colors ${location.pathname === '/contact' ? 'text-[#c4a661]' : 'text-gray-300 hover:text-[#c4a661]'}`}>اتصل بنا</Link>
          <Link to="/about" className={`text-sm font-black transition-colors ${location.pathname === '/about' ? 'text-[#c4a661]' : 'text-gray-300 hover:text-[#c4a661]'}`}>من نحن</Link>
          <Link to="/track" className={`text-sm font-black transition-colors ${location.pathname === '/track' ? 'text-[#c4a661]' : 'text-gray-300 hover:text-[#c4a661]'}`}>تتبع الحجز</Link>
        </div>

        {/* 3. الإعدادات وبوطونة الحجز (والقائمة ديال التليفون) */}
        <div className="flex items-center gap-4 md:gap-6 z-50">
          <div className="hidden lg:flex items-center gap-2 text-gray-400 hover:text-white cursor-pointer transition-colors">
            <span className="text-sm font-bold">العربية</span>
            <span className="text-lg">🌐</span>
          </div>
          
          {/* بوطونة "احجز الآن" (كتبان غير فالبيسي والآيباد) */}
          <Link 
            to="/cars" 
            className="hidden md:block bg-[#c4a661] text-black hover:bg-white px-8 py-3 rounded-xl font-black transition-all shadow-[0_5px_20px_rgba(196,166,97,0.3)] hover:shadow-[0_5px_25px_rgba(255,255,255,0.4)] hover:-translate-y-1"
          >
            احجز الآن
          </Link>

          {/* 🍔 زر القائمة ديال التليفون (Hamburger Icon) */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white text-3xl focus:outline-none hover:text-[#c4a661] transition-colors"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

      </div>

      {/* 📱 القائمة المنسدلة ديال التليفون (Mobile Menu Dropdown) */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col px-6 py-4 space-y-4 text-right font-['Cairo'] pb-8">
          <Link to="/" className={`text-lg font-black border-b border-white/5 pb-3 ${location.pathname === '/' ? 'text-[#c4a661]' : 'text-white'}`}>الرئيسية</Link>
          <Link to="/cars" className={`text-lg font-black border-b border-white/5 pb-3 ${location.pathname === '/cars' ? 'text-[#c4a661]' : 'text-gray-300'}`}>استكشف السيارات</Link>
          <Link to="/offers" className={`text-lg font-black border-b border-white/5 pb-3 ${location.pathname === '/offers' ? 'text-[#c4a661]' : 'text-gray-300'}`}>عروض خاصة</Link>
          <Link to="/contact" className={`text-lg font-black border-b border-white/5 pb-3 ${location.pathname === '/contact' ? 'text-[#c4a661]' : 'text-gray-300'}`}>اتصل بنا</Link>
          <Link to="/about" className={`text-lg font-black border-b border-white/5 pb-3 ${location.pathname === '/about' ? 'text-[#c4a661]' : 'text-gray-300'}`}>من نحن</Link>
          <Link 
            to="/track" 
            className={`block text-xl font-black py-4 border-b border-white/5 transition-colors ${location.pathname === '/track' ? 'text-[#c4a661]' : 'text-gray-300 hover:text-[#c4a661]'}`}
            >
            تتبع الحجز
            </Link>
          {/* بوطونة الحجز الكبيرة وسط قائمة التليفون */}
          <Link 
            to="/cars" 
            className="bg-[#c4a661] text-black text-center py-4 rounded-xl font-black text-lg mt-4 shadow-lg shadow-[#c4a661]/20"
          >
            احجز سيارتك الآن
          </Link>

        </div>
      </div>
      
    </nav>
  );
};

export default Navbar;