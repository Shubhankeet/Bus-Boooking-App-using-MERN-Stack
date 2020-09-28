const express = require('express');
const router=express.Router();

require('./routes/BusInfo')(router)
require('./routes/customerInfo')(router)
require('./routes/paymentInfo')(router)


module.exports=router