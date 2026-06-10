// ═══════════════════════════════════════════════════════════════
//  J & O LUXURY BOUTIQUE — MEMBER AUTH & LEFT-SIDE PROFILE PANEL
//  Sign Up / Sign In  →  Left-side personalised profile
// ═══════════════════════════════════════════════════════════════
(function () {
    'use strict';

    const SUPABASE_URL = window.SUPABASE_URL || 'https://sbvjlyssocivvttdqjjl.supabase.co';
    const SUPABASE_KEY = window.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNidmpseXNzb2NpdnZ0dGRxampsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMjc4OTEsImV4cCI6MjA5NTkwMzg5MX0.cbqNEagoj5FRuyp4G_5esvL6Mdabptz_-4JOZTlotPw';

    function db() {
        return window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;
    }

    // ── Helpers ──────────────────────────────────────────────────
    function getMember()      { try { return JSON.parse(localStorage.getItem('jo_member') || 'null'); } catch(e) { return null; } }
    function saveMember(data) { localStorage.setItem('jo_member', JSON.stringify(data)); }
    function signOut()        { localStorage.removeItem('jo_member'); location.reload(); }
    function firstName(m)     { return m.full_name.trim().split(' ')[0]; }
    function initials(m)      { return m.full_name.trim().split(' ').map(w => w[0]).slice(0,2).join('').toUpperCase(); }

    // ── Validation ───────────────────────────────────────────────
    function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }
    function validPhone(v) { return /^(\+?234|0)[789]\d{9}$/.test(v.replace(/[\s\-(). ]/g,'')); }
    function validName(v)  { return v.trim().length >= 2; }

    // ── Styles ───────────────────────────────────────────────────
    function addStyles() {
        const s = document.createElement('style');
        s.textContent = `
        /* ═══ MODAL ═══ */
        #jo-auth-overlay {
            position:fixed; inset:0; z-index:99999;
            background:rgba(0,0,0,0.72); backdrop-filter:blur(4px);
            display:flex; align-items:center; justify-content:center; padding:16px;
            opacity:0; pointer-events:none; transition:opacity 0.3s ease;
        }
        #jo-auth-overlay.open { opacity:1; pointer-events:all; }
        #jo-auth-box {
            background:#FBFBF9; width:100%; max-width:440px; position:relative;
            padding:44px 40px; transform:translateY(20px);
            transition:transform 0.4s cubic-bezier(0.16,1,0.3,1);
            border-radius:0 !important; box-shadow:0 32px 80px rgba(0,0,0,0.22);
            max-height:90vh; overflow-y:auto;
        }
        #jo-auth-overlay.open #jo-auth-box { transform:translateY(0); }
        #jo-auth-close {
            position:absolute; top:14px; right:16px;
            background:none; border:none; font-size:22px; color:#aaa; cursor:pointer;
        }
        #jo-auth-close:hover { color:#000; }

        /* Form */
        .jo-auth-eyebrow { font-family:'Montserrat',sans-serif; font-size:9.5px; font-weight:700; letter-spacing:0.35em; text-transform:uppercase; color:#C5A059; text-align:center; display:block; margin-bottom:10px; }
        .jo-auth-divider { width:30px; height:1.5px; background:#C5A059; margin:0 auto 14px; }
        .jo-auth-title   { font-family:'Playfair Display',serif; font-size:clamp(20px,4vw,26px); font-weight:700; color:#000; text-align:center; margin:0 0 6px; line-height:1.2; }
        .jo-auth-sub     { font-family:'Montserrat',sans-serif; font-size:11px; color:#888; text-align:center; margin:0 0 24px; line-height:1.6; }

        .jo-field-group { margin-bottom:14px; }
        .jo-field-group label { display:block; font-family:'Montserrat',sans-serif; font-size:9px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:#666; margin-bottom:5px; }
        .jo-field-group input { width:100%; border:1.5px solid #ddd; padding:12px 14px; font-family:'Montserrat',sans-serif; font-size:13px; color:#000; background:#fff; outline:none; transition:border-color 0.2s; border-radius:0 !important; box-sizing:border-box; }
        .jo-field-group input:focus { border-color:#000; }
        .jo-field-group input.error { border-color:#C0392B; }
        .jo-field-error { font-family:'Montserrat',sans-serif; font-size:10px; color:#C0392B; margin-top:4px; display:none; }
        .jo-field-error.show { display:block; }
        .jo-phone-hint  { font-family:'Montserrat',sans-serif; font-size:9px; color:#bbb; margin-top:3px; }

        #jo-auth-submit { width:100%; background:#000; color:#fff; border:none; padding:14px; font-family:'Montserrat',sans-serif; font-size:11px; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; cursor:pointer; transition:background 0.3s; border-radius:0 !important; margin-top:6px; }
        #jo-auth-submit:hover { background:#C5A059; color:#000; }
        #jo-auth-submit:disabled { opacity:0.6; cursor:not-allowed; }

        .jo-auth-toggle { text-align:center; margin-top:14px; font-family:'Montserrat',sans-serif; font-size:11px; color:#999; }
        .jo-auth-toggle a { color:#000; font-weight:700; text-decoration:underline; cursor:pointer; }
        .jo-auth-toggle a:hover { color:#C5A059; }

        #jo-auth-success { text-align:center; padding:8px 0; }
        #jo-auth-success .success-icon { font-size:44px; margin-bottom:12px; display:block; }
        #jo-auth-success h2 { font-family:'Playfair Display',serif; font-size:24px; font-weight:700; color:#000; margin:0 0 8px; }
        #jo-auth-success p  { font-family:'Montserrat',sans-serif; font-size:12px; color:#666; line-height:1.7; margin:0 0 18px; }

        /* ═══ NAV PERSON ICON BUTTON ═══ */
        #jo-nav-auth-btn {
            display:flex; align-items:center; justify-content:center;
            width:36px; height:36px; cursor:pointer; position:relative;
            background:none; border:none; color:inherit;
            transition:color 0.25s;
        }
        #jo-nav-auth-btn:hover { color:#C5A059; }
        #jo-nav-avatar {
            width:28px; height:28px; background:#C5A059; color:#000;
            font-family:'Playfair Display',serif; font-size:11px; font-weight:700;
            display:flex; align-items:center; justify-content:center;
            border-radius:0 !important; flex-shrink:0;
            transition:background 0.2s;
        }
        #jo-nav-auth-btn:hover #jo-nav-avatar { background:#000; color:#C5A059; }

        /* ═══ LEFT-SIDE PROFILE PANEL ═══ */
        #jo-profile-left {
            position:fixed; left:0; top:50%; transform:translateY(-50%);
            z-index:8500; display:flex; align-items:center;
        }

        /* The always-visible tab on the left edge */
        #jo-profile-tab {
            background:#000; color:#C5A059;
            padding:20px 8px; cursor:pointer;
            display:flex; flex-direction:column; align-items:center; gap:8px;
            writing-mode:vertical-rl; text-orientation:mixed;
            transform:rotate(180deg);
            font-family:'Montserrat',sans-serif; font-size:9px;
            font-weight:700; letter-spacing:0.18em; text-transform:uppercase;
            border-right:2px solid #C5A059;
            transition:background 0.25s, color 0.25s;
            user-select:none;
        }
        #jo-profile-tab:hover { background:#C5A059; color:#000; }

        /* The slide-out panel */
        #jo-profile-panel {
            background:#fff; width:260px;
            box-shadow:6px 0 32px rgba(0,0,0,0.14);
            border-right:2px solid #C5A059;
            transform:translateX(-100%);
            transition:transform 0.38s cubic-bezier(0.16,1,0.3,1);
            overflow:hidden; max-height:80vh; overflow-y:auto;
        }
        #jo-profile-panel.open { transform:translateX(0); }

        /* Panel header */
        .jo-panel-header {
            background:#000; padding:24px 20px;
            display:flex; flex-direction:column; gap:6px;
        }
        .jo-panel-avatar {
            width:52px; height:52px; background:#C5A059; color:#000;
            font-family:'Playfair Display',serif; font-size:20px; font-weight:700;
            display:flex; align-items:center; justify-content:center;
            border-radius:0 !important; margin-bottom:6px;
        }
        .jo-panel-greeting { font-family:'Playfair Display',serif; font-size:17px; font-weight:600; color:#FBFBF9; }
        .jo-panel-email    { font-family:'Montserrat',sans-serif; font-size:10px; color:#C5A059; letter-spacing:0.06em; word-break:break-all; }

        /* Panel links */
        .jo-panel-link {
            display:flex; align-items:center; gap:12px;
            padding:14px 20px; text-decoration:none;
            font-family:'Montserrat',sans-serif; font-size:11px;
            font-weight:600; letter-spacing:0.1em; text-transform:uppercase;
            color:#333; border-bottom:1px solid #f0f0f0;
            transition:background 0.2s, color 0.2s; cursor:pointer;
            background:none; border-left:none; border-right:none; border-top:none;
            width:100%; text-align:left;
        }
        .jo-panel-link:hover { background:#fdf8ef; color:#C5A059; }
        .jo-panel-link .material-symbols-outlined { font-size:17px !important; color:#C5A059; }

        /* Sign out */
        #jo-panel-signout {
            margin:12px 20px 20px;
            width:calc(100% - 40px);
            background:#000; color:#FBFBF9; border:none; padding:12px;
            font-family:'Montserrat',sans-serif; font-size:10px; font-weight:700;
            letter-spacing:0.2em; text-transform:uppercase; cursor:pointer;
            transition:background 0.25s; border-radius:0 !important;
        }
        #jo-panel-signout:hover { background:#C5A059; color:#000; }

        /* Overlay when panel is open */
        #jo-profile-overlay {
            position:fixed; inset:0; z-index:8400;
            background:rgba(0,0,0,0.25);
            opacity:0; pointer-events:none; transition:opacity 0.3s;
        }
        #jo-profile-overlay.show { opacity:1; pointer-events:all; }

        /* Mobile: panel at bottom-left, smaller */
        @media (max-width: 768px) {
            #jo-profile-left {
                top:auto; bottom:80px; transform:none;
            }
            #jo-profile-panel { width:220px; max-height:60vh; }
        }
        `;
        document.head.appendChild(s);
    }

    // ── Modal HTML ───────────────────────────────────────────────
    function buildModal() {
        if (document.getElementById('jo-auth-overlay')) return;
        const overlay = document.createElement('div');
        overlay.id = 'jo-auth-overlay';
        overlay.innerHTML = `
        <div id="jo-auth-box">
            <button id="jo-auth-close" aria-label="Close">&times;</button>

            <!-- Sign-up -->
            <div id="jo-signup-view">
                <span class="jo-auth-eyebrow">CREATE ACCOUNT</span>
                <div class="jo-auth-divider"></div>
                <h2 class="jo-auth-title">Join J &amp; O</h2>
                <p class="jo-auth-sub">Members enjoy early access, personalised picks, and WhatsApp concierge.</p>
                <form id="jo-signup-form" novalidate>
                    <div class="jo-field-group">
                        <label for="jo-name">Full Name</label>
                        <input type="text" id="jo-name" placeholder="e.g. Amara Okonkwo" autocomplete="name" required/>
                        <span class="jo-field-error" id="jo-name-err">Please enter your full name</span>
                    </div>
                    <div class="jo-field-group">
                        <label for="jo-email">Email Address</label>
                        <input type="email" id="jo-email" placeholder="e.g. amara@example.com" autocomplete="email" required/>
                        <span class="jo-field-error" id="jo-email-err">Please enter a valid email</span>
                    </div>
                    <div class="jo-field-group">
                        <label for="jo-phone">Phone Number</label>
                        <input type="tel" id="jo-phone" placeholder="e.g. 08012345678" autocomplete="tel" required/>
                        <p class="jo-phone-hint">Nigerian number: 0701…, 0801…, 0901… or +234…</p>
                        <span class="jo-field-error" id="jo-phone-err">Enter a valid Nigerian phone number</span>
                    </div>
                    <div id="jo-form-error" class="jo-field-error"></div>
                    <button type="submit" id="jo-auth-submit">CREATE ACCOUNT</button>
                </form>
                <p class="jo-auth-toggle">Already a member? <a id="jo-switch-to-signin">Sign in</a></p>
            </div>

            <!-- Sign-in -->
            <div id="jo-signin-view" style="display:none">
                <span class="jo-auth-eyebrow">WELCOME BACK</span>
                <div class="jo-auth-divider"></div>
                <h2 class="jo-auth-title">Sign In</h2>
                <p class="jo-auth-sub">Enter your email and phone number to access your account.</p>
                <form id="jo-signin-form" novalidate>
                    <div class="jo-field-group">
                        <label for="jo-si-email">Email Address</label>
                        <input type="email" id="jo-si-email" placeholder="Your registered email" autocomplete="email" required/>
                        <span class="jo-field-error" id="jo-si-email-err">Please enter your email</span>
                    </div>
                    <div class="jo-field-group">
                        <label for="jo-si-phone">Phone Number</label>
                        <input type="tel" id="jo-si-phone" placeholder="Your registered phone" autocomplete="tel" required/>
                        <span class="jo-field-error" id="jo-si-phone-err">Please enter your phone number</span>
                    </div>
                    <div id="jo-si-error" class="jo-field-error"></div>
                    <button type="submit" id="jo-auth-submit">SIGN IN</button>
                </form>
                <p class="jo-auth-toggle">New here? <a id="jo-switch-to-signup">Create account</a></p>
            </div>

            <!-- Success -->
            <div id="jo-auth-success" style="display:none">
                <span class="success-icon">🎉</span>
                <div class="jo-auth-divider" style="margin:0 auto 14px;"></div>
                <h2 id="jo-success-name">Welcome!</h2>
                <p id="jo-success-msg">Your J &amp; O account is ready.</p>
                <button onclick="document.getElementById('jo-auth-overlay').classList.remove('open')"
                    style="background:#000;color:#fff;border:none;padding:12px 28px;font-family:'Montserrat',sans-serif;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;cursor:pointer;border-radius:0!important;">
                    EXPLORE
                </button>
            </div>
        </div>`;
        document.body.appendChild(overlay);

        overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });
        document.getElementById('jo-auth-close').addEventListener('click', () => overlay.classList.remove('open'));
        document.addEventListener('keydown', e => { if (e.key === 'Escape') overlay.classList.remove('open'); });
        document.getElementById('jo-switch-to-signin').addEventListener('click', () => switchView('signin'));
        document.getElementById('jo-switch-to-signup').addEventListener('click', () => switchView('signup'));
        document.getElementById('jo-signup-form').addEventListener('submit', handleSignUp);
        document.getElementById('jo-signin-form').addEventListener('submit', handleSignIn);
    }

    function switchView(v) {
        document.getElementById('jo-signup-view').style.display  = v === 'signup'  ? '' : 'none';
        document.getElementById('jo-signin-view').style.display  = v === 'signin'  ? '' : 'none';
        document.getElementById('jo-auth-success').style.display = 'none';
        document.getElementById('jo-auth-submit').textContent    = v === 'signup' ? 'CREATE ACCOUNT' : 'SIGN IN';
    }

    // ── Nav icon injection ───────────────────────────────────────
    function injectNavIcon(member) {
        if (document.getElementById('jo-nav-auth-btn')) return;

        // Find right icons container via cart badge
        const cartBadge = document.getElementById('cart-badge');
        const rightNav  = cartBadge
            ? cartBadge.closest('div')
            : document.querySelector('.flex.items-center.gap-2, .flex.items-center.gap-3');
        if (!rightNav) return;

        const btn = document.createElement('button');
        btn.id = 'jo-nav-auth-btn';
        btn.title = member ? `Hello, ${firstName(member)}` : 'Sign In / Join';
        btn.setAttribute('aria-label', member ? 'My Profile' : 'Sign In or Join');

        if (member) {
            btn.innerHTML = `<div id="jo-nav-avatar">${initials(member)}</div>`;
            btn.onclick = () => toggleProfilePanel();
        } else {
            btn.innerHTML = `<span class="material-symbols-outlined" style="font-size:22px;">person</span>`;
            btn.onclick = () => openModal();
        }

        // Insert before search button (first child) — keeps nav uncluttered
        rightNav.prepend(btn);
    }

    // ── Left-side profile panel ──────────────────────────────────
    function buildProfilePanel(member) {
        if (!member || document.getElementById('jo-profile-left')) return;

        // Overlay backdrop
        const overlay = document.createElement('div');
        overlay.id = 'jo-profile-overlay';
        overlay.onclick = () => closeProfilePanel();
        document.body.appendChild(overlay);

        // Panel wrapper
        const wrap = document.createElement('div');
        wrap.id = 'jo-profile-left';
        wrap.innerHTML = `
            <!-- Always-visible tab strip -->
            <div id="jo-profile-tab" onclick="window._joToggleProfile()">
                <span style="font-family:'Playfair Display',serif;font-size:13px;font-weight:700;letter-spacing:0.1em;">${initials(member)}</span>
                <span style="font-size:8px;letter-spacing:0.15em;margin-top:2px;">PROFILE</span>
            </div>

            <!-- Slide-out panel -->
            <div id="jo-profile-panel">
                <div class="jo-panel-header">
                    <div class="jo-panel-avatar">${initials(member)}</div>
                    <p class="jo-panel-greeting">Hello, ${firstName(member)} ✦</p>
                    <p class="jo-panel-email">${member.email}</p>
                </div>

                <a href="../my_wishlist/" class="jo-panel-link">
                    <span class="material-symbols-outlined">favorite</span>My Wishlist
                </a>
                <a href="../shopping_bag/" class="jo-panel-link">
                    <span class="material-symbols-outlined">shopping_bag</span>My Bag
                </a>
                <a href="../order_confirmation/" class="jo-panel-link">
                    <span class="material-symbols-outlined">local_shipping</span>My Orders
                </a>
                <a href="../concierge_faq/" class="jo-panel-link">
                    <span class="material-symbols-outlined">support_agent</span>Concierge
                </a>
                <a href="../size_guide/" class="jo-panel-link">
                    <span class="material-symbols-outlined">straighten</span>Size Guide
                </a>

                <button id="jo-panel-signout" onclick="window.joSignOut()">SIGN OUT</button>
            </div>`;
        document.body.appendChild(wrap);
    }

    function toggleProfilePanel() {
        const panel   = document.getElementById('jo-profile-panel');
        const overlay = document.getElementById('jo-profile-overlay');
        if (!panel) return;
        const isOpen = panel.classList.contains('open');
        panel.classList.toggle('open', !isOpen);
        if (overlay) overlay.classList.toggle('show', !isOpen);
    }

    function closeProfilePanel() {
        const panel   = document.getElementById('jo-profile-panel');
        const overlay = document.getElementById('jo-profile-overlay');
        if (panel)   panel.classList.remove('open');
        if (overlay) overlay.classList.remove('show');
    }

    window._joToggleProfile = toggleProfilePanel;

    // ── Personalise page (do NOT touch announcement bar layout) ──
    function personalise(member) {
        // Announcement bar stays untouched — changing it breaks the layout
        // The left-side panel is enough personalisation
    }

    // ── Form helpers ─────────────────────────────────────────────
    function showErr(id, show)  { const el = document.getElementById(id); if (el) el.classList.toggle('show', show); }
    function setErr(el, has)    { if (el) el.classList.toggle('error', has); }

    // ── Sign Up ──────────────────────────────────────────────────
    async function handleSignUp(e) {
        e.preventDefault();
        const nameEl  = document.getElementById('jo-name');
        const emailEl = document.getElementById('jo-email');
        const phoneEl = document.getElementById('jo-phone');
        const errEl   = document.getElementById('jo-form-error');
        const btn     = document.getElementById('jo-auth-submit');

        const ok = { name: validName(nameEl.value), email: validEmail(emailEl.value), phone: validPhone(phoneEl.value) };
        setErr(nameEl, !ok.name);   showErr('jo-name-err', !ok.name);
        setErr(emailEl, !ok.email); showErr('jo-email-err', !ok.email);
        setErr(phoneEl, !ok.phone); showErr('jo-phone-err', !ok.phone);
        if (!ok.name || !ok.email || !ok.phone) return;

        btn.disabled = true; btn.textContent = 'CREATING…'; errEl.style.display = 'none';

        try {
            const client = db();
            if (client) {
                const { data: existing } = await client.from('members').select('id,full_name,email,phone').eq('email', emailEl.value.trim().toLowerCase()).maybeSingle();
                if (existing) { saveMember({ full_name: existing.full_name, email: existing.email, phone: existing.phone }); showSuccess({ full_name: existing.full_name, email: existing.email, phone: existing.phone }, true); return; }
                const { error } = await client.from('members').insert([{ full_name: nameEl.value.trim(), email: emailEl.value.trim().toLowerCase(), phone: phoneEl.value.replace(/[\s\-(). ]/g,'') }]);
                if (error) throw error;
            }
            const member = { full_name: nameEl.value.trim(), email: emailEl.value.trim().toLowerCase(), phone: phoneEl.value.trim() };
            saveMember(member); showSuccess(member, false);
        } catch(err) {
            errEl.textContent = 'Something went wrong. Please try again.'; errEl.style.display = 'block';
            btn.disabled = false; btn.textContent = 'CREATE ACCOUNT';
        }
    }

    // ── Sign In ──────────────────────────────────────────────────
    async function handleSignIn(e) {
        e.preventDefault();
        const emailEl = document.getElementById('jo-si-email');
        const phoneEl = document.getElementById('jo-si-phone');
        const errEl   = document.getElementById('jo-si-error');
        const btn     = document.getElementById('jo-auth-submit');

        const ok = { email: validEmail(emailEl.value), phone: validPhone(phoneEl.value) };
        setErr(emailEl, !ok.email); showErr('jo-si-email-err', !ok.email);
        setErr(phoneEl, !ok.phone); showErr('jo-si-phone-err', !ok.phone);
        if (!ok.email || !ok.phone) return;

        btn.disabled = true; btn.textContent = 'SIGNING IN…'; errEl.style.display = 'none';

        try {
            const client = db();
            if (client) {
                const { data } = await client.from('members').select('id,full_name,email,phone').eq('email', emailEl.value.trim().toLowerCase()).maybeSingle();
                if (!data) { errEl.textContent = 'No account found. Please sign up first.'; errEl.style.display = 'block'; btn.disabled = false; btn.textContent = 'SIGN IN'; return; }
                const clean = (p) => p.replace(/[\s\-(). ]/g,'').replace(/^\+/,'').replace(/^234/, '0').replace(/^0/, '0');
                if (clean(data.phone || '') !== clean(phoneEl.value)) { errEl.textContent = 'Phone number does not match our records.'; errEl.style.display = 'block'; btn.disabled = false; btn.textContent = 'SIGN IN'; return; }
                const member = { full_name: data.full_name, email: data.email, phone: data.phone };
                saveMember(member); showSuccess(member, true);
            } else {
                const member = { full_name: emailEl.value.split('@')[0], email: emailEl.value.trim(), phone: phoneEl.value.trim() };
                saveMember(member); showSuccess(member, true);
            }
        } catch(err) {
            errEl.textContent = 'Something went wrong. Please try again.'; errEl.style.display = 'block';
            btn.disabled = false; btn.textContent = 'SIGN IN';
        }
    }

    // ── Show success ─────────────────────────────────────────────
    function showSuccess(member, returning) {
        document.getElementById('jo-signup-view').style.display = 'none';
        document.getElementById('jo-signin-view').style.display = 'none';
        const s = document.getElementById('jo-auth-success');
        s.style.display = '';
        const fn = firstName(member);
        document.getElementById('jo-success-name').textContent = returning ? `Welcome back, ${fn}!` : `Welcome, ${fn}!`;
        document.getElementById('jo-success-msg').textContent  = returning
            ? `Great to see you again, ${fn}. Your profile is on the left side of the screen.`
            : `Your account is ready, ${fn}. Your profile is now on the left side of the screen.`;
        setTimeout(() => {
            document.getElementById('jo-auth-overlay').classList.remove('open');
            applyMember(member);
        }, 2600);
    }

    // ── Apply member to page ─────────────────────────────────────
    function applyMember(member) {
        personalise(member);
        // Update nav icon to avatar
        const oldBtn = document.getElementById('jo-nav-auth-btn');
        if (oldBtn) { oldBtn.innerHTML = `<div id="jo-nav-avatar">${initials(member)}</div>`; oldBtn.onclick = () => toggleProfilePanel(); oldBtn.title = `Hello, ${firstName(member)}`; }
        // Build left panel if not there yet
        if (!document.getElementById('jo-profile-left')) buildProfilePanel(member);
    }

    // ── Open modal ───────────────────────────────────────────────
    function openModal() {
        const overlay = document.getElementById('jo-auth-overlay');
        if (overlay) { switchView('signup'); document.getElementById('jo-auth-submit').textContent = 'CREATE ACCOUNT'; overlay.classList.add('open'); setTimeout(() => { const n = document.getElementById('jo-name'); if (n) n.focus(); }, 350); }
    }

    // ── Globals ──────────────────────────────────────────────────
    window.joOpenAuth = openModal;
    window.joSignOut  = signOut;

    // ── Init ─────────────────────────────────────────────────────
    function init() {
        addStyles();
        buildModal();
        const member = getMember();
        injectNavIcon(member);
        if (member) {
            personalise(member);
            buildProfilePanel(member);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
