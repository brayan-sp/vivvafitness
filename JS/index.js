let isChanged = false;
window.addEventListener('scroll', function () {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;
    // Limites inspirados na Porsche: muda em 40%, volta em 20%
    if (scrollPercent > 0.35 && !isChanged) {
        document.body.style.backgroundColor = 'white';
        document.querySelector('.superacao1').style.color = 'black'
        document.querySelector('.superacao1').style.transition = '1s'
        isChanged = true;
    } else if (scrollPercent < 0.35 && isChanged) {
        document.body.style.backgroundColor = 'var(--color-quinta)';
        document.querySelector('.superacao1').style.color = 'white'
        document.querySelector('.superacao1').style.transition = '1s'
        isChanged = false;
    }
});

let isChanged2 = false;
window.addEventListener('scroll', function () {
    const scrollTop2 = window.scrollY;
    const docHeight2 = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent2 = scrollTop2 / docHeight2;

    if (scrollPercent2 > 0.5 && !isChanged2) {
        document.body.style.backgroundColor = 'var(--color-quinta)';
        document.querySelector('.superacao1').style.color = 'white'
        isChanged2 = true;
    } else if (scrollPercent2 < 0.5 && isChanged2) {
        document.body.style.backgroundColor = 'white';
        document.querySelector('.superacao1').style.color = 'black'
        isChanged2 = false;
    }
});

// Carrossel com scroll:

let dispatchCarouselWheelDelta = null;
const carousel = document.querySelector('.carousel');
const carouselContainer = document.querySelector('.carousel-container');

if (carousel && carouselContainer) {
    let currentPosition = 0;
    let targetPosition = 0;
    let isRendering = false;
    let loopWidth = carousel.scrollWidth / 2 || carousel.scrollWidth;

    const wheelSensitivity = 0.65;
    const interpolationEase = 0.12;
    const maxWheelDelta = 90;

    function recalcLoopWidth() {

        const measuredWidth = carousel.scrollWidth / 2;
        loopWidth = measuredWidth > 0 ? measuredWidth : carousel.scrollWidth;
    }

    function maintainInfiniteLoop() {

        if (!loopWidth) {
            return;
        }

        while (targetPosition <= -loopWidth) {
            targetPosition += loopWidth;
            currentPosition += loopWidth;
        }

        while (targetPosition >= 0) {
            targetPosition -= loopWidth;
            currentPosition -= loopWidth;
        }
    }

    function startRenderLoop() {

        if (isRendering) {
            return;
        }

        isRendering = true;
        requestAnimationFrame(renderCarousel);
    }

    function renderCarousel() {

        const distance = targetPosition - currentPosition;

        if (Math.abs(distance) < 0.1) {
            currentPosition = targetPosition;
            carousel.style.transform = `translateX(${currentPosition}px)`;
            isRendering = false;
            return;
        }

        currentPosition += distance * interpolationEase;
        maintainInfiniteLoop();
        carousel.style.transform = `translateX(${currentPosition}px)`;
        requestAnimationFrame(renderCarousel);
    }

    function applyCarouselScroll(deltaY) {

        const limitedDelta = Math.max(-maxWheelDelta, Math.min(maxWheelDelta, deltaY));
        targetPosition -= limitedDelta * wheelSensitivity;
        maintainInfiniteLoop();
        startRenderLoop();
    }

    function handleCarouselWheel(event) {

        event.preventDefault();
        applyCarouselScroll(event.deltaY);
    }

    function initCarousel() {

        recalcLoopWidth();
        maintainInfiniteLoop();
        carousel.style.transform = 'translateX(0px)';
        carouselContainer.addEventListener('wheel', handleCarouselWheel, { passive: false });
    }

    dispatchCarouselWheelDelta = applyCarouselScroll;
    window.addEventListener('resize', recalcLoopWidth);
    initCarousel();
}
