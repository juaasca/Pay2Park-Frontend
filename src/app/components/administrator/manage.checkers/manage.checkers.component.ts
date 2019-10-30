import { Component, OnInit } from '@angular/core';
import { Worker } from 'src/app/Domain/Worker';
import { WorkersService } from 'src/app/services/dao/workers.service';
import { Router } from '@angular/router';
import { SelectedChecker } from './selected.checker';

@Component({
  selector: 'app-manage.checkers',
  templateUrl: './manage.checkers.component.html',
  styleUrls: ['./manage.checkers.component.scss'],
})
export class ManageCheckersComponent implements OnInit {
  private checkers: Worker[] = [];
  private searchText = '';

  constructor(private workersService: WorkersService, private router: Router) {}

  ngOnInit() {
    setInterval(() => {
      this.updateCheckersAsync();
    }, 1000);
  }

  updateCheckersAsync() {
    this.workersService.getEntitiesAsync().then((checkers) => this.checkers = checkers);
  }

  getItems(event){
    this.searchText = event.detail.value;
  }

  click(checker){
    var selectedChecker = <Worker>checker;
    SelectedChecker.selectedChecker = selectedChecker;
    this.router.navigateByUrl('main/admin/manage-checkers/info-checker');
  }
}