package com.abtest.first.controller;

import com.abtest.first.domain.Project;
import com.abtest.first.domain.Test;
import com.abtest.first.domain.dto.ProjectForm;
import com.abtest.first.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;


import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("")

//@Api(tags = { "1. Project Api "}) // Project API 일단 test
//@ApiIgnore // 제외처리
public class ProjectController {

    private final ProjectService projectService;


    @Autowired
    private MongoTemplate mongoTemplate;

    @ApiIgnore
    @GetMapping(value = {"", "/"})
    public String home(Model model) {
        return "/";
    }

    @GetMapping("/api/project/all")
    public List<Project> getProjectAll() {
        return projectService.getAllProjects();
    }

    @PostMapping("/api/project/create")
    public Project createProject(@RequestBody ProjectForm form) throws IOException {

        Project project = Project.builder()
                .adminCode(form.getAdminCode())
                .name(form.getName())
                .content(form.getContent())
                .build();
        project.setId(form.getId());

        return projectService.createProject(project);
    }

    @GetMapping("/api/project/{id}")
    public Project showProject(@PathVariable int id){
        return projectService.getProject(id);
    }

    @PatchMapping("/api/project/{id}")
    public String editContent(@PathVariable int id, Project project) {
        projectService.editProject(id, project.getName(), project.getContent(), project.getAdminCode(), project.getTests());
        return "redirect:/";
    }

    @DeleteMapping("/api/project/delete/{id}")
    public String deleteProject(@PathVariable int id, Project project) {
        projectService.deleteProject(id, project.getAdminCode());
        return "redirect:/";
    }



//    @Value("${part4.upload.path}")
//    private String uploadPath;
//@Value를 import할 때 springframework.beans.factory.annotation.Value;를 선택

//    @PostMapping("/upload")
//    public void uploadFile(MultipartFile[] uploadFiles) {
//
//
//
//        //브라우저에 따라 업로드하는 파일의 일므은 전체경로일 수 있고, 단순히 파일의 이름만을 의미할 수도 있음
//        //BLOB 형식이 아닌 상대 경로로 받을 거기 때문에
//        for (MultipartFile files : uploadFiles) {
//
//
//            String originalName = files.getOriginalFilename();
//            String fileName = originalName.substring(originalName.lastIndexOf("//") + 1);
//
//            String folderPath = makeFolder();
//
//            String uuid = UUID.randomUUID().toString();
//
//            String saveName = uploadPath + File.separator + folderPath + File.separator + uuid;
//
//            Path savePath = Paths.get(saveName);
//
//            try {
//                files.transferTo(savePath);
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        }
//    }
//    private String makeFolder() {
//        String str = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/mm/dd"));
//        String folderPath = str.replace("/", File.separator);
//
//        File uploadPathFolder = new File(uploadPath, folderPath);
//
//        if(uploadPathFolder.exists() == false) {
//            uploadPathFolder.mkdirs();
//        }
//
//        return folderPath;
//    }
}

