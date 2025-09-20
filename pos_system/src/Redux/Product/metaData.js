// Generate 100 diverse food products
const generateProducts = () => {
    const categories = {
        burgers: {
            names: ['Classic Burger', 'Cheese Burger', 'Bacon Burger', 'Veggie Burger', 'Double Burger', 'BBQ Burger', 'Mushroom Burger', 'Fish Burger'],
            basePrice: 200,
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop'
        },
        pizza: {
            names: ['Margherita', 'Pepperoni', 'Supreme', 'Hawaiian', 'Meat Lovers', 'Veggie Supreme', 'BBQ Chicken', 'White Sauce'],
            basePrice: 300,
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop'
        },
        beverages: {
            names: ['Cola', 'Orange Juice', 'Apple Juice', 'Lemonade', 'Iced Tea', 'Hot Coffee', 'Cappuccino', 'Smoothie'],
            basePrice: 80,
            image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop'
        },
        snacks: {
            names: ['French Fries', 'Onion Rings', 'Chicken Wings', 'Mozzarella Sticks', 'Nachos', 'Potato Wedges', 'Chicken Nuggets', 'Spring Rolls'],
            basePrice: 120,
            image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=400&h=300&fit=crop'
        },
        sandwiches: {
            names: ['Club Sandwich', 'BLT', 'Grilled Cheese', 'Ham & Swiss', 'Turkey Club', 'Italian Sub', 'Tuna Melt', 'Chicken Sandwich'],
            basePrice: 180,
            image: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=400&h=300&fit=crop'
        },
        desserts: {
            names: ['Chocolate Cake', 'Cheesecake', 'Ice Cream', 'Apple Pie', 'Brownie', 'Cookies', 'Donut', 'Milkshake'],
            basePrice: 150,
            image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop'
        },
        salads: {
            names: ['Caesar Salad', 'Greek Salad', 'Garden Salad', 'Chicken Salad', 'Fruit Salad', 'Quinoa Salad', 'Tuna Salad', 'Asian Salad'],
            basePrice: 160,
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop'
        },
        pasta: {
            names: ['Spaghetti', 'Penne Arrabiata', 'Fettuccine Alfredo', 'Lasagna', 'Mac & Cheese', 'Carbonara', 'Bolognese', 'Pesto Pasta'],
            basePrice: 220,
            image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop'
        },
        soups: {
            names: ['Tomato Soup', 'Chicken Soup', 'Mushroom Soup', 'Minestrone', 'Corn Soup', 'Lentil Soup', 'Vegetable Soup', 'Pumpkin Soup'],
            basePrice: 100,
            image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop'
        },
        breakfast: {
            names: ['Pancakes', 'Waffles', 'French Toast', 'Eggs Benedict', 'Omelette', 'Breakfast Burrito', 'Bagel', 'Cereal Bowl'],
            basePrice: 140,
            image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400&h=300&fit=crop'
        }
    };

    const customizations = [
        { label: 'Extra Cheese', price: 50 },
        { label: 'Bacon', price: 70 },
        { label: 'Avocado', price: 60 },
        { label: 'Mushrooms', price: 40 },
        { label: 'Onions', price: 30 },
        { label: 'Mayo', price: 20 },
        { label: 'BBQ Sauce', price: 25 },
        { label: 'Spicy Sauce', price: 25 }
    ];

    const products = [];
    let productId = 3001;

    Object.entries(categories).forEach(([category, data]) => {
        data.names.forEach((name, index) => {
            const priceVariation = Math.floor(Math.random() * 50) - 25; // ±25 price variation
            const finalPrice = data.basePrice + priceVariation;
            
            // Randomly select 2-4 customizations for each product
            const selectedCustomizations = customizations
                .sort(() => 0.5 - Math.random())
                .slice(0, Math.floor(Math.random() * 3) + 2)
                .map((custom, idx) => ({
                    id: `${productId}_c${idx + 1}`,
                    label: custom.label,
                    price: custom.price,
                    isMainIngredient: false
                }));

            products.push({
                id: productId.toString(),
                label: name,
                name: name,
                category: category,
                price: finalPrice,
                image: `${data.image}&seed=${productId}`,
                isMainIngredient: true,
                customization: Math.random() > 0.3 ? selectedCustomizations : [] // 70% have customizations
            });
            
            productId++;
        });
    });

    // Extend to exactly 100 products by adding variations
    while (products.length < 100) {
        const baseProduct = products[Math.floor(Math.random() * products.length)];
        const variation = Math.floor(Math.random() * 3) + 1;
        const currentProductId = productId; // Capture current value
        
        products.push({
            ...baseProduct,
            id: currentProductId.toString(),
            label: `${baseProduct.label} ${['Special', 'Deluxe', 'Premium'][variation - 1]}`,
            name: `${baseProduct.name} ${['Special', 'Deluxe', 'Premium'][variation - 1]}`,
            price: baseProduct.price + (variation * 30),
            image: `${baseProduct.image}&variant=${variation}`,
            customization: baseProduct.customization.map(c => ({
                ...c,
                id: c.id.replace(baseProduct.id, currentProductId.toString())
            }))
        });
        
        productId++;
    }

    return products.slice(0, 100); // Ensure exactly 100 products
};

const products = generateProducts();

// Generate inventory for all 100 products
const generateInventory = (products) => {
    const units = {
        burgers: 'pieces',
        pizza: 'slices',
        beverages: 'cups',
        snacks: 'orders',
        sandwiches: 'pieces',
        desserts: 'servings',
        salads: 'bowls',
        pasta: 'plates',
        soups: 'bowls',
        breakfast: 'plates'
    };

    return products.map((product, index) => ({
        productId: product.id,
        unit: units[product.category] || 'items',
        // More predictable stock with variety
        available: index < 10 ? 20 + index : // First 10 products: 20-29 stock
                  index < 20 ? 15 : // Next 10: 15 stock
                  index < 30 ? 5 : // Next 10: 5 stock (low stock)
                  index < 35 ? 0 : // Next 5: 0 stock (out of stock for testing)
                  Math.floor(Math.random() * 40) + 10 // Rest: 10-49 stock
    }));
};

const inventory = generateInventory(products);

const metaData = {products, inventory};

export default metaData;