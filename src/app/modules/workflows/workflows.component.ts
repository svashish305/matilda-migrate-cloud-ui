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
      console.log(params);
      this.waveId = params.id; 
      this.getWaveData(params.id);
    });

    //this.getWaves();
  }

  /**
   *
   * @description gets list of waves and calls first wave details
   */
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

  /**
   *
   * @param id, id of wave must be passed as param
   * @description gets details of specific wave using id
   */
  getWaveData(id) {
    // this.waves.forEach((wave) => {
    //   if (wave.id === id) {
    //     wave.selected = true;
    //   } else {
    //     wave.selected = false;
    //   }
    // });

    // this.dataService.getWave(id).subscribe((res: any) => {
    //   this.waveData = res;
    // });
    this._workflowService.getWorkflowById(id).subscribe((data: any) => this.waveData = data);
  }

  /**
   *
   * @description Show popup to add new wave
   */
  addNewWave() {
    this.showPopup = true;
  }

  /**
   *
   * @description Adds new wave using the user inputs
   */
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

  /**
   *
   * @description toggles collapse of waves list
   */
  collapseWaveList() {
    this.waveListCollapsed = !this.waveListCollapsed;
    if (this.waveListCollapsed) {
      this.showWaveList = false;
    }
  }

  /**
   *
   * @description expands waves list  on hover when in collapsed state
   */
  waveListEntered() {
    if (this.waveListCollapsed) {
      this.showWaveList = true;
    }
  }

  /**
   *
   * @description collases waves list on leaving the list area when in collapsed state
   */
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
    console.log(payload);
    const workflow = payload.payload;
    const message = payload.message;
    const type = payload.type;
    console.log(workflow);
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
}
