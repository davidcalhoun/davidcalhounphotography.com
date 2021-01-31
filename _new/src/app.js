import React, { Suspense, Fragment, useEffect, lazy } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
	useRouteMatch,
	useParams,
} from "react-router-dom";
import { hot } from "react-hot-loader/root";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import reducer from "./reducers";
import { defaultSat } from "./consts";
import { Root, Contact, About } from "./pages";
import { Header } from "./components";
import "./shared.css";
import styles from "./app.css";
import { BREAKPOINTS } from "./consts";
import { useWindowResize } from "./utils";
import LazyLoad from "./components/LazyLoad";

const middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
	middleware.push(createLogger());
}

const store = createStore(reducer, applyMiddleware(...middleware));

const Loading = () => `Loading...`;

function App() {
	const [{ width, height, breakpoint }] = useWindowResize(BREAKPOINTS);
	document.documentElement.classList.remove("loading");

	return (
		<Provider store={store}>
			<Router>
				<React.StrictMode>
					<Header breakpoint={breakpoint} />
					<Suspense fallback={Loading}>
						<Switch>
							<Redirect exact from="/gallery" to={`/`} />
							<Route exact path={`/`}>
								<Root breakpoint={breakpoint} />
							</Route>
							<Route
								path={`/gallery/:galleryName`}
								breakpoint={breakpoint}
								component={LazyLoad("Gallery")}
							></Route>
							<Route path={`/contact`}>
								<Contact breakpoint={breakpoint} />
							</Route>
							<Route path={`/about`}>
								<About breakpoint={breakpoint} />
							</Route>
						</Switch>
					</Suspense>
				</React.StrictMode>
			</Router>
		</Provider>
	);
}

export default hot(App);
