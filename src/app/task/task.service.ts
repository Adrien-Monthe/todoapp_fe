import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SERVER_API_URL} from '../app.constants';
import {ITask} from '../interfaces/task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly BaseURL: string = SERVER_API_URL + '/tasks';
  private readonly http = inject(HttpClient)

  create(data: ITask) {
    return this.http.post(this.BaseURL, data);
  }

  update(data: ITask) {
    return this.http.put<ITask>(this.BaseURL + '/' + data.id, data);
  }

  getAll() {
    return this.http.get<ITask[]>(this.BaseURL);
  }

  delete(id: number) {
    return this.http.delete(this.BaseURL + '/' + id);
  }

  markAsDone(id: number) {
    return this.http.post(this.BaseURL + '/' + id + '/complete', {});
  }
}
