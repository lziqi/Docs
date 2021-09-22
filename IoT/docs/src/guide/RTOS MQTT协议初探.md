# RTOS MQTT 协议初探

## 配置 AT 模块

MQTT 是架设在 TCP 协议上的网络协议，所以需要使用到网络功能，按上一章的 AT 模块进行配置相关网络功能。

## 添加 Paho-MQTT 包

添加 Paho-MQTT 包，勾选使能 MQTT 示例

## 使用 docker 搭建 HiveMQ

```sh
docker run -d --name hivemq -p 1883:1883 -p 8080:8080 hivemq/hivemq4
```

## 使用 MQTTX 工具订阅

如图，建立与服务器的连接，主要需要注意的是 ip 与端口配置正确，username 与 password 部分可以暂时随意进行填写。

![](https://img.lziqi.top/img/MQTTX%E5%BB%BA%E7%AB%8B%E6%96%B0%E7%9A%84%E8%BF%9E%E6%8E%A5.png)

建立名为`sensor/1`的新的 Topic，后面使用我们的开发板向这个 Topic 进行发送消息，利用 MQTTX 进行接受显示。

![](https://img.lziqi.top/img/MQTTX%E5%BB%BA%E7%AB%8B%E6%96%B0%E7%9A%84Topic.png)

## 使用 MQTT 命令行运行 Demo

需要注意的是，默认的`packages/pahomqtt-v1.1.0/samples/mqtt_sample.c`的示例服务器出现问题，请修改为

```c
#define MQTT_URI                "tcp://test.mosquitto.org:1883"
#define MQTT_SUBTOPIC           "/mqtt/test"
#define MQTT_PUBTOPIC           "/mqtt/test"
#define MQTT_WILLMSG            "Goodbye!"
```

修改完成后，可以直接编译运行，可以看到相应的`pahomqtt`初始化输出。

## 发送 MQTT 消息到服务器

由于是需要连接到我们自己的服务器，所以需要对`packages/pahomqtt-v1.1.0/samples/mqtt_sample.c`进行如下的修改。username 与 password 依然可以暂时随意进行填写，Topic 对应与上面一样设置为`sensor/1`。

```c
#define MQTT_URI                "tcp://ip:1883"
#define MQTT_USERNAME           "admin1"
#define MQTT_PASSWORD           ""
#define MQTT_SUBTOPIC           "sensor/1"
#define MQTT_PUBTOPIC           "sensor/1"
#define MQTT_WILLMSG            "Goodbye!"
```

打开`packages/pahomqtt-v1.1.0/samples/mqtt_sample.c`，我们可以看到在 c 文件的最下方将`mqtt_Start`、`mqtt_stop`、`mqtt_publish`、`mqtt_subscribe`、`mqtt_unsubscribe`命令加入了。

首先利用 MQTTX 连接服务器，并对`sensor/1`这个 Topic 保持订阅。

构建并下载程序，在命令行中依次输入以下命令

```sh
# 启动mqtt
mqtt_start

# 发布hello-rtthread消息
mqtt_publish sensor/1 hello-rtthread

# 结束
mqtt_stop
```

相应的，我们也可以在 MQTTX 中接收到发送过来的消息。

![](https://img.lziqi.top/img/MQTTX%E6%8E%A5%E5%8F%97%E5%88%B0%E5%B0%8F%E7%86%8A%E6%B4%BE%E5%8F%91%E9%80%81%E7%9A%84MQTT%E6%B6%88%E6%81%AF.png)
