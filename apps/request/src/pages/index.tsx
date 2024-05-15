import { Fragment } from "react";
import useNav from "@hooks/useNav";

export default function StartPage() {
  const { push } = useNav();
  return (
    <Fragment>
      <div>
        <button onClick={() => push("/xml")}>XMLHttpRequest</button>
        <button onClick={() => push("/xmlpromise")}>XML Promise</button>
        <button onClick={() => push("/fetch")}>Fetch</button>
        <button onClick={() => push("/fetchasync")}>Fetch Async</button>
      </div>
    </Fragment>
  );
}
