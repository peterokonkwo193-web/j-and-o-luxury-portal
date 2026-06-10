# J & O | Luxury Fashion Boutique

A premium multi-page e-commerce portal for **J & O**, a high-end luxury fashion brand. The boutique features custom-tailored silhouettes, curated watch collections, an editorial showcase, interactive filters, search overlays, slide-out carts/wishlists, and a white-glove secure checkout experience.

Designed with a high-end editorial aesthetic featuring sophisticated typography (Playfair Display & Montserrat), HSL color systems, gold highlights, zero-radius structural borders, and smooth micro-animations.

---

## ✨ Features

- **Dynamic Homepage**: High-performance animated canvas banner ("Atelier Lagos • Abuja • London"), collection navigation tiles, and featured arrivals carousel.
- **Shop All Catalog**: Interactive product catalog grid with multiple filtering capabilities (by category, gender, size, color, price range, stock availability) and sorting options.
- **Product Showcase**: Detailed single-item view with interactive color-swatch selectors, size selectors, quantity adjustments, dynamic stock urgency badges, and collapsible detail tabs (Details, Care, Shipping).
- **Luxury Watch Collection**: Dedicated thematic watch storefront highlighting luxury chronometers.
- **Secure Bag & Checkout**: Slide-out cart panel with subtotal updates, full shopping bag page, and structured secure checkout form with order confirmation.
- **Wishlist Integration**: Drawer system to save items to your personal boutique wishlist.
- **Concierge FAQ**: Accordion-based helper panels and contact links for boutique customers.

---

## 🛠️ Technology Stack

- **Core**: HTML5, Vanilla JavaScript (ES Modules)
- **Styling**: Tailwind CSS (loaded via CDN configuration with custom HSL token definitions), custom CSS (`global.css`)
- **Build Tool**: Vite (configured for multi-page build routing)
- **Icons & Fonts**: Google Fonts (Playfair Display & Montserrat), Material Symbols Outlined

---

## 📂 Project Structure

```text
J&O/
├── index.html                           # Redirect entry page
├── global.css                           # Global styling rules & custom styling system
├── vite.config.js                       # Multi-page build configuration for Vite
├── package.json                         # npm commands and devDependencies
├── js/                                  # JavaScript controllers
│   ├── products.js                      # Core product database & catalog data
│   ├── auth.js                          # Account helper mockups
│   └── supabase-sync.js                 # Data sync setup
├── j_o_luxury_boutique_home/            # Homepage module
├── shop_all_collections/                # Catalog explorer page
├── product_detail_showcase/             # Single product showcase page
├── the_watch_collection/                # Dedicated luxury watches showcase
├── shopping_bag/                        # Detailed cart view
├── bag_secure_checkout/                 # Secure payment & checkout form
├── order_confirmation/                  # Post-purchase page
├── my_wishlist/                         # Wishlist page
├── our_story_j_o/                       # Brand heritage & story page
├── concierge_faq/                       # Customer help & FAQs
├── size_guide/                          # Couture size guide charts
└── returns_exchanges/                   # Customer return policies
```

---

## 🚀 Running Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation
1. Clone your repository (once pushed to GitHub):
   ```bash
   git clone <your-repository-url>
   cd J&O
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Run the Dev Server
To start the Vite server locally:
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 📦 Build for Production
To bundle and optimize the project for deployment:
```bash
npm run build
```
The production bundle will be generated in the `dist/` directory.
