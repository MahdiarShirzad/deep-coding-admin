import supabase from "./supabase";

export async function getBlogs() {
  let { data, error } = await supabase.from("blogs").select("*");

  if (error) {
    console.log(error);
  }

  return data;
}
export async function deleteBlog(id) {
  const { error } = await supabase.from("blogs").delete().eq("id", id);

  if (error) {
    console.error("Error deleting blog:", error);
  }
}

export async function addBlog(blogData) {
  const { data, error } = await supabase.from("blogs").insert([blogData]);

  if (error) {
    console.log(error);
    throw new Error("Failed to add blog");
  }

  return data;
}
