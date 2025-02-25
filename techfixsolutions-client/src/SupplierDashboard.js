import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getSuppliers } from './services/supplierService';
import { getQuotations } from './services/quotationService';
import { getOrders } from './services/orderService';
import { getInventoryItems } from './services/inventoryService';
import { Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import './Dashboard.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Dashboard = () => {
  const location = useLocation();
  const [suppliers, setSuppliers] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [animatedValues, setAnimatedValues] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalSuppliers: 0,
    inventoryTotal: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const isDefaultDashboard = location.pathname === '/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [suppliersData, quotationsData, ordersData, inventoryData] = await Promise.all([
          getSuppliers(),
          getQuotations(),
          getOrders(),
          getInventoryItems(),
        ]);

        setSuppliers(suppliersData || []);
        setQuotations(quotationsData || []);
        setOrders(ordersData || []);
        setInventory(inventoryData || []);

        // Calculate metrics with null checks
        const totalOrders = ordersData?.length || 0;
        const totalProducts = inventoryData?.length || 0;
        const totalSuppliers = suppliersData?.length || 0;
        const inventoryTotal = inventoryData?.reduce((sum, item) => sum + (item?.quantity || 0), 0) || 0;

        animateNumbers(totalOrders, totalProducts, totalSuppliers, inventoryTotal);
      } catch (error) {
        toast.error('Failed to fetch dashboard data!');
        console.error('Dashboard error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const animateNumbers = (totalOrders, totalProducts, totalSuppliers, inventoryTotal) => {
    const duration = 2000;
    const start = Date.now();

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - start) / duration, 1);

      setAnimatedValues({
        totalOrders: Math.floor(progress * totalOrders),
        totalProducts: Math.floor(progress * totalProducts),
        totalSuppliers: Math.floor(progress * totalSuppliers),
        inventoryTotal: Math.floor(progress * inventoryTotal),
      });

      if (progress < 1) requestAnimationFrame(animate);
    };

    animate();
  };

  const handleDownloadReport = () => {
    // Create a new PDF instance
    const doc = new jsPDF();

    // Add a title to the PDF
    doc.setFontSize(18);
    doc.text('TechFix Solutions Dashboard Report', 14, 22);

    // Define the columns for the table
    const columns = ['Metric', 'Value'];

    // Define the rows for the table
    const rows = [
      ['Total Orders', animatedValues.totalOrders],
      ['Total Products', animatedValues.totalProducts],
      ['Total Suppliers', animatedValues.totalSuppliers],
      ['Inventory Total', animatedValues.inventoryTotal],
    ];

    // Add the table to the PDF
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 30, // Start the table below the title
      theme: 'grid', // Add grid lines
      styles: { fontSize: 12, cellPadding: 3 },
      headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255] }, // Header styling
    });

    // Save the PDF
    doc.save('techfix-dashboard-report.pdf');
  };

  const formatDate = (dateString) => {
    try {
      return dateString ? new Date(dateString).toLocaleDateString() : 'N/A';
    } catch {
      return 'Invalid Date';
    }
  };

  // Data for Line Chart
  const lineChartData = [
    { name: 'Orders', value: animatedValues.totalOrders },
    { name: 'Products', value: animatedValues.totalProducts },
    { name: 'Suppliers', value: animatedValues.totalSuppliers },
  ];

  return (
    <section id="content">
      <main>
        {isDefaultDashboard && (
          <>
            <div className="head-title">
              <div className="left">
                <h1>TechFix Solutions Dashboard</h1>
                <ul className="breadcrumb">
                  <li><a href="/">Home</a></li>
                  <li><i className='bx bx-chevron-right' /></li>
                  <li><a className="active" href="/">Dashboard</a></li>
                </ul>
              </div>
              <div className="right">
                <button className="btn-download" onClick={handleDownloadReport}>
                  <i className='bx bxs-download' />
                  <span className="text">Export Report</span>
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="loading">Loading dashboard data...</div>
            ) : (
              <>
                <div className="card-box">
                  {[
                    { title: 'Total Orders', value: animatedValues.totalOrders, icon: 'bx bxs-cart' },
                    { title: 'Total Products', value: animatedValues.totalProducts, icon: 'bx bxs-package' },
                    { title: 'Total Suppliers', value: animatedValues.totalSuppliers, icon: 'bx bxs-truck' },
                    { title: 'Inventory Total', value: animatedValues.inventoryTotal, icon: 'bx bxs-box' },
                  ].map((card, index) => (
                    <div className="card" key={index}>
                      <div>
                        <div className="numbers">{card.value}</div>
                        <div className="card-name">{card.title}</div>
                      </div>
                      <div className="icon-box">
                        <i className={card.icon} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="line-chart-container">
                  <h3>Orders, Products & Suppliers Overview</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={lineChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="combined-tables">
                  <div className="table-section">
                    <h3>Recent Service Orders</h3>
                    <table>
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Supplier</th>
                          <th>Order Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders?.slice(0, 5)?.map(order => {
                          const supplier = suppliers?.find(s => s?.supplierId === order?.supplierId);
                          return (
                            <tr key={order?.id || Math.random()}>
                              <td>#{order?.id || 'N/A'}</td>
                              <td>{supplier?.supplierName || 'Unknown Supplier'}</td>
                              <td>{formatDate(order?.orderDate)}</td>
                              <td>
                                <span className={`status ${(order?.status || 'unknown')?.toLowerCase()}`}>
                                  {order?.status || 'Unknown'}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="table-section">
                    <h3>Active Inventory</h3>
                    <table>
                      <thead>
                        <tr>
                          <th>Inventory Item</th>
                          <th>Supplier</th>
                          <th>Price</th>
                          <th>Stock</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inventory?.slice(0, 5)?.map(item => {
                          const supplier = suppliers?.find(s => s?.supplierId === item?.supplierId);
                          return (
                            <tr key={item?.id || Math.random()}>
                              <td>{item?.inventoryName || 'Unnamed Item'}</td>
                              <td>{supplier?.supplierName || 'Unknown'}</td>
                              <td>${(item?.price || 0)?.toFixed(2)}</td>
                              <td>{item?.quantity || 0}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </>
        )}
        <Outlet />
      </main>
    </section>
  );
};

export default Dashboard;