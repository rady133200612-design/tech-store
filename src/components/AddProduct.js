import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { PackagePlus } from 'lucide-react';

const AddProduct = () => {
  const [form, setForm] = useState({ name: '', price: '', desc: '', img: '' });

  const sendRequest = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('product_requests').insert([{
      name: form.name, price: form.price, description: form.desc, image_url: form.img
    }]);
    if (!error) { alert('تم الإرسال بنجاح! طلبك قيد المراجعة.'); setForm({ name: '', price: '', desc: '', img: '' }); }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <PackagePlus size={48} color="#3b82f6" style={{ marginBottom: '10px' }} />
        <h2 style={{ margin: 0 }}>إضافة منتج جديد للمتجر</h2>
      </div>
      <form onSubmit={sendRequest} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <input style={inStyle} type="text" placeholder="اسم المنتج" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
        <input style={inStyle} type="number" placeholder="السعر بالدولار" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
        <textarea style={{...inStyle, height: '120px'}} placeholder="وصف الجهاز..." value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} required />
        <input style={inStyle} type="text" placeholder="رابط الصورة (URL)" value={form.img} onChange={e => setForm({...form, img: e.target.value})} />
        <button type="submit" style={{ padding: '15px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>إرسال الطلب للمراجعة</button>
      </form>
    </div>
  );
};

const inStyle = { padding: '12px 15px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '1rem' };

export default AddProduct;