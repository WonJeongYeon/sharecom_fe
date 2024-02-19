import styled from "styled-components";

const CustomModalContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    
    width: ${(props) => props.width + 'px'};
    height: ${(props) => props.height + 'px'};
    

    padding: 40px;

    text-align: center;

    
    border-radius: ${(props) => props.radius===undefined? '5px' : props.radius+'px'};
    box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);

    transform: translateX(-50%) translateY(-50%);
    overflow-y: scroll;
  
`;

export default CustomModalContainer;
