import { useState } from "react";

const Signup = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventdefault();
    // Signup();
  };

  return (
    <>
      <div> Signup </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={userData.username}
          placeholder="Username"
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
        ></input>
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

export default Signup;
