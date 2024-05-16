export type CommentOutputType = {
    "id": string,
    "content": string,
    "commentatorInfo": {
        "userId": string,
        "userLogin": string
    },
    "createdAt": string

}

export type CommentMongoDbType =  {

    "content": string,
    "commentatorInfo":{
        "userId": string,
        "userLogin": string
    }
    "createdAt": Date
}