// Ikoner som inline-SVG. Klasserna används för de små hovringsrörelserna.
export const ICONS = {
  book: `<svg class="ico ico-book" viewBox="0 0 24 24" aria-hidden="true"><path class="book-cover" d="M4 5.5C4 4.7 4.7 4 5.5 4H11v15H5.5A1.5 1.5 0 0 0 4 20.5z"/><path class="book-cover" d="M20 5.5c0-.8-.7-1.5-1.5-1.5H13v15h5.5c.8 0 1.5.7 1.5 1.5z"/><path class="book-page p1" d="M11 6.5c-1.6-.7-3.4-.9-5 0"/><path class="book-page p2" d="M13 6.5c1.6-.7 3.4-.9 5 0"/><path class="book-page p3" d="M11 9.5c-1.6-.7-3.4-.9-5 0M13 9.5c1.6-.7 3.4-.9 5 0"/></svg>`,
  code: `<svg class="ico ico-code" viewBox="0 0 24 24" aria-hidden="true"><path class="code-l" d="M8 7l-5 5 5 5"/><path class="code-r" d="M16 7l5 5-5 5"/><path class="code-s" d="M13.5 5l-3 14"/></svg>`,
  glossary: `<svg class="ico ico-glossary" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/><path d="M9 7.5h6M9 10.5h4"/></svg>`,
  rocket: `<svg class="ico ico-rocket" viewBox="0 0 24 24" aria-hidden="true"><g class="rocket-body"><path d="M12 2.5c3.2 2 5 5.4 5 9.3V15l-2.2 2.2H9.2L7 15v-3.2c0-3.9 1.8-7.3 5-9.3z"/><circle cx="12" cy="9.5" r="1.9"/><path d="M7 13.5l-2.6 2.2.6 3.3 3.2-1.8M17 13.5l2.6 2.2-.6 3.3-3.2-1.8"/></g><path class="rocket-flame" d="M10.3 18.5c.3 1.6.9 2.6 1.7 3.2.8-.6 1.4-1.6 1.7-3.2"/></svg>`,
  gear: `<svg class="ico ico-gear" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v2.4M12 18.8v2.4M21.2 12h-2.4M5.2 12H2.8M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7M18.5 18.5l-1.7-1.7M7.2 7.2L5.5 5.5"/></svg>`,
  lock: `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/></svg>`,
  check: `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`,
  play: `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10-6.5z"/></svg>`,
  star: `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.8l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z"/></svg>`,
  sun: `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></svg>`,
  close: `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
};

// Milo: en liten panda med grön halsduk. Samma figur som public/companions/milo.svg.
export const MILO_SVG = `<svg class="milo" viewBox="0 0 120 120" role="img" aria-label="Milo, en liten panda">
  <g class="milo-body">
    <ellipse cx="60" cy="92" rx="30" ry="24" fill="#fbfaf7" stroke="#2b2733" stroke-width="2.5"/>
    <ellipse cx="44" cy="108" rx="10" ry="7" fill="#2b2733"/>
    <ellipse cx="76" cy="108" rx="10" ry="7" fill="#2b2733"/>
    <path d="M36 72c8 7 40 7 48 0l3 8c-10 8-44 8-54 0z" fill="#5fae7b" stroke="#2b2733" stroke-width="2"/>
    <path d="M70 78l6 16 7-3-5-14z" fill="#4c9a68" stroke="#2b2733" stroke-width="2" stroke-linejoin="round"/>
    <ellipse class="milo-arm-left" cx="34" cy="92" rx="8" ry="12" fill="#2b2733"/>
  </g>
  <g class="milo-wave">
    <ellipse cx="90" cy="70" rx="8" ry="12" fill="#2b2733" transform="rotate(-35 90 70)"/>
  </g>
  <g class="milo-head">
    <circle cx="32" cy="24" r="12" fill="#2b2733"/>
    <circle cx="88" cy="24" r="12" fill="#2b2733"/>
    <ellipse cx="60" cy="46" rx="34" ry="30" fill="#fbfaf7" stroke="#2b2733" stroke-width="2.5"/>
    <ellipse cx="46" cy="45" rx="9" ry="11" fill="#2b2733" transform="rotate(-20 46 45)"/>
    <ellipse cx="74" cy="45" rx="9" ry="11" fill="#2b2733" transform="rotate(20 74 45)"/>
    <g class="milo-eyes">
      <circle cx="47" cy="45" r="3.6" fill="#fff"/><circle cx="73" cy="45" r="3.6" fill="#fff"/>
      <circle cx="47.8" cy="44" r="1.3" fill="#2b2733"/><circle cx="73.8" cy="44" r="1.3" fill="#2b2733"/>
    </g>
    <ellipse cx="38" cy="58" rx="6" ry="3.5" fill="#f7b6c2" opacity=".85"/>
    <ellipse cx="82" cy="58" rx="6" ry="3.5" fill="#f7b6c2" opacity=".85"/>
    <ellipse cx="60" cy="56" rx="5" ry="3.6" fill="#2b2733"/>
    <path d="M55 62c2 3 8 3 10 0" fill="none" stroke="#2b2733" stroke-width="2" stroke-linecap="round"/>
  </g>
</svg>`;
