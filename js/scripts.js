const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

luge.settings({smooth: {inertia: 1}})

// Random Hover Color Effect
// Picked from a palette that stays readable (4.5:1+) on white
const hoverColors = ['#d1345b', '#0b7a75', '#5b3fd1', '#c2410c', '#1d4ed8', '#15803d', '#a21caf'];
const randomHover = document.querySelectorAll('.random-hover');

randomHover.forEach(element => {
    element.addEventListener('mouseenter', () => {
        const randomColor = hoverColors[Math.floor(Math.random() * hoverColors.length)];
        element.style.color = randomColor;
    });

    element.addEventListener('mouseleave', () => {
        element.style.color = '';
    });
});

// Animate on Scroll Initialization
const animateElement = document.querySelectorAll('.animate');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

animateElement.forEach(element => {
    observer.observe(element);
});

// Work Slider
// Slides are rendered into index.html by tools/build.mjs
const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    pagination: { el: '.swiper-pagination' },
    navigation: { nextEl: '.work-next', prevEl: '.work-prev' },
    speed: prefersReducedMotion ? 0 : 2000,
});

const moreWorksModal = document.querySelector('.modal');

// show more works modal
const moreWorksLink = document.querySelector('.more-works-link');

const moreWorksModalClose = document.querySelector('.modal-close');

moreWorksLink.onclick = (e) => {
    e.preventDefault();
    moreWorksModal.style.display = 'flex';
    setTimeout(() => {
        moreWorksModal.classList.add('open');
        moreWorksModalClose.focus();
    }, 10);
}

// close more work modal
const closeMoreWorks = () => {
    moreWorksModal.classList.remove('open');
    setTimeout(() => {
        moreWorksModal.style.display = 'none';
        moreWorksLink.focus();
    }, 400);
}

moreWorksModalClose.onclick = (e) => {
    e.preventDefault();
    closeMoreWorks();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && moreWorksModal.classList.contains('open')) {
        closeMoreWorks();
    }
});
