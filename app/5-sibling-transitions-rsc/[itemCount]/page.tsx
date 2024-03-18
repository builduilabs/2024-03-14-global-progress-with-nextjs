export default async function Page({
  params,
}: {
  params: { itemCount: string };
}) {
  let count = +params.itemCount;

  return (
    <div className="border p-1">
      <p className="text-green-400 text-sm font-medium">Server component</p>

      <div className="mt-1">
        {Array.from(Array(count).keys()).map((i) => (
          <div key={i}>
            <SlowComponent />
          </div>
        ))}
      </div>
    </div>
  );
}

async function SlowComponent() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return <p>Slow component</p>;
}
