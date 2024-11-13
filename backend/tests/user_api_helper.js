const User = require("../models/users");

const usersInDB = async () => {
    const users = await User.find({});
    return users.map((user) => user.toJSON());
};

module.exports = {
    usersInDB,
};
