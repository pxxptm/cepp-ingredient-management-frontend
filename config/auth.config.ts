export const authConfig = () => ({
  saltround: process.env.SALTROUND,
  ownerSecret: process.env.OWNER_SECRET,
});
