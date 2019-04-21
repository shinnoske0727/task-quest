export const createTask = ({ commit }, task) => {
  // task 新しいタスク
  commit("updateTaskList", task);
};

export const updateTask = ({ commit }, task) => {
  // task アップデートされる予定のタスク
  commit("updateTaskList", task);
};
