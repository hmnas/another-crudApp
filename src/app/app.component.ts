import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Employee } from './employee.model';
import { ServiceService } from './service/service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('fileInput') fileInput: any
  @ViewChild('addEmpButton') addEmpButton: any

  empForm!: FormGroup
  edit = false
  employee!: Employee[]
  displayEmployee!: Employee[]

  constructor(private fb: FormBuilder, private empService: ServiceService) {
    this.empForm = this.fb.group({})
    this.employee = []
    this.displayEmployee = this.employee
  }


  educations = ['Matric', 'Diploma', 'Intermediate', 'Graduate', 'Post Graduate']

  ngOnInit(): void {
    this.empForm = this.fb.group({
      fName: this.fb.control(''),
      lName: this.fb.control(''),
      education: this.fb.control('default'),
      dob: this.fb.control(''),
      gender: this.fb.control(''),
      exp: this.fb.control(''),
      company: this.fb.control(''),
      salary: this.fb.control('')
    })
    console.log(this.empForm)
    this.empService.getEmployee().subscribe({
      next: (res) => {
        for (let emp of res) {
          this.employee.unshift(emp)
        }
        this.displayEmployee = this.employee
      }
    })
  }

  public get FName(): FormControl {
    return this.empForm.get('fName') as FormControl
  }
  public get lName(): FormControl {
    return this.empForm.get('lName') as FormControl
  }
  public get Education(): FormControl {
    return this.empForm.get('education') as FormControl
  }
  public get DOB(): FormControl {
    return this.empForm.get('dob') as FormControl
  }
  public get Gender(): FormControl {
    return this.empForm.get('gender') as FormControl
  }
  public get Experience(): FormControl {
    return this.empForm.get('exp') as FormControl
  }
  public get Company(): FormControl {
    return this.empForm.get('company') as FormControl
  }
  public get Salary(): FormControl {
    return this.empForm.get('salary') as FormControl
  }


  addEmp() {
    let emp: Employee = {
      fName: this.FName.value,
      lName: this.lName.value,
      education: this.educations[parseInt(this.Education.value)],
      dob: this.DOB.value,
      gender: this.Gender.value,
      exp: this.Experience.value,
      company: this.Company.value,
      salary: this.Salary.value,
      profile: this.fileInput.nativeElement.files[0]?.name
    }

    this.empService.postEmployee(emp).subscribe((res) => {
      this.employee.unshift(res as Employee)
      this.clearForm()
    })
  }


  clearForm() {
    this.FName.setValue('')
    this.lName.setValue('')
    this.Education.setValue('')
    this.DOB.setValue('')
    this.Gender.setValue('')
    this.Experience.setValue('')
    this.Company.setValue('')
    this.Salary.setValue('')
    this.fileInput.nativeElement.value = ''
  }

  setForm(emp: Employee) {
    this.FName.setValue(emp.fName)
    this.lName.setValue(emp.lName)
    let educationIndex = 0;
    this.educations.forEach((val, index) => {
      if (val === emp.education) educationIndex = index;
    });
    this.Education.setValue(educationIndex);
    this.DOB.setValue(emp.dob)
    this.Gender.setValue(emp.gender)
    this.Experience.setValue(emp.exp)
    this.Company.setValue(emp.company)
    this.Salary.setValue(emp.salary)
    this.fileInput.nativeElement.value = ''
  }

  removeEmployee(event: any) {
    this.employee.forEach((val, i) => {
      if (val.id == parseInt(event)) {
        this.empService.deleteEmployee(event).subscribe((res) => {
          this.employee.splice(i, 1)
        })
      }
    })
  }


  editEmployee(event: any) {
    this.employee.forEach((val, i) => {
      if (val.id == parseInt(event)) {
        this.setForm(val);
        this.edit = true
        console.log('Opening modal for employee:', val);
      }
    });
    this.removeEmployee(event);
    console.log('Clicking the addEmpButton');
    this.addEmpButton.nativeElement.click();
  }
  searchEmployee(event: any) {
    let filterEmp = []
    if (event === '') {
      this.displayEmployee = this.employee
    } else {
      filterEmp = this.employee.filter((val, i) => {
        let target = val.fName.toLocaleLowerCase() + '' + val.lName.toLocaleLowerCase()
        let search = event.toLocaleLowerCase()
        return target.includes(search)
      })
      this.displayEmployee = filterEmp
    }
  }

}
