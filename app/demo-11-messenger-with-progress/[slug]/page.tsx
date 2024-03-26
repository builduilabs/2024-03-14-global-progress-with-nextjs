export default async function Page({ params }: { params: { slug: string } }) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return <p>Page {params.slug}</p>;
}
