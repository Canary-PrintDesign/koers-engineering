let currentTag;
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
    currentTag = undefined;
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
  // assign the click handlers to the filter buttons
  for (const filterButton of document.getElementsByClassName('projects-filter__tag')) {
    const filter = filterButton.getAttribute('data-tag');
    filterButton.addEventListener('click', handleClickFactory(filter, filterButton));
  }

  // populate the projects global state object by reading the DOM
  for (const project of document.getElementsByClassName('project-thumbnail__link')) {
    projects.push({
      el: project,
      tags: project.getAttribute('data-tags').split(','),
      hidden: false,
    });
  }
}

main();
