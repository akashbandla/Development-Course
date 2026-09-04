const projectUsersPopulate = [
    {
        path : 'managerId',
        match : { isDeleted: false },
        select : "name userId email role experience"
    },
    {
        path : 'ownerId',
        match : { isDeleted: false },
        select : "name userId email role experince"
    },
    {
        path : 'createdBy',
        match : { isDeleted: false },
        select : "name email role"
    },
    {
        path : 'updatedBy',
        match : { isDeleted: false },
        select : "name email role"
    }
]

const tasksProjectUserPopulate = [
    {
        path : 'projectId',
        match : { isDeleted: false},
        select : "projectName projectId"
    },
    {
        path : 'userId',
        match : { isDeleted: false },
        select : "name userId email role experince"
    }
]

export {
    projectUsersPopulate,
    tasksProjectUserPopulate
}