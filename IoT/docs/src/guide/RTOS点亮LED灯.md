# RTOS 点亮 LED 灯

![](https://img.lziqi.top/img/%E7%82%B9%E4%BA%AELED%E7%81%AF-%E6%9F%A5%E8%AF%A2%E5%B0%8F%E7%86%8A%E6%B4%BE%E6%96%87%E6%A1%A3%E5%AF%B9%E5%BA%94LED%E7%AB%AF%E5%8F%A3.png)

从查询文档可以得知，我们小熊派上，对应的 LED 灯为 PC13，所以如下设置为`GET_PIN(C,13)`

文档地址：[阿里云盘](https://www.aliyundrive.com/s/AxuB2AhptB4)

```c
#include <board.h>
#include <rtdevice.h>

//设置LED_PIN的口为PC13，这是对应了开发板上的LED端口PC13
#define LED_PIN GET_PIN(C,13)

int main(void)
{
    int count = 1;

	//设置GPIO口为输出模式
    rt_pin_mode(LED_PIN, PIN_MODE_OUTPUT);
    while (count++)
    {
        //写GPIO口为count%2
        rt_pin_write(LED_PIN, count%2);
        //延迟1000ms
        rt_thread_mdelay(1000);
    }

    return RT_EOK;
}
```
