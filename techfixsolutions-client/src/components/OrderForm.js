import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addOrder, updateOrder } from '../services/orderService';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import jspdf-autotable plugin
import './OrderForm.css'; // Import the CSS

const OrderForm = ({ order, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        productName: '',
        productCategory: '',
        quantity: 0,
        totalPrice: 0
    });

    // Initialize form data if an order is provided (for editing)
    useEffect(() => {
        if (order) {
            setFormData({
                productName: order.productName,
                productCategory: order.productCategory,
                quantity: order.quantity,
                totalPrice: order.totalPrice
            });
        }
    }, [order]);

    // Function to generate and download the PDF invoice
    const generateInvoicePDF = (orderData) => {
        const doc = new jsPDF();

        // Add the heading
        doc.setFontSize(18);
        doc.text('Order Invoice', 14, 22);

        // Define the columns for the table
        const columns = ['Field', 'Value'];

        // Define the rows for the table
        const rows = [
            ['Product Name', orderData.productName],
            ['Product Category', orderData.productCategory],
            ['Quantity', orderData.quantity],
            ['Total Price', `$${orderData.totalPrice.toFixed(2)}`],
        ];

        // Add the table to the PDF
        doc.autoTable({
            head: [columns],
            body: rows,
            startY: 30, // Start the table below the heading
            theme: 'grid', // Add grid lines
            styles: { fontSize: 12, cellPadding: 3 },
            headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255] }, // Header styling
        });

        // Save the PDF
        doc.save(`order-invoice-${orderData.productName}.pdf`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Form Data:', formData); // Log the form data before sending

            // Prepare the payload
            const payload = {
                productName: formData.productName,
                productCategory: formData.productCategory,
                quantity: parseInt(formData.quantity, 10), // Ensure quantity is an integer
                totalPrice: parseFloat(formData.totalPrice) // Ensure totalPrice is a number
            };

            let response;
            if (order) {
                // Include the `id` field for updates
                payload.id = order.id; // Add the `id` to the payload
                response = await updateOrder(order.id, payload);
                toast.success('Order updated successfully!');
            } else {
                // Add new order (no `id` field needed)
                response = await addOrder(payload);
                toast.success('Order added successfully!');
            }

            console.log('Response:', response); // Log the response from the backend

            // Generate and download the PDF invoice
            generateInvoicePDF(payload);

            onSave(); // Refresh the orders list
            onClose(); // Close the form
        } catch (error) {
            console.error('Error saving order:', error.response ? error.response.data : error.message);
            toast.error('Failed to save order!');
        }
    };

    return (
        <div className="form-container">
            <button className="close-btn" onClick={onClose}>×</button>
            <h2>{order ? 'Edit Order' : 'Add Order'}</h2>
            <Form className="order-form" onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={formData.productName}
                        onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Product Category</Form.Label>
                    <Form.Control
                        type="text"
                        value={formData.productCategory}
                        onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Total Price</Form.Label>
                    <Form.Control
                        type="number"
                        value={formData.totalPrice}
                        onChange={(e) => setFormData({ ...formData, totalPrice: e.target.value })}
                        required
                    />
                </Form.Group>
                <Button type="submit" className="submit-btn mt-3">
                    {order ? 'Update Order' : 'Add Order'}
                </Button>
            </Form>
        </div>
    );
};

export default OrderForm;