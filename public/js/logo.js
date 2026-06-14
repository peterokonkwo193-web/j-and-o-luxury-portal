// ═══════════════════════════════════════════════════════════════
//  J & O LUXURY BOUTIQUE — PREMIUM LOGO DESIGN SYSTEM
//  Replaces plain text logo with a fully designed logo mark
// ═══════════════════════════════════════════════════════════════
(function () {
    'use strict';

    // ── Logo SVG mark (used in nav — compact version) ─────────────
    function navLogoSVG(color) {
        color = color || '#000000';
        const gold = '#B8860B';
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 48"
                     width="140" height="48" aria-label="J & O Luxury Boutique"
                     style="display:block;overflow:visible;">
            <!-- Top ornament line with diamonds -->
            <line x1="4"   y1="9" x2="52" y2="9" stroke="${gold}" stroke-width="0.6" opacity="0.7"/>
            <polygon points="62,5 65,9 62,13 59,9" fill="${gold}"/>
            <line x1="72"  y1="9" x2="100" y2="9" stroke="${gold}" stroke-width="0.6" opacity="0.7"/>
            <polygon points="110,5 113,9 110,13 107,9" fill="${gold}"/>
            <line x1="120" y1="9" x2="136" y2="9" stroke="${gold}" stroke-width="0.6" opacity="0.7"/>

            <!-- J & O text -->
            <text x="70" y="36"
                  font-family="'Playfair Display', Georgia, serif"
                  font-size="24"
                  font-weight="700"
                  letter-spacing="6"
                  text-anchor="middle"
                  fill="${color}"
                  style="font-feature-settings:'kern' 1;">J &amp; O</text>

            <!-- Bottom ornament line with diamonds -->
            <line x1="4"   y1="44" x2="52" y2="44" stroke="${gold}" stroke-width="0.6" opacity="0.7"/>
            <polygon points="62,40 65,44 62,48 59,44" fill="${gold}"/>
            <line x1="72"  y1="44" x2="100" y2="44" stroke="${gold}" stroke-width="0.6" opacity="0.7"/>
            <polygon points="110,40 113,44 110,48 107,44" fill="${gold}"/>
            <line x1="120" y1="44" x2="136" y2="44" stroke="${gold}" stroke-width="0.6" opacity="0.7"/>
        </svg>`;
    }

    // ── Full logo mark (used in hero — large version) ─────────────
    function heroLogoHTML() {
        const gold = '#B8860B';
        return `
        <div class="jo-hero-logo" style="display:inline-flex;flex-direction:column;align-items:center;gap:6px;">
            <!-- Eyebrow -->
            <span style="font-family:'Montserrat',sans-serif;font-size:8.5px;font-weight:700;
                         letter-spacing:0.4em;text-transform:uppercase;color:${gold};
                         opacity:0.9;">ATELIER LAGOS &nbsp;•&nbsp; ABUJA &nbsp;•&nbsp; LONDON</span>

            <!-- Full ornament row: line ◆ J & O ◆ line -->
            <div style="display:flex;align-items:center;gap:10px;">
                <div style="width:clamp(24px,6vw,64px);height:1px;
                            background:linear-gradient(to right,transparent,${gold});opacity:0.6;"></div>
                <svg viewBox="0 0 12 12" width="10" height="10">
                    <polygon points="6,0 12,6 6,12 0,6" fill="${gold}"/>
                </svg>
                <div class="jo-logo-main-text"
                     style="font-family:'Playfair Display',Georgia,serif;
                            font-size:clamp(38px,8vw,72px);
                            font-weight:700;
                            letter-spacing:0.14em;
                            color:#FBFBF9;
                            line-height:1;
                            text-shadow:0 2px 32px rgba(0,0,0,0.3);">J &amp; O</div>
                <svg viewBox="0 0 12 12" width="10" height="10">
                    <polygon points="6,0 12,6 6,12 0,6" fill="${gold}"/>
                </svg>
                <div style="width:clamp(24px,6vw,64px);height:1px;
                            background:linear-gradient(to left,transparent,${gold});opacity:0.6;"></div>
            </div>

            <!-- Thin gold rule -->
            <div style="width:clamp(120px,30vw,240px);height:1px;
                        background:linear-gradient(to right,transparent,${gold} 30%,${gold} 70%,transparent);
                        margin:2px 0;"></div>

            <!-- Tagline -->
            <span style="font-family:'Playfair Display',Georgia,serif;
                         font-style:italic;
                         font-size:clamp(12px,1.8vw,18px);
                         letter-spacing:0.12em;
                         color:rgba(255,255,255,0.75);">&ldquo;Where Style Meets Elegance&rdquo;</span>
        </div>`;
    }

    // ── CSS styles ────────────────────────────────────────────────
    function injectStyles() {
        const s = document.createElement('style');
        s.textContent = `
        /* ── Nav logo enhancement ── */
        .jo-nav-logo-wrap {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            transition: opacity 0.3s ease;
            line-height: 1;
        }
        .jo-nav-logo-wrap:hover { opacity: 0.75; }
        .jo-nav-logo-wrap svg { overflow: visible; }

        /* ── Hero logo animation ── */
        .jo-hero-logo { animation: joLogoIn 1.2s cubic-bezier(0.16,1,0.3,1) both; }
        @keyframes joLogoIn {
            from { opacity:0; transform:translateY(16px) scale(0.96); }
            to   { opacity:1; transform:translateY(0) scale(1); }
        }

        /* ── Footer logo ── */
        .jo-footer-logo {
            font-family:'Playfair Display',Georgia,serif;
            font-size: 28px;
            font-weight: 700;
            letter-spacing: 0.2em;
            color: #FBFBF9;
            text-decoration: none;
            position: relative;
            display: inline-block;
            transition: color 0.3s;
        }
        .jo-footer-logo::after {
            content: '';
            position: absolute;
            bottom: -3px; left: 0; right: 0;
            height: 1px;
            background: #B8860B;
            transform: scaleX(0.4);
            transform-origin: center;
            transition: transform 0.4s ease;
        }
        .jo-footer-logo:hover::after { transform: scaleX(1); }

        /* ── Dark background logo (white text) ── */
        .jo-logo-on-dark svg text { fill: #FBFBF9 !important; }
        `;
        document.head.appendChild(s);
    }

    // ── Replace nav logos ─────────────────────────────────────────
    function replaceNavLogos() {
        // Standard boutique nav: find links with exact J & O or J &amp; O text pointing to boutique home
        document.querySelectorAll('a[href*="j_o_luxury_boutique_home"]').forEach(link => {
            const text = link.textContent.trim();
            if (text === 'J & O' || text === 'J &amp; O' || text === 'J & O') {
                // Determine if on dark background
                const isOnDark = link.classList.contains('text-\\[\\#FBFBF9\\]') ||
                                  link.closest('[class*="bg-primary"]') ||
                                  link.closest('header[style*="background:#000"]') ||
                                  link.classList.contains('text-white') ||
                                  getComputedStyle(link).color === 'rgb(251, 251, 249)';

                const textColor = isOnDark ? '#FBFBF9' : '#000000';

                link.className = 'jo-nav-logo-wrap ' + link.className;
                link.innerHTML = navLogoSVG(textColor);
            }
        });
    }

    // ── Replace hero logo ─────────────────────────────────────────
    function replaceHeroLogo() {
        const isHome = window.location.pathname.includes('j_o_luxury_boutique_home');
        if (!isHome) return;

        // Find the hero h1 and tagline and replace them
        const heroSection = document.querySelector('section[style*="62vh"], section.relative.w-full.overflow-hidden');
        if (!heroSection) return;

        // Find the hero content div
        const heroContent = heroSection.querySelector('[style*="inset:0"][style*="z-index:10"]');
        if (!heroContent) return;

        // Replace inner content with designed logo
        heroContent.innerHTML = `
            ${heroLogoHTML()}

            <!-- CTA Buttons -->
            <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:28px;animation:joLogoIn 1.4s cubic-bezier(0.16,1,0.3,1) 0.3s both;">
                <a href="../shop_all_collections/?gender=women"
                   style="padding:12px 32px;background:#FBFBF9;color:#000;
                          font-family:'Montserrat',sans-serif;font-size:10px;font-weight:700;
                          letter-spacing:0.22em;text-transform:uppercase;text-decoration:none;
                          transition:background 0.3s,color 0.3s;"
                   onmouseover="this.style.background='#B8860B';this.style.color='#000';"
                   onmouseout="this.style.background='#FBFBF9';this.style.color='#000';">SHOP WOMEN</a>
                <a href="../shop_all_collections/?gender=men"
                   style="padding:12px 32px;border:1px solid rgba(251,251,249,0.7);color:#FBFBF9;
                          font-family:'Montserrat',sans-serif;font-size:10px;font-weight:400;
                          letter-spacing:0.22em;text-transform:uppercase;text-decoration:none;
                          transition:background 0.3s,color 0.3s;"
                   onmouseover="this.style.background='#FBFBF9';this.style.color='#000';"
                   onmouseout="this.style.background='transparent';this.style.color='#FBFBF9';">SHOP MEN</a>
            </div>

            <!-- Scroll arrow -->
            <div style="position:absolute;bottom:20px;left:50%;transform:translateX(-50%);
                        display:flex;flex-direction:column;align-items:center;gap:3px;
                        animation:bounce 2s infinite;opacity:0.5;">
                <span style="font-family:'Montserrat',sans-serif;font-size:7.5px;font-weight:700;
                             letter-spacing:0.35em;color:#FBFBF9;">SCROLL</span>
                <span class="material-symbols-outlined" style="font-size:16px;color:#FBFBF9;">expand_more</span>
            </div>`;
    }

    // ── Init ──────────────────────────────────────────────────────
    function init() {
        injectStyles();
        replaceNavLogos();
        replaceHeroLogo();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
