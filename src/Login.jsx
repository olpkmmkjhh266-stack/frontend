import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://25ae9fba-373f-4c87-9e13-4f6d9e897713-00-2lenq371o9y9p.picard.replit.dev:3000/api/admin/login', { username, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      navigate('/admin'); // كيديك لصفحة الأدمين مورا الدخول
    } catch (err) {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة ❌');
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-6 font-['Cairo'] relative overflow-hidden" dir="rtl">
      
      {/* بقع ضوئية فالخلفية باش تعطي جمالية */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#c4a661]/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-[#c4a661]/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#111111] p-10 rounded-[40px] border border-white/5 shadow-2xl relative z-10">
        
        {/* اللوݣو والعنوان */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-[#c4a661] to-[#8a723d] rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-[0_0_30px_rgba(196,166,97,0.3)]">
            🥷
          </div>
          <h2 className="text-3xl font-black text-white mb-2">تسجيل <span className="text-[#c4a661]">الدخول</span></h2>
          <p className="text-gray-500 font-bold text-sm">خاص بإدارة منصة NINJA CARS</p>
        </div>

        {/* رسالة الخطأ */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-500 text-sm font-bold p-4 rounded-2xl mb-6 text-center animate-fade-in">
            {error}
          </div>
        )}

        {/* فورم الدخول */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2 text-right">
            <label className="text-[10px] font-black text-[#c4a661] uppercase tracking-widest mr-2">اسم المستخدم</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-[#c4a661] transition-colors" 
              placeholder="مثال: admin"
              required 
            />
          </div>

          <div className="space-y-2 text-right">
            <label className="text-[10px] font-black text-[#c4a661] uppercase tracking-widest mr-2">كلمة المرور</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-[#c4a661] transition-colors font-mono text-left" 
              placeholder="••••••••"
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#c4a661] hover:bg-white text-black font-black py-4 rounded-2xl text-lg transition-all shadow-[0_10px_30px_rgba(196,166,97,0.3)] mt-4 cursor-pointer"
          >
            دخول للوحة التحكم
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;