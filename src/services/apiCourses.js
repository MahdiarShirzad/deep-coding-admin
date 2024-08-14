// apiCourses.js
import supabase from "./supabase";

export async function getCourses() {
  let { data, error } = await supabase.from("courses").select("*");

  if (error) {
    console.log(error);
  }

  return data;
}

export async function deleteCourse(id) {
  const { error } = await supabase.from("courses").delete().eq("id", id);

  if (error) {
    console.error("Error deleting course:", error);
  }
}

export async function addCourse(courseData) {
  const { data, error } = await supabase.from("courses").insert([courseData]);

  if (error) {
    console.log(error);
    throw new Error("Failed to add course");
  }

  return data;
}
