import { I_UserData } from "@/types";

export const INITIAL_DATA: I_UserData = {
  user: "anonymous",
  projects: [
    {
      id: 1,
      name: "案件1",
      tasks: [{ id: 1, isFinished: false, name: "新しいタスクを追加する" }]
    },
    {
      id: 2,
      name: "案件2",
      tasks: [{ id: 1, isFinished: false, name: "" }]
    },
    {
      id: 3,
      name: "案件3",
      tasks: [{ id: 1, isFinished: false, name: "" }]
    },
    {
      id: 4,
      name: "案件4",
      tasks: [{ id: 1, isFinished: false, name: "" }]
    }
  ]
};
