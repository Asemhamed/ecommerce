export type CartSubCatogory = {
    _id:string, 
    name:string,
    slug:string,
    category:string
}

export type CartCategory = {
    _id:string, 
    name:string,
    slug:string,
    image:string
}

export type CartBrand = {
    _id:string, 
    name:string,
    slug:string,
    image:string
}

export type CartProductDetails = {
    _id:string, 
    title:string,
    subcategory:CartSubCatogory[],
    quantity:number,
    imageCover:string,
    category:CartCategory,
    brand:CartBrand,
    ratingsAverage:number,
    id:string
}

export type CartItem = {
    product:CartProductDetails,
    price:number,
    count:number,
    _id:string
}

export type CartData = {
    _id:string,
    cartOwner:string,
    products:CartItem[],
    createdAt:string,
    updatedAt:string,
    totalCartPrice:number,
    __v:number
}

export type CartResponse = {
    status:string,
    numOfCartItems:number,
    cartId:string,
    data:CartData,
}