import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
	useRouteMatch,
	useParams
} from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";

import styles from "./header.css";
import { cartActions } from "../../actions";
import { siteName } from "../../consts";

function Header({ breakpoint, cartItems }) {
	useEffect(() => {
		document.documentElement.classList.remove("no-js");
	}, []);

	return (
		<header className={styles.container}>
			<Link to="/" replace className={styles.title}>
				<h2>{ siteName }</h2>
			</Link>
			<nav className={styles.nav}>
				<ul>
					<li>
						<Link to="/" replace>
							Galleries
						</Link>
					</li>
					<li>
						<Link to="/about" replace>
							About
						</Link>
					</li>
					<li>
						<Link to="/contact" replace>
							Contact
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}

const mapStateToProps = (state /*, ownProps*/) => {
	return {
		cartItems: state.cart.items
	};
};

const mapDispatchToProps = dispatch => {
	return {
		removeFromCart: (photoId) => dispatch(cartActions.remove(photoId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
