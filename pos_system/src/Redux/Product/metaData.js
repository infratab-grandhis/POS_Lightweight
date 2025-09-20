const products = [
    {
        "id": "2001",
        "label": "Burger",
        "price": 200,
        "image": "https://cdn.pixabay.com/photo/2014/10/23/18/05/burger-500054_960_720.jpg",
        "isMainIngredient": true,
        "customization": [
            {
                "id": "2001_c1",
                "label": "Extra Cheese",
                "price": 50,
                "isMainIngredient": false
            },
            {
                "id": "2001_c2",
                "label": "Double Extra Cheese",
                "price": 100,
                "isMainIngredient": false
            }
        ]
    },
    {
        "id": "2002",
        "label": "Pizza",
        "price": 250,
        "image": "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_960_720.jpg",
        "isMainIngredient": true,
        "customization": [
            {
                "id": "2002_c1",
                "label": "Extra Cheese",
                "price": 50,
                "isMainIngredient": false
            },
            {
                "id": "2002_c2",
                "label": "Double Extra Cheese",
                "price": 100,
                "isMainIngredient": false
            },
            {
                "id": "2002_c3",
                "label": "Sauce",
                "price": 30,
                "isMainIngredient": false
            }
        ]
    },
    {
        "id": "2003",
        "label": "Lemonade",
        "price": 200,
        "image": "https://images.unsplash.com/photo-1470337458703-46ad1756a187",
        "isMainIngredient": true
    },
    {
        "id": "2004",
        "label": "Wrap",
        "price": 200,
        "image": "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
        "isMainIngredient": true,
        "customization": [
            {
                "id": "2004_c1",
                "groupId": "c3",
                "label": "Mayo",
                "price": 100,
                "isMainIngredient": false
            },
            {
                "id": "2004_c2",
                "groupId": "c3",
                "label": "BBQ",
                "price": 50,
                "isMainIngredient": false
            }
        ]
    }
];

const inventory = [
    {
        "productId": "2001",
        "unit": "pieces",
        "available": 25
    },
    {
        "productId": "2002",
        "unit": "servings",
        "available": 40
    },
    {
        "productId": "2003",
        "unit": "cups",
        "available": 60
    },
    {
        "productId": "2004",
        "unit": "wraps",
        "available": 18
    }
];

export default {products, inventory}