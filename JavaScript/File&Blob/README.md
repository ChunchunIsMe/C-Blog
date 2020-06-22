## Blob
`Blob`对象表示一个不可变、原始数据的类文件对象。`Blob`表示的不一定是`JavaScript`原生格式的数据。`File`接口基于`Blob`

#### 构造函数
`new Blob(blobParts[, options])`返回一个新建的`Blob`对象,其内容由参数中给定的数组串联而成

参数
1. Array 是一个由`ArrayBuffer`/`ArrayBufferView`/`Blob`/`DOMString`等对象构成的`Array`,或者其他类似对象的混合体,它将会被放进`Blob`。`DOMStrings`会被编码为`UTF-8`
2. options 是一个可选的`BlobPropertyBag`字典,他可能会指定如下两个属性
   - `type`, 默认值为`""`,它代表了将会被放入到blob中的数组内容的`MIME`类型 
   - `endings`, 默认值为`"transparent"`,用于指定包含行结束符`\n`的字符串如何被写入。它是以下两个值的一个: `"native"`,代表行结束符会被更改为适合宿主操作系统文件系统的换行符,或者`"transparent"`代表会保持blob中保存的结束符不变
#### 属性
- Blob.size(只读) `Blob`对象中所包含数据的字节大小
- Blob.type(只读) 一个字符串,表明`Blob`对象所包含数据的MIME类型。如果类型未知,则该值为空字符串
#### 方法
- `Blob.slice([start[, end[, contentType]]])` 返回一个新的`Blob`对象,包含了源`Blob`对象中指定范围内的数据
   - start 开始下标(可选)
   - end 结束下标(可选)
   - contentType 赋予新的`Blob`一个文档类型(可选)
- `Blob.stream()` 返回一个能读取`blob`内容的`ReadableStream`
- `Blob.text()` 返回一个`promise`且包含`blob`所有内容的`UTF-8`格式的`USVString`
- `Blob.arrayBuffer()` 返回一个`promise`且包含`blob`所有内容的二进制`ArrayBuffer`
## FileReader
`FileReader`允许Web应用程序异步读取储存在用户计算机上的文件,可以使用`File`或者`Blob`指定要读取的文件或数据

> `FileReader`仅用于以安全的方式从用户(远程)系统读取文件内容,他不能用于从文件系统按路径名简单地读取文件。
#### 构造函数
`new FileReader()`返回一个新的`FileReader`
#### 属性
- FileReader.error(只读) 表示在读取文件时发生的错误
- FileReader.readyState(只读) 表示状态的数据 0 没有加载任何数据 1 数据正在被加载 2 已完成全部的读取请求
- FileReader.result(只读) 文件的内容.该属性仅在读取操作完成后才有效,数据的格式取决于使用哪个方法来启动读取操作
#### 事件处理
- onabort 被中断时触发
- onerror 在读取操作发生错误时触发
- onload 在读取操作完成时触发
- onloadstart 在读取操作开始时触发
- onloadend 在读取操作结束时触发(成功/失败)
- onprogress 在读取时触发
#### 方法
- abort() 终止读取操作。在返回时,`readyState`属性为DONE
- readAsArrayBuffer(blob[, encoding]) 开始读取指定的`Blob`中的内容,一旦完成,result属性中保存的是`ArrayBuffer`数据对象
- readAsDataURL(blob[, encoding]) 开始读取指定的`Blob`中的内容。一旦完成,result属性将包含一个`data:`URL格式的Base64字符串以表示所读取文件的内容
- readAsText(blob[, encoding]) 开始读取指定`Blob`中的内容。一旦完成,result属性将包含一个以字符串表示所读取的文件内容

方法参数
blob: 二进制对象,Blob类型或者File类型
encoding: 编码格式

## File
File是特殊类型的`Blob`,且可以在任意的Blob类型的context中。
#### 构造函数
`new File(bits, name[, options])`返回一个新的文件对象

参数
1. bits: 一个包含`ArrayBuffer`/`ArrayBufferView`/`Blob`或者`DOMString`对象的`Array`--或者这些对象的组合。这是`UTF-8`编码的文件内容
2. name: `USVString`,表示文件名称或者文件路径
3. options(可选): 选项对象,包含文件的可选属性。可选的属性如下
   - type: `DOMString`,表示要放到文件中内容的MIME类型,默认值为`""`
   - lastModified: 数值,表示文件最后修改时间的时间戳(毫秒)。默认值为`Date.now()`

File继承了Blob的属性和方法,基本Blob有的它都有,来说一下独自的
#### 属性
- File.lastModified(只读) 返回引用文件最后修改时间的毫秒数
- File.lastModifirfDate(只读) 返回最后修改时间的Date对象
- File.name(只读) 返回文件名
#### 方法

## URL
`URL`接口用于解析,构造,规范化和编码`URLs`(不规范会报错,可以使用它来判断URLs是否规范)。它通过提供允许你轻松阅读和修改URL组件的属性来工作。通常,通过在调用URL的构造函数时将URL指定为字符串或提供相对URL和基本URL来创建新的URL对象。然后可以轻松读取URL已解析组成部分或对URL进行更改。
#### 构造方法
`new URL(URL[, base])`或`new window.URL(URL[, base])`创建并返回一个`URL`对象,该URL对象引用使用绝对URL字符串,相对URL字符串和基本URL字符串指定的URL

参数
1. url 是一个表示绝对或相对URL的`DOMString`。如果url是相对URL,则会将base用作基准URL。如果url是绝对URL,则忽略base
2. base(可选) 表示基准URL的`DOMString`,相对URL的时候才起效

比如
```
new URL('/a','https://www.baidu.com') // www.baidu.com/a
```
这种第二个参数才有用否则直接第一个参数
```
new URL('https://www.hao123.com'','https://www.baidu.com') // www.hao123.com

```
#### 属性
基本上都是一些url参数
- hash
- host
- hostname
- href
- origin
- password
- pathname
- port
- protocol
- search
- searchParams
- username
#### 方法
- toString() 返回整个URL的`USVString`
- toJSON() 返回属性`href`相同的字符串
#### 静态方法
- createObjectURL(object) 返回一个`DOMString`,包含一个唯一blob链接(该链接协议为blob:,后跟唯一标识浏览器中的对象的掩码)
   - object: 用于创建URL的`File`对象、`Blob`对象或者`MediaSurce`对象
   - 返回值: 一个`DOMString`包含了对象的URL,该URL可用于指定源`object`的内容 
- revokeObjectURL(objectURL) 销毁之前使用`URL.createObjectURL()`方法创建的URL实例
   - objectURL: 使用createObjectURL方法产生的URL对象。