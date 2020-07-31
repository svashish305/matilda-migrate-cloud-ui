import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DataService } from 'src/services/data.service';
import { TemplateService } from '../templates/services/template.service';
import { Template, Workflow } from 'src/app/utils/models/data.model';
import { Utilities } from 'src/app/utils/helpers/utilities';
import { WorkflowService } from '../workflows/services/workflow.service';


@Component({
  selector: 'app-main-left-navbar',
  templateUrl: './main-left-navbar.component.html',
  styleUrls: ['./main-left-navbar.component.scss'],
})
export class MainLeftNavbarComponent implements OnInit {
  isMigrateCollapsed = true;
  isCollapsed = true;

  hubSelected = false;
  templateSelected = false;
  workflowSelected = false;

  mobileDevice = false;

  constructor(
    private location: Location,
    private router: Router,
    private deviceService: DeviceDetectorService,
    private dataService: DataService,
    private _utilities: Utilities,
    private _templateService: TemplateService,
    private _workflowService: WorkflowService
  ) {
    this.router.events.subscribe((val) => {
      if (location.path().includes('hub')) {
        this.isMigrateCollapsed = false;
        this.hubSelected = true;
        this.templateSelected = false;
        this.workflowSelected = false;
      } else if (location.path().includes('templates')) {
        this.isMigrateCollapsed = false;
        this.templateSelected = true;
        this.hubSelected = false;
        this.workflowSelected = false;
      } else if (location.path().includes('workflows')) {
        this.isMigrateCollapsed = false;
        this.workflowSelected = true;
        this.hubSelected = false;
        this.templateSelected = false;
      }
    });
  }

  ngOnInit() {
    if (this.deviceService.isMobile()) {
      this.mobileDevice = true;
    }
  }

  rotateOnClick(migrateCollapsed) {
    let transform;
    if (migrateCollapsed) {
      transform = 'rotate(0deg)';
    } else {
      transform = 'rotate(180deg)';
    }
    return {
      transform,
    };
  }

  isSelected(selected) {
    return {
      opacity: selected ? 1 : 0.5,
    };
  }

  workflowIsSelected() {
    return {
      opacity: this.workflowSelected ? 1 : 0.7,
    };
  }

  setActiveColor(selected) {
    return {
      color: selected ? '#fff' : '#012b7a',
    };
  }

  addActiveInd(selected) {
    return {
      // borderRight: selected ? '3px solid white' : 'none',
      backgroundColor: selected ? 'cornflowerblue' : 'initial',
    };
  }

  addFocusColor(migrateCollapsed) {
    return {
      backgroundColor: !migrateCollapsed ? 'cornflowerblue' : 'initial',
    };
  }

  addTemplate() {
    
    let template = new Template();
    template.id = this._utilities.generateId();
    template.name = 'Untitled Template' + '_' + template.id;

    // this._templateService.updateTemplate(template)
    //   .subscribe(
    //     (data: Template) => {
    //       this.router.navigate([`/templates/${data.id}`]);
    //     },
    //     (error) => {
    //       this._utilities.errorNotification(error);
    //     }
    //   );

    this.dataService.addTemplate(template).subscribe((data: Template) => {
        this.router.navigate([`/templates/${data.id}`]);
      },
      (error) => {
        this._utilities.errorNotification(error);
      });
  }

  addWorkflow() {
    let workflow = new Workflow();
    workflow.id = this._utilities.generateId();
    workflow.name = 'Untitled Workflow' + '_' + workflow.id;

    this._workflowService.updateWorkflow(workflow)
      .subscribe(
        (data: Workflow) => {
          this.router.navigate([`/workflows/${data.id}`]);
        },
        (error) => {
          this._utilities.errorNotification(error);
        }
      );

    // this.dataService.addWave(workflow).subscribe((data: Workflow) => {
    //   this.router.navigate([`/workflows/${data.id}`]);
    // },
    // (error) => {
    //   this._utilities.errorNotification(error);
    // });
  }

}
