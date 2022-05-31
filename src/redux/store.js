import { configureStore } from "@reduxjs/toolkit";
import {
	useDispatch as useAppDispatch,
	useSelector as useAppSelector,
} from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import { rootPersistConfig, rootReducer } from "./RootReducer";

// ----------------------------------------------------------------------
// configuring redux store
const store = configureStore({
	reducer: persistReducer(rootPersistConfig, rootReducer), // persist (save to local storage) the root reducer
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
			immutableCheck: false,
		}),
});
// common presistor
const persistor = persistStore(store);
// to dispatch the action
const { dispatch } = store;
// to select the state
const useSelector = useAppSelector;
// hook to dispatch the action
const useDispatch = () => useAppDispatch();

export { store, persistor, dispatch, useSelector, useDispatch };
