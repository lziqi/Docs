# 安装构建 RT-Thread 开发环境

## 下载安装 RT-Thread 与 QCOM

跟着官网一步一步下载安装 RT-Thread Studio

[下载 - RT-Thread 物联网操作系统](https://www.rt-thread.org/page/download.html)

我们需要使用串口调试设备软件对嵌入式开发板进行调试。这里使用的是 QCOM_V1.0 软件。

![](https://img.lziqi.top/img/%E5%AE%89%E8%A3%85RT-Thread%E7%8E%AF%E5%A2%83-QCOM%E7%95%8C%E9%9D%A2.png)

如图我们可以看到 QCOM 软件的界面，主要的配置信息是 COM Port 与 Boudrate。

- COM Port 代表了嵌入式设备与使用电脑之间进行信息传输的 COM 端口为多少，这里使用 COM3 端口
- Boudrate 代表了进行信息传输时每秒的传输的比特数是多少，这里使用 115200

对所连接的开发板进行配置，打开设备管理器，如下进行配置，所使用的小熊派开发板可能默认的端口速率是 9600，需要调整修改成 115200。

![](https://img.lziqi.top/img/%E5%B0%8F%E7%86%8A%E6%B4%BE%E8%AE%BE%E5%A4%87%E7%AE%A1%E7%90%86%E7%AB%AF%E5%8F%A3%E9%80%9F%E7%8E%87%E8%AE%BE%E7%BD%AE.png)

## 新建项目

新建 RT-Thread 项目，这里采用的开发板为小熊派 STM32L431 开发板，同型号芯片采用的配置也是相同的。以下为小熊派开发板的实物图。

如图进行项目的配置新建。这里使用的芯片为 STM32L4 低功耗系列芯片，全程为 STM32L431RCTx，调试器选择 ST-LINK 调试器，发送与接受引脚默认为 PA9 与 PA10 无需更改。

![](https://img.lziqi.top/img/%E6%96%B0%E5%BB%BART-Thread%E9%A1%B9%E7%9B%AE%E9%85%8D%E7%BD%AE.png)

新建完项目后，可以看到一大堆的文件夹，以下大致介绍主要的文件夹的用途

- application

用户文件夹，主要用于防止用户所编写的代码

- libraries

相关芯片的支持包文件夹，一般不对其进行修改

- drivers

一般用于放置与硬件相交互的一些配置，例如`drivers/board.h`放置了 USART 等通信口的配置

- packages

在勾选了其他外部包后会生成 packages 文件夹，放置其他的外部包，例如 at_device，使用 at 组件的包

- rt-thread

顾名思义，放置 rt-thread 操作系统的文件，例如采用以上配置产生的 115200 比特率配置文件就存放于`rt-thread/components/include/drivers/serial.h`的第 83 行`BAUD_RATE_115200`中

---

新建完项目后，连接好开发板，使用 QCOM 工具，点击主页面的 Open Port，成功或失败会在下方输出栏进行显示。

回到 RT-Thread Stuido，点击构建，对代码进行构建，再点击下载程序，将构建完成的执行文件下载到开发板中，此时可以看到 QCOM 页面会进行 RT-Thread 操作系统启动的输出。
