import { BadRequestError } from "../src/errors/bad-request.error";
import { JsonObjectParser } from "../src/json-object-parser";

beforeEach(() => {
    jest.resetAllMocks();
});

describe("JsonObjectParser", () => {
    describe("getFullKeyName", () => {
        test("should return the name of the fullKeyname of a key", () => {
            const jsonObjectParser = new JsonObjectParser(
                { name: "John Smith" },
                "person"
            );
            expect(jsonObjectParser.getString("fullName")).rejects.toThrow(
                "person.fullName must not be empty"
            );
        });
    });

    describe("getString", () => {
        test("should throw a BadRequestError when specifying a key that does not exist in the object", () => {
            const jsonObject = { section: "EPYC" } as any;
            const jsonObjectParser = new JsonObjectParser(jsonObject);
            expect(jsonObjectParser.getString("fullName")).rejects.toThrow(
                BadRequestError
            );
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
            expect(jsonObjectParser.getString("fullName")).rejects.toThrow(
                BadRequestError
            );
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
            expect(
                jsonObjectParser.getStringOptional("lastname")
            ).resolves.toBeUndefined();
        });

        test("should call the getString method if the key is defined", async () => {
            const jsonObject = { fullName: "Jaypee" } as any;
            const jsonObjectParser = new JsonObjectParser(jsonObject);
            JsonObjectParser.prototype.getString = jest.fn();
            await jsonObjectParser.getStringOptional("fullName");
            expect(JsonObjectParser.prototype.getString).toHaveBeenCalled();
        });
    });

    describe("getStringArray", () => {
        test("should throw a BadRequestError if the body is undefined", () => {
            const jsonObjectParser = new JsonObjectParser(undefined);
            expect(jsonObjectParser.getStringArray()).rejects.toThrow(
                BadRequestError
            );
        });

        test("should throw an error with message of 'body must not be empty' if the body is undefined", () => {
            const jsonObjectParser = new JsonObjectParser(undefined);
            expect(jsonObjectParser.getStringArray()).rejects.toThrow(
                "body must not be empty"
            );
        });

        test("should throw a BadRequestError if the body is not an array of strings", () => {
            const jsonObject = {} as any;
            const jsonObjectParser = new JsonObjectParser(jsonObject);
            expect(jsonObjectParser.getStringArray()).rejects.toThrow(
                BadRequestError
            );
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
            expect(jsonObjectParser.getStringArray("keyWords")).rejects.toThrow(
                BadRequestError
            );
        });

        test("should throw a BadRequestError if the key specified is not an array of strings", () => {
            const jsonObjectParser = new JsonObjectParser({ keys: 123 });
            expect(jsonObjectParser.getStringArray("keys")).rejects.toThrow(
                BadRequestError
            );
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
            expect(
                jsonObjectParser.getStringArray("keyWords")
            ).resolves.toEqual(array);
        });
    });

    describe("getStringOptional", () => {
        test("should return undefined if the key specified is undefined", () => {
            const jsonObjectParser = new JsonObjectParser({});
            expect(
                jsonObjectParser.getStringArrayOptional("keys")
            ).resolves.toBeUndefined();
        });

        test("should call getStringArray method if the key is defined", async () => {
            const jsonObjectParser = new JsonObjectParser({
                keys: ["Foo Bar", "Fizz Buzz"],
            });
            JsonObjectParser.prototype.getStringArray = jest.fn();
            await jsonObjectParser.getStringArrayOptional("keys");
            expect(
                JsonObjectParser.prototype.getStringArray
            ).toHaveBeenCalled();
        });
    });

    describe("getNumber", () => {
        test("should throw a BadRequestError if the key specified is undefined", () => {
            const jsonObjectParser = new JsonObjectParser({});
            expect(jsonObjectParser.getNumber("number")).rejects.toThrow(
                BadRequestError
            );
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
            expect(jsonObjectParser.getNumber("number")).rejects.toThrow(
                BadRequestError
            );
        });

        test("should throw an error with the message 'number must be a number'", () => {
            const jsonObjectParser = new JsonObjectParser({
                number: "numbers",
            });
            expect(jsonObjectParser.getNumber("number")).rejects.toThrow(
                "number must be a number"
            );
        });

        test("should return 4 if the specified key is number", () => {
            const jsonObjectParser = new JsonObjectParser({ number: 4 });
            expect(jsonObjectParser.getNumber("number")).resolves.toBe(4);
        });
    });
});
