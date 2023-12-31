<script>
export default {
  setup() {
    const config = useRuntimeConfig()
    return {
      config
    }
  },
  data() {
    return {
      techs: [],
      filters: ['all'],
      projects: '',
      loading: true,
    };
  },
  mounted() {
    this.projects = this.config.public.dev.projects;
    this.loading = false;
    this.techs = this.getUsedTechs();
  },
  methods: {
    getUsedTechs() {
      const projectArray = Object.values(this.config.public.dev.projects);
      const techSet = new Set();

      projectArray.forEach(project => {
        project.tech.forEach(tech => {
          techSet.add(tech);
        });
      });

      return Array.from(techSet);
    },

    filterProjects(tech) {

      document.getElementById('icon-tech-' + tech).classList.toggle('active'); // change tech icon opacity
      document.getElementById('title-tech-' + tech).classList.toggle('active'); // change tech text color

      const check = document.getElementById(tech);
      if (check.checked) {
        this.filters = this.filters.filter((item) => item !== 'all'); // remove 'all' from filters
        this.filters.push(tech) // add tech to filters
      } else {
        this.filters = this.filters.filter((item) => item !== tech); // remove tech from filters
        this.filters.length === 0 ? this.filters.push('all') : null; // add 'all' to filters if filters is empty
      }
      this.filters[0] === 'all' ? this.projects = this.config.public.dev.projects : this.projects = this.filterProjectsBy(this.filters);

      if(this.projects.length === 0){
        // set flex to projects-case
        document.getElementById('projects-case').classList.remove('flex');
        document.getElementById('not-found').classList.remove('hidden');

      }else{
        // set grid to projects-case
        document.getElementById('projects-case').classList.add('flex');
        document.getElementById('not-found').classList.add('hidden');
      }

    },
    hiddeSection() {
      document.getElementById('filter-menu').classList.toggle('hidden');
      document.getElementsByClassName('section-arrow')[0].classList.toggle('rotate-90');
    },
    filterProjectsBy(filters) {
      const projectArray = Object.values(this.config.public.dev.projects);
      return projectArray.filter(project => {
        return filters.some(filter => project.tech.includes(filter));
      });
    },
    fadeDirection() {
      const directions = ['left', 'right', 'up', 'down'];
      const direction = directions[Math.floor(Math.random() * directions.length)];
      return `fade-${direction}`;
    },
    fadeDelay(key) {
      return key * 200;
    }
  },
};

</script>

<template>
  <main v-if="!loading" class="flex flex-col flex-auto lg:flex-row overflow-hidden">

    <div id="mobile-page-title">
      <h2>_projects</h2>
    </div>

    <!-- section title (mobile) -->
    <div id="section-content-title" class="flex lg:hidden" @click="hiddeSection()">
      <img class="section-arrow" src="/svg/arrow.svg">
      <p class="font-fira_regular text-white text-sm">projects</p>
    </div>

    <div data-aos="fade-right" id="filter-menu" class="w-full flex-col border-right font-fira_regular text-menu-text hidden lg:flex">
      <!-- title -->
      <div id="section-content-title" class="hidden lg:flex items-center min-w-full">
        <img id="section-arrow-menu" src="/svg/arrow.svg" alt="" class="section-arrow mx-3 open">
        <p class="font-fira_regular text-white text-sm">projects</p>
      </div>

      <!-- filter menu -->
      <nav id="filters" class="w-full flex-col">

        <div v-for="tech in techs" :key="tech" class="flex items-center py-2">
          <input type="checkbox" :id="tech" @click="filterProjects(tech)">
          <img :id="'icon-tech-' + tech" :src="'/svg/techs/' + tech + '.svg'" alt="" class="tech-icon w-5 h-5 mx-4">
          <span :id="'title-tech-' + tech">{{ tech.charAt(0).toUpperCase() + tech.slice(1) }}</span>
        </div>
      </nav>
    </div>

    <!-- content -->

    <div class="flex flex-col w-full overflow-hidden">

      <!-- windows tab -->
      <div data-aos="fade-left" class="tab-height w-full hidden lg:flex border-bot items-center">
        <div class="flex items-center border-right h-full">
          <p v-for="filter in filters" :key="filter" class="font-fira_regular text-menu-text text-sm px-3">{{ filter }};</p>
          <img src="/svg/close.svg" alt="" class="m-3">
        </div>
      </div>

      <!-- windows tab mobile -->
      <div id="tab" class="flex lg:hidden items-center">
          <span class="text-white"> // </span>
          <p class="font-fira_regular text-white text-sm px-3">projects</p>
          <span class="text-menu-text"> / </span>
          <p v-for="filter in filters" :key="filter" class="font-fira_regular text-menu-text text-sm px-3">{{ filter }};</p>
      </div>

      <!-- projects -->
      <div data-aos="fade-up" id="projects-case" class="flex flex-wrap justify-center max-w-full h-full overflow-scroll lg:self-center">
        <div id="not-found" class="hidden flex flex-col font-fira_retina text-menu-text my-5 h-full justify-center items-center">
          <span class="flex justify-center text-4xl pb-3">
            X__X
          </span>
          <span class="text-white flex justify-center text-xl">
            No matching projects
          </span>
          <span class="flex justify-center">
            for these technologies
          </span>
        </div>

        <div v-for="(project, key, index) in projects" :key="key" class="project lg:mx-5" :data-aos="fadeDirection()" :data-aos-delay="fadeDelay(key)">
        <!-- title -->
          <span class="flex text-sm my-3">
            <h3 v-if="index == null" class="text-purplefy font-fira_bold mr-3">Project {{ key + 1 }}</h3>
            <h3 v-else class="text-purplefy font-fira_bold mr-3">Project {{ index + 1 }}</h3>
            <h4 class="font-fira_retina text-menu-text"> // {{ project.title }}</h4>
          </span>

          <!-- info -->
          <div id="project-card" class="flex flex-col">
             <div id="window">
              <div class="absolute flex right-3 top-3">
                <img v-for="tech in project.tech" :key="tech" :src="'/svg/techs/filled/' + tech + '.svg'" alt="" class="w-6 h-6 mx-1 hover:opacity-75">
              </div>
              <img id="showcase" :src="project.img" alt="" class="">
            </div>

            <div class="pb-8 pt-6 px-6 border-top">
              <p class="text-menu-text font-fira_retina text-sm mb-5">
                {{ project.description }}
              </p>
              <a id="view-button" :href="project.url" target="_blank" class="text-white font-fira_retina py-2 px-4 w-fit text-xs rounded-lg">
                  view-project
              </a>
            </div>
          </div>
        </div>
      </div>
  </div>
</main>
</template>

<style>

#filters {
  padding: 10px 25px;
}

#tab {
  padding: 25px 25px 5px;
  flex-wrap: wrap;
}

.tech-icon {
  opacity: 0.4;
}

.tech-icon.active {
  opacity: 1;
}

#title-tech.active {
  color: white;
}

#projects-case {
  /* padding: 100px; */
}

#project {
  min-width: 400px;
  margin-bottom: 5px;
}

.project {
  height: fit-content;
}

#project-card {
  border: 1px solid #1E2D3D;
  background-color: #011221;
  border-radius: 15px;
  max-width: 400px;
  /* max-height: 315px; */
}

#showcase {
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
}

#view-button {
  background-color: #1C2B3A;
}

#view-button:hover {
  background-color: #263B50;
}

#window {
  max-height: 150px;
  position: relative;
  overflow: hidden;
}

input[type="checkbox"] {
  appearance: none;
  background-color: transparent;
  width: 1.15em;
  height: 1.15em;
  border: 2px solid currentColor;
  border-radius: 0.15em;
  margin-top: 1px;
}

input[type="checkbox"]:checked {
  background-color: currentColor;
  background-image: url("data:image/svg+xml;utf8,<svg width='13' height='10' viewBox='0 0 13 10' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M5.38587 7.2802L11.9718 0.693573L12.9856 1.70668L5.38587 9.30641L0.826172 4.74671L1.83928 3.73361L5.38587 7.2802Z' fill='white'/></svg>");
  background-repeat: no-repeat;
  background-position: center;
}

input[type="checkbox"]:checked:hover {
  box-shadow: #607b968b 0px 0px 0px 2px;
}

input[type="checkbox"]:not(:checked) {
  border-color: currentColor;
}

input[type="checkbox"]:hover {
  cursor: pointer;
  background-color: currentColor;
  background-image: url("data:image/svg+xml;utf8,<svg width='13' height='10' viewBox='0 0 13 10' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M5.38587 7.2802L11.9718 0.693573L12.9856 1.70668L5.38587 9.30641L0.826172 4.74671L1.83928 3.73361L5.38587 7.2802Z' fill='white'/></svg>");
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: #607b968b 0px 0px 0px 2px;
}

input[type="checkbox"]:hover:not(:checked) {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.1);
  background-image: none;
  box-shadow: #607b968b 0px 0px 0px 2px;
}

input[type="checkbox"]:focus {
  box-shadow: none;
}

@media (max-width: 768px) {
  #projects-case {
    padding: 0px 25px 40px;
  }

  #project {
    min-width: 100%;
  }
}

@media (min-width: 768px) {
  #projects-case {
    padding: 50px 50px 40px;
  }
  #project {
    width: 100%;
    min-width: 100%;
    padding-inline: 5px;
  }
}

@media (min-width: 1350px) {
  #projects-case {
    padding: 50px 80px 40px;
    /* padding: 100px 100px 40px; */
  }
  #project {
    width: 100%;
    min-width: 100%;
    padding-inline: 20px;
  }
}

@keyframes animateToBottom {
  from {
    transform: translate3d(0, -200px, 0);
  }
  to {
    transform: translate3d(0, 10px, 0);
  }
}
</style>
