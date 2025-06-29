import React, { useEffect, useRef } from "react";
import Game from "./Game";
import Subheader from "../../../components/Subheader";
import { useAppMethods } from "../../../states/legacy/AppMethodsContext";

// @ts-expect-error TS(7031) FIXME: Binding element 'globalLookupDictionary' implicitl... Remove this comment to see the full error message
export default function Index({globalLookupDictionary}) {
  const {
  appFetchAndSetupGlobalDict,
} = useAppMethods();
  const mainHeading = useRef(null);
  useEffect(() => {
    appFetchAndSetupGlobalDict(null).catch((error) => {
      console.error(error);
    });

    if (mainHeading) {
      // @ts-expect-error TS(2531) FIXME: Object is possibly 'null'.
      mainHeading.current.focus();
    }
  }, [appFetchAndSetupGlobalDict]);

  return (
    <main id="main">
      <Subheader>
        <div className="flex mr1 self-center">
          <header className="flex items-center min-h-40">
            <h2 ref={mainHeading} tabIndex={-1}>
              KHAERT
            </h2>
          </header>
        </div>
      </Subheader>
      <div className="p3 mx-auto mw-1024">
        <Game globalLookupDictionary={globalLookupDictionary} />
      </div>
    </main>
  );
}
