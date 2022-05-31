import { dispatch } from "../store";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
	loading: false,
	data: undefined,
	requestComplete: false,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		startLoading: (state) => {
			state.loading = true;
		},
		addUserDetails(state, action) {
			state.data = action.payload;
			state.requestComplete = true;
			state.loading = false;
		},
		resetUserDetails(state) {
			return initialState;
		},
	},
});

export default userSlice.reducer;
export function getUser(token) {
	dispatch(userSlice.actions.startLoading());
	try {
		fetch("https://api.github.com/user", {
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization: `token ${token}`,
			},
		})
			.then((res) => res.json())
			.then((d) => {
				dispatch(userSlice.actions.addUserDetails(d));
			});
	} catch (error) {
		console.error(error);
	}
}
