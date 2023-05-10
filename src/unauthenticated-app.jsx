import { Route, Routes } from "react-router-dom";
import { Home } from "./screens/Home";
import { About } from "./screens/About";
import { Contact } from "./screens/ContactUs";
import { Services } from "./screens/Services";
import { Login } from "./screens/Login";
import { NoMatch } from "./screens/NoMatch";


export const UnauthenticatedApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="services" element={<Services />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};
