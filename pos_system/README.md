# 🍔 Food Truck POS System

A modern, lightweight Point of Sale (POS) system built with React, designed specifically for food trucks and small restaurants. Features real-time inventory management, cart functionality, order history, and receipt printing.

## 🚀 Features

### 🎯 Core Functionality
- **Product Catalog**: Browse food items with images and pricing
- **Smart Cart**: Add/remove items with real-time quantity management
- **Inventory Tracking**: Live stock monitoring with low-stock alerts
- **Order Processing**: Complete checkout flow with order confirmation
- **Receipt Printing**: Professional thermal receipt printing
- **Order History**: View and track past orders
- **Search & Filter**: Find products quickly with search functionality

### 🔧 Technical Features
- **React 18**: Latest React with hooks and modern patterns
- **Redux Toolkit**: Efficient state management with notification system
- **Modern UI**: Toast notifications and confirmation dialogs
- **Responsive Design**: Mobile-first design that works on all devices
- **PWA Ready**: Progressive Web App capabilities
- **Performance Optimized**: Lazy loading, code splitting, and optimized bundle
- **Accessibility**: WCAG compliant with keyboard navigation and screen readers
- **Print Integration**: React-to-print for receipt generation

### 📱 Device Support
- **Mobile**: Optimized for tablet and phone POS systems
- **Landscape/Portrait**: Adaptive layouts for both orientations
- **Touch-Friendly**: Large buttons and touch targets
- **Offline Capable**: Basic functionality works offline

## 🏗️ Installation & Setup

### Prerequisites
- Node.js 16.x or higher
- npm 7.x or higher

### Quick Start
```bash
# Clone the repository
git clone <repository-url>
cd pos_system

# Install dependencies
npm install

# Build for production (REQUIRED FIRST STEP)
npm run build

# Start the application
npm start
```

**⚠️ Important**: Always run `npm run build` before `npm start` to ensure you have the latest optimized build.

## 📦 Build Information

### Bundle Size (Gzipped)
- **JavaScript**: ~80.93 kB (includes notification system)
- **CSS**: ~8.75 kB (includes notification styling)
- **Total Bundle**: ~89.68 kB (Still under 90kB!)

### Performance Optimizations
- Code splitting for reduced initial load
- Lazy loading for images and components
- CSS minification and optimization
- Tree shaking for unused code removal
- Gzip compression for production builds

## 🛠️ Scripts

```bash
# Development server
npm start                 # Runs on http://localhost:3000

# Production build
npm run build            # Creates optimized build in /build folder

# Testing
npm test                 # Runs test suite

# Bundle analysis
npm run build && npx serve -s build   # Serve production build locally
```

## 🔄 Workflows & User Journey

### 1. Product Browsing
- **Entry Point**: Home page with product grid
- **Actions**: Browse, search, filter products
- **Features**: Stock indicators, pricing display, product images

### 2. Cart Management
- **Add Items**: Click products to add to cart with customizations
- **Quantity Control**: Adjust quantities with stock validation
- **Real-time Updates**: Cart totals update automatically
- **Stock Validation**: Prevents adding out-of-stock items

### 3. Checkout Process
- **Review Cart**: Verify items and quantities
- **Total Calculation**: Automatic tax and total computation
- **Order Confirmation**: Confirm order details
- **Receipt Options**: Print or save receipt

### 4. Order Management
- **Order History**: View all past orders
- **Receipt Reprinting**: Access previous receipts
- **Order Search**: Find specific orders quickly

### 5. Inventory Management
- **Real-time Stock**: Live inventory tracking
- **Low Stock Alerts**: Visual indicators for low stock
- **Stock Validation**: Prevents overselling
- **Automatic Updates**: Stock reduces on successful orders

## 📋 File Structure

```
pos_system/
├── public/
│   ├── index.html
│   ├── manifest.json          # PWA manifest
│   └── favicon.ico
├── src/
│   ├── Components/            # Reusable components
│   │   ├── common/           # Shared UI components
│   │   ├── PrintableReceipt.js
│   │   ├── NetworkStatus.js
│   │   └── SearchFilter.js
│   ├── Pages/                # Main page components
│   │   ├── Products.js       # Product catalog
│   │   ├── Cart.js          # Shopping cart
│   │   └── OrderHistory.js  # Order management
│   ├── Redux/               # State management
│   │   ├── Product/         # Product state
│   │   ├── Order/           # Cart & order state
│   │   └── store.js         # Redux store config
│   ├── Layouts/             # Layout components
│   └── utils/               # Utility functions
├── package.json
└── README.md
```

## 🎨 Styling & Theming

### CSS Architecture
- **CSS Custom Properties**: Consistent theming with CSS variables
- **Mobile-First**: Responsive design starting from mobile
- **Component-Scoped**: CSS modules for component isolation
- **Utility Classes**: Common utilities for spacing, colors, etc.

### Color Palette
- **Primary**: #007bff (Blue)
- **Success**: #28a745 (Green)
- **Warning**: #ffc107 (Yellow)
- **Danger**: #dc3545 (Red)
- **Light**: #f8f9fa (Light Gray)

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
- **Landscape**: Specific orientation handling

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_VERSION=$npm_package_version
REACT_APP_NAME="Food Truck POS"
```

### Print Settings
The application supports thermal receipt printing with:
- 80mm paper width
- Customizable receipt format
- Logo and business information
- Order details and totals

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

## 📈 Performance Monitoring

### Lighthouse Scores (Target)
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 90+
- **SEO**: 85+

### Bundle Analysis
```bash
# Analyze bundle size
npm run build
npx bundlephobia

# Visual bundle analyzer
npm install --save-dev webpack-bundle-analyzer
npx webpack-bundle-analyzer build/static/js/*.js
```

## 🚀 Deployment

### Production Build
```bash
# Create optimized build
npm run build

# Serve locally for testing
npx serve -s build
```

### Hosting Options
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **Traditional Server**: Apache, Nginx
- **CDN**: CloudFront, CloudFlare

### Pre-deployment Checklist
- [ ] Run `npm run build` successfully
- [ ] Test all major workflows
- [ ] Verify responsive design
- [ ] Test print functionality
- [ ] Check performance scores
- [ ] Validate accessibility
- [ ] Test offline functionality

## 🔌 Offline Testing Guide

### Quick Offline Test (5 minutes)
```bash
1. Open app online → Verify functionality
2. DevTools → Network Tab → Check "Offline"
3. Refresh page (Ctrl+R) → Should still load
4. Add items to cart → Should work
5. Complete checkout → Should process
6. Go back online → Verify data intact
```

### Comprehensive Offline Testing
1. **Service Worker Setup**
   - Load app online first (caches files automatically)
   - Check Console for "Service Worker registered" message
   - Verify in DevTools → Application → Service Workers

2. **Core Offline Functions**
   - ✅ Browse products (from cached data)
   - ✅ Search and filter (local processing)
   - ✅ Add/remove cart items
   - ✅ Checkout and order completion
   - ✅ View order history
   - ✅ Print receipts

3. **Data Persistence**
   - Cart items survive browser refresh
   - Order history persists across sessions
   - Network status indicator updates correctly

4. **Troubleshooting**
   - If "No Internet" appears: Service worker needs to cache files online first
   - Clear browser cache: DevTools → Application → Clear Storage
   - Force refresh: Ctrl+Shift+R to bypass cache

### Mobile PWA Testing
```bash
1. Open app in mobile browser
2. "Add to Home Screen" option appears
3. Install as PWA
4. Turn on Airplane Mode
5. Open PWA → Should work offline
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes with tests
4. Run build and tests
5. Submit pull request

## 📝 Changelog

### v0.1.0 (Current)
- Initial release with core POS functionality
- Product catalog and cart management
- Order processing and receipt printing
- **Modern notification system** with toast notifications
- **Accessible UI** with confirmation dialogs
- Responsive design and mobile optimization
- Performance optimizations and bundle size reduction
- Production-ready code with comprehensive documentation

## 🆘 Troubleshooting

### Common Issues

**Build Fails**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Print Not Working**:
- Ensure browser supports print API
- Check printer connectivity
- Verify receipt component renders correctly

**Bundle Too Large**:
- Check for unused dependencies
- Analyze bundle with webpack-bundle-analyzer
- Consider code splitting for large routes

## 📞 Support

For technical support or questions:
- Check existing GitHub issues
- Create new issue with detailed description
- Include browser/device information
- Provide steps to reproduce problems

---

**Built with ❤️ for the food service industry**

> This POS system is designed to be lightweight, fast, and reliable for daily restaurant operations.