import { breakpoints } from '../styles/global'

export const sliderSettings = {
    infinite: false,
    arrows: false,
    speed: 600,
    slidesToShow: 2.2,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: breakpoints.large,
            settings: {
                infinite: false,
                arrows: false,
                speed: 600,
                slidesToShow: 1.5,
                slidesToScroll: 1,
                initialSlide: 0,
            },
        },
    ],
}
