import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./form.module.css";
const Signup = () => {
  const { signUp } = useAuth();

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleSignUp = async (e) => {
    e.preventDefault();
    
    try {
      await signUp(userData);
      navigate("/app/home");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <div className="flex h-full  w-full justify-center pt-8">
        <div class="relative flex flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
          <h4 class="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            Sign Up
          </h4>
          <p class="mt-1 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
          Nice to meet you! Enter your details to register.
          </p>
          <form class="mb-2 mt-8 w-80 max-w-screen-lg sm:w-96">
            <div class="mb-1 flex flex-col gap-6">
              <h6 class="-mb-3 block font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900 antialiased">
                Your Name
              </h6>
              <div class="relative h-11 w-full min-w-[200px]">
                <input
                  placeholder="name@mail.com"
                  type="text"
                  name="name"
                  value={userData.username}
                  onChange={(e) =>
                    setUserData({ ...userData, username: e.target.value })
                  }
                  class="peer h-full w-full rounded-md border border-blue-gray-200 !border-t-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:!border-t-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                />
                <label class="before:content[' '] after:content[' '] pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-l before:border-t before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-r after:border-t after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-l-2 peer-focus:before:border-t-2 peer-focus:before:!border-gray-900 peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
              </div>
              <h6 class="-mb-3 block font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900 antialiased">
                Your Email
              </h6>
              <div class="relative h-11 w-full min-w-[200px]">
                <input
                  placeholder="name@mail.com"
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  class="peer h-full w-full rounded-md border border-blue-gray-200 !border-t-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:!border-t-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                />
                <label class="before:content[' '] after:content[' '] pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-l before:border-t before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-r after:border-t after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-l-2 peer-focus:before:border-t-2 peer-focus:before:!border-gray-900 peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
              </div>
              <h6 class="-mb-3 block font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900 antialiased">
                Password
              </h6>
              <div class="relative h-11 w-full min-w-[200px]">
                <input
                  type="password"
                  placeholder="********"
                  name="password"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  class="peer h-full w-full rounded-md border border-blue-gray-200 !border-t-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:!border-t-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                />
                <label class="before:content[' '] after:content[' '] pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-l before:border-t before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-r after:border-t after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-l-2 peer-focus:before:border-t-2 peer-focus:before:!border-gray-900 peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignUp}
              className=" mt-6 block w-full select-none  rounded-md 
              bg-primary-500  px-6  py-3 text-center align-middle font-sans text-xs font-bold uppercase
               text-white  shadow-md shadow-gray-900/10 transition-all hover:bg-primary-600 
             hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none 
              active:opacity-[0.85]  active:shadow-none disabled:pointer-events-none disabled:opacity-50"
            >
              sign up
            </button>
            <p class="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
              Don't have an account?
              <NavLink to="/auth/login">Sign In </NavLink>
            </p>
          </form>
        </div>
      </div>
      {/* <div className={classes.container}>
      <div className={classes.title}> Signup </div>
      <div >
      <form onSubmit={handleSubmit} className={classes.form}>
        <input className={classes.input}
          type="text"
          name="name"
          value={userData.username}
          placeholder="Username"
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
        ></input>
        <input className={classes.input}
          type="email"
          name="email"
          value={userData.email}
          placeholder="email"
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        ></input>

        <input className={classes.input}
          type="password"
          name="password"
          value={userData.password}
          placeholder="password"
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        ></input>
        <button  className={classes.button} type="Submit">Submit</button>
      </form>
      <div>
        {" "}
        Already have Accont Login{" "}
        <NavLink to="/auth/login">Click here </NavLink>
      </div>
      </div>
      </div> */}
    </>
  );
};

export default Signup;
