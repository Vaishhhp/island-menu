import { Minus, Plus, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { formatPrice, type MenuItem } from "@/lib/menu-data";

export type CartLine = { item: MenuItem; quantity: number };

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lines: CartLine[];
  total: number;
  tableNumber: string;
  onTableNumberChange: (value: string) => void;
  onIncrement: (item: MenuItem) => void;
  onDecrement: (item: MenuItem) => void;
  onPlaceOrder: () => void;
};

export function OrderSheet({
  open,
  onOpenChange,
  lines,
  total,
  tableNumber,
  onTableNumberChange,
  onIncrement,
  onDecrement,
  onPlaceOrder,
}: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="mx-auto max-h-[90vh] max-w-xl overflow-y-auto rounded-t-[2rem] border-border bg-background p-0"
      >
        <SheetHeader className="px-6 pb-2 pt-6 text-left">
          <SheetTitle className="font-display text-2xl font-normal">Your order</SheetTitle>
          <p className="text-sm text-muted-foreground">Review your items before placing the order.</p>
        </SheetHeader>

        <div className="space-y-4 px-6 pb-4">
          {lines.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">Your order is empty.</p>
          ) : (
            lines.map(({ item, quantity }) => (
              <div key={item.id} className="flex items-center gap-4 rounded-3xl bg-card p-3 shadow-soft">
                <img
                  src={item.image}
                  alt={item.name}
                  width={768}
                  height={768}
                  loading="lazy"
                  className="h-16 w-16 shrink-0 rounded-2xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{formatPrice(item.price * quantity)}</p>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-secondary p-1">
                  <button
                    type="button"
                    aria-label={`Remove one ${item.name}`}
                    onClick={() => onDecrement(item)}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-secondary-foreground transition-colors hover:bg-background"
                  >
                    {quantity === 1 ? <Trash2 className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
                  </button>
                  <span className="w-6 text-center text-sm font-semibold">{quantity}</span>
                  <button
                    type="button"
                    aria-label={`Add one ${item.name}`}
                    onClick={() => onIncrement(item)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 active:scale-95"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="space-y-5 border-t border-border bg-background px-6 pb-8 pt-5">
          <label className="flex items-center justify-between gap-4">
            <span className="text-sm text-muted-foreground">Table number</span>
            <input
              value={tableNumber}
              onChange={(e) => onTableNumberChange(e.target.value)}
              inputMode="numeric"
              placeholder="e.g. 12"
              className="w-28 rounded-full border border-border bg-card px-4 py-2.5 text-right text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring/40"
            />
          </label>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="font-display text-2xl">{formatPrice(total)}</span>
          </div>

          <button
            type="button"
            onClick={onPlaceOrder}
            disabled={lines.length === 0}
            className="w-full rounded-full bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-soft transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
          >
            Place Order
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
