package com.example.taskmanager.repository;

import com.example.taskmanager.entities.Task;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TaskRepository extends CrudRepository<Task, Long> {

    @Query(value = """
          select t from Task t inner join User u\s
          on t.user.id = u.id\s
          where u.id = :id\s
      """)
    List<Task> taskListByUser(Long id);
}
