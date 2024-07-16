import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";
import { showDate } from "../../helper/helperfunction";
import classes from "./ShowTask.module.css";
import inputclasses from "./CreateTask.module.css";
import { useMutation, useQueryClient ,useQuery } from "@tanstack/react-query";
import { apiShareTask ,apiGetTaskUser } from "../../services/Taskservice";
import { useSelector, useDispatch } from "react-redux";
import { setTasks } from "../../store/TaskSlice";
import { useEffect, useState } from "react";

const ShareTask = ({ SelectedTask, closeSharebox, open, users ,user}) => {
  const queryClient = useQueryClient();
  const [sharedUser, setSharedUser] = useState([]);
  const  usersList = users;
  const [filter, setFilter] = useState("");
  const task = SelectedTask?.task;
  
   const {isFetching: isloading,

  } = useQuery({
    queryKey: ["TaskUser", task._id,user.id] ,
    queryFn: async () =>  await apiGetTaskUser(task._id ,user.id),
    staleTime: 1000 * 60 * 60 * 24,
  });
  const fetchTaskUser = async () => {
    try {
      const data = await queryClient.ensureQueryData({
        queryKey: ["TaskUser", task._id ,user.id],
        queryFn:async () => await apiGetTaskUser(task._id ,user.id)
      });
      // console.log("fetch tasksharedUserlist", data);
      setSharedUser(data);
    } catch (e) {
      console.log("error fetching Task " ,e?.message);
    }
  };
  const saveTask = useMutation({
    mutationFn: async () => { 
      return await apiShareTask(task._id, sharedUser);
    },
    onSuccess: async (data) => {
      console.log(data);
      queryClient.setQueryData(["TaskUser", task._id,user.id], data);
      setSharedUser(data);
      closeSharebox();
    },
    onError: (error) => {
      console.log(error);
      throw new Error(error, "unable to update Task mutation errror");
    },
  });
  const addToSharedList = (user) => {
    const index = sharedUser.findIndex((u) => u._id === user._id);
    if (index === -1) {
      setSharedUser((prev) => [...prev, user]);
    }
    
  };
  const removeFromSharedList = (user) => {
    const temp=[...sharedUser];
    const removeindex = temp.findIndex((u) => u._id === user._id);
    if (removeindex !== -1) {
      temp.splice(removeindex, 1);
    }
    setSharedUser(temp);
  };
 
  useEffect(()=>{
    fetchTaskUser();
  },[])
  return (
    <>
      <Dialog
        size="sm"
        open={open}
        handler={() => closeSharebox()}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="px-10 py-5 "
      >
        <DialogHeader className="font-sansitems-center mb-4 p-0 font-sans text-2xl font-bold leading-5">
          Task Details
        </DialogHeader>
        <DialogBody className="p-0 ">
          {task && (
            <div
              className={`relative mb-2 rounded border-2 px-2 text-black   shadow-md `}
            >
              <div className="sticky top-0 flex justify-between bg-white">
                <div>
                  <p>Task Title: {task.TaskName}</p>
                  <div className=" my-2 h-fit rounded-xl bg-yellow-50 px-4 py-2 text-xs tracking-wider  text-yellow-800">
                    {task.TaskType}
                  </div>
                </div>
                <p>{showDate(task.DateTime)}</p>
              </div>
              <div className=" my-2   flex w-full  ">
                <div className="w-[50%]">
                  <label className="text-md font-sans  ">Add User</label>
                  <div className="flex flex-col">
                    <input
                      className={`${inputclasses.AddUserInput} border-2 text-sm focus:border-primary-500 `}
                      value={filter}
                      placeholder="User"
                      name="User"
                      onChange={(e) => setFilter(e.target.value)}
                    ></input>
                    <div
                      className={` ml-1  flex  h-[calc(100vh/4)] w-full  flex-col overflow-y-auto  ${classes.noscrollbar}`}
                    >
                      {usersList?.map((user) =>
                         user?.email?.includes(filter) && !sharedUser.some(u=>u._id ===user._id) ? (
                          <><div
                            className="cursor-pointer mx-4 hover:scale-110"
                            key={user._id}
                            onClick={() => addToSharedList(user)}
                          >
                            {user.email}
                           
                          </div>
                        
                           </>
                        ) : (
                          <></>
                        ),
                      )}
                    </div>
                    {/* {usersList.map(user=>( <option value={user.id} key={user.email}>{user.email}</option>))} */}
                  </div>
                </div>
                <div
                  className={` border-1  ml-1  flex h-[calc(100vh/3)]  w-[50%] flex-col overflow-y-auto rounded-md px-2 shadow-md  ${classes.noscrollbar}`}
                >
                  <div className="sticky top-0 flex w-full border-b-2 bg-white  pb-1">
                    {" "}
                    <label className="text-md sticky  top-0 font-sans  ">
                      Shared User{" "}
                    </label>
                    <div className="  mx-2 w-auto  rounded-xl bg-primary-350 p-1 px-4 text-xs tracking-wider  text-primary-800">
                      {sharedUser?.length}
                    </div>{" "}
                  </div>
                  {usersList?.map((user) => (
                    sharedUser.some(u=>u._id===user._id) ? (<div
                      className="cursor-pointer mx-4 hover:scale-110"
                      onClick={() => removeFromSharedList(user)}
                      key={user._id}
                    >
                      {user.email}
                    </div>
                    ) :<></>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              onClick={() => closeSharebox()}
              className="mr-1 rounded-md bg-black px-4 py-2 text-white shadow-md "
            >
              <span>Back</span>
            </Button>

            <Button
              disabled={!!saveTask.isPending}
              loading={!!saveTask.isPending}
              onClick={async () => {
                await saveTask.mutateAsync();
              
              }}
              className={`${!!saveTask.isPending ? " " : " "} rounded-md bg-primary-500 px-4 py-2 text-white shadow-md`}
            >
              <span>Save</span>
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default ShareTask;
