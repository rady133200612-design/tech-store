import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, LogIn } from 'lucide-react';

const Login = ({ setIsAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // تجربة وهمية: لو الإيميل admin@test.com والباسورد 123
    if (email === 'admin@test.com' && password === '123') {
      setIsAuth(true); // تفعيل حالة الدخول
      navigate('/admin'); // تحويله للأدمن
    } else {
      alert('بيانات الدخول غلط يا بطل!');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ background: '#3b82f6', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' }}>
            <Lock color="white" size={30} />
          </div>
          <h2 style={{ margin: 0 }}>تسجيل دخول الأدمن</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>ادخل بياناتك للوصول للوحة التحكم</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ position: 'relative' }}>
            <User style={{ position: 'absolute', right: '12px', top: '12px', color: '#94a3b8' }} size={20} />
            <input type="email" placeholder="البريد الإلكتروني" required style={inputStyle} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div style={{ position: 'relative' }}>
            <Lock style={{ position: 'absolute', right: '12px', top: '12px', color: '#94a3b8' }} size={20} />
            <input type="password" placeholder="كلمة المرور" required style={inputStyle} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" style={btnStyle}>
            <LogIn size={20} /> دخول
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = { width: '100%', padding: '12px 45px 12px 15px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '1rem' };
const btnStyle = { background: '#3b82f6', color: 'white', border: 'none', padding: '14px', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' };

export default Login;