// import mongoose, { Schema, Document } from 'mongoose';

// interface CommentDoc extends Document {
//   comment: string;
//   name: string;
//   blog: mongoose.Types.ObjectId;
// }

// const CommentSchema: Schema = new Schema({
//   comment: { type: String, required: true },
//   name: { type: String, required: true },
//   blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
// }, 

// { timestamps: true });

// export const CommentModel = mongoose.model<CommentDoc>('Comment', CommentSchema);
import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  name: string;
  comment: string;
  blog: mongoose.Types.ObjectId;
}

const commentSchema: Schema = new Schema({
  name: { type: String, required: true }, // Ensure 'name' is required
  comment: { type: String, required: true },
  blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
});

const CommentModel = mongoose.model<IComment>('Comment', commentSchema);

export default CommentModel;
