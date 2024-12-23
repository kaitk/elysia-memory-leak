# Elysia Memory Leak Example

This project demonstrates a memory leak  when handling large data payloads with Elysia and Bun.

## Tested on:

- Bun 1.42
- Elysia 1.1.27

## Available Endpoints

- `GET /large-data`: Generates a large JSON object with between 1000 - 100,000 randomly generated elements
- `GET /gc`: Triggers Bun's garbage collection (async)

## Memory Leak

There seems to be a memory leak issue when repeatedly hitting the `/large-data` endpoint:

- The memory usage increases progressively with each request
- Memory is not properly freed even after calling the garbage collection endpoint (`/gc`)
- Issue reproduced with Bun 1.42 and Elysia 1.1.27


1. Start the server (doesn't matter dev or prod)
2. Make multiple requests to `/large-data` either via browser or:
   ```bash
   curl -o /dev/null http://localhost:3000/large-data
   ```
3. Monitor memory usage increase
4. Try triggering GC:
   ```bash
   curl http://localhost:3000/gc
   ```
5. Memory usage remains largely unchanged. Repeat step 2. ...


## Installation

Clone the repository and install dependencies:

```bash
bun install
```

## Development

To start the development server:

```bash
bun run dev
```

The server will be available at http://localhost:3000

## Production Build

To create an optimized production binary:

```bash
bun build \
  --compile \
  --minify-whitespace \
  --minify-syntax \
  --target bun \
  --outfile server \
  ./src/index.ts
```

Run the compiled binary:

```bash
./server
```
