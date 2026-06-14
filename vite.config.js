import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        boutique_home: resolve(__dirname, 'j_o_luxury_boutique_home/index.html'),
        our_story: resolve(__dirname, 'our_story_j_o/index.html'),
        shop_all: resolve(__dirname, 'shop_all_collections/index.html'),
        product_detail: resolve(__dirname, 'product_detail_showcase/index.html'),
        watches: resolve(__dirname, 'the_watch_collection/index.html'),
        checkout: resolve(__dirname, 'bag_secure_checkout/index.html'),
        faq: resolve(__dirname, 'concierge_faq/index.html'),
        new_in: resolve(__dirname, 'new_in_collections/index.html'),
        sale: resolve(__dirname, 'sale_collections/index.html'),
        wishlist: resolve(__dirname, 'my_wishlist/index.html'),
        cart: resolve(__dirname, 'shopping_bag/index.html'),
        order_confirmation: resolve(__dirname, 'order_confirmation/index.html'),
        editorial: resolve(__dirname, 'j_o_editorial/index.html'),
        returns: resolve(__dirname, 'returns_exchanges/index.html'),
        privacy: resolve(__dirname, 'privacy_policy/index.html'),
        size_guide: resolve(__dirname, 'size_guide/index.html'),
        order_tracking: resolve(__dirname, 'order_tracking/index.html')
      }
    }
  }
});
