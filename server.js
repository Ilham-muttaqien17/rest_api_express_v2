import express from "express";
import userRoutes from "./routes/userRoutes.js";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

/*
    Body parser
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* 
    @route Users
*/
app.use("/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});
