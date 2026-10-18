/**
 * Homepage content. Every business fact here is taken from The Patio Bella's
 * own posts (see docs/PATIO-BELLA-ART-DIRECTION.md, section 1). Do not add
 * prices, opening hours, event schedules, reviews or awards unless the client
 * confirms them.
 */

const IMG = "/images/patio-bella";

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** CSS object-position used to keep the subject in frame. */
  position?: string;
};

export type Stop = {
  id: "lugogo" | "arena";
  name: string;
  place: string;
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
    name: "Lugogo",
    place: "Lugogo Mall",
    phone: "0794 299 074",
    tel: "+256794299074",
    isNew: true,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Patio%20Bella%20Lugogo%20Mall%208JG4%2BJR%20Kampala",
  },
  {
    id: "arena",
    name: "Arena Mall",
    place: "Nsambya",
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

export const dayparts = ["Morning", "Midday", "Sunset", "Night"] as const;
export type Daypart = (typeof dayparts)[number];

export const photos = {
  lugogoDaylight: {
    src: `${IMG}/views-and-atmosphere/lugogo-daylight-dining.jpg`,
    alt: "The Lugogo dining room in daylight: yellow walls, cream armchairs and glass walls looking onto palm trees",
    width: 1086,
    height: 1448,
    position: "45% 50%",
  },
  cappuccino: {
    src: `${IMG}/drinks/cappuccino-croissant.jpg`,
    alt: "A cappuccino with leaf latte art beside a croissant on black marble",
    width: 1086,
    height: 1448,
    position: "50% 55%",
  },
  lugogoEntrance: {
    src: `${IMG}/interior/lugogo-entrance.jpg`,
    alt: "The Lugogo entrance under the Patio Bella sign, with a staircase and plants on yellow walls",
    width: 1086,
    height: 1448,
    position: "50% 60%",
  },
  lugogoCounter: {
    src: `${IMG}/interior/lugogo-counter.jpg`,
    alt: "The Lugogo counter with an illuminated Patio Bella sign and painted leaves overhead",
    width: 1170,
    height: 1560,
    position: "50% 55%",
  },
  lugogoStaircase: {
    src: `${IMG}/interior/lugogo-staircase.jpg`,
    alt: "A stone staircase rising through an arched doorway at Lugogo",
    width: 1086,
    height: 1448,
  },
  takeawayCoffee: {
    src: `${IMG}/drinks/takeaway-coffee-car-window.jpg`,
    alt: "Two Patio Bella takeaway coffee cups held out of a car window",
    width: 1170,
    height: 1560,
    position: "60% 50%",
  },
  guestBreakfast: {
    src: `${IMG}/people-and-events/guest-breakfast-wrap.jpg`,
    alt: "A guest smiling over a breakfast wrap, with a cappuccino and fresh fruit",
    width: 1170,
    height: 1463,
  },
  pizzaPull: {
    src: `${IMG}/food/pizza-cheese-pull.jpg`,
    alt: "A slice of pizza lifted from the pie, its melted cheese stretching",
    width: 1170,
    height: 1560,
    position: "50% 65%",
  },
  chefPizza: {
    src: `${IMG}/people-and-events/chef-pizza.jpg`,
    alt: "A Patio Bella chef lifting a slice of pizza",
    width: 1170,
    height: 1560,
  },
  penne: {
    src: `${IMG}/food/penne-parmesan-grating.jpg`,
    alt: "Parmesan grated over a plate of penne with grilled bread",
    width: 1080,
    height: 1350,
    // The top of the frame carries a logo watermark; keep it out of view.
    position: "50% 100%",
  },
  cheesecake: {
    src: `${IMG}/food/blueberry-cheesecake.jpg`,
    alt: "A blueberry cheesecake topped with a strawberry",
    width: 1104,
    height: 1468,
    position: "50% 60%",
  },
  saxophone: {
    src: `${IMG}/views-and-atmosphere/sunset-saxophone.jpg`,
    alt: "A saxophone catching amber evening light",
    width: 1000,
    height: 1333,
    position: "55% 50%",
  },
  arenaCanopy: {
    src: `${IMG}/views-and-atmosphere/arena-dining-city-view.jpg`,
    alt: "The Arena Mall dining room under a ceiling of hanging leaves and woven rattan lanterns",
    width: 1170,
    height: 878,
    position: "78% 30%",
  },
  arenaDining: {
    src: `${IMG}/interior/arena-dining-room.jpg`,
    alt: "Green velvet chairs and rattan pendant lights in front of the Arena Mall bar",
    width: 735,
    height: 498,
  },
  arenaTable: {
    src: `${IMG}/food/table-spread-dining-room.jpg`,
    alt: "A table at Arena Mall set with pasta, burgers, fries and dessert",
    width: 1170,
    height: 780,
  },
  arenaBar: {
    src: `${IMG}/interior/arena-bar-pendants.jpg`,
    alt: "The Arena Mall bar under clusters of rattan lanterns",
    width: 728,
    height: 491,
  },
  hurricane: {
    src: `${IMG}/drinks/hurricane-cocktail-bar.jpg`,
    alt: "An orange-to-red cocktail with a lime wheel, the bar's bottles behind",
    width: 1170,
    height: 1561,
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
  henna: {
    src: `${IMG}/people-and-events/henna-shoulder.jpg`,
    alt: "Henna flowers being painted on a guest's shoulder",
    width: 1170,
    height: 1560,
    position: "40% 50%",
  },
  artWall: {
    src: `${IMG}/interior/art-wall.jpg`,
    alt: "A wall lettered 'The Art at Patio Bella' beside a painted portrait",
    width: 1086,
    height: 1086,
  },
} satisfies Record<string, Photo>;

export const breakfast = [
  "Chapati Royale combo",
  "Chicken & Eggs Benedict",
  "Bella Cristo sandwich",
  "Omelette Deluxe",
  "Morning Scramble Wrap",
];

export const mains = [
  "The Bella Burger",
  "Beef pizza",
  "Chicken lollipops",
  "Sizzling pork",
  "Blueberry cheesecake",
];

export const drinks = ["Sangria", "Nojitos", "Martinis", "Margaritas", "The cocktail of the day"];

export const moments = [
  { title: "Henna at the table", text: "Henna artists drawing flowers while you eat." },
  { title: "Saxophone at sunset", text: "Live sax as the light goes down — catching sunsets at Bella." },
  { title: "Patio Fun Day", text: "Face painting for the kids while the grown-ups linger." },
];
