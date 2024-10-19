// hooks/useUserData.js
import { useSession } from "next-auth/react";

const userUser = () => {
  const { data: session } = useSession();
  const userData = session?.user?.userData;

  return userData;
};

export default userUser;
