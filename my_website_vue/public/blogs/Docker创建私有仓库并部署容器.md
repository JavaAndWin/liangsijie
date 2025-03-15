

1.服务器安装Docker
2.拉取官方私有仓库镜像,这里无法拉取可将镜像源设置为https://hub.littlediary.cn
	docker pull registry:latest
3.创建一个专门存储镜像的目录
	mkdir -p registry/data && cd registry
4.运行镜像，创建容器并执行
	docker run -d --restart=always --name registry -p 5000:5000 -v ./data:/var/lib/registry registry:latest
	--restart=always，当容器停止服务会自动
	-p 5000:5000，端口号设置为5000，因为私有仓库暴露端口默认为5000
	-v ./data:/var/lib/registry，数据卷的挂载，将容器里的/var/lib/registry挂载到./data下，将镜像持久化
5.测试公网ip能否访问，浏览器访问http://私有仓库IP:5000/v2/\_catalog来查看仓库中所有镜像，此时没有镜像，所以出现{"repositories":[]}说明访问成功
6.更改https为http，docker推送默认是https，https->http不行，要保持一致，也可选择申请https的证书。注意这里是推送端和拉取端都要修改，更改客户端json文件（与之前修改镜像源是同一个文件），如果用命令是
	vim /etc/docker/daemon.json
	加入"insecure-registries":["服务器IP:5000"]
	重启docker和客户端
	systemctl daemon-reload && systemctl restart docker
7.给镜像打tag便于仓库管理，这里的vue-nginx是我部署前端的镜像名
	docker tag vue-nginx 服务器IP:5000/vue-nginx
	这样就得到了名为服务器IP:5000/vue-nginx的镜像，执行docker images会看到两个镜像同时存在，但他们拥有同一个镜像id是同一个镜像
7.推送镜像
	docker push 服务器IP:5000/vue-nginx
	这里若没有将docker设置为http，会看到
	![本地图片](/blogs/images/httpserror.jpg)
	推送成功后可以在仓库服务器上看到
	![本地图片](/blogs/images/pushimage.jpg)
	或者在浏览器上通过http://私有仓库IP:5000/v2/\_catalog来查看
	![本地图片](/blogs/images/webcatalog.jpg)
8.拉取镜像
	docker pull 服务器IP:5000/vue-nginx
