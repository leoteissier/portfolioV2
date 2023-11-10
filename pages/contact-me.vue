<script>
export default {
    data() {
        return {
            email: '',
            subject: '',
            message: '',
        }
    },
    setup() {
        const contact = useRuntimeConfig().dev.contacts

        return {
            contact
        }
    },
    methods: {
        open(elementId) {
            const element = document.getElementById(elementId);
            const arrow = element.querySelector('.arrow');
            const links = element.querySelector('#links');

            if (links.style.display === 'block') {
                links.style.display = 'none';
                arrow.style.transform = 'rotate(0deg)';
            } else {
                links.style.display = 'block';
                arrow.style.transform = 'rotate(90deg)';
            }
        }
    },
    mounted(){

        const subjectInput = document.getElementById('subject-input');
        const emailInput = document.getElementById('email-input');
        const messageInput = document.getElementById('message-input');

        subjectInput.addEventListener('input', (event) => {
            const subjectValue = document.getElementById('subject-value')
            subjectValue.innerHTML = event.target.value;
        })

        emailInput.addEventListener('input', (event) => {
            const emailValue = document.getElementById('email-value')
            emailValue.innerHTML = event.target.value;
        })

        messageInput.addEventListener('input', (event) => {
            const messageValue = document.getElementById('message-value')
            messageValue.innerHTML = event.target.value;
        })

        const links = document.getElementsByClassName('submenu');
        for (let i = 0; i < links.length; i++) {
            if(window.innerWidth > 1024){ 
                links[i].querySelector("#links").style.display = "block";
                links[i].querySelector(".arrow").style.transform = "rotate(90deg)";
            } else {
                links[i].querySelector("#links").style.display = "none";
            }
        }
    },
}
</script>

<template>
    <main id="contact-me" class="page">

        <div id="mobile-page-title">
            <h2>_contact-me</h2>
        </div>

        <div data-aos="fade-right" id="page-menu" class="w-full h-full flex flex-col border-right">

            <!-- contacts -->
            <div id="contacts" class="submenu">
                <div class="title" @click="open('contacts')">
                    <img class="arrow" src="/svg/arrow.svg">
                    <h3>
                        contacts
                    </h3>
                </div>
                <div id="links">
                    <div v-for="(source, key) in contact.direct.sources" :key="key" class="link">
                        <img v-if="key === 'email'" :src="'/svg/' + key + '.svg'" :alt="`icon email`">
                        <img v-else-if="key === 'phone'" :src="'/svg/' + key + '.svg'" :alt="`icon phone`">
                        <a v-if="key === 'email'" :href="'mailto:' + source" class="font-fira_retina text-menu-text hover:text-white truncate">{{ source }}</a>
                        <a v-else-if="key === 'phone'" :href="'tel:' + source" class="font-fira_retina text-menu-text hover:text-white truncate">{{ source }}</a>
                    </div>
                </div>
            </div>

            <!-- find me also in -->
<!--            <div id="find-me-in" class="submenu border-top">-->
<!--                <div class="title" @click="open('find-me-in')">-->
<!--                    <img class="arrow" src="/svg/arrow.svg">-->
<!--                    <h3>-->
<!--                        find-me-also-in-->
<!--                    </h3>-->
<!--                </div>-->
<!--                <div id="links">-->
<!--                    <div v-for="(source, key) in contact.find_me_also_in.sources" :key="key" class="link">-->
<!--                        <img src="/svg/link.svg">-->
<!--                        <a :href="source.url + source.user" class="font-fira_retina text-menu-text hover:text-white" target="_blank">{{ source.title }}</a>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->

        </div>
            
        <div class="flex flex-col w-full">

        <!-- windows tab -->
        <div class="tab-height w-full hidden lg:flex border-right border-bot items-center">

                <div data-aos="fade-left" class="flex items-center border-right h-full">
                    <p class="font-fira_regular text-menu-text text-sm px-3">contacts</p>
                    <img src="/svg/close.svg" alt="" class="m-3">
                </div>

            </div>

            <!-- main -->
            <div data-aos="fade-up" class="flex lg:grid lg:grid-cols-2 h-full w-full">
        
                <div id="left" class="h-full w-full flex flex-col border-right items-center">
                    
                    <ContactForm data-aos="fade-down" data-aos-delay="500" :email="email" :subject="subject" :message="message" />

                </div>

                <div id="right" class="h-full w-full hidden lg:flex">
                    
                    <div class="form-content">
                        <FormContentCode data-aos="fade-down" data-aos-delay="500" :email="email" :subject="subject" :message="message" />
                    </div>
                    <!-- scroll bar -->
                    <div id="scroll-bar" class="h-full border-left flex justify-center py-1">
                        <div id="scroll"></div>
                    </div>
                
                </div>
            </div>

        </div>
    </main>
</template>

<style>

.arrow {
    transition: 0.1s;
    margin-right: 10px;
    width: 9px;
    height: 9px;
}

.submenu {
    display: flex;
    flex-direction: column;
}

.submenu .title h3 {
    @apply font-fira_regular;
    color: white;
    font-size: 16px;
}

.link {
    display: flex;
    align-items: center;
    padding: 4px 25px;
}

.link img {
    width: 16px;
    height: 16px;
    margin-right: 10px;
}

#links {
    padding: 10px 0px;
}

.form-content {
    padding: 75px 50px 0px 75px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    font-size: 15px;
}
@media (min-width: 1024px) {
    
    .submenu .title {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #1E2D3D;
        padding: 0 25px;
        height: 35px;
    }
    .submenu .title:hover {
        cursor: pointer;
    }
    .submenu .title h3 {
        font-size: 14px;
    }
}

@media (max-width: 767px) {
  #mobile-page-title{
    margin: 10px 0;
  }
  .text-container p{
    padding-bottom: 300px;
  }
  #right{
    display: none;
  }
}

</style>