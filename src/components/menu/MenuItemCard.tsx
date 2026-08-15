import { Plus, Check } from "lucide-react";
import { formatPrice, type MenuItem } from "@/lib/menu-data";
import { DietaryBadge } from "./DietaryBadge";

type Props = {
  item: MenuItem;
  quantity: number;
  onAdd: (item: MenuItem) => void;
  priority?: boolean;
};

export function MenuItemCard({ item, quantity, onAdd, priority }: Props) {
  return (
    <article className="group relative overflow-hidden rounded-3xl bg-card shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          width={768}
          height={768}
          loading={priority ? "eager" : "lazy"}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <DietaryBadge type={item.dietary} />
        </div>
        {item.tag ? (
          <span className="absolute right-3 top-3 rounded-full bg-background/85 px-3 py-1 text-[0.7rem] font-medium tracking-wide text-muted-foreground backdrop-blur">
            {item.tag}
          </span>
        ) : null}
      </div>

      <div className="flex items-end justify-between gap-4 p-5">
        <div className="min-w-0">
          <h3 className="font-display text-lg leading-tight text-foreground">{item.name}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          <p className="mt-3 text-base font-semibold text-foreground">{formatPrice(item.price)}</p>
        </div>

        <button
          type="button"
          onClick={() => onAdd(item)}
          aria-label={`Add ${item.name} to order`}
          className="relative flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft transition-all duration-200 hover:scale-105 active:scale-95"
          style={{ height: "3.25rem", width: "3.25rem" }}
        >
          {quantity > 0 ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
          {quantity > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-foreground px-1.5 text-xs font-semibold text-background">
              {quantity}
            </span>
          ) : null}
        </button>
      </div>
    </article>
  );
}
