import supabase from "./supabase";

export async function getTeachers() {
  let { data, error } = await supabase.from("teachers").select("*");

  if (error) {
    console.log(error);
  }

  return data;
}
export async function deleteTeacher(id) {
  const { error } = await supabase.from("teachers").delete().eq("id", id);

  if (error) {
    console.error("Error deleting teacher:", error);
  }
}

export async function addTeacher(teacherData) {
  const { data, error } = await supabase.from("teachers").insert([teacherData]);

  if (error) {
    console.log(error);
    throw new Error("Failed to add teacher");
  }

  return data;
}

export async function updateTeacher(id, updatedData) {
  const { data, error } = await supabase
    .from("teachers")
    .update(updatedData)
    .eq("id", id);

  if (error) {
    console.error("Error updating teacher:", error);
    throw error;
  }

  return data;
}
