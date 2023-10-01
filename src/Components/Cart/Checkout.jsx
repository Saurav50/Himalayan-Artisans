import styles from "./Checkout.module.css";
import { useRef, useState } from "react";
const Checkout = (props) => {
  const [formInputsIsValid, setFormInputsIsValid] = useState({
    name: true,
    street: true,
    code: true,
    city: true,
  });

  const nameRef = useRef();
  const streetRef = useRef();
  const codeRef = useRef();
  const cityRef = useRef();

  const inputIsEmpty = (value) => {
    return value.trim() === "";
  };
  const isFiveChars = (value) => {
    return value.trim().length === 5;
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const userName = nameRef.current.value;
    const userStreet = streetRef.current.value;
    const userCode = codeRef.current.value;
    const userCity = cityRef.current.value;
    //checking validity
    const userNameIsValid = !inputIsEmpty(userName);
    const userStreetIsValid = !inputIsEmpty(userStreet);
    const userCityIsValid = !inputIsEmpty(userCity);
    const userCodeIsValid = isFiveChars(userCode);
    setFormInputsIsValid({
      name: userNameIsValid,
      street: userStreetIsValid,
      city: userCityIsValid,
      code: userCodeIsValid,
    });
    const formValid =
      userNameIsValid &&
      userCityIsValid &&
      userStreetIsValid &&
      userCodeIsValid;
    if (!formValid) {
      return;
    }
    props.onConfirm({
      name: userName,
      address: `${userStreet}, ${userCode} - ${userCity}`,
    });

    // console.log(userName, userStreet, userCity, userCode);
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <div
        className={`${styles.control} ${
          formInputsIsValid.name ? "" : styles.invalid
        }`}
      >
        <label htmlFor="name">Name</label>
        <input type="text" id="name" ref={nameRef} />
        {!formInputsIsValid.name && (
          <p className={styles["error-text"]}>Name can't be empty</p>
        )}
      </div>
      <div
        className={`${styles.control} ${
          formInputsIsValid.street ? "" : styles.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetRef} />
        {!formInputsIsValid.street && (
          <p className={styles["error-text"]}>Street can't be empty</p>
        )}
      </div>
      <div
        className={`${styles.control} ${
          formInputsIsValid.city ? "" : styles.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!formInputsIsValid.city && (
          <p className={styles["error-text"]}>City can't be empty</p>
        )}
      </div>
      <div
        className={`${styles.control} ${
          formInputsIsValid.code ? "" : styles.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={codeRef} />
        {!formInputsIsValid.code && (
          <p className={styles["error-text"]}>Postal Code must be of 5</p>
        )}
      </div>
      {/* TODO: Add a submit button */}
      <div className={styles.actions}>
        <button onClick={props.onClose}>Close</button>
        <button className={styles.submit} type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
};
export default Checkout;
