package com.abtest.first.repository;


import com.abtest.first.domain.Project;
import com.abtest.first.domain.Test;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Getter
public class ProjectRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    public Project create(Project project) {
        Query query = new Query();

        mongoTemplate.insert(project);

        query.addCriteria(Criteria.where("id").is(project.getId()));

        return mongoTemplate.findOne(query, Project.class, "projects");
    }

    public UpdateResult edit(int id, Project project) {
        Query query = new Query();
        Update update = new Update();

        query.addCriteria(Criteria.where("_id").is(id));

        update.set("name", project.getName());
        update.set("content", project.getContent());
        update.set("adminCode", project.getAdminCode());
        update.set("updateDate", project.getUpdateDate());
        update.set("tests", project.getTests());

        return mongoTemplate.updateMulti(query, update, "projects");
    }

    public DeleteResult delete(int id) {
        Query query = new Query();

        query.addCriteria(Criteria.where("_id").is(id));
        return mongoTemplate.remove(query, "projects");
    }



    public List<Project> findAll() { return mongoTemplate.findAll(Project.class); }

    public Project findById(int id) { return mongoTemplate.findById(id, Project.class); }

    // 검색할 때 사용할 쿼리
    public List<Project> findBytitle(String name) {
        Query query = new Query();

        query.addCriteria(Criteria.where("name").is(name));
        return mongoTemplate.find(query, Project.class);
    }

    public UpdateResult insertTest(int id, List<Test> tests) {
        Query query = new Query();
        Update update = new Update();

        query.addCriteria(Criteria.where("_id").is(id));
        update.set("tests", tests);

        return mongoTemplate.updateMulti(query, update, Project.class);
    }

}
