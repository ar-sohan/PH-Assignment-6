import React, { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiShoppingCart, FiCheck, FiUser, FiBox, FiTarget, FiTrash2 } from 'react-icons/fi';
import { FaTwitter, FaDiscord, FaGithub } from 'react-icons/fa';
import productData from './data.json';

export default function App() {
  const [activeTab, setActiveTab] = useState('products');
  const [cart, setCart] = useState([]);
  const productsSectionRef = useRef(null);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    toast.success(`${product.name} added to cart!`, { position: "bottom-right", autoClose: 2000 });
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
    toast.info('Item removed from cart', { position: "bottom-right", autoClose: 2000 });
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCart([]);
    toast.success('Checkout successful! Cart cleared.', { position: "top-center" });
    setActiveTab('products');
  };

  const navigateToCart = () => {
    setActiveTab('cart');
    productsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  const getTagColor = (tagType) => {
    switch (tagType?.toLowerCase()) {
      case 'warning': return 'bg-yellow-100 text-yellow-800'; 
      case 'primary': return 'bg-purple-100 text-purple-800'; 
      case 'accent': return 'bg-green-100 text-green-800'; 
      default: return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-purple-200 selection:text-purple-900">
      <ToastContainer />

      {/* --- NAVBAR --- */}
      <nav className="container mx-auto px-4 py-6 flex items-center justify-between bg-white">
        <div className="flex-1">
          <a className="text-3xl font-extrabold bg-gradient-to-r from-[#4F39F6] to-[#9514FA] bg-clip-text text-transparent cursor-pointer">
            DigiTools
          </a>
        </div>
        <div className="hidden md:flex gap-8 font-medium text-gray-600">
          <a href="#" className="hover:text-[#4F39F6] transition-colors">Products</a>
          <a href="#" className="hover:text-[#4F39F6] transition-colors">Features</a>
          <a href="#" className="hover:text-[#4F39F6] transition-colors">Pricing</a>
          <a href="#" className="hover:text-[#4F39F6] transition-colors">Testimonials</a>
          <a href="#" className="hover:text-[#4F39F6] transition-colors">FAQ</a>
        </div>
        <div className="flex-1 flex justify-end items-center gap-4">
          <button className="hidden sm:block font-medium text-gray-600 hover:text-[#4F39F6]">Log In</button>
          <button className="bg-gradient-to-r from-[#4F39F6] to-[#9514FA] hover:opacity-90 text-white font-medium rounded-full px-6 py-2.5 transition-opacity">
            Get Started
          </button>
          <button onClick={navigateToCart} className="btn btn-ghost btn-circle relative ml-2">
            <FiShoppingCart className="h-6 w-6 text-gray-700" />
            {cart.length > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 bg-gradient-to-r from-[#4F39F6] to-[#9514FA] text-white text-xs font-bold rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-12 bg-white">
        <div className="w-full md:w-1/2 flex flex-col items-start text-left">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#F3F0FF] text-[#4F39F6] font-semibold text-xs uppercase tracking-wide mb-6 border border-purple-100">
            New Features Available 2024
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
            Supercharge Your <br />
            Digital Workflow
          </h1>
          <p className="text-lg text-gray-500 mb-8 max-w-lg leading-relaxed">
            Access premium digital assets, design templates, software tools, and resources to bring your ideas to life quickly and efficiently.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-gradient-to-r from-[#4F39F6] to-[#9514FA] hover:opacity-90 text-white font-bold rounded-full px-8 py-3.5 shadow-lg shadow-purple-500/30 transition-opacity">
              Explore Products
            </button>
            <button className="bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300 font-bold rounded-full px-8 py-3.5 transition-all">
              Watch Demo
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-end relative mt-8 md:mt-0">
          {/* Linked to the image in your public folder */}
          <img 
            src="/photo.png" 
            alt="Workflow" 
            className="w-full max-w-md lg:max-w-lg rounded-2xl shadow-2xl object-cover relative z-10"
          />
        </div>
      </header>

      {/* --- STATS SECTION --- */}
      <section className="bg-gradient-to-r from-[#4F39F6] to-[#9514FA] text-white py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-16 md:gap-32 text-center divide-y md:divide-y-0 md:divide-x divide-purple-300/50">
          <div className="px-8">
            <div className="text-5xl font-bold mb-2">50K+</div>
            <div className="text-purple-200 font-medium">Active Users</div>
          </div>
          <div className="px-8 pt-8 md:pt-0">
            <div className="text-5xl font-bold mb-2">200+</div>
            <div className="text-purple-200 font-medium">Premium Tools</div>
          </div>
          <div className="px-8 pt-8 md:pt-0">
            <div className="text-5xl font-bold mb-2">4.9</div>
            <div className="text-purple-200 font-medium">Rating</div>
          </div>
        </div>
      </section>

      {/* --- MAIN PRODUCTS/CART SECTION --- */}
      <section ref={productsSectionRef} className="py-24 px-4 container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Premium Digital Tools</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-10">
            Discover our curated collection of premium digital tools designed to elevate your workflow and productivity.
          </p>
          
          <div className="inline-flex bg-gray-100 p-1.5 rounded-full">
            <button 
              className={`px-8 py-2.5 rounded-full font-bold text-sm transition-all ${activeTab === 'products' ? 'bg-gradient-to-r from-[#4F39F6] to-[#9514FA] text-white shadow-md' : 'text-gray-500 hover:text-gray-800'}`}
              onClick={() => setActiveTab('products')}
            >
              Products
            </button>
            <button 
              className={`px-8 py-2.5 rounded-full font-bold text-sm transition-all ${activeTab === 'cart' ? 'bg-gradient-to-r from-[#4F39F6] to-[#9514FA] text-white shadow-md' : 'text-gray-500 hover:text-gray-800'}`}
              onClick={() => setActiveTab('cart')}
            >
              Cart ({cart.length})
            </button>
          </div>
        </div>

        {activeTab === 'products' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productData.map(product => {
              const isAdded = cart.some(item => item.id === product.id);
              return (
                <div key={product.id} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                      {product.icon.startsWith('http') ? (
                        <img src={product.icon} alt="" className="w-6 h-6 object-contain" />
                      ) : (
                        <span className="text-xl">{product.icon}</span>
                      )}
                    </div>
                    {product.tag && (
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md ${getTagColor(product.tagType)}`}>
                        {product.tag}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-grow">{product.description}</p>
                  
                  <div className="mb-6 flex items-baseline">
                    <span className="text-3xl font-extrabold text-gray-900">${product.price}</span>
                    <span className="text-gray-400 font-medium ml-1 text-sm">/{product.period}</span>
                  </div>
                  
                  <ul className="mb-8 space-y-3">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-xs text-gray-600 font-medium">
                        <FiCheck className="text-green-500 mr-2 flex-shrink-0" size={16} /> 
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    onClick={() => handleAddToCart(product)}
                    disabled={isAdded}
                    className={`w-full py-3 rounded-full font-bold text-sm transition-all ${
                      isAdded 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gradient-to-r from-[#4F39F6] to-[#9514FA] hover:opacity-90 text-white'
                    }`}
                  >
                    {isAdded ? 'Added to Cart' : 'Buy Now'}
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto bg-white shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] rounded-2xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Your Cart</h3>
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Your cart is currently empty.</p>
                <button onClick={() => setActiveTab('products')} className="mt-4 text-[#4F39F6] font-bold hover:underline">
                  Browse products
                </button>
              </div>
            ) : (
              <div>
                <div className="space-y-4 mb-8">
                  {cart.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-purple-200 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                            {item.icon.startsWith('http') ? <img src={item.icon} alt="" className="w-5 h-5 object-contain" /> : <span className="text-lg">{item.icon}</span>}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-gray-900">{item.name}</h4>
                          <span className="text-xs text-gray-500">${item.price} /{item.period}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="font-bold text-lg text-gray-900">${item.price}</span>
                        <button 
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                          title="Remove item"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-100 pt-6 mb-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-bold text-gray-600">Total</span>
                    <span className="text-2xl font-extrabold text-gray-900">${cartTotal}</span>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-[#4F39F6] to-[#9514FA] hover:opacity-90 text-white font-bold py-3.5 rounded-full transition-opacity"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* --- STEPS SECTION --- */}
      <section className="bg-white py-24 border-t border-gray-50">
        <div className="container mx-auto px-4 text-center max-w-5xl">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-16">Get Started In 3 Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px border-t border-dashed border-gray-300 z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-[#F3F0FF] rounded-full flex items-center justify-center mb-6 border border-purple-100">
                <FiUser className="w-8 h-8 text-[#4F39F6]" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Create Account</h3>
              <p className="text-gray-500 text-sm px-4">Sign up in seconds and access your personalized dashboard.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-[#F3F0FF] rounded-full flex items-center justify-center mb-6 border border-purple-100">
                <FiBox className="w-8 h-8 text-[#4F39F6]" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Choose Products</h3>
              <p className="text-gray-500 text-sm px-4">Browse our extensive library and add tools to your cart.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-[#F3F0FF] rounded-full flex items-center justify-center mb-6 border border-purple-100">
                <FiTarget className="w-8 h-8 text-[#4F39F6]" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Start Creating</h3>
              <p className="text-gray-500 text-sm px-4">Download your assets instantly and start building faster.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section className="py-24 px-4 bg-[#FAFAFA] border-t border-gray-100">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-500">Choose the plan that best fits your workflow.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Starter */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Starter</h3>
              <p className="text-gray-500 text-sm mb-6">Perfect for side projects.</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-gray-900">$0</span>
                <span className="text-gray-400 font-medium text-sm">/month</span>
              </div>
              <button className="w-full py-3 rounded-full border-2 border-[#4F39F6] text-[#4F39F6] font-bold hover:bg-gradient-to-r hover:from-[#4F39F6] hover:to-[#9514FA] hover:text-white hover:border-transparent transition-all mb-8 text-sm">
                Get Started Free
              </button>
              <ul className="space-y-4">
                <li className="flex items-center text-sm text-gray-600"><FiCheck className="text-[#4F39F6] mr-3" /> Basic tools access</li>
                <li className="flex items-center text-sm text-gray-600"><FiCheck className="text-[#4F39F6] mr-3" /> Community support</li>
              </ul>
            </div>

            {/* Pro */}
            <div className="bg-gradient-to-br from-[#4F39F6] to-[#9514FA] rounded-2xl p-8 text-white relative shadow-2xl transform md:-translate-y-4">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#FFD166] text-[#6B46C1] font-bold text-[10px] uppercase px-4 py-1 rounded-full whitespace-nowrap">
                Most Popular
              </div>
              <h3 className="text-xl font-bold mb-1">Pro</h3>
              <p className="text-purple-200 text-sm mb-6">For professionals & creators.</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold">$29</span>
                <span className="text-purple-300 font-medium text-sm">/month</span>
              </div>
              <button className="w-full py-3 rounded-full bg-white text-[#4F39F6] font-bold hover:bg-gray-50 transition-colors mb-8 text-sm shadow-md">
                Start Free Trial
              </button>
              <ul className="space-y-4">
                <li className="flex items-center text-sm text-white"><FiCheck className="text-white mr-3" /> All premium tools</li>
                <li className="flex items-center text-sm text-white"><FiCheck className="text-white mr-3" /> Priority support</li>
                <li className="flex items-center text-sm text-white"><FiCheck className="text-white mr-3" /> Commercial license</li>
              </ul>
            </div>

            {/* Enterprise */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Enterprise</h3>
              <p className="text-gray-500 text-sm mb-6">For teams and businesses.</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-gray-900">$99</span>
                <span className="text-gray-400 font-medium text-sm">/month</span>
              </div>
              <button className="w-full py-3 rounded-full border-2 border-[#4F39F6] text-[#4F39F6] font-bold hover:bg-gradient-to-r hover:from-[#4F39F6] hover:to-[#9514FA] hover:text-white hover:border-transparent transition-all mb-8 text-sm">
                Contact Sales
              </button>
              <ul className="space-y-4">
                <li className="flex items-center text-sm text-gray-600"><FiCheck className="text-[#4F39F6] mr-3" /> Custom API limits</li>
                <li className="flex items-center text-sm text-gray-600"><FiCheck className="text-[#4F39F6] mr-3" /> Dedicated manager</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="bg-gradient-to-r from-[#4F39F6] to-[#9514FA] py-20 text-center px-4">
        <h2 className="text-3xl font-extrabold text-white mb-4">Ready To Transform Your Workflow?</h2>
        <p className="text-purple-200 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
          Join thousands of creators and professionals using DigiTools to work smarter and faster every day.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-[#4F39F6] hover:bg-gray-100 rounded-full px-8 py-3 font-bold text-sm shadow-lg">
              Explore Products
            </button>
            <button className="border border-white text-white hover:bg-white hover:text-[#4F39F6] rounded-full px-8 py-3 font-bold text-sm transition-colors">
              View Pricing
            </button>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#111827] text-gray-400 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            <div className="lg:col-span-2">
              <a className="text-2xl font-bold text-white mb-4 block">DigiTools</a>
              <p className="text-xs leading-relaxed mb-6 max-w-xs text-gray-500">
                Premium digital assets, tools, and templates for modern professionals and creators. Supercharge your workflow today.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-[#4F39F6] hover:to-[#9514FA] transition-all"><FaTwitter size={14} /></a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-[#4F39F6] hover:to-[#9514FA] transition-all"><FaDiscord size={14} /></a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-[#4F39F6] hover:to-[#9514FA] transition-all"><FaGithub size={14} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4 text-sm">Product</h4>
              <ul className="space-y-3 text-xs">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4 text-sm">Company</h4>
              <ul className="space-y-3 text-xs">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4 text-sm">Resources</h4>
              <ul className="space-y-3 text-xs">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs">
            <p>&copy; 2024 DigiTools. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}