import axios from 'axios';

const API_URL = 'http://localhost:5008/api/Supplier'; // Ensure this matches your backend API URL for suppliers

// Fetch all suppliers
export const getSuppliers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching suppliers:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Fetch a single supplier by ID
export const getSupplierById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching supplier by ID:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Add a new supplier
export const addSupplier = async (supplier) => {
    try {
        const response = await axios.post(API_URL, supplier);
        return response.data;
    } catch (error) {
        console.error('Error adding supplier:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Update an existing supplier
export const updateSupplier = async (id, supplier) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, supplier);
        return response.data;
    } catch (error) {
        console.error('Error updating supplier:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Delete a supplier by ID
export const deleteSupplier = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting supplier:', error.response ? error.response.data : error.message);
        throw error;
    }
};