import React from "react";
import supabase from "../config/supabaseClient";
import { useQuery } from "react-query";

type Book = {
  title: string;
  id: number;
  author: string;
  created_at: Date;
  read: boolean;
  genre: string;
};

const getBooks: () => Promise<Array<Book> | null | undefined> = async () => {
  const { data, error } = await supabase.from("books").select();
  if (error) {
    console.log(error);
  }
  return data;
};

function Dashboard() {
  const { status, data, error } = useQuery("books", getBooks);

  if (status === "loading") {
    return <span className="bg-red-700">Loading...</span>;
  }

  if (status === "error") {
    return <span>Oooopppsss... Something went wrong</span>;
  }
  if (error) {
    console.log(error);
  }

  return (
    <div>
      {data ? (
        data.map(todo => <p key={todo.id}>{todo.title}</p>)
      ) : (
        <p>nothing here yet, please add your first book!</p>
      )}
    </div>
  );
}

export default Dashboard;
