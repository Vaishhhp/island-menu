import { VegIcon } from "./VegIcon";
import { NonVegIcon } from "./NonVegIcon";

type Props = {
  type: "veg" | "non-veg";
};

export function DietaryBadge({ type }: Props) {
  const isVeg = type === "veg";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-background/90 px-2 py-1 text-[0.65rem] font-bold tracking-wide backdrop-blur ${
        isVeg ? "text-emerald-700" : "text-rose-700"
      }`}
      aria-label={isVeg ? "Vegetarian" : "Non-vegetarian"}
    >
      {isVeg ? <VegIcon size={16} /> : <NonVegIcon size={16} />}
      {isVeg ? "VEG" : "NON-VEG"}
    </span>
  );
}
