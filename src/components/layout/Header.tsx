import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../theme/ThemeToggle';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const NavLinks = () => (
    <>
      <Link
        to="/"
        className={`px-3 py-2 rounded-md text-sm font-medium ${
          location.pathname === '/'
            ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        Home
      </Link>
      <Link
        to="/favorites"
        className={`px-3 py-2 rounded-md text-sm font-medium ${
          location.pathname === '/favorites'
            ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        Favorites
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              Financial Exchanges
            </h1>
            <nav className="hidden md:flex space-x-4">
              <NavLinks />
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-2 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-2">
              <NavLinks />
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};