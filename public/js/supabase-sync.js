// ─────────────────────────────────────────────
//  J & O — Supabase Sync Helper
// ─────────────────────────────────────────────
const SUPABASE_URL = window.SUPABASE_URL || 'https://sbvjlyssocivvttdqjjl.supabase.co';
const SUPABASE_KEY = window.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNidmpseXNzb2NpdnZ0dGRxampsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMjc4OTEsImV4cCI6MjA5NTkwMzg5MX0.cbqNEagoj5FRuyp4G_5esvL6Mdabptz_-4JOZTlotPw';

let _sb;
const db = () => {
    if (!_sb) _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    return _sb;
};

// Returns a persistent anonymous session ID stored in localStorage
const getSessionId = () => {
    let id = localStorage.getItem('j_o_session_id');
    if (!id) {
        id = typeof crypto.randomUUID === 'function'
            ? crypto.randomUUID()
            : Date.now().toString(36) + Math.random().toString(36).slice(2);
        localStorage.setItem('j_o_session_id', id);
    }
    return id;
};

const JO = {
    // ── Newsletter ────────────────────────────
    async saveNewsletter(email) {
        // Save locally as a queue regardless of network outcome
        try {
            const queue = JSON.parse(localStorage.getItem('jo_newsletter_queue') || '[]');
            if (!queue.includes(email)) { queue.push(email); localStorage.setItem('jo_newsletter_queue', JSON.stringify(queue)); }
        } catch (_) {}
        try {
            const { error } = await db()
                .from('newsletter_subscribers')
                .upsert([{ email, subscribed_at: new Date().toISOString() }], { onConflict: 'email' });
            // 42P01 = table does not exist; 23505 = already subscribed — both are non-fatal
            if (error && error.code !== '23505' && error.code !== '42P01') return error;
            return null;
        } catch (e) {
            console.warn('Newsletter save error:', e);
            return null; // Always succeed for the user
        }
    },

    // ── Cart ─────────────────────────────────
    async syncCart(items) {
        try {
            const sid = getSessionId();
            const now = new Date().toISOString();
            const { data } = await db()
                .from('carts')
                .select('id')
                .eq('session_id', sid)
                .maybeSingle();
            if (data) {
                await db().from('carts')
                    .update({ items, updated_at: now })
                    .eq('session_id', sid);
            } else {
                await db().from('carts')
                    .insert({ session_id: sid, items, updated_at: now });
            }
        } catch (e) {
            console.warn('Cart sync error:', e);
        }
    },

    async loadCart() {
        try {
            const { data } = await db()
                .from('carts')
                .select('items')
                .eq('session_id', getSessionId())
                .maybeSingle();
            return data?.items ?? null;
        } catch (e) {
            return null;
        }
    },

    // ── Wishlist ─────────────────────────────
    async syncWishlist(items) {
        try {
            const sid = getSessionId();
            const now = new Date().toISOString();
            const { data } = await db()
                .from('wishlists')
                .select('id')
                .eq('session_id', sid)
                .maybeSingle();
            if (data) {
                await db().from('wishlists')
                    .update({ items, updated_at: now })
                    .eq('session_id', sid);
            } else {
                await db().from('wishlists')
                    .insert({ session_id: sid, items, updated_at: now });
            }
        } catch (e) {
            console.warn('Wishlist sync error:', e);
        }
    },

    async loadWishlist() {
        try {
            const { data } = await db()
                .from('wishlists')
                .select('items')
                .eq('session_id', getSessionId())
                .maybeSingle();
            return data?.items ?? null;
        } catch (e) {
            return null;
        }
    },

    // ── Orders ───────────────────────────────
    async saveOrder(order) {
        try {
            const { error } = await db().from('orders').insert([order]);
            return error;
        } catch (e) {
            console.warn('Order save error:', e);
            return e;
        }
    }
};
