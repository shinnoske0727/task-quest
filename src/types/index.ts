export interface I_elmList {
  id: number;
  isFinished: boolean;
  name: string;
}

export interface I_Task {
  id: number;
  name: string;
  isFinished: boolean;
}

export interface I_Project {
  id: number;
  name: string;
  tasks: I_Task[];
}

export interface I_UserData {
  user: string;
  projects: I_Project[];
}
