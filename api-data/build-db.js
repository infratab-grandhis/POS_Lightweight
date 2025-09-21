#!/usr/bin/env node

/**
 * 🏗️ Database Builder for POS System
 * 
 * This script combines separate data files into a single db.json
 * for json-server while keeping data organized in separate files.
 */

const fs = require('fs');
const path = require('path');

console.log('🏗️  Building database from separate files...\n');

try {
    // Define file paths
    const separateDir = path.join(__dirname, 'separate');
    const outputFile = path.join(__dirname, 'db.json');
    
    // Check if separate directory exists
    if (!fs.existsSync(separateDir)) {
        console.error('❌ Error: separate/ directory not found!');
        console.log('💡 Run: mkdir -p api-data/separate');
        process.exit(1);
    }
    
    // Read separate files
    const products = JSON.parse(fs.readFileSync(path.join(separateDir, 'products.json'), 'utf8'));
    const inventory = JSON.parse(fs.readFileSync(path.join(separateDir, 'inventory.json'), 'utf8'));
    const categories = JSON.parse(fs.readFileSync(path.join(separateDir, 'categories.json'), 'utf8'));
    const orders = JSON.parse(fs.readFileSync(path.join(separateDir, 'orders.json'), 'utf8'));
    
    // Combine into single database object (json-server only supports objects/arrays)
    const database = {
        products,
        inventory,
        orders,
        categories
    };
    
    // Write combined database
    fs.writeFileSync(outputFile, JSON.stringify(database, null, 2));
    
    // Success report
    console.log('✅ Database built successfully!');
    console.log('📊 Statistics:');
    console.log(`   📦 Products: ${products.length}`);
    console.log(`   📋 Inventory: ${inventory.length}`);
    console.log(`   📁 Categories: ${categories.length}`);
    console.log(`   🧾 Orders: ${orders.length}`);
    console.log(`\n💾 Output: ${outputFile}`);
    console.log(`📏 Size: ${Math.round(fs.statSync(outputFile).size / 1024)}KB`);
    console.log('\n🚀 Ready for json-server!');
    
} catch (error) {
    console.error('❌ Error building database:', error.message);
    process.exit(1);
}
