1. <a href="#http_status">http 状态码</a>
2. <a href="#http_cache">http 缓存</a>

## <span id="http_status"> http 状态码</span>

-   1\*\*：信息，服务器收到请求，需要请求者继续执行操作
-   2\*\*：成功，操作被成功接收并处理
-   3\*\*：重定向，需要进一步的操作以完成请求
-   4\*\*：客户端错误，请求包含语法错误或无法完成请求
-   5\*\*：服务器错误，服务器在处理请求的过程中发生了错误

## <span id="http_cache"> http 缓存</span>

-   http 缓存相应头：Cache-Control,Expires,Last-Modified,if-Modified-Since,Etag,if-None-Match
-   http 缓存方案:md5/hash 缓存，cdn 缓存
-   强缓存：不发起 http 请求，直接使用本地缓存，比如浏览器地址栏回车，使用浏览器的刷新按钮，在 Expires 或 max-age 生效的情况下，触发的都是强缓存
-   协商性缓存：在使用本地缓存前，先与服务器协商，核对缓存文件是否为最新。比如设置了 cache-control=no-cache,不管你做任何操作，都会发起请求，这一类就是协商缓存
