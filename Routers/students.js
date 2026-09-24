import express from "express";
import supabase from "../db.js";
import dateKey from "../methods/dateFormatter.js";
const stdRoutes = express();

stdRoutes.get("/get-attendance/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id, "params");
  const { data, error } = await supabase
    .from("attendance")
    .select("*")
    .eq("student_id", id);
  if (error) {
    res.status(404).json({
      message: "unable to fetch attendance history",
    });
  } else {
    // console.log(data);
    res.status(200).json({
      message: "request processed",
      data,
    });
  }
});

stdRoutes.post("/mark-attendance", async (req, res) => {
  const { id, name, batch, status, comment } = req.body;
  console.log(req.body);
  const { data, error } = await supabase
    .from("attendance")
    .insert({
      student_id: parseInt(id),
      student_name: name,
      batch: batch,
      date: dateKey(new Date()),
      status: status,
      comment: comment,
    })
    .select("*");
  if (error) {
    res.status(500).json({
      message: "Unable to mark attendance",
    });
  } else {
    console.log(data);
    res.status(200).json({
      message: "Attendance marked",
    });
  }
});

stdRoutes.get("/get-batches", async (req, res) => {
  const { data, error } = supabase.from("batches").select("batch");
  if (error) {
    res.status(404).json({
      message: "unable to feych natches",
    });
  } else {
    res.status(200).json({
      message: "fetched data",
      data,
    });
  }
});
export default stdRoutes;
