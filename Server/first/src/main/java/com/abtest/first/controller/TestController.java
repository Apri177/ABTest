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


        JSONParser parser = new JSONParser();
        Object obj = parser.parse(body);
        JSONObject form = (JSONObject) obj;

        Test test = Test.builder()
                .maxPart(Integer.parseInt(String.valueOf(form.get("maxPart"))))
                .name((String) form.get("name"))
                .password((String) form.get("password"))
                .build();
        test.setId(id);


//        LocalDateTime now = LocalDateTime.now();
//        String formattedDate = now.format(DateTimeFormatter.ofPattern("HH-mm MM/dd"));
//        test.setUpdateDate(formattedDate);


        UploadFile imageFiles1 = fileStore.storeFile(image1, (String) form.get("name"));
        UploadFile imageFiles2 = fileStore.storeFile(image2, (String) form.get("name"));
        test.setImage1(imageFiles1);
        test.setImage2(imageFiles2);

        testService.createTest(test);
        projectService.insert(id, test);

        return test;
    }

    @GetMapping("/api/project/{id}/test/{tname}")
    public String getTestByName(@PathVariable int id, @PathVariable String tname) {
        Test test = testService.getTestByName(id, tname);
        System.out.println(test);
        return "test 조회";
    }

    @GetMapping("/api/project/{id}/test/all")
    public List<Test> getTests(@PathVariable int id) {
        List<Test> tests = testService.getAllTests(id);
        return tests;
    }

    @PatchMapping("/api/project/{id}/test/{tname}")
    public String editTest(@PathVariable int id, @PathVariable String tname, Test test) {
//        testService.editTest(tid, test.getName(), test.getPassword(), test.getMaxParticipants());
        return "redirect:/project/{" + "}";
    }

    @DeleteMapping("/api/project/{id}/test/delete/{tname}")
    public String deleteTest(
            @PathVariable int id
            ,@PathVariable String tname
            ) {
        testService.deleteTest(tname, id);
        return "삭제됨";
    }

    @PostMapping("/api/project/{id}/test/vs/up")
    public void scoreUp() {
        // 전체 셋 개수에서 스코어 업 한 거 만큼 빼서 통계 정리
    }

    @PostMapping("/api/project/{id}/test/likert/")
    public void likertUp() {
        // 첫 번째 세트 기준으로 점수 매긴 후 전체 점수에서 빼서 유효성 검증
    }

    // param에 vs 나 liker넣어서 구분 할 수도 있겠다


    @GetMapping("/api/project/{id}/test/{tid}/result")
    public int showResultTest(@PathVariable int tid, Test test) {
        // test 결과 주는 코드
        return 0;
    }

}
