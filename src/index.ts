import { Elysia } from "elysia";

const generateLargeData = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
    description: `This is a detailed description for item ${i} with some extra text to increase payload size`,
    timestamp: new Date().toISOString(),
    metadata: {
      category: `Category ${i % 5}`,
      tags: Array.from({ length: 5 }, (_, j) => `tag-${i}-${j}`),
      stats: {
        views: Math.floor(Math.random() * 10000),
        likes: Math.floor(Math.random() * 1000),
        shares: Math.floor(Math.random() * 500),
      },
    },
  }));
};

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/gc", () => {
    Bun.gc(false);
    return "garbage collection intialized";
  })
  .get("/large-data", () => {
    // Generate 1000 items (adjust this number to change payload size)
    const data = generateLargeData(Math.floor(Math.random() * 100_000 + 1000));

    return {
      success: true,
      count: data.length,
      data,
    };
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
