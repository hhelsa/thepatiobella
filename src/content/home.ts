/**
 * Homepage content. Every business fact here is taken from The Patio Bella's
 * own posts (see docs/PATIO-BELLA-ART-DIRECTION.md, section 1). Do not add
 * prices, opening hours, event schedules, reviews or awards unless the client
 * confirms them. Descriptive captions describe what a photo shows; they are
 * not menu names unless the posts name the dish.
 */

const IMG = "/images/patio-bella";

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** CSS object-position used to keep the subject in frame. */
  position?: string;
  /** Static zoom that crops a baked-in logo or caption out of the frame. */
  zoom?: number;
  /** Where that zoom is anchored (CSS transform-origin), away from the logo. */
  origin?: string;
};

export type Stop = {
  id: "lugogo" | "arena";
  name: string;
  area: string;
  phone: string;
  /** E.164 form for tel: links. */
  tel: string;
  isNew?: boolean;
  directions: string;
  note?: string;
};

export const stops: Stop[] = [
  {
    id: "lugogo",
    name: "Lugogo Mall",
    area: "Near Kyadondo Rugby Grounds",
    phone: "0794 299 074",
    tel: "+256794299074",
    isNew: true,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Patio%20Bella%20Lugogo%20Mall%208JG4%2BJR%20Kampala",
  },
  {
    id: "arena",
    name: "Arena Mall",
    area: "Nsambya",
    phone: "0775 852 656",
    tel: "+256775852656",
    directions:
      "https://www.google.com/maps/search/?api=1&query=Patio%20Bella%20Arena%20Mall%20Nsambya%20Kampala",
    note: "Also for deliveries",
  },
];

export const brandLine = "Where we all come together";
export const instagram = {
  handle: "@thepatiobella",
  url: "https://www.instagram.com/thepatiobella/",
};

export const nav = [
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/whats-on", label: "What’s on" },
  { href: "/contact", label: "Contact" },
];

// Stills from the posts that carry a corner logo or an address strip are
// zoomed from the opposite corner so the overlay falls outside the frame.
const cropped = (src: string, alt: string, width: number, height: number, origin: string, zoom = 1.3): Photo => ({
  src: `${IMG}/${src}`,
  alt,
  width,
  height,
  zoom,
  origin,
});

export const photos = {
  mixologist: cropped("drinks/bartender-blue-martini.jpg", "A Patio Bella mixologist pouring blue liqueur into a martini glass", 1080, 1080, "35% 58%", 1.32),
  blueHurricane: cropped("drinks/blue-hurricane-lime.jpg", "A lime wheel being set on a blue hurricane cocktail", 1080, 1349, "30% 55%", 1.32),
  orangeCocktail: cropped("drinks/orange-cocktail-gloved-hand.jpg", "An orange cocktail garnished with fruit, held in a gloved hand", 1279, 1598, "35% 55%"),
  mintCocktail: cropped("drinks/cocktail-mint-sugar-rim.jpg", "A cocktail with a sugared rim and a mint garnish", 1170, 1560, "30% 75%", 1.25),
  sangria: cropped("drinks/sangria-glass-bar.jpg", "Sangria with red fruit in a wine glass, the bar glowing behind", 1080, 1350, "30% 55%", 1.35),
  burger: cropped("food/double-burger-gloved-hands.jpg", "A stacked double burger held in gloved hands", 1170, 1461, "30% 70%", 1.25),
  tBone: cropped("food/t-bone-steak-onion-rings.jpg", "A T-bone steak with onion rings, potato wedges and pepper sauce", 1170, 1463, "25% 75%"),
  tomatoSoup: cropped("food/tomato-soup-grilled-bread.jpg", "Tomato soup with a cream swirl and grilled bread on a red table", 1080, 1350, "50% 95%"),
  salmonTower: cropped("food/salmon-avocado-tower.jpg", "A salmon and avocado tower on a textured plate", 1170, 1463, "40% 80%"),
  wings: cropped("food/glazed-wings-platter.jpg", "Glazed chicken wings on a long white platter", 1170, 1461, "30% 50%", 1.38),
  takeawayCoffee: {
    src: `${IMG}/drinks/takeaway-coffee-car-window.jpg`,
    alt: "Two Patio Bella takeaway cups held out of a car window",
    width: 1170,
    height: 1560,
  },
  lugogoCornerTable: {
    src: `${IMG}/interior/lugogo-corner-table.jpg`,
    alt: "A corner table at Lugogo beside a flowering olive tree",
    width: 1086,
    height: 1448,
  },
  lugogoCounter: {
    src: `${IMG}/interior/lugogo-counter.jpg`,
    alt: "The Lugogo counter under an illuminated Patio Bella sign and painted leaves",
    width: 1170,
    height: 1560,
  },
  arenaDiningRoom: {
    src: `${IMG}/interior/arena-dining-room.jpg`,
    alt: "Green velvet chairs and rattan pendants at Arena Mall",
    width: 735,
    height: 498,
  },
  // High-resolution photographs of the Arena Mall branch.
  arenaHero: {
    src: `${IMG}/interior/arena-canopy-dining-hq.jpg`,
    alt: "The Arena Mall dining room: green and ivory chairs under a ceiling of hanging leaves and woven rattan lanterns",
    width: 1400,
    height: 933,
    position: "50% 45%",
  },
  arenaSunsetDinner: {
    src: `${IMG}/people-and-events/arena-sunset-dinner.jpg`,
    alt: "Two guests laughing over dinner by the windows at Arena Mall as the sun sets over the city",
    width: 1400,
    height: 933,
    position: "45% 50%",
  },
  arenaBar: {
    src: `${IMG}/interior/arena-bar-hq.jpg`,
    alt: "The Arena Mall bar: a copper arch of shelves and bottles under hanging greenery, green velvet stools in front",
    width: 1400,
    height: 800,
    position: "50% 50%",
  },
  sunsetsPoster: {
    src: `${IMG}/other/catching-sunsets-poster.jpg`,
    alt: "Poster for Catching Sunsets at Bella, featuring AHundred and Fifi every Sunday at Arena Mall, Nsambya",
    width: 720,
    height: 1280,
  },
  arenaCanopy: {
    src: `${IMG}/views-and-atmosphere/arena-dining-city-view.jpg`,
    alt: "The Arena Mall dining room under a ceiling of hanging leaves and woven rattan lanterns, guests at their tables",
    width: 1170,
    height: 878,
    position: "38% 50%",
  },
  lugogoDaylight: {
    src: `${IMG}/views-and-atmosphere/lugogo-daylight-dining.jpg`,
    alt: "The Lugogo dining room in daylight: yellow walls, cream armchairs and glass walls looking onto palm trees",
    width: 1086,
    height: 1448,
    position: "50% 55%",
  },
  cappuccino: {
    src: `${IMG}/drinks/cappuccino-croissant.jpg`,
    alt: "A cappuccino with leaf latte art beside a croissant on black marble",
    width: 1086,
    height: 1448,
    position: "50% 55%",
  },
  pizzaPull: {
    src: `${IMG}/food/pizza-cheese-pull.jpg`,
    alt: "A slice of pizza lifted from the pie, its melted cheese stretching",
    width: 1170,
    height: 1560,
    position: "50% 70%",
  },
  hurricane: {
    src: `${IMG}/drinks/hurricane-cocktail-bar.jpg`,
    alt: "An orange-to-red cocktail with a lime wheel, the bar's bottles behind",
    width: 1170,
    height: 1561,
    position: "50% 55%",
  },
  guestBreakfast: {
    src: `${IMG}/people-and-events/guest-breakfast-wrap.jpg`,
    alt: "A guest smiling over a breakfast wrap, with a cappuccino and fresh fruit",
    width: 1170,
    height: 1463,
  },
  penne: {
    src: `${IMG}/food/penne-parmesan-grating.jpg`,
    alt: "Parmesan grated over a plate of penne with grilled bread",
    width: 1080,
    height: 1350,
    // The top of the frame carries a logo watermark; keep it out of view.
    position: "50% 100%",
  },
  chefPizza: {
    src: `${IMG}/people-and-events/chef-pizza.jpg`,
    alt: "A Patio Bella chef lifting a slice of pizza",
    width: 1170,
    height: 1560,
  },
  cheesecake: {
    src: `${IMG}/food/blueberry-cheesecake.jpg`,
    alt: "A blueberry cheesecake topped with a strawberry",
    width: 1104,
    height: 1468,
    position: "50% 60%",
  },
  highball: {
    src: `${IMG}/drinks/sunrise-highball-marble.jpg`,
    alt: "A sunrise-coloured highball with an orange wheel on black marble",
    width: 1170,
    height: 1561,
  },
  martini: {
    src: `${IMG}/drinks/red-martini-bar.jpg`,
    alt: "A red martini with a sugared rim and an orange and cherry garnish",
    width: 1170,
    height: 1561,
  },
  lugogoEntrance: {
    src: `${IMG}/interior/lugogo-entrance.jpg`,
    alt: "The Lugogo entrance under the Patio Bella sign, with a staircase and plants on yellow walls",
    width: 1086,
    height: 1448,
    position: "50% 50%",
  },
  lugogoStaircase: {
    src: `${IMG}/interior/lugogo-staircase.jpg`,
    alt: "A stone staircase rising through an arched doorway at Lugogo",
    width: 1086,
    height: 1448,
  },
  arenaTable: {
    src: `${IMG}/food/table-spread-dining-room.jpg`,
    alt: "A table at Arena Mall set with pasta, burgers, fries and dessert beside a green banquette",
    width: 1170,
    height: 780,
    position: "40% 50%",
  },
  henna: {
    src: `${IMG}/people-and-events/henna-shoulder.jpg`,
    alt: "Henna flowers being painted on a guest's shoulder",
    width: 1170,
    height: 1560,
    position: "40% 45%",
  },
  saxophone: {
    src: `${IMG}/views-and-atmosphere/sunset-saxophone.jpg`,
    alt: "A saxophone catching amber evening light",
    width: 1000,
    height: 1333,
    position: "50% 50%",
    // Corners carry the Patio Bella logo and a handwritten caption.
    zoom: 1.6,
  },
  artWall: {
    src: `${IMG}/interior/art-wall.jpg`,
    alt: "A wall lettered 'The Art at Patio Bella' beside a painted portrait",
    width: 1086,
    height: 1086,
  },
  finale: {
    src: `${IMG}/food/table-spread-overhead.jpg`,
    alt: "",
    width: 1170,
    height: 781,
    position: "50% 50%",
  },
} satisfies Record<string, Photo>;

/** The opening stack, in order; the hero image follows it. */
export const introStack = [photos.tomatoSoup, photos.salmonTower, photos.wings, photos.sangria];

export type Plate = {
  photo: Photo;
  title: string;
  note: string;
  /** Layout hint for the gallery rhythm. */
  size: "tall" | "mid" | "short";
};

/** Morning to night. Titles describe the photo unless the posts name it. */
export const plates: Plate[] = [
  { photo: photos.cappuccino, title: "First coffee", note: "Cappuccino and a croissant on black marble.", size: "tall" },
  { photo: photos.guestBreakfast, title: "Breakfast wrap", note: "From the #12DaysOfBreakfast.", size: "mid" },
  { photo: photos.penne, title: "Penne", note: "Parmesan grated at the pass.", size: "short" },
  { photo: photos.burger, title: "Built to burger-fection", note: "Stacked high, served with fries.", size: "tall" },
  { photo: photos.pizzaPull, title: "Pizza", note: "Straight from the oven.", size: "mid" },
  { photo: photos.chefPizza, title: "The kitchen", note: "Cooked to order.", size: "short" },
  { photo: photos.tBone, title: "From the grill", note: "Steak, onion rings, wedges and pepper sauce.", size: "tall" },
  { photo: photos.cheesecake, title: "Blueberry cheesecake", note: "Some cravings deserve the sweetest ending.", size: "mid" },
];

/** The bar, for the "Behind the bar" scene. */
export const barShots = [photos.blueHurricane, photos.orangeCocktail, photos.mintCocktail, photos.martini];

export type Clip = { src: string; poster: string; label: string };
const clip = (name: string, label: string): Clip => ({
  src: `${IMG}/video/${name}-web.mp4`,
  poster: `${IMG}/video/${name}-poster.jpg`,
  label,
});

/** Short clips from the restaurant's own posts. */
export const clips = {
  combos: clip("patio-combos", "Glazed meats from the grill, served as Patio Combos"),
  waffles: clip("waffles", "Waffles dusted with sugar, topped with strawberries and syrup"),
  pizza: clip("pizza-sauce-drizzle", "Sauce drizzled over a pizza fresh from the oven"),
  henna: clip("henna-experience", "Henna being drawn on a guest's hand"),
};

/** Named in Patio Bella's own posts and menu photos. */
export const namedDishes = [
  "Bella Burger",
  "Chapati Royale",
  "Chicken & Eggs Benedict",
  "Bella Cristo",
  "Sizzling Pork",
  "Chicken Lollipops",
  "Sangria",
  "Nojitos",
];

export const sunsetsVideo = `${IMG}/video/catching-sunsets-poster.mp4`;

/** The weekly programmes, as announced by Patio Bella. */
export const programmes = [
  {
    id: "henna",
    day: "Fridays",
    title: "Henna Fridays",
    text: "Come through for your favourite meal and enjoy complimentary henna on us. Good food, beautiful moments, and a little Friday glow-up.",
    offer: "Buy a meal, get your henna free",
    where: "At Patio Bella",
    photo: photos.henna,
    clip: clips.henna,
  },
  {
    id: "sunsets",
    day: "Sundays",
    title: "Catching Sunsets at Bella",
    text: "Catching sunsets with the band at Patio Bella: good music, golden skies, and even better vibes.",
    offer: "Buy a cocktail, get one free",
    where: "Arena Mall, Nsambya · featuring AHundred and Fifi",
    rsvp: { phone: "0775 852 656", tel: "+256775852656" },
    photo: photos.arenaSunsetDinner,
  },
];
