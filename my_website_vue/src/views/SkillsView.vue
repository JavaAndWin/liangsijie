<template>
  <div id="skillvue">
    <div class="skillBox">
      <canvas ref="canvasRef" class="photobox"></canvas>
<!--      提示卡片-->
      <div class="notifications-container">
        <div class="alert">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 alert-svg">
                <path clip-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" fill-rule="evenodd"></path>
              </svg>
            </div>
            <div class="alert-prompt-wrap">
              <p class="text-sm text-yellow-700">
               <br>详 细 页 面 暂 未 开 发
              </p>
            </div>
          </div>
        </div>
      </div>


<!--      返回按钮-->
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
    </div>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from 'vue';

const pulldown = () => {
  document.getElementsByClassName('header').item(0).style.height = 'auto';
  document.getElementsByClassName("styled-wrapper").item(0).style.display = "none";
  // document.getElementsByClassName('notifications-container').item(0).style.bottom='20px';
}
const canvasRef = ref(null);
let canvas, content;

const photobox = {
  img_total: 10,
  row_max: 5,
  line_max: 2,
  img_width: Math.floor(700 / 2),
  img_height: Math.floor(1000 / 2),
  img_margin: 200,
  total_width: 0,
  total_height: 0,
  img_data: [],
  if_movable: false,

  init() {
    if (!canvasRef.value) return;
    canvas = canvasRef.value;
    content = canvas.getContext('2d');

    this.total_width = this.row_max * (this.img_width + this.img_margin) - this.img_margin;
    this.total_height = this.line_max * (this.img_height + this.img_margin) - this.img_margin;
    this.resize();
    this.createEvents();
    this.createImgData();
  },

  resize() {
    if (!canvas) return;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    if (this.img_data.length) this.moveImgs(0, 0);
  },

  createImgData() {
    this.img_data = [];
    for (let i = 0; i < this.img_total; i++) {
      let img = new Image();
      img.src = `/photos/photo (${i + 1}).png`;
      img.onload = () => {
        let col_index = i % this.row_max;
        let line_index = Math.floor(i / this.row_max);
        let x = col_index * (this.img_width + this.img_margin);
        let y = line_index * (this.img_height + this.img_margin);
        this.img_data.push({img, x, y});
        content.drawImage(img, x, y, this.img_width, this.img_height);
      };
    }
  },

  createEvents() {
    /*电脑端监听*/
    window.addEventListener('resize', this.resize.bind(this));
    canvas.addEventListener('mousedown', () => {
      this.if_movable = true;
    });
    canvas.addEventListener('mouseup', (e) => {
      this.if_movable = false;
      this.checkImg(e.x, e.y);
    });
    canvas.addEventListener('mouseleave', () => {
      this.if_movable = false;
    });
    canvas.addEventListener('mousemove', (e) => {
      if (this.if_movable) this.moveImgs(e.movementX, e.movementY);
    });

    /*移动端监听*/
    canvas.addEventListener('touchstart', (e) => {
      this.if_movable = true;
      if (e.touches.length > 0) {
        this.lastX = e.touches[0].clientX;
        this.lastY = e.touches[0].clientY;
      }
    });

    canvas.addEventListener('touchend', () => {
      this.if_movable = false;
    });

    canvas.addEventListener('touchcancel', () => {
      this.if_movable = false;
    });

    canvas.addEventListener('touchmove', (e) => {
      if (this.if_movable && e.touches.length > 0) {
        e.preventDefault(); // 禁止页面滚动
        const touch = e.touches[0];
        const deltaX = touch.clientX - this.lastX;
        const deltaY = touch.clientY - this.lastY;
        this.moveImgs(deltaX, deltaY);
        this.lastX = touch.clientX;
        this.lastY = touch.clientY;
      }
    }, { passive: false });
  },

  moveImgs(x, y) {
    content.clearRect(0, 0, canvas.width, canvas.height);
    this.img_data.forEach((img) => {
      img.x += x;
      if (img.x > (this.total_width - this.img_width)) img.x -= this.total_width + this.img_margin;
      if (img.x < -this.img_width) img.x += this.total_width + this.img_margin;
      img.y += y;
      if (img.y > (this.total_height - this.img_height)) img.y -= this.total_height + this.img_margin;
      if (img.y < -this.img_height) img.y += this.total_height + this.img_margin;
      content.drawImage(img.img, img.x, img.y, this.img_width, this.img_height);
    });
  },

  checkImg(x, y) {
    let img = this.img_data.find(img => x >= img.x && x < img.x + this.img_width && y >= img.y && y < img.y + this.img_height);
    if (img) console.log(img, img.img);
  }
};

onMounted(() => {
  photobox.init();
});

onUnmounted(() => {
  window.removeEventListener('resize', photobox.resize);
});


</script>


<style>
/*提示卡片*/
.notifications-container {
  width: 320px;
  height: auto;
  font-size: 0.975rem;
  line-height: 1.05rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: fixed;
  right: 0;
  bottom: 30px;
  transition: bottom 0.3s ease-in-out;
}

.flex {
  display: flex;
  height: 50px;
}

.flex-shrink-0 {
  flex-shrink: 0;
  z-index: 5;
}

.alert {
  background-color: rgb(254 252 232);
  border-left-width: 4px;
  border-color: rgb(250 204 21);
  border-radius: 0.375rem;
  padding: 1rem;
  z-index: 5;
  width: 240px;
}

.alert-svg {
  height: 1.25rem;
  width: 1.25rem;
  color: rgb(250 204 21);
  z-index: 5;
  margin-top: 15px;
}

.alert-prompt-wrap {
  margin-left: 0.75rem;
  color: rgb(202 138 4);
  z-index: 5;
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


#skillvue {
  margin: 0;
  padding: 0;
  position: relative;
}

.skillBox {
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(-20deg, #2b5876 0%, #4e4376 100%);
  overflow: hidden;
  z-index: 0;
}

.photobox {
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  z-index: 0;
}
</style>
