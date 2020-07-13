# 基于 node 镜像
FROM node:13.7.0
# 指明镜像维护者
LABEL maintainer="hongsl"
# 设置环境内环境变量
ENV NODE_ENV=production
ENV HOST 0.0.0.0
# 可以先 git clone 或 pull 拉到最新代码后，安装依赖
# RUN git clone xxxxx
# RUN npm install
# 开启 3000 端口
EXPOSE 3000
# 新建工作目录
RUN mkdir -p /docker-image
# 把所有文件复制到目录（除了.dockerignore）
COPY . /docker-image
# 指定工作目录
WORKDIR /docker-image
# 国内环境使用，非国内环境使用会报错
# RUN npm config set registry https://registry.npm.taobao.org
RUN npm run build
CMD ["npm", "start"]

# docker build -t nuxt-demo .
# docker run --name=nuxt-demo -p 8888:3000 -dt nuxt-demo
