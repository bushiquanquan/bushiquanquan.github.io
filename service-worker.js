importScripts("/open-static/mini-footprint-h5/js/precache-manifest.b2f5a539a34ace2982ba48ec690b993f.js?aa1");

/**
* 功能：service-worker.js
* 时间：2019-10-26
* 作者：yhh
*/
/*eslint-disable*/
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

// workbox.setConfig({
//     modulePathPrefix: ''
//     debug: false
// });

// globals workbox
workbox.core.setCacheNameDetails({
    prefix: 'ifootprint-cache',
    suffix: 'v1',
    precache: 'install-time',
    runtime: 'run-time'
});

// 强制跳过等待状态，直接让新的worker在安装后进入激活状态
workbox.core.skipWaiting();
// Service Worker 被激活后使其立即获得页面控制权
workbox.core.clientsClaim();

// 预缓存内容
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

// 消息通道，并通过它的两个MessagePort属性发送数据。
// const channel = new MessageChannel()
// worker.postMessage({ type: 'skip-waiting' }, [channel.port2])
self.addEventListener('message', event => {
    const replyPort = event.ports[0];
    const message = event.data;
    if (replyPort && message && message.type === 'skip-waiting') {
        event.waitUntil(
            self.skipWaiting()
                .then(() => replyPort.postMessage({ error: null }))
                .catch(error => replyPort.postMessage({ error }))
        )
    }
});

workbox.routing.registerRoute(
    // /^https:\/\/pan.baidu.com\/photo\/wap\/footprint\/result\//i,
    new RegExp('.*\.(?:js|css|jpg|png|jpeg)'),
    new workbox.strategies.CacheFirst()
);

