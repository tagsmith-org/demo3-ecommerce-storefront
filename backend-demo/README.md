# E-commerce Backend Demo

> **⚠️ IMPORTANT: This is a DEMONSTRATION backend, not a production-ready solution.**

A simple Node.js/Express backend for e-commerce applications with SQLite database. This is a **demo/portfolio project** showcasing backend development skills.

## 🎯 Purpose

This backend serves as a **demonstration** of:
- RESTful API design and implementation
- Database operations with SQLite
- CRUD operations for e-commerce data
- API documentation and examples
- Basic error handling and validation

**This is NOT a complete, production-ready backend solution.** Users are encouraged to modify, extend, and customize this demo according to their specific needs.

## 📋 Architecture Notes

### Admin Panel Integration
In this demo, the admin panel is integrated into the frontend application for simplicity. In production systems:
- **Admin panels are typically separate applications** with their own frontend
- **Authentication and authorization** are handled separately
- **Different deployment strategies** (separate domains, subdomains)
- **Enhanced security measures** for admin access
- **Role-based access control** (RBAC) for different admin levels

## 🚀 Features

- **RESTful API** for products and orders
- **SQLite Database** with automatic initialization
- **Search & Filtering** for products
- **Order Management** with status tracking
- **CORS enabled** for frontend integration
- **Sample data** included

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **SQLite3** - Lightweight database
- **CORS** - Cross-origin resource sharing
- **Body Parser** - Request parsing

## 📦 Installation

1. **Navigate to backend directory**
   ```bash
   cd backend-demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **For development (with auto-restart)**
   ```bash
   npm run dev
   ```

## 🌐 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/:orderNumber` - Get order by number
- `PATCH /api/orders/:orderNumber/status` - Update order status

### Utility
- `GET /api/health` - Health check
- `GET /api` - API documentation

## 🔍 Query Parameters

### Products API
- `search` - Search in name, description, category
- `category` - Filter by category
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `sort` - Sort options: `price-low`, `price-high`, `name`

### Examples
```bash
# Search for ceramic products
GET /api/products?search=ceramic

# Filter by price range
GET /api/products?minPrice=20&maxPrice=50

# Sort by price (low to high)
GET /api/products?sort=price-low

# Filter by category
GET /api/products?category=Kitchen
```

## 📊 Database Schema

### Products Table
```sql
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    image TEXT,
    description TEXT,
    category TEXT,
    stock INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Orders Table
```sql
CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_number TEXT UNIQUE NOT NULL,
    customer_email TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    shipping_address TEXT NOT NULL,
    total_amount REAL NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Order Items Table
```sql
CREATE TABLE order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
);
```

## 📝 API Examples

### Create Order
```javascript
const orderData = {
    customerEmail: "customer@example.com",
    customerName: "John Doe",
    shippingAddress: "123 Main St, City, State 12345",
    items: [
        { productId: 1, quantity: 2, price: 24.99 },
        { productId: 3, quantity: 1, price: 45.99 }
    ],
    totalAmount: 95.97
};

fetch('http://localhost:3001/api/orders', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData)
});
```

### Get Products with Filters
```javascript
fetch('http://localhost:3001/api/products?search=ceramic&minPrice=20&sort=price-low')
    .then(response => response.json())
    .then(products => console.log(products));
```

## 🔧 Configuration

### Environment Variables
- `PORT` - Server port (default: 3001)

### Database
- Database file: `ecommerce.db` (created automatically)
- Sample products are inserted on first run

## 🚀 Integration with Frontend

This backend is designed to work with the Vue.js frontend. To connect:

1. **Update frontend API calls** to point to `http://localhost:3001`
2. **Replace static data** with API calls
3. **Handle CORS** (already configured)

## 📋 Sample Data

The backend includes 8 sample products:
- Handcrafted Ceramic Mug ($24.99)
- Organic Cotton Throw Blanket ($89.99)
- Wooden Cutting Board ($45.99)
- Aromatherapy Candle Set ($34.99)
- Handwoven Basket ($67.99)
- Herb Garden Kit ($29.99)
- Handmade Soap Collection ($19.99)
- Copper Plant Pot ($38.99)

## 🛡️ Error Handling

The API includes proper error handling:
- 400 - Bad Request (missing fields)
- 404 - Not Found (product/order not found)
- 500 - Internal Server Error

## 📈 Performance

- **SQLite** for fast local development
- **Prepared statements** for security
- **Efficient queries** with proper indexing
- **Connection pooling** (SQLite handles this automatically)

## 🔄 Development

### Adding New Endpoints
1. Add route in `server.js`
2. Implement database queries
3. Add error handling
4. Test with API client

### Database Changes
1. Modify table creation in `initDatabase()`
2. Update sample data if needed
3. Test with existing endpoints

## 🔧 Customization Ideas

This demo backend can be extended with:

### Database Enhancements
- **Add product_images table** for multiple images per product
- **Implement user management** tables and authentication
- **Add product categories** and subcategories
- **Create inventory tracking** and stock management
- **Add product reviews** and ratings system

### API Improvements
- **Add image upload** functionality
- **Implement multiple images** per product with gallery management
- **Add pagination** for large datasets
- **Create search with full-text** indexing
- **Add caching** with Redis

### Production Features
- **Add authentication** and authorization
- **Implement rate limiting** and security measures
- **Add logging** and monitoring
- **Create backup** and restore functionality
- **Add automated testing**
- **Separate admin panel** into dedicated application with proper security

## 📞 Support

This is a demo backend. For production use, consider:
- PostgreSQL or MySQL for database
- Authentication & authorization
- Input validation
- Rate limiting
- Logging
- Testing framework
