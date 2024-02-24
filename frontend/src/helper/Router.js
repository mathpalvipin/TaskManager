import { redirect } from "react-router-dom";

export const routeVerifiedUser = async () => {
  
  const User = sessionStorage.getItem("user");
  console.log(User);
  if (!!User) {
    return redirect('/app/home');  //user navigate inside component and redirect inside loader function of router
  }

 
 return 1;
};
export const routeNotVerifiedUser = async () => {
  


  const User = sessionStorage.getItem("user");
  // console.log(params + User);
// console.log(!User +"routeNotVerifiedUser"+"  hoomeloader");
// const url = new URL(request.url);

  if (!User) {
    return  redirect('/auth/login');  //user navigate inside component and redirect inside loader function of router
  }
 return 1;
};
