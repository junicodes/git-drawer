
const path = require('path')

module.exports = {
    reactStrictMode: true,
    images: {
      domains: ['res.cloudinary.com'],
    },
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
      prependData: `@import "variables.scss";`
    }
}