import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Printer, CheckCircle2, Home } from 'lucide-react';

const Invoice = () => {
  const { state } = useLocation();
  if (!state) return <div style={{textAlign:'center'}}>لا توجد بيانات للفاتورة</div>;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <CheckCircle2 size={60} color="#10b981" style={{ marginBottom: '15px' }} />
        <h1 style={{ margin: 0 }}>شكراً لشرائك!</h1>
        <p style={{ color: '#64748b' }}>تم استلام طلبك رقم #{state.orderId}</p>
      </div>

      <div style={{ borderTop: '2px dashed #e2e8f0', borderBottom: '2px dashed #e2e8f0', padding: '20px 0', margin: '20px 0' }}>
        {state.cart.map((item, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>{item.name}</span>
            <span style={{ fontWeight: 'bold' }}>${item.price}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: 'bold' }}>
        <span>الإجمالي المدفوع:</span>
        <span style={{ color: '#3b82f6' }}>${state.total}</span>
      </div>

      <div style={{ display: 'flex', gap: '15px', marginTop: '40px' }}>
        <button onClick={() => window.print()} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #3b82f6', background: 'white', color: '#3b82f6', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <Printer size={18}/> طباعة الفاتورة
        </button>
        <Link to="/" style={{ flex: 1, padding: '12px', borderRadius: '12px', background: '#3b82f6', color: 'white', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <Home size={18}/> العودة للمتجر
        </Link>
      </div>
    </div>
  );
};

export default Invoice;