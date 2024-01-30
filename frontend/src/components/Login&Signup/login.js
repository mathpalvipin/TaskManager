import { useState } from "react";

const Login = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventdefault();
    // login ();
  };

  return (
    <>
      <div> login </div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={userData.email}
          placeholder="email"
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        ></input>

        <input
          type="password"
          name="password"
          value={userData.password}
          placeholder="password"
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        ></input>
        <button>Submit</button>
      </form>
    </>
  );
};

export default Login;
