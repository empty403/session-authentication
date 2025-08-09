import { useMemo } from "react";
import { Progress } from "@heroui/react";
import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnEnPackage from "@zxcvbn-ts/language-en";
import { useFormContext, useWatch } from "react-hook-form";

type PasswordStrengthMeterProps = {
  name: string;
  className?: string;
  showLabel?: boolean;
};

const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
const strengthColors = [
  "danger",
  "danger",
  "warning",
  "warning",
  "success",
] as const;

const options = {
  translations: zxcvbnEnPackage.translations,
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
  },
};

zxcvbnOptions.setOptions(options);

export const PasswordStrengthMeter = ({
  name,
  className,
  showLabel = true,
}: PasswordStrengthMeterProps) => {
  const { control } = useFormContext();
  const password = useWatch({ control, name }) || "";

  const analysis = useMemo(() => {
    if (!password) {
      return {
        score: 0,
        feedback: { suggestions: [], warning: "" },
      };
    }
    return zxcvbn(password);
  }, [password]);

  const { score } = analysis;
  const strengthLabel = strengthLabels[score];
  const strengthColor = strengthColors[score];
  const progressValue = password ? (score + 1) * 20 : 0;

  if (!password) {
    return null;
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-1">
        {showLabel && (
          <span className="text-sm text-default-600">Password Strength</span>
        )}
        {showLabel && (
          <span className={`text-sm font-medium text-${strengthColor}`}>
            {strengthLabel}
          </span>
        )}
      </div>

      <Progress
        value={progressValue}
        color={strengthColor}
        size="sm"
        aria-label={`Password strength: ${strengthLabel}`}
      />
    </div>
  );
};
