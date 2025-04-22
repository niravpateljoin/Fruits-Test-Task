import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';  
import logo from '../../assets/logo.png';

const Header = () => {
  const { favorites } = useFavorites();
  const favoritesCount = favorites.length;

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-10 w-10 object-cover rounded-full" />
          <span className="text-xl font-bold text-orange-500">FruitApp</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-gray-600 font-medium">
          <Link to="/" className="hover:text-orange-500">All Fruits</Link>
        </nav>
     
        <div className="relative">
          <Link to="/favorites" className="hover:text-orange-500">
            {favoritesCount > 0 ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                2 5.42 4.42 3 7.5 3c1.74 0 3.41 1.01 4.5 2.09
                C13.09 4.01 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
                c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 0 1 6.364 0L12 7.636
                  l1.318-1.318a4.5 4.5 0 1 1 6.364 6.364L12 20.364
                  l-7.682-7.682a4.5 4.5 0 0 1 0-6.364z" />
              </svg>
            )}
          </Link>
          {favoritesCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {favoritesCount}
            </span>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;
