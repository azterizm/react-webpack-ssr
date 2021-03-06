import { FC, ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../styles/Profile.css';
import { User } from "../utils/mocks";

export const Profile: FC = () => {
  const [showUser, setShowUser] = useState<boolean>(false)

  let user: User | undefined
  let userDetails: ReactElement = <div id="details"></div>

  useEffect(() => {
    setTimeout(() => {
      setShowUser(true)
    }, 250);
  }, [])

  const handleLogout = () => {
    fetch('/account/logout', { method: "POST", })
      .then((data) => {
        if (data.ok && data.redirected && typeof window !== 'undefined')
          return window.location.href = '/profile'
      })
  }

  if (typeof window !== 'undefined') user = window.APP_STATE.user

  if (showUser) {
    userDetails = user ? (
      <div id="details">
        <h1>Hey, {user?.username}!</h1>
        <p>Your email address: {user?.email}</p>
        <button onClick={handleLogout}>Logout</button>
        <pre>{JSON.stringify(user)}</pre>
      </div>
    ) : (
        <div id="details">
          <h1>Not logged in.</h1>
          <Link to='/login'>Login</Link>
          <a href='account/login/facebook'>Connect with Facebook</a>
          <a href='account/login/google'>Connect with Google</a>
        </div>
      )
  } else {
    userDetails = (
      <div id="details">
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <div id="account">
      {userDetails}
    </div>
  )
}
