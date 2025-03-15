<template>
  <div id="BasicLayout">
    <a-layout>
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content>
        <router-view />
      </a-layout-content>
      <a-layout-footer v-show="showFooter" class="footer">
        <p>&copy;2025-2026</p>
        <div id="beian">
          <p>ICP备案号：</p>
          <a href="https://beian.miit.gov.cn"> 黔ICP备2025045716号</a>
        </div>

      </a-layout-footer>
    </a-layout>
  </div>
</template>
<style scoped>
#BasicLayout .footer {
  background: #ececec;
  text-align: center;
  font-size: 15px;
  bottom: 0;
  left: 0;
  right: 0;
  padding-top: 30px;
}

.header {
  background: #fff;
  padding-inline: 16px;
  height: auto;
  transition: height 5s ease;
}

#beian {
  display: flex;
  justify-content: center;
  font-size: 13px;
}

#beian a {
  color: black;
  cursor: pointer;
}

#beian p {
  margin-bottom: 0;
}
</style>
<script setup>
import GlobalHeader from "@/components/GlobalHeader.vue";
import {computed, watch,} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();

// 判断当前路径是否是 /skillsview，是的话隐藏页脚
const showFooter = computed(() => route.path !== "/skillsview");

//是/skillsview隐藏导航栏，禁止滚动
const hidden = (newValue) => {
  if (!newValue) {
    document.body.style.overflow = 'hidden';
    document.getElementsByClassName('header').item(0).style.height = '0';
  } else {
    document.body.style.overflow = '';
    document.getElementsByClassName('header').item(0).style.height = 'auto';
  }
}
watch(showFooter, hidden);

</script>