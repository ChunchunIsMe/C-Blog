## link
link 规定了当前文档和外部资源的关系.该元素最常用于链接样式表,此外也可以用来创建站点图标

### 属性
- as: 该属性仅在`<link>`元素设置了`rel="preload"`时才能使用。它规定了`<link>`加载内容的类型,对于内容的优先级、请求匹配、正确的内容安全策略的选择以及正确的Accept请求头的设置,这个属性是必须的
   - audio 用于`<audio>`元素
   - document `<iframe>`和`<frame>`
   - embed `<embed>`
   - fetch `fetch`/`XHR`这个值必须设置`crossorigin`属性
   - font CSS @font-face
   - image 有着`imageset`或者`srcset`属性的`<img>`和`<picture>`元素
   - object `<object>`元素
   - script `<script>`元素
   - style `<link rel="stylesheet">`
   - track `<track>`
   - video `<video>`
   - worker Worker,ShareWorker
- crossorigin,此枚举属性指定在加载相关图片时是否必须使用CORS,如果不设置这个属性就不会使用CORS加载,并且设置了这个属性如果服务器没有设置`Access-Control-Allow-Origin`图片就会污染并限制使用
   - "anoymous" 发起一个跨域请求包含(Origin),但是不发送任何认证信息(cookie/x.509证书和HTTP基本认证信息)
   - "use-credentials" 会发送带认证信息的跨域请求
- disabled
- href 指定被链接资源的URL,URL是绝对的也可以是相对的
- hreflang 属性指明了被连接资源的语言
- importance 相对重要性
- integrity 包含行内元数据,是一个你用浏览器获取资源文件的哈希值,用base64编码的方式加密,这样用户能用它来验证一个获取到的资源,在传送中没有被非法篡改
- media 规定了外部资源适用的媒体类型。它的值必须媒体查询
- referrerpolicy 指示获取资源时带不带referrer
- rel 命名连接文档与当前文档的关系
- sizes 定义相应资源的可视化媒体中icons的大小。他只有在rel包含icon的link类型值
- title 属性在`<link>`元素上有特殊的语义。当用于`<link rel="stylesheet">`时,它定义了一个首选样式表或备用样式表。不正确的使用将会被样式表忽略
- type 这个属性被用于定义链接的内容的类型。这个属性的值应该是像`text/html`,`text/css`等MIME类型。这个属性常用的用法是定义链接的样式表,最常用的值是`text/css`