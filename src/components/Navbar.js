import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Bell, User } from 'lucide-react';

const Navbar = ({ cartCount }) => {
  return (
    <header style={{
      height: '70px',
      background: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 30px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#64748b' }}>
        مرحباً بك في تكنو ستور 👋
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* أيقونة السلة المستقلة */}
        <Link to="/cart" style={{ position: 'relative', color: '#1e293b', background: '#f1f5f9', padding: '10px', borderRadius: '12px', display: 'flex', textDecoration: 'none' }}>
          <ShoppingCart size={24} />
          {cartCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              background: '#ef4444',
              color: 'white',
              fontSize: '11px',
              fontWeight: 'bold',
              minWidth: '20px',
              height: '20px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid white'
            }}>
              {cartCount}
            </span>
          )}
        </Link>

        {/* أيقونات إضافية للشكل الاحترافي */}
        <div style={{ color: '#94a3b8', cursor: 'pointer' }}><Bell size={22} /></div>
        <div style={{ color: '#94a3b8', cursor: 'pointer', border: '2px solid #e2e8f0', borderRadius: '50%', padding: '2px' }}><User size={22} /></div>
      </div>
    </header>
  );
};

export default Navbar;