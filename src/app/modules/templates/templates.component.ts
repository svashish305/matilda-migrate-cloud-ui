import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TemplateService } from './services/template.service';
import { Template } from 'src/app/models/data.model';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent implements OnInit {
  templateData: Template;
  
  constructor(
    private _templateService: TemplateService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      console.log(params);
      this.getTemplate(params.id);
    });
  }

  getTemplate(id: any) {
    this._templateService.getTemplateById(id)
      .subscribe(
        (data: any) => this.templateData = data,
        (error) => { });
  }
}
