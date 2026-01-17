import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { CheckCircle, XCircle, Clock, Database } from 'lucide-react';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const { data } = await supabase.from('product_requests').select('*');
    setRequests(data || []);
  };

  const approveProduct = async (req) => {
    // 1. إضافة المنتج للجدول الرئيسي
    const { error: addError } = await supabase.from('products').insert([
      { name: req.name, price: req.price, description: req.description, image_url: req.image_url }
    ]);

    if (!addError) {
      // 2. حذف الطلب من جدول الطلبات بعد الموافقة
      await supabase.from('product_requests').delete().eq('id', req.id);
      alert(`تمت الموافقة على ${req.name} بنجاح!`);
      fetchRequests();
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
        <div style={{ background: '#f59e0b', padding: '10px', borderRadius: '12px', color: 'white' }}><Database /></div>
        <h1 style={{ margin: 0 }}>مراجعة طلبات المنتجات</h1>
      </div>

      {requests.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', background: 'white', borderRadius: '20px' }}>
          <Clock size={48} color="#94a3b8" style={{ marginBottom: '15px' }} />
          <p style={{ color: '#64748b' }}>لا توجد طلبات معلقة حالياً</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {requests.map(req => (
            <div key={req.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '20px', borderRadius: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <img src={req.image_url || 'https://via.placeholder.com/80'} style={{ width: '80px', height: '80px', borderRadius: '15px', objectFit: 'contain', background: '#f8fafc' }} alt="" />
                <div>
                  <h3 style={{ margin: '0 0 5px 0' }}>{req.name}</h3>
                  <p style={{ margin: 0, color: '#3b82f6', fontWeight: 'bold' }}>${req.price}</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => approveProduct(req)} style={btnApprove}><CheckCircle size={18} /> موافقة</button>
                <button style={btnReject}><XCircle size={18} /> رفض</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const btnApprove = { display: 'flex', alignItems: 'center', gap: '8px', background: '#10b981', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' };
const btnReject = { display: 'flex', alignItems: 'center', gap: '8px', background: '#ef4444', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' };

export default AdminDashboard;