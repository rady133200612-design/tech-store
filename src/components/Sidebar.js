import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PlusCircle, ShieldCheck, Cpu, ChevronRight, ChevronLeft } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { name: 'المتجر الرئيسي', icon: <Home size={22}/>, path: '/' },
    { name: 'بيع منتجك', icon: <PlusCircle size={22}/>, path: '/add-product' },
    { name: 'لوحة التحكم', icon: <ShieldCheck size={22}/>, path: '/admin' },
  ];

  return (
    <div style={{ 
      width: isOpen ? '260px' : '80px', 
      background: '#0f172a', 
      color: 'white', 
      padding: '25px 15px',
      transition: 'width 0.3s ease',
      position: 'relative'
    }}>
      <button onClick={() => setIsOpen(!isOpen)} style={{ position: 'absolute', left: '-15px', top: '40px', background: '#3b82f6', border: 'none', borderRadius: '50%', width: '30px', height: '30px', color: 'white', cursor: 'pointer', zIndex: 100 }}>
        {isOpen ? <ChevronRight size={18}/> : <ChevronLeft size={18}/>}
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
        <div style={{ background: '#3b82f6', borderRadius: '8px', padding: '6px' }}><Cpu size={26} color="white" /></div>
        {isOpen && <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: 0 }}>تكنو ستور</h2>}
      </div>

      <nav>
        {menuItems.map((item) => (
          <Link key={item.path} to={item.path} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 15px', borderRadius: '12px', textDecoration: 'none', marginBottom: '10px', color: location.pathname === item.path ? '#fff' : '#94a3b8', background: location.pathname === item.path ? '#3b82f6' : 'transparent', justifyContent: isOpen ? 'flex-start' : 'center' }}>
            {item.icon} {isOpen && <span style={{ whiteSpace: 'nowrap' }}>{item.name}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;