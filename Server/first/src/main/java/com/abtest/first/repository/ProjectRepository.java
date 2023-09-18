package com.abtest.first.repository;


import com.abtest.first.domain.Project;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class ProjectRepository {

    private static Map<Integer, Project> projects = new HashMap<>();
    private static int sequence = 0;

    public void save(Project project) {
        project.setId(++sequence);
        projects.put(project.getId(), project);
    }

    public void edit(int id, Project project) { projects.put(id, project); }

    public void delete(int id) { projects.remove(id); }

    public List<Project> findAll() { return new ArrayList<>(projects.values()); }

    public Project findById(int id) { return projects.get(id); }

    public void deleteAll() {
        projects = new HashMap<>();
        sequence = 0;
    }


}
