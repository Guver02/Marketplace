'use strict';

const { PRODUCT_IMAGES_TABLE } = require('../models/productimages.models');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const productImages = [
            // Clothes
            { productid: 1, imageurl: "https://res.cloudinary.com/ds2egvrc7/image/upload/v1754679931/download_acjtgb.jpg" },
            { productid: 2, imageurl: "https://res.cloudinary.com/ds2egvrc7/image/upload/v1754679883/download_bwog8u.jpg" },
            { productid: 3, imageurl: "https://res.cloudinary.com/ds2egvrc7/image/upload/v1754679830/download_b6dkyx.jpg" },

            // Electronics
            { productid: 4, imageurl: "https://res.cloudinary.com/ds2egvrc7/image/upload/v1754679774/download_ddhebe.jpg" },
            { productid: 5, imageurl: "https://res.cloudinary.com/ds2egvrc7/image/upload/v1754679732/download_hrjmxi.jpg" },
            { productid: 6, imageurl: "https://res.cloudinary.com/ds2egvrc7/image/upload/v1754679679/download_bvdctq.jpg" },

            // Furniture
            { productid: 7, imageurl: "https://res.cloudinary.com/ds2egvrc7/image/upload/v1754679640/download_udoskn.jpg" },
            { productid: 8, imageurl: "https://res.cloudinary.com/ds2egvrc7/image/upload/v1754678599/71Ov5KbWI9L_uuap9p.jpg" },

            // Shoes
            { productid: 9, imageurl: "https://res.cloudinary.com/ds2egvrc7/image/upload/v1754678534/download_zaraf5.jpg" },
            { productid: 10, imageurl: "https://res.cloudinary.com/ds2egvrc7/image/upload/v1754678491/download_fzcyfj.jpg" },

            // Accessories
            { productid: 11, imageurl: "https://res.cloudinary.com/ds2egvrc7/image/upload/v1754678448/download_ef6ybs.jpg" },
            { productid: 12, imageurl: "https://res.cloudinary.com/ds2egvrc7/image/upload/v1754678396/download_swjhne.jpg" },

            // Home
            { productid: 13, imageurl: "https://res.cloudinary.com/ds2egvrc7/image/upload/v1754678357/51UDEzMJVpL_iuhtnv.jpg" },
            { productid: 14, imageurl: "https://res.cloudinary.com/ds2egvrc7/image/upload/v1754678294/download_qbik8h.jpg" },

            // Sports
            { productid: 15, imageurl: "https://res.cloudinary.com/ds2egvrc7/image/upload/v1754678253/710pUsBM-WL._UY1000__c5zkzr.jpg" },
            { productid: 16, imageurl: "https://res.cloudinary.com/ds2egvrc7/image/upload/v1754678196/BZ65784_Main__10488_iszsze.jpg" },

            // Books
            { productid: 17, imageurl: "https://res.cloudinary.com/ds2egvrc7/image/upload/v1754678141/100-Cotton-Oxford-Shirt-Men-Casual-Slim-Fit-Dress-Shirts_jcfskj.avif" },
            { productid: 18, imageurl: "https://res.cloudinary.com/ds2egvrc7/image/upload/v1754677737/mens-cotton-jacket-_guuljt.jpg" },

            // Toys
            { productid: 19, imageurl: "https://res.cloudinary.com/ds2egvrc7/image/upload/v1754677139/20008809_source_1729270336_x6ytve.jpg" },
            { productid: 20, imageurl: "https://res.cloudinary.com/ds2egvrc7/image/upload/v1754609450/kio8qgxgpb4pka8k6hvf.webp" },

            // Other
            { productid: 21, imageurl: "https://res.cloudinary.com/ds2egvrc7/image/upload/v1754679931/download_acjtgb.jpg" },
        ];

        await queryInterface.bulkInsert(PRODUCT_IMAGES_TABLE, productImages, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete(PRODUCT_IMAGES_TABLE, null, {});
    }
};
