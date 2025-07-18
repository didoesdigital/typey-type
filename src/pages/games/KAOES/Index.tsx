import React, { useEffect, useRef } from "react";
import Game from "./Game";
import Subheader from "../../../components/Subheader";
import { useChangeInputForKAOES } from "../../lessons/components/UserSettings/updateGlobalUserSetting";
import type { GlobalUserSettings } from "types";

type Props = {
  inputForKAOES: GlobalUserSettings["inputForKAOES"];
};

export default function Index({ inputForKAOES }: Props) {
  const changeInputForKAOES = useChangeInputForKAOES();
  const mainHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (mainHeading) {
      mainHeading.current?.focus();
    }
  }, []);

  return (
    <main id="main">
      <Subheader>
        <div className="flex mr1 self-center">
          <header className="flex items-center min-h-40">
            <h2 ref={mainHeading} tabIndex={-1}>
              KAOES
            </h2>
          </header>
        </div>
      </Subheader>
      <div className="p3 mx-auto mw-1024">
        <Game
          inputForKAOES={inputForKAOES}
          changeInputForKAOES={changeInputForKAOES}
        />
      </div>
    </main>
  );
}
