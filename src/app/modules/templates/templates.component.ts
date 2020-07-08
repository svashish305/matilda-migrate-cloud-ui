import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent implements OnInit {
  templates = [];
  rawtemplates = [];
  templateData: any;
  searchKey;
  showPopup;
  templateName = 'Untitled Template';
  waveListCollapsed;
  showWaveList;
  isRecentCollapsed = true;
  isFavouritesCollapsed = true;

  templateId: any;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      console.log(params);
      this.templateId = params.id;
    });

    this.getTemplates();
  }

  /**
   *
   * @description gets list of templates and calls first template details
   */
  getTemplates() {
    this.dataService.getTemplates().subscribe((data: any[]) => {
      this.templates = data;
      this.rawtemplates = this.templates;
      if (this.templateId) {
        this.templateData = this.getTemplateData(this.templateId);
      } else {
        this.templateData = this.getTemplateData(this.templates[0].id);
      }
    });
  }

  /**
   *
   * @param id, id of template must be passed as param
   * @description gets details of specific template using id
   */
  getTemplateData(id) {
    this.templates.forEach((template) => {
      if (template.id === id) {
        template.selected = true;
      } else {
        template.selected = false;
      }
    });

    this.dataService.getTemplate(id).subscribe((res: any) => {
      this.templateData = res;
    });
  }

  /**
   *
   * @description Show popup to add new wave
   */
  // addNewTemplate() {
  //   this.showPopup = true;
  // }

  /**
   *
   * @description Adds new template using the user inputs
   */
  addTemplate() {
    if (this.templateName) {
      // const id = Math.random().toString(6);
      const id = this.templates.length + 1;
      this.templates.forEach((template) => (template.selected = false));
      // this.templateData = {
      //   waveTypes: [{ name: 'New group', edit: true, templates: [] }],
      // };
      const newTemplate = {
        id: id,
        name: this.templateName,
        data: {
          id: id,
          name: this.templateName,
          description: 'Template Description',
          TemplateTypes: [],
        },
        selected: true,
      };
      this.dataService
        .addTemplate(newTemplate)
        .subscribe((res: any) => console.log(res));
      this.templates.unshift(newTemplate);
      // this.gettemplateData(id);
      this.showPopup = false;
      this.templateName = '';
    }
  }

  /**
   *
   * @description toggles collapse of templates list
   */
  collapseWaveList() {
    this.waveListCollapsed = !this.waveListCollapsed;
    if (this.waveListCollapsed) {
      this.showWaveList = false;
    }
  }

  /**
   *
   * @description expands templates list  on hover when in collapsed state
   */
  waveListEntered() {
    if (this.waveListCollapsed) {
      this.showWaveList = true;
    }
  }

  /**
   *
   * @description collases templates list on leaving the list area when in collapsed state
   */
  waveListExit() {
    if (this.waveListCollapsed) {
      this.showWaveList = false;
    }
  }

  cancelAdd() {
    this.showPopup = false;
    this.templateName = '';
  }
}
