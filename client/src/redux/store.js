import {configureStore,combineReducers} from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import themeReducer from './theme/themeSlice'
import storage from 'redux-persist/lib/storage';
import {persistReducer,persistStore} from 'redux-persist'

const rootReducer = combineReducers({
    'user': userReducer,
    'theme': themeReducer
})

const persistConfig = {
    key: 'root',
    storage,
    version: 1
}

const newPersistReducer = persistReducer(persistConfig,rootReducer);

export const store = configureStore({
    reducer: newPersistReducer,
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck: false})
});

export const persistor = persistStore(store);