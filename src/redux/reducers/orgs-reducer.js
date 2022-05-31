import { dispatch } from "../store";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
	loading: false,
	data: undefined,
	requestComplete: false,
};

const orgsSlice = createSlice({
	name: "orgs",
	initialState,
	reducers: {
		startLoading: (state) => {
			state.loading = true;
		},
		addOrgsDetails(state, action) {
			state.data = action.payload;
			state.requestComplete = true;
			state.loading = false;
		},
	},
});

export default orgsSlice.reducer;
export function getOrgs(token, org_url) {
	dispatch(orgsSlice.actions.startLoading());
	try {
		fetch(org_url, {
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization: `token ${token}`,
			},
		})
			.then((res) => res.json())
			.then((d) => {
				dispatch(orgsSlice.actions.addOrgsDetails(d));
			});
	} catch (error) {
		console.error(error);
	}
}
