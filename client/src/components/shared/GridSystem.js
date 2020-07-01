import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: ${(props) => props.mb};
  &@media (min-width: 576px) {
    max-width: 540px;
  }
  &@media (min-width: 768px) {
    max-width: 720px;
  }
  &@media (min-width: 992px) {
    max-width: 960px;
  }
  &@media (min-width: 1200px) {
    max-width: 1140px;
  }
`;
export const Row = styled.div`
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  justify-content: ${({ center }) => center && 'center'};
`;
export const Grid = styled.div`
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  text-align: ${(props) => props.center && 'center'};
  @media (min-width: 576px) {
    ${(props) => {
      if (props.sm === 3) {
        return `-ms-flex: 0 0 25%;
                flex: 0 0 25%;
                 max-width: 25%;`;
      } else if (props.sm === 4) {
        return `-ms-flex: 0 0 33.333333%;
                   flex: 0 0 33.333333%;
                  max-width: 33.333333%;`;
      } else if (props.sm === 6) {
        return `-ms-flex: 0 0 50%;
                   flex: 0 0 50%;
                   max-width: 50%;`;
      } else if (props.sm === 8) {
        return `  -ms-flex: 0 0 66.666667%;
                    flex: 0 0 66.666667%;
                    max-width: 66.666667%;`;
      } else if (props.sm === 9) {
        return `   -ms-flex: 0 0 75%;
        flex: 0 0 75%;
        max-width: 75%;`;
      } else if (props.sm === 12) {
        return `-ms-flex: 0 0 100%;
                   flex: 0 0 100%;
                  max-width: 100%;`;
      }
    }}
  }

  @media (min-width: 768px) {
    ${(props) => {
      if (props.md === 3) {
        return `-ms-flex: 0 0 25%;
                  flex: 0 0 25%;
                   max-width: 25%;`;
      } else if (props.md === 4) {
        return `-ms-flex: 0 0 33.333333%;
                     flex: 0 0 33.333333%;
                    max-width: 33.333333%;`;
      } else if (props.md === 6) {
        return `-ms-flex: 0 0 50%;
                     flex: 0 0 50%;
                     max-width: 50%;`;
      } else if (props.md === 8) {
        return `  -ms-flex: 0 0 66.666667%;
        flex: 0 0 66.666667%;
        max-width: 66.666667%;`;
      } else if (props.md === 9) {
        return `-ms-flex: 0 0 75%;
          flex: 0 0 75%;
          max-width: 75%;`;
      } else if (props.md === 12) {
        return `-ms-flex: 0 0 100%;
                     flex: 0 0 100%;
                    max-width: 100%;`;
      }
    }}
  }
  @media (min-width: 992px) {
    ${(props) => {
      if (props.lg === 3) {
        return `-ms-flex: 0 0 25%;
                    flex: 0 0 25%;
                     max-width: 25%;`;
      } else if (props.lg === 4) {
        return `-ms-flex: 0 0 33.333333%;
                       flex: 0 0 33.333333%;
                      max-width: 33.333333%;`;
      } else if (props.lg === 6) {
        return `-ms-flex: 0 0 50%;
                       flex: 0 0 50%;
                       max-width: 50%;`;
      } else if (props.lg === 8) {
        return `  -ms-flex: 0 0 66.666667%;
        flex: 0 0 66.666667%;
        max-width: 66.666667%;`;
      } else if (props.lg === 9) {
        return `
          -ms-flex: 0 0 75%;
          flex: 0 0 75%;
          max-width: 75%;`;
      } else if (props.lg === 12) {
        return `-ms-flex: 0 0 100%;
                       flex: 0 0 100%;
                      max-width: 100%;`;
      }
    }}
  }
  @media (min-width: 1200px) {
    ${(props) => {
      if (props.xl === 3) {
        return `-ms-flex: 0 0 25%;
                    flex: 0 0 25%;
                     max-width: 25%;`;
      } else if (props.xl === 4) {
        return `-ms-flex: 0 0 33.333333%;
                       flex: 0 0 33.333333%;
                      max-width: 33.333333%;`;
      } else if (props.xl === 6) {
        return `-ms-flex: 0 0 50%;
                       flex: 0 0 50%;
                       max-width: 50%;`;
      } else if (props.xl === 8) {
        return `  -ms-flex: 0 0 66.666667%;
        flex: 0 0 66.666667%;
        max-width: 66.666667%;`;
      } else if (props.xl === 9) {
        return `   -ms-flex: 0 0 75%;
          flex: 0 0 75%;
          max-width: 75%;`;
      } else if (props.xl === 12) {
        return `-ms-flex: 0 0 100%;
                       flex: 0 0 100%;
                      max-width: 100%;`;
      }
    }}
  }
`;
