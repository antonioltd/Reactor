export const signIn = (userId, basicProfile) => {
  return { type: "SIGN_IN", payload: { userId, basicProfile } };
};

export const signOut = userId => {
  return { type: "SIGN_OUT", payload: userId };
};
