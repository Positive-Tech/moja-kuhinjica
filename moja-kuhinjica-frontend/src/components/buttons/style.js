import styled from 'styled-components'
import arrow from '../../../public/static/assets/images/arrow.svg'
import redArrow from '../../../public/static/assets/images/redArrow.svg'
import backRedArrow from '../../../public/static/assets/images/backRedArrow.svg'
import backWhiteArrow from '../../../public/static/assets/images/backWhiteArrow.svg'

export const WhiteButton = styled('button')`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border: 2px solid ${(props) => props.theme.colors.primaryRed};
    background: transparent;
    border-radius: 50%;
    padding: 15px;
    cursor: pointer;

    &::after {
        content: url(${redArrow.src});
    }
    &:hover {
        background: ${(props) => props.theme.colors.primaryRed};
        &::after {
            content: url(${arrow.src});
        }
    }
`
export const RedButton = styled('button')`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border: 2px solid ${(props) => props.theme.colors.primaryRed};
    background: ${(props) => props.theme.colors.primaryRed};
    border-radius: 50%;
    padding: 15px;
    cursor: pointer;

    &::after {
        content: url(${arrow.src});
    }
    &:hover {
        background: transparent;
        &::after {
            content: url(${redArrow.src});
        }
    }
`

export const RedBackButton = styled('button')`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border: 2px solid ${(props) => props.theme.colors.primaryRed};
    background: ${(props) => props.theme.colors.primaryRed};
    border-radius: 50%;
    padding: 15px;
    cursor: pointer;

    &::after {
        content: url(${backWhiteArrow.src});
    }
    &:hover {
        background-color: rgba(133, 133, 132, 0.5);
        &::after {
            content: url(${backRedArrow.src});
        }
    }
`
export const RedNextButton = styled('button')`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border: 2px solid ${(props) => props.theme.colors.primaryRed};
    background: ${(props) => props.theme.colors.primaryRed};
    border-radius: 50%;
    padding: 15px;
    cursor: pointer;

    &::after {
        content: url(${arrow.src});
    }
    &:hover {
        background-color: rgba(133, 133, 132, 0.5);
        &::after {
            content: url(${redArrow.src});
        }
    }
`
