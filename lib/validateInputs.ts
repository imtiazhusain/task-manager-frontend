import { ITask, ISignUpErrors, ISignUpInputs } from "@/app/interfaces";

export function isPasswordValid(password: string) {
  // Check for at least one uppercase letter
  const hasUpperCase = /[A-Z]/.test(password);

  // Check for at least one lowercase letter
  const hasLowerCase = /[a-z]/.test(password);

  // Check for any character that is not a letter or number, i.e., special characters
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

  // Ensure all conditions are met
  return hasUpperCase && hasLowerCase && hasSpecialChar;
}

export default function validateInputs(
  inputs: ISignUpInputs,
  setIsErrors: React.Dispatch<React.SetStateAction<ISignUpErrors>>
) {
  const newErrors: ISignUpErrors = {
    name: "",
    email: "",
    password: "",
    profilePic: "",
    confirmPassword: "",
  };
  if (!inputs.name) {
    newErrors.name = "Name is required";
  }
  if (inputs.name && inputs.name.length <= 2) {
    newErrors.name = "Name should be at least 3 characters";
  }

  if (!inputs.email) {
    newErrors.email = "Email is required";
  }

  if (!inputs.password) {
    newErrors.password = "Password is required";
  }
  if (inputs.password && inputs.password.length <= 7) {
    newErrors.password = "Password must have 7+ characters";
  }

  if (inputs.password && !isPasswordValid(inputs.password)) {
    newErrors.password =
      "Password must have  7+ chars, 1 uppercase, 1 lowercase, 1 special char";
  }

  if (!inputs.confirmPassword) {
    newErrors.confirmPassword = "Confirm Password is required";
  }

  if (
    inputs.password &&
    inputs.confirmPassword &&
    inputs.password != inputs.confirmPassword
  ) {
    newErrors.confirmPassword = "Passwords do not match!";
  }

  if (!inputs.profilePic) {
    newErrors.profilePic = "Please upload profile picture";
  }

  setIsErrors(newErrors);
  if (Object.values(newErrors).some((error) => error !== "")) {
    return true;
  }
  return false;
}

export function validatePostInputs(
  inputs: ITask,
  setIsErrors: React.Dispatch<React.SetStateAction<ITask>>
) {
  const newErrors: ITask = {
    description: "",
    status: "",
    title: "",
    dueDate: "",
  };
  if (!inputs.description) {
    newErrors.description = "Description is required";
  }

  if (!inputs.status) {
    newErrors.status = "Status is required";
  }

  if (!inputs.title) {
    newErrors.title = "Title is required";
  }

  if (!inputs.dueDate) {
    newErrors.dueDate = "Due date is required";
  }

  if (inputs.description && inputs.description.length <= 2) {
    newErrors.description = "description should be at least 3 characters";
  }

  setIsErrors(newErrors);
  if (Object.values(newErrors).some((error) => error !== "")) {
    return true;
  }
  return false;
}
