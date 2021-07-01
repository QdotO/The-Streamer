import React from 'react'
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import history from '../history';
const Modal = (props) =>  {
     const {header, content, actions: { primaryAction, secondaryAction}, onDismiss } = props;
     return ReactDOM.createPortal(
          <ModalBackground onClick={() => onDismiss()}>
               <ModalForeground onClick={(e)=> {e.stopPropagation()}}>
                    <Header>{header}</Header>
                    <Content>{content}</Content>
                    <Actions>
                         <Button primary onClick={() => {primaryAction.action()}}>
                              {primaryAction.text}
                         </Button>
                         <Button onClick={()=> {secondaryAction.action()}}>
                              {secondaryAction.text}
                         </Button>
                    </Actions>
               </ModalForeground>
          </ModalBackground>
     , document.querySelector('#modal'));
}

export default Modal

const ModalBackground = styled.div`
     background: rgba(0,0,0,.75);
     position: absolute;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
     display: flex;
     justify-content: center;
     align-items: center;

`;
const ModalForeground = styled.div`
     background: white;
     color: black;
     width: 50%;
     display: flex;
     flex-direction: column;
     border-radius: 5px;
     opacity: 1;
`;

const Header = styled.div`
border-bottom: 1px solid lightgrey; 
padding: 1rem 0 1rem 1rem;
font-weight: 700;

`;
const Content = styled.div`
padding: 1rem;
border-bottom: 1px solid lightgrey;
`;
const Actions = styled.div`
display: flex;
justify-content: flex-end;
`;

const Button = styled.button`
     padding: .5rem 1rem;
     margin: 1rem .5rem;
     border: transparent;
     border-radius: 3px;
     background: ${(props)=> props.primary ? "rgb(183, 76, 72)": "lightgrey"};
     color: ${(props)=> props.primary ? "white": "unset"};
`;