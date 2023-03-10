type ValueCallback<T> = (value: T) => void;
type CleanupCallback = () => void;
export type UseSingleton<T> = (listener: ValueCallback<T>) => void;
export declare function createSingletonHandler<T>(factory: (handler: ValueCallback<T>) => CleanupCallback): UseSingleton<T>;
interface SingletonStateOptions<T> {
    factory: (handler: ValueCallback<T>) => CleanupCallback;
    initialState: T | (() => T);
}
export declare function createSingletonState<T>({ factory, initialState }: SingletonStateOptions<T>): () => T;
export {};
//# sourceMappingURL=index.d.ts.map