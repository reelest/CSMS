import pool from "@/shared/utils/request_pool";

test("should pool requests", async function () {
  let i = 0;
  let pako = pool(async function () {
    return ++i;
  });
  await pako();
  expect(i).toEqual(1);
  await pako();
  expect(i).toEqual(1);
});
