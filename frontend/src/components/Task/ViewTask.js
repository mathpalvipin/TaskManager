import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  select,
} from "@material-tailwind/react";
import { showDate } from "../../helper/helperfunction";
const ViewTask = ({ SelectedTask, closeViewbox, open, deleteTask }) => {
  const task = SelectedTask?.task;
  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={() => closeViewbox()}
        animate={{
          mount: { scale:    1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="px-10 py-5 "
      >
        <DialogHeader className="font-sansitems-center mb-4 p-0 font-sans text-2xl font-bold leading-5">
          Task Details
        </DialogHeader>
        <DialogBody className="p-0 ">
          {task && (
            <div className="mb-2 rounded border-2 p-2 text-black shadow-md">
              <p>Task Title: {task.TaskName}</p>
              <div className=" mt-4 flex w-full justify-between px-10   ">
                <div className="mb-1 mr-2 h-fit rounded-xl bg-yellow-50 px-4 py-2 text-xs tracking-wider  text-yellow-800">
                  {task.TaskType}
                </div>
                <p>{showDate(task.DateTime)}</p>
              </div>
            </div>
          )}
          <div className="flex justify-end">
            <Button
              onClick={() => closeViewbox()}
              className="mr-1 rounded-md bg-black px-4 py-2 text-white shadow-md "
            >
              <span>Back</span>
            </Button>

            <Button
              disabled={!!deleteTask.isPending}
              loading={!!deleteTask.isPending}
              onClick={async() => {
               await deleteTask.mutateAsync({ id: SelectedTask._id });
                closeViewbox();
              }}
              className={`${!!deleteTask.isPending ? " " : " "} text-white rounded-md bg-danger-550 px-4 py-2 shadow-md`}
            >
              <span>Delete</span>
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default ViewTask;
