const homeNewsList = document.getElementById('homeNewsList');
const fullNewsList = document.getElementById('newsList');
const newsCount = document.getElementById('newsCount');

const formatDate = (value) => {
  const parsed = Date.parse(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed)) return value || '';
  return new Intl.DateTimeFormat(undefined, { month: 'short', year: 'numeric' }).format(new Date(parsed));
};

const newsItem = (item) => {
  const article = document.createElement('article');
  article.className = 'news-item';
  const date = document.createElement('span');
  date.className = 'news-date';
  date.textContent = formatDate(item.date);
  const text = document.createElement('span');
  text.className = 'news-text';
  text.textContent = item.text || '';
  if (item.url) {
    text.append(' ');
    const a = document.createElement('a');
    a.href = window.resolveSiteUrl(item.url);
    a.textContent = item.url_label || 'Read more';
    text.appendChild(a);
  }
  article.append(date, text);
  return article;
};

const initializeNews = async () => {
  if (!homeNewsList && !fullNewsList) return;
  try {
    const response = await fetch(window.resolveSiteUrl('content/news.json'), { cache: 'no-store' });
    if (!response.ok) throw new Error('Failed to fetch news.');
    const items = (await response.json()).slice().sort((a, b) => Date.parse(`${b.date}T00:00:00Z`) - Date.parse(`${a.date}T00:00:00Z`));
    if (newsCount) newsCount.textContent = `${items.length} update${items.length === 1 ? '' : 's'}`;
    homeNewsList?.replaceChildren(...items.slice(0, 5).map(newsItem));
    fullNewsList?.replaceChildren(...items.map(newsItem));
  } catch (error) {
    const p = document.createElement('p');
    p.className = 'content-load-error';
    p.textContent = 'Unable to load news right now.';
    homeNewsList?.replaceChildren(p);
    fullNewsList?.replaceChildren(p.cloneNode(true));
  }
};

initializeNews();
