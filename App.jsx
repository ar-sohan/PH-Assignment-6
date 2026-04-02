import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import productData from './data.json';

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


const Navbar = ({ cartCount }) => (
  <div className="navbar bg-base-100 shadow-sm px-8 py-4">
    <div className="flex-1">
      <a className="text-2xl font-bold text-primary">DigiTools</a>
    </div>
    <div className="flex-none gap-6 hidden md:flex">
      <ul className="menu menu-horizontal px-1 font-medium">
        <li><a>Products</a></li>
        <li><a>Features</a></li>
        <li><a>Testimonials</a></li>
        <li><a>FAQ</a></li>
      </ul>
    </div>
    <div className="flex-none gap-4">
      <button className="btn btn-ghost btn-circle">
        <div className="indicator">
          <FiShoppingCart className="h-6 w-6" />
          <span className="badge badge-sm badge-primary indicator-item">{cartCount}</span>
        </div>
      </button>
      <button className="btn btn-primary rounded-full px-6">Get Started</button>
    </div>
  </div>
);

const Hero = () => (
  <div className="hero min-h-[60vh] bg-base-100 mt-10">
    <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-6xl justify-between">
      <img src="image.png" className="max-w-md rounded-lg shadow-2xl" alt="Workflow" />
      <div className="max-w-xl">
        <div className="badge badge-primary badge-outline mb-4 p-3">✨ New & Updated Tools 2024</div>
        <h1 className="text-5xl font-extrabold leading-tight">Supercharge Your <br/> Digital Workflow</h1>
        <p className="py-6 text-gray-500 text-lg">
          Access premium templates, design assets, automation workflows, and AI tools in one place. Streamline your digital business today.
        </p>
        <div className="flex gap-4">
          <button className="btn btn-primary rounded-full px-8">Explore Products</button>
          <button className="btn btn-outline btn-primary rounded-full px-8">See Pricing</button>
        </div>
      </div>
    </div>
  </div>
);

const Stats = () => (
  <div className="bg-[#8A2BE2] text-white py-12 my-12">
    <div className="flex justify-center gap-24 text-center max-w-5xl mx-auto">
      <div>
        <div className="text-5xl font-bold mb-2">50K+</div>
        <div className="text-sm uppercase tracking-wider opacity-80">Active Users</div>
      </div>
      <div>
        <div className="text-5xl font-bold mb-2">200+</div>
        <div className="text-sm uppercase tracking-wider opacity-80">Premium Tools</div>
      </div>
      <div>
        <div className="text-5xl font-bold mb-2">4.9</div>
        <div className="text-sm uppercase tracking-wider opacity-80">Rating</div>
      </div>
    </div>
  </div>
);

const ProductCard = ({ product, onAdd, cartItems }) => {
  const isAdded = cartItems.some(item => item.id === product.id);
  
  return (
    <div className="card bg-base-100 shadow-xl border border-base-200">
      <div className="card-body">
        <div className="flex justify-between items-start mb-2">
          <img src={product.icon} alt={product.name} className="w-12 h-12 rounded bg-base-200 p-2" />
          {product.tag && (
            <div className={`badge badge-${product.tagType} badge-sm`}>{product.tag}</div>
          )}
        </div>
        <h2 className="card-title text-xl mt-2">{product.name}</h2>
        <p className="text-gray-500 text-sm h-12">{product.description}</p>
        <div className="my-4">
          <span className="text-3xl font-bold">${product.price}</span>
          <span className="text-gray-400 text-sm ml-1">/{product.period}</span>
        </div>
        <ul className="mb-6 space-y-2 h-24">
          {product.features.map((feature, idx) => (
            <li key={idx} className="flex items-center text-sm text-gray-600">
              <span className="text-green-500 mr-2">✓</span> {feature}
            </li>
          ))}
        </ul>
        <div className="card-actions justify-end mt-auto">
          <button 
            className={`btn w-full rounded-full ${isAdded ? 'btn-success text-white' : 'btn-primary'}`}
            onClick={() => onAdd(product)}
            disabled={isAdded}
          >
            {isAdded ? 'Added to Cart' : 'Buy Now'}
          </button>
        </div>
      </div>
    </div>
  );
};


export default function App() {
  const [activeTab, setActiveTab] = useState('products');
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    toast.success(`${product.name} added to cart!`);
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
    toast.error('Item removed from cart.');
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.info('Your cart is empty!');
      return;
    }
    setCart([]);
    toast.success('Checkout successful! Cart cleared.');
  };

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="min-h-screen bg-white text-base-content font-sans">
      <ToastContainer position="bottom-right" autoClose={3000} />
      
      <Navbar cartCount={cart.length} />
      <Hero />
      <Stats />

      {/* Main Section Toggling */}
      <section className="py-16 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Premium Digital Tools</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-8">
            Discover our curated collection of high-quality digital assets and tools designed to boost your productivity.
          </p>
          <div className="join bg-base-200 p-1 rounded-full">
            <button 
              className={`join-item btn rounded-full px-8 ${activeTab === 'products' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setActiveTab('products')}
            >
              Products
            </button>
            <button 
              className={`join-item btn rounded-full px-8 ${activeTab === 'cart' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setActiveTab('cart')}
            >
              Cart ({cart.length})
            </button>
          </div>
        </div>

        {       }
        {activeTab === 'products' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productData.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAdd={handleAddToCart} 
                cartItems={cart} 
              />
            ))}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto bg-base-100 shadow-xl rounded-2xl p-8 border border-base-200">
            <h3 className="text-2xl font-bold mb-6">Your Cart</h3>
            {cart.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <FiShoppingCart className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>Your cart is empty. Switch to Products to add items.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-base-200 rounded-xl">
                    <div className="flex items-center gap-4">
                      <img src={item.icon} alt={item.name} className="w-10 h-10 bg-white p-1 rounded" />
                      <div>
                        <h4 className="font-bold">{item.name}</h4>
                        <span className="text-sm text-gray-500">${item.price}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="text-error hover:bg-error/10 p-2 rounded-full transition-colors"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                ))}
                <div className="divider"></div>
                <div className="flex justify-between items-center font-bold text-xl mb-6">
                  <span>Total</span>
                  <span>${cartTotal}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="btn btn-primary w-full rounded-full"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {}
      <footer className="footer p-10 bg-neutral text-neutral-content mt-24">
        <aside>
          <img src="image.png" alt="Logo" className="w-12 h-12 mb-2" />
          <p>DigiTools Industries Ltd.<br/>Providing reliable tech since 2024</p>
        </aside> 
        <nav>
          <h6 className="footer-title">Products</h6> 
          <a className="link link-hover">Templates</a>
          <a className="link link-hover">Automation</a>
        </nav> 
        <nav>
          <h6 className="footer-title">Company</h6> 
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
        </nav> 
      </footer>
    </div>
  );
}