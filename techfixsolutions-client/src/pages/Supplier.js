import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { getSuppliers, deleteSupplier } from '../services/supplierService';
import SupplierForm from '../components/SupplierForm';
import { toast } from 'react-toastify';

const Suppliers = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = async () => {
        try {
            const data = await getSuppliers();
            setSuppliers(data);
        } catch (error) {
            console.error('Error fetching suppliers:', error);
            toast.error('Failed to fetch suppliers!');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteSupplier(id);
            toast.success('Supplier deleted successfully!');
            fetchSuppliers();
        } catch (error) {
            console.error('Error deleting supplier:', error);
            toast.error('Failed to delete supplier!');
        }
    };

    return (
        <div>
            <h2>Suppliers</h2>
            <Button onClick={() => setShowForm(true)} className="btn-primary mb-3">
                Add Supplier
            </Button>

            {showForm && (
                <SupplierForm
                    supplier={selectedSupplier}
                    onSave={() => {
                        setShowForm(false);
                        setSelectedSupplier(null);
                        fetchSuppliers();
                    }}
                    onClose={() => setShowForm(false)}
                />
            )}

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Supplier Name</th>
                        <th>Supplier Email</th>
                        <th>Telephone</th>
                        <th>Supply Product</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map((supplier) => (
                        <tr key={supplier.supplierId}>
                            <td>{supplier.supplierName}</td>
                            <td>{supplier.supplierEmail}</td>
                            <td>{supplier.telephone}</td>
                            <td>{supplier.supplyProduct}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    className="btn-warning"
                                    onClick={() => {
                                        setSelectedSupplier(supplier);
                                        setShowForm(true);
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    className="btn-danger ms-2"
                                    onClick={() => handleDelete(supplier.supplierId)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Suppliers;