import { parseQuery } from "@/utils/createQuery";

const m = "Abcdefghijklmnopqrstuvwxyzyxwvutsrqponmlkjihgfedcba".repeat(5);

test("query size should not exceed 10kb", function () {
  expect(JSON.stringify(parseQuery(m).flat()).length).toBeLessThan(10 * 1024);
});
