import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "src");
const dist = path.join(root, "dist");

await rm(dist, { force: true, recursive: true });
await mkdir(dist, { recursive: true });
await cp(source, dist, { recursive: true });

console.log("Built landing page.");
