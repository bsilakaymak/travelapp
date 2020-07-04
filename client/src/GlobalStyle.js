import { createGlobalStyle } from 'styled-components'
const GlobalStyle = createGlobalStyle`
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Gothic A1', sans-serif;
}

svg {
    position: absolute;
    z-index: -1;
    background: #244384;
    right: 0;
    top:0;
    bottom: 0;
    height:100%
}
#root{
    height:calc(100vh - 48px);
}
`
export default GlobalStyle
