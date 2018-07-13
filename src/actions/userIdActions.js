export const updateUserId = (updatedUserId) => (
    {
        type : 'UPDATE_USER_ID',
        userId : updatedUserId
    }
)

export const updateUserName = (name) => (
    {
        type : 'UPDATE_USER_NAME',
        name : name
    }
)
