<template>
  <div id="homeview">
    <div class="profile-container">
      <div class="profile-header">
        <div class="avatar">
          <!-- 使用一个占位图像，实际使用时替换为您的照片 -->
          <img src="/images/lsj.jpg" alt="个人头像"/>
        </div>
        <div class="name-title">
          <h1>梁思杰</h1>
          <h2>Java开发工程师</h2>
        </div>
      </div>

      <div class="profile-section">
        <h3>个人介绍</h3>
        <p id="pText">
          您好！我是一名热爱技术的Java开发工程师，拥有0年的开发经验。虽然现在没有经验，但以这个网站立志，我将不停进步。我擅长使用SpringBoot前端框架、Vue前端框架构建用户友好的web应用。
          我注重代码质量和用户体验，追求编写高效、可维护的代码。在业余时间，我喜欢研究新技术,想把每个技术都做到自己项目里，满足收集癖好。
        </p>
      </div>

      <div class="profile-section">
        <h3>技能专长</h3>
        <div class="skills-container">
          <div class="skill-item" v-for="(skill, index) in skills" :key="index">
            <div class="skill-name">{{ skill.name }}</div>
            <div class="skill-bar">
              <div class="skill-level" :style="{ width: skill.level + '%' }"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="profile-section">
        <h3>工作经历</h3>
        <div class="experience-item" v-for="(job, index) in workExperience" :key="index">
          <div class="experience-period">{{ job.period }}</div>
          <div class="experience-details">
            <h4>{{ job.company }}</h4>
            <div class="job-title">{{ job.title }}</div>
            <p>{{ job.description }}</p>
          </div>
        </div>
      </div>

      <div class="profile-section">
        <h3>联系方式</h3>
        <div class="contact-container">
          <div class="contact-info">
            <div class="contact-item">
              <span class="contact-label">邮箱：</span>
              <img src="/images/email.jpg" alt="邮箱" class="contact-value"/>
            </div>
            <div class="contact-item">
              <span class="contact-label">电话：</span>
              <img src="/images/phone.jpg" alt="电话" id="phone"/>
            </div>
          </div>
          <div id="githubcontainer">
            <button @click="togithub" class="learn-more">
                <span class="circle" aria-hidden="true">
                  <span class="icon arrow"></span>
                </span>
              <span class="button-text">Visit GitHub</span>
            </button>

          </div>
          <a class="download" href="/primary.pdf" download="梁思杰-18255142616.pdf">简历下载</a>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';


const togithub = () => {
  window.open("https://github.com/JavaAndWin");
}
/*const download =()=>{
  const link = document.createElement('a');
}*/
// 技能数据
const skills = ref([
  {name: 'SpringBoot', level: 85},
  {name: 'SSM', level: 80},
  {name: 'MySQL', level: 85},
  {name: 'Redis', level: 70},
  {name: 'Vue', level: 70},
  {name: 'Nginx', level: 60}
]);

// 工作经历数据
const workExperience = ref([
  {
    period: '2023年10月 - 2024年6月',
    company: '贵州省黔南州生态环境局都匀分局',
    title: '文员',
    description: '承担会议布置、整理文书图表、与其他单位对接工作、现场核查验收等工作'
  },
  {
    period: '2024年7月 - 2025年2月',
    company: '中铁二十四局集团西南公司',
    title: '技术员',
    description: '担当技术员完成工序报检、材料调度、方案编写、整改回复、数据统计等工作'
  },
]);
</script>

<style scoped>
button {
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: 0;
  vertical-align: middle;
  text-decoration: none;
  background: transparent;
  padding: 0;
  font-size: inherit;
  font-family: inherit;
}

button.learn-more {
  width: 12rem;
  height: auto;
}

button.learn-more .circle {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  position: relative;
  display: block;
  margin: 0;
  width: 3rem;
  height: 3rem;
  background-image: linear-gradient(to right, #434343 0%, black 100%);
  border-radius: 1.625rem;
}

button.learn-more .circle .icon {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  background: #fff;
}

button.learn-more .circle .icon.arrow {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  left: 0.625rem;
  width: 1.125rem;
  height: 0.125rem;
  background: none;
}

button.learn-more .circle .icon.arrow::before {
  position: absolute;
  content: "";
  top: -0.29rem;
  right: 0.0625rem;
  width: 0.625rem;
  height: 0.625rem;
  border-top: 0.125rem solid #fff;
  border-right: 0.125rem solid #fff;
  transform: rotate(45deg);
}

button.learn-more .button-text {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.75rem 0;
  margin: 0 0 0 1.85rem;
  color: #282936;
  font-weight: 700;
  line-height: 1.6;
  text-align: center;
  text-transform: uppercase;
}

button:hover .circle {
  width: 100%;
}

button:hover .circle .icon.arrow {
  background: #fff;
  transform: translate(1rem, 0);
}

button:hover .button-text {
  color: #fff;
}

.skill-level {
  height: 100%;
  background-image: linear-gradient(-20deg, #2b5876 0%, #4e4376 100%);
  border-radius: 5px;
}


#githubcontainer {
  display: grid;
  align-items: center;
  height: auto;
  flex: 1;
}

.download {
  flex: 1;
  justify-content: center;
  line-height: 4.6;
}

.profile-header {
  display: flex;
  align-items: center;
  padding: 30px;
  background-image: linear-gradient(-20deg, #2b5876 0%, #4e4376 100%);
  color: white;
}

#homeview {
  background-image: linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%);
}

.contact-container {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.contact-info {
  flex: 1;
}


.contact-value {
  width: auto;
  height: 18px;
}


#phone {
  width: auto;
  height: 15px;
  margin-bottom: 3px;
}

#pText {
  font-size: 17px;
  line-height: 26px;
}

.profile-container {
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}


.avatar img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid white;
  object-fit: cover;
}

.name-title {
  margin-left: 30px;
}

.name-title h1 {
  margin: 0;
  font-size: 28px;
}

.name-title h2 {
  margin: 5px 0 0;
  font-size: 18px;
  font-weight: normal;
  opacity: 0.9;
}

.profile-section {
  display: grid;
  padding: 25px 30px;
  border-bottom: 1px solid #eee;
}

.profile-section:last-child {
  border-bottom: none;
}

.profile-section h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #2575fc;
  font-size: 20px;
}

.skills-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.skill-item {
  margin-bottom: 15px;
}

.skill-name {
  margin-bottom: 5px;
  font-weight: bold;
}

.skill-bar {
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
}


.experience-item {
  display: flex;
  margin-bottom: 25px;
}

.experience-item:last-child {
  margin-bottom: 0;
}

.experience-period {
  min-width: 120px;
  font-weight: bold;
  color: #666;
}

.experience-details h4 {
  margin: 0 5px 5px;
  color: #333;
}

.experience-details p {
  margin: 0 5px 0;
  color: #333;
}

.job-title {
  color: #666;
  margin-bottom: 5px;
  margin-left: 5px;
  font-style: italic;
}

.contact-item {
  margin-bottom: 10px;
  margin-top: 10px;
  width: auto;
}

.contact-label {
  font-weight: bold;
  margin-right: 10px;
  margin-top: 5px;
  color: #666;
}

@media (max-width: 600px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
  }

  .name-title {
    margin-left: 0;
    margin-top: 15px;
  }

  .experience-item {
    flex-direction: column;
  }

  .experience-period {
    margin-bottom: 5px;
  }
}
</style>