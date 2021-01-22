import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignUser, clearUser } from "../state/userSlice";
import '../styles/Profile.css';
import MetaTags from "../utils/MetaTags";

export const Profile: FC = () => {
  const [name, setName] = useState<string>('')
  const dispatch = useDispatch()
  const reduxName = useSelector((state: { name: string }) => state.name)

  const handleChange = () => {
    if (!name) return
    dispatch(assignUser({ name }))
  }

  const handleClear = () => {
    if (!name) return
    dispatch(clearUser())
  }

  return (
    <div className="profile">
      <MetaTags title='Profile' description='profile' img='profile.png' />
      {reduxName && <h1>Redux Value: {reduxName}</h1>}
      <input type="text" name="name" id="profileName"
        value={name} onChange={e => setName(e.target.value)}
      />
      <button onClick={handleChange}>Change</button>
      <button onClick={handleClear}>Clear User</button>
    </div>
  )
}
