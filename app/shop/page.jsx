"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const products = [
  {
    id: 1,
    name: "Men's Jacket",
    price: 12000,
    rating: 4,
    featured: true,
    image: "/assets/jacket.jpg",
  },
  {
    id: 2,
    name: "Smartwatch",
    price: 85000,
    rating: 5,
    featured: false,
    image: "/assets/smartwatch.jpg",
  },
  {
    id: 3,
    name: "Women's Sneakers",
    price: 18500,
    rating: 5,
    featured: true,
    image: "/assets/sneakers.jpg",
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 20000,
    rating: 4,
    featured: false,
    image: "/assets/speaker.jpg",
  },
  {
    id: 5,
    name: "Leather wallet",
    price: 12000,
    rating: 5,
    featured: true,
    image: "/assets/wallet.jpg",
  },
  {
    id: 6,
    name: "Wireless Mouse",
    price: 7000,
    rating: 3,
    featured: false,
    image: "/assets/mouse.jpg",
  },
  {
    id: 7,
    name: "Sunglasses",
    price: 13000,
    rating: 4,
    featured: false,
    image: "/assets/sunglasses.jpg",
  },
  {
    id: 8,
    name: "Sports Wear",
    price: 17000,
    rating: 4,
    featured: true,
    image: "/assets/yellowcloth.jpg",
  },
  {
    id: 9,
    name: "Sports Shoes",
    price: 25000,
    rating: 5,
    featured: false,
    image: "/assets/sheos.jpg",
  },
  {
    id: 10,
    name: "Gentle-men Watch",
    price: 6500,
    rating: 4,
    featured: false,
    image: "/assets/watch.jpg",
  },
  {
    id: 11,
    name: "Desk Lamp",
    price: 20000,
    rating: 5,
    featured: false,
    image: "/assets/desklamp.jpg",
  },
  {
    id: 13,
    name: "Men's Suit",
    price: 50000,
    rating: 5,
    featured: false,
    image: "/assets/huzaifa2.jpg",
  },
  {
    id: 14,
    name: "Women's Suit",
    price: 80500,
    rating: 5,
    featured: false,
    image: "/assets/aiony.jpg",
  },
  {
    id: 15,
    name: "Fitness Tracker",
    price: 10000,
    rating: 5,
    featured: false,
    image: "/assets/fitnesstracker.jpg",
  },
  {
    id: 16,
    name: "Wireless Headphones",
    price: 18000,
    rating: 5,
    featured: false,
    image: "/assets/headphones.jpg",
  },
  {
    id: 17,
    name: "Smart Thermostat",
    price: 17000,
    rating: 5,
    featured: false,
    image: "/assets/smartthermostart.jpg",
  },
  {
    id: 18,
    name: "White lady's Dress",
    price: 107000,
    rating: 5,
    featured: false,
    image: "/assets/dress.jpg",
  },
];

const ShopSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const { addToCart } = useCart();

  const formatPrice = (price) => {
    return `₦${price.toLocaleString()}`;
  };

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product);
    addToCart(product);
  };

  return (
    <section
      style={{
        padding: "5rem 1rem",
        backgroundColor: "white",
        marginBottom: "5rem",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontSize: "2.5rem",
          margin: "0 auto 3rem",
          color: "#ff69b4",
          fontWeight: "600",
          textAlign: "center",
          width: "100%",
          display: "block",
        }}
      >
        Shop Products
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
          placeItems: "center",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              background: "white",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
              width: "280px",
              textAlign: "center",
              transform:
                hoveredCard === product.id ? "translateY(-5px)" : "none",
              boxShadow:
                hoveredCard === product.id
                  ? "0 10px 25px rgba(0, 0, 0, 0.2)"
                  : "0 4px 20px rgba(0, 0, 0, 0.1)",
            }}
            onMouseEnter={() => setHoveredCard(product.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "300px",
              }}
            >
              {product.featured && (
                <span
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    backgroundColor: "#ff4da6",
                    color: "white",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    zIndex: 2,
                  }}
                >
                  Featured
                </span>
              )}
              <Image
                src={product.image}
                alt={product.name}
                fill
                style={{
                  objectFit: "cover",
                  transform:
                    hoveredCard === product.id ? "scale(1.05)" : "scale(1)",
                  transition: "transform 0.5s ease",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "rgba(255, 255, 255, 0.95)",
                  padding: "1.5rem",
                  transform:
                    hoveredCard === product.id
                      ? "translateY(0)"
                      : "translateY(100%)",
                  transition: "transform 0.3s ease",
                  textAlign: "center",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.2rem",
                    marginBottom: "0.5rem",
                    color: "#333",
                    fontWeight: "600",
                  }}
                >
                  {product.name}
                </h3>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "0.25rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      style={{
                        color: i < product.rating ? "#ffcb47" : "#e0e0e0",
                        fontSize: "1rem",
                      }}
                    />
                  ))}
                </div>

                <p
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: "700",
                    color: "#e83e8c",
                    margin: "0.75rem 0",
                  }}
                >
                  {formatPrice(product.price)}
                </p>

                <button
                  onClick={() => handleAddToCart(product)}
                  style={{
                    background: "#e83e8c",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "6px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    width: "100%",
                    maxWidth: "200px",
                    margin: "0 auto",
                    display: "block",
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopSection;
