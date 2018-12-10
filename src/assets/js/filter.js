let currentTag = 'all';
let lastRef;
let projects = [];

const showProject = (project) => {
  const nextProject = project;
  nextProject.hidden = false;
  nextProject.el.style = 'display: inherit;';
  return nextProject;
};

const hideProject = (project) => {
  const nextProject = project;
  nextProject.hidden = true;
  nextProject.el.style = 'display: none;';
  return nextProject;
};

function showAll() {
  projects = projects
    .map(project => (project.hidden ? showProject(project) : project));
}

function filterProjects() {
  projects = projects
    .map((project) => {
      if (project.tags.includes(currentTag)) {
        if (project.hidden) {
          return showProject(project);
        }
      } else if (!project.hidden) {
        return hideProject(project);
      }

      return project;
    });
}

const handleClickFactory = (tag, ref) => () => {
  if (currentTag === tag) {
    currentTag = 'all';
    showAll();
    $(ref).removeClass('selected');
  } else {
    currentTag = tag;
    filterProjects();
    if (lastRef) {
      $(lastRef).removeClass('selected');
    }
    $(ref).addClass('selected');
  }

  lastRef = ref;
};

function main() {
  // assign the filters and projects from DOM into local variables.
  const filters = document.getElementsByClassName('projects-filter__tag');
  const projectThumbnails = document.getElementsByClassName('project-thumbnail__link');

  // assign the click handlers to the filter buttons
  for (let i = 0; i < filters.length; i += 1) {
    const filter = filters[i].getAttribute('data-tag');
    filters[i].addEventListener('click', handleClickFactory(filter, filters[i]));
  }

  // populate the projects global state object by reading the DOM
  for (let i = 0; i < projectThumbnails.length; i += 1) {
    projects.push({
      el: projectThumbnails[i],
      tags: projectThumbnails[i].getAttribute('data-tags').split(','),
      hidden: false,
    });
  }
}

main();
