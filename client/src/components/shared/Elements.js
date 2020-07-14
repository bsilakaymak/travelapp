import styled from 'styled-components'
export const Divider = styled.div`
    background: ${(props) => {
        if (props.dark) {
            return `#343a40;`
        } else if (props.gray) {
            return `#6c757d33;`
        } else if (props.info) {
            return `#17a2b8;`
        } else if (props.primary) {
            return `#007bff;`
        } else {
            return '#8a8787;'
        }
    }};
    width: ${({ width }) => (width ? width : '92%')};
    margin: auto;
    margin: ${(props) => props.margin};
    margin-top: ${(props) => props.marginTop};
    margin-right: ${(props) => props.marginRight};
    margin-bottom: ${(props) => props.marginBottom};
    margin-left: ${(props) => props.marginLeft};
    height: 1px;
    border-radius: 10px;
`
export const Button = styled.button`
    ${(props) => {
        if (props.darkGray) {
            return `background-color:rgba(0,0,0,.75);;
           color:white;`
        } else if (props.red) {
            return `background-color:#e84118;
            color:white;`
        } else if (props.gray) {
            return `background-color:gray;
            color:white;`
        } else {
            return `background-color:#3f51b5;
         color:white;`
        }
    }};
    border: none;

    padding: 10px 10px;
    margin: ${(props) => props.margin};
    margin-top: ${({ marginTop }) => (marginTop ? marginTop : '0.5rem')};
    margin-right: ${(props) => props.marginRight};
    margin-bottom: ${({ marginBottom }) =>
        marginBottom ? marginBottom : '0.5rem'};
    margin-left: ${(props) => props.marginLeft};
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    outline: none;
    width: ${(props) => (props.small ? '150px' : '100%')};
    @media (max-width: 576px) {
        width: 100%;
    }
    cursor: pointer;
    font-size: ${(props) => props.fontSize};
    position: relative;
    z-index: 1;
    float: ${(props) => props.right && 'right'};
    &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        top: 0;
        left: 0;
        z-index: -1;
        transition: 300ms ease-in;
        transform: scaleX(0);
        transform-origin: left;
    }
    &:hover::after {
        transform: scaleX(1);
        transform-origin: right;
    }
`
export const Card = styled.div`
    background: #fff;
    border-radius: 2px;
    display: inline-block;
    margin: ${(props) => props.margin};
    margin-top: ${(props) => props.marginTop};
    margin-right: ${(props) => props.marginRight};
    margin-bottom: ${(props) => props.marginBottom};
    margin-left: ${(props) => props.marginLeft};
    position: relative;
    padding: 1.2rem;
    width: 100%;
    background: ${(props) => props.background};
    box-shadow: 0 0px 0px rgba(0, 0, 0, 0.19), 0 0px 7px rgba(0, 0, 0, 0.23);
    text-align: ${(props) => props.textAlign};
`
export const Title = styled.h4`
    text-align: ${(props) => props.center && 'center'};
    margin: ${(props) => props.margin};
    margin-top: ${(props) => props.marginTop};
    margin-right: ${(props) => props.marginRight};
    margin-bottom: ${(props) => props.marginBottom};
    margin-left: ${(props) => props.marginLeft};
`
export const Image = styled.img`
    width: 100%;
`
export const Holder = styled.div`
    display: flex;
    flex-direction: ${({ direction }) => (direction ? direction : 'column')};
    width: ${({ width }) => (width ? width : '100%')};
    height: ${(props) => props.height};
    margin-left: ${(props) => props.ml};
    margin-right: ${(props) => props.mr};
    margin-top: ${(props) => props.mt};
    justify-content: ${({ justifyContent }) => justifyContent};
    @media (min-width: 576px) {
        margin-top: ${(props) => props.sm_mt};
    }
    @media (min-width: 768px) {
        width: ${(props) => props.md_width};
        margin-top: ${(props) => props.md_mt};
    }
    @media (min-width: 992px) {
    }
    @media (min-width: 1200px) {
    }
`
export const Icon = styled.i`
    font-size: ${(props) => props.size};
    cursor: pointer;
    float: ${({ float }) => float};
    color: ${(props) => props.color};
    margin: ${(props) => props.margin};
    margin-right: ${(props) => props.mr};
    @media (max-width: 576px) {
        font-size: 22px;
        margin-top: ${(props) => props.mr_s};
    }
`
