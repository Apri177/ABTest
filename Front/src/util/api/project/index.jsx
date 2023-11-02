import axios from "axios";

export const getProjectById =
async(project_id) => {
    const res = await axios.get(
        `/api/project/${project_id}`
    )
    return res
}

export const getProjects = 
async() => {
    const res = await axios.get(
        `/api/project/all`
    )
    return res
}

export const createProject = 
async(id, adminCode, name, content) => {
    const res = await axios.post(
        `/api/project/create`,
        {
            "id" : id,
            "adminCode" : adminCode,
            "name" : name,
            "content" : content,
        }
    )
    return res.data
}


export const patchProject = 
async (id, adminCode, name, content, tests) => {
    const res = await axios.patch(
        `/api/project/{id}`,
        {
            "id": id,
            "adminCode" : adminCode,
            "name": name,
            "content" : content,
            "tests" : tests
        }
    )
    return res
}
export const deleteProject = 
async (id) => {
    await axios.delete(
        `/api/project/delete/{id}`,
    )
}