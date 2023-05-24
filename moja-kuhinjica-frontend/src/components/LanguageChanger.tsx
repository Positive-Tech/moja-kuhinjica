import React from 'react'
import Image from 'next/image'
import i18next from 'i18next'

import { LANGUAGES_OPTIONS } from '../localization/i18next'

const LanguageChanger = (): JSX.Element => {
    const changeLanguage = (lang: string): void => {
        i18next.changeLanguage(lang).catch((err) => console.log(err))
    }

    return (
        <div className="container-flags">
            {LANGUAGES_OPTIONS.length > 2 ? (
                <select>
                    {LANGUAGES_OPTIONS.map((option, index) => (
                        <option
                            key={index}
                            id={option.value}
                            value={option.value}
                        >
                            {option.name}
                        </option>
                    ))}
                </select>
            ) : (
                LANGUAGES_OPTIONS.map((option) => (
                    <div className="icon-flag" key={option.value}>
                        <div>
                            <Image
                                src={option.icon}
                                alt=""
                                className='icon-flag'
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
