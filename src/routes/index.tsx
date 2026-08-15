import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ShoppingBag, UtensilsCrossed } from "lucide-react";
import { toast } from "sonner";
import { menu, allItems, formatPrice, type MenuItem } from "@/lib/menu-data";
import { MenuItemCard } from "@/components/menu/MenuItemCard";
import { OrderSheet, type CartLine } from "@/components/menu/OrderSheet";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Seven Island Cafe — Menu & Table Ordering" },
      {
        name: "description",
        content:
          "Browse the Seven Island Cafe menu — coffee, breakfast, mains, snacks and desserts — and order straight from your table.",
      },
      { property: "og:title", content: "Seven Island Cafe — Menu & Table Ordering" },
      {
        property: "og:description",
        content: "Good food, good moments. Browse the menu and order from your table.",
      },
      { property: "og:type", content: "restaurant.menu" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState("");
  const [activeCategory, setActiveCategory] = useState(menu[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const lines: CartLine[] = useMemo(
    () =>
      allItems
        .filter((item) => cart[item.id] > 0)
        .map((item) => ({ item, quantity: cart[item.id] })),
    [cart],
  );

  const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0);
  const total = lines.reduce((sum, l) => sum + l.quantity * l.item.price, 0);

  const increment = useCallback((item: MenuItem) => {
    setCart((prev) => ({ ...prev, [item.id]: (prev[item.id] ?? 0) + 1 }));
  }, []);

  const decrement = useCallback((item: MenuItem) => {
    setCart((prev) => {
      const next = { ...prev };
      const q = (next[item.id] ?? 0) - 1;
      if (q <= 0) delete next[item.id];
      else next[item.id] = q;
      return next;
    });
  }, []);

  const add = useCallback(
    (item: MenuItem) => {
      increment(item);
      toast.success(`${item.name} added`, { description: formatPrice(item.price) });
    },
    [increment],
  );

  const placeOrder = () => {
    setOpen(false);
    setCart({});
    toast.success("Order placed", {
      description: tableNumber
        ? `We'll bring it over to table ${tableNumber}.`
        : "We'll bring it over shortly.",
    });
  };

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible?.target.id) setActiveCategory(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="mx-auto w-full max-w-xl md:max-w-3xl">
        <header className="px-6 pt-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.35em] text-muted-foreground">Est. Mumbai</p>
              <h1 className="mt-2 font-display text-[2.1rem] leading-[1.05] text-foreground">
                Seven Island
                <span className="block text-primary">Cafe</span>
              </h1>
              <p className="mt-3 text-[0.95rem] text-muted-foreground">Good food, good moments.</p>
            </div>
            <button
              type="button"
              aria-label="Menu information"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
            >
              <UtensilsCrossed className="h-5 w-5" />
            </button>
          </div>
        </header>

        <nav className="sticky top-0 z-30 mt-7 bg-background/85 py-3 backdrop-blur-md">
          <div className="no-scrollbar flex gap-2 overflow-x-auto px-6">
            {menu.map((category) => {
              const active = category.id === activeCategory;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => scrollToCategory(category.id)}
                  className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                    active
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </nav>

        <main className="px-6">
          {menu.map((category, ci) => (
            <section
              key={category.id}
              id={category.id}
              ref={(el) => {
                sectionRefs.current[category.id] = el;
              }}
              className="scroll-mt-24 pt-10"
            >
              <div className="flex items-baseline justify-between">
                <h2 className="font-display text-xl text-foreground">{category.label}</h2>
                <span className="text-xs text-muted-foreground">{category.items.length} items</span>
              </div>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {category.items.map((item, ii) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    quantity={cart[item.id] ?? 0}
                    onAdd={add}
                    priority={ci === 0 && ii === 0}
                  />
                ))}
              </div>
            </section>
          ))}

          <p className="pb-4 pt-14 text-center text-xs text-muted-foreground">
            Seven Island Cafe · Prices inclusive of taxes
          </p>
        </main>
      </div>

      <div
        className={`fixed inset-x-0 bottom-0 z-40 px-6 pb-6 transition-all duration-300 ${
          itemCount > 0 ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mx-auto flex w-full max-w-md items-center justify-center gap-3 rounded-full bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-lift transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <ShoppingBag className="h-5 w-5" />
          View Order · {itemCount} {itemCount === 1 ? "item" : "items"} · {formatPrice(total)}
        </button>
      </div>

      <OrderSheet
        open={open}
        onOpenChange={setOpen}
        lines={lines}
        total={total}
        tableNumber={tableNumber}
        onTableNumberChange={setTableNumber}
        onIncrement={increment}
        onDecrement={decrement}
        onPlaceOrder={placeOrder}
      />
    </div>
  );
}
