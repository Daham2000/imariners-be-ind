interface UserModel{
    uid ?: string;
    email ?: string;
    loggedIn ?: boolean;
    deviceId ?: string;
    subscriptionStatus ?: string;
    firstname ?: string;
    lastname ?: string;
    lastLogin ?: string;
}

export default UserModel;