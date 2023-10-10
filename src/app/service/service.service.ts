import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../employee.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }
  url = 'http://localhost:3000/posts'


  getEmployee() {
    return this.http.get<Employee[]>(this.url)
  }


  postEmployee(emp: Employee) {
    return this.http.post(this.url, emp)
  }

  deleteEmployee(id: number) {
    return this.http.delete(this.url + '/' + id)
  }
}
