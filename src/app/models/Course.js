import mongoose from "mongoose";
import slug from "mongoose-slug-generator";
import MongooseDelete from "mongoose-delete";

// Cài đặt plugin slug để tự động tạo slug từ tên
mongoose.plugin(slug);

const Course = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        image: { type: String },
        videoId: { type: String, required: true },
        level: { type: String, default: "Cơ bản" },
        slug: { type: String, slug: "name", unique: true },
    },
    {
        timestamps: true,
    }
);

// Thêm plugin MongooseDelete để hỗ trợ xóa mềm (soft delete)
Course.plugin(MongooseDelete, {
    deletedAt: true, // Tạo trường deletedAt khi xóa
    overrideMethods: "all", // Sử dụng các phương thức của Mongoose Delete cho tất cả các phương thức
});

export default mongoose.model("Course", Course);
