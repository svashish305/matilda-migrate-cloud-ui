// export class Task {
//   id: string;
//   name: string = "";
//   description: string = "";
//   order: number = 100;
//   pluginName: string = "";
//   serviceName: string = "";
//   actionName: string = "";
//   pluginId: string = "";
//   serviceId: string = "";
//   actionId: string = "";
//   status: string = "Defined";
//   statusCode: number = 1;
//   progress: number = 0;
//   keyVault: any[] = [];
//   input: any = null;
//   output: any = null;
//   startDate: string = null;
//   endDate: string = null;
//   duration: string = null;
//   dependencies: any[] = [];
//   notification: any;
// }

// export class Stage {
//   id: string;
//   name: string = "Untitled Stage";
//   order: number = 100;
//   // status: string = "Defined";
//   statusCode: number = 1;
//   progress: number = 0;
//   items: any[] = [];
// }

// export class GroupOld {
//   id: string;
//   name: string = "Untitiled Group";
//   order: number = 100;
//   // status: string = "Defined";
//   statusCode: number = 1;
//   progress: number = 0;
//   items: any[] = [];
// }

// export class WorkflowOld {
//   id: string;
//   name: string = "Untitled Workflow";
//   desc: string = "";
//   ver: string = null;
//   type: string = "";
//   owner: string = "";
//   progress: number = 0;
//   groups: any[] = [];
//   tags: any[] = [];
//   keyVault: any[] = [];
// }

// export class TemplateOld {
//   id: string;
//   name: string = "Untitled Template";
//   desc: string = "";
//   ver: string = null;
//   type: string = "";
//   owner: string = "";
//   progress: number = 0;
//   // status: string = "Defined";
//   statusCode: number = 1;
//   order: number = 100;
//   groups: any[] = [];
//   tags: any[] = [];
//   modifiedDate: string = null;
// }

export class KeyVault {
  id: number|string;
  name: string;
}

export class ItemDependency {
  groupId: number|string;
  itemId: number|string;
  mode: string;
}

export class Tag {
  id: number|string;
  name: string;
  value: string;
  modifiedDate: string|Date;
}

export class Item {
  id: string;
  name: string = '';
  desc: string = '';
  order: number = 0;
  statusCd: number = 1;
  progress: number = 0;
  pluginName?: string = '';
  pluginId?: number|string = null;
  serviceId?: string = '';
  actionId?: string = '';
  serviceName?: string ='';
  actionName?: string = '';
  itemsFields?: string = null;
  keyVault?: KeyVault = null;
  input?: string|any = null;
  output?: string|any = null;
  startDate?: string|Date = null;
  endDate?: string|Date = null;
  duration?: string = null;
  dependencies?: ItemDependency[] = [];
  notification?: string|any = null;
  taskImage?:any;
}

export class Group {
  id: number|string;
  name: string = '';
  order: number = 0;
  statusCd: number = 1;
  progress: number = 0;
  items: Item[] = [];
}

export class Template {
  id: number|string;
  name: string = '';
  desc: string = '';
  ver: string = '';
  type: string = '';
  owner: string = '';
  statusCd: number = 1;
  progress: number = 0;
  groups: Group[] = [];
  tags: Tag[] = [];
  modifiedDate?: string|Date = null;
}

export class Workflow {
  id: number|string;
  name: string = '';
  desc: string = '';
  ver: string = '';
  type: string = '';
  owner: string = '';
  statusCd: number = 1;
  progress: number = 0;
  groups: Group[] = [];
  tags: Tag[] = [];
  keyVault: KeyVault[] = [];
  modifiedDate?: string|Date;
}