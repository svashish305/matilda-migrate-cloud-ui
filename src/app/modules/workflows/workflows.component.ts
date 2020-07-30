import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { WorkflowService } from './services/workflow.service';
import { Utilities } from 'src/app/utils/helpers/utilities';

@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.scss'],
})
export class WorkflowsComponent implements OnInit {
  waves = [];
  rawwaves = [];
  waveData;
  searchKey;
  showPopup;
  waveName;
  waveListCollapsed;
  showWaveList;
  isRecentCollapsed = true;
  isFavouritesCollapsed = true;

  waveId: any;

  constructor(
    private dataService: DataService,
    private _workflowService: WorkflowService,
    private _utilities: Utilities,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.waveId = params.id;
      this.getWaveData(params.id);
    });
  }

  getWaves() {
    this.dataService.getWaves().subscribe((data: any[]) => {
      this.waves = data;
      this.rawwaves = this.waves;
      // this.getWaveData(this.waves[0].id);
      if (this.waveId) {
        this.getWaveData(this.waveId);
      } else {
        this.getWaveData(this.waves[0].id);
      }
    });
  }

  getWaveData(id) {
    // this._workflowService.getWorkflowById(id).subscribe((data: any) => this.waveData = data);

    this.dataService.getWave(id).subscribe((data: any) => {
      this.waveData = data;
    });
  }

  addNewWave() {
    this.showPopup = true;
  }

  addWave() {
    if (this.waveName) {
      const id = Math.random().toString(6);
      this.waves.forEach((wave) => (wave.selected = false));
      this.waves.push({ id: id, name: this.waveName, selected: true });
      this.waveData = {
        waveTypes: [{ name: 'New group', edit: true, templates: [] }],
      };
      // this.getWaveData(id);
      this.showPopup = false;
      this.waveName = '';
    }
  }

  collapseWaveList() {
    this.waveListCollapsed = !this.waveListCollapsed;
    if (this.waveListCollapsed) {
      this.showWaveList = false;
    }
  }

  waveListEntered() {
    if (this.waveListCollapsed) {
      this.showWaveList = true;
    }
  }

  waveListExit() {
    if (this.waveListCollapsed) {
      this.showWaveList = false;
    }
  }

  cancelAdd() {
    this.showPopup = false;
    this.waveName = '';
  }

  updateWorkflow(payload: any) {
    const workflow = payload.payload;
    const message = payload.message;
    const type = payload.type;
    this._workflowService.updateWorkflow(workflow, workflow.id)
      .subscribe(
        (data: any) => {
          this.waveData = data;
          this._utilities.openSnackBar(message, type);
        },
        (error) => {
          this._utilities.errorNotification(error);
          this.getWaveData(workflow.id);
        }
      )
  }

  onTagsUpdate(payload: any) {
    this._workflowService.updateTag(payload.tags, this.waveData.id)
      .subscribe((data) => {
        this._utilities.openSnackBar(payload.message, payload.type);
      },
        (error) => {
          this._utilities.errorNotification(error);
          this.getWaveData(this.waveData.id);
        });
  }

  onUpdateAccounts(payload: any) {
    this._workflowService.updateWorkflowAccounts(this.waveData.id, payload.accounts)
      .subscribe((data) => {
        this.getWaveData(this.waveData.id);
        this._utilities.openSnackBar(payload.message, payload.type);
      },
        (error) => {
          this._utilities.errorNotification(error);
          this.getWaveData(this.waveData.id);
        });
  }
}
