---
author: 大橘官
pubDatetime: 2026-02-03T00:00:00+08:00
title: "Ubuntu 全自动出海：Mihomo + TUN 模式保姆级教程"
featured: false
draft: false
tags:
  - Linux
description: "本文教你如何通过 SSH 密钥管理服务器，使用 SCP 传输配置，并将 Mihomo 内核配置为系统服务，开启 TUN 模式实现全自动全局代理。"
hideEditPost: true
---
> 以下是Gemini教我成功部署后的总结文档，方便我以后回顾。
> 开启Tun后，OpenClaw的搜索工具可以访问外网了。

请先阅读mihomo官方教程：[创建运行服务 - 虚空终端 Docs](https://wiki.metacubex.one/startup/service/)
备注：config.yaml是你订阅机场后会下载到的配置文件。

## 一、 本地魔法：配置 SSH 快捷登录云服务器

不要再手动输入长串的 IP 和密钥路径了。

1. 在本地电脑（Windows）打开 `C:\Users\<Your_User>\.ssh\config`。
2. 添加以下内容：

```yaml
Host my-server
    HostName <SERVER_IP>
    User root
    IdentityFile "<PATH_TO_YOUR_PEM_FILE>"
```

1. **效果：** 以后传文件只需 `scp file my-server:~`，登录只需 `ssh my-server`。

---

## 二、 搬运物资：使用 SCP 传输Mihomo和配置文件

在本地终端执行，将下载好的内核和配置文件推送到服务器。

```powershell
# 传输内核二进制文件
scp mihomo my-server:~/mihomo

# 传输配置文件
scp config.yaml my-server:/tmp/config.yaml
```

---

## 三、 阵地建设：安装与基础配置

登录服务器后（`ssh my-server`），开始部署。

### 1. 放置二进制文件，赋予权限

```bash
sudo mv ~/mihomo /usr/local/bin/mihomo
sudo chmod +x /usr/local/bin/mihomo
```

### 2. 准备配置目录，防止配置文件

```bash
sudo mkdir -p /etc/mihomo
sudo mv /tmp/config.yaml /etc/mihomo/config.yaml
```

### 3. 自动化下载 Geo 依赖

创建一个脚本 `setup_geo.sh` 并运行，确保分流规则生效：

```bash
#!/bin/bash
CONF_DIR="/etc/mihomo"
URL="https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest"
sudo wget -O $CONF_DIR/country.mmdb $URL/country.mmdb
sudo wget -O $CONF_DIR/geoip.dat $URL/geoip.dat
sudo wget -O $CONF_DIR/geosite.dat $URL/geosite.dat
```

---

## 四、 核心科技：开启 TUN 模式

编辑 `/etc/mihomo/config.yaml`，修改头部配置：

```yaml
# 流量接管核心
tun:
  enable: true
  stack: system
  auto-route: true            # 自动设置全局路由
  auto-detect-interface: true # 防止回环
  dns-hijack:
    - 'any:53'
```

> 注意： 必须开启 Linux 内核转发，否则 TUN 无法正常工作：

执行这两行

```bash
sudo sysctl -w net.ipv4.ip_forward=1
echo "net.ipv4.ip_forward=1" | sudo tee -a /etc/sysctl.conf
```

---

## 五、 守护进程：Systemd 服务化

让 Mihomo 像呼吸一样自然，开机自启，崩溃自愈。

1. 创建服务文件：`sudo nano /etc/systemd/system/mihomo.service`
2. 写入配置：

```yaml
[Unit]
Description=Mihomo Daemon
After=network.target

[Service]
Type=simple
User=root
ExecStart=/usr/local/bin/mihomo -d /etc/mihomo
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

1. **启动魔法：**Bash

```bash
sudo systemctl daemon-reload
sudo systemctl enable mihomo
sudo systemctl start mihomo
```

---

## 六、 验收成果：验证全局代理

不需要设置任何环境变量，直接测试：

1. **检查网卡：** `ip addr`（看到 `Meta` 或 `utun` 网卡即成功）。
2. **测试外网：** `curl -I https://www.google.com`。
