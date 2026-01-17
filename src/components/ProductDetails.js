import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingCart, ShieldCheck } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams(); // هنجيب الـ ID من الرابط
  const navigate = useNavigate();

  // في مشروع حقيقي، هنا بنعمل Fetch للمنتج بالـ ID ده
  // حالياً هنفترض إن البيانات موجودة

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', marginBottom: '20px', color: '#64748b' }}>
        <ArrowRight size={20}/> العودة للمتجر
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', background: 'white', padding: '40px', borderRadius: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <div style={{ background: '#f1f5f9', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <img src="https://via.placeholder.com/400" style={{ maxWidth: '100%', borderRadius: '15px' }} alt="Product" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>قسم الإلكترونيات</span>
          <h1 style={{ fontSize: '2.5rem', margin: '10px 0' }}>اسم المنتج هنا</h1>
          <p style={{ color: '#64748b', lineHeight: '1.8', fontSize: '1.1rem' }}>
            هذا النص هو مثال لوصف المنتج. الجهاز يتميز بمواصفات عالية الجودة وتصميم عصري يناسب احتياجاتك اليومية.
          </p>
          
          <div style={{ margin: '30px 0', fontSize: '2rem', fontWeight: '800', color: '#0f172a' }}>$99.00</div>
          
          <div style={{ display: 'flex', gap: '15px' }}>
            <button style={{ flex: 1, background: '#3b82f6', color: 'white', border: 'none', padding: '15px', borderRadius: '15px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer' }}>
              <ShoppingCart size={20}/> إضافة للسلة
            </button>
            <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '15px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <ShieldCheck /> ضمان سنة
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;