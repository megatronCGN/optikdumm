import Swiper from './swiper/swiper.mjs';
import Autoplay from "./swiper/modules/autoplay.mjs";

const swiper = new Swiper('.swiper', {
    modules: [Autoplay],
    autoplay: {
        delay: 3000,
        disableOnInteraction: true
    },
    breakpoints: {
        700: {
            slidesPerView: 3
        },
        1200: {
            slidesPerView: 4,
        }
    },
    loop: true,
    slidesPerView: '1',
    on: {
        afterInit: function () {
            setTimeout( () =>{
                this.el.classList.add('swiper-animate-content');
            }, 300);
        }
    }
});
