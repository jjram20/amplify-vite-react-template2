/* import { resolver } from '@aws-amplify/backend';

export const handler = resolver.handler(async (ctx) => {
  const { todos } = ctx.arguments;

  const createdTodos = await Promise.all(
    todos.map(todo =>
      ctx.db.Todo.create({
        content: todo.content,
      })
    )
  );

  return createdTodos;
}); */