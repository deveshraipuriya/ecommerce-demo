import data from '../../data/userdata.json';

export async function signin(userEntered, passwordEntered) {
    return await new Promise((resolve, reject) => {
        let userExist = false;
        let isAdmin = false;
        for (let user of data) {
            if (user.user === userEntered && user.password === passwordEntered) {
                userExist = true;
                isAdmin = user.isAdmin;
                break;
            }
        }
        userExist ? resolve(isAdmin) : reject()
    })
}