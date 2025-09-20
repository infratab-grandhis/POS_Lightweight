import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import orderReducer from './Order/reducer';
import productReducer from './Product/reducer';
import notificationReducer from './Notification/reducer';

const rootReducer = combineReducers({
    orderReducer,
    productReducer,
    notificationReducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['orderReducer'], // Don't persist notifications
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export default store;