import React, { useState } from 'react'
import Image from 'next/image'
import { RegularButton } from '../button/RegularButton'
import { Title } from '../label/Title'
import { Text } from '../label/Text'
import pic from 'public/static/assets/images/meal1.png'
import { useTranslation } from 'react-i18next'

const IMAGE_WIDTH = 500
const IMAGE_HEIGHT = 500

const ORDERING = 'ordering'
interface IMenuItemProps {
    type?: string
    title: string
    description: string
    price: number
    handleClick?: () => void
    buttonIsActive?: boolean
    image: string
}
export const MenuItem = ({
    type,
    title,
    description,
    price,
    image,
    handleClick,
    buttonIsActive,
}: IMenuItemProps): JSX.Element => {
    const [openDescription, setOpenDescription] = useState(false)
    const isOrdering = (): boolean => type === ORDERING
    const { t } = useTranslation()
    return (
        <div
            className={
                isOrdering()
                    ? 'menuItemWrapper menuItemWrapper--ordering'
                    : 'menuItemWrapper'
            }
        >
            <div
                className={
                    isOrdering()
                        ? 'pictureWrapper pictureWrapper--ordering'
                        : 'pictureWrapper'
                }
            >
                <Image
                    src={image ? image : pic}
                    alt=""
                    className="pictureWrapper__restaurantPicture"
                    width={IMAGE_WIDTH}
                    height={IMAGE_HEIGHT}
                />
            </div>
            <div className="titleWrapper">
                <Title
                    onClick={() => setOpenDescription(!openDescription)}
                    content={t(title)}
                    style={
                        isOrdering()
                            ? 'titleWrapper__orderingTitleLabel'
                            : 'titleWrapper__titleLabel'
                    }
                />
                <svg
                    className={
                        openDescription
                            ? 'titleWrapper__svgSeparator titleWrapper__svgSeparator--rotated'
                            : 'titleWrapper__svgSeparator'
                    }
                    onClick={() => setOpenDescription(!openDescription)}
                    width="19"
                    height="19"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M6.29289 2.29289C6.68342 1.90237 7.31658 1.90237 7.70711 2.29289L14.0404 8.62623C14.431 9.01675 14.431 9.64992 14.0404 10.0404L7.70711 16.3738C7.31658 16.7643 6.68342 16.7643 6.29289 16.3738C5.90237 15.9832 5.90237 15.3501 6.29289 14.9596L11.9191 9.33333L6.29289 3.70711C5.90237 3.31658 5.90237 2.68342 6.29289 2.29289Z" />
                </svg>
            </div>
            {openDescription && (
                <div className="descriptionLabelDiv">
                    <Text
                        content={t(description) as string}
                        style={
                            isOrdering()
                                ? 'descriptionLabelDiv descriptionLabelDiv__descriptionLabel--ordering'
                                : 'descriptionLabelDiv__descriptionLabel'
                        }
                    />
                </div>
            )}
            <div className="priceWrapper">
                <label
                    className={
                        isOrdering()
                            ? 'priceWrapper__contentLabel priceWrapper__contentLabel--ordering'
                            : 'priceWrapper__contentLabel'
                    }
                >
                    {t("meni 1")} -&nbsp;
                </label>
                <label
                    className={
                        isOrdering()
                            ? 'priceWrapper__contentLabel priceWrapper__contentLabel--ordering--orderingPriceLabel'
                            : 'priceWrapper__contentLabel priceWrapper__contentLabel--priceLabel'
                    }
                >
                    {`${price} din`}
                </label>
            </div>
            {isOrdering() && (
                <div className="buttonContainer">
                    <RegularButton
                        content={t("Rezerviši")}
                        onClick={handleClick}
                        isActive={buttonIsActive}
                    />
                </div>
            )}
        </div>
    )
}
