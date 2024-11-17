const app = require("./app");
const config = require("./utils/config");
const utils = require("./utils/utils");

const PORT = config.PORT || 3001;

app.listen(PORT, () => {
    utils.info(`Server running on port ${PORT}`);
});
