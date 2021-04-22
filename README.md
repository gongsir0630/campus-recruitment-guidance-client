<h1 align="center">柚子帮-校招指导服务平台</h1>
<p align="center">微信小程序端</p>

## 前言
这里是我的本科毕业设计,建设一个方便、快捷、能有效联系在校毕业生和已就业师兄师姐的在线校招指导服务平台——『柚子帮』，并完成系统的设计与开发.平台致力于为西柚学子提供校招指导服务，提高毕业生在校招季的求职效率。

整个平台包含`微信小程序端`和`web管理端`两部分,项目开发采用前后端分离,这里是微信小程序端项目工程,基于 `Uni-app` 搭建,使用 Vue 开发.

涉及的技术栈：
* Vue.js -> 前端开发框架
* Uni-app -> 快应用开发，快速生成 mp-weixin
* ColorUI -> UI库
* [axios-miniprogram](https://github.com/fluffff/axios-miniprogram#readme) -> 网络请求
* Vuex -> 状态管理

## 使用
### 后端API：[点击前往部署](https://github.com/gongsir0630/campus-recruitment-guidance)
### Clone This Project
```shell
git clone https://github.com/gongsir0630/campus-recruitment-guidance-miniapp.git
```
### Install Dependency
```shell
npm install
or
yarn install
```
### Compiles and hot-reloads for development
```shell
npm run dev:mp-weixin
or
yarn dev:mp-weixin
```
### Compiles and minifies for production
```shell
npm run build:mp-weixin
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 感谢
个人主攻 Java 后端研发领域，第一次真正意义上的做前端开发，一边学习一边推项目进度。特别感谢以下同学的指导和帮助：
* [SWPU-计算机2017-阿墨墨墨](https://github.com/Irisssr)
* [SWPU-计算机 2017-sugar](https://github.com/ATQQ)
