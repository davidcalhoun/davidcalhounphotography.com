import React, { Fragment, useEffect } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
	useRouteMatch,
	useParams
} from "react-router-dom";
import { hot } from "react-hot-loader/root";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import reducer from "./reducers";
import { defaultSat } from "./consts";
import { Root, Gallery, Contact, About } from "./pages";
import { Header } from "./components";
import "./shared.css";
import styles from "./app.css";
import { BREAKPOINTS } from "./consts";
import { useWindowResize } from "./utils";

const middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
	middleware.push(createLogger());
}

const store = createStore(reducer, applyMiddleware(...middleware));

function App() {
	const [{ width, height, breakpoint }] = useWindowResize(BREAKPOINTS);
	document.documentElement.classList.remove("loading");

	return (
		<Provider store={store}>
			<Router>
				<React.StrictMode>
					<Header breakpoint={breakpoint} />
					<Switch>
						<Redirect exact from="/gallery" to={`/`} />
						<Route exact path={`/`}>
							<Root breakpoint={breakpoint} />
						</Route>
						<Route path={`/gallery/:galleryName`}>
							<Gallery breakpoint={breakpoint} />
						</Route>
						<Route path={`/contact`}>
							<Contact breakpoint={breakpoint} />
						</Route>
						<Route path={`/about`}>
							<About breakpoint={breakpoint} />
						</Route>
					</Switch>
				</React.StrictMode>
			</Router>
		</Provider>
	);
}

export default hot(App);
