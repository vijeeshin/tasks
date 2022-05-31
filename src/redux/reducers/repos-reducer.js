import { dispatch } from "../store";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
	loading: false,
	data: undefined,
	requestComplete: false,
};

const reposSlice = createSlice({
	name: "repos",
	initialState,
	reducers: {
		startLoading: (state) => {
			state.loading = true;
		},
		addReposDetails(state, action) {
			state.data = action.payload;
			state.requestComplete = true;
			state.loading = false;
		},
	},
});

export default reposSlice.reducer;
export function getRepos(token, repos_url) {
	dispatch(reposSlice.actions.startLoading());
	try {
		fetch(repos_url, {
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization: `token ${token}`,
			},
		})
			.then((res) => res.json())
			.then((d) => {
				dispatch(reposSlice.actions.addReposDetails(d));
			});
	} catch (error) {
		console.error(error);
	}
}
