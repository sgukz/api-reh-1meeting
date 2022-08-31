export class OneMeeting {
    public checkInMeeting(userid: string, docno: string) {
        const sql = `INSERT INTO meeting_register(reg_userId, reg_docno, check_in_date)
                    VALUES('${userid}', '${docno}', NOW())`;
        return sql
    }
    public checkOutMeeting(userid: string, docno: string) {
        const sql = `UPDATE meeting_register SET check_out_date = NOW()
                    WHERE reg_userId = '${userid}' AND reg_docno = '${docno}'`;
        return sql
    }
    public getCheckInCheckOutMeeting(userid: string, docno: string) {
        const sql = `SELECT mr.reg_userId, 
                        mr.reg_docno, 
                        CONCAT(mr.check_in_date) as check_in_date, 
                        CONCAT(mr.check_out_date) as check_out_date
                        FROM meeting_register mr
                        LEFT JOIN reh1meeting ms ON mr.reg_userId = ms.userId
                    WHERE mr.reg_userId = '${userid}' AND mr.reg_docno = '${docno}'`;
        return sql
    }
    public getUserMeetingByMeetingID(meetingID: string){
        const sql = `SELECT mr.reg_userId,
                        mr.reg_docno,
                        CONCAT(mr.check_in_date) as check_in_date, 
                        CONCAT(mr.check_out_date) as check_out_date,
                        user.data_info
                    FROM meeting_register mr 
                        LEFT JOIN reh1meeting user ON mr.reg_userId = user.userId
                    WHERE mr.reg_docno = '${meetingID}' ORDER BY mr.check_in_date`;
        return sql
    }

}
export default OneMeeting