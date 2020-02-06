import * as React from "react";
import * as ReactDOM from "react-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIgloo } from "@fortawesome/free-solid-svg-icons";

import { Popup } from "./components";

library.add(faIgloo);

ReactDOM.render(<Popup />, document.getElementById("root"));

