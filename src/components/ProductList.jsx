import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

const plantsData = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Spider Plant', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chlorophytum_comosum_-_variegated.jpg/800px-Chlorophytum_comosum_-_variegated.jpg', description: 'Easy-care plant that removes toxins from air.', cost: '$12' },
      { name: 'Peace Lily', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Spathiphyllum_cochlearispathum_RTBG.jpg/800px-Spathiphyllum_cochlearispathum_RTBG.jpg', description: 'Elegant white flowers, great for low light.', cost: '$18' },
      { name: 'Snake Plant', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Snake_Plant_%28Sansevieria_trifasciata_%27Laurentii%27%29.jpg/800px-Snake_Plant_%28Sansevieria_trifasciata_%27Laurentii%27%29.jpg', description: 'Nearly indestructible, perfect for beginners.', cost: '$15' },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Bee-lavender.jpg/800px-Bee-lavender.jpg', description: 'Calming fragrance, great for bedrooms.', cost: '$20' },
      { name: 'Jasmine', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Jasminum_officinale1.jpg/800px-Jasminum_officinale1.jpg', description: 'Sweet-smelling climber, perfect for patios.', cost: '$22' },
      { name: 'Rosemary', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Rosemary_bush.jpg/800px-Rosemary_bush.jpg', description: 'Fragrant herb, great for cooking too.', cost: '$14' },
    ],
  },
  {
    category: 'Succulents & Cacti',
    plants: [
      { name: 'Aloe Vera', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Aloe_vera_flower_inset.png/800px-Aloe_vera_flower_inset.png', description: 'Medicinal plant, soothing gel for skin.', cost: '$10' },
      { name: 'Echeveria', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Echeveria_-_garden.jpg/800px-Echeveria_-_garden.jpg', description: 'Beautiful rosette-shaped succulent.', cost: '$8' },
      { name: 'Barrel Cactus', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Ferocactus_cylindraceus_in_Joshua_Tree.jpg/800px-Ferocactus_cylindraceus_in_Joshua_Tree.jpg', description: 'Drought-tolerant, striking sculptural shape.', cost: '$16' },
    ],
  },
];

function ProductList({ onCartClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isInCart = (name) => cartItems.some((item) => item.name === name);
  const handleAddToCart = (plant) => { dispatch(addItem(plant)); };

  return (
    <div className="product-list-page">
      <nav className="navbar">
        <h2>🌿 Paradise Nursery</h2>
        <div className="navbar-right">
          <button className="cart-btn" onClick={onCartClick}>🛒 Cart ({totalCartItems})</button>
        </div>
      </nav>
      <div className="product-list-header">
        <h2>Our Plants</h2>
        <p>Hand-picked selection of healthy, beautiful plants for every space</p>
      </div>
      {plantsData.map((section) => (
        <div className="product-category" key={section.category}>
          <h3>{section.category}</h3>
          <div className="products-grid">
            {section.plants.map((plant) => (
              <div className="product-card" key={plant.name}>
                <img src={plant.image} alt={plant.name} />
                <div className="product-card-body">
                  <h4>{plant.name}</h4>
                  <p>{plant.description}</p>
                  <div className="product-price">{plant.cost}</div>
                  <button className="add-to-cart-btn" onClick={() => handleAddToCart(plant)} disabled={isInCart(plant.name)}>
                    {isInCart(plant.name) ? '✓ Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
