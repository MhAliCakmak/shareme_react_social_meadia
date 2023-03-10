export const userQuery = (userId) =>{
    const query= `*[_type == "user" && sub == "${userId}]`
    return query;
}