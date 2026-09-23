---
author: 大橘官
pubDatetime: 2024-06-13T00:00:00+08:00
title: "GPT4o一次回答就写好导出网页文本的chrome插件"
featured: false
draft: false
tags:
  - AI
description: "本想简单尝试GPT4o指导编写Chrome插件的能力，结果一口气给我写好了。"
hideEditPost: true
---
## 我的提问

你是一个全球顶尖的程序员，请指导我完成一个chrome插件的代码编写。我想把在浏览器中打开的网页中的文章标题和正文摘取并导出为格式正确的markdown文档

## GPT的回答

制作一个Chrome插件来摘取网页中的文章标题和正文，并导出为Markdown文档，涉及几个关键步骤。下面是一个基本的实现方案：

1. **创建插件的基本文件结构**。
2. **编写**`**manifest.json**`**文件**。
3. **编写内容脚本来提取网页中的数据**。
4. **编写背景脚本或弹出脚本来处理导出逻辑**。
5. **将数据导出为Markdown文件**。

### 1. 创建基本文件结构

```
my-chrome-extension/
├── manifest.json
├── content.js
├── popup.html
├── popup.js
├── background.js
└── icon.png
```

### 2. 编写`manifest.json`

`manifest.json`是Chrome插件的配置文件，定义插件的基本信息和权限。

```json
{
  "manifest_version": 3,
  "name": "Article to Markdown",
  "version": "1.0",
  "description": "Extract article title and body and export as Markdown",
  "permissions": [
    "activeTab",
    "downloads"
  ],
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icon.png",
      "48": "icon.png",
      "128": "icon.png"
    }
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ]
}
```

### 3. 编写`content.js`来提取网页数据

`content.js`是注入到网页中的脚本，用于提取标题和正文。

```js
function getArticleData() {
  let title = document.querySelector('h1') ? document.querySelector('h1').innerText : document.title;
  let body = document.querySelector('article') ? document.querySelector('article').innerText : document.body.innerText;

  return { title, body };
}

// 监听来自background.js或popup.js的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "extractArticle") {
    let articleData = getArticleData();
    sendResponse(articleData);
  }
});
```

### 4. 编写`popup.html`和`popup.js`

`popup.html`定义了插件点击后的弹出页面，`popup.js`处理用户交互和导出逻辑。

**popup.html**

```html
<!DOCTYPE html>
<html>
<head>
  <title>Export Article</title>
  <style>
    body { width: 300px; padding: 10px; }
    button { width: 100%; padding: 10px; }
  </style>
</head>
<body>
  <h1>Export Article</h1>
  <button id="export">Export as Markdown</button>
  <script src="popup.js"></script>
</body>
</html>
```

**popup.js**

```js
document.getElementById('export').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "extractArticle" }, (response) => {
      if (response) {
        let markdown = `# ${response.title}\\n\\n${response.body}`;
        let blob = new Blob([markdown], { type: 'text/markdown' });
        let url = URL.createObjectURL(blob);

        chrome.downloads.download({
          url: url,
          filename: `${response.title}.md`
        });
      }
    });
  });
});
```

### 5. 编写`background.js`

如果需要后台脚本来管理长时间运行的任务，可以添加，但对于这个插件的基本功能，`popup.js`中的逻辑已经足够。

### 测试与调试

将插件的目录加载到Chrome中进行测试：

1. 打开Chrome扩展程序管理页面（`chrome://extensions/`）。
2. 启用开发者模式。
3. 点击“加载已解压的扩展程序”，选择你的插件目录。
4. 打开一个网页，点击插件图标，测试导出功能。

以上是一个基本的Chrome插件示例，提取网页中的标题和正文并导出为Markdown文档。
