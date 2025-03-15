<template>
  <div>
    <!-- Header -->
    <div class="header">
      <h1>欢迎来到我的博客</h1>
    </div>

    <!-- Search Box -->
    <div class="search-container">
      <input type="text" v-model="searchTerm" class="search-box" placeholder="搜索博客..." />
    </div>

    <div class="blog-directory">
      <div
          v-for="(blog, index) in filteredBlogs"
          :key="index"
          class="blog-entry"
      >
        <router-link :to="'/blog/' + blog.id">{{ blog.title }}</router-link>
        <p class="date">发布时间：{{ blog.date }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Mock blog data
const blogs = [
  { id: 1, title: 'WebSocket简单使用', date: '2025-03-13' },
  { id: 2, title: 'json格式介绍与使用', date: '2025-03-11' },
  { id: 3, title: 'Linux常用命令', date: '2025-02-10' },
  { id: 4, title: '注解小贴士', date: '2024-11-14' },
  { id: 5, title: '苍穹外卖bug汇总', date: '2024-10-20' },
  { id: 6, title: '全栈知识学习记录', date: '2024-11-12' },
  { id: 7, title: '快捷键与命令', date: '2024-11-12' },
];

const searchTerm = ref('');
// const router = useRouter();

const filteredBlogs = computed(() => {
  return blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 0;
}
.header {
  background-image: linear-gradient(-20deg, #2b5876 0%, #4e4376 100%);
  color: white;
  text-align: center;
  padding: 15px;
}
.search-container {
  text-align: center;
  margin-top: 20px;
}
.search-box {
  padding: 10px;
  width: 60%;
  max-width: 500px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}
.blog-directory {
  margin-top: 40px;
  padding: 20px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}
.blog-entry {
  padding: 10px;
  background-color: white;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
.blog-entry a {
  text-decoration: none;
  color: #333;
  font-size: 18px;
}
.blog-entry .date {
  font-size: 14px;
  color: #888;
}
</style>
