
    module.exports = function (app) {
        const modelName = 'checks';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            checkListId: { type: Schema.Types.ObjectId, ref: "check_lists" },
name: { type:  String , required: true },
isBoolean: { type: Boolean, required: false },
description: { type:  String , required: true },
order: { type: Number, required: false, max: 10000000 },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };