import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-output',
  templateUrl: './task-output.component.html',
  styleUrls: ['./task-output.component.scss']
})
export class TaskOutputComponent implements OnInit {
  @Input() task: any
  dataMap = new Map()
  output = {"console_output": "{'PublicIp': '3.14.14.178', 'InstanceID': 'i-0a7f83e5b4cff3543', 'PublicDnsName': 'ec2-3-14-14-178.us-east-2.compute.amazonaws.com'}"}
  constructor() { }

  ngOnInit() {
    this.mapData();
    
  }

  innerExists(value: any) {
    if (Object.keys(value).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  mapData() {
    let consoleOutput:any = this.output['console_output'];
    // if (typeof consoleOutput === 'string' || consoleOutput instanceof String) {
    if (consoleOutput) {
      let modifiedOutput = consoleOutput.replace(/'/g, '"');
      for (let [key, value] of Object.entries(JSON.parse(modifiedOutput))) {
        this.dataMap.set(key, value);
      }
    } else {
      for (let [key, value] of Object.entries(consoleOutput)) {
        this.dataMap.set(key, value);
      }

    }
  }

}
