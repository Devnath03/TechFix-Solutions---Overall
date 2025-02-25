import axios from 'axios';

const API_URL = 'http://localhost:5038/api/Quotation'; // Ensure this matches your backend API URL

// Fetch all quotations
export const getQuotations = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching quotations:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Add a new quotation
export const addQuotation = async (quotation) => {
    try {
        const response = await axios.post(API_URL, quotation);
        return response.data;
    } catch (error) {
        console.error('Error adding quotation:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Update an existing quotation
export const updateQuotation = async (id, quotation) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, quotation);
        return response.data;
    } catch (error) {
        console.error('Error updating quotation:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Delete a quotation by ID
export const deleteQuotation = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting quotation:', error.response ? error.response.data : error.message);
        throw error;
    }
};