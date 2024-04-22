// type TypeTodolist = TypeTasklist[]
/*
  ESSA CARALHA NAO È UMA LISTA
*/

export type TypeTodolist = {
  idTasklist: string
  titleTasklist: string
  dataTasks: TypeTask[]
  userKey: string
}

// Acho que isso precisa ser uma class
  // A class TodoList deveria herdar essa class?
export type TypeTask = {
  idTask: string
  content: string
  status: string
}

// export class Todolist {
//   constructor (
//     readonly todolist: TypeTodolist
//   ) {
//   }
// }

/* body para post do /todolist/tasklist
[
	{
		
		"idTasklist": "2987",
		"titleTasklist": "moana",
		"userKey": "moana@gmail.com",
		"dataTasks": [
			{
				"idTask": "2008",
				"content": "conchilo com abu 2",
				"status": "pendente"
			},
			{
				"idTask": "2009",
				"content": "comer",
				"status": "concluido"
			}
		]
	}
]
*/

/* body para post do /todolist/task

*/