const cvContent = document.getElementById('cvContent');
const FLAG_BASE_URL = 'https://cdn.jsdelivr.net/npm/flagpack-core@2.0.0/svg/l/';

const createCvEntry = (entry) => {
  const article = document.createElement('article');
  article.className = 'cv-entry';

  const logo = document.createElement('img');
  logo.className = 'cv-logo';
  logo.src = window.resolveSiteUrl(entry.logo || 'assets/images/uc-mark.svg');
  logo.alt = entry.logo_alt || '';

  const body = document.createElement('div');
  const title = document.createElement('p');
  title.className = 'cv-title';
  title.textContent = entry.title || '';
  const org = document.createElement('p');
  org.className = 'cv-org';
  org.textContent = entry.organization || '';
  const meta = document.createElement('p');
  meta.className = 'cv-meta';
  if (entry.dates) {
    const dates = document.createElement('span');
    dates.className = 'date-badge';
    dates.textContent = entry.dates;
    meta.appendChild(dates);
  }
  if (entry.flag) {
    const flag = document.createElement('img');
    flag.className = 'cv-flag';
    flag.src = `${FLAG_BASE_URL}${encodeURIComponent(entry.flag)}.svg`;
    flag.alt = entry.flag_alt || '';
    meta.appendChild(flag);
  }
  body.append(title, org, meta);

  if (Array.isArray(entry.bullets) && entry.bullets.length) {
    const ul = document.createElement('ul');
    ul.className = 'cv-bullets';
    entry.bullets.forEach((bullet) => {
      const li = document.createElement('li');
      li.textContent = bullet;
      ul.appendChild(li);
    });
    body.appendChild(ul);
  }

  article.append(logo, body);
  return article;
};

const initializeCv = async () => {
  if (!cvContent) return;
  try {
    const response = await fetch(window.resolveSiteUrl('content/cv.json'), { cache: 'no-store' });
    if (!response.ok) throw new Error('Failed to fetch CV.');
    const sections = await response.json();
    cvContent.replaceChildren();
    sections.forEach((section, index) => {
      const block = document.createElement('section');
      block.className = 'cv-section';
      const h = document.createElement('h1');
      h.textContent = section.title;
      if (index > 0) h.className = 'cv-section-heading';
      block.appendChild(h);
      (section.entries || []).forEach((entry) => block.appendChild(createCvEntry(entry)));
      cvContent.appendChild(block);
    });
  } catch (error) {
    cvContent.innerHTML = '<p class="content-load-error">Unable to load CV content right now.</p>';
  }
};

initializeCv();
