import { dispatch } from "../store";

const { createSlice } = require("@reduxjs/toolkit");
// login reducer initial state
const initialState = {
	loading: false,

	isLoggedIn: false,
	data: undefined,
	requestComplete: false,
};
// login reducer
const loginSlice = createSlice({
	name: "login",
	initialState,
	reducers: {
		startLoading: (state) => {
			state.loading = true;
		},
		addLoginDetails(state, action) {
			console.log(action);
			state.isLoggedIn = true;
			state.data = action.payload;
			state.requestComplete = true;
			state.loading = false;
		},
		markLoggedOut(state) {
			return initialState;
		},
	},
});

export default loginSlice.reducer;
// to authorize user
export function authorize(client_id, client_secret, code, redirect_uri) {
	dispatch(loginSlice.actions.startLoading());
	try {
		const data = new FormData();
		data.append("client_id", client_id);
		data.append("client_secret", client_secret);
		data.append("code", code);
		data.append("state", "github-login");

		fetch("https://github.com/login/oauth/access_token", {
			method: "POST",
			body: data,
			headers: {
				Accept: "application/json",
			},
		})
			.then((res) => res.json())
			.then((d) => {
				dispatch(loginSlice.actions.addLoginDetails(d));
			});
	} catch (error) {
		console.error(error);
	}
}
