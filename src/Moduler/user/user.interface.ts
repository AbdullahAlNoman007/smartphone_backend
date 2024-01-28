export interface Tuser {
    name: string;
    email: string;
    password: string;
}
export interface TpayloadUser {
    name: string;
    email: string;
    password: string;
    confirmpassword: string;
}
export interface Tlogin {
    email: string;
    password: string;
}
export interface TjwtPayLoad {
    id: string;
    name: string;
    email: string;
}