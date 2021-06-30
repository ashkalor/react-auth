import classes from "./ProfileForm.module.css";
import { useContext, useRef } from "react";
import { AuthContext } from "../../store/auth-context";
import { useHistory } from "react-router-dom";

const ProfileForm = () => {
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredPassword = passwordInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAWm6CgxA7VBMxeffhoormT768XxJ1DMdI",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          authCtx.token = res.json().idToken;
          history.replace("/");
        } else {
          throw new Error("Request Failed");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={passwordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
