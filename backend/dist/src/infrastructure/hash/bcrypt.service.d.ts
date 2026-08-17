export declare class BcryptService {
    private readonly saltRounds;
    hash(plain: string): Promise<string>;
    compare(plain: string, hash: string): Promise<boolean>;
}
