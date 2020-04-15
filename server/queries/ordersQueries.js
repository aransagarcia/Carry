const db = require("../database/db");

const addOrder = async (bodyObj) => {
  const postQuery = `
        INSERT INTO orders (
            order_status, 
            required_date, 
            customer_id, 
            store_id, 
            courier_id, 
            delivery_fee, 
            total
        )
        VALUES (
            $/order_status/,
            $/required_date/,
            $/customer_id/,
            $/store_id/,
            $/courier_id/,
            $/delivery_fee/,
            $/total/
        )
        RETURNING 
        order_status, 
        required_date, 
        time_ordered,
        customer_id, 
        store_id, 
        courier_id, 
        delivery_fee, 
        total
      `;
  return await db.one(postQuery, bodyObj);
};
// ORBER BY STOREID 
const getOrderByStoreID = async (store_id) => {
  const getQuery = `SELECT orders.*,stores.store_name,avatar_url, phone_number, email, address, city, state, zip_code FROM orders    
  JOIN stores ON orders.store_id = stores.store_id 
  WHERE stores.store_id =$/store_id/;`;

  return await db.any(getQuery, { store_id });
};

// ORDER BY CUSTOMER ID
const getOrderByCustomerId = async (customer_id) => {
  const getQuery = `
    SELECT orders.*,firstname, lastname,phone_number, email, address, city, state, zip_code, avatar_url FROM orders  
    
    JOIN customers ON orders.customer_id = customers.customer_id 
    
    WHERE customers.customer_id =$/customer_id/
    `;

  return await db.any(getQuery, { customer_id });
};

// Order BY COURIER ID
const getOrderByCourierId = async (courier_id) => {
  const getQuery = `
    SELECT orders.*,firstname,lastname, phone_number,email,avatar_url, mode_of_transportation FROM orders  
    JOIN couriers ON orders.courier_id = couriers.courier_id 
    WHERE couriers.courier_id =$/courier_id/
    `;

  return await db.any(getQuery, { courier_id });
};

// GET ALL ORDER ITEMS by order ID
const getOrderItemsByOrderId = async (order_id) => {
  const getQuery = `
    SELECT * from orderItems 
    JOIN orders ON orderItems.order_id = orders.order_id 
    WHERE orders.order_id = $/order_id/`;

  return await db.any(getQuery, { order_id });
};

// UPDATE ORDER
const editOrder = async (order_id) =>{
    const updateQuery = `
    UPDATE orders
    SET order_status = $/order_status/,
        required_date = $/required_date/,
        delivery_fee = $/delivery_fee/,
        total = $/total/,
        WHERE order_id = $/order_id /
        RETURNING *`

        return await db.one(updateQuery, {order_id})
}

// Delete Order
const deleteOrder = async (order_id) => {
  const deleteQuery = `
    DELETE FROM orders
    WHERE order_id = $/order_id/`;

  return await db.none(deleteQuery, { order_id });
};

module.exports = {
  addOrder,
  getOrderByStoreID,
  getOrderByCustomerId,
  getOrderByCourierId,
  getOrderItemsByOrderId,
  editOrder,
  deleteOrder,
};