import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.css']
})
export class EmpComponent implements OnInit {
  @Input() employee: Employee
  @Output() onRemoveEmployee = new EventEmitter<number>()
  @Output() onEditEmployee = new EventEmitter<any>()

  // constructor() {
  //   this.employee = [];
  // }
  constructor() {
    this.employee = {
      fName: '',
      lName: '',
      education: '',
      dob: '',
      gender: '',
      exp: '',
      company: '',
      salary: '',
      profile: ''
    }
  }

  ngOnInit(): void {
    console.log(this.employee)
  }

  deleteClicked() {
    this.onRemoveEmployee.emit(this.employee.id)
  }

  editClicked() {
    this.onEditEmployee.emit(this.employee.id)
  }

}
