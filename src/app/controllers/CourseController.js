import Course from "../models/Course.js";
import { mongooseToObject } from "../../utils/mongoose.js";

// GET /courses/:slug
const Show = (req, res, next) => {
    Course.findOne({ slug: req.params.slug })
        .then((course) => {
            res.render("course/show", { course: mongooseToObject(course) });
        })
        .catch(next);
};

// GET /courses/create
const Create = (req, res, next) => {
    res.render("course/create");
};

// POST /courses/store
const Store = async (req, res, next) => {
    try {
        // Xử lý bất đồng bộ
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(req.body);
        await course.save();
        res.redirect("/me/stored/course");
    } catch (error) {
        next(error);
    }
};

// GET /courses/:id/edit
const Edit = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);
        res.render("course/edit", { course: mongooseToObject(course) });
    } catch (error) {
        next(error);
    }
};

// PUT /courses/:id
const Update = async (req, res, next) => {
    Course.updateOne({ _id: req.params.id }, req.body)
        .then(() => res.redirect("/me/stored/course"))
        .catch(next);
};

// DELETE /courses/:id
const Destroy = (req, res, next) => {
    Course.delete({ _id: req.params.id })
        .then(() => res.redirect("back"))
        .catch(next);
};

// PATCH /courses/:id/restore
const Restore = async (req, res, next) => {
    try {
        await Course.restore({ _id: req.params.id });
        res.redirect("back");
    } catch (error) {
        next(error);
    }
};

// DELETE /courses/:id/force
const forceDestroy = (req, res, next) => {
    Course.deleteOne({ _id: req.params.id })
        .then(() => res.redirect("back"))
        .catch(next);
};

// POST /courses/handle-form-action
const HandleFormAction = (req, res, next) => {
    switch (req.body.action) {
        case "delete":
            Course.delete({ _id: { $in: req.body.courseIds } })
                .then(() => res.redirect("back"))
                .catch(next);
            break;
        default:
            res.json({ message: "Action is invalid" });
    }
};

const HandleFormActionTrash = (req, res, next) => {
    switch (req.body.action) {
        case "restore":
            Course.restore({ _id: { $in: req.body.courseIds } })
                .then(() => res.redirect("back"))
                .catch(next);
            break;
        case "force":
            Course.deleteOne({ _id: { $in: req.body.courseIds } })
                .then(() => res.redirect("back"))
                .catch(next);
            break;
        default:
            res.json({ message: "Action is invalid" });
    }
};

export {
    Show,
    Create,
    Store,
    Edit,
    Update,
    Destroy,
    Restore,
    forceDestroy,
    HandleFormAction,
    HandleFormActionTrash,
};
