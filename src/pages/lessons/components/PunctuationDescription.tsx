import React from "react";
import describePunctuation from "../../../utils/describePunctuation";

type Props = {
  currentPhrase: string;
  multiline: boolean;
  punctuationDescriptions: boolean;
};

const PunctuationDescription = ({
  currentPhrase,
  multiline,
  punctuationDescriptions,
}: Props) => {
  const punctuationDescription = describePunctuation(currentPhrase);
  return (
    <div className={multiline ? `flex justify-center` : ''}>
      <p
        id="punctuation-description"
        className={
          punctuationDescriptions && punctuationDescription.length > 0
            ? "absolute mb0 px2 py05 b-dashed b--brand-primary-tint bw-2 br-4 dib punctuation-description-transform text-shadow-outline"
            : "absolute mb0 px2 py05 b-dashed b--transparent bw-2 br-4"
        }
      >
        &#8203;{punctuationDescriptions ? punctuationDescription : ''}
      </p>
    </div>
  );
};

export default PunctuationDescription;
