import React from "react";
import { Slide } from "pure-react-carousel";

type Props = {
  flashcards: any;
};

const SlideNodes = ({ flashcards }: Props) => {
  const slides = [];

  flashcards.forEach((item: any, i: number) => {
    slides.push(
      <React.Fragment key={i}>
        <Slide
          role="option"
          // @ts-ignore
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
          // @ts-ignore
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
      </React.Fragment>
    );
  });

  slides.push(
    <Slide
      // @ts-ignore
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
