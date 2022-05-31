import { dispatch } from "../store";

const { createSlice } = require("@reduxjs/toolkit");
// event reducer initial state
const initialState = {
	loading: false,
	data: undefined,
	requestComplete: false,
};
// event slice for event reducer
const eventsSlice = createSlice({
	name: "events",
	initialState,
	reducers: {
		startLoading: (state) => {
			state.loading = true;
		},
		addEventsDetails(state, action) {
			state.data = action.payload;
			state.requestComplete = true;
			state.loading = false;
		},
	},
});

export default eventsSlice.reducer;

// action to fetch events
export function getEvents(token, owner, repo) {
	console.log({ token, owner, repo });
	dispatch(eventsSlice.actions.startLoading());
	try {
		fetch(`https://api.github.com/networks/${owner}/${repo}/events`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization: `token ${token}`,
			},
		})
			.then((res) => res.json())
			.then((d) => {
				dispatch(eventsSlice.actions.addEventsDetails(d));
			});
	} catch (error) {
		console.error(error);
	}
}
