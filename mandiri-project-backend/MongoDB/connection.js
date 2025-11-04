const mongoose = require("mongoose");
require('dotenv').config()

// mongoose.set('strictQuery', true); 
mongoose.connect(`mongodb+srv://${encodeURIComponent(process.env.MONGO_USER)}:${encodeURIComponent(process.env.MONGO_PASS)}@internationalmandiriexp.hnk5nhk.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
    {useNewUrlParser: true, useUnifiedTopology: true,}
)
.then(() => console.log(`connection to MongoDB`))
.catch((err) => console.log(err))