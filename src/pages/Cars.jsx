import { useState } from 'react';
import { Link } from 'react-router-dom';

const Cars = ({ cars }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('الكل');
  const [priceRange, setPriceRange] = useState('all');
  
  // 👇 State جديد باش نتحكمو فالفلتر واش محلول ولا مسدود (فالتليفون)
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredCars = cars.filter(car => {
    const matchSearch = car.brand.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        car.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = category === 'الكل' || car.category === category;
    
    let matchPrice = true;
    if (priceRange === 'low') matchPrice = car.pricePerDay <= 300;
    else if (priceRange === 'mid') matchPrice = car.pricePerDay > 300 && car.pricePerDay <= 900;
    else if (priceRange === 'high') matchPrice = car.pricePerDay > 900;

    return matchSearch && matchCategory && matchPrice;
  });

  return (
    <div className="min-h-screen bg-[#080808] pt-28 md:pt-32 pb-20 px-4 md:px-6 font-['Cairo']" dir="rtl">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-10">
        
        {/* ================= Sidebar (تصفية البحث) ================= */}
        <div className="lg:col-span-1">
          <div className="bg-[#111111] border border-white/5 p-5 md:p-8 rounded-[20px] md:rounded-[30px] lg:sticky lg:top-32 shadow-xl">
            
            {/* عنوان الفلتر (كيكليكي عليه فالتليفون باش يحل ويسد) */}
            <div 
              className="flex justify-between items-center cursor-pointer lg:cursor-default"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <h3 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
                تصفية البحث 🔍
              </h3>
              {/* السهم كيبان غير فالتليفون */}
              <span className={`text-[#c4a661] text-xl transition-transform duration-300 lg:hidden ${isFilterOpen ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </div>

            {/* محتوى الفلتر (كيتخبى فالتليفون إيلا كان مسدود) */}
            <div className={`transition-all duration-500 overflow-hidden lg:max-h-full lg:opacity-100 lg:mt-8 lg:border-t lg:border-white/5 lg:pt-6 ${isFilterOpen ? 'max-h-[1000px] opacity-100 mt-6' : 'max-h-0 opacity-0 m-0'}`}>
              
              <div className="space-y-3 mb-6">
                <label className="text-[10px] md:text-xs font-black text-[#c4a661] uppercase tracking-widest">اسم السيارة</label>
                <input 
                  type="text" placeholder="مثلا: Mercedes, Dacia..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 p-3 md:p-4 rounded-xl md:rounded-2xl text-white text-sm outline-none focus:border-[#c4a661] transition-all"
                />
              </div>

              <div className="space-y-3 mb-6">
                <label className="text-[10px] md:text-xs font-black text-[#c4a661] uppercase tracking-widest">الفئة</label>
                <div className="flex flex-col gap-2 text-gray-300 font-bold text-sm">
                  {['الكل', 'اقتصادية', 'رياضية', 'فاخرة', 'دفع رباعي'].map(cat => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-white/5 rounded-lg transition-all">
                      <input type="radio" name="category" checked={category === cat} onChange={() => setCategory(cat)} className="accent-[#c4a661] w-4 h-4" />
                      <span className={category === cat ? 'text-[#c4a661] font-black' : ''}>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] md:text-xs font-black text-[#c4a661] uppercase tracking-widest">السعر (في اليوم)</label>
                <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="w-full bg-white/5 border border-white/10 p-3 md:p-4 rounded-xl md:rounded-2xl text-white text-sm outline-none focus:border-[#c4a661]">
                  <option value="all" className="bg-black">كل الأسعار</option>
                  <option value="low" className="bg-black">أقل من 300 درهم</option>
                  <option value="mid" className="bg-black">بين 300 و 900 درهم</option>
                  <option value="high" className="bg-black">أكثر من 900 درهم</option>
                </select>
              </div>

            </div>
          </div>
        </div>

        {/* ================= عرض السيارات ================= */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-white">أسطول <span className="text-[#c4a661]">السيارات</span></h2>
            <span className="text-gray-500 font-bold bg-white/5 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm">
              {filteredCars.length} متاحة
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCars.length > 0 ? (
              filteredCars.map(car => {
                const displayImage = car.images && car.images.length > 0 ? car.images[0] : car.image;

                return (
                <div key={car._id} className="group bg-[#111111] border border-white/5 rounded-3xl overflow-hidden hover:border-[#c4a661]/40 transition-all duration-500 shadow-xl flex flex-col">
                  <div className="h-48 bg-[#1a1a1a] relative overflow-hidden flex items-center justify-center">
                    <img src={displayImage} alt={car.brand} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                    <div className="absolute top-4 right-4 bg-black/80 text-[#c4a661] px-3 py-1 rounded-full text-[10px] font-black uppercase border border-[#c4a661]/20 backdrop-blur-sm">
                      {car.category}
                    </div>
                  </div>
                  <div className="p-5 md:p-6 flex flex-col flex-grow text-right">
                    <h4 className="text-lg font-black text-white group-hover:text-[#c4a661] transition-colors">{car.brand} {car.model}</h4>
                    <div className="mt-3 mb-5 flex justify-between items-end border-t border-white/5 pt-4">
                       <span className="text-[10px] md:text-xs text-gray-500 font-bold tracking-widest uppercase">السعر اليومي</span>
                       <span className="text-xl md:text-2xl font-black text-[#c4a661]">{car.pricePerDay} DH</span>
                    </div>
                    <Link 
                      to={`/car/${car._id}`}
                      className="mt-auto w-full bg-white/5 hover:bg-[#c4a661] text-white hover:text-black py-3 rounded-xl font-black text-sm transition-all duration-300 text-center block border border-white/10 hover:border-[#c4a661]"
                    >
                      التفاصيل والحجز
                    </Link>
                  </div>
                </div>
              )})
            ) : (
              <div className="col-span-full py-20 text-center bg-[#111111] rounded-3xl border border-white/5">
                <span className="text-5xl block mb-4">🔍</span>
                <h3 className="text-xl font-black text-white">لم نجد سيارات تطابق بحثك</h3>
                <p className="text-gray-500 font-bold mt-2 text-sm">حاول تغيير إعدادات الفلتر</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cars;