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
  { href: "#food", label: "Food & drink" },
  { href: "#rooms", label: "The rooms" },
  { href: "#whats-on", label: "What’s on" },
  { href: "#visit", label: "Visit" },
];

export const photos = {
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
export const introStack = [photos.lugogoDaylight, photos.cappuccino, photos.pizzaPull, photos.hurricane];

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
  { photo: photos.pizzaPull, title: "Pizza", note: "Straight from the oven.", size: "tall" },
  { photo: photos.chefPizza, title: "The kitchen", note: "Cooked to order.", size: "mid" },
  { photo: photos.cheesecake, title: "Blueberry cheesecake", note: "Some cravings deserve the sweetest ending.", size: "short" },
  { photo: photos.highball, title: "Golden hour", note: "Poured at the bar as the sun goes down.", size: "tall" },
  { photo: photos.martini, title: "Martini", note: "Sugared rim, orange and cherry.", size: "mid" },
];

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

export const happenings = [
  {
    title: "Henna at the table",
    text: "Henna artists drawing flowers while you eat.",
    photo: photos.henna,
  },
  {
    title: "Saxophone at sunset",
    text: "Live sax as the light goes down: catching sunsets at Bella.",
    photo: photos.saxophone,
  },
  {
    title: "The art on the walls",
    text: "More than décor, every piece tells a story.",
    photo: photos.artWall,
  },
];
