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
export interface IGlobal {
  user: IUser | null;
  tasks: ITask[] | [];
}

export interface IActionType {
  type: string;
  payload?: IUser | ITask | null;
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
