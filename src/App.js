import logo from "./logo.svg";
import "./App.css";
import { GithubLogin } from "./utils/Github";
import { useSelector } from "./redux/store";
import { authorize } from "./redux/reducers/login-reducer";
import React from "react";
import { getUser } from "./redux/reducers/user-reducer";
import { getOrgs } from "./redux/reducers/orgs-reducer";
import { getRepos } from "./redux/reducers/repos-reducer";
import { getEvents } from "./redux/reducers/events-reducer";

function App() {
	// selector for login data from redux store
	const { data: loginData } = useSelector((state) => state.login);
	// selector for user  data from redux store
	const { data: userData, loading: userDataLoading } = useSelector(
		(state) => state.user
	);

	// selector for repos of the user   from redux store
	const {
		data: reposData,
		loading: repoLoading,
		requestComplete: repoFetchCompleted,
	} = useSelector((state) => state.repos);
	// selector for events of repo   from redux store
	const {
		data: eventsData,
		loading: eventsLoading,
		requestComplete: eventFetchCompleted,
	} = useSelector((state) => state.events);
	// if login data is  available, then fetch user data
	React.useEffect(() => {
		if (loginData && loginData.access_token) {
			getUser(loginData.access_token);
		}
	}, [loginData]);
	// if user data is  available, then fetch repos data
	React.useEffect(() => {
		if (userData) {
			getRepos(loginData.access_token, userData.repos_url);
		}
	}, [userData]);

	// loginData && loginData.access_token, if login data is not avaliable the login with github button will be shown
	return (
		<div className="App">
			{loginData && loginData.access_token ? (
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-around",
					}}
				>
					<div>
						<h1>Repos</h1>
						{repoLoading ? <div>Loading...</div> : null}
						{!repoLoading &&
						repoFetchCompleted &&
						reposData &&
						reposData.length > 0 ? (
							<ul
								style={{
									listStyle: "none",
								}}
							>
								{reposData.map((repo, index) => (
									<li
										key={repo.html_url}
										style={{ cursor: "pointer" }}
										onClick={() => {
											getEvents(
												loginData.access_token,
												repo.owner.login,
												repo.name
											);
										}}
									>
										{repo.name}
									</li>
								))}
							</ul>
						) : null}
						{!repoLoading &&
							repoFetchCompleted &&
							reposData &&
							reposData.length === 0 && <p>Events not found</p>}
					</div>
					<div>
						<h1>Events</h1>
						{eventsLoading ? <div>Loading...</div> : null}
						{!eventsLoading &&
						eventFetchCompleted &&
						eventsData &&
						eventsData.length > 0 ? (
							<ul
								style={{
									listStyle: "none",
								}}
							>
								{eventsData.map((event, index) => (
									<li
										key={event.id}
										style={{ cursor: "pointer" }}
									>
										{event.type} - {event.repo.name}
									</li>
								))}
							</ul>
						) : null}
						{!eventsLoading &&
							eventFetchCompleted &&
							eventsData &&
							eventsData.length === 0 && <p>Events not found</p>}
					</div>
				</div>
			) : (
				<GithubLogin
					clientId={process.env.REACT_APP_CLIENT_ID}
					redirectUri={process.env.REACT_APP_PUBLIC_URL}
					onSuccess={(data) => {
						console.log(data);
						authorize(
							process.env.REACT_APP_CLIENT_ID,
							process.env.REACT_APP_CLIENT_SECRET,
							data.code,
							process.env.REACT_APP_PUBLIC_URL
						);
					}}
					onError={(err) => {
						console.log(err);
					}}
				/>
			)}
		</div>
	);
}

export default App;
