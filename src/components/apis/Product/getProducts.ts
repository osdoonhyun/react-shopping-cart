export const getProducts = async () => {
  const response = await fetch('/products');
  const data = await response.json();

  return data;
};
