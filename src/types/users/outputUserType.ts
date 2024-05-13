

export type UserViewType = {
    "id": string,
    "login": string,
    "email": string,
    "createdAt": Date
}

export type UserOutputType = {
    "id": string,
    "login": string,
    "email": string,
    "createdAt": string
}

export type UserMongoDbType =  {

    "name": string,
    "description": string,
    "websiteUrl": string,
    "createdAt": Date
}




export type userSortData = {
    pageSize: number,
    pageNumber: number,
    sortBy: string,
    sortDirection: string,
    searchLoginTerm: string | null,
    searchEmailTerm: string | null
}


