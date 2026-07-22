const pubList = document.getElementById('pubList');
const pubTags = document.getElementById('pubTags');
let activeTag = 'all';
let publications = [];
let tags = [];

const renderTags = () => {
  if (!pubTags) return;
  pubTags.replaceChildren();
  [{ id: 'all', title: 'All' }, ...tags].forEach((tag) => {
    const button = document.createElement('button');
    button.className = `tag-button${tag.id === activeTag ? ' is-active' : ''}`;
    button.type = 'button';
    button.textContent = tag.title;
    button.addEventListener('click', () => {
      activeTag = tag.id;
      renderTags();
      renderPublications();
    });
    pubTags.appendChild(button);
  });
};

const renderPublications = () => {
  if (!pubList) return;
  const filtered = publications.filter((p) => activeTag === 'all' || (p.tags || []).includes(activeTag));
  if (!filtered.length) {
    const li = document.createElement('li');
    li.className = 'pub-empty';
    li.textContent = 'No research outputs listed yet.';
    pubList.replaceChildren(li);
    return;
  }
  pubList.replaceChildren(...filtered.map((publication) => {
    const li = document.createElement('li');
    li.className = 'pub-item';
    const img = document.createElement('img');
    img.className = 'pub-cover';
    img.src = window.resolveSiteUrl(publication.image || 'assets/images/publications/placeholder-cover.svg');
    img.alt = publication.title || 'Research output cover';
    const body = document.createElement('div');
    const title = document.createElement('h2');
    title.textContent = publication.title || 'Untitled';
    const authors = document.createElement('p');
    authors.className = 'pub-authors';
    authors.textContent = publication.content || '';
    const publisher = document.createElement('p');
    publisher.className = 'pub-publisher';
    publisher.textContent = publication.publisher || '';
    body.append(title, authors, publisher);
    li.append(img, body);
    return li;
  }));
};

const initializePublications = async () => {
  if (!pubList) return;
  try {
    const [pubResponse, tagResponse] = await Promise.all([
      fetch(window.resolveSiteUrl('content/publications.json'), { cache: 'no-store' }),
      fetch(window.resolveSiteUrl('content/publications_tags.json'), { cache: 'no-store' })
    ]);
    publications = await pubResponse.json();
    tags = await tagResponse.json();
    renderTags();
    renderPublications();
  } catch (error) {
    pubList.innerHTML = '<li class="content-load-error">Unable to load research outputs right now.</li>';
  }
};

initializePublications();
