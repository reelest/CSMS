import { Model } from "@/shared/models/lib/model";
import { setDoc } from "firebase/firestore";
const TestModel = new Model("test");

jest.mock("firebase/firestore", () => {
  const originalModule = jest.requireActual("firebase/firestore");
  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    setDoc: jest.fn(),
    updateDoc: jest.fn(),
    getDoc: jest.fn(),
    deleteDoc: jest.fn(),
    getDocs: jest.fn(),
    onSnapshot: jest.fn(),
    getCountFromServer: jest.fn(),
    runTransaction: jest.fn(),
    writeBatch: jest.fn(),
  };
});

jest.mock("firebase/auth", () => {
  const originalModule = jest.requireActual("firebase/auth");
  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    getAuth: jest.fn().mockReturnValue(true),
  };
});
test("should write to firestore", async function () {
  const m = TestModel.create();
  m.name = "hello";
  await m.save();
  expect(setDoc.mock.calls.length).toEqual(1);
  expect(setDoc.mock.calls[0][0]).toEqual(m._ref);
  expect(setDoc.mock.calls[0][1]).toEqual(m.data());
});
