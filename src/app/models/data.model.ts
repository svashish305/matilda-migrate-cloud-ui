export class KeyVault {
  id: number | string;
  name: string;
}

export class ItemDependency {
  groupId: number | string;
  itemId: number | string;
  mode: string;
}

export class Tag {
  id: number | string;
  name: string;
  value: string;
  modifiedDate: string | Date;
}

export class Item {
  id: string;
  name: string = '';
  desc: string = '';
  order: number = 0;
  statusCd: number = 1;
  progress: number = 0;
  pluginName?: string = '';
  pluginId?: number | string = null;
  serviceId?: string = '';
  actionId?: string = '';
  serviceName?: string = '';
  actionName?: string = '';
  itemsFields?: string = null;
  keyVault?: KeyVault = null;
  input?: string | any = null;
  output?: string | any = null;
  startDate?: string | Date = null;
  endDate?: string | Date = null;
  duration?: string = null;
  dependencies?: ItemDependency[] = [];
  notification?: string | any = null;
}

export class Group {
  id: number | string;
  name: string = '';
  order: number = 0;
  statusCd: number = 1;
  progress: number = 0;
  items: Item[] = [];
}

export class Template {
  id: number | string;
  name: string = '';
  desc: string = '';
  ver: string = '';
  type: string = '';
  owner: string = '';
  statusCd: number = 1;
  progress: number = 0;
  groups: Group[] = [];
  tags: Tag[] = [];
  modifiedDate?: string | Date = null;
}

export class Workflow {
  id: number | string;
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
  modifiedDate?: string | Date;
}
