import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {StudentService} from '../../providers';
import {User} from '../../models';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  user : User
  constructor(private studentService: StudentService) {
    this.user = studentService.getCurrentDisplayUser();
   }

  ngOnInit() {
  }

}
