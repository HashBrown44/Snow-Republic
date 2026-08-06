export type Extra = { name: string; price: number; unavailable?: boolean };
export type ModGroup = {
  label: string;
  note: string;
  max?: number;
  items: Extra[];
};

/**
 * Optional add-ons, proteins & sauces mirrored from Snow Republic's Toast
 * ordering menu (the shared modifier set applied to items). Groups, order,
 * prices, free items and out-of-stock (unavailable) flags match the source.
 * Prices are the up-charge in USD (0 = included / no charge).
 */
export const modifierGroups: ModGroup[] = [
  {
    label: "A–B",
    note: "Optional",
    items: [
      { name: "Arugula", price: 0.5 },
      { name: "Bacon", price: 2 },
      { name: "Bacon Jam", price: 1 },
      { name: "Balsamic Glaze", price: 1 },
      { name: "Balsamic Vinaigrette", price: 1 },
      { name: "Banana Peppers", price: 1 },
      { name: "Basecamp", price: 1 },
      { name: "BBQ", price: 1 },
      { name: "Beef Burger", price: 7 },
      { name: "Beer Cheese", price: 2 },
      { name: "Black Bean Burger", price: 7 },
      { name: "Blue Cheese", price: 0.5 },
      { name: "Blue Cheese Cole Slaw", price: 2 },
      { name: "Bread", price: 0.5 },
      { name: "Brioche Bun", price: 0.5 },
      { name: "Bun", price: 0.5 },
    ],
  },
  {
    label: "C–J",
    note: "Optional",
    items: [
      { name: "Caesar Dressing", price: 1 },
      { name: "Calabrian Chili Aioli", price: 1 },
      { name: "Caramelized Mushrooms & Onions", price: 1 },
      { name: "Cheddar Cheese", price: 1 },
      { name: "Cherry Peppers", price: 1 },
      { name: "Chili", price: 2 },
      { name: "Crispy Chicken", price: 7 },
      { name: "Croutons", price: 0.5 },
      { name: "Cut in half", price: 0 },
      { name: "Feta Cheese", price: 0.5, unavailable: true },
      { name: "Garlic", price: 1 },
      { name: "Garlic Aioli", price: 1 },
      { name: "Garlic Butter", price: 1 },
      { name: "GF Bun", price: 0 },
      { name: "Gouda", price: 1 },
      { name: "Grilled Chicken", price: 7 },
      { name: "Hot Honey", price: 1 },
      { name: "Hot Maple", price: 1 },
      { name: "Jalapeños", price: 1 },
      { name: "Swiss", price: 1 },
    ],
  },
  {
    label: "L–S",
    note: "Optional",
    items: [
      { name: "Lemon Pepper", price: 1 },
      { name: "Lettuce", price: 0 },
      { name: "Mushroom", price: 1 },
      { name: "Old Bay", price: 0.5 },
      { name: "Onion", price: 1 },
      { name: "Parmesan Cheese", price: 0.5 },
      { name: "Pickles", price: 1 },
      { name: "Pretzel Bun", price: 1 },
      { name: "Provolone", price: 1 },
      { name: "Ranch", price: 1 },
      { name: "Red Onion", price: 1 },
      { name: "Salt", price: 0 },
      { name: "Salt & Vinegar", price: 0.5 },
      { name: "Sauce", price: 0 },
      { name: "Sauerkraut", price: 1 },
      { name: "Sour Cream", price: 1 },
      { name: "Swiss Cheese", price: 0 },
      { name: "Light Sauce", price: 0 },
    ],
  },
  {
    label: "T–W",
    note: "Optional",
    items: [
      { name: "Tomato", price: 0.5 },
      { name: "Truffle Oil", price: 1 },
      { name: "Tzatziki", price: 0.5, unavailable: true },
      { name: "VT Cheddar", price: 0.5 },
      { name: "Whole Grain Mustard", price: 0 },
    ],
  },
  {
    label: "$ Protein",
    note: "Select up to 1",
    max: 1,
    items: [
      { name: "Crispy Chicken", price: 7 },
      { name: "Grilled Chicken", price: 7 },
      { name: "Black Bean Burger", price: 7 },
      { name: "Beef Burger", price: 7 },
      { name: "Turkey Burger", price: 6, unavailable: true },
    ],
  },
  {
    label: "$ Extra Sauce",
    note: "Optional",
    items: [
      { name: "Beer Cheese", price: 2 },
      { name: "Balsamic Vinaigrette", price: 1 },
      { name: "Basecamp", price: 1 },
      { name: "Blue Cheese", price: 1 },
      { name: "Caesar Dressing", price: 1 },
      { name: "Calabrian Chili Aioli", price: 1 },
      { name: "Garlic Aioli", price: 1 },
      { name: "Hot Maple", price: 1 },
      { name: "Pesto Ranch", price: 1 },
      { name: "Sour Cream", price: 1 },
      { name: "BBQ", price: 1 },
      { name: "Ranch", price: 1 },
    ],
  },
];
