import React from 'react';
import { useFavorites } from '../context/FavoritesContext';

const FavoritesPage = () => {
  const { favorites, removeFavorite, removeAllFavorites } = useFavorites();
// ✅ Step 1: Calculate total nutrition from all favorite fruits
const totalNutrition = favorites.reduce((totals, fruit) => {
  const nutritions = JSON.parse(fruit.nutritions);
  for (const [key, value] of Object.entries(nutritions)) {
    totals[key] = (totals[key] || 0) + Number(value);
  }
  return totals;
}, {});
const overallTotal = Object.values(totalNutrition).reduce(
    (sum, value) => sum + value,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-orange-500 text-center mb-6"> My Favorite Fruits</h2>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">No favorites yet.</p>
      ) : (
        <>
        <div className="flex justify-center mb-6">
        <button
            onClick={removeAllFavorites}
            className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600 transition"
        >
            Remove All
        </button>
        </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((fruit, index) => (
              <div key={index} className="border rounded-lg shadow p-4 flex flex-col items-center">
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
                    <li className="mt-2 font-bold text-700">
                      Total of All Nutrition Values: {overallTotal.toFixed(2)}
                     </li>
                  </ul>
                </div>
                <button
                  onClick={() => removeFavorite(fruit.id)}
                    className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FavoritesPage;
