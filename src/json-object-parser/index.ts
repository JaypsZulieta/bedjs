import { BadRequestError } from "../errors/bad-request.error";
import { z } from "zod";

export class JsonObjectParser {
    constructor(private jsonObject: any, private parentObjectKey?: string) {}

    private getFullkeyName(key: string): string {
        if (!this.parentObjectKey) return key;
        const fullKeyName = `${this.parentObjectKey}.${key}`;
        return fullKeyName;
    }

    async getString(key: string): Promise<string> {
        const value = this.jsonObject[key] as string;
        const fullKeyName = this.getFullkeyName(key);
        if (!value) throw new BadRequestError(`${fullKeyName} must not be empty`);
        const parseFailure = !(await z.string().safeParseAsync(value)).success;
        if (parseFailure) throw new BadRequestError(`${fullKeyName} must be a string`);
        return value;
    }

    async getStringOptional(key: string): Promise<string | undefined> {
        const value = this.jsonObject[key] as string;
        if (!value) return undefined;
        return this.getString(key);
    }

    async getStringArray(key?: string): Promise<string[]> {
        let value: string[];
        if (!key) {
            value = this.jsonObject as string[];
            if (value == undefined) throw new BadRequestError("body must not be empty");
            const parseFailure = !(await z.array(z.string()).safeParseAsync(value)).success;
            if (parseFailure) throw new BadRequestError("body must be an array of strings");
            return value;
        }
        const fullKeyName = this.getFullkeyName(key as string);
        value = this.jsonObject[key] as string[];
        if (value == undefined) throw new BadRequestError(`${fullKeyName} must not be empty`);
        const parseFailure = !(await z.array(z.string()).safeParseAsync(value)).success;
        if (parseFailure) throw new BadRequestError(`${fullKeyName} must be an array of strings`);
        return value;
    }

    async getStringArrayOptional(key: string): Promise<string[] | undefined> {
        const value = this.jsonObject[key] as string[];
        if (value == undefined) return undefined;
        return this.getStringArray(key);
    }

    async getNumber(key: string): Promise<number> {
        const fullKeyName = this.getFullkeyName(key);
        const value = this.jsonObject[key] as number;
        if (value == undefined) throw new BadRequestError(`${fullKeyName} must not be empty`);
        const parseFailure = !(await z.number().safeParseAsync(value)).success;
        if (parseFailure) throw new BadRequestError(`${fullKeyName} must be a number`);
        return value;
    }

    async getNumberOptional(key: string): Promise<number | undefined> {
        const value = this.jsonObject[key] as number;
        if (value == undefined) return undefined;
        return this.getNumber(key);
    }

    async getNumberArray(key?: string): Promise<number[]> {
        let value: number[];
        if (!key) {
            value = this.jsonObject as number[];
            if (value == undefined) throw new BadRequestError("body must not be empty");
            const parseFailure = !(await z.array(z.number()).safeParseAsync(value)).success;
            if (parseFailure) throw new BadRequestError("body must be an array of numbers");
            return value;
        }
        value = this.jsonObject[key] as number[];
        const fullKeyName = this.getFullkeyName(key);
        if (value == undefined) throw new BadRequestError(`${fullKeyName} must not be empty`);
        const parseFailure = !(await z.array(z.number()).safeParseAsync(value)).success;
        if (parseFailure) throw new BadRequestError(`${fullKeyName} must be an array of numbers`);
        return value;
    }

    async getNumberArrayOptional(key: string): Promise<number[] | undefined> {
        const value = this.jsonObject[key];
        if (value == undefined) return undefined;
        return this.getNumberArray(key);
    }

    async getBoolean(key: string): Promise<boolean> {
        const fullKeyName = this.getFullkeyName(key);
        const value = this.jsonObject[key] as boolean;
        if (value == undefined) throw new BadRequestError(`${fullKeyName} must not be empty`);
        const parseFailure = !(await z.boolean().safeParseAsync(value)).success;
        if (parseFailure) throw new BadRequestError(`${fullKeyName} must be a boolean`);
        return value;
    }

    async getBooleanOptional(key: string): Promise<boolean | undefined> {
        const value = this.jsonObject[key] as boolean;
        if (value == undefined) return undefined;
        return this.getBoolean(key);
    }

    async getObject(key: string): Promise<JsonObjectParser> {
        const fullKeyName = this.getFullkeyName(key);
        const value = this.jsonObject[key] as any;
        if (value == undefined) throw new BadRequestError(`${fullKeyName} must not be empty`);
        const parseFailure = !(await z.object({}).safeParseAsync(value)).success;
        if (parseFailure) throw new BadRequestError(`${fullKeyName} must be an object`);
        return new JsonObjectParser(value, key);
    }

    async getObjectOptional(key: string): Promise<JsonObjectParser | undefined> {
        const value = this.jsonObject[key] as any;
        if (value == undefined) return undefined;
        return this.getObject(key);
    }

    async getObjectArray(key?: string): Promise<JsonObjectParser[]> {
        let value: JsonObjectParser[];
        if (!key) {
            value = this.jsonObject as JsonObjectParser[];
            if (value == undefined) throw new BadRequestError("body must not be empty");
            const parseFailure = !(await z.array(z.object({})).safeParseAsync(value)).success;
            if (parseFailure) throw new BadRequestError("body must be an array of objects");
            return value.map((jsonObject) => new JsonObjectParser(jsonObject));
        }
        const fullKeyName = this.getFullkeyName(key);
        value = this.jsonObject[key] as JsonObjectParser[];
        if (value == undefined) throw new BadRequestError(`${fullKeyName} must not be empty`);
        const parseFailure = !(await z.array(z.object({})).safeParseAsync(value)).success;
        if (parseFailure) throw new BadRequestError(`${fullKeyName} must be an array of objects`);
        return value.map((jsonObject) => new JsonObjectParser(jsonObject));
    }
}
