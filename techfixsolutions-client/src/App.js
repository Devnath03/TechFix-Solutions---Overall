import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Sidebar from './components/Sidebar';
//import Navbar from './components/Navbar'; // Import the Navbar
import Dashboard from './Dashboard';
import Suppliers from './pages/Supplier';
import Quotations from './pages/Quotations';
import Orders from './pages/Order';
import Inventory from './pages/Inventory';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <ToastContainer />
      <Container fluid className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
        <Row>
          <Col md={2} className="sidebar-column">
            <Sidebar />
          </Col>
          
          <Col md={10} className="main-content">
            {loading ? (
              <div className="text-center mt-5">
                <Spinner animation="border" />
                <p className="mt-2">Loading Application...</p>
              </div>
            ) : (
              <>
                {/* <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} /> */}
                <div className="content-wrapper">
                  <Routes>
                    <Route path="/" element={<Dashboard><Outlet /></Dashboard>}>
                      <Route index element={<DashboardContent />} />
                      <Route path="suppliers" element={<Suppliers />} />
                      <Route path="quotations" element={<Quotations />} />
                      <Route path="orders" element={<Orders />} />
                      <Route path="inventory" element={<Inventory />} />
                    </Route>
                  </Routes>
                </div>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

const DashboardContent = () => {
  return (
    <div className="dashboard-main-content">
      <h1>Welcome to TechFix Solutions</h1>
    </div>
  );
};

export default App;