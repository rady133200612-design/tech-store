import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, MapPin, CheckCircle } from 'lucide-react';

const Checkout = ({ cart, clearCart }) => {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    setLoading(true);
    // محاكاة عملية الدفع لمدة ثانيتين
    setTimeout(() => {
      setLoading(false);
      navigate('/invoice', { state: { cart, total, orderId: Math.floor(Math.random() * 90000) + 10000 } });
      clearCart(); // تفريغ السلة بعد نجاح العملية
    }, 2000);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px' }}>
      {/* الجزء الأيمن: بيانات العميل */}
      <div style={{ background: 'white', padding: '30px', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}><Truck color="#3b82f6"/> تفاصيل الشحن</h2>
        <div style={{ display: 'grid', gap: '15px' }}>
          <input style={inStyle} type="text" placeholder="الاسم الكامل" />
          <input style={inStyle} type="text" placeholder="رقم الهاتف" />
          <div style={{ display: 'flex', gap: '10px' }}>
             <input style={inStyle} type="text" placeholder="المدينة" />
             <input style={inStyle} type="text" placeholder="الرمز البريدي" />
          </div>
          <textarea style={{...inStyle, height: '80px'}} placeholder="العنوان بالتفصيل..."></textarea>
        </div>

        <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '30px 0 20px' }}><CreditCard color="#3b82f6"/> طريقة الدفع</h2>
        <div style={{ display: 'flex', gap: '15px' }}>
            <div style={paymentOptStyle}><CheckCircle size={16} color="#3b82f6"/> الدفع عند الاستلام</div>
            <div style={{...paymentOptStyle, opacity: 0.5, cursor: 'not-allowed'}}>البطاقة البنكية (قريباً)</div>
        </div>
      </div>

      {/* الجزء الأيسر: ملخص الطلب */}
      <div style={{ background: '#0f172a', color: 'white', padding: '25px', borderRadius: '24px', height: 'fit-content' }}>
        <h3>ملخص الطلب</h3>
        <hr style={{ opacity: 0.1, margin: '15px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span>عدد المنتجات:</span>
          <span>{cart.length}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span>رسوم الشحن:</span>
          <span style={{ color: '#10b981' }}>مجاناً</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '20px' }}>
          <span>الإجمالي:</span>
          <span>${total}</span>
        </div>
        <button 
          onClick={handlePay}
          disabled={loading}
          style={payBtnStyle}>
          {loading ? 'جاري المعالجة...' : 'تأكيد وطلب الآن'}
        </button>
      </div>
    </div>
  );
};

const inStyle = { width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' };
const paymentOptStyle = { flex: 1, padding: '15px', border: '2px solid #3b82f6', borderRadius: '12px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' };
const payBtnStyle = { width: '100%', marginTop: '25px', padding: '15px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' };

export default Checkout;