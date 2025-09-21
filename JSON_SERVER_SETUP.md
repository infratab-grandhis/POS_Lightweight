# POS System with JSON Server Backend

This setup uses **json-server** to provide a REST API for your POS system, eliminating the need for a complex Node.js backend and database setup.

## 🚀 Quick Start

### 1. Start the Complete System
```bash
npm start
```
This runs both the API server and React frontend together.

### 2. Start Individual Services

**API Server Only:**
```bash
npm run start:api
```
- Runs on: http://localhost:5000
- API Base: http://localhost:5000/api

**Frontend Only:**
```bash
npm run start:frontend
```
- Runs on: http://localhost:3000

## 📊 API Endpoints

### Products
- `GET /api/products` - Get all products (supports pagination)
- `GET /api/products?_page=1&_limit=20` - Paginated products
- `GET /api/products?category=burgers` - Filter by category
- `GET /api/products?q=burger` - Full-text search
- `GET /api/products/3001` - Get specific product

### Inventory
- `GET /api/inventory` - Get all inventory
- `GET /api/inventory?productId=3001` - Get inventory for product
- `PATCH /api/inventory/1` - Update inventory item

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order
- `PATCH /api/orders/1` - Update order
- `GET /api/orders?status=pending` - Filter orders by status

### Categories
- `GET /api/categories` - Get all categories

## 🔧 JSON-Server Features

### Automatic Features:
- **Pagination**: `?_page=1&_limit=10`
- **Sorting**: `?_sort=price&_order=desc`  
- **Filtering**: `?category=burgers&isActive=true`
- **Full-text Search**: `?q=burger`
- **Relations**: Links between products and inventory

### HTTP Methods:
- `GET` - Read data
- `POST` - Create new items
- `PUT` - Replace entire item
- `PATCH` - Update specific fields
- `DELETE` - Remove items

## 📁 Data Files

### `/api-data/db.json`
Main database file containing:
- Products with customizations
- Inventory with stock levels
- Orders (empty initially)
- Categories

### `/api-data/routes.json`
URL rewriting rules to map `/api/*` to json-server endpoints.

## 🔄 Offline Support

Your frontend API service (`/pos_system/src/services/api.js`) includes:
- **Network detection** - Automatically detects online/offline status
- **Offline error handling** - Graceful fallback when API is unreachable
- **Sync capability** - Queue operations for later sync

## 📝 Example Usage

### Test API with curl:
```bash
# Get products with pagination
curl "http://localhost:5000/api/products?_page=1&_limit=5"

# Search for burgers
curl "http://localhost:5000/api/products?q=burger"

# Get inventory
curl "http://localhost:5000/api/inventory"

# Create new order
curl -X POST "http://localhost:5000/api/orders" \
  -H "Content-Type: application/json" \
  -d '{"orderId":"ORD-123","items":[],"totalAmount":0,"status":"pending"}'
```

### Frontend API Usage:
```javascript
import ApiService from './services/api';

// Get paginated products
const response = await ApiService.getProducts({
    page: 1,
    limit: 20,
    category: 'burgers'
});

// Create order
const order = await ApiService.createOrder({
    orderId: 'ORD-' + Date.now(),
    items: cartItems,
    totalAmount: 299.99,
    status: 'pending'
});
```

## 🛠 Adding More Data

To add more products or modify data:

1. **Stop the server** (Ctrl+C)
2. **Edit `/api-data/db.json`** directly
3. **Restart server**: `npm run start:api`

Or use the API to add data programmatically:
```bash
curl -X POST "http://localhost:5000/api/products" \
  -H "Content-Type: application/json" \
  -d '{"name":"New Burger","category":"burgers","price":199}'
```

## 🔍 Debugging

### Check if API is running:
```bash
curl http://localhost:5000/api/products
```

### View server logs:
The json-server will show all API requests in the terminal.

### Common Issues:
- **Port 5000 busy**: Change port in `package.json` scripts
- **CORS errors**: json-server handles CORS automatically
- **Data not persisting**: Changes are saved to `db.json` automatically

## ⚡ Benefits of This Setup

✅ **No Database Required** - Uses JSON files  
✅ **Instant REST API** - Zero configuration  
✅ **Real Pagination** - Built-in support  
✅ **Search & Filtering** - Out of the box  
✅ **Perfect for Prototyping** - Fast development  
✅ **Easy Data Management** - Edit JSON directly  
✅ **Automatic CORS** - No configuration needed

This setup gives you all the benefits of a REST API without the complexity of setting up a full backend server!
