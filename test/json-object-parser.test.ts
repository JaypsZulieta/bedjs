import { BadRequestError } from "../src/errors/bad-request.error";
import { JsonObjectParser } from "../src/json-object-parser";

beforeEach(() => {
    jest.resetAllMocks();
});

describe("JsonObjectParser", () => {
    describe("getFullKeyName", () => {
        test("should return the name of the fullname of a key", () => {
            const jsonObjectParser = new JsonObjectParser({ name: "John Smith" }, "person");
            expect(jsonObjectParser.getString("fullName")).rejects.toThrow(
                "person.fullName must not be empty"
            );
        });
    });

    describe("getString", () => {
        test("should throw a BadRequestError when specifying a key that does not exist in the object", () => {
            const jsonObject = { section: "EPYC" } as any;
            const jsonObjectParser = new JsonObjectParser(jsonObject);
            expect(jsonObjectParser.getString("fullName")).rejects.toThrow(BadRequestError);
        });

        test("should have an error message of 'fullName must not be empty' when specifying a key that does not exist in the object", () => {
            const jsonObject = { section: "EPYC" } as any;
            const jsonObjectParser = new JsonObjectParser(jsonObject);
            expect(jsonObjectParser.getString("fullName")).rejects.toThrow(
                "fullName must not be empty"
            );
        });

        test("should throw a BadRequestError when the key specified is not of type string", () => {
            const jsonObject = { fullName: 123 } as any;
            const jsonObjectParser = new JsonObjectParser(jsonObject);
            expect(jsonObjectParser.getString("fullName")).rejects.toThrow(BadRequestError);
        });

        test("should throw an error message of 'keyname must be a string' when the key specified is not of type string", () => {
            const jsonObject = { fullName: 123 } as any;
            const jsonObjectParser = new JsonObjectParser(jsonObject);
            expect(jsonObjectParser.getString("fullName")).rejects.toThrow(
                "fullName must be a string"
            );
        });

        test("should return the string 'John Smith' when specifying the key 'fullName'", async () => {
            const jsonObject = { fullName: "John Smith" } as any;
            const jsonObjectParser = new JsonObjectParser(jsonObject);
            const fullName = await jsonObjectParser.getString("fullName");
            expect(fullName).toBe("John Smith");
        });
    });

    describe("getStringOptional", () => {
        test("should return undefined if the specified key does not exist in the object", () => {
            const jsonObject = { fullName: "jaypee" } as any;
            const jsonObjectParser = new JsonObjectParser(jsonObject);
            expect(jsonObjectParser.getStringOptional("lastname")).resolves.toBeUndefined();
        });

        test("should return 'Jaypee' if key specified is 'fullName'", async () => {
            const jsonObject = { fullName: "Jaypee" } as any;
            const jsonObjectParser = new JsonObjectParser(jsonObject);
            const fullname = await jsonObjectParser.getStringOptional("fullName");
            expect(fullname).toBe("Jaypee");
        });
    });

    describe("getStringArray", () => {
        test("should throw a BadRequestError if the body is undefined", () => {
            const jsonObjectParser = new JsonObjectParser(undefined);
            expect(jsonObjectParser.getStringArray()).rejects.toThrow(BadRequestError);
        });

        test("should throw an error with message of 'body must not be empty' if the body is undefined", () => {
            const jsonObjectParser = new JsonObjectParser(undefined);
            expect(jsonObjectParser.getStringArray()).rejects.toThrow("body must not be empty");
        });

        test("should throw a BadRequestError if the body is not an array of strings", () => {
            const jsonObject = {} as any;
            const jsonObjectParser = new JsonObjectParser(jsonObject);
            expect(jsonObjectParser.getStringArray()).rejects.toThrow(BadRequestError);
        });

        test("should throw an error with message of 'body must be an array of strings' if the body is not an array of strings", () => {
            const jsonObjectParser = new JsonObjectParser({});
            expect(jsonObjectParser.getStringArray()).rejects.toThrow(
                "body must be an array of strings"
            );
        });

        test("should return the array ['Hello, World', 'John Smith', 'Foo Bar'] when key is not specified", () => {
            const jsonObject = ["Hello, World", "John Smith", "Foo Bar"] as any;
            const jsonObjectParser = new JsonObjectParser(jsonObject);
            expect(jsonObjectParser.getStringArray()).resolves.toEqual([
                "Hello, World",
                "John Smith",
                "Foo Bar",
            ]);
        });

        test("should throw a BadRequestError if the key specified is not definded", () => {
            const jsonObjectParser = new JsonObjectParser({});
            expect(jsonObjectParser.getStringArray("keyWords")).rejects.toThrow(BadRequestError);
        });

        test("should throw a BadRequestError if the key specified is not an array of strings", () => {
            const jsonObjectParser = new JsonObjectParser({ keys: 123 });
            expect(jsonObjectParser.getStringArray("keys")).rejects.toThrow(BadRequestError);
        });

        test("should throw an error with message of 'keys must be an array of strings' if the key specified is otherwise", () => {
            const jsonObjectParser = new JsonObjectParser({ keys: 123 });
            expect(jsonObjectParser.getStringArray("keys")).rejects.toThrow(
                "keys must be an array of strings"
            );
        });

        test("should return the array ['John Smith', 'Foo Bar'] if the key is 'keyWords'", () => {
            const array = ["John Smith", "Foo Bar"];
            const jsonObject = { keyWords: array } as any;
            const jsonObjectParser = new JsonObjectParser(jsonObject);
            expect(jsonObjectParser.getStringArray("keyWords")).resolves.toEqual(array);
        });
    });

    describe("getStringArrayOptional", () => {
        test("should return undefined if the key specified is undefined", () => {
            const jsonObjectParser = new JsonObjectParser({});
            expect(jsonObjectParser.getStringArrayOptional("keys")).resolves.toBeUndefined();
        });

        test("should return ['Foo Bar', 'Fizz Buzz'] if the key specified is 'keys'", async () => {
            const keys = ["Foo Bar", "Fizz Buzz"];
            const jsonObjectParser = new JsonObjectParser({ keys });
            const array = await jsonObjectParser.getStringArrayOptional("keys");
            expect(array).toEqual(keys);
        });
    });

    describe("getNumber", () => {
        test("should throw a BadRequestError if the key specified is undefined", () => {
            const jsonObjectParser = new JsonObjectParser({});
            expect(jsonObjectParser.getNumber("number")).rejects.toThrow(BadRequestError);
        });

        test("should throw an error with message of 'number must not be empty'", () => {
            const jsonObjectParser = new JsonObjectParser({});
            expect(jsonObjectParser.getNumber("number")).rejects.toThrow(
                "number must not be empty"
            );
        });

        test("should throw a BadRequestError if the key specified is not a number", () => {
            const jsonObjectParser = new JsonObjectParser({
                number: "numbers",
            });
            expect(jsonObjectParser.getNumber("number")).rejects.toThrow(BadRequestError);
        });

        test("should throw an error with the message 'number must be a number'", () => {
            const jsonObjectParser = new JsonObjectParser({
                number: "numbers",
            });
            expect(jsonObjectParser.getNumber("number")).rejects.toThrow("number must be a number");
        });

        test("should return 4 if the specified key is number", () => {
            const jsonObjectParser = new JsonObjectParser({ number: 4 });
            expect(jsonObjectParser.getNumber("number")).resolves.toBe(4);
        });
    });

    describe("getNumberOptional", () => {
        test("should return undefined if the specified key does not exist in the object", () => {
            const jsonObjectParser = new JsonObjectParser({ name: 123 });
            expect(jsonObjectParser.getNumberOptional("number")).resolves.toBeUndefined();
        });

        test("should return 123 if the key specified is 'number'", () => {
            const jsonObjectParser = new JsonObjectParser({ number: 123 });
            const number = jsonObjectParser.getNumberOptional("number");
            expect(number).resolves.toBe(123);
        });
    });

    describe("getNumberArray", () => {
        test("should throw a BadRequestError if the body is not an array if given no key", () => {
            const jsonObjectParser = new JsonObjectParser({});
            expect(jsonObjectParser.getNumberArray()).rejects.toThrow(BadRequestError);
        });

        test("should throw an error with the message 'body must be an array of numbers' if given no key", () => {
            const jsonObjectParser = new JsonObjectParser({});
            expect(jsonObjectParser.getNumberArray()).rejects.toThrow(
                "body must be an array of numbers"
            );
        });

        test("should return the array [69, 420] if given no key", () => {
            const nice = [69, 420];
            const jsonObjectParser = new JsonObjectParser(nice as any);
            expect(jsonObjectParser.getNumberArray()).resolves.toEqual(nice);
        });

        test("should throw a BadRequestError if the key does not exist in the object", () => {
            const jsonObjectParser = new JsonObjectParser({});
            expect(jsonObjectParser.getNumberArray("number")).rejects.toThrow(BadRequestError);
        });

        test("should throw an error with a message of 'number must not be empty' if the key is 'number'", () => {
            const jsonObjectParser = new JsonObjectParser({});
            expect(jsonObjectParser.getNumberArray("number")).rejects.toThrow(
                "number must not be empty"
            );
        });

        test("should throw a BadRequestError if the value of the key is not an array of numbers'", () => {
            const jsonObjectParser = new JsonObjectParser({
                nice: ["Foo", "Bar"],
            });
            expect(jsonObjectParser.getNumberArray("nice")).rejects.toThrow(BadRequestError);
        });

        test("should throw an error with the messaage of 'nice must be an array of numbers'", () => {
            const jsonObjectParser = new JsonObjectParser({
                nice: ["Foo", "Bar"],
            });
            expect(jsonObjectParser.getNumberArray("nice")).rejects.toThrow(
                "nice must be an array of numbers"
            );
        });

        test("should return the array [69, 420] if given the key 'nice'", () => {
            const nice = [69, 420];
            const jsonObjectParser = new JsonObjectParser({ nice } as any);
            expect(jsonObjectParser.getNumberArray("nice")).resolves.toEqual(nice);
        });
    });

    describe("getNumberArrayOptional", () => {
        test("should return undefined if the key does not exist in the object", () => {
            const jsonObjectParser = new JsonObjectParser({});
            expect(jsonObjectParser.getNumberArrayOptional("nice")).resolves.toBeUndefined();
        });

        test("should return [69, 420] given the key 'nice'", () => {
            const nice = [69, 420];
            const jsonObjectParser = new JsonObjectParser({ nice });
            expect(jsonObjectParser.getNumberArray("nice")).resolves.toEqual(nice);
        });
    });

    describe("getBoolean", () => {
        test("should throw a BadRequestError if the specified key is undefined", () => {
            const jsonObjectParser = new JsonObjectParser({});
            expect(jsonObjectParser.getBoolean("isAdmin")).rejects.toThrow(BadRequestError);
        });

        test("should throw an error with message of 'isAdmin must not be empty' if the specified key is undefined", () => {
            const jsonObjectParser = new JsonObjectParser({});
            expect(jsonObjectParser.getBoolean("isAdmin")).rejects.toThrow(
                "isAdmin must not be empty"
            );
        });

        test("should throw a BadRequestError if the specified key is not a boolean", () => {
            const jsonObjectParser = new JsonObjectParser({ isAdmin: "key" });
            expect(jsonObjectParser.getBoolean("isAdmin")).rejects.toThrow(BadRequestError);
        });

        test("should throw an error with message of 'isAdmin must be a boolean' if specified key is not a boolean", () => {
            const jsonObjectParser = new JsonObjectParser({ isAdmin: "123" });
            expect(jsonObjectParser.getBoolean("isAdmin")).rejects.toThrow(
                "isAdmin must be a boolean"
            );
        });

        test("should return true if the specified key is isAdmin", () => {
            const jsonObjectParser = new JsonObjectParser({ isAdmin: true });
            expect(jsonObjectParser.getBoolean("isAdmin")).resolves.toBe(true);
        });
    });

    describe("getBooleanOptional", () => {
        test("should return undefined if the specified key is undefined", () => {
            const jsonObjectParser = new JsonObjectParser({});
            expect(jsonObjectParser.getBooleanOptional("isAdmin")).resolves.toBeUndefined();
        });

        test("should return true if the specified key is isAdmin", () => {
            const jsonObjectParser = new JsonObjectParser({ isAdmin: true });
            expect(jsonObjectParser.getBooleanOptional("isAdmin")).resolves.toBe(true);
        });
    });

    describe("getObject", () => {
        test("should throw a BadRequestError if the specified key is not defined", () => {
            const jsonObjectParser = new JsonObjectParser({});
            expect(jsonObjectParser.getObject("item")).rejects.toThrow(BadRequestError);
        });

        test("should throw an error with message of 'item must not be empty' when the specified key is not defined", () => {
            const jsonObjectParser = new JsonObjectParser({});
            expect(jsonObjectParser.getObject("item")).rejects.toThrow("item must not be empty");
        });

        test("should throw a BadRequestError if the specified key is not an Object", () => {
            const jsonObjectParser = new JsonObjectParser({ item: "Banana" });
            expect(jsonObjectParser.getObject("item")).rejects.toThrow(BadRequestError);
        });

        test("should throw an error with message of 'item must be an object' if specified key is not an object", () => {
            const jsonObjectParser = new JsonObjectParser({ item: "Banana" });
            expect(jsonObjectParser.getObject("item")).rejects.toThrow("item must be an object");
        });

        test("should return a JsonObjectParser if the specified key is an object", () => {
            const jsonObjectParser = new JsonObjectParser({
                item: { name: "Banana", inStock: true },
            });
            expect(jsonObjectParser.getObject("item")).resolves.toBeInstanceOf(JsonObjectParser);
        });
    });

    describe("getObjectOptional", () => {
        test("should return undefined if the specified key is not defined", () => {
            const jsonObjectParser = new JsonObjectParser({});
            expect(jsonObjectParser.getObjectOptional("item")).resolves.toBeUndefined();
        });

        test("should return an instance of JsonObjectParser if the specified key is defined", () => {
            const jsonObjectParser = new JsonObjectParser({
                item: { name: "Banana", inStock: true },
            });
            expect(jsonObjectParser.getObjectOptional("item")).resolves.toBeInstanceOf(
                JsonObjectParser
            );
        });
    });
});
