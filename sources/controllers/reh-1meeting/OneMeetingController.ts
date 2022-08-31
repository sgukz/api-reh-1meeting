import * as express from "express"
import mysql from "mysql"
import cors from "cors"
import { officer, itreh } from "../../configs/db"
import { OneMeeting as OneMeetingModel } from "../../models/reh-1meeting/OneMeetingModel";
const onemeeting = new OneMeetingModel()
const connection_reh = mysql.createConnection(itreh)
connection_reh.query("SET NAMES utf8");
require("dotenv").config();
const BASE_PATH = process.env.BASE_URL
const OneMeetingController = (router, secretkey) => {
    router.post(
        `${BASE_PATH}/saveCheckIn`,
        cors(),
        (req: express.Request, res: express.Response) => {
            try {
                const authHeader = req.headers.authorization
                const token = authHeader && authHeader.split(' ')[1]
                let resp = {}
                if (token == null) return res.status(403).json({ code: 403, error: "invalid token", auten: false });
                if (secretkey === token) {
                    const userid = req.body.userid
                    const docno = req.body.docno
                    connection_reh.query(onemeeting.checkInMeeting(userid, docno), function (err, result) {
                        if (!err) {
                            let sql_check = `SELECT CONCAT(check_in_date,'') as check_in_date 
                                            FROM meeting_register WHERE reg_docno = '${docno}' AND reg_userId = '${userid}'`;
                            connection_reh.query(sql_check, function (error, data) {
                                resp = { code: 200, check_date: data, msg: "success" };
                                return res.json(resp);
                            });
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

    router.post(
        `${BASE_PATH}/saveCheckOut`,
        cors(),
        (req: express.Request, res: express.Response) => {
            try {
                const authHeader = req.headers.authorization
                const token = authHeader && authHeader.split(' ')[1]
                let resp = {}
                if (token == null) return res.status(403).json({ code: 403, error: "invalid token", auten: false });
                if (secretkey === token) {
                    const userid = req.body.userid
                    const docno = req.body.docno
                    connection_reh.query(onemeeting.checkOutMeeting(userid, docno), function (err, result) {
                        if (!err) {
                            let sql_check = `SELECT CONCAT(check_out_date,'') as check_out_date 
                                            FROM meeting_register WHERE reg_docno = '${docno}' AND reg_userId = '${userid}'`;
                            connection_reh.query(sql_check, function (error, data) {
                                resp = { code: 200, check_date: data, msg: "success" };
                                return res.json(resp);
                            });
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

    router.get(
        `${BASE_PATH}/getCheckInCheckOut/:userid/:docno`,
        cors(),
        (req: express.Request, res: express.Response) => {
            try {
                const authHeader = req.headers.authorization
                const token = authHeader && authHeader.split(' ')[1]
                let resp = {}
                if (token == null) return res.status(403).json({ code: 403, error: "invalid token", auten: false });
                if (secretkey === token) {
                    const userid = req.params.userid
                    const docno = req.params.docno
                    connection_reh.query(onemeeting.getCheckInCheckOutMeeting(userid, docno), function (err, result) {
                        if (!err) {
                           
                            if (result.length > 0) {
                                resp = { code: 200, data: result , msg: "success" };
                                return res.json(resp);
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

    router.get(
        `${BASE_PATH}/getUserMeetingByMeetingID/:docno`,
        cors(),
        (req: express.Request, res: express.Response) => {
            try {
                const authHeader = req.headers.authorization
                const token = authHeader && authHeader.split(' ')[1]
                let resp = {}
                if (token == null) return res.status(403).json({ code: 403, error: "invalid token", auten: false });
                if (secretkey === token) {
                    const docno = req.params.docno
                    connection_reh.query(onemeeting.getUserMeetingByMeetingID(docno), function (err, result) {
                        if (!err) {
                            if (result.length > 0) {
                                resp = { code: 200, data: result , msg: "success" };
                                return res.json(resp);
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
export default OneMeetingController