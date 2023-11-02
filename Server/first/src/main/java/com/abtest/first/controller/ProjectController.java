package com.abtest.first.controller;

import com.abtest.first.domain.Project;
import com.abtest.first.domain.Test;
import com.abtest.first.domain.dto.ProjectForm;
import com.abtest.first.service.ProjectService;
import com.abtest.first.service.TestService;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;


import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor

public class ProjectController {

    private final ProjectService projectService;

    private final TestService testService;

    @ApiIgnore
    @GetMapping(value = {"", "/"})
    public String home() {
        return "/";
    }

    @GetMapping("/api/project/all")
    public List<Project> getProjectAll() {
        try {
            projectService.getAllProjects();
        } catch (Exception e) {
            MongoClient mongo = new MongoClient("localhost", 27017);
            MongoDatabase database = mongo.getDatabase("ABTest");
            database.createCollection("projects");
            database.createCollection("tests");
        }
        return projectService.getAllProjects();
    }

    @PostMapping("/api/project/create")
    public Project createProject(@RequestBody ProjectForm form) {

        Project project = Project.builder()
                .adminCode(form.getAdminCode())
                .name(form.getName())
                .content(form.getContent())
                .build();
        project.setId(form.getId());
        List<Test> test = new ArrayList<>();
        project.setTests(test);

        return projectService.createProject(project);
    }

    @GetMapping("/api/project/{id}")
    public Project showProject(@PathVariable int id){
        return projectService.getProject(id);
    }

    @PatchMapping("/api/project/{id}")
    public UpdateResult editContent(@PathVariable int id, @RequestBody ProjectForm form) {

        return projectService.editProject(id,
                form.getName(),
                form.getContent(),
                form.getAdminCode(),
                form.getTests());

    }

    @DeleteMapping("/api/project/delete/{id}")
    public DeleteResult deleteProject(@PathVariable int id) {
        List<Test> tests = testService.getAllTests(id);
        for(Test t : tests) {
            testService.deleteTest(t.getName(), id);
        }

        return projectService.deleteProject(id);
    }

}

