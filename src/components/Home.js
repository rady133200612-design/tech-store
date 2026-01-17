import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Search, ShoppingBag, Heart, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = ({ addToCart, toggleWishlist, wishlist }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*');
      if (!error) setProducts(data || []);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <div className="loader">جاري تحميل أحدث المنتجات...</div>
    </div>
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header & Search Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', gap: '20px', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>المتجر الذكي</h1>
          <p style={{ color: '#64748b', marginTop: '5px' }}>اكتشف أفضل العروض الحصرية اليوم</p>
        </div>
        
        <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
          <input 
            type="text" 
            placeholder="ابحث عن هاتف، سماعة، لابتوب..." 
            onChange={(e) => setSearch(e.target.value)}
            style={searchBarStyles} 
          />
          <Search style={{ position: 'absolute', right: '15px', top: '15px', color: '#94a3b8' }} size={20} />
        </div>
      </div>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', color: '#94a3b8' }}>لم نجد منتجات تطابق بحثك..</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
          {filtered.map(p => {
            const isFavorite = wishlist && wishlist.find(item => item.id === p.id);
            
            return (
              <div key={p.id} className="product-card" style={cardStyles}>
                {/* Badge & Heart Button */}
                <div style={{ position: 'absolute', top: '15px', left: '15px', right: '15px', display: 'flex', justifyContent: 'space-between', zIndex: 10 }}>
                  <span style={badgeStyles}><Zap size={14} fill="currentColor"/> تريند</span>
                  <button 
                    onClick={() => toggleWishlist(p)}
                    style={heartBtnStyles}
                  >
                    <Heart size={18} color="#ef4444" fill={isFavorite ? "#ef4444" : "none"} />
                  </button>
                </div>

                {/* Product Image */}
                <Link to={`/product/${p.id}`} style={{ textDecoration: 'none' }}>
                  <div style={imageWrapperStyles}>
                    <img src={p.image_url || 'https://via.placeholder.com/200'} alt={p.name} style={imgStyles} />
                  </div>
                </Link>

                {/* Info Section */}
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />)}
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', marginRight: '5px' }}>(4.8)</span>
                  </div>
                  
                  <Link to={`/product/${p.id}`} style={{ textDecoration: 'none', color: '#1e293b' }}>
                    <h3 style={{ margin: '0 0 15px 0', fontSize: '1.1rem', fontWeight: '700', height: '2.4em', overflow: 'hidden' }}>{p.name}</h3>
                  </Link>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#3b82f6' }}>${p.price}</span>
                    </div>
                    <button 
                      onClick={() => addToCart(p)}
                      className="add-to-cart-btn"
                      style={cartBtnStyles}
                    >
                      <ShoppingBag size={18} />
                      <span>أضف للسلة</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Styles Objects
const searchBarStyles = {
  width: '100%', padding: '14px 45px 14px 15px', borderRadius: '15px', 
  border: '1px solid #e2e8f0', outline: 'none', fontSize: '1rem',
  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', transition: '0.3s'
};

const cardStyles = {
  background: 'white', borderRadius: '25px', overflow: 'hidden', 
  position: 'relative', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column'
};

const imageWrapperStyles = {
  height: '220px', background: '#f8fafc', display: 'flex', 
  alignItems: 'center', justifyContent: 'center', padding: '20px'
};

const imgStyles = {
  maxWidth: '90%', maxHeight: '90%', objectFit: 'contain', transition: '0.5s transform ease'
};

const badgeStyles = {
  background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', 
  padding: '5px 12px', borderRadius: '20px', fontSize: '0.75rem', 
  fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px'
};

const heartBtnStyles = {
  background: 'white', border: 'none', borderRadius: '50%', 
  width: '36px', height: '36px', display: 'flex', alignItems: 'center', 
  justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
};

const cartBtnStyles = {
  background: '#0f172a', color: 'white', border: 'none', 
  padding: '10px 18px', borderRadius: '12px', cursor: 'pointer', 
  display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', transition: '0.3s'
};

export default Home;