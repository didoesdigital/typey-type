import { Fragment } from "react";
import { Slide } from "pure-react-carousel";

type Props = {
  flashcards: any;
};

const SlideNodes = ({ flashcards }: Props) => {
  const slides = [];

  flashcards.forEach((item: any, i: number) => {
    slides.push(
      <Fragment key={i}>
        <Slide
          role="option"
          // @ts-expect-error TS(2322) FIXME: Type 'string' is not assignable to type 'number'.
          index={`${i}-phrase`}
          key={i + "-phrase"}
          innerClassName={"carousel__slider__slide__slideInner"}
        >
          <div className="carousel__slider__slide flex items-center justify-center">
            <div className="flex items-center justify-center p3 wrap">
              {item.phrase}
            </div>
          </div>
        </Slide>
        <Slide
          role="option"
          // @ts-expect-error TS(2322) FIXME: Type 'string' is not assignable to type 'number'.
          index={`${i}-stroke`}
          key={i + "-stroke"}
          innerClassName={"carousel__slider__slide__slideInner"}
        >
          <div className="carousel__slider__slide flex items-center justify-center">
            <div className="flex items-center justify-center p3 wrap">
              {item.stroke}
            </div>
          </div>
        </Slide>
      </Fragment>
    );
  });

  slides.push(
    <Slide
      // @ts-expect-error TS(2322) FIXME: Type 'string' is not assignable to type 'number'.
      index={"finished"}
      key={"finished"}
      innerClassName={"carousel__slider__slide__slideInner"}
    >
      <div className="carousel__slider__slide flex items-center justify-center">
        Finished!
      </div>
    </Slide>
  );

  return slides;
};

export default SlideNodes;
