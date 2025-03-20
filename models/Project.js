import { Schema, model } from 'mongoose';

const projectSchema = new Schema({
  name: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
});

export default model("Project", projectSchema);
