import * as React from "react";
import "../app.scss";

const api = window.browser || window.chrome;

export const Options = props => {
  const [mystate, updateState] = React.useState("initial");
  React.useEffect(() => {
    api.storage.sync.get("mystate", x => updateState(x.mystate));
  }, []);
  const onSave = () => {
    api.storage.sync.set({ mystate });
  };
  return (
      <form>
          <input type="text" value={mystate} onChange={e => updateState(e.target.value)}></input>
          <input type="button" onClick={e => onSave()} value="Save"></input>
    </form>
  );
};
