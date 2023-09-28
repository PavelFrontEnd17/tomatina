export interface IProductRequire {
    name: string;
    category: string;
    imgPath: string;
    description: string;
    alergens: string;
    weight: number;
    kkal: number;
    prot: number;
    fats: number;
    carb: number;
    count: number;
    cost: number;
    banner: string;
    bannerColor: string;
}

export interface IProductResponse extends IProductRequire {
    id: string
}