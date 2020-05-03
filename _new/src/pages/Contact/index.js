import React, { useEffect } from "react";
import {
	useParams
} from "react-router-dom";

import { siteName } from "../../consts";

const Contact = () => {
    function init() {
        document.title = `Contact - ${siteName}`;
    }
    useEffect(init, []);

	return (
		<div>
			<h1>Contact</h1>
			contact info
		</div>
	);
};

export default Contact;
