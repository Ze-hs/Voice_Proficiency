const app = require('./app')
const config = require('./utils/config')
const utils = require('./utils/utils')

app.listen(config.PORT, () => {
    utils.info(`Server running on port ${config.PORT}`)
})