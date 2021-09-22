# RTOS AT 模块使用

## 连接 ESP8266

![](https://img.lziqi.top/img/ESP8266%E8%BF%9E%E6%8E%A5%E5%9B%BE.jpg)

这里使用的是小熊派的 ESP8266 开发模块，理论上使用单独的 ESP8266 模块也是可以使用的，只要是保证 ESP8266 的 VCC、GND、RX、TX 端口接线正确即可。

## 配置 at_device 软件包

![](https://img.lziqi.top/img/ESP8266%20at_device%E9%85%8D%E7%BD%AE.png)

在 RT-Thread Settings 的软件包中，搜索 at_device，找到并进行添加。如图勾选 ESP8266 并勾选使能示例。需要注意

- ESP8266 只支持 2.4G 连接，需要 wifi 打开 2.4G 模式
- WIFI SSID 为 WIFI 名称，需要为英文，中文会导致错误

这里我们通过查询小熊派官方文档得知，AT 模块连接部分是使用了 LPUART 端口,且是使用了 PC0 与 PC1 口，也就是低功耗的 UART 端口来与 AT 模块进行通信的，所以这里将客户端的设备名称设置为 lpuart1。

![](https://img.lziqi.top/img/%E5%B0%8F%E7%86%8A%E6%B4%BE%E9%80%9A%E4%BF%A1%E6%A8%A1%E5%9D%97%E6%8B%93%E5%B1%95%E7%AB%AF%E5%8F%A3%E9%80%9A%E4%BF%A1%E9%85%8D%E7%BD%AE.png)

## LPUART 口配置

同样在`drivers/board.h`中进行配置，详细配置方法可以参照上方的注释进行。上面查找小熊派文档可知，LPUART 口为 PC0 与 PC1，故进行以下配置。

![](https://img.lziqi.top/img/%E5%B0%8F%E7%86%8A%E6%B4%BELPUART%E5%8F%A3%E6%96%87%E6%A1%A3.png)

![](https://img.lziqi.top/img/RT-Thread%20LPUART%E5%8F%A3%E9%85%8D%E7%BD%AE.png)

## 测试联网

下载运行程序后，测试`ifconfig`与`ping`命令是否正确

QCOM 需要按照以下进行配置

![](https://img.lziqi.top/img/QCOM%E5%B0%8F%E7%86%8A%E6%B4%BE%E9%85%8D%E7%BD%AE%E5%9B%BE.png)

```sh
ifconfig

ping www.baidu.com
```
