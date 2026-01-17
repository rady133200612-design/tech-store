import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, CreditCard, ShoppingBag } from 'lucide-react';

const CartPage = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const removeItem = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
        <div style={{ background: '#3b82f6', padding: '10px', borderRadius: '12px', color: 'white' }}>
          <ShoppingBag size={24} />
        </div>
        <h1 style={{ margin: 0 }}>سلة المشتريات ({cart.length})</h1>
      </div>

      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
          <ShoppingBag size={50} color="#cbd5e1" style={{ marginBottom: '15px' }} />
          <h3 style={{ color: '#64748b' }}>السلة فارغة حالياً</h3>
          <button onClick={() => navigate('/')} style={{ marginTop: '20px', background: '#3b82f6', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>تصفح المنتجات</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {cart.map((item, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '20px', borderRadius: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '70px', height: '70px', background: '#f8fafc', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={item.image_url || 'https://via.placeholder.com/70'} style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} alt="" />
                </div>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>{item.name}</h3>
                  <span style={{ color: '#3b82f6', fontWeight: '800', fontSize: '1.2rem' }}>${item.price}</span>
                </div>
              </div>
              <button 
                onClick={() => removeItem(index)} 
                style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '10px', borderRadius: '12px', cursor: 'pointer', transition: '0.2s' }}
                onMouseOver={(e) => e.target.style.background = '#fecaca'}
                onMouseOut={(e) => e.target.style.background = '#fee2e2'}
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}

          {/* ملخص السعر وزر الدفع */}
          <div style={{ marginTop: '25px', background: '#0f172a', color: 'white', padding: '30px', borderRadius: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 10px 15px -3px rgba(15, 23, 42, 0.3)' }}>
            <div>
              <p style={{ margin: '0 0 5px 0', opacity: 0.6, fontSize: '0.9rem' }}>الإجمالي المستحق:</p>
              <h2 style={{ margin: 0, fontSize: '2rem' }}>${total}</h2>
            </div>
            <button 
              onClick={() => navigate('/checkout')}
              style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '15px 35px', borderRadius: '15px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', transition: '0.3s' }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              <CreditCard size={22} /> إتمام الطلب
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;