import { statSync } from "node:fs";
import path from "node:path";
import { expect, test } from "vitest";
import { contact } from "./contact";

test("the CV label states the size of the file it links to", () => {
  const bytes = statSync(path.join(process.cwd(), "public", contact.cv.href)).size;
  const kb = Math.round(bytes / 1024);
  expect(contact.cvMeta).toContain(`${kb} KB`);
});
