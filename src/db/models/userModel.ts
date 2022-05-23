interface UserModel {
    uid?: string;
    email?: string;
    loggedIn?: boolean;
    deviceId?: string;
    subscriptionStatus?: string;
    username?: string;
    lastLogin?: string;
    password?: string;
}

export default UserModel;