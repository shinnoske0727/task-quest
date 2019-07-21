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

export interface I_Monster {
  name: string;
  hitPoint: number;
}

export interface I_Project {
  id: number;
  name: string;
  tasks: I_Task[];
  monster?: I_Monster;
}

export interface I_UserData {
  user: string;
  projects: I_Project[];
}
