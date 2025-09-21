# 🍔 POS Lightweight System

A modern, lightweight Point of Sale (POS) system built with React and Redux, designed for restaurants and retail businesses. Features a complete API backend with json-server, real-time kitchen management, and responsive design.

## 🚀 Features

### 🛒 **Core POS Functionality**
- **Product Catalog**: Browse 100+ products with categories and search
- **Smart Cart**: Add/remove items with real-time quantity management
- **Order Processing**: Complete checkout flow with payment methods
- **Order History**: View and manage past orders with status tracking
- **Inventory Management**: Real-time stock tracking and low-stock alerts
- **Receipt Printing**: Professional thermal receipt printing with React-to-print

### 🍳 **Kitchen Management System**
- **Kitchen Display**: Kanban-style order management (Preparing → Ready → Delivered)
- **Status Transitions**: Move orders through workflow with API updates
- **Real-time Updates**: 30-second polling for live order status
- **Order History Tracking**: Complete audit trail of status changes
- **Manual Refresh**: On-demand order updates
- **Responsive Kitchen UI**: Optimized for tablets and mobile devices

### 📱 **Responsive Design**
- **Mobile-First**: Optimized for phones, tablets, and desktops
- **Touch-Friendly**: Large buttons and intuitive gestures
- **Adaptive Layout**: Kitchen display adapts to screen size
- **PWA Ready**: Progressive Web App capabilities
- **Offline Support**: Service worker for offline functionality

### 🔧 **Technical Features**
- **API Integration**: Full REST API with json-server backend
- **Lazy Loading**: Intersection Observer for infinite scroll (30 items/page)
- **State Management**: Redux with Redux Persist
- **Real-time Sync**: API polling and manual refresh options
- **Error Handling**: Comprehensive error states and notifications
- **Modern UI**: Toast notifications and confirmation dialogs

## 🛠 Tech Stack

### **Frontend**
- **React 18** - Modern React with hooks and latest patterns
- **Redux Toolkit** - Efficient state management with notification system
- **React Router** - Client-side routing with constants
- **Redux Persist** - State persistence across sessions

### **Backend**
- **json-server** - Mock REST API with full CRUD operations
- **Node.js** - Build scripts and development tooling
- **Concurrently** - Run multiple processes simultaneously

### **Development**
- **Create React App** - Build tooling and optimization
- **ESLint** - Code linting and quality assurance
- **Service Worker** - PWA capabilities and offline support
- **Nodemon** - Auto-restart development server

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Quick Start

1. **Clone the repository:**
```bash
git clone <repository-url>
cd POS_Lightweight
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the complete system:**
```bash
npm run dev
```

This starts:
- **API Server** on http://localhost:5000
- **React App** on http://localhost:3000
- **Auto-rebuild** of database on file changes

### Alternative Start Methods

```bash
# Start only the frontend
cd pos_system && npm start

# Start only the API server
npm run start:api

# Build database manually
npm run build:db
```

## 📁 Project Structure

```
POS_Lightweight/
├── pos_system/                 # React Frontend
│   ├── src/
│   │   ├── Components/         # Reusable UI components
│   │   │   ├── common/         # Shared components (Button, CartBadge, etc.)
│   │   │   ├── Notification/   # Toast notification system
│   │   │   └── OrderStatus/    # Order status components
│   │   ├── Pages/              # Main application pages
│   │   │   ├── Home.js         # Dashboard with navigation
│   │   │   ├── Products.js     # Product catalog with lazy loading
│   │   │   ├── Cart.js         # Shopping cart with checkout
│   │   │   ├── OrderHistory.js # Order management and printing
│   │   │   ├── KitchenDisplay.js # Kitchen workflow management
│   │   │   └── Constants.js    # Route constants
│   │   ├── Redux/              # State management
│   │   │   ├── Product/        # Product & inventory state
│   │   │   ├── Order/          # Cart & order state
│   │   │   └── Notification/   # Notification state
│   │   ├── services/           # API integration
│   │   │   └── api.js          # REST API service with json-server
│   │   ├── utils/              # Utility functions
│   │   │   └── orderStatusMachine.js # Order workflow logic
│   │   └── Layouts/            # Layout components
│   └── public/
│       └── sw.js               # Service worker (v2)
├── api-data/                   # Backend Data
│   ├── separate/               # Decoupled JSON files
│   │   ├── products.json       # 100 products with categories
│   │   ├── inventory.json      # Real-time stock data
│   │   ├── categories.json     # Product categories
│   │   └── orders.json         # Order history with status
│   ├── build-db.js            # Database builder script
│   ├── routes.json            # API route mappings
│   └── db.json                # Generated database (auto-built)
└── package.json               # Root dependencies and scripts
```

## 🔄 API Endpoints

### **Products**
- `GET /api/products` - Get products with pagination
- `GET /api/products?_page=1&_limit=30` - Paginated products
- `GET /api/products?q=search` - Search products
- `GET /api/products?category=beverages` - Filter by category

### **Inventory**
- `GET /api/inventory` - Get all inventory
- `GET /api/inventory?productId=123` - Get inventory by product
- `PATCH /api/inventory/:id` - Update stock levels

### **Orders**
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id` - Update order status with history

### **Categories**
- `GET /api/categories` - Get all categories

## 🍳 Kitchen Workflow

### **Order Status Flow**
```
PREPARING → READY → DELIVERED
     ↓
  CANCELLED
```

### **Kitchen Display Features**
- **4-Column Kanban Layout**: Preparing | Ready | Delivered | Cancelled
- **Status Transition Buttons**: Move orders between states with API updates
- **Real-time Updates**: Auto-refresh every 30 seconds with proper cleanup
- **Manual Refresh**: On-demand updates with loading states
- **Order Details**: Items, prices, timestamps, and customer info
- **Status History**: Complete audit trail of all status changes
- **Responsive Design**: Adapts to tablets and mobile devices

### **Kitchen Management**
- **Order Cards**: Compact view with essential information
- **Time Tracking**: Shows order time and elapsed time
- **Item Summary**: First 2 items with "more" indicator
- **Action Buttons**: Context-aware status transition buttons
- **Empty States**: Friendly messages when no orders in each status

## 📱 Responsive Features

### **Mobile (< 768px)**
- **Vertical Layout**: Columns stack vertically with scroll
- **Horizontal Scroll**: Orders scroll within columns
- **Compact Cards**: Smaller fonts and spacing
- **Touch Buttons**: Larger touch targets
- **Simplified Text**: Shorter button labels

### **Desktop/Tablet**
- **4-Column Layout**: Side-by-side columns
- **Full Details**: Complete order information
- **Hover Effects**: Interactive feedback
- **Keyboard Navigation**: Full accessibility support

## 🔧 Development Scripts

```bash
# Complete development environment
npm run dev                 # Start API + Frontend + Auto-rebuild

# Individual services
npm run start:api          # Start json-server only
npm run start:frontend     # Start React app only
npm run build:db           # Build database from separate files

# Database management
npm run watch:db           # Watch for changes and rebuild
npm run dev:api            # API server with auto-rebuild

# Production
npm run build              # Build React app for production
```

## 🗄️ Database Architecture

### **Decoupled Structure**
- **Separate JSON files** for each data type
- **Auto-build system** combines files into single database
- **Version control friendly** - smaller, focused files
- **Team collaboration** - multiple developers can work on different data

### **Data Management**
```bash
# Edit data in separate files
api-data/separate/products.json    # Add/edit products
api-data/separate/inventory.json   # Manage stock levels
api-data/separate/orders.json      # Order history

# Database auto-rebuilds on changes
npm run dev  # Watches for changes and rebuilds db.json
```

### **Sample Data**
- **100 Products** across 14 categories
- **Real inventory** with stock levels
- **Order samples** with complete status history
- **Categories** with proper relationships

## 🎯 Performance Optimizations

### **Bundle Size (Gzipped)**
- **JavaScript**: ~80.93 kB (includes all features)
- **CSS**: ~8.75 kB (responsive design)
- **Total Bundle**: ~89.68 kB (Under 90kB!)

### **Loading Optimizations**
- **Lazy Loading**: Products load 30 at a time with Intersection Observer
- **Code Splitting**: Route-based code splitting
- **Image Optimization**: Lazy loading with placeholder states
- **API Caching**: Smart caching with service worker v2

### **Performance Features**
- **Infinite Scroll**: Smooth product loading
- **Debounced Search**: Optimized search performance
- **Memoized Components**: Prevent unnecessary re-renders
- **Efficient State Updates**: Optimized Redux actions

## 🔍 Troubleshooting

### **Common Issues**

1. **App keeps reloading after refresh**
   - **Solution**: Service worker cache updated to v2
   - Clear browser cache or hard refresh (Ctrl+Shift+R)

2. **API calls failing**
   - Ensure json-server is running on port 5000
   - Check if `db.json` exists and is valid
   - Verify network tab for failed requests

3. **Kitchen Display not updating**
   - Check if orders exist in database
   - Use manual refresh button
   - Verify API endpoints are responding

4. **Products not loading with lazy loading**
   - Check if products.json has data
   - Verify Intersection Observer is working
   - Check browser console for errors

5. **Multiple tabs causing issues**
   - Polling is properly cleaned up on unmount
   - Each tab manages its own intervals
   - Service worker cache prevents conflicts

## 🧪 Testing

### **Manual Testing Workflows**

1. **Product Browsing**
   - Load products page → Verify 30 products load
   - Scroll to bottom → More products load automatically
   - Search for items → Results filter correctly

2. **Cart Management**
   - Add items to cart → Cart badge updates
   - Modify quantities → Totals recalculate
   - Remove items → Cart updates correctly

3. **Order Processing**
   - Complete checkout → Order created with PREPARING status
   - Check Kitchen Display → Order appears in Preparing column
   - Move order through statuses → API updates correctly

4. **Kitchen Workflow**
   - Open Kitchen Display → Orders load in correct columns
   - Click status buttons → Orders move between columns
   - Refresh manually → Latest data loads

### **Offline Testing**
```bash
1. Load app online → Cache files
2. Go offline → App still works
3. Add items to cart → Functions offline
4. Complete checkout → Order queued
5. Go online → Data syncs
```

## 🚀 Deployment

### **Production Build**
```bash
npm run build              # Build React app
npm run build:db           # Build final database
```

### **Hosting Options**
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **Traditional Server**: Apache, Nginx with API proxy
- **Full Stack**: Deploy json-server alongside React app

### **Environment Configuration**
- **API Base URL**: Configure in `services/api.js`
- **Service Worker**: Update cache version for deployments
- **Database**: Ensure `db.json` is built and accessible

## 🎨 UI/UX Features

### **Design System**
- **Consistent Colors**: Primary blue, success green, warning yellow
- **Typography**: Responsive font sizes and weights
- **Spacing**: Consistent padding and margins
- **Icons**: Emoji-based icons for universal recognition

### **Accessibility**
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: ARIA labels and semantic HTML
- **Color Contrast**: WCAG compliant color combinations
- **Touch Targets**: Minimum 44px touch targets

### **User Experience**
- **Loading States**: Spinners and skeleton screens
- **Error Handling**: Friendly error messages
- **Empty States**: Helpful guidance when no data
- **Confirmation Dialogs**: Prevent accidental actions

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### **Development Guidelines**
- Use route constants from `Constants.js`
- Follow existing component patterns
- Add proper error handling
- Test responsive design
- Update documentation

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Future Enhancements

- **WebSocket Integration** - Real-time updates without polling
- **Payment Gateway** - Stripe/PayPal integration
- **Advanced Analytics** - Sales reports and insights
- **Multi-location Support** - Multiple restaurant locations
- **User Authentication** - Role-based access control
- **Thermal Printer Integration** - Direct printer support
- **Voice Commands** - Hands-free operation
- **Barcode Scanning** - Product scanning capabilities

## 📞 Support

For technical support or questions:
- Check existing GitHub issues
- Create new issue with detailed description
- Include browser/device information
- Provide steps to reproduce problems

---

**Built with ❤️ for the food service industry**

> This POS system is designed to be lightweight, fast, and reliable for daily restaurant operations with modern web technologies.