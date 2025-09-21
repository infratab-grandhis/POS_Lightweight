// Offline Sync Utility
// Handles automatic sync when network comes back online

import store from '../Redux/store';
import { syncOfflineOrders } from '../Redux/Order/action';

class OfflineSync {
    constructor() {
        this.isOnline = navigator.onLine;
        this.setupNetworkListeners();
    }

    setupNetworkListeners() {
        window.addEventListener('online', () => {
            this.handleOnline();
        });

        window.addEventListener('offline', () => {
            this.handleOffline();
        });
    }

    handleOnline() {
        this.isOnline = true;
        
        // Trigger sync after a short delay to ensure network is stable
        setTimeout(() => {
            this.syncPendingOrders();
        }, 1000);
    }

    handleOffline() {
        this.isOnline = false;
    }

    async syncPendingOrders() {
        if (!this.isOnline) {
            return;
        }

        const pendingCount = this.getPendingOrdersCount();

        if (pendingCount === 0) {
            return;
        }

        try {
            // Dispatch sync action
            store.dispatch(syncOfflineOrders());
        } catch (error) {
            // Sync failed, will retry on next online event
        }
    }

    // Manual sync trigger
    async manualSync() {
        if (!this.isOnline) {
            throw new Error('Cannot sync while offline');
        }
        
        return this.syncPendingOrders();
    }

    // Get pending orders count
    getPendingOrdersCount() {
        const state = store.getState();
        const pendingOrders = state.orderReducer.orderHistory.filter(
            order => order.syncStatus === 'pending'
        );
        return pendingOrders.length;
    }
}

// Create and export singleton instance
const offlineSync = new OfflineSync();
export default offlineSync;
