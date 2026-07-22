const projectsList = document.getElementById('projectsList');
const homeProjectsList = document.getElementById('homeProjectsList');

const createProjectCard = (project, compact = false) => {
  const link = document.createElement('a');
  link.className = compact ? 'mini-project-card' : 'project-item-link';
  link.href = window.resolveSiteUrl(project.url);

  const article = document.createElement('article');
  article.className = compact ? 'mini-project' : 'project-item';

  const img = document.createElement('img');
  img.src = window.resolveSiteUrl(project.image);
  img.alt = project.image_alt || '';
  img.loading = 'lazy';

  const content = document.createElement('div');
  const status = document.createElement('p');
  status.className = 'project-status';
  status.textContent = project.status || '';
  const title = document.createElement('h2');
  title.textContent = project.title;
  const summary = document.createElement('p');
  summary.textContent = project.summary;

  content.append(status, title, summary);
  article.append(img, content);
  link.appendChild(article);
  return link;
};

const initializeProjects = async () => {
  if (!projectsList && !homeProjectsList) return;
  try {
    const response = await fetch(window.resolveSiteUrl('content/projects.json'), { cache: 'no-store' });
    if (!response.ok) throw new Error('Failed to fetch projects.');
    const projects = await response.json();

    if (projectsList) {
      projectsList.replaceChildren(...projects.map((project) => createProjectCard(project, false)));
    }
    if (homeProjectsList) {
      homeProjectsList.replaceChildren(...projects.slice(0, 3).map((project) => createProjectCard(project, true)));
    }
  } catch (error) {
    const p = document.createElement('p');
    p.className = 'content-load-error';
    p.textContent = 'Unable to load projects right now.';
    projectsList?.replaceChildren(p);
    homeProjectsList?.replaceChildren(p.cloneNode(true));
  }
};

initializeProjects();
