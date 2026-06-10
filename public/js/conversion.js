// ═══════════════════════════════════════════════════════════════
//  J & O LUXURY BOUTIQUE — CONVERSION OPTIMISATION ENGINE
//  WhatsApp • Social Proof • Exit Intent • Urgency • Trust
// ═══════════════════════════════════════════════════════════════
(function () {
    'use strict';

    // ── Nigerian SOCIAL PROOF DATA ──────────────────────────────
    const PROOF_EVENTS = [
        { name: 'Amara O.',   city: 'Lagos',    product: 'Calfskin Saddle Bag',        action: 'just purchased' },
        { name: 'Chidinma E.',city: 'Abuja',    product: 'Sculpted Midi Dress',         action: 'just ordered' },
        { name: 'Tolu A.',    city: 'Lagos',    product: 'The Grand Chronograph Noir',  action: 'just purchased' },
        { name: 'Kemi B.',    city: 'Lagos',    product: 'Oversized Wool Blazer',       action: 'just ordered' },
        { name: 'Ngozi I.',   city: 'Port Harcourt', product: 'Diamond Pavé Hoop Rings', action: 'just purchased' },
        { name: 'Funke A.',   city: 'Ibadan',   product: 'Helix Gold Chain',            action: 'just added to wishlist' },
        { name: 'Sade M.',    city: 'Abuja',    product: 'Minimalist Trench Coat',      action: 'just purchased' },
        { name: 'Adaeze C.',  city: 'Enugu',    product: 'The Sculptural Tote',         action: 'just ordered' },
        { name: 'Bisi O.',    city: 'Lagos',    product: 'Luxury Amber Fragrance',      action: 'just purchased' },
        { name: 'Ifeoma N.',  city: 'Lagos',    product: 'Silk Utility Shirt',          action: 'just ordered' },
        { name: 'Zainab K.',  city: 'Kano',     product: 'Calfskin Saddle Bag',         action: 'just purchased' },
        { name: 'Yetunde S.', city: 'Lagos',    product: 'L\'Artiste Silk Slip',        action: 'just added to wishlist' },
    ];

    // ── VIEWING COUNTS ───────────────────────────────────────────
    const VIEWING_COUNTS = [4, 7, 3, 9, 5, 6, 8, 2, 11, 4, 6, 3];

    // ── WHATSAPP FLOATING BUTTON ─────────────────────────────────
    function initWhatsApp() {
        if (document.getElementById('jo-whatsapp-btn')) return;

        const btn = document.createElement('a');
        btn.id  = 'jo-whatsapp-btn';
        btn.href = 'https://wa.me/2349012345678?text=Hello%20J%20%26%20O%2C%20I%27d%20love%20help%20with%20your%20luxury%20collection.';
        btn.target = '_blank';
        btn.rel    = 'noopener noreferrer';
        btn.setAttribute('aria-label', 'Chat with J & O on WhatsApp');
        btn.innerHTML = `
            <div id="jo-wa-inner">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.979-1.304A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.073-1.116l-.292-.174-3.027.793.808-2.953-.19-.303A7.969 7.969 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                </svg>
                <span id="jo-wa-label">Chat with us</span>
                <span id="jo-wa-pulse"></span>
            </div>`;

        const style = document.createElement('style');
        style.textContent = `
            #jo-whatsapp-btn {
                position: fixed; bottom: 24px; right: 24px; z-index: 9000;
                display: flex; align-items: center;
                background: #25D366; color: #fff;
                text-decoration: none;
                box-shadow: 0 4px 18px rgba(37,211,102,0.38);
                transition: transform 0.25s ease, box-shadow 0.25s ease;
                border-radius: 0 !important;
            }
            #jo-whatsapp-btn:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(37,211,102,0.50); }
            #jo-wa-inner {
                display: flex; align-items: center; gap: 10px;
                padding: 12px 18px 12px 14px; position: relative;
            }
            #jo-wa-label {
                font-family: 'Montserrat', sans-serif; font-size: 11px;
                font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
                white-space: nowrap;
            }
            #jo-wa-pulse {
                position: absolute; top: 8px; right: 8px;
                width: 9px; height: 9px; background: #fff; border-radius: 50% !important;
                animation: jo-pulse 2s infinite;
            }
            @keyframes jo-pulse {
                0%,100% { opacity: 1; transform: scale(1); }
                50%      { opacity: 0.5; transform: scale(1.4); }
            }
            @media (max-width: 480px) { #jo-wa-label { display: none; } #jo-wa-inner { padding: 13px; } }
        `;
        document.head.appendChild(style);
        document.body.appendChild(btn);
    }

    // ── SOCIAL PROOF TOAST ───────────────────────────────────────
    function initSocialProof() {
        if (document.getElementById('jo-proof-toast')) return;

        const toast = document.createElement('div');
        toast.id = 'jo-proof-toast';
        toast.innerHTML = `
            <div id="jo-proof-inner">
                <div id="jo-proof-icon">🛍️</div>
                <div id="jo-proof-text">
                    <span id="jo-proof-name"></span>
                    <span id="jo-proof-action"></span>
                    <strong id="jo-proof-product"></strong>
                </div>
                <button id="jo-proof-close" aria-label="Close">&times;</button>
            </div>`;

        const style = document.createElement('style');
        style.textContent = `
            #jo-proof-toast {
                position: fixed; bottom: 90px; left: 20px; z-index: 8500;
                background: #fff; border: 1px solid #e0e0e0;
                border-left: 3px solid #C5A059;
                box-shadow: 0 6px 24px rgba(0,0,0,0.10);
                max-width: 300px; width: calc(100vw - 40px);
                transform: translateX(-120%);
                transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
                border-radius: 0 !important;
            }
            #jo-proof-toast.show { transform: translateX(0); }
            #jo-proof-inner { display: flex; align-items: flex-start; gap: 10px; padding: 14px 14px 14px 16px; }
            #jo-proof-icon  { font-size: 22px; flex-shrink: 0; margin-top: 2px; }
            #jo-proof-text  { flex: 1; font-family: 'Montserrat', sans-serif; font-size: 11.5px; line-height: 1.55; color: #444; }
            #jo-proof-name  { font-weight: 700; color: #000; }
            #jo-proof-action{ color: #666; }
            #jo-proof-product { display: block; color: #C5A059; font-weight: 600; margin-top: 2px; font-size: 11px; }
            #jo-proof-close { background: none; border: none; font-size: 16px; color: #aaa; cursor: pointer; padding: 0 0 0 6px; flex-shrink:0; line-height:1; margin-top: -2px; }
            #jo-proof-close:hover { color: #000; }
        `;
        document.head.appendChild(style);
        document.body.appendChild(toast);

        document.getElementById('jo-proof-close').addEventListener('click', () => {
            toast.classList.remove('show');
        });

        let idx = Math.floor(Math.random() * PROOF_EVENTS.length);
        let timer;

        function showNext() {
            const e = PROOF_EVENTS[idx % PROOF_EVENTS.length];
            idx++;
            document.getElementById('jo-proof-name').textContent    = e.name + ' from ' + e.city + ' ';
            document.getElementById('jo-proof-action').textContent   = e.action + ' ';
            document.getElementById('jo-proof-product').textContent  = e.product;
            toast.classList.add('show');
            timer = setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(showNext, 6000);
            }, 5500);
        }

        // Start after 8 seconds so page has loaded
        setTimeout(showNext, 8000);
    }

    // ── EXIT INTENT POPUP ────────────────────────────────────────
    function initExitIntent() {
        if (sessionStorage.getItem('jo_exit_seen') || document.getElementById('jo-exit-popup')) return;

        const popup = document.createElement('div');
        popup.id = 'jo-exit-popup';
        popup.innerHTML = `
            <div id="jo-exit-overlay"></div>
            <div id="jo-exit-box">
                <button id="jo-exit-close">&times;</button>
                <div id="jo-exit-gold-line"></div>
                <p id="jo-exit-eyebrow">WAIT — BEFORE YOU GO</p>
                <h2 id="jo-exit-heading">Your First Order,<br>10% Off.</h2>
                <p id="jo-exit-sub">Enter your email and receive an exclusive welcome code. Used at checkout — no minimum spend.</p>
                <form id="jo-exit-form">
                    <input type="email" id="jo-exit-email" placeholder="Enter your email address" required/>
                    <button type="submit" id="jo-exit-submit">CLAIM MY 10% OFF</button>
                </form>
                <button id="jo-exit-skip">No thanks, I'll pay full price</button>
            </div>`;

        const style = document.createElement('style');
        style.textContent = `
            #jo-exit-popup { position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 16px; opacity: 0; transition: opacity 0.35s ease; pointer-events: none; }
            #jo-exit-popup.active { opacity: 1; pointer-events: all; }
            #jo-exit-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.70); backdrop-filter: blur(3px); }
            #jo-exit-box {
                position: relative; z-index: 1;
                background: #FBFBF9; max-width: 480px; width: 100%;
                padding: 48px 44px; text-align: center;
                box-shadow: 0 24px 80px rgba(0,0,0,0.25);
                border-radius: 0 !important;
                transform: translateY(20px); transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
            }
            #jo-exit-popup.active #jo-exit-box { transform: translateY(0); }
            #jo-exit-close { position: absolute; top: 16px; right: 16px; background: none; border: none; font-size: 22px; cursor: pointer; color: #999; line-height:1; }
            #jo-exit-close:hover { color: #000; }
            #jo-exit-gold-line { width: 36px; height: 2px; background: #C5A059; margin: 0 auto 20px; }
            #jo-exit-eyebrow { font-family:'Montserrat',sans-serif; font-size: 9.5px; letter-spacing: 0.3em; text-transform: uppercase; color: #C5A059; font-weight: 600; margin: 0 0 12px; }
            #jo-exit-heading { font-family:'Playfair Display',serif; font-size: clamp(26px,4vw,34px); font-weight: 700; color: #000; margin: 0 0 16px; line-height: 1.2; }
            #jo-exit-sub { font-family:'Montserrat',sans-serif; font-size: 12px; color: #666; line-height: 1.7; margin: 0 0 28px; }
            #jo-exit-form { display: flex; flex-direction: column; gap: 10px; }
            #jo-exit-email { border: 1px solid #ccc; padding: 14px 16px; font-family:'Montserrat',sans-serif; font-size: 12px; color: #000; background: #fff; outline: none; border-radius: 0 !important; text-align: center; letter-spacing: 0.05em; }
            #jo-exit-email:focus { border-color: #000; }
            #jo-exit-submit { background: #000; color: #fff; border: none; padding: 15px; font-family:'Montserrat',sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; transition: background 0.3s; border-radius: 0 !important; }
            #jo-exit-submit:hover { background: #C5A059; color: #000; }
            #jo-exit-skip { display: block; margin: 16px auto 0; background: none; border: none; font-family:'Montserrat',sans-serif; font-size: 10px; color: #aaa; cursor: pointer; text-decoration: underline; letter-spacing: 0.05em; }
            #jo-exit-skip:hover { color: #000; }
            @media (max-width: 480px) { #jo-exit-box { padding: 36px 24px; } }
        `;
        document.head.appendChild(style);
        document.body.appendChild(popup);

        function closeExit() {
            popup.classList.remove('active');
            sessionStorage.setItem('jo_exit_seen', '1');
        }

        document.getElementById('jo-exit-close').addEventListener('click', closeExit);
        document.getElementById('jo-exit-overlay').addEventListener('click', closeExit);
        document.getElementById('jo-exit-skip').addEventListener('click', closeExit);

        document.getElementById('jo-exit-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('jo-exit-email').value;
            if (typeof JO !== 'undefined') await JO.saveNewsletter(email);
            document.getElementById('jo-exit-box').innerHTML = `
                <div style="padding:20px 0;">
                    <div style="font-size:40px;margin-bottom:16px;">✨</div>
                    <div style="width:36px;height:2px;background:#C5A059;margin:0 auto 20px;"></div>
                    <p style="font-family:'Montserrat',sans-serif;font-size:9.5px;letter-spacing:0.3em;color:#C5A059;text-transform:uppercase;margin:0 0 12px;">CODE ISSUED</p>
                    <h2 style="font-family:'Playfair Display',serif;font-size:28px;font-weight:700;color:#000;margin:0 0 12px;">Welcome to J &amp; O</h2>
                    <p style="font-family:'Montserrat',sans-serif;font-size:12px;color:#666;margin:0 0 20px;">Your 10% welcome code <strong style="color:#000;letter-spacing:0.1em;">WELCOME10</strong> has been sent to your inbox.</p>
                    <button onclick="this.closest('#jo-exit-popup').classList.remove('active')" style="background:#000;color:#fff;border:none;padding:13px 32px;font-family:'Montserrat',sans-serif;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;cursor:pointer;">SHOP NOW</button>
                </div>`;
            setTimeout(closeExit, 4000);
        });

        // Trigger on mouse leaving window (upward)
        let triggered = false;
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY <= 0 && !triggered && !sessionStorage.getItem('jo_exit_seen')) {
                triggered = true;
                popup.classList.add('active');
            }
        });

        // Mobile: trigger on back button / visibility change after 40s
        let mobileTimer;
        if (window.innerWidth < 768) {
            mobileTimer = setTimeout(() => {
                if (!sessionStorage.getItem('jo_exit_seen')) popup.classList.add('active');
            }, 45000);
        }
    }

    // ── URGENCY STOCK BADGE ─────────────────────────────────────
    function initStockUrgency() {
        // Add "Only X left" to product cards that have low stock
        const LOW_STOCK = {
            'The Grand Chronograph Noir': 2,
            'Calfskin Saddle Bag': 3,
            'Diamond Pavé Hoop Rings': 2,
            'Oversized Wool Blazer': 3,
            'Minimalist Trench Coat': 2,
            'Archival Leather Chelsea Boot': 3,
        };
        document.querySelectorAll('h3, .product-name').forEach(el => {
            const name = el.textContent.trim();
            if (LOW_STOCK[name]) {
                const badge = document.createElement('span');
                badge.className = 'jo-stock-badge';
                badge.textContent = `⚡ Only ${LOW_STOCK[name]} left`;
                badge.style.cssText = `
                    display:inline-block; background:#C0392B; color:#fff;
                    font-family:'Montserrat',sans-serif; font-size:9px;
                    font-weight:700; letter-spacing:0.12em; text-transform:uppercase;
                    padding:3px 8px; margin-left:8px; vertical-align:middle; border-radius:0!important;`;
                el.appendChild(badge);
            }
        });
    }

    // ── VIEWING COUNTER (product pages) ─────────────────────────
    function initViewingCounter() {
        const isProduct = window.location.pathname.includes('product_detail') ||
                          window.location.pathname.includes('the_watch');
        if (!isProduct) return;

        const count = VIEWING_COUNTS[Math.floor(Math.random() * VIEWING_COUNTS.length)];
        const strip = document.createElement('div');
        strip.id = 'jo-viewing-strip';
        strip.innerHTML = `
            <span id="jo-viewing-dot"></span>
            <span id="jo-viewing-text">${count} people viewing this right now</span>`;
        const style = document.createElement('style');
        style.textContent = `
            #jo-viewing-strip { display:inline-flex; align-items:center; gap:7px; background:#fdf8ef; border:1px solid #e9c176; padding:7px 14px; margin:12px 0; }
            #jo-viewing-dot   { width:8px; height:8px; background:#C0392B; border-radius:50%!important; animation:jo-pulse 1.5s infinite; flex-shrink:0; }
            #jo-viewing-text  { font-family:'Montserrat',sans-serif; font-size:11px; font-weight:600; color:#775a19; letter-spacing:0.06em; }
        `;
        document.head.appendChild(style);

        // Insert near the add-to-cart section
        const priceEl = document.querySelector('.font-body-md.text-gold, [class*="text-gold"][class*="text-sm"], .text-gold');
        if (priceEl && priceEl.parentElement) {
            priceEl.parentElement.insertAdjacentElement('afterend', strip);
        }
    }

    // ── STICKY ADD TO BAG BAR (product pages) ───────────────────
    function initStickyCartBar() {
        const isProduct = window.location.pathname.includes('product_detail');
        if (!isProduct) return;

        const bar = document.createElement('div');
        bar.id = 'jo-sticky-bar';
        bar.innerHTML = `
            <div id="jo-sticky-inner">
                <div id="jo-sticky-info">
                    <span id="jo-sticky-name">J &amp; O</span>
                    <span id="jo-sticky-price"></span>
                </div>
                <button id="jo-sticky-btn" onclick="document.querySelector('[id*=add-to-bag], button[onclick*=addToCart]')?.click()">
                    ADD TO BAG
                </button>
            </div>`;
        const style = document.createElement('style');
        style.textContent = `
            #jo-sticky-bar {
                position: fixed; bottom: 0; left: 0; right: 0; z-index: 8000;
                background: #000; border-top: 2px solid #C5A059;
                transform: translateY(100%);
                transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
            }
            #jo-sticky-bar.show { transform: translateY(0); }
            #jo-sticky-inner { max-width:1440px; margin:0 auto; padding:12px 24px; display:flex; align-items:center; justify-content:space-between; gap:16px; }
            #jo-sticky-info { display:flex; align-items:baseline; gap:16px; }
            #jo-sticky-name { font-family:'Playfair Display',serif; font-size:15px; color:#FBFBF9; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:280px; }
            #jo-sticky-price { font-family:'Montserrat',sans-serif; font-size:13px; color:#C5A059; font-weight:700; }
            #jo-sticky-btn { flex-shrink:0; background:#C5A059; color:#000; border:none; padding:12px 32px; font-family:'Montserrat',sans-serif; font-size:11px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; cursor:pointer; transition:background 0.25s; border-radius:0!important; }
            #jo-sticky-btn:hover { background:#FBFBF9; }
            @media(max-width:480px){ #jo-sticky-name{max-width:150px;font-size:13px;} #jo-sticky-btn{padding:12px 20px;} }
        `;
        document.head.appendChild(style);
        document.body.appendChild(bar);

        // Populate with current product data
        setTimeout(() => {
            const nameEl  = document.querySelector('h1.font-serif, h1[class*="font-serif"]');
            const priceEl = document.querySelector('[class*="text-gold"][class*="text-xl"], [class*="text-gold"][class*="text-2xl"]');
            if (nameEl)  document.getElementById('jo-sticky-name').textContent  = nameEl.textContent.trim();
            if (priceEl) document.getElementById('jo-sticky-price').textContent = priceEl.textContent.trim();
        }, 500);

        // Show bar after user scrolls past the main CTA
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                bar.classList.toggle('show', !e.isIntersecting);
            });
        }, { threshold: 0.1 });

        setTimeout(() => {
            const mainBtn = document.querySelector('button[onclick*="addToCart"], #add-to-bag-btn, .add-to-bag-btn');
            if (mainBtn) observer.observe(mainBtn);
        }, 600);
    }

    // ── TRUST BADGE BAR ─────────────────────────────────────────
    // Trust badges are already in the HTML — no injection needed
    function initTrustBar() { /* handled in HTML */ }

    // ── NGN / USD CURRENCY TOGGLE ────────────────────────────────
    const NGN_RATE = 1600; // 1 USD = ₦1,600
    let currentCurrency = localStorage.getItem('jo_currency') || 'USD';

    function formatNGN(usdStr) {
        const num = parseFloat(usdStr.replace(/[^0-9.]/g, ''));
        if (isNaN(num)) return usdStr;
        const ngn = Math.round(num * NGN_RATE);
        return '₦' + ngn.toLocaleString('en-NG');
    }

    function applyCurrency(currency) {
        currentCurrency = currency;
        localStorage.setItem('jo_currency', currency);
        document.querySelectorAll('[data-usd-price]').forEach(el => {
            el.textContent = currency === 'NGN' ? formatNGN(el.getAttribute('data-usd-price')) : el.getAttribute('data-usd-price');
        });
        const toggle = document.getElementById('jo-currency-toggle');
        if (toggle) toggle.textContent = currency === 'NGN' ? '$ USD' : '₦ NGN';
    }

    function initCurrencyToggle() {
        if (document.getElementById('jo-currency-toggle')) return;

        // Tag all price elements
        document.querySelectorAll('[class*="text-gold"][class*="text-sm"], .font-body-md.text-gold, [class*="text-gold"]:not([class*="border"]):not([class*="bg"]):not([class*="hover"])').forEach(el => {
            const txt = el.textContent.trim();
            if (txt.startsWith('$') && /\$[\d,]+\.?\d*/.test(txt)) {
                if (!el.getAttribute('data-usd-price')) {
                    el.setAttribute('data-usd-price', txt);
                }
            }
        });

        const btn = document.createElement('button');
        btn.id = 'jo-currency-toggle';
        btn.textContent = currentCurrency === 'NGN' ? '$ USD' : '₦ NGN';
        btn.setAttribute('aria-label', 'Toggle currency');
        const style = document.createElement('style');
        style.textContent = `
            #jo-currency-toggle {
                position: fixed; bottom: 90px; right: 24px; z-index: 8800;
                background: #000; color: #C5A059;
                border: 1px solid #C5A059;
                font-family: 'Montserrat', sans-serif;
                font-size: 9.5px; font-weight: 700;
                letter-spacing: 0.18em; text-transform: uppercase;
                padding: 8px 12px; cursor: pointer;
                transition: background 0.25s, color 0.25s;
                border-radius: 0 !important;
                box-shadow: 0 2px 12px rgba(0,0,0,0.15);
            }
            #jo-currency-toggle:hover { background: #C5A059; color: #000; }
        `;
        document.head.appendChild(style);
        btn.addEventListener('click', () => applyCurrency(currentCurrency === 'NGN' ? 'USD' : 'NGN'));
        document.body.appendChild(btn);

        // Apply stored currency on load
        if (currentCurrency === 'NGN') {
            setTimeout(() => applyCurrency('NGN'), 300);
        }
    }

    // ── INITIALISE ALL ───────────────────────────────────────────
    function init() {
        initWhatsApp();
        initSocialProof();
        initExitIntent();
        initStockUrgency();
        initViewingCounter();
        initStickyCartBar();
        initTrustBar();
        initCurrencyToggle();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
