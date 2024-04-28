export default class UserDto {
    fullName;
    email;
    id;
    isActivated;
    profilePictureUrl;

    constructor(model) {
        this.fullName = model.fullName;
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.profilePictureUrl = model.profilePictureUrl;
    }
}