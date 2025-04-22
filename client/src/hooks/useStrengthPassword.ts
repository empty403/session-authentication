import { useEffect, useState } from "react";

import { zxcvbn, zxcvbnOptions, ZxcvbnResult } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnEnPackage from "@zxcvbn-ts/language-en";

const options = {
  translations: zxcvbnEnPackage.translations,
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
  },
};
zxcvbnOptions.setOptions(options);

const debounceDelay = 300;

export const useStrengthPassword = (password: string | undefined | null) => {
  const [score, setScore] = useState(-1);

  useEffect(() => {
    let isMounted = true;
    const handler = setTimeout(() => {
      const calculateStrength = async () => {
        if (!password) {
          if (isMounted) setScore(-1);
          return;
        }
        try {
          if (!isMounted) return;

          const result: ZxcvbnResult = zxcvbn(password);
          setScore(result.score);
        } catch (error) {
          console.error("Error calculating password strength:", error);
          if (isMounted) setScore(-1);
        }
      };

      calculateStrength();
    }, debounceDelay);

    return () => {
      clearTimeout(handler);
      isMounted = false;
    };
  }, [password]);

  return score;
};
