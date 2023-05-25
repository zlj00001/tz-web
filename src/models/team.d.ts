import {UserType} from "./user";

/**
 * 队伍类别
 */
export type TeamType = {
    /**
     * 主键
     */
    id: number;

    /**
     * 队伍名
     */
    teamName: string;

    /**
     * 是否已经加入队伍
     */
    hasJoin:boolean;
    /**
     * 队伍描述
     */
    teamDescription: string;

    /**
     * 最大人数
     */
    maxNum: number;

    /**
     * 过期时间
     */
    expireTime: Date;

    /**
     * 用户id
     */
    userId: number;

    /**
     * 0-公开，1-私有，2-加密
     */
    teamStatus: number;

    /**
     * 创建时间
     */
    createTime: Date;

    /**
     * 更新时间
     */
    updateTime: Date;

    /**
     * 创建人用户信息
     */
    createUser: UserType;

    /**
     * 已加入的用户数
     */
    hasJoinNum: number;

}