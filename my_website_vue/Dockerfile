
FROM nginx:alpine

# 复制构建好的前端文件到 Nginx 的默认网页目录
COPY ./dist /usr/share/nginx/html

# 复制自定义的 nginx 配置文件
COPY ./nginx.conf /etc/nginx/nginx.conf

# 开放 80 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
