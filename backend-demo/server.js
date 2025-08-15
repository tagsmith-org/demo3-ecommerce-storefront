const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database setup
const db = new sqlite3.Database('./ecommerce.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Initialize database tables
const initDatabase = () => {
    // Products table
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        image TEXT,
        description TEXT,
        category TEXT,
        stock INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Orders table
    db.run(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_number TEXT UNIQUE NOT NULL,
        customer_email TEXT NOT NULL,
        customer_name TEXT NOT NULL,
        shipping_address TEXT NOT NULL,
        total_amount REAL NOT NULL,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Order items table
    db.run(`CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER,
        product_id INTEGER,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders (id),
        FOREIGN KEY (product_id) REFERENCES products (id)
    )`);

    console.log('Database tables initialized');
};

// Initialize database
initDatabase();

// Sample data insertion
const insertSampleData = () => {
    const sampleProducts = [
        {
            name: 'Handcrafted Ceramic Mug',
            price: 24.99,
            image: 'https://picsum.photos/400/400?random=1',
            description: 'Beautiful handcrafted ceramic mug perfect for your morning coffee',
            category: 'Kitchen',
            stock: 50
        },
        {
            name: 'Organic Cotton Throw Blanket',
            price: 89.99,
            image: 'https://picsum.photos/400/400?random=2',
            description: 'Soft and cozy organic cotton throw blanket for your living room',
            category: 'Home',
            stock: 25
        },
        {
            name: 'Wooden Cutting Board',
            price: 45.99,
            image: 'https://picsum.photos/400/400?random=3',
            description: 'Premium wooden cutting board made from sustainable materials',
            category: 'Kitchen',
            stock: 30
        },
        {
            name: 'Aromatherapy Candle Set',
            price: 34.99,
            image: 'https://picsum.photos/400/400?random=4',
            description: 'Set of 3 natural soy candles with calming lavender scent',
            category: 'Wellness',
            stock: 40
        },
        {
            name: 'Handwoven Basket',
            price: 67.99,
            image: 'https://picsum.photos/400/400?random=5',
            description: 'Artisan handwoven basket perfect for storage or decoration',
            category: 'Home',
            stock: 20
        },
        {
            name: 'Herb Garden Kit',
            price: 29.99,
            image: 'https://picsum.photos/400/400?random=6',
            description: 'Complete herb garden kit with seeds, pots, and growing guide',
            category: 'Garden',
            stock: 35
        },
        {
            name: 'Handmade Soap Collection',
            price: 19.99,
            image: 'https://picsum.photos/400/400?random=7',
            description: 'Collection of 4 handmade soaps with natural ingredients',
            category: 'Wellness',
            stock: 60
        },
        {
            name: 'Copper Plant Pot',
            price: 38.99,
            image: 'https://picsum.photos/400/400?random=8',
            description: 'Elegant copper plant pot with drainage hole',
            category: 'Garden',
            stock: 15
        }
    ];

    // Check if products already exist
    db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
        if (err) {
            console.error('Error checking products:', err);
            return;
        }
        
        if (row.count === 0) {
            console.log('Inserting sample products...');
            const stmt = db.prepare(`
                INSERT INTO products (name, price, image, description, category, stock)
                VALUES (?, ?, ?, ?, ?, ?)
            `);
            
            sampleProducts.forEach(product => {
                stmt.run([
                    product.name,
                    product.price,
                    product.image,
                    product.description,
                    product.category,
                    product.stock
                ]);
            });
            
            stmt.finalize();
            console.log('Sample products inserted');
        }
    });
};

// Insert sample data
insertSampleData();

// API Routes

// Get all products
app.get('/api/products', (req, res) => {
    const { search, category, minPrice, maxPrice, sort } = req.query;
    
    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];
    
    // Search filter
    if (search) {
        query += ' AND (name LIKE ? OR description LIKE ? OR category LIKE ?)';
        const searchTerm = `%${search}%`;
        params.push(searchTerm, searchTerm, searchTerm);
    }
    
    // Category filter
    if (category) {
        query += ' AND category = ?';
        params.push(category);
    }
    
    // Price filters
    if (minPrice) {
        query += ' AND price >= ?';
        params.push(minPrice);
    }
    
    if (maxPrice) {
        query += ' AND price <= ?';
        params.push(maxPrice);
    }
    
    // Sorting
    if (sort) {
        switch (sort) {
            case 'price-low':
                query += ' ORDER BY price ASC';
                break;
            case 'price-high':
                query += ' ORDER BY price DESC';
                break;
            case 'name':
                query += ' ORDER BY name ASC';
                break;
            default:
                query += ' ORDER BY created_at DESC';
        }
    } else {
        query += ' ORDER BY created_at DESC';
    }
    
    db.all(query, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Get single product
app.get('/api/products/:id', (req, res) => {
    const { id } = req.params;
    
    db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.json(row);
    });
});

// Create order
app.post('/api/orders', (req, res) => {
    const { customerEmail, customerName, shippingAddress, items, totalAmount } = req.body;
    
    if (!customerEmail || !customerName || !shippingAddress || !items || !totalAmount) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const orderNumber = `ORD-${Date.now()}`;
    
    db.run(`
        INSERT INTO orders (order_number, customer_email, customer_name, shipping_address, total_amount)
        VALUES (?, ?, ?, ?, ?)
    `, [orderNumber, customerEmail, customerName, shippingAddress, totalAmount], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        
        const orderId = this.lastID;
        
        // Insert order items
        const stmt = db.prepare(`
            INSERT INTO order_items (order_id, product_id, quantity, price)
            VALUES (?, ?, ?, ?)
        `);
        
        items.forEach(item => {
            stmt.run([orderId, item.productId, item.quantity, item.price]);
        });
        
        stmt.finalize((err) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            
            res.status(201).json({
                message: 'Order created successfully',
                orderNumber,
                orderId
            });
        });
    });
});

// Get order by order number
app.get('/api/orders/:orderNumber', (req, res) => {
    const { orderNumber } = req.params;
    
    db.get(`
        SELECT o.*, 
               GROUP_CONCAT(oi.product_id || ':' || oi.quantity || ':' || oi.price) as items
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        WHERE o.order_number = ?
        GROUP BY o.id
    `, [orderNumber], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: 'Order not found' });
            return;
        }
        
        // Parse items string
        if (row.items) {
            row.items = row.items.split(',').map(item => {
                const [productId, quantity, price] = item.split(':');
                return { productId: parseInt(productId), quantity: parseInt(quantity), price: parseFloat(price) };
            });
        } else {
            row.items = [];
        }
        
        res.json(row);
    });
});

// Get all orders
app.get('/api/orders', (req, res) => {
    db.all(`
        SELECT o.*, 
               COUNT(oi.id) as item_count
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        GROUP BY o.id
        ORDER BY o.created_at DESC
    `, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Update order status
app.patch('/api/orders/:orderNumber/status', (req, res) => {
    const { orderNumber } = req.params;
    const { status } = req.body;
    
    if (!status) {
        return res.status(400).json({ error: 'Status is required' });
    }
    
    db.run('UPDATE orders SET status = ? WHERE order_number = ?', [status, orderNumber], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Order not found' });
            return;
        }
        res.json({ message: 'Order status updated successfully' });
    });
});

// Admin CRUD endpoints for products
app.post('/api/admin/products', (req, res) => {
    const { name, price, description, category, image, stock } = req.body;
    
    if (!name || !price || !description || !category) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    db.run(`
        INSERT INTO products (name, price, description, category, image, stock, created_at)
        VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
    `, [name, price, description, category, image || 'https://picsum.photos/400/400?random=99', stock || 0], function(err) {
        if (err) {
            res.status(500).json({ error: 'Failed to create product' });
            return;
        }
        
        const newProductId = this.lastID;
        
        db.get('SELECT * FROM products WHERE id = ?', [newProductId], (err, product) => {
            if (err) {
                res.status(500).json({ error: 'Failed to retrieve created product' });
                return;
            }
            res.status(201).json(product);
        });
    });
});

app.put('/api/admin/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, description, category, image, stock } = req.body;
    
    if (!name || !price || !description || !category) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    db.run(`
        UPDATE products 
        SET name = ?, price = ?, description = ?, category = ?, image = ?, stock = ?
        WHERE id = ?
    `, [name, price, description, category, image, stock, id], function(err) {
        if (err) {
            res.status(500).json({ error: 'Failed to update product' });
            return;
        }
        
        if (this.changes === 0) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        
        db.get('SELECT * FROM products WHERE id = ?', [id], (err, product) => {
            if (err) {
                res.status(500).json({ error: 'Failed to retrieve updated product' });
                return;
            }
            res.json(product);
        });
    });
});

app.delete('/api/admin/products/:id', (req, res) => {
    const { id } = req.params;
    
    db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
        if (err) {
            res.status(500).json({ error: 'Failed to delete product' });
            return;
        }
        
        if (this.changes === 0) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        
        res.json({ message: 'Product deleted successfully' });
    });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        database: 'Connected'
    });
});

// API documentation
app.get('/api', (req, res) => {
    res.json({
        message: 'E-commerce Backend API',
        version: '1.0.0',
        endpoints: {
            'GET /api/products': 'Get all products (with optional search, category, price filters)',
            'GET /api/products/:id': 'Get single product',
            'POST /api/orders': 'Create new order',
            'GET /api/orders': 'Get all orders',
            'GET /api/orders/:orderNumber': 'Get order by order number',
            'PATCH /api/orders/:orderNumber/status': 'Update order status',
            'GET /api/health': 'Health check'
        },
        examples: {
            'Search products': 'GET /api/products?search=ceramic',
            'Filter by price': 'GET /api/products?minPrice=20&maxPrice=50',
            'Sort by price': 'GET /api/products?sort=price-low'
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 E-commerce Backend Server running on port ${PORT}`);
    console.log(`📚 API Documentation: http://localhost:${PORT}/api`);
    console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...');
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('✅ Database connection closed');
        }
        process.exit(0);
    });
});
