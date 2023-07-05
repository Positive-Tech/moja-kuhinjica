export const bgModal = {
    overlay: {
        background: 'transparent',
    },
}
export const AUTH_TOKEN = 'token'
export const INDEX_INCREMENT = 1
export const TimeBeforeOrder = 10
export const MOBILE_WIDTH = 768
export const DAYS = ['PON', 'UTO', 'SRE', 'ČET', 'PET', 'SUB']
export const ORDERING = 'ordering'
export const HEADER_TYPE = 'red'
export const INITIAL_MEAL_AMOUNT = 1
export const DISABLED_MESSAGE = 'Ne možete da rezervišete posle 10 ujutru'
export const RESERVATION_SUCCESS = 'Rezervacija je uspešna'
export const RESERVATION_FAIL = 'Neuspešna rezervacija'
export const RESERVATION_SUCCESS_MESSAGE =
    'Vaša rezervacija je sačuvana. Možete je pogledati na stranici'

export const routes = {
    RESTAURANT_PROFILE_PAGE: '/restaurant/profile',
    LOGIN_PAGE: '/login',
    REGISTRATION_PAGE: '/registration',
    HOME_PAGE: '/',
    MY_RESERVATIONS_PAGE: '/myReservations',
    EDIT_PROFILE_PAGE: '/editProfile',
    MEAL_RESERVATION_PAGE: '/mealReservation',
    ABOUT_US_PAGE: '/aboutUs',
    CHANGE_PASSWORD_PAGE: '/passwordChange',
    RESET_PASSWORD_PAGE: '/email/verification/reset',
    FORGOTTEN_PASSWORD_PAGE: '/forgottenPassword',
}

export const axiosRoutes = {
    user: {
        USER_LOGIN: '/auth/login',
        CLIENT: '/client',
        USER_AUTH: '/auth/profile',
        CHANGE_PASSWORD: '/client/password',
        FORGOTTEN_PASSSWORD: '/auth/password/forgot',
        RESET_PASSWORD: '/auth/password/reset',
    },

    restaurant: {
        GET_WEEKLY_MENU: '/restaurant/5/menu/week',
        CREATE_ORDER: '/order',
        GET_MY_RESERVATIONS: '/order/mine?current=',
    },

    aboutUs: {
        GET_FAQ: '/faq',
    },
}
