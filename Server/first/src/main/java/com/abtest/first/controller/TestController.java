package com.abtest.first.controller;

import com.abtest.first.domain.*;
import com.abtest.first.domain.dto.TestForm;
import com.abtest.first.service.ProjectService;
import com.abtest.first.service.TestService;
import io.swagger.models.Response;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("")
@Getter
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
            @RequestParam(name = "image2") MultipartFile image2,
            @RequestParam(name = "prompt") MultipartFile prompt
    ) throws IOException, ServletException, ParseException {


        JSONParser parser = new JSONParser();
        Object obj = parser.parse(body);
        JSONObject form = (JSONObject) obj;

        Test test = Test.builder()
                .maxPart(Integer.parseInt(String.valueOf(form.get("maxPart"))))
                .name((String) form.get("name"))
                .password((String) form.get("password"))
                .build();
        test.setProjectId(id);


//        LocalDateTime now = LocalDateTime.now();
//        String formattedDate = now.format(DateTimeFormatter.ofPattern("HH-mm MM/dd"));
//        test.setUpdateDate(formattedDate);


        UploadFile imageFiles1 = fileStore.storeFile(image1, (String) form.get("name"));
        UploadFile imageFiles2 = fileStore.storeFile(image2, (String) form.get("name"));
        UploadFile csvFile = fileStore.storeFile(prompt, (String) form.get("name"));
        test.setImage1(imageFiles1);
        test.setImage2(imageFiles2);
        test.setCsvFile(csvFile);

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
        return testService.getAllTests(id);
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
            ) throws IOException {
        File file = new File(testService.getTestByName(id, tname).getImage1().getPath());
        FileUtil.remove(file);
        testService.deleteTest(tname, id);
        projectService.delete(id ,testService.getAllTests(id));
        return "삭제됨";
    }


    @GetMapping("/api/project/{id}/test/{tname}/play/{page}")
    public List<ResponseEntity<Resource>> goTest(@PathVariable int id, @PathVariable String tname, @PathVariable int page) {
        List<ResponseEntity<Resource>> response = new ArrayList<ResponseEntity<Resource>>();
        CSVReader csvReader = new CSVReader();
        Test test = testService.getTestByName(id, tname);
        List<List<String>> csv = csvReader.readCSV(test);
        System.out.println(test);
        String path = test.getImage1().getPath();
        for( int i = 0; i < 2; i++) {
            Resource resource = new FileSystemResource(path + csv.get(page).get(i));

            HttpHeaders header = new HttpHeaders();
            Path filePath = null;

            try {
                filePath = Paths.get(path + csv.get(page).get(i));

                header.add("Content-type", Files.probeContentType(filePath));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

            response.add(new ResponseEntity<Resource>(resource, header, HttpStatus.OK));
        }
        return response;
    }

    @GetMapping("/image")
    public ResponseEntity<?> returnImage(@RequestParam String imageName) {
        Resource resource = new FileSystemResource(imageName);
        return new ResponseEntity<>(resource, HttpStatus.OK);
    }

    @PostMapping("/api/project/{id}/test/{tid}/vs")
    public void score() {
        // 전체 셋 개수에서 스코어 업 한 거 만큼 빼서 통계 정리
    }

    @PostMapping("/api/project/{id}/test/{tid}/likert")
    public void likert() {
        // 첫 번째 세트 기준으로 점수 매긴 후 전체 점수에서 빼서 유효성 검증
    }


    @GetMapping("/api/project/{id}/test/{tid}/result")
    public int showResultTest(@PathVariable int tid, Test test) {
        // test 결과 주는 코드
        return 0;
    }

}
