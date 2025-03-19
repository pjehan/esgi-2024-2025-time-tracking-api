import { Schema, model } from 'mongoose';

const projectSchema = new Schema({
  name: String
});

export default model("Project", projectSchema);
