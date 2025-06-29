import { useEffect, useState, useRef } from "react";

// @ts-expect-error TS(7006) FIXME: Parameter 'dimensions' implicitly has an 'any' typ... Remove this comment to see the full error message
export const combineChartDimensions = (dimensions) => {
  let parsedDimensions = {
    marginTop: 16,
    marginRight: 16,
    marginBottom: 16,
    marginLeft: 16,
    ...dimensions,
  };

  return {
    ...parsedDimensions,
    boundedHeight: Math.max(
      parsedDimensions.height -
        parsedDimensions.marginTop -
        parsedDimensions.marginBottom,
      0
    ),
    boundedWidth: Math.max(
      parsedDimensions.width -
        parsedDimensions.marginLeft -
        parsedDimensions.marginRight,
      0
    ),
  };
};

// @ts-expect-error TS(7006) FIXME: Parameter 'passedSettings' implicitly has an 'any'... Remove this comment to see the full error message
export const useChartDimensions = (passedSettings) => {
  const ref = useRef();
  const dimensions = combineChartDimensions(passedSettings);

  const [width, changeWidth] = useState(0);
  const [height, changeHeight] = useState(0);

  // @ts-expect-error TS(2345) FIXME: Argument of type '() => any[] | (() => void)' is n... Remove this comment to see the full error message
  useEffect(() => {
    if (dimensions.width && dimensions.height) return [ref, dimensions];

    const element = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      if (!Array.isArray(entries)) return;
      if (!entries.length) return;

      const entry = entries[0];

      if (width !== entry.contentRect.width)
        changeWidth(entry.contentRect.width);
      if (height !== entry.contentRect.height)
        changeHeight(entry.contentRect.height);
    });

    // @ts-expect-error TS(2345) FIXME: Argument of type 'undefined' is not assignable to ... Remove this comment to see the full error message
    resizeObserver.observe(element);

    // @ts-expect-error TS(2345) FIXME: Argument of type 'undefined' is not assignable to ... Remove this comment to see the full error message
    return () => resizeObserver.unobserve(element);
  }, [passedSettings, height, width, dimensions]);

  const newSettings = combineChartDimensions({
    ...dimensions,
    width: dimensions.width || width,
    height: dimensions.height || height,
  });

  return [ref, newSettings];
};
