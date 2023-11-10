<template>
    <header id="navbar" class="w-full hidden lg:flex flex-col">
      <nav class="w-full flex justify-between border-bot">

          <div class="flex">
            <NuxtLink id="nav-logo" to="/">
              {{ config.dev.logo_name }}
            </NuxtLink>

            <NuxtLink class="nav-link" to="/" :class="{ active: isActive('/') }">
              _hello
              <span class="border-bottom"/>
            </NuxtLink>
  
            <NuxtLink class="nav-link" to="/about-me" :class="{ active: isActive('/about-me') }">
              _about-me
              <span class="border-bottom"/>
            </NuxtLink>
  
            <NuxtLink class="nav-link" to="/projects" :class="{ active: isActive('/projects') }">
              _projects
              <span class="border-bottom"/>
            </NuxtLink>
          </div>

          <NuxtLink id="nav-link-contact" to="/contact-me" :class="{ active: isActive('/contact-me')}">
            _contact-me
            <span class="border-bottom"/>
          </NuxtLink>
      
      </nav>

    </header>

</template>

<style>

.nav-link {
  border-right: 1px solid #1E2D3D;
  @apply text-menu-text font-fira_retina px-6 h-full flex items-center;
}

#nav-link-contact {
  border-left: 1px solid #1E2D3D;
  @apply text-menu-text font-fira_retina px-6 h-full flex items-center;
}

#nav-link:hover, #nav-link-contact:hover {
  background-color: #1e2d3d74;
  color: white;
}

#nav-logo {
  border-right: 1px solid #1E2D3D;
  @apply text-menu-text font-fira_retina px-6 h-full flex items-center;
}

#nav-logo:hover {
  background-color: #1e2d3d74;
  color: white;
}

#nav-link.router-link-active, #nav-link-contact.router-link-active {
  position: relative;
  color: white;
}

#nav-link.router-link-active .border-bottom,  #nav-link-contact.router-link-active .border-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #FEA55F;
  animation: transitionScale  0.5s ease-in-out;
}

@keyframes transitionScale  {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

#nav-logo.router-link-active {
  border-right: 1px solid #1E2D3D;
  border-bottom: none;
  @apply text-menu-text;
}

#navbar > nav {
  height: 45px;
  font-size: 13px;
}

</style>

<script>

export default {
  computed: {
    // Set active class to current page link
    isActive() {
      return route => this.$route.path === route;
    }
  },
  setup() {
    const config = useRuntimeConfig()

    return {
      config
    }
  },
};

</script>
