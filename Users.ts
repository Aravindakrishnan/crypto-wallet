import User from "./User";

export default class Users {
    public users : User[] = [];
    constructor() {
        this.users = [];
    }
    addUser(user : User) {
        this.users.push(user);
    }
}
