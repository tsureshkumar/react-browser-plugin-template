import * as React from "react";
import "../app.scss";

const api = window.browser || window.chrome;


export const Popup = props => {
  const click = () => {
    alert("hi");
    const color = "red";
    api.tabs.query({ active: true, currentWindow: true }, tabs => {
      api.tabs.executeScript(tabs[0].id, { code: 'document.body.style.backgroundColor = "' + color + '";' });
    });
    console.log("clicked");
  };
  return (
        <div className="button" onClick={e => click()}>
            React App
        </div>
  );
};


