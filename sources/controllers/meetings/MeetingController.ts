import * as express from "express"
import mysql from "mysql"
import cors from "cors"
import { officer, itreh } from "../../configs/db"
import { Meeting as MeetingModel } from "../../models/meetings/MeetingModel";
const meeting = new MeetingModel()
const connection = mysql.createConnection(officer)
const connection_reh = mysql.createConnection(itreh)
connection.query("SET NAMES utf8");
connection_reh.query("SET NAMES utf8");
require("dotenv").config();
const BASE_PATH = process.env.BASE_URL
const MeetingController = (router, secretkey) => {
    router.get(
        `${BASE_PATH}/getMeetingByDocno/:docno`,
        cors(),
        (req: express.Request, res: express.Response) => {
            try {
                const authHeader = req.headers.authorization
                const token = authHeader && authHeader.split(' ')[1]
                let resp = {}
                if (token == null) return res.status(403).json({ code: 403, error: "invalid token", auten: false });
                if (secretkey === token) {
                    const docno = req.params.docno
                    connection.query(meeting.getMeetingById(docno), function (err, result) {
                        if (!err) {
                            if (result.length > 0) {
                                let sql_check = `SELECT COUNT(reg_docno) as total_meeting FROM meeting_register WHERE reg_docno = '${docno}'`;
                                connection_reh.query(sql_check, function (error, data) {
                                    resp = { code: 200, data: result, total: data, msg: "success" };
                                    // console.log(resp);
                                    return res.json(resp);
                                });
                            } else {
                                resp = { code: 400, data: null, msg: "ไม่มีข้อมูล..." };
                                return res.json(resp);
                            }
                        } else {
                            return res.json({
                                code: 400, msg: "" + err
                            });
                        }
                    });
                } else {
                    res.status(403).json({ code: 403, error: "wrong-secret", auten: false });
                }
            } catch (e) {
                res.status(404).json({ code: 404, error: e });
            }
        }
    );
}
export default MeetingController