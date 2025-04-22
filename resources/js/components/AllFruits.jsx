import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFavorites } from '../context/FavoritesContext';
import '../../css/allproduct.css';

const AllFruits = () => {
  const [fruits, setFruits] = useState([]);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');

  const [filterName, setFilterName] = useState('');
  const [filterFamily, setFilterFamily] = useState('');

  const { favorites, addFavorite } = useFavorites();

  const fetchFruits = async (pageNum = 1, name = '', family = '') => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/fruits`, {
        params: {
          page: pageNum,
          name: name,
          family: family,
        },
      });
      setFruits(res.data.data);
      setMeta(res.data);
    } catch (err) {
      console.error('Failed to fetch fruits', err);
    }
  };

  useEffect(() => {
    fetchFruits(page, filterName, filterFamily);
  }, [page]);

  const handleAddFavorite = (fruit) => {
    if (favorites.find(f => f.id === fruit.id)) {
      alert('Already in favorites!');
      return;
    }
    if (favorites.length >= 10) {
      alert('You can only have 10 favorite fruits.');
      return;
    }
    addFavorite(fruit);
    setSuccessMessage(`${fruit.name} added to favorites!`);
  
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handlePageClick = (pageNum) => {
    setPage(pageNum);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < meta.last_page) setPage(page + 1);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchFruits(1, filterName, filterFamily);
  };

  const handleClearFilters = () => {
    setFilterName('');
    setFilterFamily('');
    setPage(1);
    fetchFruits(1); 
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-orange-500 text-center mb-6">🍎 All Fruits</h2>

      {successMessage && (
        <div className={`toast show`}>
          {successMessage}
        </div>
      )}

      <form onSubmit={handleFilterSubmit} className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-4">
        <input
          type="text"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          placeholder="Filter by name"
          className="px-3 py-2 border rounded w-full sm:w-64"
        />
        <input
          type="text"
          value={filterFamily}
          onChange={(e) => setFilterFamily(e.target.value)}
          placeholder="Filter by family"
          className="px-3 py-2 border rounded w-full sm:w-64"
        />
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">
          Filter
        </button>
        <button type="button" onClick={handleClearFilters} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition">
          Clear
        </button>
      </form>

      {fruits.length === 0 ? (
        <p className="text-center text-gray-500">No fruits found...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {fruits.map((fruit) => (
            <div key={fruit.id} className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition overflow-hidden">
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{fruit.name}</h3>
                <p className="text-sm text-gray-600 mb-1"><strong>Family:</strong> {fruit.family}</p>
                <p className="text-sm text-gray-600 mb-1"><strong>Genus:</strong> {fruit.genus}</p>
                <p className="text-sm text-gray-600"><strong>Order:</strong> {fruit.order}</p>
              </div>

              <div className="px-5 pb-3 text-sm text-gray-600">
                <strong>Nutrition:</strong>
                <ul className="ml-5 list-disc text-xs">
                  {Object.entries(JSON.parse(fruit.nutritions)).map(([key, value]) => (
                    <li key={key}>{key}: {value}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 border-t">
                <button
                  onClick={() => handleAddFavorite(fruit)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm py-2 px-4 rounded transition"
                >
                  {favorites.find(f => f.id === fruit.id) ? (
                    <span>❤️ Added to Favorite</span>
                  ) : (
                    <span>🤍 Add to Favorite</span> 
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {meta.last_page > 1 && (
        <div className="flex justify-center mt-10 space-x-2">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-orange-100 disabled:opacity-50"
          >
            &laquo; Prev
          </button>
          {Array.from({ length: meta.last_page }).map((_, i) => {
            const pageNumber = i + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageClick(pageNumber)}
                className={`px-3 py-1 text-sm rounded border ${
                  page === pageNumber
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-orange-100'
                } transition`}
              >
                {pageNumber}
              </button>
            );
          })}
          <button
            onClick={handleNext}
            disabled={page === meta.last_page}
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-orange-100 disabled:opacity-50"
          >
            Next &raquo;
          </button>
        </div>
      )}
    </div>
  );
};

export default AllFruits;
