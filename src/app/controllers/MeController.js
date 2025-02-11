import Course from "../models/Course.js";
import { muntipleMongooseToObject } from "../../utils/mongoose.js";

const StoredCourse = async (req, res, next) => {
    try {
        let query = Course.find({}); // Truy vấn dữ liệu từ MongoDB

        if (req.query.hasOwnProperty("_sort")) {
            const sortObj = {};
            sortObj[req.query.column] = req.query.type === "desc" ? -1 : 1;
            query = query.sort(sortObj); // Sắp xếp ngay trong MongoDB
        }

        const courses = await query; // Lấy kết quả từ MongoDB

        res.render("me/stored-course", {
            courses: muntipleMongooseToObject(courses),
        });
    } catch (error) {
        next(error);
    }
};

const TrashCourse = async (req, res, next) => {
    try {
        const course = await Course.findDeleted({});
        res.render("me/trash-course", {
            courses: muntipleMongooseToObject(course),
        });
    } catch (error) {
        next(error);
    }
};

export { StoredCourse, TrashCourse };
