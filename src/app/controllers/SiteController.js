import Course from "../models/Course.js";
import { muntipleMongooseToObject } from "../../utils/mongoose.js";

const HomeController = async (req, res, next) => {
    try {
        const courses = await Course.find({});
        res.render("home", { courses: muntipleMongooseToObject(courses) });
    } catch (error) {
        next(error);
    }
};

const SearchController = (req, res) => {
    res.render("search");
};

export { HomeController, SearchController };
