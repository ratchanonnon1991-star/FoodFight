import { ChefHat, CookingPot } from "lucide-react";

interface CookingAnimationProps {
  size?: "sm" | "md";
}

export function CookingAnimation({ size = "md" }: CookingAnimationProps) {
  return (
    <div
      className={`foodfight-cooking-animation foodfight-cooking-animation-${size}`}
      aria-hidden="true"
    >
      <div className="foodfight-cooking-scene">
        <span className="foodfight-cooking-steam foodfight-cooking-steam-one" />
        <span className="foodfight-cooking-steam foodfight-cooking-steam-two" />
        <span className="foodfight-cooking-steam foodfight-cooking-steam-three" />
        <ChefHat className="foodfight-cooking-hat" strokeWidth={2.25} />
        <CookingPot className="foodfight-cooking-pot" strokeWidth={2.25} />
        <span className="foodfight-cooking-spark foodfight-cooking-spark-one" />
        <span className="foodfight-cooking-spark foodfight-cooking-spark-two" />
      </div>
      <span className="foodfight-cooking-ground" />
    </div>
  );
}
