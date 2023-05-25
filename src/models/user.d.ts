/**
 * 用户类别
 */

export type UserType = {
    "createTime": Date,
    "gender": number,
    "id": number,
    "tags": string,
    "updateTime": Date,
    "userAccount": string,
    "userAvatar": string,
    "userRole": string,
    "username": string
}

export type UserLoginType={
    userAccount:string,
    userPassword:string,
}