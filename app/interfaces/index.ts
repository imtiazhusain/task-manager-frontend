export interface IUser {
  _id: string;
  name: string;
  email: string;
  profilePic: string;
  accessToken: string;
}

export interface ITask {
  _id?: string;
  description: string;
  status: string;
  title: string;
  dueDate: string;
}
type Theme = "light" | "dark";
export interface IGlobal {
  user: IUser | null;
  tasks: ITask[] | [];
  theme: Theme;
}

// export interface IActionType {
//   type: string;
//   payload?: IUser | ITask | string | null;
// }

export interface IActionType<T = any> {
  type: string;
  payload?: T | null; // T can be any type, and we include null as an option
}
export interface ISignUpInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePic: File | null;
}

export interface ISignUpErrors {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePic: string;
}

export interface IEditUser {
  _id: string;
  name: string;
  email: string;
  profilePic: File | string | null;
  password: string;
}
