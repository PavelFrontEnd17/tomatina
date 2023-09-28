export interface IIngrRequier {
    carb:number,
    cost:number,
    count:number,
    fats:number,
    kkal:number,
    name:string,
    prot:number,
    weight:number,
    type: string,
    imgPath: string
}
export interface IIngrResponse extends IIngrRequier {
    id: string
}
