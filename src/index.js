const app = require('./app');
//const path = require('path')
const port = process.env.PORT 


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

