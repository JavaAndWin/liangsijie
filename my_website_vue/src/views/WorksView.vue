<template>
  <div id="worksview">
    <div class="portfolio-container">
      <h1 class="portfolio-title">我的项目</h1>
      
      <div class="portfolio-filter">
        <button 
          v-for="(category,index) in categories"
          :key="category.id"
          :class="{ active: activeCategory === category.id }"
          @click="filterProjects(category.id,index)"
        >
          {{ category.name }}
        </button>
        <div class="slider" :style="{ left: `${slidedistance * 110}px` }"></div>
      </div>
      
      <div class="projects-grid">
        <div 
          v-for="project in filteredProjects" 
          :key="project.id" 
          class="project-card"
          @click="showProjectDetails(project)"
        >
          <div class="project-image">
            <img :src="project.image" :alt="project.title">
          </div>
          <div class="project-info">
            <h3>{{ project.title }}</h3>
            <p class="project-category">{{ getCategoryName(project.categoryId) }}</p>
            <p class="project-description">{{ project.shortDescription }}</p>
          </div>
        </div>
      </div>
      
      <!-- 项目详情弹窗 -->
      <div v-if="selectedProject" class="project-modal-overlay" @click="closeProjectDetails">
        <div class="project-modal" @click.stop>
          <button class="close-button" @click="closeProjectDetails">×</button>
          <div class="modal-content">
            <div class="modal-image">
              <img :src="selectedProject.image" :alt="selectedProject.title">
            </div>
            <div class="modal-info">
              <h2>{{ selectedProject.title }}</h2>
              <p class="modal-category">{{ getCategoryName(selectedProject.categoryId) }}</p>
              <div class="modal-description">{{ selectedProject.fullDescription }}</div>
              
              <div class="project-details">
                <div class="detail-item">
                  <strong>完成日期:</strong> {{ selectedProject.completionDate }}
                </div>
                <div class="detail-item">
                  <strong>使用技术:</strong> {{ selectedProject.technologies.join(', ') }}
                </div>
                <div class="detail-item" v-if="selectedProject.link">
                  <strong>项目链接:</strong> 
                  <a :href="selectedProject.link" target="_blank">查看项目</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  // 项目分类
  const categories = ref([
    { id: 'all', name: '全部' },
    { id: 'web', name: '网站开发' },
    { id: 'tool', name: '小工具' }
  ]);
  
  // 项目数据
  const projects = ref([
    {
      id: 1,
      title: '苍穹外卖',
      categoryId: 'web',
      shortDescription: '没错，就是苍穹外卖',
      fullDescription: '非常丰富的java入门级项目，使用SpringBoot+Maven构建项目，结构清晰，适合练习框架的基本使用以及规范代码编写',
      image: '/images/sky.jpg',
      completionDate: '2024年11月',
      technologies: ['SpringBoot', 'SSM', 'MySQL', 'Redis', 'Nginx'],
      link: 'https://github.com/JavaAndWin/skyTakeOut'
    },
    {
      id: 2,
      title: '用户系统',
      categoryId: 'web',
      shortDescription: '前后端独立编写，支持用户注册、登录、用户管理，使用WebSocket实现交流中心',
      fullDescription: '前后端独立编写，支持用户注册、登录、用户管理，使用WebSocket实现交流中心',
      image: '/images/usercenter.jpg',
      completionDate: '2025年1月',
      technologies: ['SpringBoot', 'SSM', 'MySQL', 'WebSocket'],
      link: 'https://github.com/JavaAndWin/userCenter.git'
    },
    {
      id: 3,
      title: 'java爬虫',
      categoryId: 'tool',
      shortDescription: '使用Jsoup与JPA完成爬虫与持久化',
      fullDescription: '甜品项目，加强对java调用api连接数据库的认识和对网页元素的认识,其中附带了JBDC的持久化方式',
      image: '/images/crawl.jpg',
      completionDate: '2025年1月',
      technologies: ['Jsoup', 'JPA', 'MySQL','JDBC'],
      link: 'https://github.com/JavaAndWin/crawling'
    },
    {
      id: 4,
      title: 'TodoList',
      categoryId: 'tool',
      shortDescription: '网页待做清单，实现简单增删查改',
      fullDescription: '包含前后端的待做事项网页，功能有添加事项、勾选事项、删除事项，主要是vue3开发的前端+云开发平台的后端',
      image: '/images/todo.png',
      completionDate: '2024年11月',
      technologies: ['Vue','Node.js','云MongoDB','Axios'],
      link: 'https://github.com/JavaAndWin/TodoApp-web'
    },
    {
      id: 5,
      title: 'liangsijie项目',
      categoryId: 'web',
      shortDescription: '以自己的名字命名的项目，将会加入我学到的所有技术(这个网站也是其中的一部分哦)',
      fullDescription: '目前的思路是在技能储备库中设置展示环节，例如你可以将你的一段话存入MySQL展示环节，你可以在未来任何时候取出他，这样来证明我实现了MySQL的功能，并且我会把他的实现原理和代码贴在旁边，这只是个简单的例子，不过这样就用到了我加上去技术',
      image: '/images/all.jpg',
      completionDate: '未完成',
      technologies: ['Vue'],
      link: 'https://github.com/JavaAndWin/myWebsite.git'
    },
  ]);
  
  // 当前选中的分类
  const activeCategory = ref('all');
  
  // 根据分类筛选项目
  const filteredProjects = computed(() => {
    if (activeCategory.value === 'all') {
      return projects.value;
    }
    return projects.value.filter(project => project.categoryId === activeCategory.value);
  });
  
  // 获取分类名称
  const getCategoryName = (categoryId) => {
    const category = categories.value.find(cat => cat.id === categoryId);
    return category ? category.name : '';
  };
  
  // 筛选项目的方法
  const slidedistance = ref(0)
  const filterProjects = (categoryId,index) => {
    activeCategory.value = categoryId;
    //增加滑动动画
    slidedistance.value = index;
  };

  
  // 选中的项目（用于显示详情）
  const selectedProject = ref(null);
  
  // 显示项目详情
  const showProjectDetails = (project) => {
    selectedProject.value = project;
    // 阻止背景滚动
    document.body.style.overflow = 'hidden';
  };
  
  // 关闭项目详情
  const closeProjectDetails = () => {
    selectedProject.value = null;
    // 恢复背景滚动
    document.body.style.overflow = '';
  };
  </script>
  
  <style scoped>
  #worksview {
    background-image: linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%);

  }
  *{
    box-sizing: border-box;
  }
  .portfolio-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .portfolio-title {
    text-align: center;
    margin-bottom: 30px;
    margin-top: 6vw;
    color: #333;
    font-size: 32px;
  }
  
  .portfolio-filter {
    display: flex;
    justify-content: center;
    margin: 25px auto;
    border-radius: 20px;
    background-image: linear-gradient(-20deg, rgba(43, 88, 118, 0.21) 0%, rgba(78, 67, 118, 0.31) 100%);

    flex-wrap: wrap;
    gap: 20px;
    width: 310px;
    position: relative;
  }
  .portfolio-filter button {
    background-color: rgba(255,255,255,0);
    color:black;
    border: none;
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
    width: 90px;
    height: 32px;
    z-index: 3;
  }
  
  .portfolio-filter button:hover:not(.active) {
    background-image: linear-gradient(-20deg, rgb(138, 177, 205) 0%, rgb(179, 169, 214) 100%);

    z-index: 1;
  }
  
  .portfolio-filter button.active {
    color: white;
  }
  .slider {
    background-image: linear-gradient(-20deg, #2b5876 0%, #4e4376 100%);
    z-index: 2;
    position: absolute;
    width: 90px;
    height: 32px;
    border-radius: 20px;
    transition: left 0.3s ease-in-out;
  }
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 40px;
  }
  
  .project-card {
    background-image: linear-gradient(-20deg, #2b5876 0%, #4e4376 100%);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    margin-bottom: 3vw;
  }
  
  .project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
  
  .project-image {
    height: 200px;
    overflow: hidden;
  }
  
  .project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  .project-card:hover .project-image img {
    transform: scale(1.05);
  }
  
  .project-info {
    padding: 20px;
    color: white;
  }
  
  .project-info h3 {
    margin-top: 0;
    margin-bottom: 10px;
  }
  
  .project-category {
    color: #2575fc;
    font-size: 14px;
    margin-bottom: 10px;
  }
  
  .project-description {
    font-size: 14px;
    line-height: 1.5;
  }
  
  /* 项目详情弹窗样式 */
  .project-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 20px;
  }
  
  .project-modal {
    background-color: white;
    border-radius: 10px;
    max-width: 900px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
  }
  
  .close-button {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #333;
    z-index: 10;
  }
  
  .modal-content {
    display: flex;
    flex-direction: column;
  }
  
  .modal-image {
    width: 100%;
    height: 300px;
  }
  
  .modal-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .modal-info {
    padding: 25px;
  }
  
  .modal-info h2 {
    margin-top: 0;
    color: #333;
  }
  
  .modal-category {
    color: #2575fc;
    font-size: 16px;
    margin-bottom: 15px;
  }
  
  .modal-description {
    color: #555;
    line-height: 1.6;
    margin-bottom: 20px;
  }
  
  .project-details {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 5px;
  }
  
  .detail-item {
    margin-bottom: 10px;
  }
  
  .detail-item:last-child {
    margin-bottom: 0;
  }
  
  .detail-item a {
    color: #2575fc;
    text-decoration: none;
  }
  
  .detail-item a:hover {
    text-decoration: underline;
  }
  
  @media (min-width: 768px) {
    .modal-content {
      flex-direction: row;
    }
    
    .modal-image {
      width: 50%;
      height: auto;
    }
    
    .modal-info {
      width: 50%;
    }
  }
  
  @media (max-width: 767px) {
    .projects-grid {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
  }
  </style>