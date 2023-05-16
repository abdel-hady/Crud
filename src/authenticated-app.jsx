import { Route, Routes } from "react-router-dom";

import { Profile } from "./screens/Profile";
import { Users } from "./screens/Users";
import { AddUser } from "./screens/Users/AddUser";
import { EditUser } from "./screens/Users/EditUser";
import { NoMatch } from "./screens/NoMatch";

export const AuthenticatedApp = () => {
  return (
    <Routes>
      <Route path="profile" element={<Profile />} />
      <Route path="users" element={<Users />} />
      <Route path="add-user" element={<AddUser />} />
      <Route path="edit-user/:id" element={<EditUser />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};
