import { Schema, model } from 'mongoose';

const projectSchema = new Schema({
  name: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

export default model("Project", projectSchema);
