## 进程与线程的区别
- 进程: 进程是操作系统分配资源的基本单位,是程序在计算机上的一次执行活动
- 线程: 线程是进程的一个实体是CPU调度和分派的的基本单位

- 一个程序必须有一个进程,一个进程必须有一个线程
- 进程在执行过程中有独立的内存单元,多个线程共享内存

## node中的进程与线程
### os
`os`模块提供了操作系统相关的方法和属性。直接使用`const os = require('os')`使用模块

1. os.EOL 操作系统特特定的行末标志
  - POSIX上是`\n`
  - Windows上是`\r\n`
2. os.arch() 返回为其编译Node.js二进制文件的操作系统的CPU架构。可能的值有`arm`/`arm64`等
3. os.cups() 返回一个对象数组,其中包含有关每个逻辑CPU内核的信息。每个对象上包含的属性有
  - model
  - speed 以MHZ为单位
  - times
     - user CPU在用户模式下花费的毫秒数
     - nice CPU在良好模式下花费的毫秒数
     - sys CPU在系统模式下花费的毫秒数
     - idle CPU在空闲模式下花费的毫秒数
     - irq CPU在中断请求模式下花费的毫秒数
4. os.endianness() 返回一个字符串,该字符串标识为其编译Node.js二进制文件的CPU字节序。
5. os.freemem() 以整数的形式返回空闲内存量(以字节为单位)
6. os.getPrioroty([pid]) 返回由pid指定的进程的调度优先级。如果未提供pid或者为0,则返回当前进程的优先级
7. os.homedir() 返回当前用户的主目录的字符串路径
8. os.hostname() 以字符串的形式返回操作系统的主机名
7. os.loadavg() 返回一个数组,包含1、5和15分钟的平均负载
8. os.networkInterfaces() 返回一对象包含已分配网络地址的网络接口
  - address 分配的IPV4或IPV6地址
  - netmask IPV4或IPV6子网掩码
  - family IPV4/IPV6
  - internal 如果网络接口是不可远程访问的环接口或类似接口,则为true,否则为false
  - scopeid 数值为IPV6作用于ID(仅当family为IPV6时指定)
  - cidr 以CIDR表示法分配带有路由前缀的IPV4/IPV6地址,如果netmast无效则此属性会被设置为null
9. os.platform() 返回表示操作系统平台的字符串。可能有`win32`、`linux`等
10. os.release() 以字符串的形式返回操作系统
11. `os.setPriority([pid,]priority)` 尝试为pid指定的进程设置调度优先级。如果没有提供pid或者为0则为当前进程id
  - priority 必须是-20(高优先级)到19(低优先级)之间的整数
12. os.tmpdir() 以字符串形式返回操作系统的默认临时文件夹
13. os.totalmem() 以整数形式返回系统的内存总量(以字节为单位)
14. os.type() 返回与`unmae(3)`一样的操作系统名字。
15. os.uptime() 返回系统的正常运行时间(秒为单位)
16. `os.userInfo([options])` 返回当前有效用户的信息包含username、uid、gid、shell、homedir
  - options encoding 用于解释结果字符串的字符编码
17. os.version() 返回内核版本的字符串
### process
### child_process
`child_process`模块提供了衍生子进程的能力
### cluster