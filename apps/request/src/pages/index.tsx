import { Fragment, useEffect } from "react";
import useNav from "@hooks/useNav";
import nProgress from "nprogress";

export default function StartPage() {
  const { push } = useNav();
  useEffect(() => {
    nProgress.start();
    setTimeout(() => {
      nProgress.done();
    }, 1000);
  }, []);
  return (
    <Fragment>
      <div>
        <button onClick={() => push("/xml")}>XMLHttpRequest</button>
        <button onClick={() => push("/xmlpromise")}>XML Promise</button>
        <button onClick={() => push("/fetch")}>Fetch</button>
        <button onClick={() => push("/fetchasync")}>Fetch Async</button>
        <button onClick={() => push("/fetchpromiseall")}>
          Fetch PromiseAll
        </button>
        <button onClick={() => push("/withoutpromiseall")}>
          Without PromiseAll
        </button>
        <button onClick={() => push("/usetransition")}>use transition</button>
        <button onClick={() => push("/fetcherror")}>fetch error</button>
        <button onClick={() => push("/playground")}>playground</button>
        <button onClick={() => push("/swr")}>swr</button>
        <button onClick={() => push("/nprogress")}>nprogress</button>
        <button onClick={() => push("/test")}>test</button>
      </div>
    </Fragment>
  );
}
