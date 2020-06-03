import { Component, OnInit } from "@angular/core";
import { DataService } from "src/services/data.service";

@Component({
  selector: "app-workflows",
  templateUrl: "./workflows.component.html",
  styleUrls: ["./workflows.component.scss"],
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

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getWaves();
  }

  /**
   *
   * @description gets list of waves and calls first wave details
   */
  getWaves() {
    this.dataService.getWaves().subscribe((data: any[]) => {
      this.waves = data;
      this.rawwaves = this.waves;
      this.getWaveData(this.waves[0].id);
    });
  }

  /**
   *
   * @param id, id of wave must be passed as param
   * @description gets details of specific wave using id
   */
  getWaveData(id) {
    this.waves.forEach((wave) => {
      if (wave.id === id) {
        wave.selected = true;
      } else {
        wave.selected = false;
      }
    });

    this.dataService.getWave(id).subscribe((res: any) => {
      this.waveData = res;
    });
  }

  /**
   *
   * @description searches the wavelist using the search key
   */

  search(e) {
    if (!this.searchKey) {
      this.waves = this.rawwaves;
      return true;
    }
    this.waves = this.rawwaves.filter((x) => {
      return x.name.toLowerCase().search(this.searchKey.toLowerCase()) !== -1;
    });
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
        waveTypes: [{ name: "New group", edit: true, templates: [] }],
      };
      // this.getWaveData(id);
      this.showPopup = false;
      this.waveName = "";
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
    this.waveName = "";
  }
}
