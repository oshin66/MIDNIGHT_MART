// ===== Product Data & Rendering =====

const STAR_SVG = `<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
const STAR_EMPTY = `<svg class="empty" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;

function stars(n) {
  let s = '';
  for (let i = 0; i < 5; i++) s += i < n ? STAR_SVG : STAR_EMPTY;
  return s;
}

function card(p) {
  const badge = p.badge ? `<div class="product-badge ${p.badgeType || ''}">${p.badge}</div>` : '';
  const orig = p.originalPrice ? `<span class="price-original">$${p.originalPrice}</span>` : '';
  const disc = p.discount ? `<div class="price-discount">${p.discount}% off</div>` : '';
  const prime = p.prime ? `<div class="prime-badge">🚀 FREE Delivery</div>` : '';
  return `<article class="product-card">
    ${badge}
    <div class="product-image"><img alt="${p.name}" src="${p.img}" loading="lazy"/></div>
    <h3 class="product-title">${p.name}</h3>
    <p class="product-subtitle">${p.sub}</p>
    <div class="star-rating"><div class="stars">${stars(p.stars)}</div><span class="rating-count">${p.reviews}</span></div>
    <div class="product-price">
      <span class="price-current"><span class="price-symbol">$</span>${p.price}</span>${orig}
      ${disc}
    </div>
    ${prime}
    <button class="add-to-cart-btn">Add to Cart</button>
  </article>`;
}

const IMG = {
  watch: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNyioFhrI5Q6hoO8u0PUHb9hBHcWxtFbUP3VpOg9dOk9yUUkcv853bUY3Vjrj9hK4NsVfOGCR3oFeQDmB1SsL_V6wNSjYHfNkaPHj2VhCWPxKpjt1i3j8FAGXVLPTMaHkIs22hBKs7_JZvHKKWTY0pZyxBKZIriix8Bp22pUvrNBZmez-Fb-_vS_YRm6i81Wa66HmY5w9oXojgD7QRL822qZ5J_lFSBUsvJwYari_UEwFrkJSiQ9izhKCG8LhKWiClFNAZpW_QPMjQ",
  pods: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQGedFrm8G1dERLnm8DAXO_NXD2paagd95lUK2J1uvzGoOxkSEIveBOyg5kDQjjrK-KsJywo6fQdC4ff1vSCukdiTU6cXmww2QbjHa34-aWX84ZslNPyAyxIIgH07qPLgskL4iO34RsW_QBy1CMBTTQeLCWTChOhYgsF9OYnPeKBDJmQ8g8H692WOLnRR3Ct1-OTnrxAQjz32gfS873h7Nok1_xKaH4WhVJrkW7G7rpClOWeJGeJWVmDDbNocThfkAjvZM1pWT2Lj_",
  hub: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFrjqmvFGPqGQEa1jcZXjC1v1B7kQrw-Z0TIn0HRnsbAprkLFcx8hTkyW5t2LN16yOLb4Nn9x3QU4mFZDD63dznFyamkRLcawP3ae3ovO625P_-kFmtfIdtBqyL4K_sGwWccqK3MSYD_5kW-1sUcrf2510cWtBDt3rrrtROig25DlEf7OdorZvmAwE_Glq5npbd-mfWsf_xwZuAp1gMVTm4_bNi33GPIE25F6zFlT-GAsmQDAd9A82Yzy8UR7622FeK0zdZgoOBbSv",
  charger: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlh_7WABwXF7dTJqmXEid3_cXoybKluO7OyRs9dHtQADliOTfjAB1YmuOZYnOFWocqR9HuJ-VKfVMX22eVxxgCeFTiBrzM74tF8foP9TOW7pwv0Z2ClvDeYntdVl4p_qjJqdD-G-DHDFrqpG9QPVHVTRv2hz0ok8PMtDbRpBZunQCV6JY3_l4kh9cysW9fLJslwUNQOkKlAWVvavT9kTthJAyjHAdKK6SW9D4St0ZmTZgikWPJ8rZhYo89fGbI77yQ69JBO4vfspB3",
  parka: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOzlLex1sFLNfkH3Tarjtoavk9398ArBL18B7d-r7rL-x03iPi_kQVVbISN14U-yWr07ySryXjHUyvhUmNckIRl2qwuRq0_BiE9l9g-fu1wJeteuHJvf4UQoMrOshTm7f4ln0aj7L87xmmGz9JTSuracXpdSRbU44Zww6zl6lCTWH15ZB6btuB_Rebc9YcUqlfxA6L30UN1KPxPu_6ZBlfxpR5Vob3TooXL99aMZL-MnCEOkfgDfihWXSUCz4_vzohGn3ZXdhCVHuy",
  tee: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5b2cwyMsVI4iRxqyDLmaNgZXmQ7idqEbCGgIs6euHPdsjzgzmmFNwO29WSRXfox4B-EJ5vcXmbkBin8rg8n0Nl-XfhIDQoXEmEHBeZlxwVctBf3Cn9eqizH0S2CY1SmWLoNiMXIWvJ9KyUMuzK21mmBLqSM26NHJQ_L3qo8ngP-2Mgu1wn00OuHTeBloReIYNWi1J6voMDO2yUPaG74blIKBxO7rQeCROBI8Uo7KqmuSOAaJ-P7Xyy9cNm5z6pfBrwJbCkToMfKMW",
  trousers: "https://lh3.googleusercontent.com/aida-public/AB6AXuDq6IGw-TKqiLPVfq6uO_v3l46A5jp00S5OXjs2iAeEFTGdoJdMdA0-C592vR1pTcq-LERevyP7MTKrvdgx4zavOZ3RTtozHjKLa9aARpuuweV-NT70TN2haTSamuJ44o923G1wABBEU5IcjMoj2TuAXkzKmeGCrq1yxgNYFk-vCocNuxmTDlT7NYGZ7nqqRGJ1itMBefMHvNBZajzWMk6-OFLN9xpdj3jgamtUbtsgUkLgXNREa4E1dWX7Ifi2JHTUDqZROfEHBvaZ",
  hoodie: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2-SDRAxUtt0C3Mn9cZBxA5AH-5zLT29oKCq1rfWz5ZfTeQZTxnf6xRYSN87SPk47XeVkd0ZFav11jBAFh7qDwIDKWrr-EreF5xilT3h2GgHiS4jIo149UACv0wy4wLYZ0xR1DPIoX8evr_k00RyApPMFxFxpz-GyqF8otmb9c63bCvPhY7TSDISE_L0YJ7WZ7SRAQldmU25Lu6YpgWT4Gx0-V6xkmVm4j-vpWeCH4EiyYi-tsD9iTJ3IkAve7rlNvg5r9FUWY94Er",
  flask: "https://lh3.googleusercontent.com/aida-public/AB6AXuAWksBt-7hgtagBVcuPl_bOFEW56IqmvxfzFDEi8Jh4X2mpNhUrKZTPe2pmptotQzFg_KMdbbkYf28eS-Ob-q840lWDhWYupUfSAC_m7rzAQtskhxz3RCszzziuOu3guIajePYFHPSMDBhFX4j1PrlyzZ1ZvEoibCayt_Ir2p7sIPOqb-6S4lLq2RFBuP-4tSDaNTZtAJhwee6sz9ffeE8_QiQtfi0VO-Ddj2PWD62haEwH6hs9zhmn9fZZaR-43vtaJcJz2tA5xySD",
  candle: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuSvC2hHQWxjo6b8YJBsqF5hqwbDs3PX30RqNK6s4Z-HaBHfDQU2nmwEbVA5YTW7xFVUkOszG5WoktlYt9nS65MoH2o0Xui7NW9XaaKdl1ruPBiug180AJWPieUdKPlpSWjDkuO8OTnwkzb6Z862lrPRFBqBbJG9CCDk85NM0PKfq2-2W4lMANKzcLJE1ESY0yieRjKF5_r0z0jsb8ZciAkUtRDwaAqBsO8f0QiTZtZ6pqXtDLIjDLisiF-GG6m-uUaKK2PmP5Tgti",
  bag: "https://lh3.googleusercontent.com/aida-public/AB6AXuADaExgF_cvghAVPBu9yHlgTAnkO2gj3fUSoRAuDmbl4Bh-HW6waOldxpDWDxkE1o-6xZ7h9j8n8IZNpz6qAB1fCnlrNhaH4HROYvVQhJspoM-nn0i-wUGScruKYCYUT9TEmTSP2lXFWEjZbdiMBHuYCtiwPe6cqTYogB0s-1wleul0YxezYWoRkqbkQILOmC__ujvnFlI5P_8x43a-s9UStsJk21pb45apmHvpF0xxufmgldR--aNpY9n05jAK47Y8d5sDHsViiNtM",
  journal: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxcMCwldFP6F05XyEzOoCiqFIu12obxUeLIdjV_MKw4MU0MMqPJDl9QVsb3ttLY6MFmEMVX4PfOKQZCxB7OvZxAl-uiRGN_Aua-LTozgdK43jMQomFKCdHBwh-Y-1ldBQSBZsWYqXzxoGSNXZPaaEdnfHMCzkcN5O8SSjZ6pytpTbpH2f33ejHQzvy0WzSfBCcgZBdmAebN6AfkkuABzEqyo5D92x2c_amY-1aCEZbpiSPiN2AcJ6xsRFBNrjxl52MXEJF3jXGg7As",
  tool: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbpGEVejwO-ndsQUWcYzaqG-KE-OecDtsUH20cg2UGVQSanVuY0khChAq2SM_r-Hk67RIUoShgBP4UyVF5-psLQBLTPQpb41SqHTSecXS_iXvTmatrOAXhw86m0H3-aLcRcBgzVv5mFKnhLYuAWKPGVmfA7atgCzaozqxvtbdZB8_kR1qOksyxUBQLz6hnTPCUvW84OiG3IPvl4ZMRtxktyySfYRwN5s1KgCn8O5Te4w7gNXAKPCDoQGuAcDmGoXraqOwGh2jc78nD",
  glasscase: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeJntqAWpVxFVu1cA99aRYgYmgGo3y-n_hOkbr-DcHoKpehO2Bs1Gk-xg3jKuRR9goTcjyUNnmlXtSD_vha75kfZTDqTtGgv90R__rknLnHKCsNnM7YncF6C2lEhAnM_Z3hryhdto2j2g9uHzCUTGdPVTXNXe4nDE8rXnq2jAL-uFRHf55_nPzoxmTLmUhaMgXW42uEAMYgGoVPbTDBWonUqQ7HKLs1gCqUVy3MtbeZfH0lZXDXWPtvcX07GqP4Cgww10lbspNK-n2",
  driver: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNweR1bO8Qz65ISIRDy5trlRsZe7XzsKemqVDNFyhB8pTo8YwJkB1B14jeBAB3m0R8UpjtZcOwFp3puV6SJKAOFbbl2escy7AcwtfG79285umOMV5BhC_yoC6p9UipiGtGvGDOLwckXgnrqlpmlV757w6ViRsC2CseV9Qs1HQ-LE3NE1IfNSMLWlD_g9sDkO2iMU8E6fefsWp41nyNaqyH7SeRGoO4c9wjWekBPwKZny5CpvlIyXgH_yjWKZ-uQGfOacFD41Wiey3C",
  vault: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJqd-6hwkNv_F6ppNnSUPy253hLjVMRg3eafRdv36JC6qYf7ACqvHyBG3iP5H1wJDhj70EGDdQ81twecaux5UVPxbChiAiZCMBkE_4hiSC-7ejMnI3dGkQy8hPyL7wv1suZkFUKviwMKF2TU05DIvzJfzwYuTw13YCQ5qcrABvj29fs9OTUOugNR_WKvPD4_QfhydX-6OqDIUthIidOQOo_w-5nFtELWiW47v2Q-dA-lEsTFIlLOtT2pXiOC5QwuRXTpzHaPDueb1E",
};

// ===== Products Data =====
const electronics = [
  { name:"Midnight Series Watch", sub:"Titanium Case • Black Sport Loop", img:IMG.watch, price:"399", stars:5, reviews:"2,847", badge:"New", badgeType:"new", prime:true },
  { name:"Echo Pods Pro", sub:"Active Noise Cancellation", img:IMG.pods, price:"199", stars:4, reviews:"12,503", prime:true },
  { name:"Nexus Studio Hub", sub:"12-in-1 Connectivity Station", img:IMG.hub, price:"149", stars:4, reviews:"1,291", prime:true },
  { name:"Duo Power Base", sub:"15W Wireless Fast Charging", img:IMG.charger, price:"79", originalPrice:"99", discount:20, stars:4, reviews:"8,742", badge:"Sale", badgeType:"deal", prime:true },
];

const clothing = [
  { name:"Midnight Tech Parka", sub:"Water-Resistant • Breathable", img:IMG.parka, price:"245", stars:5, reviews:"934", prime:true },
  { name:"Core Essential Tee", sub:"100% Organic Pima Cotton", img:IMG.tee, price:"45", stars:4, reviews:"6,218", prime:true },
  { name:"Slate Utility Trousers", sub:"Tapered Fit • Multi-pocket", img:IMG.trousers, price:"120", stars:4, reviews:"2,103" },
  { name:"Obsidian Heavy Hoodie", sub:"450GSM Fleece • Oversized", img:IMG.hoodie, price:"85", stars:5, reviews:"4,567", badge:"Best Seller", badgeType:"bestseller", prime:true },
];

const essentials = [
  { name:"Frosted Glass Flask", sub:"Insulated • 500ml Capacity", img:IMG.flask, price:"32", stars:4, reviews:"3,892", prime:true },
  { name:"Midnight Soy Candle", sub:"Cedarwood & Lavender Scent", img:IMG.candle, price:"24", stars:5, reviews:"7,641" },
  { name:"Utility Tote Bag", sub:"Reinforced Heavy Canvas", img:IMG.bag, price:"38", stars:4, reviews:"1,987", prime:true },
  { name:"Night Journal", sub:"Linen Cover • 120gsm Paper", img:IMG.journal, price:"28", stars:4, reviews:"2,445" },
];

const hardware = [
  { name:"Titanium Multi-Tool", sub:"18 Integrated Functions", img:IMG.tool, price:"89", stars:5, reviews:"5,321", prime:true },
  { name:"Midnight Glass Case", sub:"MagSafe Compatible • iPhone 15", img:IMG.glasscase, price:"49", stars:4, reviews:"9,102", prime:true },
  { name:"Precision Driver Set", sub:"Electric • 24 Steel Bits", img:IMG.driver, price:"65", stars:4, reviews:"3,678", prime:true },
  { name:"Rugged Tech Vault", sub:"IP67 Waterproof • Shockproof", img:IMG.vault, price:"110", stars:5, reviews:"1,245", badge:"Top Rated", badgeType:"bestseller", prime:true },
];

const deals = [
  { name:"Duo Power Base", sub:"15W Wireless Fast Charging", img:IMG.charger, price:"79", originalPrice:"99", discount:20, stars:4, reviews:"8,742", badge:"-20%", badgeType:"deal", prime:true },
  { name:"Obsidian Heavy Hoodie", sub:"450GSM Fleece • Oversized", img:IMG.hoodie, price:"85", originalPrice:"110", discount:23, stars:5, reviews:"4,567", badge:"-23%", badgeType:"deal", prime:true },
  { name:"Midnight Soy Candle", sub:"Cedarwood & Lavender Scent", img:IMG.candle, price:"24", originalPrice:"35", discount:31, stars:5, reviews:"7,641", badge:"-31%", badgeType:"deal" },
  { name:"Precision Driver Set", sub:"Electric • 24 Steel Bits", img:IMG.driver, price:"65", originalPrice:"85", discount:24, stars:4, reviews:"3,678", badge:"-24%", badgeType:"deal", prime:true },
];

// ===== Category Cards =====
function renderCategories() {
  const el = document.getElementById('categories');
  if (!el) return;
  const cats = [
    { title:"Electronics", items:[{img:IMG.watch,l:"Watches"},{img:IMG.pods,l:"Audio"},{img:IMG.hub,l:"Smart Home"},{img:IMG.charger,l:"Accessories"}] },
    { title:"Clothing", items:[{img:IMG.parka,l:"Jackets"},{img:IMG.tee,l:"T-Shirts"},{img:IMG.trousers,l:"Trousers"},{img:IMG.hoodie,l:"Hoodies"}] },
    { title:"Daily Essentials", items:[{img:IMG.flask,l:"Bottles"},{img:IMG.candle,l:"Candles"},{img:IMG.bag,l:"Bags"},{img:IMG.journal,l:"Stationery"}] },
    { title:"Pro Hardware", items:[{img:IMG.tool,l:"Tools"},{img:IMG.glasscase,l:"Cases"},{img:IMG.driver,l:"Drivers"},{img:IMG.vault,l:"Storage"}] },
  ];
  el.innerHTML = cats.map(c => `
    <div class="category-card">
      <h3>${c.title}</h3>
      <div class="category-card-images">
        ${c.items.map(i => `<div class="cat-img"><img alt="${i.l}" src="${i.img}" loading="lazy"/><span>${i.l}</span></div>`).join('')}
      </div>
      <a href="#" class="see-more">See more</a>
    </div>
  `).join('');
}

// ===== Render product rows/grids =====
function render(id, data) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = data.map(card).join('');
}

// ===== Init =====
renderCategories();
render('deals-row', deals);
render('electronics-row', electronics);
render('clothing-grid', clothing);
render('essentials-row', essentials);
render('hardware-grid', hardware);
