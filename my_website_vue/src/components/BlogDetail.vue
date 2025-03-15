<template>
  <div id="blogDetail">
<!--    返回按钮-->
    <div class="styled-wrapper">
      <button class="button" @click="pulldown">
        <div class="button-box">
      <span class="button-elem">
        <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            class="arrow-icon"
        >
          <path
              fill="black"
              d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
          ></path>
        </svg>
      </span>
          <span class="button-elem">
        <svg
            fill="black"
            viewBox="0 0  24 24"
            xmlns="http://www.w3.org/2000/svg"
            class="arrow-icon"
        >
          <path
              d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
          ></path>
        </svg>
      </span>
        </div>
      </button>
    </div>


    <div class="blog-box">
    <div class="markdown-body" v-html="content"></div>
    </div>

    <!--      返回按钮-->

    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { marked } from 'marked';

const router = useRouter();
const route = useRoute();
const content = ref('');

// 加载 Markdown 内容
const loadBlogContent = async (id) => {
  try {
    const response = await fetch(`/blogs/${id}.md`);
    const mdContent = await response.text();
    console.log("Markdown 原始内容:", mdContent);
    content.value = marked(mdContent); // 将 Markdown 转换为 HTML
    console.log("转换后的 HTML:", content.value);
  } catch (error) {
    console.error('Error loading markdown file:', error);
  }
};

// 进入页面时加载 Markdown
onMounted(() => {
  const blogId = route.params.id;
  if (blogId) {
    loadBlogContent(blogId);
  }
});

// 跳转到 `/BlogView`
const pulldown = () => {
  router.push('/BlogView');
};
</script>
<style scoped>
#blogDetail{
  position: relative;
}
.markdown-body{
  @import "@/assets/markdown.css"; /* 引入 Markdown 样式 */

}
/*返回按钮*/
.styled-wrapper{
  width: 76px;
  display: inline-block;
}
.styled-wrapper .button {
  display: block;
  position: relative;
  width: 76px;
  height: 76px;
  margin: 0;
  overflow: hidden;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  border: 0;
}

.styled-wrapper .button:before {
  content: "";
  position: absolute;
  border-radius: 50%;
  inset: 7px;
  border: 3px solid black; /* Update dynamically for light/dark mode */
  transition:
      opacity 0.4s cubic-bezier(0.77, 0, 0.175, 1) 80ms,
      transform 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) 80ms;
}

.styled-wrapper .button:after {
  content: "";
  position: absolute;
  border-radius: 50%;
  inset: 7px;
  border: 4px solid black;
  transform: scale(1.3);
  transition:
      opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
      transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: 0;
}

.styled-wrapper .button:hover:before,
.styled-wrapper .button:focus:before {
  opacity: 0;
  transform: scale(0.7);
  transition:
      opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
      transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.styled-wrapper .button:hover:after,
.styled-wrapper .button:focus:after {
  opacity: 1;
  transform: scale(1);
  transition:
      opacity 0.4s cubic-bezier(0.77, 0, 0.175, 1) 80ms,
      transform 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) 80ms;
}

.styled-wrapper .button-box {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
}

.styled-wrapper .button-elem {
  display: block;
  width: 30px;
  height: 30px;
  margin: 24px 18px 0 22px;
  transform: rotate(360deg);
  fill: #f0eeef;
}

.styled-wrapper .button:hover .button-box,
.styled-wrapper .button:focus .button-box {
  transition: 0.4s;
  transform: translateX(-69px);

}
</style>