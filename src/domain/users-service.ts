import bcrypt from 'bcrypt';
import {UserOutputType} from "../types/users/outputUserType";
import {UsersRepository} from "../repositories/users-repository";
import {UserMongoDbType} from "../types/users/inputUsersType";

export const UsersService = {
    async createUser(login: string, email:string, password:string): Promise<UserOutputType>{
        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)

        const newUser: UserMongoDbType = {

            userName: login,
            email,
            passwordHash,
            passwordSalt,
            createdAt: new Date()
        }
       const userId = await UsersRepository.createUser(newUser)
        return {
            login: newUser.userName,
            email: newUser.email,
            createdAt: newUser.createdAt.toISOString(),
            id: userId.toString()

        }
    },
    async _generateHash(password: string, salt: string){
        const hash = await bcrypt.hash(password, salt)
        return hash
    },
    async checkCredentials(loginOrEmail: string, password: string){
        const user:UserMongoDbType | null = await UsersRepository.findByLoginOrEmail(loginOrEmail)
        if(!user) return false
        const passwordHash = await this._generateHash(password, user.passwordSalt)
        if(user.passwordHash !== passwordHash){
            return false
        }
        return true
    },

    async deleteUser(id: string):Promise<boolean>{
        return await UsersRepository.deleteUser(id)
    }
}