import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";
import { showDate } from "../../helper/helperfunction";
const ViewTask = ({ SelectedTask, closeViewbox, open }) => {
   
  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={() => closeViewbox()}
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
          {SelectedTask && (
            <div className="rounded border-2 p-2 mb-2 shadow-md text-black">
              <p>Task Title: {SelectedTask.TaskName}</p>
              <div className=" mt-4 flex w-full justify-between px-10   ">
                <div className="mb-1 mr-2 h-fit rounded-xl bg-yellow-50 px-4 py-2 text-xs tracking-wider  text-yellow-800">
                  {SelectedTask.TaskType}
                </div>
                <p>{showDate(SelectedTask.DateTime)}</p>
              </div>
            </div>
          )}
          <div className="flex justify-end">
            <Button
              variant="text"
              color="red"
              onClick={() => closeViewbox()}
              className="mr-1"
            >
              <span>Back</span>
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default ViewTask;
