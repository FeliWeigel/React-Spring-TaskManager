package com.example.taskmanager.controllers;

import com.example.taskmanager.entities.Task;
import com.example.taskmanager.exceptions.TaskNotFoundException;
import com.example.taskmanager.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/task_list")
@RequiredArgsConstructor
public class TaskController {

    private final TaskRepository taskRepository;

    @GetMapping("/all")
    @CrossOrigin("http://localhost:5173")
    public ResponseEntity<Object> getAllTasksByUser(){
        return new ResponseEntity<>(taskRepository.findAll(), HttpStatus.OK);
    }

    @PutMapping("/task/complete")
    @CrossOrigin("http://localhost:5173")
    public ResponseEntity<Object> completeTask(@RequestBody Task task){
        if(task.getId() == null){
            return new ResponseEntity<>(new TaskNotFoundException("Error! request body id is null."), HttpStatus.NOT_FOUND);
        }

        if(taskRepository.findById(task.getId()).isPresent()){
            if(!task.getIsCompleted()){
                task.setIsCompleted(true);
                return new ResponseEntity<>(taskRepository.save(task), HttpStatus.OK);
            }else {
                task.setIsCompleted(false);
                return new ResponseEntity<>(taskRepository.save(task), HttpStatus.OK);
            }
        }

        return new ResponseEntity<>(new TaskNotFoundException("Task with id:" + task.getId() + " not found in database!"), HttpStatus.NOT_FOUND);
    }

    @PostMapping("/add")
    @CrossOrigin("http://localhost:5173")
    public ResponseEntity<Object> addTask(@RequestBody Task task){

        return new ResponseEntity<>(
                taskRepository.save(task), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @CrossOrigin("http://localhost:5173")
    public ResponseEntity<Object> deleteTask(@PathVariable Long id){
        Optional<Task> task = taskRepository.findById(id);
        if(task.isPresent()){
            taskRepository.deleteById(id);
            return new ResponseEntity<>(task, HttpStatus.OK);
        }

        return new ResponseEntity<>(new TaskNotFoundException("Error! Task not found by id: " + id), HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/delete/all")
    @CrossOrigin("http://localhost:5173")
    public ResponseEntity<Object> deleteAllTasks(){
        taskRepository.deleteAll();
        return new ResponseEntity<>("All delete! Add a new Task!", HttpStatus.OK);
    }

    @PutMapping("/update")
    @CrossOrigin("http://localhost:5173")
    public ResponseEntity<Object> updateTask(@RequestBody Task task){
        if(task.getId() == null){
            return new ResponseEntity<>(new TaskNotFoundException("Error! request body id is null."), HttpStatus.NOT_FOUND);
        }

        if(taskRepository.findById(task.getId()).isEmpty()){
            return new ResponseEntity<>(new TaskNotFoundException("Error! Task not found by id: " + task.getId()), HttpStatus.NOT_FOUND);
        }

        Task taskUpdate = taskRepository.save(task);
        return new ResponseEntity<>(taskUpdate, HttpStatus.OK);
    }


}
