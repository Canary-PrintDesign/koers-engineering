let currentTag;
let projects = [];

const showProject = (project) => {
  const nextProject = project;
  nextProject.hidden = false;
  document.getElementById(nextProject.id).style = 'display: inherit;';
  return nextProject;
};

const hideProject = (project) => {
  console.log('hiding project ', project)
  const nextProject = project;
  nextProject.hidden = true;
  document.getElementById(nextProject.id).style = 'display: none;';
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

const handleClickFactory = tag => () => {
  if (currentTag === tag) {
    currentTag = undefined;
    showAll();
  } else {
    currentTag = tag;
    filterProjects();
  }
};

function main() {
  // assign the click handlers to the filter buttons
  for (const filterButton of document.getElementsByClassName('projects-filter__tag')) {
    const filter = filterButton.getAttribute('data-tag');
    filterButton.addEventListener('click', handleClickFactory(filter));
  }

  for (const project of document.getElementsByClassName('project-thumbnail__link')) {
    projects.push({
      id: project.getAttribute('id'),
      tags: project.getAttribute('data-tags').split(','),
      hidden: false,
    });
  }
}

main();
