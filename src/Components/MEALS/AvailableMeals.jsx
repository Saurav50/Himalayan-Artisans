import React, { useEffect, useState } from "react";
import styles from "./AvailableMeals.module.css";

import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://himalayan-artisans-default-rtdb.firebaseio.com/Products.json"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch meals!");
      }
      const data = await response.json();

      const mealsArray = [];
      for (const i in data) {
        mealsArray.push({
          id: i,
          name: data[i].name,
          description: data[i].description,
          price: data[i].price,
        });
      }
      setMeals(mealsArray);
      setIsLoading(false);
    }

    fetchData().catch((error) => {
      setIsLoading(false);
      setHasError(error.message);
    });
  }, []);

  if (isLoading) {
    return <p className={styles.loading}>Loading...</p>;
  }
  if (hasError) {
    return <p className={styles.Error}>{hasError}</p>;
  }
  return (
    <section className={styles.meals}>
      <ul>
        {meals.map((meal) => (
          <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            price={meal.price}
            description={meal.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default AvailableMeals;
