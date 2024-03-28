type IdType = {
  id: string;
};

export const getProductDetail = async ({ id }: IdType) => {
  const response = await fetch(`/products/${id}`);
  const data = await response.json();

  return data;
};
