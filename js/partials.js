/* Lahar storefront — shared chrome, tweaks panel, dark mode */
(function () {
  // --- Persisted state ---
  const STORE_KEY = 'lahar-tweaks';
  const defaultTweaks = {
    theme: 'light',         // light | dark
    emphasis: 'normal',     // muted | normal | punch
    typeset: 'sans',        // sans | editorial | vendor
    density: 'normal',      // compact | normal | airy
    heroLayout: 'split',    // split | editorial | poster
  };
  function load() {
    try { return { ...defaultTweaks, ...JSON.parse(localStorage.getItem(STORE_KEY) || '{}') }; }
    catch { return { ...defaultTweaks }; }
  }
  function save(t) { localStorage.setItem(STORE_KEY, JSON.stringify(t)); }
  function applyTweaks(t) {
    const r = document.documentElement;
    r.dataset.theme = t.theme;
    if (t.emphasis === 'normal') r.removeAttribute('data-emphasis'); else r.dataset.emphasis = t.emphasis;
    if (t.typeset === 'sans') r.removeAttribute('data-typeset'); else r.dataset.typeset = t.typeset;
    if (t.density === 'normal') r.removeAttribute('data-density'); else r.dataset.density = t.density;
    r.dataset.hero = t.heroLayout;
  }

  let tweaks = load();
  applyTweaks(tweaks);

  // Expose globally so each page can read tweak state if it wants
  window.LaharTweaks = {
    get: () => ({ ...tweaks }),
    set: (k, v) => { tweaks[k] = v; save(tweaks); applyTweaks(tweaks); render(); document.dispatchEvent(new CustomEvent('tweaks-change', { detail: tweaks })); },
  };

  // --- Header ---
  const CATEGORIES = [
    { href: 'category.html', label: 'New arrivals', hot: true },
    { href: 'category.html', label: 'Fashion' },
    { href: 'category.html', label: 'Home & living' },
    { href: 'category.html', label: 'Electronics' },
    { href: 'category.html', label: 'Beauty' },
  ];
  const MEGA_CATS = [
    { title: 'Fashion', links: [
      { href: 'category.html', label: 'Women\'s apparel' },
      { href: 'category.html', label: 'Men\'s apparel' },
      { href: 'category.html', label: 'Accessories' },
      { href: 'category.html', label: 'Footwear' },
      { href: 'category.html', label: 'Bags & luggage' },
    ]},
    { title: 'Home & living', links: [
      { href: 'category.html', label: 'Furniture' },
      { href: 'category.html', label: 'Ceramics & tableware' },
      { href: 'category.html', label: 'Lighting' },
      { href: 'category.html', label: 'Textiles & rugs' },
      { href: 'category.html', label: 'Kitchen & bar' },
    ]},
    { title: 'Electronics', links: [
      { href: 'category.html', label: 'Audio & headphones' },
      { href: 'category.html', label: 'Cameras & lenses' },
      { href: 'category.html', label: 'Wearables' },
      { href: 'category.html', label: 'Cables & organizers' },
      { href: 'category.html', label: 'Smart home' },
    ]},
    { title: 'Beauty & wellness', links: [
      { href: 'category.html', label: 'Skincare' },
      { href: 'category.html', label: 'Bath & body' },
      { href: 'category.html', label: 'Fragrance' },
      { href: 'category.html', label: 'Wellness & self-care' },
      { href: 'category.html', label: 'Grooming' },
    ]},
  ];
  const MEGA_FEATURED = [
    { href: 'category.html', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&q=80', title: 'New: Field runner oat', desc: 'Halen Goods · $148' },
    { href: 'category.html', img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=150&q=80', title: 'Ceramic vase S', desc: 'Murmur Atelier · $56' },
  ];

  function renderHeader() {
    const mount = document.querySelector('[data-partial="header"]');
    if (!mount) return;
    mount.innerHTML = `
<header class="header">
  <!-- Layer 1: Utility -->
  <div class="header-util">
    <div class="header-util-inner">
      <div class="util-left">
        <select><option>EN</option><option>FR</option><option>ES</option><option>DE</option></select>
        <select><option>USD $</option><option>EUR €</option><option>GBP £</option></select>
      </div>
      <div class="util-center">🎁 Free shipping over \$200 — use code <strong>LAHAR24</strong></div>
      <div class="util-right"><a href="/account/signin.html">Sign in</a><a href="/account/signup.html">Register</a></div>
    </div>
  </div>
  <!-- Layer 2: Main -->
  <div class="header-main">
    <div class="header-main-inner">
      <a href="/" class="brand-mark" aria-label="Lahar home">
        <img src="https://laharhub.com/uploads/images/logo_1770984823_.png" alt="Lahar" style="height:32px;width:auto;display:block" />
      </a>
      <div class="header-search-trigger" id="searchTrigger">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
        <span>Search 12,400 products across 320 vendors…</span>
        <span class="kbd">⌘K</span>
      </div>
      <div class="header-actions">
        <a href="/info/become-a-vendor.html" class="header-sell-btn">Become a vendor</a>
        <a href="/account/wishlist.html" class="icon-btn" aria-label="Wishlist">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z"/></svg>
          <span class="count">4</span>
        </a>
        <a href="/shop/compare.html" class="icon-btn" aria-label="Compare">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 7h18M3 12h18M3 17h12"/></svg>
          <span class="count">2</span>
        </a>
        <a href="/shop/cart.html" class="icon-btn" aria-label="Cart">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6h15l-2 11H8L6 6Z"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M6 6 5 3H2"/></svg>
          <span class="count">3</span>
        </a>
        <a href="/account/profile.html" class="icon-btn" aria-label="Profile">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>
        </a>
      </div>
    </div>
  </div>
  <!-- Layer 3: Bottom nav -->
  <div class="header-bottom">
    <div class="header-bottom-inner">
      <button class="nav-search-btn" id="mobSearchBtn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
        Search…
      </button>
      <div class="cat-mega-wrap">
        <button class="cat-mega-toggle" id="megaToggle">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h18M3 12h18M3 17h18"/></svg>
          All departments
        </button>
        <div class="mega-panel" id="megaPanel">
          <div class="mega-cols">
            ${MEGA_CATS.map(g => `
            <div class="mega-col">
              <h4>${g.title}</h4>
              ${g.links.map(l => `<a href="${l.href}">${l.label}</a>`).join('')}
            </div>`).join('')}
          </div>
          <div class="mega-featured">
            <h4>Featured</h4>
            ${MEGA_FEATURED.map(f => `
            <a href="${f.href}">
              <img class="mf-img" src="${f.img}" alt="" loading="lazy" />
              <div class="mf-info">
                <div class="mf-title">${f.title}</div>
                <div class="mf-desc">${f.desc}</div>
              </div>
            </a>`).join('')}
          </div>
        </div>
      </div>
      <div class="cat-links">
        ${CATEGORIES.map(t => `<a href="${t.href}" class="${t.hot ? 'hot' : ''}">${t.label}</a>`).join('')}
        <span class="nav-sep"></span>
        <a href="/shop/auctions.html">Auctions</a>
        <a href="/shop/deals.html">Deals</a>
        <a href="/info/reels.html">Reels</a>
        <a href="/shop/vendors.html">Vendors</a>
        <a href="/blog/blog.html">Journal</a>
      </div>
    </div>
  </div>
</header>

<!-- Search modal (Cmd+K) -->
<div class="search-modal-overlay" id="searchModal">
  <div class="search-modal">
    <div class="search-modal-head">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
      <input type="text" placeholder="Search products, vendors, categories…" id="searchModalInput" autofocus />
      <span class="kbd">ESC</span>
    </div>
    <div class="search-modal-body">
      <div class="sm-section">
        <span class="sm-label">Quick suggestions</span>
        <div class="sm-hint"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg> <span>Hand-built ceramics</span><span class="sm-hint-kbd">↵</span></div>
        <div class="sm-hint"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg> <span>Leather weekenders under \$500</span><span class="sm-hint-kbd">↵</span></div>
        <div class="sm-hint"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg> <span>Vintage field watches</span><span class="sm-hint-kbd">↵</span></div>
      </div>
      <div class="sm-section">
        <span class="sm-label">Popular categories</span>
        <div style="display:flex;flex-wrap:wrap;gap:6px">
          ${['New arrivals','Fashion','Home','Electronics','Beauty','Gifting','Outlet'].map(c => `<span class="chip">${c}</span>`).join('')}
        </div>
      </div>
    </div>
  </div>
</div>
    `;

    // --- Search modal handlers ---
    const modal = mount.querySelector('#searchModal');
    const triggers = [
      mount.querySelector('#searchTrigger'),
      mount.querySelector('#mobSearchBtn'),
    ];
    const modalInput = mount.querySelector('#searchModalInput');

    function openModal() {
      modal.classList.add('open');
      setTimeout(() => modalInput && modalInput.focus(), 100);
    }
    function closeModal() {
      modal.classList.remove('open');
    }

    triggers.forEach(el => el && el.addEventListener('click', openModal));
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

    document.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openModal(); }
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });

    // --- Mega menu handlers ---
    const megaToggle = mount.querySelector('#megaToggle');
    const megaPanel = mount.querySelector('#megaPanel');
    megaToggle.addEventListener('click', () => {
      const isOpen = megaPanel.classList.toggle('open');
      megaToggle.classList.toggle('on', isOpen);
    });
    document.addEventListener('click', e => {
      if (!megaToggle.contains(e.target) && !megaPanel.contains(e.target)) {
        megaPanel.classList.remove('open');
        megaToggle.classList.remove('on');
      }
    });
  }

  // --- Footer ---
  function renderFooter() {
    const mount = document.querySelector('[data-partial="footer"]');
    if (!mount) return;
    mount.innerHTML = `
      <footer class="footer">
        <div class="wrap">
          <div class="footer-grid">

            <!-- Brand column -->
            <div class="fg-brand">
              <div class="brand-mark" style="color:var(--bg);margin-bottom:16px">
                <span class="dot">L</span>
                <span>lahar<span style="color:var(--brand)">.</span></span>
              </div>
              <p class="editorial-block">A marketplace of considered makers — fashion, home, electronics, and the small things that take big care.</p>

              <div class="fg-social">
                <a href="https://instagram.com/laharhub" class="social-link" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.3" fill="currentColor"/></svg>
                </a>
                <a href="https://twitter.com/laharhub" class="social-link" aria-label="X / Twitter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 4l6.5 8.5L4 20h2.5l5-5.5L16 20h5l-7-9.5L20.5 4H18l-4.5 5L9 4H4z"/></svg>
                </a>
                <a href="https://pinterest.com/laharhub" class="social-link" aria-label="Pinterest">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 2C6.5 2 2 6.5 2 12c0 4.5 2.8 8.3 6.8 9.7-.1-.8-.2-2.1 0-3 .2-.9 1.4-5.9 1.4-5.9s-.4-.7-.4-1.8c0-1.7 1-3 2.2-3s1.2.9 1.2 2c0 1.2-.8 3-1.2 4.5-.3 1.3.7 2.4 2 2.4 2.4 0 4-3 4-6.5 0-2.7-1.8-4.7-5-4.7-3.6 0-5.8 2.7-5.8 5.7 0 1 .4 2.2.9 2.8.1.1.1.2.1.3l-.3 1.5c0 .2-.2.3-.4.2-1.5-.6-2.2-2.2-2.2-4 0-3 2.4-6.5 7.5-6.5 4 0 6.6 2.9 6.6 6.1 0 4.1-2.3 7.2-5.7 7.2-1.1 0-2.2-.6-2.6-1.3l-.7 2.9c-.3.9-1 2-1.4 2.7A10 10 0 0 0 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>
                </a>
                <a href="https://tiktok.com/@laharhub" class="social-link" aria-label="TikTok">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M19 8a5 5 0 0 1-5-5h-2v11.5a2.5 2.5 0 1 1-3-2.5V10a4.5 4.5 0 1 0 5.5 4.4V9.4c.5.4 1.2.6 1.9.6h2.6"/></svg>
                </a>
                <a href="https://youtube.com/@laharhub" class="social-link" aria-label="YouTube">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M22.5 6.2a2.8 2.8 0 0 0-2-2C18.9 3.5 12 3.5 12 3.5s-6.9 0-8.5.7a2.8 2.8 0 0 0-2 2A30 30 0 0 0 1 12a30 30 0 0 0 .5 5.8 2.8 2.8 0 0 0 2 2c1.6.7 8.5.7 8.5.7s6.9 0 8.5-.7a2.8 2.8 0 0 0 2-2A30 30 0 0 0 23 12a30 30 0 0 0-.5-5.8z"/><polygon points="10 15.5 15.5 12 10 8.5 10 15.5" fill="currentColor"/></svg>
                </a>
                <a href="https://linkedin.com/company/laharhub" class="social-link" aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="https://facebook.com/laharhub" class="social-link" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              </div>

              <div class="fg-newsletter">
                <div class="newsletter">
                  <input placeholder="your@email.com" />
                  <button type="button">Subscribe</button>
                </div>
              </div>

              <div class="fg-trust">
                <span class="ft-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/><path d="m9 12 2 2 4-4"/></svg> Secure checkout</span>
                <span class="ft-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 9h18l-1.5 11h-15L3 9z"/><path d="M8 9V5a4 4 0 1 1 8 0v4"/></svg> Free returns · 30 days</span>
                <span class="ft-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 2"/></svg> Carbon offset</span>
                <span class="ft-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M20 12H4"/><path d="M20 6H4"/><path d="M20 18H4"/></svg> 320+ makers</span>
              </div>

              <div class="fg-apps">
                <a href="https://apps.apple.com/app/laharhub/id123456789" class="app-badge" aria-label="Download on the App Store">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="18" rx="3"/><circle cx="12" cy="12" r="4"/><circle cx="16" cy="9" r=".8" fill="currentColor"/></svg>
                  <div class="ab-text"><span class="ab-l">Download on the</span><span class="ab-b">App Store</span></div>
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.laharhub" class="app-badge" aria-label="Get it on Google Play">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="3 3 17 12 3 21 3 3"/><path d="M17 12l4-4"/><polygon points="3 3 17 12 3 21 3 3"/></svg>
                  <div class="ab-text"><span class="ab-l">Get it on</span><span class="ab-b">Google Play</span></div>
                </a>
              </div>
            </div>

            <!-- Shop -->
            <div>
              <h4>Shop</h4>
              <ul>
                <li><a href="/shop/categories.html">All categories</a></li>
                <li><a href="/shop/category.html">New arrivals</a></li>
                <li><a href="/shop/category.html">Best sellers</a></li>
                <li><a href="/shop/deals.html">Deals &amp; coupons</a></li>
                <li><a href="/shop/auctions.html">Live auctions</a></li>
                <li><a href="/shop/vendors.html">Our vendors</a></li>
                <li><a href="/info/reels.html">Lahar reels</a></li>
                <li><a href="/blog/blog.html">The journal</a></li>
                <li><a href="/shop/gift-cards.html">Gift cards</a></li>
              </ul>
            </div>

            <!-- Account -->
            <div>
              <h4>Account</h4>
              <ul>
                <li><a href="/account/profile.html">My profile</a></li>
                <li><a href="/account/orders.html">Order history</a></li>
                <li><a href="/account/wishlist.html">Wishlist</a></li>
                <li><a href="/shop/compare.html">Compare</a></li>
                <li><a href="#">Recently viewed</a></li>
                <li><a href="#">Saved searches</a></li>
                <li><a href="/account/signin.html">Sign in</a></li>
                <li><a href="/account/signup.html">Create account</a></li>
              </ul>
            </div>

            <!-- Company -->
            <div>
              <h4>Company</h4>
              <ul>
                <li><a href="/info/about.html">About us</a></li>
                <li><a href="/info/become-a-vendor.html">Become a vendor</a></li>
                <li><a href="/blog/blog.html">Journal</a></li>
                <li><a href="/info/press.html">Press &amp; media</a></li>
                <li><a href="/info/sustainability.html">Sustainability</a></li>
                <li><a href="/info/careers.html">Careers</a></li>
                <li><a href="/info/affiliate.html">Affiliate program</a></li>
              </ul>
            </div>

            <!-- Support -->
            <div>
              <h4>Support</h4>
              <ul>
                <li><a href="/info/help.html">Help center</a></li>
                <li><a href="/account/order-tracking.html">Track order</a></li>
                <li><a href="/info/shipping.html">Shipping &amp; returns</a></li>
                <li><a href="/info/contact.html">Contact us</a></li>
                <li><a href="/legal/trust-safety.html">Trust &amp; safety</a></li>
                <li><a href="/info/faq.html">FAQ</a></li>
                <li><a href="/info/size-guide.html">Size guide</a></li>
                <li><a href="/info/community.html">Community</a></li>
              </ul>
            </div>

          </div>

          <!-- Middle bar: payments + apps -->
          <div class="fg-mid">
            <div class="fgm-payments">
              <span class="fgm-label">We accept</span>
              <div class="fgm-chips">
                <span class="pm-logo pm-visa" title="Visa">
                  <svg viewBox="0 0 60 20" fill="none"><rect width="60" height="20" rx="3" fill="#1A1F71"/><path d="M23.7 6.44h-2.7l-2.1 5.58h2.7l2.1-5.58zm-3.2 0l-2.5 5.58h-2.1l-1.3-4.5c-.1-.3-.2-.7-.4-1a71 71 0 0 0-2.5-.6l.06-.48h3.5c.57 0 .8.36.9.84l.8 4.4 1.9-5.24h2.3l.3 0zm-7.7 0l-2.9 5.58h-2.2l-1.5-4.4c-.1-.3-.5-.8-.8-1a4 4 0 0 0-2.3-.5l.05-.48h4.1c.5 0 .8.3.9.8l.7 3.6 1.6-4.4h2.4zm-6.8 4.5l-.4 1.1h-3.6l-.06-.2c.3-.1.6-.2.8-.3l.1-.6h.1l-.6-2.4-1.4 3.5h-2.3L4.8 7.7l-.1-.2-.4-1a4 4 0 0 0-1.5-.8l.1-.46h3.6c.5 0 .8.3.9.8l.5 2.5 1.7-3.3h2.5l-1.8 4.4zM32 6.44h2.1l1.9 5.58h-2.1l-.3-.9h-2.9l-.3.9H28l2.8-5.58h1.2zm.9 3.7l-1-2.8-.6 2.8h1.6zm4.5-3.7h2l1.6 4.1 1.5-4.1h2l-2.7 5.58h-1.9l-1-4.1-.5 4.1h-2.1l1.1-5.58zm8.4 0l-2.5 5.58h-2.1l-.4-1h-3l-.4 1H39l1.9-5.3c.1-.2.3-.4.5-.4h1.3l0 .1zm-2.7 3.4l-.6-2.1-.8 2.1h1.4zm5-3.4h3.2c.5 0 .9.2 1.1.4l-.4 1.6c-.1.4-.4.6-.8.6h-1.7l-.1.3.4 1.6.2.5h1.7l.3-.5.12-1.6h2l-.2 2c0 .4-.2.8-.6 1-.4.3-.8.5-1.5.5h-2.4c-.7 0-1.2-.2-1.5-.5-.3-.3-.5-.7-.5-1.3l.1-3.2c0-.6.2-1 .5-1.3.3-.3.8-.5 1.5-.5h2.2c.6 0 1 .2 1.3.5l.2.3-.3 1.6c0 .3-.2.5-.6.5h-1.8l-.2.3v.5h.1z" fill="white"/></svg>
                </span>
                <span class="pm-logo pm-mc" title="Mastercard">
                  <svg viewBox="0 0 60 20" fill="none"><rect width="60" height="20" rx="3" fill="white"/><circle cx="26" cy="10" r="6" fill="#EB001B" opacity=".85"/><circle cx="34" cy="10" r="6" fill="#F79E1B" opacity=".85"/><path d="M30 5.5a6 6 0 0 0 0 9 6 6 0 0 0 0-9z" fill="#FF5F00"/></svg>
                </span>
                <span class="pm-logo pm-esewa" title="eSewa">
                  <svg viewBox="0 0 60 20" fill="none"><rect width="60" height="20" rx="3" fill="#00A650"/><path d="M14 6.2c.5 0 .8.1 1.1.4.3.3.4.6.4 1v5.4h-2.3V8.6c0-.4-.1-.6-.2-.8-.1-.2-.3-.2-.6-.2-.3 0-.5.1-.7.2-.2.2-.3.4-.3.8v4.4H9V6.3h2.1v1c.5-.5 1-.8 2-.8.5 0 .9.1 1.2.4l-.3-.7z" fill="white"/><path d="M19 6.2c.5 0 .9.1 1.3.4.3.3.5.6.5 1v.4h-2c0-.3-.1-.5-.3-.6-.2-.2-.4-.2-.7-.2-.4 0-.6.1-.8.3-.1.2-.2.4-.2.7 0 .3.1.5.2.7.2.2.4.4.8.5l.8.3c.7.2 1.2.6 1.5 1 .3.5.4 1 .4 1.7 0 .7-.2 1.3-.7 1.8-.5.5-1.2.7-2 .7-.9 0-1.6-.3-2.1-.8-.5-.5-.7-1.2-.7-2h2c0 .4.1.6.4.9.2.2.5.3.9.3.4 0 .7 0 .9-.2.2-.2.3-.4.3-.7 0-.4-.1-.6-.3-.8-.2-.2-.5-.4-1-.6l-.8-.3c-.6-.2-1.1-.6-1.4-1-.3-.5-.5-1-.5-1.7 0-.7.2-1.2.6-1.7.4-.5 1-.7 1.8-.7z" fill="white"/><path d="M28.5 12.6h2l-2.6-6.4h-2.3l-2.6 6.4h2l.5-1.3h2.5l.5 1.3zm-2.7-2.8l.9-2.2.8 2.2h-1.7z" fill="white"/><path d="M30 8.5c0-.7.2-1.3.7-1.8.5-.5 1.1-.7 1.9-.7.7 0 1.3.2 1.8.7.5.5.7 1 .7 1.8v.6h-3.2c0 .3.1.5.3.7.2.2.5.3.9.3.4 0 .8-.1 1-.3l.1.3.8.7c-.3.3-.7.5-1.3.5-.8 0-1.4-.2-1.9-.7-.5-.5-.7-1-.7-1.8v-.8zm2.6-1c0-.3-.1-.5-.3-.6-.2-.2-.4-.2-.7-.2-.3 0-.5.1-.7.2-.1.2-.2.4-.2.6h1.9z" fill="white"/><path d="M36.5 6.3h2.3v2c.4-.5 1-.8 1.7-.8.6 0 1.1.2 1.5.6.4.4.5.9.5 1.6v3.7h-2.3v-3c0-.3-.1-.5-.2-.6-.1-.2-.3-.2-.6-.2-.4 0-.6.1-.8.3-.2.2-.3.5-.3.9v2.6H36.5V6.3z" fill="white"/></svg>
                </span>
                <span class="pm-logo pm-khalti" title="Khalti">
                  <svg viewBox="0 0 60 20" fill="none"><rect width="60" height="20" rx="3" fill="#6C2BD9"/><path d="M12.6 5l2 1.3v8.5l-2 1.2V5z" fill="white" opacity=".3"/><path d="M15 6.6l2 1.3v6l-2 1.2V6.6z" fill="white" opacity=".5"/><path d="M17.4 8.2l2 1.3v3.6l-2 1.2V8.2z" fill="white" opacity=".7"/><path d="M19.8 9.8l2 1.3v1.2l-2 1.2V9.8z" fill="white"/><circle cx="27" cy="13" r="4" fill="white" opacity=".15"/><circle cx="27" cy="13" r="2.5" fill="white"/><path d="M28.2 11.5l-1.7 2.5-.7-.8" stroke="#6C2BD9" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </span>
                <span class="pm-logo pm-paypal" title="PayPal">
                  <svg viewBox="0 0 60 20" fill="none"><rect width="60" height="20" rx="3" fill="#003087"/><path d="M18.8 5.8h-4.4c-.3 0-.6.3-.6.6l-1.1 6.7c0 .2.1.3.3.3h2.3c.2 0 .4-.1.5-.3l.3-1.6c0-.2.2-.3.5-.3h1.1c2.1 0 3.4-1 3.7-3 .2-1.2-.1-2.1-.7-2.7-.5-.5-1.3-.7-2.3-.7zm.4 3.5c-.2 1.1-1 1.6-2.1 1.6h-.5l.4-2.3c0-.1.2-.2.3-.2h.3c.6 0 1.1.2 1.2.6.1.1.1.2.1.3h.3z" fill="white"/><path d="M35 5.8h-4.4c-.3 0-.6.3-.6.6l-1.1 6.7c0 .2.1.3.3.3h2.3c.2 0 .4-.1.5-.3l.3-1.6c0-.2.2-.3.5-.3h1.1c2.1 0 3.4-1 3.7-3 .2-1.2-.1-2.1-.7-2.7-.5-.5-1.3-.7-2.3-.7zm.4 3.5c-.2 1.1-1 1.6-2.1 1.6h-.5l.4-2.3c0-.1.2-.2.3-.2h.3c.6 0 1.1.2 1.2.6.1.1.1.2.1.3h.3z" fill="white"/><path d="M37 12.2h2.3c.1 0 .2-.1.2-.2l.9-5.4c0-.1-.1-.2-.2-.2H38c-.2 0-.4.1-.5.3l-.8 5.1c0 .2.1.4.3.4z" fill="#009CDE"/><path d="M42.4 5.8h2.2c.2 0 .3.1.3.3l-1 6.4c0 .2-.1.3-.3.3h-2.2c-.2 0-.3-.1-.3-.3l1-6.4c0-.2.1-.3.3-.3z" fill="#009CDE"/></svg>
                </span>
                <span class="pm-logo pm-applepay" title="Apple Pay">
                  <svg viewBox="0 0 60 20" fill="none"><rect width="60" height="20" rx="3" fill="white"/><path d="M16.5 5.5c-.2.2-.6.5-.7.8-.2.3-.3.8-.2 1.2.1.1.3.2.4.2 0-.3.2-.6.4-.8.1-.3.2-.6.1-1.1v-.3zm1 1.6c-.5 0-.8.3-1.2.3-.4 0-.8-.3-1.2-.3-.6 0-1.2.4-1.5 1-.4.6-.4 1.4-.2 2.2.2.6.6 1.3 1 1.7.4.3.7.5 1.1.5.4 0 .7-.2 1.1-.5.4-.2.6-.5 1.1-.5.4 0 .7.3 1.1.5.3.2.6.4 1 .4.4 0 .8-.2 1.2-.5.4-.4.7-.9.9-1.5-.4-.2-.6-.5-.7-.8-.2-.4-.3-.9-.3-1.3 0-.5.2-.9.5-1.2.3-.3.6-.5.8-.5-.4-.4-.9-.7-1.4-.7-.5-.1-1 .1-1.3.3-.3.2-.5.5-.7.5-.2 0-.5-.3-.8-.5-.3-.2-.6-.3-.9-.3-.3 0-.6.1-1 .3l.4.2z" fill="black"/></svg>
                </span>
              </div>
            </div>
            <div class="fgm-extras">
              <div class="fgm-featured">
                <span class="fgm-label">As featured in</span>
                <div class="f-chips">
                  <span class="f-chip">Vogue</span>
                  <span class="f-chip">Monocle</span>
                  <span class="f-chip">Kinfolk</span>
                  <span class="f-chip">The Slow</span>
                </div>
              </div>
              <div class="fgm-back">
                <button class="back-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" title="Back to top">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m18 15-6-6-6 6"/></svg>
                  Back to top
                </button>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <div class="fb-left">
              <span class="fb-copy">© 2026 Lahar Hub. Made by makers, for the curious.</span>
              <div class="fb-legal">
                <a href="/legal/privacy.html">Privacy policy</a>
                <a href="/legal/terms.html">Terms of service</a>
                <a href="/legal/cookie.html">Cookie policy</a>
                <a href="/legal/accessibility.html">Accessibility</a>
                <a href="/legal/do-not-sell.html">Do not sell</a>
              </div>
            </div>
            <div class="fb-right">
              <div class="fb-locale">
                <select aria-label="Language">
                  <option>English (US)</option>
                  <option>日本語</option>
                  <option>Dansk</option>
                  <option>Português</option>
                </select>
                <select aria-label="Currency">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>JPY (¥)</option>
                  <option>DKK (kr)</option>
                </select>
              </div>
            </div>
          </div>

          <div class="footer-meta">
            <div class="fm-stats">
              <span class="fm-stat"><strong>320+</strong> makers</span>
              <span class="fm-dot">·</span>
              <span class="fm-stat"><strong>42</strong> countries</span>
              <span class="fm-dot">·</span>
              <span class="fm-stat"><strong>18k+</strong> products</span>
              <span class="fm-dot">·</span>
              <span class="fm-stat"><strong>99.2%</strong> positive feedback</span>
              <span class="fm-dot">·</span>
              <span class="fm-stat"><strong>7 years</strong> of slow commerce</span>
            </div>
            <span class="mono">v2.4.1 · crafted with patience</span>
          </div>
        </div>
      </footer>
    `;
  }

  // --- Tweaks panel ---
  function renderTweaks() {
    const mount = document.querySelector('[data-partial="tweaks"]');
    if (!mount) return;
    const T = tweaks;
    mount.innerHTML = `
      <button class="tweaks-toggle" id="tweaks-toggle" aria-label="Open design tweaks" title="Design tweaks">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>
      </button>
      <div class="tweaks" id="tweaks-panel">
        <div class="tweaks-h">
          <span class="ttitle">Design tweaks</span>
          <button class="tclose" id="tweaks-close" aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="tweaks-body">
          <div class="tweaks-sec">
            <span class="label">Theme</span>
            <div class="seg" data-tweak="theme">
              ${['light','dark'].map(v => `<button data-v="${v}" class="${T.theme===v?'on':''}">${v}</button>`).join('')}
            </div>
          </div>
          <div class="tweaks-sec">
            <span class="label">Color emphasis</span>
            <div class="seg" data-tweak="emphasis">
              ${['muted','normal','punch'].map(v => `<button data-v="${v}" class="${T.emphasis===v?'on':''}">${v}</button>`).join('')}
            </div>
          </div>
          <div class="tweaks-sec">
            <span class="label">Type pairing</span>
            <div class="seg" data-tweak="typeset">
              ${[['sans','Outfit'],['editorial','Playfair'],['vendor','Jakarta']].map(([v,l]) => `<button data-v="${v}" class="${T.typeset===v?'on':''}">${l}</button>`).join('')}
            </div>
          </div>
          <div class="tweaks-sec">
            <span class="label">Card density</span>
            <div class="seg" data-tweak="density">
              ${['compact','normal','airy'].map(v => `<button data-v="${v}" class="${T.density===v?'on':''}">${v}</button>`).join('')}
            </div>
          </div>
          <div class="tweaks-sec">
            <span class="label">Hero layout (Home only)</span>
            <div class="seg" data-tweak="heroLayout">
              ${['split','editorial','poster'].map(v => `<button data-v="${v}" class="${T.heroLayout===v?'on':''}">${v}</button>`).join('')}
            </div>
          </div>
          <div class="tweaks-sec" style="border:0;padding-bottom:0;margin-bottom:0">
            <span class="label">Live across all pages</span>
            <div style="font-size:12px;color:var(--text-muted);line-height:1.5">Changes persist locally and apply to every Lahar screen as you browse.</div>
          </div>
        </div>
      </div>
    `;
    const panel = mount.querySelector('#tweaks-panel');
    const toggle = mount.querySelector('#tweaks-toggle');
    const close = mount.querySelector('#tweaks-close');
    toggle.addEventListener('click', () => panel.classList.toggle('open'));
    close.addEventListener('click', () => panel.classList.remove('open'));
    mount.querySelectorAll('.seg').forEach(seg => {
      seg.addEventListener('click', e => {
        const btn = e.target.closest('button');
        if (!btn) return;
        const key = seg.dataset.tweak;
        const val = btn.dataset.v;
        window.LaharTweaks.set(key, val);
      });
    });
  }

  function render() {
    renderHeader();
    renderFooter();
    renderTweaks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
