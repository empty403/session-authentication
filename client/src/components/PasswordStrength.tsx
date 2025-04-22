import { cn } from "@/lib/utils";

type PasswordStrengthBarProps = {
  score: number;
};

const strengthLevels = [
  {
    label: "Very Weak",
    barColor: "bg-destructive",
    textColor: "text-destructive",
  },
  { label: "Weak", barColor: "bg-destructive", textColor: "text-destructive" },
  { label: "Fair", barColor: "bg-yellow-500", textColor: "text-yellow-500" },
  { label: "Good", barColor: "bg-lime-500", textColor: "text-lime-500" },
  { label: "Strong", barColor: "bg-green-600", textColor: "text-green-600" },
];

export const PasswordStrengthBar = ({ score }: PasswordStrengthBarProps) => {
  const validScoreForLevel = Math.max(0, Math.min(score, 4));
  const currentLevel = strengthLevels[validScoreForLevel];

  return (
    <div className="mt-2">
      <div className="flex h-2 overflow-hidden rounded-full bg-muted">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-full w-1/5 transition-colors duration-300 ease-in-out",
              score >= 0 && index <= validScoreForLevel
                ? currentLevel.barColor
                : "bg-muted"
            )}
            style={{ width: "20%" }}
          />
        ))}
      </div>
      <p
        className={cn(
          "text-xs text-right h-4 pt-1 font-medium",
          score >= 0 ? currentLevel.textColor : "text-muted-foreground"
        )}
      >
        {score >= 0 ? ` ${currentLevel.label}` : ""}
      </p>
    </div>
  );
};
