export interface ILogin {
    email: string,
    pass: string,
}

export interface IUpdate extends ILogin{
    uid: string,
    name: string,
    sname: string,
    role: string,
    phone: string,
    favorite: Array<any>,
    orders: Array<any>,
    adress: Array<any>
}