export interface ICategoryRequire {
    name: string,
    path: string,
    imgPath: string,
    order: number
}

export interface ICategoryResponse extends ICategoryRequire{
    id: number | string
}