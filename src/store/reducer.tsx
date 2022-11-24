import { createSlice } from '@reduxjs/toolkit';
import { IStateMain } from '../types';

const initialState: IStateMain = {
	tasks: [],
  projects: [],
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    createProject: (state, action) => {
      return {
        ...state,
        projects: [...state.projects, action.payload]
      }
    },
  //   searchTasks: (state, action) => {
  //     const search = action.payload.toLowerCase();
  //     const columns = current(state.data.columns);

  //     const allTasks = columns
  //       .map((col: IColumn) => {
  //         const tasksWithColId = col.tasks.map((task) => ({ ...task, columnId: col.id }));
  //         return tasksWithColId;
  //       })
  //       .flat();

  //     const result = allTasks.filter(
  //       (task) =>
  //         task.title.toLowerCase().includes(search) ||
  //         task.description.toLowerCase().includes(search)
  //     );

  //     state.searchResults = result;
  //   },
  //   clearTasksSearch: (state) => {
  //     state.searchResults = [];
  //   },
  //   toggleSearchFocus: (state, action) => {
  //     state.isSearchFocus = action.payload;
  //     state.searchResults = [];
  //   },
  //   moveColumn: (state, action) => {
  //     const { dragIndex, hoverIndex } = action.payload;
  //     const columns = state.data.columns;
  //     const dragColumn = columns[dragIndex - 1];
  //     columns.splice(dragIndex - 1, 1);
  //     columns.splice(hoverIndex - 1, 0, dragColumn);
  //     columns.forEach(async (column, i) => {
  //       // set state column order
  //       column.order = i + 1;
  //     });
  //   },
  //   moveTask: (state, action) => {
  //     const { dragIndex, dropIndex, dragColumnIndex, dropColumnIndex } = action.payload;
  //     const columns = state.data.columns;

  //     const dragColumn = columns[dragColumnIndex - 1].tasks;
  //     const dropColumn = columns[dropColumnIndex - 1].tasks;
  //     const dragTask = dragColumn[dragIndex - 1];
  //     dragColumn.splice(dragIndex - 1, 1);

  //     if (dragColumnIndex == dropColumnIndex) {
  //       if (dropIndex < dragIndex) {
  //         dragColumn.splice(dropIndex - 1, 0, dragTask);
  //       } else {
  //         dragColumn.splice(dropIndex - 2, 0, dragTask);
  //       }
  //     } else {
  //       dropColumn.splice(dropIndex - 1, 0, dragTask);
  //       dropColumn.forEach(async (task, i) => {
  //         task.order = i + 1;
  //       });
  //     }
  //     dragColumn.forEach(async (task, i) => {
  //       task.order = i + 1;
  //     });
  //   },
  //   builder
  //     // getBoard
  //     .addCase(getBoard.pending, (state) => {
  //       state.isLoading = true;
  //       state.error = null;
  //     })
  //     .addCase(getBoard.fulfilled, (state, action) => {
  //       const sortedColumns: IColumn[] = action.payload.columns.sort(
  //         (a: IColumn, b: IColumn) => a.order - b.order
  //       );

  //       sortedColumns.map((col) => {
  //         const sortedTasks = col.tasks.sort((a, b) => a.order - b.order);
  //         return {
  //           ...col,
  //           tasks: sortedTasks,
  //         };
  //       });

  //       state.data = action.payload;
  //       state.data.columns = sortedColumns;
  //       state.isLoading = false;
  //     })
  //     .addCase(getBoard.rejected, (state, action) => {
  //       state.error = String(action.payload);
  //       state.isLoading = false;
  //     })

  //     // create column
  //     .addCase(createColumn.fulfilled, (state, action) => {
  //       state.data = {
  //         ...state.data,
  //         // добавляем к колонке tasks, т.к к ответе при создании приходит без этого массива
  //         columns: [...state.data.columns, { ...action.payload, tasks: [] }],
  //       };
  //     })
  //     .addCase(createColumn.rejected, (state, action) => {
  //       state.error = String(action.payload);
  //     })

  //     // deleteColumn
  //     .addCase(deleteColumn.fulfilled, (state, action) => {
  //       state.data.columns = state.data.columns.filter((column) => column.id !== action.payload);
  //     })
  //     .addCase(deleteColumn.rejected, (state, action) => {
  //       state.error = String(action.payload);
  //     })

  //     // createTask
  //     .addCase(createTask.fulfilled, (state, action) => {
  //       const { columnId, taskDetails } = action.payload;
  //       // создаём копию массива из state
  //       const columns = Array.from(state.data.columns);

  //       // в копию массива добавляем новый таск
  //       const updatedColumn = columns.find((column) => column.id === columnId);
  //       updatedColumn?.tasks.push(taskDetails);

  //       // присваиваем копию массива в state.columns
  //       state.data.columns = columns;
  //     })
  //     .addCase(createTask.rejected, (state, action) => {
  //       state.error = String(action.payload);
  //     })

  //     // updateTask
  //     .addCase(updateTask.fulfilled, (state, action) => {
  //       const { id, title, order, description, userId } = action.payload;

  //       const column = state.data.columns.find((column) => column.id === action.payload.columnId);
  //       if (column) {
  //         const idx = column.tasks.findIndex((task) => task.id === id);

  //         const task = {
  //           id,
  //           title,
  //           order,
  //           description,
  //           userId,
  //         };

  //         column.tasks[idx] = task;
  //       }
  //     })
  //     .addCase(updateTask.rejected, (state, action) => {
  //       state.error = String(action.payload);
  //     })

  //     // deleteTask
  //     .addCase(deleteTask.fulfilled, (state, action) => {
  //       const column = state.data?.columns.find((column) => column.id === action.payload.columnId);
  //       if (column) {
  //         const tasks = column.tasks.filter((task) => task.id !== action.payload.taskId);
  //         column.tasks = tasks;
  //       }
  //     })
  //     .addCase(deleteTask.rejected, (state, action) => {
  //       state.error = String(action.payload);
  //       state.isLoading = false;
  //     })
  }
});
 export const { createProject } = mainSlice.actions;

export default mainSlice.reducer;
