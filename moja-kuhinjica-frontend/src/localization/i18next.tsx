import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import translationEN from './en/en.json'
import translationSR from './sr/sr.json'

import serbiaIcon from '../../public/static/assets/images/serbiaIconFlag.svg'
import ukIcon from '../../public/static/assets/images/ukFlag.svg'

export const LANGUAGES_OPTIONS = [
    {
        name: 'Serbian',
        value: 'sr',
        icon: serbiaIcon,
    },
    {
        name: 'English',
        value: 'en',
        icon: ukIcon,
    },
]

export const resources = {
    en: {
        translation: translationEN,
    },
    sr: {
        translation: translationSR,
    },
}

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
        compatibilityJSON: 'v3',
        resources,
        interpolation: {
            escapeValue: false,
        },
    })
    .then(() => {
        console.log('i18n initialized')
    })
    .catch((err: Error) => {
        console.log('i18n initialization failed', err)
    })


