import express from "express";
import hashPassword, { comparePassword } from "../methods/hashPassword.js";
import supabase from "../db.js";
const authRoutes = express();

authRoutes.post("/signup", async (req, res) => {
  console.log("entered");
  const payload = req.body;
  const { fullName, enrollmentNumber, batch, email, password } = payload;
  const hashed_pass = await hashPassword(password);
  console.log(payload, "body................");
  console.log(hashed_pass, "hasj.............");
  const { data, error } = await supabase
    .from("signin")
    .insert({
      fullName,
      enrollmentNumber,
      batch,
      email,
      password: hashed_pass,
    })
    .select();
  if (error) {
    console.log(error);
    res.status(500).json({
      message: "Unable to create account now, Please try after sometime",
    });
  } else {
    res.status(201).json(data);
  }
});

authRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase
    .from("signin")
    .select("*")
    .eq("email", email);
  if (error) {
    res.status(401).json({
      message: "Invalid Credentials",
    });
  } else {
    const hashPass = data[0].password;
    console.log(password, "pass");
    console.log(hashPass, "hashs");
    const result = await comparePassword(password, hashPass);
    if (result) {
      res.status(200).json({
        message: "Sucessfully logged in",
        data: data
      });
    } else {
      res.status(401).json({
        message: "Invalid Credentials",
      });
    }
  }
});

export default authRoutes;
