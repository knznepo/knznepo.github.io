luge.settings({smooth: {inertia: 1}})

// Random Hover Color Effect
const randomHover = document.querySelectorAll('.random-hover');

randomHover.forEach(element => {
    element.addEventListener('mouseenter', () => {
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
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
const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.work-next',
        prevEl: '.work-prev',
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },

    speed: 1000,
});

// Work Slider Content
var workSlider = new Vue({
    el: '#work-slider',
    data: {
        worksSlider: null,
    },

    methods: {
          capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    },

    mounted() {
        fetch('js/works-featured.json')
            .then(r => r.json())
            .then(json => {
                this.worksSlider = json;

                this.$nextTick(() => {
                    new Swiper('.swiper', {
                        direction: 'horizontal',
                        loop: true,
                        pagination: { el: '.swiper-pagination' },
                        navigation: { nextEl: '.work-next', prevEl: '.work-prev' },
                        scrollbar: { el: '.swiper-scrollbar' },
                        speed: 2000,
                    });
                });
            });
    }
});

var moreWorks = new Vue({
    el: "#more-works",
    data: {
        works: null
    },

    mounted() {
        fetch('js/works.json')
            .then(r => r.json())
            .then(json => {
                this.works = json;
            });
    }
});

const moreWorksModal = document.querySelector('.modal');

// show more works modal
const moreWorksLink = document.querySelector('.more-works-link');

moreWorksLink.onclick = (e) => {
    e.preventDefault();
    moreWorksModal.style.display = 'flex';
    setTimeout(() => {
        moreWorksModal.classList.add('open');
    }, 10);
}

// close more work modal
const moreWorksModalClose = document.querySelector('.modal-close');

moreWorksModalClose.onclick = (e) => {
    e.preventDefault();
    moreWorksModal.classList.remove('open');
    setTimeout(() => {
        moreWorksModal.style.display = 'none';
    }, 400);
}