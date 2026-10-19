/**
 * The Patio Bella menu, transcribed from the restaurant's posted menu photos
 * (public/images/patio-bella/other/menu-mains.jpg and menu-breakfast-cafe.jpg).
 * Prices are in thousands of Ugandan shillings, exactly as printed ("48K").
 * Only obvious typos were corrected.
 */

export type MenuItem = {
  name: string;
  description?: string;
  price?: string;
  /** Coffee is priced by size. */
  prices?: { label: string; price: string }[];
  vegetarian?: boolean;
};

export type MenuSection = {
  id: string;
  title: string;
  note?: string;
  items: MenuItem[];
};

export type MenuGroup = {
  id: "food" | "drinks";
  title: string;
  sections: MenuSection[];
};

export const food: MenuGroup = {
  id: "food",
  title: "Food",
  sections: [
    {
      id: "breakfast",
      title: "Breakfast",
      note: "Breakfast combos served with coffee or tea and juice",
      items: [
        { name: "Patio’s Fit Breakfast", description: "Grilled chicken breast, avocado, eggs, steamed spinach, roasted plantain, toast, breakfast potatoes", price: "38K" },
        { name: "Chicken & Egg Wrap Combo", description: "Grilled chicken, farm fresh eggs, avocado, cheese, fresh tomato, home-made tortilla, a fruit bowl, salsa, home fries", price: "38K" },
        { name: "Loaded Chapati Combo", description: "Chapati, fried spinach, 2 sausages, 2 eggs served with home fries & baked beans", price: "34K" },
      ],
    },
    {
      id: "starters",
      title: "Starters & soups",
      items: [
        { name: "Samosas (chicken / beef)", description: "2 pairs of either chicken or beef samosas with a side salad", price: "25K" },
        { name: "Chicken Lollipops", description: "Chicken lollipops, tomatoes, onions, oyster sauce", price: "28K" },
        { name: "Spring Rolls (chicken / veg)", description: "Chicken, onions, garlic, spring onions, soy sauce, pepper", price: "25K" },
        { name: "Clear Chicken & Veg Soup", description: "Chicken breast, celery, carrots, onions, garlic, thyme & olive oil", price: "22K" },
        { name: "Pumpkin Soup", description: "Creamy, loaded with pumpkin & topped with cheddar cheese & beef bacon", price: "33K" },
        { name: "Cream of Mushroom Soup", description: "Fresh mushrooms, garlic, chicken stock & cream", price: "25K" },
      ],
    },
    {
      id: "salads",
      title: "Salads",
      items: [
        { name: "Caesar Salad", description: "Fresh crispy lettuce, parmesan cheese, chicken strips, creamy Caesar dressing", price: "38K" },
        { name: "Chipotle Chicken Bowl", description: "Mildly spiced juicy chicken, a bowl of romaine lettuce with cilantro lime rice, avocado, black beans, sweet corn, onions, sautéed bell peppers drizzled with a delicious dressing", price: "33K" },
        { name: "Texas Steak Salad", description: "Grilled beef steak, fresh avocado, tomatoes, sweet corn, ranch, crispy onion, freshly baked bread rolls & butter", price: "35K" },
        { name: "Patio’s Mixed Green Salad", description: "Fresh crispy lettuce, tomatoes, avocado, green olives, freshly baked bread rolls & butter", price: "28K", vegetarian: true },
      ],
    },
    {
      id: "chicken",
      title: "Chicken",
      note: "All served with accompaniment of choice",
      items: [
        { name: "Caribbean Jerk Chicken", description: "Jerk marinated chicken, pineapple salsa, plantain", price: "48K" },
        { name: "Chicken Creole", description: "Pan-seared chicken breast tossed in a flavourful & tomato sauce", price: "48K" },
        { name: "Balsamic Chicken Wings", description: "Balsamic wings, coleslaw, in-house made sauce", price: "45K" },
        { name: "Chicken Tenders", description: "Tender, breaded chicken strips served with honey mustard & coleslaw", price: "48K" },
        { name: "Chicken Tikka Masala", description: "Chicken tikka cubes grilled in clay oven & then cooked to perfection with chef’s secret recipe", price: "40K" },
        { name: "Chicken Stew", description: "Local chicken, assorted veggies, favourite accompaniment", price: "48K" },
        { name: "Chicken Pilau", description: "Chicken cubes, rice, sauce", price: "40K" },
      ],
    },
    {
      id: "beef",
      title: "Beef",
      note: "All served with accompaniment of choice",
      items: [
        { name: "Organic Beef Steak", description: "Richly flavoured fillet of beef grilled to your liking, served with Chinese cabbage & mushroom sauce or pepper sauce", price: "49K" },
        { name: "Beef Stew", description: "Beef cubes, assorted veggies", price: "40K" },
        { name: "Beef Pilau", description: "Beef cubes, rice, sauce", price: "40K" },
      ],
    },
    {
      id: "pork",
      title: "Pork",
      note: "All served with accompaniment of choice",
      items: [
        { name: "Pork Ribs", description: "BBQ pork ribs, bell pepper, roasted sesame seeds", price: "55K" },
        { name: "Orange Smothered Pork", description: "Irresistibly tender juicy chops smothered with orange & white wine", price: "48K" },
        { name: "Sizzling Pork", description: "Sweet & sour sizzling pork, assorted vegetables, onion gravy", price: "45K" },
      ],
    },
    {
      id: "goat",
      title: "Goat",
      note: "All served with accompaniment of choice",
      items: [
        { name: "Pan Fried Goat", description: "Goat cubes, bell peppers, tomatoes, carrots, coriander", price: "48K" },
        { name: "Goat Stew", description: "Goat chunks & assorted veggies", price: "45K" },
        { name: "Goat Ribs", description: "Tender goat ribs baked to perfection", price: "55K" },
      ],
    },
    {
      id: "fish",
      title: "Fish",
      note: "All served with accompaniment of choice",
      items: [
        { name: "Whole Tilapia Tracona", description: "Whole tilapia fish, dry or toasted in a tracona sauce cooked on humble heat", price: "55K" },
        { name: "Tilapia Fillet", description: "Grilled tilapia, creamy spinach, sauce on a bed of potato cubes", price: "46K" },
        { name: "Salmon Fillet", description: "Pan-seared salmon fillet, garlic, lemon herb butter sauce, spinach, cherry tomato", price: "75K" },
        { name: "Fish Fingers", description: "Breaded fish fillet baked to perfection & served with tartar sauce", price: "42K" },
      ],
    },
    {
      id: "burgers",
      title: "Burgers",
      note: "All served with fries",
      items: [
        { name: "Patio’s Cheese Burger", description: "200g beef patty, lettuce, tomato, onion, burger sauce, pickles, cheese", price: "36K" },
        { name: "Classic Chicken Burger", description: "Crispy fried chicken breast topped with coleslaw, pickles, mayonnaise, BBQ sauce in a fresh baked bun", price: "38K" },
        { name: "Super Patio Burger", description: "2 beef patties, fried egg, bacon, cheddar cheese, tomato, lettuce, pickles, burger sauce", price: "48K" },
        { name: "Hawaiian BBQ Burger", description: "Chicken breast / beef patty, grilled pineapple, fresh onion rings, tomatoes, shredded lettuce, pickles, melted cheese, Hawaiian BBQ sauce", price: "42K" },
      ],
    },
    {
      id: "sandwiches",
      title: "Sandwiches",
      note: "All served with fries",
      items: [
        { name: "Grilled Chicken Sandwich", description: "Grilled chicken, rocket leaves, aioli, roasted peppers, parmesan, served on focaccia bread", price: "38K" },
        { name: "Philly’s Finest Steak Sandwich", description: "Beef fillet strips, mozzarella cheese, sautéed onions, green pepper, oyster sauce", price: "40K" },
        { name: "Patio’s Club Sandwich", description: "Triple decker sandwich of sliced beef, grilled chicken breast, onions, tomatoes, mayonnaise & cheddar cheese", price: "42K" },
        { name: "Chicken Avocado MLT", description: "Grilled seasoned chicken breast sandwich with avocado, crispy beef macon, tomato, lettuce & mayonnaise", price: "40K" },
      ],
    },
    {
      id: "pizza",
      title: "Pizza",
      items: [
        { name: "BBQ Chicken Pizza", description: "BBQ chicken, BBQ sauce, mozzarella cheese, pomodoro sauce", price: "42K" },
        { name: "BBQ Pork Pizza", description: "BBQ pork, BBQ sauce, mozzarella cheese, pomodoro sauce", price: "42K" },
        { name: "Beef Pizza", description: "Beef mince, onions, tomatoes, green peppers, tomato sauce, black olives, mozzarella cheese, on a freshly baked stuffed crust, pomodoro sauce", price: "42K" },
        { name: "Classic Hawaiian Pizza", description: "Canadian ham, mozzarella cheese, pomodoro sauce, pineapple, oregano", price: "38K" },
        { name: "Meaty Feast Pizza", description: "Beef sausages, beef strips, chicken cubes, tomato, mozzarella cheese, pomodoro sauce", price: "55K" },
        { name: "Margherita Pizza", description: "Mozzarella cheese, tomato sauce, fresh basil, oregano, pomodoro sauce", price: "33K", vegetarian: true },
      ],
    },
    {
      id: "pasta",
      title: "Pasta",
      note: "All served with baked garlic bread, choice of penne or spaghetti",
      items: [
        { name: "Chicken Alfredo Pasta", description: "Chicken strips, mushrooms, parmesan cream sauce", price: "38K" },
        { name: "Creamy Tuscan Chicken Pasta", description: "Chicken, sun-dried tomato, spinach, creamy garlic parmesan sauce", price: "38K" },
        { name: "Pasta Carbonara", description: "Parmesan cream sauce, bacon", price: "42K" },
        { name: "Pasta Bolognese", description: "Pasta, marinara sauce, minced beef", price: "36K" },
      ],
    },
    {
      id: "sides",
      title: "Additional sides",
      items: [
        { name: "Any side", description: "Vegetable rice, mashed potatoes, potato wedges, French fries, plantain, steamed vegetables, salad, onion rings", price: "15K" },
      ],
    },
    {
      id: "desserts",
      title: "Desserts",
      note: "Whole cakes are available on pre-order",
      items: [
        { name: "Ice cream (1 scoop)", description: "Vanilla, strawberry, chocolate, blueberry, or cookies & cream", price: "8K" },
        { name: "Black Forest slice", price: "20K" },
        { name: "Red Velvet slice", price: "20K" },
        { name: "Banana Cake slice", price: "20K" },
      ],
    },
  ],
};

export const drinks: MenuGroup = {
  id: "drinks",
  title: "Drinks",
  sections: [
    {
      id: "coffee",
      title: "Coffee",
      items: [
        { name: "Espresso", prices: [{ label: "Single", price: "8K" }, { label: "Double", price: "14K" }] },
        { name: "Cappuccino", prices: [{ label: "Single", price: "12K" }, { label: "Double", price: "14K" }] },
        { name: "Café Latte", prices: [{ label: "Single", price: "13K" }, { label: "Double", price: "15K" }] },
        { name: "Americano", prices: [{ label: "Single", price: "11K" }, { label: "Double", price: "13K" }] },
        { name: "Hot Chocolate", price: "12K" },
        { name: "African Coffee", price: "12K" },
      ],
    },
    {
      id: "tea",
      title: "Tea",
      items: [
        { name: "African Tea", price: "12K" },
        { name: "Black Tea", price: "9K" },
        { name: "Green Tea", price: "10K" },
        { name: "Dawa Tea", price: "14K" },
        { name: "Herbal Teas", description: "Speciality teas", price: "15K" },
      ],
    },
    {
      id: "nojitos",
      title: "Nojitos",
      items: [
        { name: "Classic", description: "Mint, lime, sugar syrup, Sprite", price: "20K" },
        { name: "Strawberry", description: "Lime, mint, strawberry syrup, Sprite, sugar syrup", price: "20K" },
        { name: "Passion", description: "Passion juice, mint, lime, sugar syrup, Sprite", price: "20K" },
        { name: "Pineapple", description: "Pineapple juice, mint, lime, sugar syrup, Sprite", price: "20K" },
        { name: "Mint Aqua Cooler", description: "Refreshing, tangy, summery", price: "20K" },
        { name: "Melon Cooler", description: "Fresh melon juice, lime, mint, simple syrup, ice", price: "22K" },
      ],
    },
    {
      id: "juice",
      title: "Fresh juice",
      items: [
        { name: "Passion", price: "16K" },
        { name: "Mango", price: "16K" },
        { name: "Watermelon", price: "16K" },
        { name: "Pineapple", price: "16K" },
        { name: "Lemonade", price: "16K" },
        { name: "Orange", price: "25K" },
        { name: "Cocktail", price: "20K" },
      ],
    },
    {
      id: "boosters",
      title: "Fruit boosters",
      items: [
        { name: "Pineapple & Mint Juice", price: "20K" },
        { name: "Beetroot, Mango & Carrot Juice", price: "20K" },
        { name: "Green Lemonade", price: "20K" },
        { name: "Blended Tropical Fruits", description: "A smooth blend of fresh bananas, pineapples, mangoes & coconut flavour", price: "20K" },
      ],
    },
    {
      id: "smoothies",
      title: "Smoothies",
      items: [
        { name: "Strawberry", description: "Strawberry, plain yoghurt", price: "18K" },
        { name: "Peanut Butter", description: "Peanut butter, plain yoghurt", price: "18K" },
        { name: "Very Berry", description: "Premium yoghurt, mixed berries", price: "20K" },
        { name: "Tropical Mix It", description: "Seasonal fruits, plain yoghurt", price: "20K" },
      ],
    },
    {
      id: "milkshakes",
      title: "Milkshakes",
      items: [
        { name: "Oreo", description: "Vanilla ice cream, crushed Oreos, milk", price: "20K" },
        { name: "Strawberry", description: "Strawberry ice cream, milk, diced fresh strawberries", price: "18K" },
        { name: "Chocolate", description: "Chocolate ice cream, milk, chocolate syrup", price: "18K" },
        { name: "Vanilla Classic", description: "Vanilla ice cream, milk", price: "18K" },
      ],
    },
  ],
};

export const menuNote =
  "Prices in Ugandan shillings (thousands), as on the restaurant’s posted menu. Please tell your server about any allergies.";
