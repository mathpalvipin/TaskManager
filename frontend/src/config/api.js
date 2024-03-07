const API_BASE_URL = 'http://localhost:5000';

export const loginURL = `${API_BASE_URL}/auth/login`;
export const SignupURL = `${API_BASE_URL}/auth/signup`;
export const VerifyToken = `${API_BASE_URL}/auth/protected`;
export const LogoutURL = `${API_BASE_URL}/auth/logout`;
export const CreateTaskURL = `${API_BASE_URL}/task/Create`;
export const GetTaskURL = `${API_BASE_URL}/task/show`;
export const UpdateTaskURL = `${API_BASE_URL}/task/edit`;