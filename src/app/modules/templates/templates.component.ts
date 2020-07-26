import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TemplateService } from './services/template.service';
import { Template } from 'src/app/utils/models/data.model';
import { Utilities } from 'src/app/utils/helpers/utilities';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent implements OnInit {
  templateData: Template;

  constructor(
    private _templateService: TemplateService,
    private _utitlies: Utilities,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.getTemplate(params.id);
    });
  }

  getTemplate(id: any) {
    this._templateService.getTemplateById(id)
      .subscribe(
        (data: any) => {
          this.templateData = data;
          console.log(this.templateData);
        },
        (error) => {

        });
  }

  updateTemplate(payload: any) {
    console.log(payload);
    const template = payload.payload;
    const message = payload.message;
    const type = payload.type;
    console.log(template);
    this._templateService.updateTemplate(template, template.id)
      .subscribe(
        (data: any) => {
          this.templateData = data;
          this._utitlies.openSnackBar(message, type);
        },
        (error) => {
          this._utitlies.errorNotification(error);
          this.getTemplate(template.id);
        }
      )
  }

  onTagsUpdate(payload: any) {
    this._templateService.updateTag(payload.tags, this.templateData.id)
      .subscribe((data) => {
        this._utitlies.openSnackBar(payload.message, payload.type);
      },
        (error) => {
          this._utitlies.errorNotification(error);
          this.getTemplate(this.templateData.id);
        });
  }
}
