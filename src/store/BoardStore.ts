import { getTodosGroupedByColumn } from "@/lib/getTodosGroupedByColumn";
import { create } from "zustand";
import { Board, Column, Todo, TypedColumns } from "../../typings";
import { databases } from "../../appwrite";

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDB: (todo: Todo, columnId: TypedColumns) => void;

  searchString: string;
  setSearchString: (searchString: string) => void;
}

export const useBoardStore = create<BoardState>()((set) => ({
  board: {
    columns: new Map<TypedColumns, Column>(),
  },
  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },
  setBoardState: (board) => set({ board }),
  updateTodoInDB: async (todo, columnId) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      { title: todo.title, status: columnId }
    );
  },
  searchString: "",
  setSearchString: (searchString) => {
    set({ searchString });
  },
}));
