export class Task {
  id: string;
  name: string = "";
  description: string = "";
  order: number = 100;
  pluginName: string = "";
  serviceName: string = "";
  actionName: string = "";
  pluginId: string = "";
  serviceId: string = "";
  actionId: string = "";
  status: string = "Defined";
  statusCode: number = 1;
  progress: number = 0;
  keyVault: any[] = [];
  input: any = null;
  output: any = null;
  startDate: string = null;
  endDate: string = null;
  duration: string = null;
  dependencies: any[] = [];
  notification: any;
  taskImage:any;
}

export class Stage {
  id: string;
  name: string = "Untitled Stage";
  order: number = 100;
  // status: string = "Defined";
  statusCode: number = 1;
  progress: number = 0;
  items: any[] = [];
}

export class Group {
  id: string;
  name: string = "Untitiled Group";
  order: number = 100;
  // status: string = "Defined";
  statusCode: number = 1;
  progress: number = 0;
  items: any[] = [];
}

export class Workflow {
  id: string;
  name: string = "Untitled Workflow";
  desc: string = "";
  ver: string = null;
  type: string = "";
  owner: string = "";
  progress: number = 0;
  groups: any[] = [];
  tags: any[] = [];
  keyVault: any[] = [];
}

export class Template {
  id: string;
  name: string = "Untitled Template";
  desc: string = "";
  ver: string = null;
  type: string = "";
  owner: string = "";
  progress: number = 0;
  // status: string = "Defined";
  statusCode: number = 1;
  order: number = 100;
  groups: any[] = [];
  tags: any[] = [];
  modifiedDate: string = null;
}
