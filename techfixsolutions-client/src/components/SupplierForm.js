import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addSupplier, updateSupplier } from '../services/supplierService';

const SupplierForm = ({ supplier, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        supplierName: '',
        supplierEmail: '',
        telephone: '',
        supplyProduct: ''
    });

    // Initialize form data if a supplier is provided (for editing)
    useEffect(() => {
        if (supplier) {
            setFormData({
                supplierName: supplier.supplierName,
                supplierEmail: supplier.supplierEmail,
                telephone: supplier.telephone,
                supplyProduct: supplier.supplyProduct
            });
        }
    }, [supplier]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let payload = { ...formData };

            if (supplier) {
                // Include the supplierId in the payload for updates
                payload = { ...payload, supplierId: supplier.supplierId };
                await updateSupplier(supplier.supplierId, payload);
                toast.success('Supplier updated successfully!');
            } else {
                await addSupplier(payload);
                toast.success('Supplier added successfully!');
            }

            onSave();
            onClose();
        } catch (error) {
            console.error('Error saving supplier:', error.response ? error.response.data : error.message);
            toast.error('Failed to save supplier!');
        }
    };

    return (
        <div className="form-container">
            <button className="close-btn" onClick={onClose}>×</button>
            <h2>{supplier ? 'Edit Supplier' : 'Add Supplier'}</h2>
            <Form onSubmit={handleSubmit}>
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
                    <Form.Label>Supplier Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter supplier email"
                        value={formData.supplierEmail}
                        onChange={(e) => setFormData({ ...formData, supplierEmail: e.target.value })}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Telephone</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter telephone number"
                        value={formData.telephone}
                        onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Supply Product</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter product supplied"
                        value={formData.supplyProduct}
                        onChange={(e) => setFormData({ ...formData, supplyProduct: e.target.value })}
                        required
                    />
                </Form.Group>
                <Button type="submit" className="btn-primary mt-3">
                    {supplier ? 'Update Supplier' : 'Add Supplier'}
                </Button>
            </Form>
        </div>
    );
};

export default SupplierForm;