<template>
    <footer class='flex md:justify-between border-top text-menu-text font-fira_retina'>

        <!-- social icons -->
        <div class="w-full flex justify-between md:justify-start">
            <span id="social-title" class="h-full flex justify-center items-center border-right px-6">
                find me in:
            </span>
            <div id="social-icons" class="flex">
                <NuxtLink :to="social.linkedin.url + '/' + social.linkedin.user" target="_blank" class="flex justify-center items-center linkedin-link">
                    <img src="/svg/social/linkedin.svg" alt="linkedin icon"/>
                </NuxtLink>
                <NuxtLink :to="social.github.url + '/' + social.github.user" target="_blank" class="flex justify-center items-center github-link">
                    <img src="/svg/social/github.svg" alt="github icon"/>
                </NuxtLink>
            </div>
        </div>

        <!-- github user -->
        <NuxtLink :to="social.github.url + '/' + social.github.user" target="_blank" class="hidden md:flex items-center px-6 border-left">
            @{{ social.github.user }}
            <img src="/svg/social/github.svg" alt="github icon"/>
        </NuxtLink>

    </footer>
</template>

<style>

footer {
    height: 40px;
    min-height: 40px;
    font-size: 13px;
}

footer a:hover {
    background-color: #1e2d3d74;
}

#social-icons > a {
    border-right: 1px solid #1E2D3D;
    height: 100%;
    width: 50px;
 }

#social-icons > a > img {
    width: 1.25rem; /* 20px */
    height: 1.25rem; /* 20px */
    margin: auto;
    opacity: 0.4;
}

footer > a > img {
    width: 1.25rem; /* 20px */
    height: 1.25rem; /* 20px */
    margin-left: 0.5rem; /* 8px */
  }

#social-icons > a:hover img {
    opacity: 1;
}

.linkedin-link{
  display: flex;
}

.github-link{
  display: none;
}

@media (max-width: 768px) {

    #social-title {
        border-right: none;
    }

    #social-icons > a {
        border-right: none;
        border-left: 1px solid #1E2D3D;
    }

    #social-icons > a > img {
        width: 1.5rem; /* 20px */
        height: 1.5rem; /* 20px */
  }

  .linkedin-link{
    display: none;
  }

  .github-link{
    display: flex;
  }

}

</style>

<script>
export default {
    name: 'AppFooter',
    data() {
        return {
          route: this.$route.path,
        }
    },
    setup() {
        return {
            social: useRuntimeConfig().dev.contacts.social
        }
    },
}
</script>
