import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import styles from "./MainNavigation.module.css";
import mealImage from "../../Assets/meals.jpg";
import HeaderButton from "./HeaderButton";

const MainNavigation = (props) => {
  const ctx = useContext(AuthContext);
  const logoutHandler = () => {
    ctx.logout();
  };
  return (
    <>
      <header className={styles.header}>
        <Link to="/">
          <div className={styles.logo}>Himalayan Artisans</div>
        </Link>
        <nav>
          <ul>
            {!ctx.isLoggedIn && (
              <li>
                <Link to="/auth">Login</Link>
              </li>
            )}
            {ctx.isLoggedIn && (
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            )}
            {ctx.isLoggedIn && (
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            )}
            <li>
              <HeaderButton onShowCart={props.onShowCart} />
            </li>
          </ul>
        </nav>
      </header>
      <div className={styles["main-image"]}>
        <img src={mealImage} alt="A table full of food items" />
      </div>
    </>
  );
};

export default MainNavigation;
