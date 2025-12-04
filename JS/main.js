// Menu interativo

const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const menuCloseBtn = document.getElementById('menu-close');
const menuBackdrop = document.getElementById('menu-backdrop');

function openMenu() {
    if (!menu) {
        return;
    }
    menu.classList.add('active');
    document.body.classList.add('menu-open');
}

function closeMenu() {
    if (!menu) {
        return;
    }
    menu.classList.remove('active');
    document.body.classList.remove('menu-open');
}

function toggleMenu(event) {
    if (event) {
        event.stopPropagation();
    }
    if (!menu) {
        return;
    }
    if (menu.classList.contains('active')) {
        closeMenu();
    } else {
        openMenu();
    }
}

if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
}

if (menu) {
    const menuLinks = menu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

if (menuCloseBtn) {
    menuCloseBtn.addEventListener('click', closeMenu);
}

if (menuBackdrop) {
    menuBackdrop.addEventListener('click', closeMenu);
}

document.addEventListener('click', (event) => {
    if (!menu || !menuToggle) {
        return;
    }
    const clickedCloseBtn = menuCloseBtn && menuCloseBtn.contains(event.target);
    if (!menu.contains(event.target) && !menuToggle.contains(event.target) && !clickedCloseBtn) {
        closeMenu();
    }
});

const header = document.getElementById('header');
const headerLogoLink = document.querySelector('.header-logo-link');

if (headerLogoLink) {
    const normalizedPath = window.location.pathname.replace(/\\/g, '/');
    const isInsideHtmlFolder = normalizedPath.includes('/HTML/');
    headerLogoLink.setAttribute('href', isInsideHtmlFolder ? '../index.html' : './index.html');
}

function handleScroll() {
    if (!header) {
        return;
    }

    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleScroll);
handleScroll();

const xmenu = document.getElementById('menu');
const closeBtn = document.getElementById('menu-close');

closeBtn.addEventListener('click', () => {
    menu.classList.remove('active');
});

// Menu interativo

// Scroll suavizado

let scrollY = 0;
let targetY = 0;
let isSmoothScrollPaused = false;
let isProgrammaticScroll = false;
const ease = 0.08;
const minProgrammaticScrollDelta = 0.5;
const mapsIframe = document.querySelector('.maps-container iframe');

function computeMaxScroll() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    return maxScroll > 0 ? maxScroll : 0;
}

function clampScrollValue(value) {
    if (value < 0) {
        return 0;
    }

    const maxScroll = computeMaxScroll();
    if (value > maxScroll) {
        return maxScroll;
    }

    return value;
}

function syncScrollAnchorsToWindow() {
    const currentPosition = clampScrollValue(window.scrollY);
    scrollY = currentPosition;
    targetY = currentPosition;
    isProgrammaticScroll = false;
}

function updateScroll() {
    targetY = clampScrollValue(targetY);

    if (isSmoothScrollPaused) {
        scrollY = clampScrollValue(window.scrollY);
        requestAnimationFrame(updateScroll);
        return;
    }

    const delta = targetY - scrollY;
    if (Math.abs(delta) < 0.1) {
        scrollY = targetY;
    } else {
        scrollY += delta * ease;
    }

    scrollY = clampScrollValue(scrollY);

    if (Math.abs(window.scrollY - scrollY) > minProgrammaticScrollDelta) {
        isProgrammaticScroll = true;
        window.scrollTo(0, scrollY);
    }

    requestAnimationFrame(updateScroll);
}

function handleSmoothScrollWheel(event) {
    if (isSmoothScrollPaused) {
        return;
    }

    event.preventDefault();
    targetY += event.deltaY * 0.8;
    targetY = clampScrollValue(targetY);

    if (dispatchCarouselWheelDelta && (!carouselContainer || !carouselContainer.contains(event.target))) {
        dispatchCarouselWheelDelta(event.deltaY);
    }
}

function handleNativeScroll() {
    if (isProgrammaticScroll) {
        isProgrammaticScroll = false;
        return;
    }

    const currentPosition = clampScrollValue(window.scrollY);
    scrollY = currentPosition;
    targetY = currentPosition;
}

function pauseSmoothScroll() {
    if (isSmoothScrollPaused) {
        return;
    }

    isSmoothScrollPaused = true;
    syncScrollAnchorsToWindow();
}

function resumeSmoothScroll() {
    if (!isSmoothScrollPaused) {
        return;
    }

    isSmoothScrollPaused = false;
    syncScrollAnchorsToWindow();
}

function handleMapsPointerEnter() {
    pauseSmoothScroll();
}

function handleMapsPointerLeave() {
    resumeSmoothScroll();
}

if (mapsIframe) {
    mapsIframe.addEventListener('mouseenter', handleMapsPointerEnter);
    mapsIframe.addEventListener('mouseleave', handleMapsPointerLeave);
    mapsIframe.addEventListener('touchstart', handleMapsPointerEnter);
    mapsIframe.addEventListener('touchend', handleMapsPointerLeave);
    mapsIframe.addEventListener('touchcancel', handleMapsPointerLeave);
}

syncScrollAnchorsToWindow();
window.addEventListener('wheel', handleSmoothScrollWheel, { passive: false });
window.addEventListener('scroll', handleNativeScroll, { passive: true });
window.addEventListener('resize', syncScrollAnchorsToWindow);
updateScroll();

// Scroll suavizado