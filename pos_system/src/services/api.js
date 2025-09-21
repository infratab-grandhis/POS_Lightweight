const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
    constructor() {
        this.isOnline = navigator.onLine;
        this.setupNetworkListeners();
    }

    setupNetworkListeners() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            // Network connection restored
            // Trigger sync when back online
            window.dispatchEvent(new CustomEvent('network-restored'));
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            // Working offline mode
        });
    }

    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        if (config.body && typeof config.body === 'object') {
            config.body = JSON.stringify(config.body);
        }

        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                // For json-server, errors are usually simple
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            
            // Extract pagination info from headers for json-server
            const totalCount = response.headers.get('X-Total-Count');
            const linkHeader = response.headers.get('Link');
            
            if (totalCount) {
                return {
                    success: true,
                    data: Array.isArray(data) ? data : [data],
                    pagination: {
                        total: parseInt(totalCount),
                        hasNext: linkHeader?.includes('rel="next"'),
                        hasPrev: linkHeader?.includes('rel="prev"')
                    }
                };
            }
            
            return {
                success: true,
                data: Array.isArray(data) ? data : data
            };
        } catch (error) {
            // API request failed
            
            if (!this.isOnline) {
                throw new Error('OFFLINE');
            }
            
            throw error;
        }
    }

    // Products API with json-server pagination and filtering
    async getProducts(params = {}) {
        const jsonServerParams = {};
        
        // Convert common params to json-server format
        if (params.page) {
            jsonServerParams._page = params.page;
        }
        if (params.limit) {
            jsonServerParams._limit = params.limit;
        }
        if (params.category) {
            jsonServerParams.category = params.category;
        }
        if (params.search) {
            jsonServerParams.q = params.search; // json-server full-text search
        }
        if (params.sortBy) {
            jsonServerParams._sort = params.sortBy;
            jsonServerParams._order = params.sortOrder || 'desc';
        }
        if (params.inStock === 'true') {
            // This will require a custom filter on frontend
            jsonServerParams._expand = 'inventory'; 
        }
        
        const queryString = new URLSearchParams(jsonServerParams).toString();
        return this.request(`/products${queryString ? `?${queryString}` : ''}`);
    }

    async getProductById(id) {
        return this.request(`/products/${id}`);
    }

    async getProductCategories() {
        return this.request('/categories');
    }

    // Inventory API (adapted for json-server)
    async getInventory(params = {}) {
        const jsonServerParams = {};
        
        if (params.page) jsonServerParams._page = params.page;
        if (params.limit) jsonServerParams._limit = params.limit;
        if (params.productId) jsonServerParams.productId = params.productId;
        
        const queryString = new URLSearchParams(jsonServerParams).toString();
        return this.request(`/inventory${queryString ? `?${queryString}` : ''}`);
    }

    async getInventoryByProductId(productId) {
        return this.request(`/inventory?productId=${productId}`);
    }

    async updateInventoryStock(inventoryId, data) {
        return this.request(`/inventory/${inventoryId}`, {
            method: 'PATCH', // json-server uses PATCH for partial updates
            body: data
        });
    }

    // For json-server, we'll simulate stock operations by updating inventory directly
    async reserveStock(items) {
        const results = [];
        for (const item of items) {
            const inventoryResponse = await this.getInventoryByProductId(item.productId);
            const inventory = inventoryResponse.data[0];
            
            if (inventory && inventory.available >= item.quantity) {
                const updatedInventory = await this.updateInventoryStock(inventory.id, {
                    available: inventory.available - item.quantity,
                    reserved: inventory.reserved + item.quantity
                });
                results.push(updatedInventory);
            }
        }
        return { success: true, data: results };
    }

    async releaseReservedStock(items) {
        const results = [];
        for (const item of items) {
            const inventoryResponse = await this.getInventoryByProductId(item.productId);
            const inventory = inventoryResponse.data[0];
            
            if (inventory && inventory.reserved >= item.quantity) {
                const updatedInventory = await this.updateInventoryStock(inventory.id, {
                    available: inventory.available + item.quantity,
                    reserved: inventory.reserved - item.quantity
                });
                results.push(updatedInventory);
            }
        }
        return { success: true, data: results };
    }

    async confirmStockConsumption(items) {
        const results = [];
        for (const item of items) {
            const inventoryResponse = await this.getInventoryByProductId(item.productId);
            const inventory = inventoryResponse.data[0];
            
            if (inventory && inventory.reserved >= item.quantity) {
                const updatedInventory = await this.updateInventoryStock(inventory.id, {
                    reserved: inventory.reserved - item.quantity
                });
                results.push(updatedInventory);
            }
        }
        return { success: true, data: results };
    }

    async getLowStockAlerts() {
        // json-server doesn't support complex queries, so we'll filter on frontend
        const response = await this.request('/inventory');
        const lowStockItems = response.data.filter(item => item.available <= item.reorderLevel);
        return {
            success: true,
            data: { alerts: lowStockItems, totalAlerts: lowStockItems.length }
        };
    }

    // Orders API (adapted for json-server)
    async getOrders(params = {}) {
        const jsonServerParams = {};
        
        if (params.page) jsonServerParams._page = params.page;
        if (params.limit) jsonServerParams._limit = params.limit;
        if (params.status) jsonServerParams.status = params.status;
        if (params.sortBy) {
            jsonServerParams._sort = params.sortBy;
            jsonServerParams._order = params.sortOrder || 'desc';
        }
        
        const queryString = new URLSearchParams(jsonServerParams).toString();
        return this.request(`/orders${queryString ? `?${queryString}` : ''}`);
    }

    async getOrderById(id) {
        return this.request(`/orders/${id}`);
    }

    async createOrder(orderData) {
        // Generate ID if not provided and add timestamps
        const order = {
            ...orderData,
            id: orderData.id || `ord_${Date.now()}`,
            status: orderData.status || 'PREPARING', // Ensure status is always set
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        return this.request('/orders', {
            method: 'POST',
            body: order
        });
    }

    async updateOrderStatus(id, statusData) {
        // json-server uses PATCH for partial updates
        const updateData = {
            ...statusData,
            updatedAt: new Date().toISOString()
        };
        
        return this.request(`/orders/${id}`, {
            method: 'PATCH',
            body: updateData
        });
    }

    async syncOfflineOrders(orders) {
        // For json-server, we'll create orders individually
        const results = [];
        for (const order of orders) {
            try {
                const result = await this.createOrder({
                    ...order,
                    syncStatus: 'synced',
                    offlineCreated: true
                });
                results.push(result);
            } catch (error) {
                // Failed to sync order
                results.push({ error: error.message, orderId: order.orderId });
            }
        }
        return { success: true, data: { syncResults: results } };
    }

    async getPendingSyncOrders(deviceId) {
        const params = { syncStatus: 'pending' };
        if (deviceId) params.deviceId = deviceId;
        return this.getOrders(params);
    }

    async getOrderAnalytics(period = '7d') {
        // For json-server, we'll get all orders and calculate analytics on frontend
        const response = await this.request('/orders');
        const orders = response.data;
        
        // Simple analytics calculation (you can enhance this)
        const now = new Date();
        const periodMs = period === '1d' ? 24 * 60 * 60 * 1000 : 
                        period === '7d' ? 7 * 24 * 60 * 60 * 1000 : 
                        30 * 24 * 60 * 60 * 1000;
        
        const recentOrders = orders.filter(order => 
            new Date(order.createdAt) >= new Date(now - periodMs)
        );
        
        const analytics = {
            totalOrders: recentOrders.length,
            totalRevenue: recentOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0),
            completedOrders: recentOrders.filter(order => order.status === 'completed').length,
            cancelledOrders: recentOrders.filter(order => order.status === 'cancelled').length
        };
        
        return {
            success: true,
            data: { summary: analytics }
        };
    }
}

// Create and export singleton instance
const apiService = new ApiService();
export default apiService;