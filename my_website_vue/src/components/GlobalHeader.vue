<template>
  <div id="GlobalHeader">
  <a-menu  id="menu" v-model:selectedKeys="current" mode="horizontal" :items="items" @click="handleMenuClick" @onTitleClick="handleMenuClick"/>
  </div>
</template>
<style>
#menu{
  font-size: 17px;
  height: 100%;
  margin-left: 10px;
  gap: 5px;
  scroll-behavior: smooth;
  overflow: hidden;
}
</style>
<script setup>
import {h, ref} from 'vue';
import {IdcardOutlined,AppstoreOutlined, ToolOutlined, BookOutlined} from '@ant-design/icons-vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const getSelectedKey = () => {
  const path = route.path;
  if (path === '/') return ['homeview'];
  if (path === '/worksview') return ['worksview'];
  if (path === '/skillsview') return ['skillsview'];
  if (path === '/BlogView') return ['BlogView'];
  return ['homeview']; // 默认选中个人简介
};
const current = ref(getSelectedKey());
const items = ref([
  {
    key: 'homeview',
    icon: () => h(IdcardOutlined),
    label: '个人简介',
    title: '介绍我的美',
  },
  {
    key: 'worksview',
    icon: () => h(AppstoreOutlined),
    label: '项目展示',
    title: '半拉磕几',
  },
  {
    key: 'skillsview',
    icon: () => h(ToolOutlined),
    label: '技能储备库',
    title: '快到碗里来',
    // children: [
    //   {
    //     type: 'group',
    //     label: '前端技术',
    //     children: [
    //       {
    //         label: 'Vue',
    //         key: 'skillvue',
    //       },
    //       {
    //         label: 'JavaScript',
    //         key: 'setting:2',
    //       },
    //     ],
    //   },
    //   {
    //     type: 'group',
    //     label: '数据库',
    //     children: [
    //       {
    //         label: 'MySQL',
    //         key: 'setting:3',
    //       },
    //       {
    //         label: 'Redis',
    //         key: 'setting:4',
    //       },
    //     ],
    //   },
    //   {
    //     type: 'group',
    //     label: '后端技术',
    //     children: [
    //       {
    //         label: 'SpringBoot',
    //         key: 'setting:5',
    //       },
    //       {
    //         label: 'SSM',
    //         key: 'setting:6',
    //       },
    //     ],
    //   },
    // ],
  },
  {
    icon: () => h(BookOutlined),
    key: 'BlogView',
    label: '个人博客',
    title: '瞎写瞎画',
  },
]);

const handleMenuClick = (e) => {
  const key = e.key;
  // 根据点击的菜单项进行路由跳转
  if (key === 'homeview') {
    router.push('/');
  } else if (key === 'worksview') {
    router.push('/worksview');
  } else if (key === 'skillsview') {
    router.push('/skillsview');
  } else if (key === 'BlogView') {
    router.push('/BlogView');
  }else{
    router.push('/skillvue');
  }
};
</script>