import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";
const MealItemForm = (props) => {
  const AmountInputRef = useRef();
  const [formValid, setFormValid] = useState(true);
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = AmountInputRef.current.value;
    // console.log(enteredAmount);
    const AmountNum = +enteredAmount;
    if (AmountNum == 0 || AmountNum < 1 || AmountNum > 5) {
      setFormValid(false);
      return;
    }
    props.addAmount(AmountNum);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={AmountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          defaultValue: "1",
          step: "1",
        }}
      />
      <button>+ Add</button>
      {!formValid && (
        <p style={{ color: "red" }}>*Please enter a valid amount</p>
      )}
    </form>
  );
};
export default MealItemForm;
