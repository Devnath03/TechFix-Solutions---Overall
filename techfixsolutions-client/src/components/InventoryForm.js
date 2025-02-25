import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addInventoryItem, updateInventoryItem } from '../services/inventoryService';
import './QuotationForm.css'

const InventoryForm = ({ inventory, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        inventoryName: '',
        supplierName: '',
        price: 0,
        quantity: 0,
        isAvailable: 'true' // Default to 'true' as a string
    });

    // Initialize form data if an inventory item is provided (for editing)
    useEffect(() => {
        if (inventory) {
            setFormData({
                inventoryName: inventory.inventoryName,
                supplierName: inventory.supplierName,
                price: inventory.price,
                quantity: inventory.quantity,
                isAvailable: inventory.isAvailable // No conversion needed (already a string)
            });
        }
    }, [inventory]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Form Data:', formData); // Log the form data before sending

            // Prepare the payload
            const payload = {
                inventoryName: formData.inventoryName,
                supplierName: formData.supplierName,
                price: parseFloat(formData.price), // Convert to number (decimal)
                quantity: parseInt(formData.quantity, 10), // Convert to integer
                isAvialable: formData.isAvailable // Ensure the field name matches the server's expectation
            };

            // Validate isAvailable (optional, if you want to restrict values)
            if (formData.isAvailable !== 'true' && formData.isAvailable !== 'false') {
                toast.error('Invalid value for "Is Available". Please enter "true" or "false".');
                return;
            }

            let response;
            if (inventory) {
                // Include the `id` field for updates
                payload.id = inventory.id; // Add the `id` to the payload
                response = await updateInventoryItem(inventory.id, payload);
                toast.success('Inventory updated successfully!');
            } else {
                // Add new inventory item (no `id` field needed)
                response = await addInventoryItem(payload);
                toast.success('Inventory added successfully!');
            }

            console.log('Response:', response); // Log the response from the backend
            onSave(); // Refresh the inventory list
            onClose(); // Close the form
        } catch (error) {
            console.error('Error saving inventory:', error.response ? error.response.data : error.message);
            toast.error('Failed to save inventory!');
        }
    };

    return (
        <div className="form-container">
            <button className="close-btn" onClick={onClose}>×</button>
            <h2>{inventory ? 'Edit Inventory' : 'Add Inventory'}</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Inventory Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter inventory name"
                        value={formData.inventoryName}
                        onChange={(e) => setFormData({ ...formData, inventoryName: e.target.value })}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Supplier Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter supplier name"
                        value={formData.supplierName}
                        onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter price"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        step="0.01" // Allow decimal values
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter quantity"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Is Available</Form.Label>
                    <Form.Control
                        as="select"
                        value={formData.isAvailable}
                        onChange={(e) => setFormData({ ...formData, isAvailable: e.target.value })}
                        required
                    >
                        <option value="true">true</option>
                        <option value="false">false</option>
                    </Form.Control>
                </Form.Group>
                <Button type="submit" className="btn-primary mt-3">
                    {inventory ? 'Update Inventory' : 'Add Inventory'}
                </Button>
            </Form>
        </div>
    );
};

export default InventoryForm;