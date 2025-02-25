import axios from 'axios';

const API_URL = 'http://localhost:5228/api/Order'; // Ensure this matches your backend API URL

// Fetch all orders
export const getOrders = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Fetch a single order by ID
export const getOrderById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching order by ID:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Add a new order
export const addOrder = async (order) => {
    try {
        const response = await axios.post(API_URL, order);
        return response.data;
    } catch (error) {
        console.error('Error adding order:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Update an existing order
export const updateOrder = async (id, order) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, order);
        return response.data;
    } catch (error) {
        console.error('Error updating order:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Delete an order by ID
export const deleteOrder = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting order:', error.response ? error.response.data : error.message);
        throw error;
    }
};