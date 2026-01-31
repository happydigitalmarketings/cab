export const getJWTConfig = () => {
  return {
    SECRET: process.env.JWT_SECRET,
    EXPIRES_IN: "7d",
  };
};