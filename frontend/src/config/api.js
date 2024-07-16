const API_BASE_URL = 'https://task-manager-backend-khaki.vercel.app';

export const loginURL = `${API_BASE_URL}/auth/login`;
export const SignupURL = `${API_BASE_URL}/auth/signup`;
export const VerifyToken = `${API_BASE_URL}/auth/protected`;
export const LogoutURL = `${API_BASE_URL}/auth/logout`;
export const CreateTaskURL = `${API_BASE_URL}/task/Create`;
export const GetTaskURL = `${API_BASE_URL}/task/show`;
export const UpdateTaskURL = `${API_BASE_URL}/task/edit`;
export const DeleteTaskURL = `${API_BASE_URL}/task/delete`;
export const GETALLUSER_URL = `${API_BASE_URL}/auth/users`;
export const SHARETASK_URL = `${API_BASE_URL}/task/share_task`;
export const TASKUSER_URL = `${API_BASE_URL}/task/taskUserList`;
