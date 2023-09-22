package com.abtest.first.repository;


import com.abtest.first.domain.Project;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class ProjectRepository {

    private MongoTemplate mongoTemplate;
    private Query query = new Query();
    private Update update = new Update();
    private static int sequence = 0;

    public void create(Project project) {
        project.setId(++sequence);
        mongoTemplate.insert(project);
    }

    public void edit(int id, Project project) {
        query.addCriteria(Criteria.where("id").is(id));

        update.set("name", project.getName());
        update.set("content", project.getContent());
        update.set("adminCode", project.getAdminCode());
        update.set("updateDate", project.getUpdateDate());

        mongoTemplate.updateMulti(query, update, "projects");
    }

    public void delete(int id) {
        query.addCriteria(Criteria.where("id").is(id));
        mongoTemplate.remove(query, "projects");
    }

    public List<Project> findAll() { return mongoTemplate.findAll(Project.class); }

    public Project findById(int id) { return mongoTemplate.findById(id, Project.class); }

    // 검색할 때 사용할 쿼리
    public List<Project> findBytitle(String name) {
        query.addCriteria(Criteria.where("name").is(name));
        return mongoTemplate.find(query, Project.class);
    }
}
