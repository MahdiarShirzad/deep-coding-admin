import supabase from "./supabase";

export async function getBooks() {
  let { data, error } = await supabase.from("books").select("*");

  if (error) {
    console.log(error);
  }

  return data;
}

export async function deleteBook(id) {
  const { error } = await supabase.from("books").delete().eq("id", id);

  if (error) {
    console.error("Error deleting book:", error);
  }
}

export async function addBook(bookData) {
  const { data, error } = await supabase.from("books").insert([bookData]);

  if (error) {
    console.log(error);
    throw new Error("Failed to add book");
  }

  return data;
}
