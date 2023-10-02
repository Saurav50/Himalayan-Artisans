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

  const imgs = [
    "https://firebasestorage.googleapis.com/v0/b/himalayan-artisans.appspot.com/o/1.png?alt=media&token=35204cc3-3a8a-4080-983b-81d4fa105709",
    "https://firebasestorage.googleapis.com/v0/b/himalayan-artisans.appspot.com/o/2.png?alt=media&token=613ce8f5-7752-4adf-91ea-fbefb2e9b9b8",
    "https://firebasestorage.googleapis.com/v0/b/himalayan-artisans.appspot.com/o/3.png?alt=media&token=7c9e483f-13fd-4036-a71a-501db64c8e70",
    "https://firebasestorage.googleapis.com/v0/b/himalayan-artisans.appspot.com/o/4.png?alt=media&token=6d1304c7-f217-4e1f-8faf-d96ac357c487",
    "https://firebasestorage.googleapis.com/v0/b/himalayan-artisans.appspot.com/o/5.png?alt=media&token=aec0a6eb-ac6d-43a6-af15-c52a6c91a0cc",
    "https://firebasestorage.googleapis.com/v0/b/himalayan-artisans.appspot.com/o/6.png?alt=media&token=8ee874ee-f763-4cae-827c-3480cfe0ebf3",
    "https://firebasestorage.googleapis.com/v0/b/himalayan-artisans.appspot.com/o/7.png?alt=media&token=e0a83da9-dd39-466a-8178-03e3affbdfed",
    "https://firebasestorage.googleapis.com/v0/b/himalayan-artisans.appspot.com/o/8.png?alt=media&token=6abf60ed-f994-4592-bf0f-7888716ad725",
    "https://firebasestorage.googleapis.com/v0/b/himalayan-artisans.appspot.com/o/9.png?alt=media&token=29187c7b-1b00-41cb-9851-51508cdf8dfe",
    "https://firebasestorage.googleapis.com/v0/b/himalayan-artisans.appspot.com/o/10.png?alt=media&token=14ba2cb5-9ca2-4f89-abca-49678c67fbb3",
    "https://firebasestorage.googleapis.com/v0/b/himalayan-artisans.appspot.com/o/11.png?alt=media&token=5f5aa5c9-b2f8-4960-ab04-9c995fcb96f9",
    "https://firebasestorage.googleapis.com/v0/b/himalayan-artisans.appspot.com/o/12.png?alt=media&token=320376af-ea57-4195-984d-ce8872313e9d",
    "https://firebasestorage.googleapis.com/v0/b/himalayan-artisans.appspot.com/o/13.png?alt=media&token=5e2c1634-6cf3-4d4e-83df-d3634a297fa7",
    "https://firebasestorage.googleapis.com/v0/b/himalayan-artisans.appspot.com/o/14.png?alt=media&token=ec702542-5bff-4ce2-9a61-a25ed117d669",
    "https://firebasestorage.googleapis.com/v0/b/himalayan-artisans.appspot.com/o/15.png?alt=media&token=eed86d0b-2bd3-4d12-817c-30ef54b98146",
  ];

  return (
    <section className={styles.meals}>
      <ul>
        {meals.map((meal, index) => (
          <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            price={meal.price}
            description={meal.description}
            image={imgs[index]}
          />
        ))}
      </ul>
    </section>
  );
};

export default AvailableMeals;
