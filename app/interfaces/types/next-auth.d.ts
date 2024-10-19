import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    status: boolean;
    userData: {
      _id: string;
      email: string;
      name: string;
      profilePic: string;
      accessToken: string;
    };
  }
}
