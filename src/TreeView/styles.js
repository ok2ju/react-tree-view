import styled from "styled-components";

export const Tree = styled.div``;

export const Node = styled.div`
  margin-left: 16px;
  border-left: 1px dashed #999;
`;

export const Controls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out;

  svg {
    cursor: pointer;
    display: block;
    margin: 0 2px;
    fill: #999;

    &:hover {
      fill: #000
    }
  }
`;

export const NodeInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  &:hover {
    ${Controls} {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export const TogglerIconBox = styled.div`
  margin-left: 8px;

  svg {
    cursor: pointer;
    display: block;
    fill: #999;

    &:hover {
      fill: #000;
    }
  }
`;

export const Label = styled.p`
  cursor: pointer;
  font-size: 16px;
  font-weight: 300;
  margin: 8px 0px 8px 8px;
  padding: 0 8px;
  position: relative;

  ${({ selected }) => selected && `
    background-color: #fbfb;
  `}
`;

export const Content = styled.div`
  position: relative;
`;
