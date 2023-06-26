import { databases } from "../../appwrite";
import { Column, Todo, TypedColumns } from "../../typings";

export const getTodosGroupedByColumn = async () => {
    const data = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
    );

    const todos = data.documents;

    console.log(todos);

    const columns = todos.reduce((acc, todo) => {
        if (!acc.get(todo.status)) {
            acc.set(todo.status, {
                id: todo.status,
                todos: [],
            });
        }

        acc.get(todo.status)?.todos.push({
            $id: todo.$id,
            $createdAt: todo.$createdAt,
            title: todo.title,
            status: todo.status,
            ...(todo.image && { image: JSON.parse(todo.image) }),
        });

        return acc;
    }, new Map<TypedColumns, Column>());

    console.log(columns);

    // if columns doesnt have inprogress, todo and done, andd them with empty todos
    const columnTypes: TypedColumns[] = ["todo", "inprogress", "done"];
    for (const columnType of columnTypes) {
        if (!columns.get(columnType)) {
            columns.set(columnType, { id: columnType, todos: [] });
        }
    }
};
