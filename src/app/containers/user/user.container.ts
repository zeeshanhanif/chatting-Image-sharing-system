import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable} from 'rxjs';
import {AuthService} from '../../providers';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.container.html',
  styleUrls: ['./user.container.css']
})
export class UserContainer implements OnInit {

  myForm: FormGroup;
  constructor(private router: Router, private fb: FormBuilder,
  private authService: AuthService) {
    
  }

  ngOnInit() {
  }

  
}
