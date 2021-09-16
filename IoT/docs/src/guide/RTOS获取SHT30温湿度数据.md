# RTOS 获取 SHT30 温湿度数据

## 连接 SHT30

购买 SHT30 传感器，模块外观如图所示。

![](https://img.lziqi.top/img/STH30%E5%A4%96%E8%A7%82.png)

- VCC

VCC 接口接到开发板上的 3.3V

- GND

GND 接地接口接到开发板上的任意 GND

- SDA

SDA 接口接到主板上的 IIC1_SDA

- SCL

SCL 接口接到主板上的 IIC1_SCL

## 添加 STH3X 包

在软件包模块中，选择新增，搜索 sht，选择 sht3x 进行添加，添加完成后，ctrl+s 进行保存，RT-Thread 会帮助我们进行自动构建代码。可以看到`packages/sht3x-v1.0.0`出现，这里面放置的就是 sth3x 的软件包代码。

## IIC 配置

点击 RT-Thread Settings 开启 IIC 设备驱动。

![](https://img.lziqi.top/img/RT-Thread%20Settings%E5%BC%80%E5%90%AFIIC%E9%A9%B1%E5%8A%A8.png)

    主要对`drivers/board.h`文件进行修改。经过文档查看得知小熊派的IIC端口为PB6与PB7。

![](https://img.lziqi.top/img/RT-Thread%20IIC%E7%AB%AF%E5%8F%A3%E9%85%8D%E7%BD%AE.png)

![](https://img.lziqi.top/img/%E5%B0%8F%E7%86%8A%E6%B4%BEIIC%E5%8F%A3%E6%96%87%E6%A1%A3.png)

## 获取温湿度

`sht30_demo.h`

```c
#ifndef __SHT30_DEMO_H__
#define __SHT30_DEMO_H__

#define LOG_TAG "sht30_demo"
/*RT-Thread*/
#include <rtthread.h>
/*私人*/
#include <sht3x.h>

int sht30_demo();

#endif
```

`sht30_demo.c`

```c
#include <sht30_demo.h>

#define THREAD_PRIORITY         25
#define THREAD_STACK_SIZE       512
#define THREAD_TIMESLICE        5

/*线程1*/
static rt_thread_t tid1 = RT_NULL;

/*线程的入口函数*/
static void thread_entry(void *parameter)
{
    sht3x_device_t sht3x_device;

    sht3x_device = sht3x_init("i2c1", 0x44);

    if (sht3x_device == RT_NULL)
    {
        return;
    }

    while (1)
    {
        rt_thread_mdelay(4000);
        //成功获取到数据
        if (RT_EOK == sht3x_read_singleshot(sht3x_device))
        {
            rt_kprintf("sht3x humidity : %d, temperature : %d\n",
                       (int)sht3x_device->humidity, (int)sht3x_device->temperature);
        }
        else
            rt_kprintf("read sht3x data fail\n");
    }
}

int sht30_demo()
{
    tid1 = rt_thread_create("thread1", thread_entry, RT_NULL, THREAD_STACK_SIZE, THREAD_PRIORITY, THREAD_TIMESLICE);

    //启动线程
    if (tid1 != RT_NULL)
    {
        rt_thread_startup(tid1);
    }
}
```
