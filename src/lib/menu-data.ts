import cappuccino from "@/assets/cappuccino.jpg";
import latte from "@/assets/latte.jpg";
import grilledCheese from "@/assets/grilled-cheese.jpg";
import pasta from "@/assets/pasta.jpg";
import chickenSandwich from "@/assets/chicken-sandwich.jpg";
import brownie from "@/assets/brownie.jpg";
import cheesecake from "@/assets/cheesecake.jpg";
import coldCoffee from "@/assets/cold-coffee.jpg";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tag?: string;
  dietary: "veg" | "non-veg";
};

export type MenuCategory = {
  id: string;
  label: string;
  items: MenuItem[];
};

export const menu: MenuCategory[] = [
  {
    id: "coffee",
    label: "Coffee",
    items: [
      {
        id: "cappuccino",
        name: "Cappuccino",
        description: "Double shot espresso under a soft velvet milk foam.",
        price: 160,
        image: cappuccino,
        tag: "Veg",
        dietary: "veg",
      },
      {
        id: "classic-latte",
        name: "Classic Latte",
        description: "Slow-steamed milk, gentle roast, quietly comforting.",
        price: 180,
        image: latte,
        tag: "Veg",
        dietary: "veg",
      },
    ],
  },
  {
    id: "breakfast",
    label: "Breakfast",
    items: [
      {
        id: "grilled-cheese",
        name: "Grilled Cheese Sandwich",
        description: "Golden sourdough, three cheeses, buttery and molten.",
        price: 220,
        image: grilledCheese,
        tag: "Veg",
      },
    ],
  },
  {
    id: "mains",
    label: "Mains",
    items: [
      {
        id: "creamy-pasta",
        name: "Creamy Pasta",
        description: "Silky white sauce, garlic, parmesan and fresh herbs.",
        price: 280,
        image: pasta,
        tag: "Veg",
      },
    ],
  },
  {
    id: "snacks",
    label: "Snacks",
    items: [
      {
        id: "chicken-sandwich",
        name: "Chicken Sandwich",
        description: "Herb-grilled chicken, crisp lettuce, toasted brioche.",
        price: 240,
        image: chickenSandwich,
        tag: "High protein",
      },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    items: [
      {
        id: "chocolate-brownie",
        name: "Chocolate Brownie",
        description: "Dense, fudgy centre with a delicate crackled top.",
        price: 150,
        image: brownie,
        tag: "Veg",
      },
      {
        id: "classic-cheesecake",
        name: "Classic Cheesecake",
        description: "Baked New York style with a buttery biscuit base.",
        price: 220,
        image: cheesecake,
        tag: "Veg",
      },
    ],
  },
  {
    id: "beverages",
    label: "Beverages",
    items: [
      {
        id: "cold-coffee",
        name: "Cold Coffee",
        description: "Chilled brew blended with milk and a cream swirl.",
        price: 180,
        image: coldCoffee,
        tag: "Chilled",
      },
    ],
  },
];

export const allItems: MenuItem[] = menu.flatMap((c) => c.items);

export const formatPrice = (value: number) => `₹${value}`;
