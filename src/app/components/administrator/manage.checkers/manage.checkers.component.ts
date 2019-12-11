import { Component, OnInit } from '@angular/core';
import { Worker } from 'src/app/Domain/Worker';
import { WorkersService } from 'src/app/services/dao/workers.service';
import { Router } from '@angular/router';
import { SelectedChecker } from './selected.checker';

@Component({
  selector: 'app-manage.checkers',
  templateUrl: './manage.checkers.component.html',
  styleUrls: ['./manage.checkers.component.scss', '../../../globalCSS/common.scss'],
})
export class ManageCheckersComponent implements OnInit {
  private checkers: Worker[] = [];
  private searchText = '';

  constructor(private workersService: WorkersService, private router: Router) {
    this.updateCheckers();
  }

  ngOnInit() {
    setInterval(() => {
      this.updateCheckers();
    }, 1000);
  }

  updateCheckers() {
    this.workersService.getEntitiesAsync().then((checkers) => this.checkers = checkers.sort((a,b) => this.sortNameAscending(a,b)));
  }

  getItems(event){
    this.searchText = event.detail.value;
  }

  createChecker() {
    this.router.navigateByUrl('main/admin/manage-checkers/create-checker');
  }

  click(checker){
    var selectedChecker = <Worker>checker;
    SelectedChecker.selectedChecker = selectedChecker;
    this.router.navigateByUrl('main/admin/manage-checkers/info-checker');
  }

  sortNameAscending(workerA: Worker, workerB: Worker) {
    var nameA = workerA.Name.toLowerCase();
    var nameB = workerB.Name.toLowerCase();

    if (nameA < nameB) {
      return -1;
    } else if (nameA > nameB) {
      return 1;
    } else {
      return 0
    }
  }
}