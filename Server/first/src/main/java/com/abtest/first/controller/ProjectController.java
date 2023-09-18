package com.abtest.first.controller;

import com.abtest.first.domain.FileStore;
import com.abtest.first.domain.Project;
import com.abtest.first.domain.dto.ProjectForm;
import com.abtest.first.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Controller
@RequiredArgsConstructor
@RequestMapping("")
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping({"", "/"})
    public String home(Model model) {
        model.addAttribute("projects", projectService.getAllProjects());
        return "/home";
    }

    @PostMapping("/project/create")
    public String createProject(ProjectForm form) throws IOException {
        Project project = new Project();
        project.setName(form.getName());
        project.setContent(form.getContent());
        project.setAdminCode(form.getAdminCode());

        LocalDateTime now = LocalDateTime.now();
        String formattedDate = now.format(DateTimeFormatter.ofPattern("HH:mm, yyyy-MM-dd"));
        project.setUpdateDate(formattedDate);

        projectService.createProject(project);

        return "redirect:/";
    }

    @GetMapping("/project/{id}")
    public String showProject(@PathVariable int id, Model model){
        Project project = projectService.getProject(id);

        model.addAttribute("project", project);
        return "/project_detail";
    }

    @PostMapping("/project/{id}")
    public String editContent(@PathVariable int id, Project project) {
        projectService.editProject(id, project.getName(), project.getContent(), project.getAdminCode());
        return "redirect:/";
    }

    @PostMapping("/project/delete/{id}")
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
