export type Product = {
    sold:number,
    _id:string,
    title:string,
    images:string[],
    subcategory:category[],
    slug:string,
    description:string,
    priceAfterDiscount:number,
    quantity:number,
    price:number,
    imageCover:string,
    ratingsAverage:number,
    createdAt:string,
    updatedAt:string,
    category:category,
    brand:brand
}

export type category = {
    _id:string
    name:string
    slug:string
    image:string
}
export type brand ={
    _id:string
    name:string
    slug:string
    image:string
} 