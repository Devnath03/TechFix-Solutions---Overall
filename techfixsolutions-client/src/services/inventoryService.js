import axios from 'axios';

const API_URL = 'http://localhost:5099/api/Inventory'; // Ensure this matches your backend API URL

// Fetch all inventory items
export const getInventoryItems = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching inventory items:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Fetch a single inventory item by ID
export const getInventoryItemById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching inventory item by ID:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Add a new inventory item
export const addInventoryItem = async (inventoryItem) => {
    try {
        const response = await axios.post(API_URL, inventoryItem);
        return response.data;
    } catch (error) {
        console.error('Error adding inventory item:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Update an existing inventory item
export const updateInventoryItem = async (id, inventoryItem) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, inventoryItem);
        return response.data;
    } catch (error) {
        console.error('Error updating inventory item:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Delete an inventory item by ID
export const deleteInventoryItem = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting inventory item:', error.response ? error.response.data : error.message);
        throw error;
    }
};