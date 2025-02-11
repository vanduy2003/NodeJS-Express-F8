import newsRouter from "./news.js";
import siteRouter from "./site.js";
import CourseRouter from "./course.js";
import meRouter from "./me.js";

const route = (app) => {
    app.use("/me", meRouter);
    app.use("/course", CourseRouter);
    app.use("/news", newsRouter);
    app.use("/", siteRouter);
};
export default route;
