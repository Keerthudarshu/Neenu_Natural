import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../AppIcon";

import Input from "./Input";
import AnnouncementBar from "./AnnouncementBar";
import MegaMenu from "./MegaMenu";
import CartDrawer from "./CartDrawer";

const Header = ({ cartItemCount = 0, isLoggedIn = false, onSearch, cartItems = [] }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAnnouncementBar, setShowAnnouncementBar] = useState(true);

  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim() && onSearch) {
      onSearch(searchQuery);
    }
  };

  const navigationItems = [
    {
      label: "Shop",
      path: "/product-collection-grid",
      hasDropdown: true,
      onClick: () => setIsMegaMenuOpen(!isMegaMenuOpen),
    },
    { label: "Account", path: "/user-account-dashboard" },
  ];

  return (
    <>
      {/* Top Orange Promo Bar */}
      <div
        className="w-full bg-[#FFC13B] text-[#222] flex items-center px-8 py-2 text-base font-semibold overflow-hidden"
        style={{ height: "30px" }}
      >
        <PromoCarousel />
      </div>

      {/* Announcement Bar - Top Green Layer */}
      <div className="w-full bg-[#0c422e] text-white text-center py-2 font-semibold">
        Shop our Bestsellers at special prices
      </div>

      {/* Middle White Layer - Main Header */}
      <header className="sticky top-0 z-[1001] shadow-warm">
        <div className="w-full bg-white" style={{height: '100px'}}>
          <div className="flex items-center justify-between px-8" style={{height: '100px'}}>
            {/* Logo */}
            <Link to="/homepage" className="flex items-center space-x-2">
              <img
                src="/public/assets/images/logo.png"
                alt="Neenu's Natural"
                className="h-12 w-auto"
              />
            </Link>

            {/* Center Search Bar */}
            <div className="flex-1 flex justify-center">
              <form
                onSubmit={handleSearch}
                className="flex items-center bg-white border border-gray-300 rounded px-4 py-2 w-[600px]"
              >
                <select className="bg-transparent text-[#114C3A] font-semibold px-2 py-1 border-none outline-none">
                  <option>All Categories</option>
                  <option>Unpolished pulses,Dals & Rice</option>
                  <option>Poha/Aval</option>
                  <option>Sugars & Honey</option>
                  <option>Haircare Products</option>
                  <option>Skincare Products</option>
                  <option>Powders</option>
                  <option>Fries</option>
                  <option>Herbal Handmade Soaps</option>
                   <option>Snacks</option>
                  <option>Herbal Products</option>
                  <option>Herbal Powders</option>
                </select>
                <span className="mx-2 text-gray-300">|</span>
                <input
                  type="search"
                  placeholder="Search for products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="flex-1 px-2 py-1 text-[#114C3A] bg-transparent outline-none border-none"
                />
                <button type="submit" className="ml-2 text-[#114C3A]">
                  <Icon name="Search" size={24} />
                </button>
              </form>
            </div>

            {/* Right Icons: User, Wishlist, Cart */}
            <div className="flex items-center space-x-6">
              <Link to="/user-account-dashboard" aria-label="User account">
                <Icon name="User" size={28} />
              </Link>
              <Link to="/wishlist" aria-label="Wishlist" className="relative">
                <Icon name="Heart" size={28} />
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Link>
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                aria-label="Shopping cart"
                className="relative"
              >
                <Icon name="ShoppingCart" size={28} />
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount > 99 ? "99+" : cartItemCount}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Green Layer - Navigation Bar */}
        <div className="w-full bg-[#0c422e] py-3 px-8 flex items-center">
          <button className="mr-4 text-white text-2xl">
            <Icon name="Menu" size={28} />
          </button>
          <span className="text-white text-lg font-semibold tracking-wide">
            SHOP BY CATEGORY
          </span>
        </div>

        {/* Mega Menu */}
        <MegaMenu
          isOpen={isMegaMenuOpen}
          onClose={() => setIsMegaMenuOpen(false)}
        />
      </header>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={(id, quantity) => {
          console.log("Update quantity:", id, quantity);
        }}
        onRemoveItem={(id) => {
          console.log("Remove item:", id);
        }}
      />
    </>
  );
};

export default Header;

// -----------------
// Promo Carousel Component
// -----------------
function PromoCarousel() {
  const messages = [
    "Free Shipping from Rs. 499 (Bangalore), Rs. 999 (Elsewhere)",
    '10% off on orders above Rs. 1499 with "FLAT10"',
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [messages.length]);

  return (
    <div className="w-full flex items-center justify-center">
      <span
        key={index}
        className="transition-all duration-700 ease-in-out transform"
        style={{
          opacity: 1,
          minWidth: "100%",
          textAlign: "center",
          willChange: "transform",
        }}
      >
        {messages[index]}
      </span>
    </div>
  );
}
