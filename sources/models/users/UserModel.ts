export class User{
    public registerUser(formData: object){
        const userid = Object.values(formData).map(x => x.userid);
        const token = Object.values(formData).map(x => x.token);
        const sql = `INSERT INTO reh1meeting(userId, data_info, created_date)
                    VALUES('${userid}', '${token}', NOW())`;
        return sql
        
    }

    public updateUser(formData: object){
        const userid = Object.values(formData).map(x => x.userid);
        const token = Object.values(formData).map(x => x.token);
        const sql = `UPDATE reh1meeting SET data_info = '${token}'
                    WHERE userId = '${userid}'`;
        return sql
        
    }

    public getProfileUser(userid: string){
        const userId = userid
        const sql = `SELECT userId, data_info, CONCAT(created_date,'') as created_date
                     FROM reh1meeting WHERE userId = '${userId}'`;
        return sql
    }
}
export default User