import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import reposReducer from "./reducers/repos-reducer";
import loginReducer from "./reducers/login-reducer";
import userReducer from "./reducers/user-reducer";
import orgsReducer from "./reducers/orgs-reducer";
import eventsReducer from "./reducers/events-reducer";
const rootPersistConfig = {
	key: "root",
	storage,
	keyPrefix: "redux-",
	whitelist: ["login"],
};
// login reducer presist config
const loginPersistConfig = {
	key: "login",
	storage,
	keyPrefix: "redux-",
	whitelist: [],
};
// user reducer presist config
const userPersistConfig = {
	key: "user",
	storage,
	keyPrefix: "redux-",
	whitelist: [],
};
// root reducer
const rootReducer = combineReducers({
	login: persistReducer(loginPersistConfig, loginReducer),
	user: persistReducer(userPersistConfig, userReducer),
	orgs: orgsReducer,
	repos: reposReducer,
	events: eventsReducer,
});

export { rootPersistConfig, rootReducer };
