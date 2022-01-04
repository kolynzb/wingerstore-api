CREATE DATABASE wingerstore 
CREATE TABLE products(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    productName VARCHAR(25) NOT NULL,
    Price INT NOT NULL,
    discount INT ,
    description TEXT NOT NULL,
    rating INT NOT NULL CHECK(rating >= 1 and rating <= 5),
    user_id INT NOT NULL REFERENCES users(id)
)

alter table products add previewImage 
insert into products ( productName, price, description, discount,rating) values("native",300,"lorem ipsum",20,4);

CREATE TABLE users(
    id INT AUTOINCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE ,
);

-- {
--     "id": 1,
--     "productName": "Collins Wrist Watch",
--     "price": 150000,
--     "discount": 30, 
--     "colors": ["blue", "white", "red"],
--     "categories": ["Accessories", "Men", "Women"],
--     "Brands": ["apple"],
--     "descrption":
--       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus quaerat dolores quia doloribus deserunt sapiente sunt laborum velit labore ad hic amet autem libero nobis, repellat quisquam quibusdam voluptate quas? ",
--     "rating": 4,
--     "quantity": 12,
--     "features": ["tufff"],
--     "previewImage":
--       "https://res.cloudinary.com/kolynz-b/image/upload/v1638437680/pexels-pixabay-47856_a1wlbe.jpg",
--     "images": [
--       "https://res.cloudinary.com/kolynz-b/image/upload/v1638437680/pexels-pixabay-47856_a1wlbe.jpg",
--       "https://res.cloudinary.com/kolynz-b/image/upload/v1638785379/wingerstore/pexels-antony-trivet-9982586_un9dhz.jpg",
--       "https://res.cloudinary.com/kolynz-b/image/upload/v1638785376/wingerstore/pexels-mitchel-durfee-6230455_ix7krt.jpg",
--       "https://res.cloudinary.com/kolynz-b/image/upload/v1638785372/wingerstore/pexels-pixabay-364822_mwve5p.jpg",
--       "https://res.cloudinary.com/kolynz-b/image/upload/v1638785372/wingerstore/pexels-rubaitul-azad-10414755_soovkm.jpg",
--     ],
--   },