import { toast } from "sonner";
import axios from "axios";

const handleError = (error) => {
  console.log(error);

  if (axios.isAxiosError(error)) {
    // Handle Axios-specific error
    console.error("Error :", error?.message);

    if (error?.response?.data?.message) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } else if (error?.message) {
      toast.error(error?.message || "Something went wrong");
    } else {
      toast.error("Something went wrong please refresh the page");
    }
  } else {
    // Handle unexpected errors
    console.error("Unexpected error:", error);
  }
};

export default handleError;
