package com.abtest.first.service;

import com.abtest.first.domain.Project;
import com.abtest.first.domain.Test;
import com.abtest.first.repository.ProjectRepository;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;

import javax.management.Query;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Controller
@RequiredArgsConstructor

public class ProjectService {

    private final ProjectRepository projectRepository;


    public Project createProject(Project project) { return projectRepository.create(project); }

    public UpdateResult editProject(int id, String name, String content, String adminCode, List<Test> tests) {
        Project project = projectRepository.findById(id);

        project.setName(name);
        project.setContent(content);
        project.setTests(tests);
        project.setAdminCode(adminCode);

        LocalDateTime now = LocalDateTime.now();
        String formattedDate = now.format(DateTimeFormatter.ofPattern("HH:mm, yyyy-MM-dd"));
        project.setUpdateDate(formattedDate);

        return projectRepository.edit(id, project);
    }

    public DeleteResult deleteProject(int id) {
        return projectRepository.delete(id);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProject(int id) {
        return projectRepository.findById(id);
    }

    public void insert(int id, Test test) {
        Project project = getProject(id);

        List<Test> tests = project.getTests();
        tests.add(test);
        projectRepository.insertTest(id, tests);
    }

    public void delete(int id, List<Test> tests) {
        Project project = getProject(id);
        project.setTests(tests);
        projectRepository.edit(id, project);
    }

}