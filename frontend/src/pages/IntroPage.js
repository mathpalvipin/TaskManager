import { NavLink } from "react-router-dom";

const IntroPage = () => {
  return (
    <> 
    <NavLink to='/app/home'>home</NavLink>
    <NavLink to='/auth/login'>login</NavLink>
      <div>IntroPage</div>{" "}
    </>
  );
};
export default IntroPage;
