import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addQuotation, updateQuotation } from '../services/quotationService';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import jspdf-autotable plugin
import './QuotationForm.css'; // Import the CSS file for styling

const QuotationForm = ({ quotation, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        supplierName: '',
        productName: '',
        price: 0,
        dateReceived: ''
    });

    // Initialize form data if a quotation is provided (for editing)
    useEffect(() => {
        if (quotation) {
            setFormData({
                supplierName: quotation.supplierName,
                productName: quotation.productName,
                price: quotation.price,
                dateReceived: quotation.dateReceived.split('T')[0] // Format date for input field
            });
        }
    }, [quotation]);

    // Function to generate and download the PDF invoice with a table
    const generateInvoicePDF = (quotationData) => {
        const doc = new jsPDF();

        // Add the heading
        doc.setFontSize(18);
        doc.text('Quotation Invoice', 14, 22);

        // Define the columns for the table
        const columns = ['Field', 'Value'];

        // Define the rows for the table
        const rows = [
            ['Supplier Name', quotationData.supplierName],
            ['Product Name', quotationData.productName],
            ['Price', `$${quotationData.price.toFixed(2)}`],
            ['Date Received', quotationData.dateReceived],
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
        doc.save(`quotation-invoice-${quotationData.productName}.pdf`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Form Data:', formData); // Log the form data before sending

            // Prepare the payload
            const payload = {
                supplierName: formData.supplierName,
                productName: formData.productName,
                price: parseFloat(formData.price), // Ensure price is a number
                dateReceived: new Date(formData.dateReceived).toISOString() // Convert to ISO format
            };

            let response;
            if (quotation) {
                // Include the `id` field for updates
                payload.id = quotation.id; // Add the `id` to the payload
                response = await updateQuotation(quotation.id, payload);
                toast.success('Quotation updated successfully!');
            } else {
                // Add new quotation (no `id` field needed)
                response = await addQuotation(payload);
                toast.success('Quotation added successfully!');
            }

            console.log('Response:', response); // Log the response from the backend

            // Generate and download the PDF invoice
            generateInvoicePDF(payload);

            onSave(); // Refresh the quotations list
            onClose(); // Close the form
        } catch (error) {
            console.error('Error saving quotation:', error.response ? error.response.data : error.message);
            toast.error('Failed to save quotation!');
        }
    };

    return (
        <div className="quotation-form-container">
            <button className="close-btn" onClick={onClose}>×</button>
            <h2>{quotation ? 'Edit Quotation' : 'Add Quotation'}</h2>
            <Form onSubmit={handleSubmit} className="quotation-form">
                <Form.Group>
                    <Form.Label>Supplier Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={formData.supplierName}
                        onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
                        required
                    />
                </Form.Group>
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
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Date Received</Form.Label>
                    <Form.Control
                        type="date"
                        value={formData.dateReceived}
                        onChange={(e) => setFormData({ ...formData, dateReceived: e.target.value })}
                        required
                    />
                </Form.Group>
                <Button type="submit" className="submit-btn">
                    {quotation ? 'Update Quotation' : 'Add Quotation'}
                </Button>
            </Form>
        </div>
    );
};

export default QuotationForm;