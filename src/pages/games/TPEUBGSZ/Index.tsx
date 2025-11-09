import { useEffect, useRef } from "react";
import Game from "./Game";
import Subheader from "../../../components/Subheader";
import type { MetWords } from "types";

type Props = {
  startingMetWordsToday: MetWords;
};

export default function Index({ startingMetWordsToday }: Props) {
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
              TPEUBGSZ
            </h2>
          </header>
        </div>
      </Subheader>
      <div className="p3 mx-auto mw-1024">
        <Game startingMetWordsToday={startingMetWordsToday} />
      </div>
    </main>
  );
}
