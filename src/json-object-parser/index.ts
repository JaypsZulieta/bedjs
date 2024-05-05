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
        if (!value)
            throw new BadRequestError(`${fullKeyName} must not be empty`);
        const parseFailure = !(await z.string().safeParseAsync(value)).success;
        if (parseFailure)
            throw new BadRequestError(`${fullKeyName} must be a string`);
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

    async getStringArrayOptional(key: string): Promise<string[] | undefined> {
        const value = this.jsonObject[key] as string[];
        if (value == undefined) return undefined;
        return this.getStringArray(key);
    }

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
}
