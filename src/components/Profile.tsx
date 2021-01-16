import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { assignUser, clearUser } from "../state/userSlice";
import '../styles/Profile.css'

export const Profile: FC = () => {
  const [name, setName] = useState<string>('')
  const dispatch = useDispatch()

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
      <input type="text" name="name" id="profileName"
        value={name} onChange={e => setName(e.target.value)}
      />
      <button onClick={handleChange}>Change</button>
      <button onClick={handleClear}>Clear User</button>
    </div>
  )
}
