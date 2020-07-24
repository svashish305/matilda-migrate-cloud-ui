import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TemplateService } from './services/template.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';
import { Template } from 'src/app/utils/models/data.model';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent implements OnInit {
  templateData: Template;

  constructor(
    private _templateService: TemplateService,
    private _snackBar: MatSnackBar,
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
        (data: any) => {
          this.templateData = data;
          console.log(this.templateData);
        },
        (error) => { 

        });
  }

  updateTemplate(template: Template) {
    console.log(template);
    this._templateService.updateTemplate(template, template.id)
        .subscribe(
          (data: any) => {
            this._snackBar.dismiss();
            this.templateData = data;
          },
          (error) => {
            this.openSnackBar(error.error['message'], 'error');
            this.getTemplate(template.id);
          }
        )
  }

  openSnackBar(message: string, snackType: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: { message: message, snackType: snackType, snackBar: this._snackBar },
      panelClass: [snackType],
    });
  }
}
