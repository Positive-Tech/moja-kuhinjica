import styled from 'styled-components'
import arrow from '../../../public/static/assets/images/arrow.svg'
import redArrow from '../../../public/static/assets/images/redArrow.svg'

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
        content: url(${redArrow.src});
    }
`
