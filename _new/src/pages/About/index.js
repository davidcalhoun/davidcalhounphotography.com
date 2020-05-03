import React, { useEffect } from "react";
import {
	useParams
} from "react-router-dom";

import { siteName } from "../../consts";

const About = () => {
    function init() {
        document.title = `About - ${siteName}`;
    }
    useEffect(init, []);

	return (
		<div>
			<h1>About</h1>
			About info
		</div>
	);
};

export default About;
