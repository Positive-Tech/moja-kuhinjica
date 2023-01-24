import styled from 'styled-components'

export const WhiteButton = styled('button')`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border: 2px solid ${(props) => props.theme.colors.primaryRed};
    background: transparent;
    border-radius: 50%;
    cursor: pointer;
    svg {
        fill: ${(props) => props.theme.colors.primaryRed};
    }

    &:hover {
        background: ${(props) => props.theme.colors.primaryRed};
        svg {
            fill: white;
        }
    }
`
export const RedButton = styled('button')`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border: 2px solid ${(props) => props.theme.colors.primaryRed};
    background: ${(props) => props.theme.colors.primaryRed};
    border-radius: 50%;
    cursor: pointer;

    &:hover {
        background: transparent;
        svg {
            fill: ${(props) => props.theme.colors.primaryRed};
        }
    }
`

export const RedBackButton = styled('button')`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border: 2px solid ${(props) => props.theme.colors.primaryRed};
    background: ${(props) => props.theme.colors.primaryRed};
    border-radius: 50%;
    cursor: pointer;
    svg {
        transform: rotate(180deg);
        fill: white;
    }
    &:hover {
        background-color: rgba(133, 133, 132, 0.5);
        svg {
            fill: ${(props) => props.theme.colors.primaryRed};
        }
    }
`
export const RedNextButton = styled('button')`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border: 2px solid ${(props) => props.theme.colors.primaryRed};
    background: ${(props) => props.theme.colors.primaryRed};
    border-radius: 50%;
    cursor: pointer;
    svg {
        fill: white;
    }
    &:hover {
        background-color: rgba(133, 133, 132, 0.5);
        svg {
            fill: ${(props) => props.theme.colors.primaryRed};
        }
    }
`
