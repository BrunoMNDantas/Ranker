import { API_RESPONSE_TIME } from "../app/Constants";

export type Delayed<T> = {
    [K in keyof T]: T[K] extends (...args: infer A) => infer R ?
        (...args: A) => Promise<Awaited<R>> :
        T[K];
};

export const delay = <T extends object>(obj: T): Delayed<T> => {
    return new Proxy(obj, {
        get(target, prop, receiver) {
            const value = Reflect.get(target, prop, receiver);
            if (typeof value !== "function") {
                return value;
            }

            return (...args: any[]) => new Promise<unknown>((resolve, reject) => {
                setTimeout(() => {
                    try {
                        const result = (value as Function).apply(target, args);
                        Promise.resolve(result).then(resolve, reject);
                    } catch (err) {
                        reject(err);
                    }
                }, API_RESPONSE_TIME);
            }) as Promise<unknown>;
        },
    }) as Delayed<T>;
}