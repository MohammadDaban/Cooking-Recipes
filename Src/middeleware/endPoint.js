const roles = {
    Admin:'Admin',User:'User'
    }
    
    export const endPoint = {
        getAll:[roles.User,roles.Admin],
        create :[roles.Admin],
        delete:[roles.Admin],
        update:[roles.Admin],
    
    }