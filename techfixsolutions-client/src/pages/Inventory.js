import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { getInventoryItems, deleteInventoryItem } from '../services/inventoryService';
import InventoryForm from '../components/InventoryForm';
import { toast } from 'react-toastify';

const Inventory = () => {
    const [inventory, setInventory] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            const data = await getInventoryItems();
            console.log('API Response:', data); // Log the API response
            setInventory(data);
        } catch (error) {
            console.error('Error fetching inventory:', error);
            toast.error('Failed to fetch inventory!');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteInventoryItem(id);
            toast.success('Product deleted successfully!');
            fetchInventory();
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Failed to delete product!');
        }
    };

    return (
        <div>
            <h2>Inventory</h2>
            <Button onClick={() => setShowForm(true)} className="btn-primary mb-3">
                Add Product
            </Button>

            {showForm && (
                <InventoryForm
                    inventory={selectedProduct} // Pass the selected product
                    onSave={() => {
                        setShowForm(false);
                        setSelectedProduct(null);
                        fetchInventory();
                    }}
                    onClose={() => setShowForm(false)}
                />
            )}

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Supplier Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((product) => (
                        <tr key={product.id}>
                            <td>{product.inventoryName}</td> {/* Updated field name */}
                            <td>{product.supplierName}</td> {/* Updated field name */}
                            <td>{product.price}</td>
                            <td>{product.quantity}</td> {/* Updated field name */}
                            <td>
                                <Button
                                    variant="warning"
                                    className="btn-warning"
                                    onClick={() => {
                                        setSelectedProduct(product);
                                        setShowForm(true);
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    className="btn-danger ms-2"
                                    onClick={() => handleDelete(product.id)}
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

export default Inventory;