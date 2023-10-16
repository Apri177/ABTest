package com.abtest.first.controller;

import com.abtest.first.domain.FileStore;
import com.abtest.first.domain.Project;
import com.abtest.first.domain.Test;
import com.abtest.first.domain.UploadFile;
import com.abtest.first.domain.dto.TestForm;
import com.abtest.first.service.ProjectService;
import com.abtest.first.service.TestService;
import com.fasterxml.jackson.core.JsonParser;
import lombok.RequiredArgsConstructor;
import nonapi.io.github.classgraph.json.JSONUtils;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class TestController {

    private final ProjectService projectService;
    private final TestService testService;
    private final FileStore fileStore;

    @PostMapping("/api/project/{id}/test/create")
    public Test createTest(
            @PathVariable int id,
            HttpServletRequest request,
            @RequestParam(name = "body") String body,
            @RequestParam(name = "image1") MultipartFile image1,
            @RequestParam(name = "image2") MultipartFile image2
    ) throws IOException, ServletException, ParseException {
        System.out.println(request);
        System.out.println(image1);
        System.out.println();


        JSONParser parser = new JSONParser();
        Object obj = parser.parse(body);
        JSONObject form = (JSONObject) obj;

        Test test = Test.builder()
                .maxPart(Integer.parseInt(String.valueOf(form.get("maxPart"))))
                .name((String) form.get("name"))
                .password((String) form.get("password"))
                .build();



//        LocalDateTime now = LocalDateTime.now();
//        String formattedDate = now.format(DateTimeFormatter.ofPattern("HH-mm MM/dd"));
//        test.setUpdateDate(formattedDate);


        UploadFile imageFiles1 = fileStore.storeFile(image1, (String) form.get("name"));
        UploadFile imageFiles2 = fileStore.storeFile(image2, (String) form.get("name"));
        test.setImage1(imageFiles1);
        test.setImage2(imageFiles2);

        testService.createTest(test);

        Project setProject = projectService.getProject(id);
        setProject.getTests().add(test);
        projectService.editProject(id,
                setProject.getName(),
                setProject.getAdminCode(),
                setProject.getContent(),
                setProject.getTests());

        return test;
    }

    @GetMapping("/project/{id}/test/{tid}")
    public String showTest(@PathVariable int id, @PathVariable int tid) {
        Test test = testService.getTest(tid);
        return "redirect:/project/{id}/test/{tid}";
    }

    @PostMapping("/project/{id}/test/{tid}")
    public String editTest(@PathVariable int tid, Test test) {
//        testService.editTest(tid, test.getName(), test.getPassword(), test.getMaxParticipants());
        return "redirect:/project/{" + "}";
    }

    @PostMapping("/project/{id}/test/delete/{tid}")
    public String deleteTest(@PathVariable int tid, Test test) {
        testService.deleteTest(tid, test.getPassword());
        return "redirect:/project/{"  + "}";
    }

    @PostMapping("/api/project/{id}/test/{tid}/result")
    public int resultTest(@PathVariable int tid, Test test) {
        // test 결과 받는 코드
        return 0;
    }

    @GetMapping("/api/project/{id}/test/{tid}/result")
    public int showResultTest(@PathVariable int tid, Test test) {
        // test 결과 주는 코드
        return 0;
    }

}
