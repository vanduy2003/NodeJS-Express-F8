import mongoose from "mongoose";

const connect = async () => {
    try {
        const conn = await mongoose.connect(
            "mongodb://localhost:27017/f8_education",
            {
                useNewUrlParser: true, // Thêm tùy chọn này
                useUnifiedTopology: true, // Thêm tùy chọn này để tránh cảnh báo tiếp theo
                useCreateIndex: true,
            }
        );
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default { connect };
