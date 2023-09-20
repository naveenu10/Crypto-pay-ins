import styled from "styled-components";

export const Layout = styled.div`
  height: 928px;
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
  font-family: "Inter";
  overflow: hidden;
  @media (max-width: 1600px) {
    height: 853px;
  }
}
`;

export const MobileContainer = styled.div`
height: 926px;
width: 428px;
position: relative;
@media (max-width: 1600px) {
  height: 850px;
}
`;
