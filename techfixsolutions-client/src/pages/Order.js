import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { getOrders, deleteOrder } from '../services/orderService';
import OrderForm from '../components/OrderForm';
import { toast } from 'react-toastify';
import './Order.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await getOrders();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
            toast.error('Failed to fetch orders!');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteOrder(id);
            toast.success('Order deleted successfully!');
            fetchOrders();
        } catch (error) {
            console.error('Error deleting order:', error);
            toast.error('Failed to delete order!');
        }
    };

    return (
        <div>
            <h2>Orders</h2>
            <Button onClick={() => setShowForm(true)} className="btn-primary mb-3">
                Add Order
            </Button>

            {showForm && (
                <OrderForm
                    order={selectedOrder}
                    onSave={() => {
                        setShowForm(false);
                        setSelectedOrder(null);
                        fetchOrders();
                    }}
                    onClose={() => setShowForm(false)}
                />
            )}

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Product Category</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.productName}</td>
                            <td>{order.productCategory}</td>
                            <td>{order.quantity}</td>
                            <td>{order.totalPrice}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    className="btn-warning"
                                    onClick={() => {
                                        setSelectedOrder(order);
                                        setShowForm(true);
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    className="btn-danger ms-2"
                                    onClick={() => handleDelete(order.id)}
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

export default Orders;