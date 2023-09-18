package com.abtest.first.service;

import com.abtest.first.domain.Project;
import com.abtest.first.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Controller
@RequiredArgsConstructor

public class ProjectService {

    private final ProjectRepository projectRepository;

    public void createProject(Project project) { projectRepository.save(project); }

    public void editProject(int id, String name, String content, String adminCode) {
        Project project = projectRepository.findById(id);

        if(project == null) {
            System.out.println("프로젝트를 찾을 수 없습니다.");
            return;
        }

        if(!project.getAdminCode().equals(adminCode)) {
            System.out.println("비밀번호가 틀렸습니다.");
            return;
        }

        project.setName(name);
        project.setContent(content);

        LocalDateTime now = LocalDateTime.now();
        String formattedDate = now.format(DateTimeFormatter.ofPattern("HH:mm, yyyy-MM-dd"));
        project.setUpdateDate(formattedDate);

        projectRepository.edit(id, project);
    }

    public void deleteProject(int id, String adminCode) {
        Project project = projectRepository.findById(id);
        if(!project.getAdminCode().equals(adminCode)) {
            System.out.println("비밀번호가 틀렸습니다.");
            return;
        }

        projectRepository.delete(id);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProject(int id) {
        return projectRepository.findById(id);
    }

}