import React, { useState, useEffect } from 'react';
import { 
  Utensils, BedDouble, Calendar, MapPin, Phone, Menu as MenuIcon, X, ChefHat, 
  Coffee, Star, Wifi, Tv, Wind, CheckCircle, ShoppingBag, ArrowRight, 
  Instagram, Facebook, Twitter, Loader, Server 
} from 'lucide-react';

// --- CLOUD CONFIGURATION ---

// I added your Render URL here automatically:
const BACKEND_URL = 'https://bandekar-backend.onrender.com'; 

const API_BASE_URL = `${BACKEND_URL}/api`;

// --- Mock Data Fallback ---
const MENU_ITEMS = [
  { id: 1, category: 'Starters', name: 'Truffle Arancini', price: 12, description: 'Crispy risotto balls with black truffle and mozzarella.', image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80' },
  { id: 2, category: 'Starters', name: 'Burrata Salad', price: 16, description: 'Fresh burrata, heirloom tomatoes, basil pesto, balsamic glaze.', image: 'https://images.unsplash.com/photo-1529312266912-b33cf6227e2f?auto=format&fit=crop&w=800&q=80' },
  { id: 3, category: 'Mains', name: 'Pan-Seared Salmon', price: 28, description: 'Sustainable salmon, lemon butter sauce, asparagus.', image: 'https://images.unsplash.com/photo-1467003909585-2f8a7270028d?auto=format&fit=crop&w=800&q=80' },
  { id: 4, category: 'Mains', name: 'Wagyu Beef Burger', price: 24, description: 'Brioche bun, aged cheddar, caramelized onions, truffle fries.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80' },
  { id: 5, category: 'Mains', name: 'Wild Mushroom Risotto', price: 22, description: 'Arborio rice, porcini mushrooms, parmesan crisp.', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&q=80' },
  { id: 6, category: 'Desserts', name: 'Dark Chocolate Fondant', price: 14, description: 'Molten center, vanilla bean ice cream.', image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80' },
];

const ROOMS = [
  { id: 101, name: 'Deluxe King Room', price: 150, size: '35m²', occupancy: '2 Adults', image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80', amenities: ['King Bed', 'City View', 'Free Wifi', 'Smart TV'] },
  { id: 102, name: 'Executive Suite', price: 280, size: '55m²', occupancy: '3 Adults', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80', amenities: ['King Bed', 'Living Area', 'Balcony', 'Jacuzzi', 'Mini Bar'] },
  { id: 103, name: 'Garden Villa', price: 450, size: '80m²', occupancy: '4 Adults', image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80', amenities: ['2 Bedrooms', 'Private Pool', 'Kitchenette', 'Patio'] },
];

const Navbar = ({ activeTab, setActiveTab, cartCount }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [
    { id: 'home', label: 'Home', icon: <Star size={18} /> },
    { id: 'dining', label: 'Dining', icon: <Utensils size={18} /> },
    { id: 'rooms', label: 'Stay', icon: <BedDouble size={18} /> },
    { id: 'contact', label: 'Contact', icon: <MapPin size={18} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-amber-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center text-white mr-3 shadow-lg"><ChefHat size={24} /></div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">BANDEKAR</h1>
              <p className="text-xs text-amber-600 font-medium tracking-widest uppercase">RESTAURANT AND BAR</p>
            </div>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 ${activeTab === item.id ? 'bg-amber-50 text-amber-700 font-semibold' : 'text-slate-600 hover:text-amber-600'}`}>
                {item.icon}<span>{item.label}</span>
              </button>
            ))}
            <button onClick={() => setActiveTab('cart')} className="relative p-3 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition shadow-md">
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">{cartCount}</span>}
            </button>
          </div>
          <div className="md:hidden flex items-center">
             <button onClick={() => setActiveTab('cart')} className="relative p-2 mr-4 text-slate-800">
              <ShoppingBag size={24} />
              {cartCount > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">{cartCount}</span>}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-800 focus:outline-none">{isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}</button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }} className={`flex items-center w-full px-4 py-4 rounded-lg text-left ${activeTab === item.id ? 'bg-amber-50 text-amber-700 font-semibold' : 'text-slate-600'}`}>
                <span className="mr-3">{item.icon}</span>{item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ onCtaClick }) => (
  <div className="relative flex flex-col md:flex-row h-[calc(100vh-80px)] w-full overflow-hidden bg-slate-900">
    <div className="relative w-full md:w-1/2 h-1/2 md:h-full group cursor-pointer overflow-hidden" onClick={() => onCtaClick('dining')}>
      <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=80" alt="Fine Dining" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 animate-fade-in-up">
        <Utensils size={48} className="text-amber-400 mb-4 drop-shadow-md" />
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2 tracking-tight">The Bistro</h2>
        <p className="text-gray-300 mb-8 max-w-xs font-light">Exquisite flavors, locally sourced ingredients.</p>
        <button onClick={(e) => { e.stopPropagation(); onCtaClick('dining'); }} className="px-8 py-3 border border-white/30 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold group-hover:bg-amber-600 group-hover:border-transparent transition-all duration-300 flex items-center">
          View Menu <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
    <div className="relative w-full md:w-1/2 h-1/2 md:h-full group cursor-pointer overflow-hidden border-t md:border-t-0 md:border-l border-slate-700" onClick={() => onCtaClick('rooms')}>
      <img src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80" alt="Luxury Room" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 animate-fade-in-up delay-100">
        <BedDouble size={48} className="text-amber-400 mb-4 drop-shadow-md" />
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2 tracking-tight">The Rooms</h2>
        <p className="text-gray-300 mb-8 max-w-xs font-light">Unparalleled comfort in the heart of the coast.</p>
        <button onClick={(e) => { e.stopPropagation(); onCtaClick('rooms'); }} className="px-8 py-3 border border-white/30 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold group-hover:bg-amber-600 group-hover:border-transparent transition-all duration-300 flex items-center">
          Book a Stay <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
    <div className="hidden md:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-slate-900 rounded-full items-center justify-center border-4 border-amber-600 shadow-2xl z-10">
      <ChefHat size={32} className="text-white" />
    </div>
  </div>
);

const MenuSection = ({ addToCart }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  
  useEffect(() => {
    fetch(`${API_BASE_URL}/menu`)
      .then(res => { if (!res.ok) throw new Error('Failed'); return res.json(); })
      .then(data => { setMenuItems(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); setMenuItems(MENU_ITEMS); });
  }, []);

  if (loading) return <div className="flex h-96 items-center justify-center"><Loader className="animate-spin text-amber-600" size={48} /></div>;
  
  const categories = ['All', 'Starters', 'Mains', 'Desserts'];
  const filteredItems = activeCategory === 'All' ? menuItems : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="py-16 bg-stone-50 min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">Our Culinary Delights</h2>
          {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg inline-block mb-4"><p className="flex items-center text-sm font-bold"><Server size={16} className="mr-2" /> Offline Mode Enabled</p></div>}
          <p className="text-slate-600 max-w-2xl mx-auto">Handcrafted with locally sourced ingredients.</p>
        </div>
        <div className="flex justify-center space-x-2 md:space-x-4 mb-12 overflow-x-auto pb-4">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-6 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${activeCategory === cat ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-gray-100 border border-gray-200'}`}>{cat}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
              <div className="relative h-64 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-slate-900 font-bold shadow-sm">${item.price}</div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2"><h3 className="text-xl font-bold text-slate-900">{item.name}</h3></div>
                <p className="text-slate-500 text-sm mb-6 line-clamp-2">{item.description}</p>
                <button onClick={() => addToCart(item, 'food')} className="w-full py-3 bg-amber-50 text-amber-700 hover:bg-amber-600 hover:text-white rounded-xl font-semibold transition-colors flex items-center justify-center"><ShoppingBag size={18} className="mr-2" /> Add to Order</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RoomsSection = ({ addToCart }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/rooms`)
      .then(res => { if (!res.ok) throw new Error('Failed'); return res.json(); })
      .then(data => { setRooms(data); setLoading(false); })
      .catch(() => { setLoading(false); setRooms(ROOMS); });
  }, []);

  if (loading) return <div className="flex h-96 items-center justify-center"><Loader className="animate-spin text-amber-600" size={48} /></div>;

  return (
    <div className="py-16 bg-slate-50 min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">Stay in Comfort</h2>
          <p className="text-slate-600">Experience our award-winning hospitality.</p>
        </div>
        <div className="space-y-12">
          {rooms.map((room, index) => (
            <div key={room.id} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow`}>
              <div className="lg:w-1/2 h-72 lg:h-auto relative"><img src={room.image} alt={room.name} className="absolute inset-0 w-full h-full object-cover" /></div>
              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center space-x-2 text-amber-600 font-medium mb-2"><Star size={16} fill="currentColor" /><span className="uppercase tracking-wide text-xs">Luxury Collection</span></div>
                <h3 className="text-3xl font-serif font-bold text-slate-900 mb-4">{room.name}</h3>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {room.amenities && room.amenities.map(amenity => (
                    <div key={amenity} className="flex items-center text-slate-600 text-sm"><CheckCircle size={16} className="text-green-500 mr-2" />{amenity}</div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div><span className="text-3xl font-bold text-slate-900">${room.price}</span><span className="text-slate-500 text-sm"> / night</span></div>
                  <button onClick={() => addToCart(room, 'room')} className="px-8 py-3 bg-slate-900 text-white rounded-full hover:bg-amber-600 transition-colors font-semibold shadow-lg">Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Cart = ({ items, removeFromCart, checkout }) => {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const [formData, setFormData] = useState({ name: '', email: '' });

  return (
    <div className="py-12 bg-white min-h-screen animate-fade-in">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center"><ShoppingBag className="mr-3" /> Your Reservation & Orders</h2>
        {items.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-500">Your cart is empty.</p>
          </div>
        ) : (
          <>
            <div className="space-y-6 mb-8">
              {items.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition">
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 rounded-xl overflow-hidden bg-gray-100"><img src={item.image} alt={item.name} className="h-full w-full object-cover" /></div>
                    <div><div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">{item.type === 'room' ? 'Room Booking' : 'Dining Order'}</div><h3 className="font-bold text-slate-900">{item.name}</h3><p className="text-slate-500 text-sm">${item.price}</p></div>
                  </div>
                  <button onClick={() => removeFromCart(idx)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition"><X size={20} /></button>
                </div>
              ))}
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl">
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200"><span className="text-lg text-slate-600">Total Amount</span><span className="text-3xl font-bold text-slate-900">${total.toFixed(2)}</span></div>
              <form onSubmit={(e) => { e.preventDefault(); checkout(formData.name, formData.email, total); }} className="space-y-4">
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label><input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} /></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label><input type="email" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none" placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} /></div>
                <button type="submit" className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform active:scale-95 flex items-center justify-center">Complete Reservation</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Contact = () => (
  <div className="py-16 bg-stone-900 text-white min-h-screen flex items-center animate-fade-in">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-amber-500">Get in Touch</h2>
          <p className="text-gray-400 text-lg mb-12 leading-relaxed">Whether you're planning a romantic dinner or a week-long getaway, we are here to make your experience unforgettable.</p>
          <div className="space-y-8">
            <div className="flex items-start space-x-6"><div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-amber-500 shrink-0"><MapPin size={24} /></div><div><h3 className="text-xl font-bold mb-2">Location</h3><p className="text-gray-400">123 Seaside Avenue, Coastal District<br/>Goa, India 403001</p></div></div>
            <div className="flex items-start space-x-6"><div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-amber-500 shrink-0"><Phone size={24} /></div><div><h3 className="text-xl font-bold mb-2">Contact</h3><p className="text-gray-400">+91 98765 43210<br/>reservations@bandekar.com</p></div></div>
            <div className="flex items-start space-x-6"><div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-amber-500 shrink-0"><Calendar size={24} /></div><div><h3 className="text-xl font-bold mb-2">Opening Hours</h3><p className="text-gray-400">Restaurant: 11:00 AM - 11:00 PM<br/>Hotel Reception: 24/7</p></div></div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10">
           <div className="w-full h-80 bg-gray-700 rounded-2xl overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=1000&q=80" className="w-full h-full object-cover opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center"><button className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold shadow-lg hover:scale-105 transition">View on Google Maps</button></div>
           </div>
        </div>
      </div>
    </div>
  );
};

const Footer = ({ goToNav }) => (
  <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="col-span-1 md:col-span-2">
           <div className="flex items-center mb-4 text-white"><ChefHat size={24} className="mr-2 text-amber-500" /><span className="text-xl font-bold tracking-tight">BANDEKAR</span></div>
          <p className="text-sm max-w-xs mb-6">Combining the finest flavors with the most comfortable stays. Your luxury escape awaits.</p>
          <div className="flex space-x-4"><a href="#" className="text-white hover:text-amber-500 transition"><Instagram size={20} /></a><a href="#" className="text-white hover:text-amber-500 transition"><Facebook size={20} /></a><a href="#" className="text-white hover:text-amber-500 transition"><Twitter size={20} /></a></div>
        </div>
        <div><h4 className="text-white font-bold mb-4">Quick Links</h4><ul className="space-y-2 text-sm"><li><button onClick={() => goToNav('home')} className="hover:text-amber-500 transition">Home</button></li><li><button onClick={() => goToNav('dining')} className="hover:text-amber-500 transition">Dining Menu</button></li><li><button onClick={() => goToNav('rooms')} className="hover:text-amber-500 transition">Rooms & Suites</button></li><li><button onClick={() => goToNav('contact')} className="hover:text-amber-500 transition">Contact Us</button></li></ul></div>
        <div><h4 className="text-white font-bold mb-4">Legal</h4><ul className="space-y-2 text-sm"><li><a href="#" className="hover:text-amber-500 transition">Privacy Policy</a></li><li><a href="#" className="hover:text-amber-500 transition">Terms of Service</a></li><li><a href="#" className="hover:text-amber-500 transition">Cookie Policy</a></li></ul></div>
      </div>
      <div className="pt-8 border-t border-slate-900 text-center text-xs">&copy; 2025 Bandekar Restaurant and Bar. All rights reserved.</div>
    </div>
  </footer>
);

const ConfirmationModal = ({ isOpen, close }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl transform transition-all scale-100">
        <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle size={32} /></div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h3>
        <p className="text-gray-500 mb-6">Thank you for choosing us. We have sent a confirmation email with your details.</p>
        <button onClick={close} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition">Awesome</button>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const addToCart = (item, type) => { setCart([...cart, { ...item, type }]); };
  const removeFromCart = (indexToRemove) => { setCart(cart.filter((_, index) => index !== indexToRemove)); };
  const handleCheckout = (name, email, total) => {
    fetch(`${API_BASE_URL}/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerName: name, email, items: cart, total })
    })
    .then(res => res.json())
    .then(data => { console.log("Order Success:", data); setCart([]); setShowConfirmation(true); setActiveTab('home'); })
    .catch(err => { console.error("Order Failed:", err); alert("Failed to send order to server."); });
  };

  return (
    <div className="font-sans text-slate-800 bg-white min-h-screen flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} cartCount={cart.length} />
      <main className="flex-grow">
        {activeTab === 'home' && <Hero onCtaClick={setActiveTab} />}
        {activeTab === 'dining' && <MenuSection addToCart={addToCart} />}
        {activeTab === 'rooms' && <RoomsSection addToCart={addToCart} />}
        {activeTab === 'cart' && <Cart items={cart} removeFromCart={removeFromCart} checkout={handleCheckout} />}
        {activeTab === 'contact' && <Contact />}
      </main>
      <Footer goToNav={setActiveTab} />
      <ConfirmationModal isOpen={showConfirmation} close={() => setShowConfirmation(false)} />
    </div>
  );
}