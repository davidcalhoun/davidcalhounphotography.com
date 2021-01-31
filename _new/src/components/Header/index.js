import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink,
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
			<NavLink to="/" className={styles.title}>
				<h2>{ siteName }</h2>
			</NavLink>
			<nav className={styles.nav}>
				<ul>
					<li>
						<NavLink to="/" exact>
							Galleries
						</NavLink>
					</li>
					<li>
						<NavLink to="/about" exact>
							About
						</NavLink>
					</li>
					<li>
						<NavLink to="/contact" exact>
							Contact
						</NavLink>
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
