import React from 'react'
import i18next from 'i18next'

import { LANGUAGES_OPTIONS } from '../localization/i18next'

const LanguageChanger = (): JSX.Element => {
    const changeLanguage = (lang: string) => {
        i18next.changeLanguage(lang)
    }

    return (
        <div className="container-flags">
            {LANGUAGES_OPTIONS.length > 2 ? (
                <select>
                    {LANGUAGES_OPTIONS.map((option) => (
                        <option id={option.value} value={option.value}>
                            {option.name}
                        </option>
                    ))}
                </select>
            ) : (
                LANGUAGES_OPTIONS.map((option) => (
                    <div className="icon-flag" key={option.value}>
                        <div>
                            <img
                                src={option.icon}
                                alt=""
                                className="icon_side_bar_flag"
                                onClick={() => changeLanguage(option.value)}
                            />
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default LanguageChanger
