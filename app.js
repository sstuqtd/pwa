let deferredPrompt;
const installButton = document.getElementById('installButton');

// 监听 beforeinstallprompt 事件
window.addEventListener('beforeinstallprompt', (e) => {
    // 阻止默认的安装提示
    e.preventDefault();
    deferredPrompt = e;
    // 显示安装按钮
    installButton.style.display = 'block';
});

// 安装按钮点击事件
installButton.addEventListener('click', () => {
    // 隐藏安装按钮
    installButton.style.display = 'none';
    // 显示安装提示
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
        });
    }
});

// 注册 Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/pwa/service-worker.js')
        .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
            console.log('Service Worker registration failed:', error);
        });
    });
}
