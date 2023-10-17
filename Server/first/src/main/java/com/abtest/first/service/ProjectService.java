package com.abtest.first.service;

import com.abtest.first.domain.Project;
import com.abtest.first.domain.Test;
import com.abtest.first.repository.ProjectRepository;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
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

    public UpdateResult insert(int id, Test test) {
        List<Test> tests = new ArrayList<>();
        tests.add(test);
        return projectRepository.insertTest(id, tests);
    }

}