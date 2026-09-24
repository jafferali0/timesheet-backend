import express from "express";
import supabase from "../db.js";

const usersRoter = express();

usersRoter.get("/get-users", async (req, res) => {
  const { data, error } = await supabase.from("signin").select("*");
  if (error) {
    res.status("404").json({
      message: "Unable to sign, Please try after some time",
    });
  } else {
    res.json(data);
  }
});

export default usersRoter;