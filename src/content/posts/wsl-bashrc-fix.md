---
author: 大橘官
pubDatetime: 2026-01-27T00:00:00+08:00
title: "Linux踩坑心得：WSL 环境变量重启丢失"
featured: false
draft: false
tags:
  - Linux
description: "• 症状：环境变量和 PATH 重启就没了 • 原因：.bash_profile 在捣乱，拦截了正常的加载流程 • 解决：rm ~/.bash_profile"
hideEditPost: true
---
![out.png](../../assets/blog/wsl-bashrc-fix-1.png)

我猜你在使用WSL（Windows的Linux子系统）也遇到过这种抓狂的情况：

```bash
pip install uvicorn
# WARNING: The script uvicorn is installed in '/home/xxx/.local/bin' which is not on PATH.
uvicorn --version
# bash: uvicorn: command not found
```

或者更气人的：

```bash
echo 'export ANTHROPIC_API_KEY="sk-ant-xxx"' >> ~/.bashrc
source ~/.bashrc
claude # Claude Code能用了
# 关掉终端，重新打开...
claude
# Error: ANTHROPIC_API_KEY environment variable not set
```

还有这种：

```bash
npm install -g create-react-app
create-react-app --version  # 4.0.3
# 第二天开机...
create-react-app my-app
# bash: create-react-app: command not found
```

你照着网上的教程改 `.bashrc`，`source` 一下确实能用，但一关终端就又回到解放前。

我也被这个问题折磨过，最后发现是个很蠢的原因。

---

## 真正的罪魁祸首

你可能试过把 `export PATH=...` 加到 `.bashrc` 里，也检查了 `.profile`，逻辑看起来都对，但重启终端后系统就是"失忆"。

问题出在 WSL 的启动方式上。WSL 终端通常以 Login Shell 模式启动，Linux 加载配置文件有个很霸道的优先级：

1. 先找 `~/.bash_profile`
2. 找不到才去找 `~/.profile`

这里有个坑：如果你的目录下有 `.bash_profile`（可能是某个软件自动创建的，或者你以前不小心建的），Linux 就只读它，然后直接停止，完全不管后面的 `.profile`。

Ubuntu 默认的 `.profile` 里有自动加载 `.bashrc` 的代码。所以一旦 `.bash_profile` 存在但没写好引导代码，你的 `.bashrc` 就彻底被忽略了。

## 解决办法：直接删掉那个文件

最简单的方法不是去修补，而是直接删掉 `.bash_profile`，让系统回到默认状态。

先检查一下有没有这个文件：

```bash
ls -a ~ | grep .bash_profile
```

如果有，直接删掉：

```bash
rm ~/.bash_profile
```

重启终端，问题解决。

Ubuntu 自带的 `.profile` 已经写得很完善了，它会自动把 `$HOME/.local/bin` 加入 PATH，也会自动加载 `.bashrc`。删掉那个捣乱的文件后，一切都正常了。

---

## 以后怎么配置环境变量

解决了加载问题，以后要添加环境变量就简单了，统一写在 `~/.bashrc` 里：

**重要：写在文件开头**
把 `export` 语句写在 `.bashrc` 的最前面，避免文件中间的代码（比如 pnpm 或 conda 初始化）出错导致后面的配置没执行到。

```bash
# ~/.bashrc

# 环境变量放最前面
export PATH="$PATH:/home/你的用户名/.local/bin"
export ANTHROPIC_API_KEY="sk-ant-你的密钥"
export OPENAI_API_KEY="sk-你的OpenAI密钥"

# 其他配置...
```

---

## 总结

- 症状：环境变量和 PATH 重启就没了
- 原因：`.bash_profile` 在捣乱，拦截了正常的加载流程
- 解决：`rm ~/.bash_profile`
- 预防：重要的环境变量写在 `.bashrc` 开头
