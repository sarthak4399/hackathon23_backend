const mongoose = require('mongoose');
const { Schema } = mongoose;

const EquipmentSchema = new Schema({
    id:{
        type: String,
        required: true
    },
    EqpName:{
        type: String,
        required: true
    },
    availableQty:{
        type: String,
    },
    issuedQty:{
        type: String,
    },
    issueDate:{
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('equipment', EquipmentSchema);