const Callproduct = async (slug, token) => {
  const data = await fetch(`http://localhost:3000/product/${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
  });
  return await data;
};
export { Callproduct };
