
<script>
import hljsVuePlugin from "@highlightjs/vue-plugin";
import 'highlight.js/lib/common';
import axios from "axios";

export default {
  name: 'GistSnippet',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data(){
    return {
      gist: null,
      monthsAgo: null,
      content: null,
      language: null,
      dataFetched: false,
      comment: null,
      stared: false
    }
  },
  mounted() {
    if (!this.dataFetched) {
      this.fetchData()
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(`https://api.github.com/gists/${this.id}`);
        const gist = response.data;
        await this.setValues(gist);
      } catch (error) {
        console.error(error);
      }
    },
    async starGist(gistId) {
      try {
        // await axios.put(`https://api.github.com/gists/${gistId}/star`, null, {
        //   headers: {
        //     // Authorization: "Bearer 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",
        //     Authorization: `Bearer ${process.env.GITHUB_TOKEN}}}`
        //   },
        // });
        this.stared = true;
      } catch (error) {
        // console.error("An error occurred while starring the gist:", error);
      }
    },
    async unstarGist(gistId) {
      try {
        // await axios.delete(`https://api.github.com/gists/${gistId}/star`, {
        //   headers: {
        //     // Authorization: "Bearer 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",
        //     Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
        //   },
        // });
        this.stared = false;
      } catch (error) {
        // console.error("An error occurred while unstarring the gist:", error);
      }
    },
    async setComments(comments_url) {
      try {
        const response = await axios.get(comments_url);
        const data = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async setValues(gist) {
      this.gist = gist
      this.monthsAgo = this.setMonths(gist.created_at)
      this.content = this.setSnippet(gist)
      this.language = Object.values(gist.files)[0].language
      this.dataFetched = true
      this.comment = await this.setComments(gist.comments_url)
    },
    setMonths(date) {
      let now = new Date()
      let gistDate = new Date(date)
      let diff = now.getTime() - gistDate.getTime()
      let days = Math.floor(diff / (1000 * 3600 * 24))
      return Math.floor(days / 30)
    },
    setSnippet(gist) {
      return Object.values(gist.files)[0].content
    },
    showComment(id) {
      let comment = document.getElementById('comment' + id)
      comment.classList.toggle('hidden')
    },

  },
  components: {
    highlightjs: hljsVuePlugin.component
  }
}
</script>

<template>
    <div class="gist mb-5" v-if="dataFetched">
        
        <!-- head info -->
        <div class="flex justify-between my-2">

            <div class="flex">
                <!-- avatar -->
                <img :src="gist.owner.avatar_url" alt="" class="w-8 h-8 rounded-full mr-2">
    
                <!-- username & gist date info -->
                <div class="flex flex-col">
                    <a id="username" :href="'https://github.com/' + gist.owner.login" target="_blank" class="font-fira_bold text-purple-text text-xs pb-1 hover:cursor-pointer">
                        @{{ gist.owner.login }}
                    </a>
                    <p class="font-fira_retina text-xs text-menu-text">Created {{ monthsAgo }} months ago</p>
                </div>
            </div>

            <!-- details and stars -->
            <div class="flex text-menu-text font-fira_retina text-xs justify-self-end lg:mx-2">
                <div class="flex lg:mx-2">
                    <img src="/svg/gist/comments.svg" alt="" class="w-4 h-4 mr-2">
                    <span class="hover:cursor-pointer hover:text-white" @click="showComment(gist.id)">details</span>
                </div>
                <div class="hidden lg:flex">
                    <img v-if="!stared" src="/svg/gist/star-line.svg" alt="" class="w-4 h-4 mx-2">
                    <img v-else src="/svg/gist/star-fill.svg" alt="" class="w-4 h-4 mx-2">
                    <span v-if="!stared" class="hover:cursor-pointer hover:text-white" @click="starGist(gist.id)">stars</span>
                    <span v-else class="hover:cursor-pointer hover:text-white" @click="unstarGist(gist.id)">stars</span>
                </div>
            </div>
            
        </div>

        <highlightjs class="snippet-container" :code="content"/>
        <div :id="'comment' + gist.id" class="flex hidden justify-between text-menu-text font-fira_retina mt-4 pt-4 border-top">
            <p id="comment" v-if="comment" class="w-5/6">{{ comment }}</p>
            <p v-else class="w-5/6">No comments.</p>
            <img src="/svg/close.svg" alt="" class="hover:cursor-pointer" @click="showComment(gist.id)">
        </div>
    </div>
</template>

<style>
.snippet-container {
    background-color: #011221;
    padding: 5px;
    border-radius: 15px;
    border: 1px solid #1E2D3D;
    font-size: 12px;
    overflow-y: scroll;
    overflow-x: scroll;
    max-height: 220px;
}

.snippet-container pre {
    margin: 0;
    overflow: hidden;
    width: 100%;
    max-height: 220px;
}

.snippet-container code {
    white-space: pre-wrap;
    max-height: 220px;
    width: max-content;
    overflow: hidden;

}

.snippet-container::-webkit-scrollbar {
    display: none;  /* Safari and Chrome */
}

pre code.hljs{
    display:block;
    /* overflow-x:auto; */
    padding:1.5em
}

code.hljs{
    padding:3px 5px
}

#comment {
    font-size: 14px;
}

#username:hover {
    color: #5e6ef2;
}

/* #comment {
    
} */

.hljs{color:#607B96;background:#011221}.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_{color:#ff7b72}.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:#d2a8ff}.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable{color:#79c0ff}.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#a5d6ff}.hljs-built_in,.hljs-symbol{color:#ffa657}.hljs-code,.hljs-comment,.hljs-formula{color:#8b949e}.hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag{color:#7ee787}.hljs-subst{color:#c9d1d9}.hljs-section{color:#1f6feb;font-weight:700}.hljs-bullet{color:#f2cc60}.hljs-emphasis{color:#c9d1d9;font-style:italic}.hljs-strong{color:#c9d1d9;font-weight:700}.hljs-addition{color:#aff5b4;background-color:#033a16}.hljs-deletion{color:#ffdcd7;background-color:#67060c}

</style>