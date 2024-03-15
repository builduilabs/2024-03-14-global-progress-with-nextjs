export default async function Page({ params }: { params: { id: string } }) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return <p>Post {params.id}</p>;
}
