import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import usersRoter from "./Routers/users.js";
import authRoutes from "./Routers/auth.js";
import stdRoutes from "./Routers/students.js";

const PORT = process.env.PORT || "6060";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", usersRoter);
app.use("/auth", authRoutes);
app.use("/students", stdRoutes);

app.get("/", (req, res) => {
  res.send(
    `<>
        <h1 style="text-align: center">Server is live 😀</h1>
    </>`,
  );
});

app.listen(PORT, (err) => {
  console.log("Server has sucessfully started at port: ", PORT);
});
