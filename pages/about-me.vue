<script>

import GistSnippet from "~/components/GistSnippet.vue";
import CommentedText from "~/components/CommentedText.vue";

export default {
  components: {CommentedText, GistSnippet},
  data() {
    return {
      currentSection: 'personal-info',
      folder: 'bio',
      loading: true,
      hasError: false
    }
  },
  setup() {
    const config = useRuntimeConfig()
    return {
      config
    }
  },
  computed: {
    // Set active class to current page link
    isActive() {
      return folder => this.folder === folder;
    },
    isSectionActive() {
      return section => this.currentSection === section;
    },
    isOpen() {
      return folder => this.folder === folder;
    },
  },
  methods: {
    focusCurrentSection(section) {
      this.currentSection = section.title
      this.folder = Object.keys(section.info)[0]

      document.getElementById('folders-' + section.title).classList.toggle('hidden') // show folders
      document.getElementById('section-arrow-' + section.title).classList.toggle('rotate-90'); // rotate arrow
    },
    focusCurrentFolder(folder) {
      this.folder = folder.title
      // handle if folder belongs to the current section. It happens when you click on a folder from a different section in mobile view.
      this.currentSection = this.config.dev.about.sections[this.currentSection].info[folder.title] ? this.currentSection : Object.keys(this.config.dev.about.sections).find(section => this.config.dev.about.sections[section].info[folder.title])
    },
    handleError(error) {
      console.error('Une erreur s\'est produite dans le composant enfant :', error);
      this.hasError = true
    },
    /* Mobile */
    showContacts() {
      document.getElementById('contacts').classList.toggle('hidden')
      document.getElementById('section-arrow').classList.toggle('rotate-90'); // rotate arrow
    },
  },
  mounted(){
    this.loading = false
  }
}
</script>

<template>
  <main v-if="!loading" id="about-me" class="page">

    <div id="mobile-page-title">
      <h2>_about-me</h2>
    </div>

    <div data-aos="fade-right" id="page-menu" class="w-full flex">

      <!-- DESKTOP section icons -->
      <div id="sections">
        <div id="section-icon" v-for="section in config.dev.about.sections" :key="section.title" :class="{ active: isSectionActive(section.title)}">
          <img :id="'section-icon-' + section.title" :src="section.icon" :alt="section.title + '-section'" @click="focusCurrentSection(section)">
        </div>
      </div>

      <!-- focused section content -->
      <div id="section-content" class="hidden lg:block w-9/12 h-full border-right">

        <!-- title -->
        <div id="section-content-title" class="hidden lg:flex items-center min-w-full">
          <img id="section-arrow-menu" src="/svg/arrow.svg" alt="" class="section-arrow mx-3 open">
          <p v-html="config.dev.about.sections[currentSection].title" class="font-fira_regular text-white text-sm"></p>
        </div>

        <!-- folders -->
        <div>
          <div v-for="(folder, key, index) in config.dev.about.sections[currentSection].info" :key="key" class="grid grid-cols-2 items-center my-2 font-fira_regular text-menu-text" @click="focusCurrentFolder(folder)">
            <div class="flex col-span-2 hover:text-white hover:cursor-pointer">
              <img id="diple" src="/svg/diple.svg" alt="" :class="{ open: isOpen(folder.title)}">
              <img :src="'/svg/folder' + (index+1) + '.svg'" alt="" class="mr-3">
              <p :id="folder.title" v-html="key" :class="{ active: isActive(folder.title)}"></p>
            </div>
          </div>
        </div>

        <!-- contact -->
        <div id="section-content-title-contact" class="flex items-center min-w-full border-top">
          <img id="section-arrow-menu" src="/svg/arrow.svg" alt="" class="section-arrow mx-3 open">
          <p v-html="config.dev.contacts.direct.title" class="font-fira_regular text-white text-sm"></p>
        </div>
        <div id="contact-sources" class="hidden lg:flex lg:flex-col my-2">
          <div v-for="(source, key) in config.dev.contacts.direct.sources" :key="key" class="flex items-center mb-2">
            <img v-if="key === 'email'" :src="'/svg/' + key + '.svg'" :alt="`icon email`" class="mx-4">
            <img v-else-if="key === 'phone'" :src="'/svg/' + key + '.svg'" :alt="`icon phone`" class="mx-4">
            <a v-if="key === 'email'" :href="'mailto:' + source" class="font-fira_retina text-menu-text hover:text-white truncate">{{ source }}</a>
            <a v-else-if="key === 'phone'" :href="'tel:' + source" class="font-fira_retina text-menu-text hover:text-white truncate">{{ source }}</a>
          </div>
        </div>

      </div>

      <!-- mobile -->
      <div id="section-content" class="lg:hidden w-full font-fira_regular">

        <div v-for="section in config.dev.about.sections" :key="section.title">
          
          <!-- section title (mobile) -->
          <div :key="section.title" :src="section.icon" id="section-content-title" class="flex lg:hidden mb-1" @click="focusCurrentSection(section)">
            <img src="/svg/arrow.svg" :id="'section-arrow-' + section.title" alt="" class="section-arrow">
            <p v-html="section.title" class=" text-white text-sm"></p>
          </div>

          <!-- folders -->
          <div :id="'folders-' + section.title" class="hidden"> <!-- <div :id="'folders-' + section.title" :class="currentSection == section.title ? 'block' : 'hidden'"> -->
            <div v-for="(folder, key, index) in config.dev.about.sections[section.title].info" :key="key" class="grid grid-cols-2 items-center my-2 font-fira_regular text-menu-text hover:text-white hover:cursor-pointer" @click="focusCurrentFolder(folder)">
              <div class="flex col-span-2">
                <img id="diple" src="/svg/diple.svg">
                <img :src="'svg/folder' + (index+1) + '.svg'" alt="" class="mr-3">
                <p :id="folder.title" v-html="key" :class="{ active: isActive(folder.title)}"></p>
              </div>
              <div v-if="folder.files !== undefined" class="col-span-2">
                <div v-for="(file, key) in folder.files" :key="key" class="hover:text-white hover:cursor-pointer flex my-2">
                  <img src="/svg/markdown.svg" alt="" class="ml-8 mr-3"/>
                  <p >{{ key }}</p>
                </div>
                
              </div>
            </div>
          </div>
          
        </div>

        <!-- section content title -->
        <div id="section-content-title" class="flex items-center min-w-full" @click="showContacts()">
          <img src="/svg/arrow.svg" alt="" id="section-arrow" class="section-arrow">
          <p v-html="config.dev.contacts.direct.title" class="font-fira_regular text-white text-sm"></p>
        </div>

        <!-- section content folders -->
        <div id="contacts" class="hidden">
          <div v-for="(source, key) in config.dev.contacts.direct.sources" :key="key" class="flex items-center my-2">
            <img :src="'/svg/' + key + '.svg'" alt="">
            <a v-html="source" href="/" class="font-fira_retina text-menu-text hover:text-white ml-4"></a>
          </div>
        </div>

      </div>

    </div>
    <!-- MENU END -->

    <!-- content -->
    <div class="flex flex-col lg:grid lg:grid-cols-2 h-full w-full">
      
      <div id="left" class="w-full flex flex-col border-right">
        
        <!-- windows tab desktop -->
        <div data-aos="fade-left" class="tab-height w-full hidden lg:flex border-bot items-center">
          <div class="flex items-center border-right h-full">
            <p v-html="config.dev.about.sections[currentSection].title" class="font-fira_regular text-menu-text text-sm px-3"></p>
            <img src="/svg/close.svg" alt="" class="mx-3">
          </div>
        </div>

        <!-- windows tab mobile -->
        <div id="tab-mobile" class="flex lg:hidden font-fira_retina">
            <span class="text-white">// </span>
            <h3 v-html="config.dev.about.sections[currentSection].title" class="text-white px-2"></h3>
            <span class="text-menu-text"> / </span>
            <h3 v-html="config.dev.about.sections[currentSection].info[folder].title" class="text-menu-text pl-2"></h3>
        </div>
        
        <!-- text -->
        <div data-aos="fade-up" id="commented-text" class="flex h-full w-full lg:border-right overflow-hidden">

          <div class="w-full h-full ml-5 mr-10 lg:my-5 overflow-scroll">
              <CommentedText data-aos="fade-down" data-aos-delay="500" :text="config.dev.about.sections[currentSection].info[folder].description" />
          </div>
          
          <!-- scroll bar -->
          <div id="scroll-bar" class="h-full border-left hidden lg:flex justify-center py-1">
            <div id="scroll"></div>
          </div>

        </div>

      </div>

      <div id="right" class="max-w-full flex flex-col">

        <!-- windows tab -->
        <div data-aos="fade-left" class="tab-height w-full h-full hidden lg:flex border-bot items-center">

        </div>

        <!-- windows tab mobile -->
        <div class="tab-height w-full h-full flex-none lg:hidden items-center">

        </div>

        <div data-aos="fade-up" id="gists-content" class="flex">

          <div v-if="!hasError" id="gists" class="flex flex-col lg:px-6 lg:py-4 w-full overflow-hidden">
            <!-- title -->
            <h3 class="text-white lg:text-menu-text mb-4 text-sm">// Code snippet showcase:</h3>

            <div class="flex flex-col overflow-scroll">
              <!-- snippets -->
              <GistSnippet data-aos="fade-down" :data-aos-delay="200 * key" v-for="(gist, key) in config.public.dev.gists" :key="key" :id="gist" @error="handleError" />
            </div>
          </div>
          <div v-else>
            <!-- Div affichée en cas d'erreur -->
            <div class="error-message">
              Une erreur s'est produite lors de la récupération des snippets.
            </div>
          </div>

          <!-- scroll bar -->
          <div id="scroll-bar" class="h-full border-left hidden lg:flex justify-center py-1">
            <div id="scroll"></div>
          </div>
        </div>

      </div>

    </div>

  </main>
</template>

<style>

#sections {
  width: 5rem; /* 80px */
  height: 100%;
  display: none;
  border-right: 1px solid #1E2D3D;
}

/* LG */
@media (min-width: 1024px) {
  #sections {
    display: block;
  }
}

#section-icon {
  @apply my-6 hover:cursor-pointer flex justify-center;
  opacity: 0.4;
}

#section-icon.active {
  opacity: 1;
}

#section-icon:hover {
  opacity: 1;
}

.tab-height {
  min-height: 35px;
  max-height: 35px;
}

#tab-mobile {
  padding: 25px 20px 0px 25px;
  align-items: flex-end;
}

#scroll-bar{
  width: 20px;
}

#scroll {
  width: 14px;
  height: 7px;
  background-color: #607B96;
}

#diple {
  @apply mx-3 w-2 max-w-fit;
}

.open {
  transform: rotate(90deg);
}

.active {
  color:white;
}

#right, #left {
  height: 100%;
  overflow: hidden;
}

#gists-content {
  height: 100%;
  overflow: hidden;
}

.error-message {
  color: red;
  font-size: 18px;
  margin: 20px;
  text-align: center;
}

@media (max-width: 1024px) {
  #gists-content {
    height: 100%;
    padding: 0px 25px;
    overflow: hidden;
  }
}

.section-arrow {
  transition: 0.1s;
}

#section-content #contacts {
  padding: 0px 25px;
}

</style>