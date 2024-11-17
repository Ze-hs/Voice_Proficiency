const app = require("./app");
// const config = require("./utils/config");
const utils = require("./utils/utils");

app.listen(process.env.PORT || 3001, () => {
    utils.info(`Server running on port ${PORT}`);
});
