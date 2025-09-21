# 🗂️ Decoupled Database Structure

## 📁 **New Organization**

Your POS database is now split into **organized, maintainable files**:

```
api-data/
├── 📂 separate/           # Source data files (edit these!)
│   ├── 📄 products.json   # 100 products (600+ lines)
│   ├── 📄 inventory.json  # 100 inventory entries (500+ lines)
│   ├── 📄 categories.json # 14 categories (clean & simple)
│   └── 📄 orders.json     # Orders history (starts empty)
├── 📄 db.json            # Auto-generated combined file
├── 📄 routes.json        # API routing configuration  
├── 🏗️ build-db.js        # Build script (combines files)
└── 📖 README.md          # This documentation
```

---

## 🎯 **How It Works**

### **1. Edit Separate Files**
Work with clean, focused files:
- **`products.json`**: Add/edit products
- **`inventory.json`**: Manage stock levels
- **`categories.json`**: Organize menu categories
- **`orders.json`**: Orders data (usually empty)

### **2. Auto-Build Combined Database**
The `build-db.js` script automatically combines your separate files into the `db.json` that json-server uses.

### **3. json-server Uses Combined File**
json-server runs as before, but with auto-generated data!

---

## 🚀 **Commands**

### **🏗️ Build Database**
```bash
npm run build:db
```
Combines separate files → `db.json`

### **🔄 Development Mode (Auto-rebuild)**
```bash
npm run dev
```
- Watches `separate/` files for changes
- Auto-rebuilds `db.json` when files change
- Runs json-server + React frontend
- **Perfect for development!**

### **🎬 Production Start**
```bash
npm start
```
- Builds database once
- Runs json-server + React frontend
- **Use this for production**

### **📡 API Only**
```bash
npm run dev:api
```
Just the API server with auto-rebuild

---

## ✅ **Benefits of This Structure**

### **🧹 Clean Organization**
- **Small, focused files** instead of 3000-line monster
- **Easy to find** specific products or categories
- **Team collaboration** - different people can work on different files

### **🎯 Maintainable**
- **Edit products** without scrolling through inventory
- **Add categories** without touching product data  
- **Version control** works better with smaller files

### **🔄 Development Friendly**
- **Auto-rebuild** when you change any data file
- **Live reload** with json-server
- **No manual merging** - just edit and save!

### **🚀 Production Ready**
- **Same performance** as before
- **Single db.json** for json-server
- **No complexity** for production deployment

---

## 📝 **Usage Examples**

### **Adding New Products**
1. Open `separate/products.json`
2. Add your product to the array
3. Save the file
4. Database auto-rebuilds!

### **Managing Categories** 
1. Open `separate/categories.json`
2. Add/edit categories
3. Save - done!

### **Updating Inventory**
1. Open `separate/inventory.json`
2. Change stock levels
3. Auto-rebuild happens

### **Team Development**
- **Person A**: Works on `products.json`
- **Person B**: Works on `categories.json` 
- **Person C**: Works on `inventory.json`
- **No merge conflicts!**

---

## 🔧 **File Sizes**

| File | Size | Lines | Purpose |
|------|------|-------|---------|
| `products.json` | ~45KB | ~1,900 | Product catalog |
| `inventory.json` | ~5KB | ~500 | Stock management |
| `categories.json` | ~1KB | ~85 | Menu organization |
| `orders.json` | ~1KB | ~2 | Order history |
| **Combined `db.json`** | **~52KB** | **~2,980** | **json-server** |

---

## ⚡ **Quick Start**

```bash
# 1. Install dependencies
npm install

# 2. Development with auto-rebuild
npm run dev

# 3. Edit any file in api-data/separate/
# 4. Watch auto-rebuild happen!
# 5. Your changes are live instantly!
```

---

## 🛠️ **Advanced Usage**

### **Custom Build Script**
The `build-db.js` script can be customized:
- Add validation
- Transform data
- Add computed fields
- Generate timestamps

### **Multiple Environments**
Create different folders:
```
api-data/
├── separate/           # Development data
├── separate-staging/   # Staging data  
├── separate-prod/      # Production data
```

### **Backup Strategy**
```bash
# Backup just your source data
tar -czf backup.tar.gz api-data/separate/

# The db.json can always be regenerated!
```

---

## 🎉 **Perfect For**

- ✅ **Large product catalogs** (100+ items)
- ✅ **Team development** (multiple editors)
- ✅ **Clean maintenance** (organized files)
- ✅ **Version control** (meaningful diffs)
- ✅ **Rapid development** (auto-rebuild)

---

## 🆘 **Troubleshooting**

### **Build Fails?**
```bash
# Check if separate files exist
ls api-data/separate/

# Manual build
node api-data/build-db.js
```

### **json-server Issues?**
```bash
# Rebuild and restart
npm run build:db
npm run dev:api
```

### **Files Not Updating?**
```bash
# Force rebuild
npm run build:db

# Check nodemon is watching
npm run watch:db
```

---

**🎯 Result: Clean, maintainable, team-friendly database structure while keeping all the json-server benefits!**
