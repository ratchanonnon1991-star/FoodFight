export declare const AuthProvider: {
    readonly GOOGLE: "GOOGLE";
    readonly LINE: "LINE";
};
export type AuthProvider = (typeof AuthProvider)[keyof typeof AuthProvider];
export declare const Role: {
    readonly USER: "USER";
    readonly ADMIN: "ADMIN";
};
export type Role = (typeof Role)[keyof typeof Role];
