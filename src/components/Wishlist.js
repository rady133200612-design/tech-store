import React from 'react';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';

const Wishlist = ({ wishlist, addToCart, toggleWishlist }) => {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Heart color="#ef4444" fill="#ef4444" /> قائمة المفضلة ({wishlist.length})
      </h1>

      {wishlist.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', background: 'white', borderRadius: '20px' }}>
          <p>لم تقم بإضافة أي منتجات للمفضلة بعد.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {wishlist.map(p => (
            <div key={p.id} style={{ background: 'white', borderRadius: '20px', padding: '15px', position: 'relative', border: '1px solid #e2e8f0' }}>
              <img src={p.image_url} alt="" style={{ width: '100%', height: '150px', objectFit: 'contain' }} />
              <h3>{p.name}</h3>
              <p style={{ color: '#3b82f6', fontWeight: 'bold' }}>${p.price}</p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <button onClick={() => addToCart(p)} style={{ flex: 1, background: '#0f172a', color: 'white', border: 'none', padding: '10px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                  <ShoppingBag size={18} /> للسلة
                </button>
                <button onClick={() => toggleWishlist(p)} style={{ background: '#fee2e2', border: 'none', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}>
                  <Trash2 size={18} color="#ef4444" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;