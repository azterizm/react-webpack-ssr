import { FC } from "react";

export const Login: FC<{}> = ({}) => {
  let flash: Flash = {}

  if (typeof window !== 'undefined') flash = window.APP_STATE.flash

  const flashMessage = flash && flash.success ? (
        <p style={{ color: "green" }}>{flash.success}</p>
      ) : (
        <p style={{ color: "red" }}>{flash.error}</p>
      )

  return (
    <form id='account' action="/account/login" method='post'>
      <label htmlFor="username">Username: </label>
      <input type="username" name="username" id="usernameInput" />
      <label htmlFor="password">Password: </label>
      <input type="password" name="password" id="passwordInput" />
      <button type="submit">Submit</button>
      {flashMessage}
    </form>
  )
}
