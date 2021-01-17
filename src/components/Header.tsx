import { FC } from "react";
import { NavLink } from "react-router-dom";
import '../styles/Header.css'

export const Header:FC =() => (
  <ul id="header">
    <li className="pageLink">
      <NavLink exact to='/'>Home</NavLink>
    </li>
    <li className="pageLink">
      <NavLink to='/counter'>Counter</NavLink>
    </li>
    <li className="pageLink">
      <NavLink to='/profile'>Profile</NavLink>
    </li>
    <li className="pageLink">
      <NavLink to='/todos'>Todos</NavLink>
    </li>
  </ul>
)

