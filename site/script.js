const scriptBaseUrl = new URL('.', document.currentScript.src);
const siteRootUrl = new URL('../', scriptBaseUrl);
window.siteRootUrl = siteRootUrl;
window.resolveSiteUrl = (path = '') => {
  if (/^(https?:|mailto:)/i.test(path)) return path;
  return new URL(path, siteRootUrl).href;
};

const localPathName = () => window.location.pathname.split('/').pop() || 'index.html';

const renderLastUpdated = () => {
  const parsed = new Date(document.lastModified);
  const safe = Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  const text = new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: '2-digit' }).format(safe);
  document.querySelectorAll('.last-updated').forEach((node) => { node.textContent = text; });
};

const createNav = (site) => {
  document.querySelectorAll('[data-site-nav]').forEach((nav) => {
    const inner = document.createElement('div');
    inner.className = 'container topbar-inner';

    const brand = document.createElement('a');
    brand.className = 'site-name';
    brand.href = window.resolveSiteUrl('index.html');
    brand.textContent = site.name;

    const links = document.createElement('div');
    links.className = 'nav-links';

    (site.navigation || []).forEach((item) => {
      const link = document.createElement('a');
      link.href = window.resolveSiteUrl(item.path);
      link.textContent = item.label;
      if (/^(https?:|mailto:)/i.test(item.path)) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
      links.appendChild(link);
    });

    const menuButton = document.createElement('button');
    menuButton.className = 'menu-button';
    menuButton.type = 'button';
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i><span>Menu</span>';

    menuButton.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(open));
    });

    inner.append(brand, links, menuButton);
    nav.replaceChildren(inner);
  });
};

const createFooter = (site) => {
  document.querySelectorAll('[data-site-footer]').forEach((footer) => {
    const p = document.createElement('p');
    p.append(`© ${site.copyright_year} ${site.name} · ${site.footer_text || 'Updated'} `);
    const updated = document.createElement('span');
    updated.className = 'last-updated';
    updated.textContent = '--';
    p.appendChild(updated);

    if (site.attribution?.source_url && site.attribution?.source_label) {
      p.append(` · ${site.attribution.prefix || 'Adapted from'} `);
      const a = document.createElement('a');
      a.href = site.attribution.source_url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = site.attribution.source_label;
      p.appendChild(a);
    }

    const container = document.createElement('div');
    container.className = 'container';
    container.appendChild(p);
    footer.replaceChildren(container);
  });
  renderLastUpdated();
};

const setPageMeta = (site) => {
  const pageConfig = site.pages?.[localPathName()];
  if (pageConfig) {
    document.title = pageConfig.title ? `${pageConfig.title} | ${site.name}` : (site.site_title || site.name);
    const meta = document.querySelector('meta[name="description"]');
    if (meta && pageConfig.description) meta.content = pageConfig.description;
  }
};

const setHomeContent = (site) => {
  const title = document.getElementById('aboutTitle');
  if (title) title.textContent = `About ${site.short_name || site.name}`;

  const bio = document.getElementById('aboutBio');
  if (bio) bio.innerHTML = site.bio_html || '';

  const profile = document.getElementById('profileImage');
  if (profile) {
    profile.src = window.resolveSiteUrl(site.profile_image || 'assets/images/profile.jpg');
    profile.alt = site.profile_image_alt || `${site.name} profile photo`;
  }

  const contact = document.getElementById('aboutContact');
  if (contact) {
    const title = document.createElement('p');
    title.className = 'about-contact-title';
    title.textContent = 'Contact';
    contact.replaceChildren(title);
    (site.contact || []).forEach((line) => {
      const p = document.createElement('p');
      p.textContent = line;
      contact.appendChild(p);
    });
  }

  const social = document.getElementById('socialLinks');
  if (social) {
    social.replaceChildren();
    (site.social_links || []).forEach((item) => {
      const a = document.createElement('a');
      a.href = item.url;
      a.className = 'quick-link';
      a.target = item.url?.startsWith('mailto:') ? '' : '_blank';
      a.rel = 'noopener noreferrer';
      a.innerHTML = `<i class="${item.icon}" aria-hidden="true"></i><span>${item.label}</span>`;
      social.appendChild(a);
    });
  }
};

window.siteConfigPromise = fetch(window.resolveSiteUrl('content/site.json'), { cache: 'no-store' })
  .then((response) => {
    if (!response.ok) throw new Error('Failed to fetch site configuration.');
    return response.json();
  })
  .then((site) => {
    setPageMeta(site);
    createNav(site);
    createFooter(site);
    setHomeContent(site);
    return site;
  })
  .catch((error) => {
    console.error(error);
  });
