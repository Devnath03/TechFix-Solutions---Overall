import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { getQuotations, deleteQuotation } from '../services/quotationService';
import QuotationForm from '../components/QuotationForm';
import { toast } from 'react-toastify';
import './Quotation.css';

const Quotations = () => {
    const [quotations, setQuotations] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedQuotation, setSelectedQuotation] = useState(null);

    useEffect(() => {
        fetchQuotations();
    }, []);

    const fetchQuotations = async () => {
        const data = await getQuotations();
        setQuotations(data);
    };

    const handleDelete = async (id) => {
        try {
            await deleteQuotation(id);
            toast.success('Quotation deleted successfully!');
            fetchQuotations();
        } catch (error) {
            toast.error('Failed to delete quotation!');
        }
    };

    return (
        <div>
            <h2>Quotations</h2>
            <Button onClick={() => setShowForm(true)} className="btn-primary mb-3">
                Add Quotation
            </Button>

            {showForm && (
                <QuotationForm
                    quotation={selectedQuotation}
                    onSave={() => {
                        setShowForm(false);
                        setSelectedQuotation(null);
                        fetchQuotations();
                    }}
                    onClose={() => setShowForm(false)}
                />
            )}

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Supplier Name</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Date Received</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {quotations.map((quotation) => (
                        <tr key={quotation.id}>
                            <td>{quotation.supplierName}</td>
                            <td>{quotation.productName}</td>
                            <td>{quotation.price}</td>
                            <td>{new Date(quotation.dateReceived).toLocaleDateString()}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    className="btn-warning"
                                    onClick={() => {
                                        setSelectedQuotation(quotation);
                                        setShowForm(true);
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    className="btn-danger ms-2"
                                    onClick={() => handleDelete(quotation.id)}
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

export default Quotations;