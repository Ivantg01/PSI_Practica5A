export type User = {
    id:string,
    name:string,
    email:string,
    comicCollection:ComicCollection
}

export type Comic = {
    id:string,
    name:string,
    description:string,
    format:string
}

export type ComicCollection = {
    id:string,
    name:string,
    comics:Comic[]
}