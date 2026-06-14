// ═══════════════════════════════════════════════════════════════
//  J & O LUXURY BOUTIQUE — LIVE HOMEPAGE FEATURES
//  Scroll reveal · Count-up stats · Marquee ticker · Live badges
// ═══════════════════════════════════════════════════════════════
(function () {
    'use strict';

    const GOLD = '#B8860B';
    const isHome = window.location.pathname.includes('j_o_luxury_boutique_home');

    // ── Shared styles ─────────────────────────────────────────────
    const baseStyle = document.createElement('style');
    baseStyle.textContent = `
    .jo-live-dot {
        width: 7px; height: 7px; background: ${GOLD};
        border-radius: 50% !important; flex-shrink: 0;
        animation: joPulse 1.4s infinite;
    }
    @keyframes joPulse {
        0%,100% { opacity:1; transform:scale(1); }
        50%      { opacity:0.4; transform:scale(1.6); }
    }
    @keyframes joSlideInLeft {
        from { opacity:0; transform:translateX(-110%); }
        to   { opacity:1; transform:translateX(0); }
    }
    @keyframes joSlideUp {
        from { transform:translateY(100%); opacity:0; }
        to   { transform:translateY(0); opacity:1; }
    }
    @keyframes joFadeUp {
        from { opacity:0; transform:translateY(28px); }
        to   { opacity:1; transform:translateY(0); }
    }
    `;
    document.head.appendChild(baseStyle);

    // ════════════════════════════════════════════════════════════
    //  1. SCROLL REVEAL
    // ════════════════════════════════════════════════════════════
    function initScrollReveal() {
        const s = document.createElement('style');
        s.textContent = `
        .jo-reveal { opacity:0; transform:translateY(28px); transition:opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1); }
        .jo-reveal.jo-visible { opacity:1; transform:translateY(0); }
        .jo-reveal-d1 { transition-delay:0.08s; }
        .jo-reveal-d2 { transition-delay:0.16s; }
        .jo-reveal-d3 { transition-delay:0.24s; }
        `;
        document.head.appendChild(s);

        if (!isHome) return;

        // Sections 2+ on homepage
        document.querySelectorAll('main > main section, section:not(:first-child)').forEach(section => {
            const headings = section.querySelectorAll('h2');
            headings.forEach(h => h.classList.add('jo-reveal'));
        });

        // Product grid cards
        document.querySelectorAll('.grid > div.group, .grid > a.group').forEach((el, i) => {
            el.classList.add('jo-reveal');
            const d = i % 3;
            if (d === 1) el.classList.add('jo-reveal-d1');
            if (d === 2) el.classList.add('jo-reveal-d2');
        });

        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('jo-visible'); obs.unobserve(e.target); } });
        }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });

        document.querySelectorAll('.jo-reveal').forEach(el => obs.observe(el));
    }

    // ════════════════════════════════════════════════════════════
    //  2. LUXURY MARQUEE TICKER
    // ════════════════════════════════════════════════════════════
    function initMarquee() {
        if (!isHome || document.getElementById('jo-marquee')) return;

        const items = [
            '✦ NEW ARRIVALS DROPPING WEEKLY',
            '✦ SAME-DAY DELIVERY IN LAGOS',
            '✦ 100% AUTHENTIC LUXURY PIECES',
            '✦ 30-DAY HASSLE-FREE RETURNS',
            '✦ WHATSAPP PERSONAL STYLING',
            '✦ WATCHES · BAGS · CLOTHING · JEWELLERY',
            '✦ BORN IN LAGOS, LOVED WORLDWIDE',
            '✦ FREE DELIVERY OVER $500',
        ];
        const text = (items.join('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;') + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;').repeat(3);

        const marquee = document.createElement('div');
        marquee.id = 'jo-marquee';
        marquee.innerHTML = `<div id="jo-marquee-track"><span>${text}</span></div>`;

        const s = document.createElement('style');
        s.textContent = `
        #jo-marquee { background:#000; overflow:hidden; padding:10px 0; border-top:1px solid rgba(197,160,89,0.2); border-bottom:1px solid rgba(197,160,89,0.2); }
        #jo-marquee-track { display:flex; white-space:nowrap; animation:joMarquee 38s linear infinite; }
        #jo-marquee-track span { font-family:'Montserrat',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; color:${GOLD}; }
        #jo-marquee:hover #jo-marquee-track { animation-play-state:paused; }
        @keyframes joMarquee { from{transform:translateX(0)} to{transform:translateX(-33.33%)} }
        `;
        document.head.appendChild(s);

        // Place after hero
        const hero = document.querySelector('section[style*="62vh"], main > section:first-of-type, main section:first-child');
        if (hero && hero.nextElementSibling) {
            hero.parentNode.insertBefore(marquee, hero.nextElementSibling);
        }
    }

    // ════════════════════════════════════════════════════════════
    //  3. COUNT-UP STATS ANIMATION
    // ════════════════════════════════════════════════════════════
    function initCountUp() {
        if (!isHome) return;

        document.querySelectorAll('[class*="text-3xl"][class*="text-gold"], [class*="font-serif"][class*="text-3xl"][class*="text-gold"]').forEach(el => {
            const raw = el.textContent.trim();
            const m   = raw.match(/^([\d.]+)(.*)/);
            if (!m) return;

            const target = parseFloat(m[1]);
            const suffix = m[2] || '';
            const dec    = raw.includes('.');
            let done     = false;

            const obs = new IntersectionObserver(([e]) => {
                if (e.isIntersecting && !done) {
                    done = true;
                    const t0 = performance.now();
                    const dur = 1600;
                    const run = (now) => {
                        const p = Math.min((now - t0) / dur, 1);
                        const v = target * (1 - Math.pow(1 - p, 3));
                        el.textContent = (dec ? v.toFixed(1) : Math.round(v)) + suffix;
                        if (p < 1) requestAnimationFrame(run);
                    };
                    requestAnimationFrame(run);
                    obs.unobserve(el);
                }
            }, { threshold: 0.6 });
            obs.observe(el);
        });
    }

    // ════════════════════════════════════════════════════════════
    //  4. LIVE "JUST IN" BADGES ON NEW ARRIVALS
    // ════════════════════════════════════════════════════════════
    function initLiveBadges() {
        if (!isHome) return;

        const s = document.createElement('style');
        s.textContent = `
        .jo-just-in {
            position:absolute; top:10px; right:10px; z-index:20;
            display:inline-flex; align-items:center; gap:5px;
            background:#000; color:${GOLD};
            font-family:'Montserrat',sans-serif; font-size:8px; font-weight:700;
            letter-spacing:0.14em; text-transform:uppercase;
            padding:3px 9px; border:1px solid ${GOLD};
            border-radius:0 !important;
        }
        `;
        document.head.appendChild(s);

        const cards = document.querySelectorAll('#carousel-track > div');
        cards.forEach((card, i) => {
            if (i < 2) {
                const b = document.createElement('div');
                b.className = 'jo-just-in';
                b.innerHTML = `<span class="jo-live-dot"></span>JUST IN`;
                card.style.position = 'relative';
                card.appendChild(b);
            }
        });
    }

    // ════════════════════════════════════════════════════════════
    //  5. LIVE VISITORS COUNTER (bottom-left, homepage only)
    // ════════════════════════════════════════════════════════════
    function initVisitors() {
        if (!isHome || document.getElementById('jo-visitors')) return;

        const base = [44, 51, 58, 63, 47, 55, 69, 42];
        let n = base[Math.floor(Math.random() * base.length)];

        const div = document.createElement('div');
        div.id = 'jo-visitors';
        div.innerHTML = `<span class="jo-live-dot"></span><span id="jo-v-count">${n}</span>&nbsp;people shopping now`;

        const s = document.createElement('style');
        s.textContent = `
        #jo-visitors {
            position:fixed; bottom:168px; left:16px; z-index:8000;
            display:flex; align-items:center; gap:7px;
            background:rgba(0,0,0,0.88); color:#FBFBF9;
            font-family:'Montserrat',sans-serif; font-size:10px; font-weight:500; letter-spacing:0.08em;
            padding:7px 14px; border-left:2px solid ${GOLD}; backdrop-filter:blur(4px);
            animation:joSlideInLeft 0.6s 3s cubic-bezier(0.16,1,0.3,1) both;
        }
        `;
        document.head.appendChild(s);
        document.body.appendChild(div);

        setInterval(() => {
            n = Math.max(28, Math.min(85, n + (Math.random() < 0.5 ? 1 : -1)));
            const el = document.getElementById('jo-v-count');
            if (el) { el.style.transition = 'color 0.3s'; el.style.color = GOLD; el.textContent = n; setTimeout(() => { el.style.color = ''; }, 600); }
        }, 9000 + Math.random() * 5000);
    }

    // ════════════════════════════════════════════════════════════
    //  6. LIVE INDICATOR ON FLASH SALE SECTION
    // ════════════════════════════════════════════════════════════
    function initFlashLive() {
        if (!isHome) return;
        const heading = document.querySelector('#countdown-hours')?.closest('section')?.querySelector('h2');
        if (!heading || heading.querySelector('.jo-flash-live')) return;

        const pill = document.createElement('span');
        pill.className = 'jo-flash-live';
        pill.innerHTML = `<span style="width:7px;height:7px;background:#ff3333;border-radius:50%!important;animation:joPulse 1.2s infinite;display:inline-block;margin-right:5px;"></span>LIVE`;
        pill.style.cssText = `
            display:inline-flex;align-items:center;
            background:#ff3333;color:#fff;
            font-family:'Montserrat',sans-serif;font-size:8px;font-weight:700;letter-spacing:0.12em;
            padding:3px 9px;margin-left:12px;vertical-align:middle;border-radius:0!important;
        `;
        heading.appendChild(pill);
    }

    // ════════════════════════════════════════════════════════════
    //  7. BAG REMINDER BAR (when items in cart)
    // ════════════════════════════════════════════════════════════
    function initBagBar() {
        if (!isHome || document.getElementById('jo-bag-bar')) return;

        setTimeout(() => {
            const cart = (() => { try { return JSON.parse(localStorage.getItem('j_o_cart') || '[]'); } catch(e) { return []; } })();
            if (!cart.length) return;

            const bar = document.createElement('div');
            bar.id = 'jo-bag-bar';

            const names = cart.slice(0,2).map(i => `<strong style="color:${GOLD}">${i.name}</strong>`).join(' &amp; ');
            const more  = cart.length > 2 ? ` + ${cart.length - 2} more` : '';

            bar.innerHTML = `
                <span style="font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:0.06em;color:#FBFBF9;">
                    🛍️ &nbsp;${names}${more} — still waiting in your bag
                </span>
                <a href="../shopping_bag/"
                   style="flex-shrink:0;font-family:'Montserrat',sans-serif;font-size:10px;font-weight:700;
                          letter-spacing:0.18em;text-transform:uppercase;color:${GOLD};
                          text-decoration:none;border-bottom:1px solid ${GOLD};padding-bottom:1px;">
                    COMPLETE ORDER →
                </a>
                <button onclick="this.parentElement.remove()"
                    style="background:none;border:none;color:#666;font-size:16px;cursor:pointer;padding:0 0 0 8px;flex-shrink:0;">×</button>`;

            const s = document.createElement('style');
            s.textContent = `
            #jo-bag-bar {
                position:fixed; bottom:0; left:0; right:0; z-index:7500;
                background:rgba(0,0,0,0.94); backdrop-filter:blur(8px);
                border-top:1px solid rgba(197,160,89,0.25);
                padding:12px 20px; display:flex; align-items:center; gap:16px;
                animation:joSlideUp 0.5s cubic-bezier(0.16,1,0.3,1) both;
            }
            #jo-bag-bar span { flex:1; }
            `;
            document.head.appendChild(s);
            document.body.appendChild(bar);

            setTimeout(() => { bar.style.transition = 'opacity 0.4s'; bar.style.opacity = '0'; setTimeout(() => bar.remove(), 400); }, 10000);
        }, 4000);
    }

    // ── Boot ──────────────────────────────────────────────────────
    function boot() {
        initScrollReveal();
        initMarquee();
        initCountUp();
        initLiveBadges();
        initVisitors();
        initFlashLive();
        initBagBar();
    }

    if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', boot); }
    else { boot(); }

})();
