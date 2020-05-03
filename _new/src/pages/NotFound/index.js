import React, { useEffect } from "react";
import { useParams, Redirect, Link } from "react-router-dom";

import { siteName, galleries } from "../../consts";
import { deslugify } from "../../utils";

const NotFound = () => {
	function init() {
		document.title = `Not Found - ${siteName}`;
	}
	useEffect(init, []);

	return (
		<div>
			<h1>Not Found</h1>
			<p>Oops... maybe this page moved?</p>
			<Link to="/" replace>
				Go back home.
			</Link>
		</div>
	);
};

export default NotFound;
