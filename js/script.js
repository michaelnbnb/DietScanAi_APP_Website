// 设置默认语言
document.documentElement.lang = localStorage.getItem('language') || 'en';

// 语言切换功能
function switchLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);
}

// 移动端菜单显示
function showMenu() {
    document.getElementById('navLinks').classList.add('active');
}

// 移动端菜单隐藏
function hideMenu() {
    document.getElementById('navLinks').classList.remove('active');
}

// 页面加载时检查并应用保存的语言设置
document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        document.documentElement.lang = savedLanguage;
    }
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                // 如果在移动设备上，点击导航链接后关闭菜单
                if (window.innerWidth <= 768) {
                    hideMenu();
                }
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// 创建图片文件夹占位符提示
const imgElements = document.querySelectorAll('img');
imgElements.forEach(img => {
    if (img.src.includes('images/') && !img.complete) {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22300%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22300%22%20height%3D%22200%22%20fill%3D%22%23cccccc%22%3E%3C%2Frect%3E%3Ctext%20x%3D%22150%22%20y%3D%22100%22%20font-size%3D%2214%22%20text-anchor%3D%22middle%22%20alignment-baseline%3D%22middle%22%20fill%3D%22%23333333%22%3E请创建images文件夹并添加图片%3C%2Ftext%3E%3C%2Fsvg%3E';
        });
    }
});