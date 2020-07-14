import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss'],
})
export class TopHeaderComponent implements OnInit {
  unreadNotifications = false;
  onHub = false;

  constructor(private location: Location, private router: Router) {
    this.router.events.subscribe((val) => {
      if (location.path().includes('hub')) {
        this.onHub = true;
      } else {
        this.onHub = false;
      }
    });
  }

  ngOnInit() {
    this.unreadNotifications = true;
  }

  goToHub() {
    this.router.navigate(['/hub']);
  }
}
