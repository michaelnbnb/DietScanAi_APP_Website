# DietScanAi 官方网站

这是DietScanAi iOS应用的官方网站，用于展示应用功能、工作原理和相关信息。网站支持英文和中文两种语言，采用响应式设计，适配各种设备尺寸。

## 功能特点

- 双语支持：英文和简体中文
- 响应式设计：适配桌面、平板和移动设备
- 主要内容区域：
  - 应用功能介绍
  - 工作原理说明
  - 常见问题解答
  - 博客文章展示

## 文件结构

```
├── index.html          # 网站主页
├── css/
│   └── styles.css      # 样式文件
├── js/
│   └── script.js       # JavaScript脚本
└── images/             # 图片资源文件夹
    └── README.md       # 图片说明文件
```

## 使用说明

### 本地预览

1. 克隆或下载此仓库到本地
2. 使用浏览器直接打开`index.html`文件即可预览网站

### 添加图片

请按照`images/README.md`中的说明添加必要的图片资源。

### 修改内容

- 网站文本内容可以直接在`index.html`文件中修改
- 样式可以在`css/styles.css`文件中调整
- 交互功能可以在`js/script.js`文件中修改

## 部署到GitHub Pages

1. 在GitHub上创建一个新仓库
2. 将此网站代码推送到该仓库
3. 在仓库设置中启用GitHub Pages功能
4. 选择部署分支（通常是`main`或`master`）
5. 如果需要使用自定义域名（如`DietScanAi.app`）：
   - 在DNS提供商处添加CNAME记录，指向`<your-username>.github.io`
   - 在仓库的GitHub Pages设置中添加自定义域名
   - 建议启用HTTPS

## 后台文章发布

要实现后台文章发布功能，可以考虑以下方案：

1. **简单方案**：手动更新HTML文件中的博客部分
2. **进阶方案**：
   - 使用静态站点生成器（如Jekyll、Hugo等）
   - 结合GitHub Actions实现自动构建和部署
   - 使用基于Git的CMS（如Netlify CMS、Forestry等）

## 语言切换

网站默认使用英文显示，用户可以通过导航栏中的语言切换按钮切换到中文。语言偏好会保存在浏览器的localStorage中。

## 浏览器兼容性

网站兼容所有现代浏览器，包括：
- Chrome
- Firefox
- Safari
- Edge

## 许可证

© 2024 DietScanAi. 保留所有权利。