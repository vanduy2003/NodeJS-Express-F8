import express from "express";
import morgan from "morgan";
import handlebars from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import route from "./routes/index.js";
import db from "./config/db/index.js";
import methodOverride from "method-override";
import SortMiddleware from "./app/middleware/SortMiddleware.js";

// Connect to DB
db.connect();

const app = express();
const port = 3000;

// Lấy đường dẫn file hiện tại
const __filename = fileURLToPath(import.meta.url);

// Lấy đường dẫn thư mục hiện tại
const __dirname = path.dirname(__filename);

// Static file
app.use(express.static(path.join(__dirname, "public")));

// HTTP logger
// app.use(morgan("combined"));

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Method override
app.use(methodOverride("_method"));

// Custom middleware
app.use(SortMiddleware);

route(app);

// Handlebars
app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const curentType =
                    field === sort.column ? sort.type : "default";

                const icons = {
                    default: "fa-solid fa-sort",
                    desc: "fa-solid fa-arrow-up-short-wide",
                    asc: "fa-solid fa-arrow-up-wide-short",
                };

                const sortType = {
                    default: "desc",
                    desc: "asc",
                    asc: "desc",
                };

                const icon = icons[curentType];
                const type = sortType[curentType];

                return `<a href="?_sort&column=${field}&type=${type}"><i class="${icon} text-white"></i></i></a>`;
            },
        },
    })
); // Sử dụng handlebars.engine()

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
