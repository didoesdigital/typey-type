import React from "react";
import describePunctuation from "../../../utils/describePunctuation";

type Props = {
  punctuationDescriptions: boolean;
  currentPhrase: string;
};

const PunctuationDescription = ({
  punctuationDescriptions,
  currentPhrase,
}: Props) => {
  const punctuationDescription = describePunctuation(currentPhrase);
  return (
    <p
      id="punctuation-description"
      className={
        punctuationDescriptions && punctuationDescription.length > 0
          ? "mb0 px2 py05 dib b--solid b--brand-primary-tint bw-2 br-4 punctuation-description-transform text-shadow-outline"
          : "mb0 px2 py05 b--solid b--transparent bw-2 br-4"
      }
    >
      &#8203;{punctuationDescription}
    </p>
  );
};

export default PunctuationDescription;
