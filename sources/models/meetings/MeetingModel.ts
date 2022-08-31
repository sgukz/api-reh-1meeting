export class Meeting {
    public getMeetingById(docno: string) {
        const meeing_id = docno
        const sql = `SELECT
                        mtr_reserv.docno,
                        CONCAT( mtr_reserv.start_date ) AS start_date,
                        CONCAT( mtr_reserv.end_date ) AS end_date,
                        mtr_reserv.title AS meeting_host_name,
                        mtr_room.name AS meeting_name,
                        mtr_reserv.human_amount,
                        mtr_reserv.status
                    FROM
                        mtr_reserv
                        LEFT JOIN mtr_room ON mtr_reserv.room_id = mtr_room.id
                    WHERE
                        mtr_reserv.docno = '${meeing_id}' AND mtr_reserv.status = 2`;
        return sql
    }
}
export default Meeting