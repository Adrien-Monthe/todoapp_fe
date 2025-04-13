import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ITask} from '../interfaces/task';
import {TaskService} from './task.service';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
})
export class TaskComponent implements OnInit {
  tasks: ITask[] = [];
  showModal = false;
  editingTask: ITask | null = null;

  taskForm: Partial<ITask> = {
    title: '',
    description: ''
  };

  constructor(private readonly taskService: TaskService,
              private readonly authService: AuthService) {
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAll().subscribe({
      next: (res) => (this.tasks = res),
      error: (err) => console.error('Error loading tasks', err),
    });
  }

  openAddModal(): void {
    this.editingTask = null;
    this.taskForm = {title: '', description: ''};
    this.showModal = true;
  }

  openEditModal(task: ITask): void {
    this.editingTask = task;
    this.taskForm = {title: task.title, description: task.description};
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveTask(): void {
    if (!this.taskForm.title || !this.taskForm.description) return;

    const data: ITask = {
      ...this.editingTask,
      id: this.editingTask ? this.editingTask.id : -1,
      title: this.taskForm.title,
      description: this.taskForm.description,
      isCompleted: this.editingTask?.isCompleted ?? false,
    };

    const request = this.editingTask
      ? this.taskService.update(data)
      : this.taskService.create(data);

    request.subscribe({
      next: () => {
        this.closeModal();
        this.loadTasks();
      },
      error: (err) => console.error('Error saving task', err),
    });
  }

  markAsDone(task: ITask): void {
    this.taskService.markAsDone(task.id).subscribe({
      next: () => this.loadTasks(),
      error: (err) => console.error('Error marking task as done', err),
    });
  }

  deleteTask(id: number): void {
    this.taskService.delete(id).subscribe({
      next: () => this.loadTasks(),
      error: (err) => console.error('Error deleting task', err),
    });
  }

  logout(): void {
    this.authService.signOut();
  }
}

