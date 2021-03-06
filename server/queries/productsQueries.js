const db = require('../database/db')


const getProductImageById = async (id) => {
    const getQuery = `
    SELECT products.product_id, products.product_name, products.product_price, products.product_description,  
    products.store_id, brands.*, categories.categories_name, materials.material_name, colors.colors_name, product_type.product_type_name, productImage_id.*,
    array_agg(product_inventory.product_size) AS product_size
    FROM products 
    JOIN brands ON brands.brand_id = products.brand_id
    JOIN categories ON categories.category_id = products.category_id
    JOIN materials ON materials.material_id = products.material_id
    JOIN colors ON colors.color_id = products.color_id
    JOIN product_type ON product_type.product_type_id = products.product_type
    JOIN  productImage_id  ON productImage_id.product_id = products.product_id
    JOIN product_inventory ON product_inventory.product_id = products.product_id 
    WHERE products.product_id = $/id/
    GROUP BY products.product_id, brands.brand_id, categories.categories_name,materials.material_name,colors.colors_name, product_type.product_type_name,
    productimage_id.product_image_id
    `
    return await db.one(getQuery, { id });
}

const getProductById = async (id) => {
    const getQuery = `
    SELECT products.product_id, products.store_id, products.product_name, products.product_price, products.product_description,  brands.brands_name, brands.brand_description , categories.*, materials.material_name, colors.colors_name, product_type.product_type_name, 
    productImage_id.*,
    array_agg(product_inventory.product_size ORDER BY product_inventory.product_size DESC ) AS product_size
    FROM products 
    JOIN brands ON brands.brand_id = products.brand_id
    JOIN categories ON categories.category_id = products.category_id
    JOIN materials ON materials.material_id = products.material_id
    JOIN colors ON colors.color_id = products.color_id
    JOIN product_type ON product_type.product_type_id = products.product_type
    JOIN  productImage_id  ON productImage_id.product_id = products.product_id
    JOIN product_inventory ON product_inventory.product_id = products.product_id 
    WHERE products.product_id = $/id/
    GROUP BY products.product_id, brands.brand_id, categories.category_id,materials.material_name,colors.colors_name, product_type.product_type_name,
    productimage_id.product_image_id
    `
    return await db.one(getQuery, { id });
}

// const getProductByType = async (product_type) => {
//     const getQuery = `
//     SELECT products.product_id, products.product_name, products.product_price, products.product_description, brands.brands_name, categories.categories_name, materials.material_name, colors.colors_name, product_type.product_type_name
//     FROM products 
//     JOIN brands ON brands.brand_id = products.brand_id
//     JOIN categories ON categories.category_id = products.category_id
//     JOIN materials ON materials.material_id = products.material_id
//     JOIN colors ON colors.color_id = products.color_id
//     JOIN product_type ON product_type.product_type_id = products.product_type
//     WHERE product_type.product_type_name= $/product_type/;
//     `
//     return await db.any(getQuery, { product_type });
// }

const getProductByName = async (name) => {
    const getQuery = `
    SELECT products.product_id, product_name, product_price, product_description,
    quantity, brands_name, categories_name, material_name, colors_name, product_type_name
    FROM products 
    JOIN brands ON brands.brand_id = products.brand_id
    JOIN categories ON categories.category_id = products.category_id
    JOIN materials ON materials.material_id = products.material_id
    JOIN colors ON colors.color_id = products.color_id
    JOIN product_type ON product_type.product_type_id = products.product_type
    WHERE products.product_name = $/name/;
    `
    return await db.any(getQuery, { name });
}

const getProductBySize = async (size) => {
    const getQuery = `
    SELECT products.product_id, product_name, product_price, product_description, quantity, brands_name, categories_name, material_name, colors_name, product_type_name, product_inventory.*
    FROM products 
    JOIN brands ON brands.brand_id = products.brand_id
    JOIN categories ON categories.category_id = products.category_id
    JOIN materials ON materials.material_id = products.material_id
    JOIN colors ON colors.color_id = products.color_id
    JOIN product_type ON product_type.product_type_id = products.product_type
    JOIN product_inventory ON product_inventory.product_id = products.product_id 
    WHERE product_inventory.product_size = $/size/;
    `
    return await db.any(getQuery, { size });
    //     return await db.any(getQuery, { name });
}


const getProductByColor = async (color) => {
    const getQuery = `
    SELECT products.product_id, product_name, product_price, product_description, 
    quantity, brands_name, categories_name, material_name, colors_name, product_type_name
    FROM products 
    JOIN brands ON brands.brand_id = products.brand_id
    JOIN categories ON categories.category_id = products.category_id
    JOIN materials ON materials.material_id = products.material_id
    JOIN colors ON colors.color_id = products.color_id
    JOIN product_type ON product_type.product_type_id = products.product_type
    WHERE colors.colors_name= $/color/;
    `
    return await db.any(getQuery, { color });
    //     JOIN product_inventory ON product_inventory.product_id = products.product_id 
    //     WHERE product_inventory.product_size = $/size/;
    //     `
    //     return await db.any(getQuery, { size });
}

const getProductByBrand = async (brand) => {
    const getQuery = `
    SELECT products.product_id, product_name, product_price, product_description, 
    quantity, brands_name, categories_name, material_name, colors_name, product_type_name
    FROM products 
    JOIN brands ON brands.brand_id = products.brand_id
    JOIN categories ON categories.category_id = products.category_id
    JOIN materials ON materials.material_id = products.material_id
    JOIN colors ON colors.color_id = products.color_id
    JOIN product_type ON product_type.product_type_id = products.product_type
    WHERE brands.brands_name= $/brand/;
    `
    return await db.any(getQuery, { brand });
}

const getProductByCategory = async (category, store_id) => {
    const getQuery = `
    SELECT products.product_id, products.product_name, products.product_price, products.product_description,  products.store_id,
    brands.brands_name, categories.categories_name, materials.material_name, colors.colors_name, product_type.product_type_name, productImage_id.*,
    array_agg(product_inventory.product_size) AS product_size
    FROM products 
    JOIN brands ON brands.brand_id = products.brand_id
    JOIN categories ON categories.category_id = products.category_id
    JOIN materials ON materials.material_id = products.material_id
    JOIN colors ON colors.color_id = products.color_id
    JOIN product_type ON product_type.product_type_id = products.product_type
    JOIN  productImage_id  ON productImage_id.product_id = products.product_id
    JOIN product_inventory ON product_inventory.product_id = products.product_id 
    WHERE categories.categories_name = $/category/ AND products.store_id = $/store_id/
    GROUP BY products.product_id, brands.brand_id, categories.categories_name,materials.material_name,colors.colors_name, product_type.product_type_name,
    productimage_id.product_image_id
    `
    return await db.any(getQuery, { category, store_id });
}

const getAllProductsByCategory = async (categories_name) => {
    const getQuery = `SELECT products.product_id, products.product_name, products.product_price, products.product_description,  products.store_id,
    brands.brands_name, categories.categories_name, materials.material_name, colors.colors_name, 
    stores.stores_name,product_type.product_type_name, productImage_id.*,
    array_agg(product_inventory.product_size) AS product_size
    FROM products 
    JOIN brands ON brands.brand_id = products.brand_id
    JOIN categories ON categories.category_id = products.category_id
    JOIN materials ON materials.material_id = products.material_id
    JOIN colors ON colors.color_id = products.color_id
    JOIN product_type ON product_type.product_type_id = products.product_type
    JOIN  productImage_id  ON productImage_id.product_id = products.product_id
    JOIN product_inventory ON product_inventory.product_id = products.product_id 
    JOIN stores ON stores.store_id = products.store_id
    WHERE categories.categories_name = $/categories_name/
    GROUP BY products.product_id, brands.brand_id, categories.categories_name,materials.material_name,colors.colors_name, stores.stores_name,product_type.product_type_name,
    productimage_id.product_image_id;`
    return await db.any(getQuery, { categories_name });
}

const getProductByType = async (type, store_id) => {
    const getQuery = `
    SELECT products.product_id, products.product_name, products.product_price, products.product_description,  products.store_id,
    brands.brands_name, categories.categories_name, materials.material_name, colors.colors_name, product_type.product_type_name, productImage_id.*,
    array_agg(product_inventory.product_size) AS product_size
    FROM products 
    JOIN brands ON brands.brand_id = products.brand_id
    JOIN categories ON categories.category_id = products.category_id
    JOIN materials ON materials.material_id = products.material_id
    JOIN colors ON colors.color_id = products.color_id
    JOIN product_type ON product_type.product_type_id = products.product_type
    JOIN productImage_id ON productImage_id.product_id = products.product_id
    JOIN product_inventory ON product_inventory.product_id = products.product_id 
    WHERE product_type.product_type_name = $/type/ AND products.store_id = $/store_id/
    GROUP BY products.product_id, brands.brand_id, categories.categories_name,materials.material_name,colors.colors_name, product_type.product_type_name,
    productimage_id.product_image_id
    `
    return await db.any(getQuery, { type, store_id });
}
const getCategories = async () => {
    const getCategoriesQuery = `
      SELECT * FROM categories
      `;
    return await db.any(getCategoriesQuery);
};

const getProductTypes = async () => {
    const getTypesQuery = `
      SELECT * FROM product_type
      `;
    return await db.any(getTypesQuery);
};

const getBrands = async () => {
    const getBrandsQuery = `
      SELECT * FROM brands
      `;
    return await db.any(getBrandsQuery);
};

const getColors = async () => {
    const getColorsQuery = `
      SELECT * FROM colors
      `;
    return await db.any(getColorsQuery);
};

const getSizes = async () => {
    const getSizesQuery = `
    SELECT DISTINCT
     product_size
    FROM
    product_inventory`;
    return await db.any(getSizesQuery);
};

const getNewArrivals = async (id) => {
    const getNewArrivalsQuery = `
    SELECT products.product_id, products.product_name, products.product_price, products.product_description,  products.store_id, 
    brands.brands_name, categories.categories_name, materials.material_name, colors.colors_name, product_type.product_type_name, productImage_id.*,
    array_agg(product_inventory.product_size) AS product_size
    FROM products 
    JOIN brands ON brands.brand_id = products.brand_id
    JOIN categories ON categories.category_id = products.category_id
    JOIN materials ON materials.material_id = products.material_id
    JOIN colors ON colors.color_id = products.color_id
    JOIN product_type ON product_type.product_type_id = products.product_type
    JOIN  productImage_id  ON productImage_id.product_id = products.product_id
    JOIN product_inventory ON product_inventory.product_id = products.product_id 
    WHERE products.store_id = $1
    GROUP BY products.product_id, brands.brand_id, 
categories.categories_name,materials.material_name,colors.colors_name, product_type.product_type_name,
    productimage_id.product_image_id
    ORDER BY products.product_id DESC LIMIT 4
    `;
    return await db.any(getNewArrivalsQuery, [id])
}

const getProductsByFilter = async (filters, store_id) => {

    let getQuery = `
    SELECT products.product_id, products.product_name, products.product_price, products.product_description,  products.store_id,
    brands.brands_name, categories.categories_name, materials.material_name, colors.colors_name, product_type.product_type_name, productImage_id.*,
    array_agg(product_inventory.product_size) AS product_size
    FROM products 
    JOIN brands ON brands.brand_id = products.brand_id
    JOIN categories ON categories.category_id = products.category_id
    JOIN materials ON materials.material_id = products.material_id
    JOIN colors ON colors.color_id = products.color_id
    JOIN product_type ON product_type.product_type_id = products.product_type
    JOIN  productImage_id  ON productImage_id.product_id = products.product_id
    JOIN product_inventory ON product_inventory.product_id = products.product_id 
    WHERE products.store_id = $1 AND
    `

    let properties = [store_id]
    let num = 2
    let firstElem = Object.keys(filters)[0]

    for (el in filters) {
        if (el === firstElem) {
            getQuery += `${el}.${el}_name = $${num} `
        } else {
            getQuery += `OR ${el}.${el}_name = $${num} `
        }
        properties.push(filters[el])
        num++;
    }

    getQuery += `GROUP BY products.product_id, brands.brand_id, categories.categories_name,materials.material_name,colors.colors_name, product_type.product_type_name,
    productimage_id.product_image_id`


    return await db.any(getQuery, properties);
}

const getProductsOfCategoryByFilter = async (filters, category_name) => {
    console.log(filters)
    console.log(category_name)
    let getQuery = `
        SELECT products.product_id, products.product_name, products.product_price, products.product_description,  products.store_id,
        brands.brands_name, categories.categories_name, materials.material_name, colors.colors_name, product_type.product_type_name, productImage_id.*,
        array_agg(product_inventory.product_size) AS product_size
        FROM products 
        JOIN brands ON brands.brand_id = products.brand_id
        JOIN categories ON categories.category_id = products.category_id
        JOIN materials ON materials.material_id = products.material_id
        JOIN colors ON colors.color_id = products.color_id
        JOIN product_type ON product_type.product_type_id = products.product_type
        JOIN  productImage_id  ON productImage_id.product_id = products.product_id
        JOIN product_inventory ON product_inventory.product_id = products.product_id 
        JOIN stores ON stores.store_id = products.store_id
        WHERE categories.categories_name = $1 AND
    
    `
    let properties = [category_name]
    let num = 2
    let firstElem = Object.keys(filters)[0]

    for (el in filters) {
        if (el === firstElem) {
            getQuery += `${el}.${el}_name = $${num} `
        } else {
            getQuery += `OR ${el}.${el}_name = $${num} `
        }
        properties.push(filters[el])
        num++;
    }

    getQuery += `GROUP BY products.product_id, brands.brand_id, categories.categories_name,materials.material_name,colors.colors_name, product_type.product_type_name,
        productimage_id.product_image_id`
    console.log(getQuery)
    console.log(properties)
    return await db.any(getQuery, properties);
}


const getProductQty = async (product_id, product_size) => {
    const getQuery = `
            SELECT * 
            FROM products
            JOIN product_inventory ON product_inventory.product_id = products.product_id 
            WHERE product_inventory.product_id = $/product_id/  AND product_inventory.product_size = $/product_size/
            `
    return await db.one(getQuery, { product_id, product_size });
}


const updateProductQty = async (product_id, product_size, product_quantity) => {
    let updateQuery = `
    UPDATE product_inventory
    SET 
    product_quantity = $/product_quantity/
    WHERE 
    product_id = $/product_id/ AND 
    product_size = $/product_size/  
     RETURNING *
    ;
`;
    return await db.one(updateQuery, {product_id, product_size, product_quantity});
}


module.exports = {
    getProductImageById,
    getProductById,
    getProductByType,
    getProductByName,
    getProductBySize,
    getProductByColor,
    getProductByBrand,
    getProductByCategory,
    getCategories,
    getProductTypes,
    getBrands,
    getColors,
    getSizes,
    getNewArrivals,
    getAllProductsByCategory,
    getProductsByFilter,
    getProductsOfCategoryByFilter,
    getProductQty,
    updateProductQty
}