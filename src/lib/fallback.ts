import type {
  Beer,
  MenuItem,
  Drink,
  BreweryEvent,
  Product,
  SiteSettings,
  GalleryShot,
} from "./types";

/**
 * Content sourced from Snow Republic Brewery, 33 VT Route 100, West Dover, VT.
 * The site renders from this data until a Sanity project is connected
 * (see lib/content.ts), at which point live content takes over.
 */

export const fallbackBeers: Beer[] = [
  {
    _id: "b1",
    name: "Yard Sale",
    style: "New England Hazy IPA",
    abv: 7,
    tagline: "Sabro, Eldorado & Hallertau",
    notes:
      "A hazy New England IPA loaded with Sabro, Eldorado and Hallertau hops — soft, juicy and coconut-forward.",
    hue: "#e6b95f",
    onTap: true,
  },
  {
    _id: "b2",
    name: "Lift Line",
    style: "Double IPA",
    abv: 8,
    tagline: "Zappa & Mosaic, big and bright",
    notes:
      "A DIPA with Zappa and Mosaic hops — fruit, spice, berry and currant. Sip it slow after the last run.",
    hue: "#d9a441",
    onTap: true,
  },
  {
    _id: "b3",
    name: "Flip Flop Wit",
    style: "Belgian Witbier",
    abv: 4.5,
    tagline: "Coriander & Curaçao orange peel",
    notes:
      "A Belgian wheat spiced up with a blend of coriander and Curaçao orange peel. West Coast vibes in a Vermont glass.",
    hue: "#eccb72",
    onTap: true,
  },
  {
    _id: "b4",
    name: "Major B",
    style: "American Lager",
    abv: 5.3,
    tagline: "Clean, crisp & honest",
    notes:
      "Named for the owner's father, a career Marine. A crushable, no-nonsense lager for any day of the week.",
    hue: "#e8c979",
    onTap: true,
  },
  {
    _id: "b5",
    name: "Silver Tail",
    style: "American Porter",
    abv: 7,
    tagline: "Light chocolate & coffee",
    notes:
      "A smooth porter with a great light chocolate taste and hints of coffee. Built for a cold night on the mountain.",
    hue: "#3a2417",
    onTap: true,
  },
  {
    _id: "b6",
    name: "Maple 100",
    style: "Imperial Breakfast Stout",
    abv: 9,
    tagline: "Chocolate, vanilla, cinnamon & VT maple",
    notes:
      "An imperial breakfast stout with chocolate, vanilla and cinnamon, finished with local Vermont maple syrup.",
    hue: "#2a1810",
    seasonal: true,
    onTap: true,
  },
  {
    _id: "b7",
    name: "Pond Skim",
    style: "German Kölsch",
    abv: 5,
    tagline: "Crisp, classic & noble-hopped",
    notes:
      "A classic German Kölsch brewed with noble hops. Bright, delicate and endlessly drinkable.",
    hue: "#ecd07a",
    onTap: true,
  },
  {
    _id: "b8",
    name: "Stick Season",
    style: "Coffee Porter",
    abv: 6.5,
    tagline: "Smooth with notes of coffee",
    notes:
      "A smooth-drinking porter with notes of coffee — named for that in-between Vermont season before the snow flies.",
    hue: "#33210f",
    seasonal: true,
    onTap: true,
  },
  {
    _id: "b9",
    name: "All Day Après",
    style: "American Pale Ale",
    abv: 5.2,
    tagline: "Easy, balanced & sessionable",
    notes:
      "A balanced American pale ale made for a long afternoon in the taproom. Positive vibrations, all day.",
    hue: "#e2b354",
    onTap: true,
  },
];

export const fallbackMenu: MenuItem[] = [
  // Apps & Salads
  {
    _id: "m1",
    name: "Pretzel Bites",
    description:
      "Served with Basecamp sauce & Dijon mustard. Add house beer cheese for $1.",
    price: 10,
    category: "Apps & Salads",
    pairing: "Major B Lager",
    veg: true,
    image: "/images/food-pretzels.jpg",
  },
  {
    _id: "m2",
    name: "Wings",
    description:
      "Double-fried, choice of flavor: Maple Buffalo, Habanero Honey, Jamaican Jerk, BBQ, Garlic Parm & more. Served with blue cheese.",
    price: 14,
    category: "Apps & Salads",
    pairing: "Lift Line DIPA",
    image: "/images/food-wings.jpg",
  },
  {
    _id: "m3",
    name: "Cheeseburger Eggrolls",
    description: "Crispy eggrolls stuffed with seasoned cheeseburger.",
    price: 12,
    category: "Apps & Salads",
  },
  {
    _id: "m4",
    name: "Caesar Salad",
    description: "Crisp romaine, parmesan, seasoned croutons.",
    price: 12,
    category: "Apps & Salads",
    veg: true,
  },
  {
    _id: "m23",
    name: "Garlic Bread",
    description:
      "Wood-fired garlic bread with melted mozzarella, pesto & marinara for dipping.",
    price: 12,
    category: "Apps & Salads",
    veg: true,
    image: "/images/food-garlic-bread.jpg",
  },
  // Handhelds
  {
    _id: "m5",
    name: "Basecamp Burger",
    description:
      "Two 4oz beef patties, VT cheddar, bacon jam, Basecamp sauce, lettuce, pickles.",
    price: 16,
    category: "Handhelds",
    pairing: "Yard Sale IPA",
    image: "/images/food-burger.jpg",
  },
  {
    _id: "m6",
    name: "Snowbomb",
    description:
      "Two 4oz beef patties, caramelized mushrooms & onions, Swiss, garlic confit aioli, arugula on brioche.",
    price: 16,
    category: "Handhelds",
  },
  {
    _id: "m7",
    name: "Gold Rush",
    description:
      "Two 4oz beef patties, bacon, fried onions, pickles, smoked gouda & golden BBQ on brioche.",
    price: 16,
    category: "Handhelds",
  },
  {
    _id: "m8",
    name: "The OG Chick",
    description: "Crispy chicken breast, Basecamp sauce, lettuce, pickles.",
    price: 16,
    category: "Handhelds",
    image: "/images/food-chicken-sandwich.jpg",
  },
  {
    _id: "m9",
    name: "Black Bean Burger",
    description:
      "VT cheddar, lettuce, banana peppers, topped with Calabrian chili mayo.",
    price: 16,
    category: "Handhelds",
    veg: true,
  },
  {
    _id: "m10",
    name: "Cheezee Bacon Dog",
    description: "Hot dog on a toasted brioche roll with beer cheese & bacon.",
    price: 12,
    category: "Handhelds",
    image: "/images/food-hotdog.jpg",
  },
  {
    _id: "m24",
    name: "Chicken Caesar Wrap",
    description:
      "Grilled or crispy chicken, crisp romaine & house Caesar in a flour tortilla.",
    price: 16,
    category: "Handhelds",
    image: "/images/food-wrap.jpg",
  },
  {
    _id: "m25",
    name: "Inferno",
    description:
      "Crispy chicken smothered in maple buffalo with cherry peppers & blue cheese slaw.",
    price: 16,
    category: "Handhelds",
    image: "/images/food-chicken-basket.jpg",
  },
  {
    _id: "m26",
    name: "The Reuben",
    description:
      "Pastrami, sauerkraut, Swiss & house dressing, griddled on marbled rye.",
    price: 16,
    category: "Handhelds",
    pairing: "Silver Tail Porter",
    image: "/images/food-reuben.jpg",
  },
  // Wood-Fired Pizza
  {
    _id: "m11",
    name: "Margherita",
    description:
      "Rossa, buffalo mozzarella, basil, EVOO, garlic, Parmesan Reggiano.",
    price: 18,
    category: "Wood-Fired Pizza",
    pairing: "Flip Flop Wit",
    veg: true,
  },
  {
    _id: "m12",
    name: "Moccio",
    description:
      "Prosciutto, arugula, mozzarella, burrata, hot maple, EVOO, garlic & spices.",
    price: 20,
    category: "Wood-Fired Pizza",
  },
  {
    _id: "m13",
    name: "Brussel Hustle",
    description:
      "White pie, mozzarella, burrata, roasted brussels, bacon, red onion, maple balsamic.",
    price: 20,
    category: "Wood-Fired Pizza",
  },
  {
    _id: "m14",
    name: "I'm Hot Honey",
    description:
      "Rossa, mozzarella, onions, hot cherry peppers, soppressata & garlic, drizzled with honey.",
    price: 20,
    category: "Wood-Fired Pizza",
  },
  {
    _id: "m15",
    name: "Matterhorn",
    description: "Pesto, burrata, wood-fired cherry tomatoes, Parmesan Reggiano.",
    price: 18,
    category: "Wood-Fired Pizza",
    veg: true,
  },
  {
    _id: "m16",
    name: "Figgie Smalls",
    description:
      "White pie, meatballs, fresh mozzarella, ricotta, pesto, sliced tomatoes, oregano, garlic.",
    price: 22,
    category: "Wood-Fired Pizza",
  },
  // Tacos & Sides
  {
    _id: "m17",
    name: "Tiki Tacos",
    description: "Cheddar cheese & chili.",
    price: 13,
    category: "Tacos & Sides",
  },
  {
    _id: "m18",
    name: "Steak Quesadilla",
    description: "Grilled steak & melted cheese, folded and pressed.",
    price: 16,
    category: "Tacos & Sides",
  },
  {
    _id: "m19",
    name: "Hand-Cut Fries",
    description:
      "Basket of hand-cut fries — plain, Old Bay, salt & vinegar, or chili cheese.",
    price: 7,
    category: "Tacos & Sides",
    veg: true,
  },
  // Kids & Pups
  {
    _id: "m20",
    name: "Kids Burger",
    description: "Cheese or no cheese, served with fries & a Capri Sun. 10 & under.",
    price: 12,
    category: "Kids & Pups",
  },
  {
    _id: "m21",
    name: "Kids Grilled Cheese",
    description: "Served with fries. For kids 10 & under.",
    price: 12,
    category: "Kids & Pups",
    veg: true,
  },
  {
    _id: "m22",
    name: "Puppy Plate",
    description: "One grilled burger, chicken or hot dog — no bun. For the doggos.",
    price: 3,
    category: "Kids & Pups",
  },
];

export const fallbackDrinks: Drink[] = [
  {
    _id: "d1",
    name: "Chardonnay",
    detail: "Sean Minor · Sonoma Coast, CA",
    kind: "White",
  },
  {
    _id: "d2",
    name: "Sauvignon Blanc",
    detail: "Honig · Napa Valley, CA",
    kind: "White",
  },
  {
    _id: "d3",
    name: "Rosé",
    detail: "Reeve Family · Sonoma, CA",
    kind: "Rosé",
  },
  {
    _id: "d4",
    name: "Prosecco DOC",
    detail: "LaLuca · Treviso, Italy",
    kind: "Bubbles",
  },
  {
    _id: "d5",
    name: "Cabernet Sauvignon",
    detail: "Oberon · Napa County, CA",
    kind: "Red",
  },
  {
    _id: "d6",
    name: "Barolo",
    detail: "G.D. Vajra Albe · Piedmont, Italy",
    kind: "Red",
  },
  {
    _id: "d7",
    name: "Espresso Martini",
    detail: "Espresso coffee liqueur & EFFEN vodka",
    kind: "Cocktail",
  },
  {
    _id: "d8",
    name: "Margarita",
    detail: "Teremana Reposado or Casamigos Blanco",
    kind: "Cocktail",
  },
  {
    _id: "d9",
    name: "Tales of Joy",
    detail: "Tito's & Capri Sun fruit punch",
    kind: "Cocktail",
  },
  {
    _id: "d10",
    name: "Bellini",
    detail: "Prosecco + peach, raspberry or blueberry",
    kind: "Cocktail",
  },
];

export const fallbackEvents: BreweryEvent[] = [
  {
    _id: "e1",
    title: "Trivia Night with Laura",
    day: "Thu",
    time: "6:30 PM",
    kind: "Trivia",
    description:
      "Laura hosts weekly trivia every Thursday. Prizes for 1st, 2nd and 3rd place.",
    status: "Weekly",
  },
  {
    _id: "e2",
    title: "BINGO with Laura",
    day: "Tue",
    time: "6:30 PM",
    kind: "Bingo",
    description: "Weekly BINGO every Tuesday night — come play for prizes.",
    status: "Returning Soon",
  },
  {
    _id: "e3",
    title: "Ian Campbell — Live",
    day: "Sun",
    time: "1:00 – 4:00 PM",
    kind: "Live Music",
    description:
      "Vermont singer-songwriter Ian Campbell plays honest, story-driven folk & roots rock in the taproom.",
    status: "Returning Soon",
  },
  {
    _id: "e4",
    title: "$5 Wing Mondays · $2 Dog Wednesdays",
    day: "M/W",
    time: "All Day",
    kind: "Special",
    description:
      "Weekday deals all season — five-dollar wings on Mondays, two-dollar dogs on Wednesdays, and Friday slice combos.",
    status: "Weekly",
  },
];

export const fallbackProducts: Product[] = [
  {
    _id: "p1",
    name: "Frozen Pepperoni 'Za",
    category: "Frozen 'Za",
    price: 14,
    blurb: "House-made frozen pepperoni pizza, ready to take home and bake.",
    hue: "#c06b2c",
  },
  {
    _id: "p2",
    name: "Frozen Margherita 'Za",
    category: "Frozen 'Za",
    price: 13,
    blurb: "House-made frozen margherita pizza — the wood-fired classic, at home.",
    hue: "#b6472f",
  },
  {
    _id: "p3",
    name: "Frozen Cheese 'Za",
    category: "Frozen 'Za",
    price: 12,
    blurb: "House-made frozen cheese pizza, ready to bake whenever you are.",
    hue: "#d9a441",
  },
  {
    _id: "p4",
    name: "Gift Card",
    category: "Gift Card",
    price: 25,
    blurb: "Beer, food and positive vibrations — the easiest gift in Vermont.",
    hue: "#1a3b2a",
  },
];

export const fallbackSettings: SiteSettings = {
  hoursWeekday: "Mon–Sat · 12pm – 8pm",
  hoursSunday: "Sunday · 12pm – 6pm",
  address: "33 VT Route 100, West Dover, VT 05356",
  town: "West Dover, Vermont",
  email: "info@snowrepublicbrewery.com",
  secondLocation: "Also pouring in Brattleboro, VT",
  heroImage: "/images/storefront.jpg",
  storyImage: "/images/place-exterior-pub.jpg",
};

export const fallbackGallery: GalleryShot[] = [
  {
    src: "/images/storefront.jpg",
    alt: "Snow Republic's log-cabin taproom on Route 100 in West Dover",
  },
  {
    src: "/images/vibe-ski-team.jpg",
    alt: "The Snow Republic ski team looking out over Mount Snow's back bowls",
  },
  {
    src: "/images/vibe-bartender.jpg",
    alt: "Bartender behind a wall of Snow Republic pint glasses",
  },
  {
    src: "/images/vibe-dj.jpg",
    alt: "A live DJ spinning in the taproom",
  },
  {
    src: "/images/place-exterior-pub.jpg",
    alt: "The brew pub patio with Adirondack chairs and branded kegs",
  },
  {
    src: "/images/beer-cooler.jpg",
    alt: "Cooler stocked with cans of Snow Republic beer",
  },
];
