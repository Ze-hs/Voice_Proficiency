const app = require("./app");
// const config = require("./utils/config");
const utils = require("./utils/utils");

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    utils.info(`Server running on port ${PORT}`);
});
