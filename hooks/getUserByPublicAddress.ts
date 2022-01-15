import User from "User";
export default function getUserByPublicAddress(users:User[],publicAddress : string) {
    const user = users.find(user=> user.publicAddress === publicAddress)
    if(!user) return [];
    return user;
}