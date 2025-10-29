'use strict';

const { PRODUCTS_TABLE } = require('../models/products.models');
const { PRODUCT_CATEGORIES_TABLE } = require('../models/productcategories.model');
const { CATEGORIES_TABLE } = require('../models/categories.model');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(CATEGORIES_TABLE, [
            { category: 'Clothes' },
            { category: 'Electronics' },
            { category: 'Furniture' },
            { category: 'Shoes' },
            { category: 'Accessories' },
            { category: 'Home' },
            { category: 'Sports' },
            { category: 'Books' },
            { category: 'Toys' },
            { category: 'Other' },
        ], {});

        const products = [
            // Clothes
            { product: "Fjallraven - Foldsack No. 1 Backpack", providerid: 1, details: "Your perfect pack for everyday use and walks in the forest.", price: 109.95, rating: 3.9, quantity: 50 },
            { product: "Mens Casual Premium Slim Fit T-Shirts", providerid: 1, details: "Slim-fitting style, contrast raglan long sleeve.", price: 22.3, rating: 4.1, quantity: 100 },
            { product: "Mens Cotton Jacket", providerid: 1, details: "Great outerwear jackets for Spring/Autumn/Winter.", price: 55.99, rating: 4.7, quantity: 60 },

            // Electronics
            { product: "WD 2TB Elements Portable External Hard Drive", providerid: 1, details: "USB 3.0 and USB 2.0 compatible.", price: 64, rating: 3.3, quantity: 40 },
            { product: "SanDisk SSD PLUS 1TB Internal SSD", providerid: 1, details: "Easy upgrade for faster boot up and response.", price: 109, rating: 2.9, quantity: 30 },
            { product: "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor", providerid: 1, details: "Super Ultra Wide Dual WQHD 5120 x 1440.", price: 999.99, rating: 4.5, quantity: 20 },

            // Furniture
            { product: "Ikea LACK Coffee Table", providerid: 1, details: "Simple and modern coffee table.", price: 39.99, rating: 4.2, quantity: 15 },
            { product: "Wooden Dining Chair", providerid: 1, details: "Comfortable and stylish chair for your dining room.", price: 89.99, rating: 4.0, quantity: 25 },

            // Shoes
            { product: "Nike Air Zoom Pegasus", providerid: 1, details: "Running shoes with responsive cushioning.", price: 120, rating: 4.6, quantity: 70 },
            { product: "Adidas Ultraboost 21", providerid: 1, details: "High-performance running shoe with Boost technology.", price: 180, rating: 4.7, quantity: 50 },

            // Accessories
            { product: "John Hardy Women's Legends Naga Bracelet", providerid: 1, details: "Inspired by mythical dragons.", price: 695, rating: 4.6, quantity: 10 },
            { product: "Solid Gold Petite Micropave", providerid: 1, details: "Return or exchange any order within 30 days.", price: 168, rating: 3.9, quantity: 20 },

            // Home
            { product: "Ceramic Vase Set", providerid: 1, details: "Set of 3 decorative ceramic vases.", price: 45.99, rating: 4.3, quantity: 30 },
            { product: "LED Desk Lamp", providerid: 1, details: "Modern lamp with adjustable brightness.", price: 25.99, rating: 4.1, quantity: 40 },

            // Sports
            { product: "Wilson Tennis Racket", providerid: 1, details: "Lightweight and powerful tennis racket.", price: 199.99, rating: 4.5, quantity: 15 },
            { product: "Yoga Mat 6mm", providerid: 1, details: "Non-slip yoga mat for all exercises.", price: 35, rating: 4.2, quantity: 60 },

            // Books
            { product: "The Great Gatsby", providerid: 1, details: "Classic novel by F. Scott Fitzgerald.", price: 10.99, rating: 4.4, quantity: 80 },
            { product: "To Kill a Mockingbird", providerid: 1, details: "Classic novel by Harper Lee.", price: 12.99, rating: 4.8, quantity: 70 },

            // Toys
            { product: "Lego Star Wars Set", providerid: 1, details: "Buildable Star Wars Lego set.", price: 59.99, rating: 4.8, quantity: 25 },
            { product: "Barbie Dreamhouse", providerid: 1, details: "Large dollhouse with furniture.", price: 199.99, rating: 4.7, quantity: 10 },

            // Other
            { product: "Mystery Box", providerid: 1, details: "A surprise box with various items.", price: 49.99, rating: 3.5, quantity: 50 }
        ];

        await queryInterface.bulkInsert(PRODUCTS_TABLE, products, { returning: true });

        const productCategories = [];

        const categoryMapping = {
            "Clothes": 1,
            "Electronics": 2,
            "Furniture": 3,
            "Shoes": 4,
            "Accessories": 5,
            "Home": 6,
            "Sports": 7,
            "Books": 8,
            "Toys": 9,
            "Other": 10
        };

        products.forEach((product, index) => {
            let categoryName;
            if (index <= 2) categoryName = "Clothes";
            else if (index <= 5) categoryName = "Electronics";
            else if (index <= 7) categoryName = "Furniture";
            else if (index <= 9) categoryName = "Shoes";
            else if (index <= 11) categoryName = "Accessories";
            else if (index <= 13) categoryName = "Home";
            else if (index <= 15) categoryName = "Sports";
            else if (index <= 17) categoryName = "Books";
            else if (index <= 19) categoryName = "Toys";
            else categoryName = "Other";

            productCategories.push({
                productid: index + 1,
                categoryid: categoryMapping[categoryName]
            });
        });

        await queryInterface.bulkInsert(PRODUCT_CATEGORIES_TABLE, productCategories, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete(PRODUCT_CATEGORIES_TABLE, null, {});
        await queryInterface.bulkDelete(PRODUCTS_TABLE, null, {});
        await queryInterface.bulkDelete(CATEGORIES_TABLE, null, {});
    }
};
