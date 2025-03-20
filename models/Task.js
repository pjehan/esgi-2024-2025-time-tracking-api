import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  name: String,
  dateStart: Date,
  dateEnd: Date,
  project: { type: Schema.Types.ObjectId, ref: 'Project' }
});

export default model("Task", taskSchema);
