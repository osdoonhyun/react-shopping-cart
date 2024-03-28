type DetailId = {
  id: string;
};

export default function Detail({ id }: DetailId) {
  return <>Product Detail: {id}</>;
}
