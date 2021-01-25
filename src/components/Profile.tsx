import { FC } from "react";
import { Link, useHistory } from "react-router-dom";
import '../styles/Profile.css';
import { User } from "../utils/mocks";

export const Profile: FC = () => {
  let user: User | undefined
  const history = useHistory()

  if (typeof window !== 'undefined') user = window.APP_STATE.user

  const handleLogout = () => {
    fetch('/account/logout', {
      method: "POST",
    })
    return history.push('/login')
  }

  return (
    <div id="account">
      { user ? (
        <div id="details">
          <h1>Hey, {user?.username}!</h1>
          <p>Your email address: {user?.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
          <div id="details">
            <h1>Not logged in.</h1>
            <Link to='/login'>Login</Link>
          </div>
        )}
    </div>
  )
}
