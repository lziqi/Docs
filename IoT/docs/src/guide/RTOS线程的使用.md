# RTOS 线程的使用

## 新建 include 文件夹并加入头文件支持

为了开发代码的清晰明了，在`application`文件夹下，新建`include`文件夹防止`.h`头文件。

在左侧的项目资源管理器中，在项目文件夹上，点击右键-属性-C/C++构建-设置，点击`GNU ARM Cross C Compiler`下的`Includes`，这里可以看到`Include paths`。

在这里可以找到一条`"${workspace_loc://${ProjName}/applications}"`，这里加入我们新创建的`include`文件夹，`"${workspace_loc://${ProjName}/applications}"/include`。

## 新建 thread_demo.h 头文件

新建头文件后，加入`#include <rtthread.h>`，官方提供的线程包，具体的使用内容可以参照[RT-Thread 编程指南](https://www.rt-thread.org/download/manual/um4003-rtthread-programming-manual.pdf)官方文档。

在`thread_demo.h`下添加我们需要使用的线程函数。

```c
#include <rtthread.h>

int trhead_demo();
```

## 新建 thread_demo.c 头文件

```c
#include <thread_demo.h>

//线程的优先级
#define THREAD_PRIORITY         25
//栈大小
#define THREAD_STACK_SIZE       512
//时间片
#define THREAD_TIMESLICE        5


/*线程1*/
static rt_thread_t tid1 = RT_NULL;

/*线程的入口函数*/
static void thread_entry(void *parameter)
{
    while (1)
    {
        rt_thread_mdelay(4000);//延迟4000ms
        rt_kprintf("thread demo is running!\n");
    }
}

int thread_demo()
{
    tid1 = rt_thread_create("thread1", thread_entry, RT_NULL, THREAD_STACK_SIZE, THREAD_PRIORITY, THREAD_TIMESLICE);

    //启动线程
    if (tid1 != RT_NULL)
    {
        rt_thread_startup(tid1);
    }
}
```
