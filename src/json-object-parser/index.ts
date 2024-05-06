import { BadRequestError } from "../errors/bad-request.error";
import { z } from "zod";

/**
 * Class representing a JSON object parser.
 */
export class JsonObjectParser {
    /**
     * Create a JSON object parser.
     * @param {any} jsonObject - The JSON object to parse and validate.
     * @param {string} [parentObjectKey] - The key of the parent object, used for constructing full key names.
     */
    constructor(private jsonObject: any, private parentObjectKey?: string) {}

    /**
     * Get the full key name including the parent object key, if available.
     * @param {string} key - The key to append to the parent object key.
     * @returns {string} The full key name.
     */
    private getFullkeyName(key: string): string {
        if (!this.parentObjectKey) return key;
        const fullKeyName = `${this.parentObjectKey}.${key}`;
        return fullKeyName;
    }

    /**
     * Get a string value from the JSON object.
     * @param {string} key - The key of the string value.
     * @returns {Promise<string>} A promise resolving to the string value.
     * @throws {BadRequestError} Throws when the key is missing or the value is not a string.
     */
    async getString(key: string): Promise<string> {
        const value = this.jsonObject[key] as string;
        const fullKeyName = this.getFullkeyName(key);
        if (!value)
            throw new BadRequestError(`${fullKeyName} must not be empty`);
        const parseFailure = !(await z.string().safeParseAsync(value)).success;
        if (parseFailure)
            throw new BadRequestError(`${fullKeyName} must be a string`);
        return value;
    }

    /**
     * Get an optional string value from the JSON object.
     * @param {string} key - The key of the string value.
     * @returns {Promise<string | undefined>} A promise resolving to the string value or undefined if the key is missing.
     * @throws {BadRequestError} Throws when the value is not a string.
     */
    async getStringOptional(key: string): Promise<string | undefined> {
        const value = this.jsonObject[key] as string;
        if (!value) return undefined;
        return this.getString(key);
    }

    /**
     * Get a string array value from the JSON object.
     * @param {string} [key] - The key of the string array value.
     * @returns {Promise<string[]>} A promise resolving to the string array value.
     * @throws {BadRequestError} Throws when the key is missing or the value is not a valid string array.
     */
    async getStringArray(key?: string): Promise<string[]> {
        let value: string[];
        if (!key) {
            value = this.jsonObject as string[];
            if (value == undefined)
                throw new BadRequestError("body must not be empty");
            const parseFailure = !(
                await z.array(z.string()).safeParseAsync(value)
            ).success;
            if (parseFailure)
                throw new BadRequestError("body must be an array of strings");
            return value;
        }
        const fullKeyName = this.getFullkeyName(key as string);
        value = this.jsonObject[key] as string[];
        if (value == undefined)
            throw new BadRequestError(`${fullKeyName} must not be empty`);
        const parseFailure = !(await z.array(z.string()).safeParseAsync(value))
            .success;
        if (parseFailure)
            throw new BadRequestError(
                `${fullKeyName} must be an array of strings`
            );
        return value;
    }

    /**
     * Get an optional string array value from the JSON object.
     * @param {string} key - The key of the string array value.
     * @returns {Promise<string[] | undefined>} A promise resolving to the string array value or undefined if the key is missing.
     * @throws {BadRequestError} Throws when the value is not a valid string array.
     */
    async getStringArrayOptional(key: string): Promise<string[] | undefined> {
        const value = this.jsonObject[key] as string[];
        if (value == undefined) return undefined;
        return this.getStringArray(key);
    }

    /**
     * Get a number value from the JSON object.
     * @param {string} key - The key of the number value.
     * @returns {Promise<number>} A promise resolving to the number value.
     * @throws {BadRequestError} Throws when the key is missing or the value is not a number.
     */
    async getNumber(key: string): Promise<number> {
        const fullKeyName = this.getFullkeyName(key);
        const value = this.jsonObject[key] as number;
        if (value == undefined)
            throw new BadRequestError(`${fullKeyName} must not be empty`);
        const parseFailure = !(await z.number().safeParseAsync(value)).success;
        if (parseFailure)
            throw new BadRequestError(`${fullKeyName} must be a number`);
        return value;
    }

    /**
     * Get an optional number value from the JSON object.
     * @param {string} key - The key of the number value.
     * @returns {Promise<number | undefined>} A promise resolving to the number value or undefined if the key is missing.
     * @throws {BadRequestError} Throws when the value is not a number.
     */
    async getNumberOptional(key: string): Promise<number | undefined> {
        const value = this.jsonObject[key] as number;
        if (value == undefined) return undefined;
        return this.getNumber(key);
    }

    /**
     * Get a number array value from the JSON object.
     * @param {string} [key] - The key of the number array value.
     * @returns {Promise<number[]>} A promise resolving to the number array value.
     * @throws {BadRequestError} Throws when the key is missing or the value is not a valid number array.
     */
    async getNumberArray(key?: string): Promise<number[]> {
        let value: number[];
        if (!key) {
            value = this.jsonObject as number[];
            if (value == undefined)
                throw new BadRequestError("body must not be empty");
            const parseFailure = !(
                await z.array(z.number()).safeParseAsync(value)
            ).success;
            if (parseFailure)
                throw new BadRequestError("body must be an array of numbers");
            return value;
        }
        value = this.jsonObject[key] as number[];
        const fullKeyName = this.getFullkeyName(key);
        if (value == undefined)
            throw new BadRequestError(`${fullKeyName} must not be empty`);
        const parseFailure = !(await z.array(z.number()).safeParseAsync(value))
            .success;
        if (parseFailure)
            throw new BadRequestError(
                `${fullKeyName} must be an array of numbers`
            );
        return value;
    }

    /**
     * Get an optional number array value from the JSON object.
     * @param {string} key - The key of the number array value.
     * @returns {Promise<number[] | undefined>} A promise resolving to the number array value or undefined if the key is missing.
     * @throws {BadRequestError} Throws when the value is not a valid number array.
     */
    async getNumberArrayOptional(key: string): Promise<number[] | undefined> {
        const value = this.jsonObject[key];
        if (value == undefined) return undefined;
        return this.getNumberArray(key);
    }

    /**
     * Get a boolean value from the JSON object.
     * @param {string} key - The key of the boolean value.
     * @returns {Promise<boolean>} A promise resolving to the boolean value.
     * @throws {BadRequestError} Throws when the key is missing or the value is not a boolean.
     */
    async getBoolean(key: string): Promise<boolean> {
        const fullKeyName = this.getFullkeyName(key);
        const value = this.jsonObject[key] as boolean;
        if (value == undefined)
            throw new BadRequestError(`${fullKeyName} must not be empty`);
        const parseFailure = !(await z.boolean().safeParseAsync(value)).success;
        if (parseFailure)
            throw new BadRequestError(`${fullKeyName} must be a boolean`);
        return value;
    }

    /**
     * Get an optional boolean value from the JSON object.
     * @param {string} key - The key of the boolean value.
     * @returns {Promise<boolean | undefined>} A promise resolving to the boolean value or undefined if the key is missing.
     * @throws {BadRequestError} Throws when the value is not a boolean.
     */
    async getBooleanOptional(key: string): Promise<boolean | undefined> {
        const value = this.jsonObject[key] as boolean;
        if (value == undefined) return undefined;
        return this.getBoolean(key);
    }

    /**
     * Get an object value from the JSON object.
     * @param {string} key - The key of the object value.
     * @returns {Promise<JsonObjectParser>} A promise resolving to a new instance of JsonObjectParser representing the object value.
     * @throws {BadRequestError} Throws when the key is missing or the value is not a valid object.
     */
    async getObject(key: string): Promise<JsonObjectParser> {
        const fullKeyName = this.getFullkeyName(key);
        const value = this.jsonObject[key] as any;
        if (value == undefined)
            throw new BadRequestError(`${fullKeyName} must not be empty`);
        const parseFailure = !(await z.object({}).safeParseAsync(value))
            .success;
        if (parseFailure)
            throw new BadRequestError(`${fullKeyName} must be an object`);
        return new JsonObjectParser(value, key);
    }

    /**
     * Get an optional object value from the JSON object.
     * @param {string} key - The key of the object value.
     * @returns {Promise<JsonObjectParser | undefined>} A promise resolving to a new instance of JsonObjectParser representing the object value or undefined if the key is missing.
     * @throws {BadRequestError} Throws when the value is not a valid object.
     */

    async getObjectOptional(
        key: string
    ): Promise<JsonObjectParser | undefined> {
        const value = this.jsonObject[key] as any;
        if (value == undefined) return undefined;
        return this.getObject(key);
    }

    /**
     * Get an array of object values from the JSON object.
     * @param {string} [key] - The key of the array of object values.
     * @returns {Promise<JsonObjectParser[]>} A promise resolving to an array of JsonObjectParser instances representing the object array.
     * @throws {BadRequestError} Throws when the key is missing or the value is not a valid array of objects.
     */
    async getObjectArray(key?: string): Promise<JsonObjectParser[]> {
        let value: JsonObjectParser[];
        if (!key) {
            value = this.jsonObject as JsonObjectParser[];
            if (value == undefined)
                throw new BadRequestError("body must not be empty");
            const parseFailure = !(
                await z.array(z.object({})).safeParseAsync(value)
            ).success;
            if (parseFailure)
                throw new BadRequestError("body must be an array of objects");
            return value.map((jsonObject) => new JsonObjectParser(jsonObject));
        }
        const fullKeyName = this.getFullkeyName(key);
        value = this.jsonObject[key] as JsonObjectParser[];
        if (value == undefined)
            throw new BadRequestError(`${fullKeyName} must not be empty`);
        const parseFailure = !(
            await z.array(z.object({})).safeParseAsync(value)
        ).success;
        if (parseFailure)
            throw new BadRequestError(
                `${fullKeyName} must be an array of objects`
            );
        return value.map((jsonObject) => new JsonObjectParser(jsonObject));
    }

    /**
     * Get an optional array of object values from the JSON object.
     * @param {string} key - The key of the array of object values.
     * @returns {Promise<JsonObjectParser[] | undefined>} A promise resolving to an array of JsonObjectParser instances representing the object array or undefined if the key is missing.
     * @throws {BadRequestError} Throws when the value is not a valid array of objects.
     */
    async getObjectArrayOptional(
        key: string
    ): Promise<JsonObjectParser[] | undefined> {
        const value = this.jsonObject[key] as JsonObjectParser[];
        if (value == undefined) return undefined;
        return this.getObjectArray(key);
    }
}
