import React from "react";
import styles from "./Modal.module.css";
import { ReactDOM } from "react";
const BackDrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onHideCart}></div>;
};
const ModalOverLay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};
const locationElem = document.getElementById("overlay");
const Modal = (props) => {
  return (
    <>
      ReactDom.createPortal(<BackDrop onHideCart={props.onHideCart}></BackDrop>
      ,locationElem); ReactDom.createPortal(
      <ModalOverLay>{props.children}</ModalOverLay>
      ,locationElem)
    </>
  );
};
export default Modal;
