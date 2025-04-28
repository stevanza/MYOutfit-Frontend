'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                MyOutfit
              </span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/" current={pathname === "/"}>
              Home
            </NavLink>
            <NavLink href="/upload" current={pathname === "/upload"}>
              Upload
            </NavLink>
            <NavLink href="/wardrobe" current={pathname === "/wardrobe"}>
              Wardrobe
            </NavLink>
            <NavLink href="/mix-match" current={pathname === "/mix-match"}>
              Mix & Match
            </NavLink>
            <NavLink href="/recommend" current={pathname === "/recommend"}>
              Recommend
            </NavLink>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <MobileNavLink href="/" current={pathname === "/"} onClick={toggleMenu}>
            Home
          </MobileNavLink>
          <MobileNavLink href="/upload" current={pathname === "/upload"} onClick={toggleMenu}>
            Upload
          </MobileNavLink>
          <MobileNavLink href="/wardrobe" current={pathname === "/wardrobe"} onClick={toggleMenu}>
            Wardrobe
          </MobileNavLink>
          <MobileNavLink href="/mix-match" current={pathname === "/mix-match"} onClick={toggleMenu}>
            Mix & Match
          </MobileNavLink>
          <MobileNavLink href="/recommend" current={pathname === "/recommend"} onClick={toggleMenu}>
            Recommend
          </MobileNavLink>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, current, children }) => {
  return (
    <Link
      href={href}
      className={`${
        current
          ? 'text-indigo-600 border-indigo-600'
          : 'text-gray-500 border-transparent hover:text-indigo-500 hover:border-indigo-400'
      } px-3 py-2 rounded-md font-medium border-b-2 transition-colors`}
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({ href, current, children, onClick }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${
        current
          ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
          : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-indigo-600'
      } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors`}
    >
      {children}
    </Link>
  );
};

export default Navbar;