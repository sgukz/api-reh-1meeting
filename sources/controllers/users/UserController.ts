import * as express from "express"
import mysql from "mysql"
import cors from "cors"
import { itreh } from "../../configs/db"
import { User as UserModel } from "../../models/users/UserModel";
const user = new UserModel()
const connection = mysql.createConnection(itreh)
require("dotenv").config();
const crypto = require('crypto')
const jwt = require("jsonwebtoken");
const BASE_PATH = process.env.BASE_URL
const UserController = (router, secretkey) => {
    router.post(
        `${BASE_PATH}/user/register`,
        cors(),
        (req: express.Request, res: express.Response) => {
            try {
                const authHeader = req.headers.authorization
                const token = authHeader && authHeader.split(' ')[1]
                if (token == null) return res.status(403).json({ code: 403, error: "invalid token", auten: false });
                if (secretkey === token) {
                    const req_body = req.body
                    const userid = req_body.userid
                    const jwt_token = jwt.sign(req_body, secretkey);
                    const data = {
                        userid: userid,
                        token: jwt_token
                    }
                    connection.query(user.registerUser({ data: data }), function (err, result) {
                        if (!err) {
                            return res.json({
                                code: 200, msg: "success", data: data
                            });
                        } else {
                            const error_code = "ER_DUP_ENTRY"
                            if (("" + err).indexOf(error_code) > -1) {
                                return res.json({
                                    code: 400, msg: "duplicate primary", id: userid
                                });
                            }
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
        `${BASE_PATH}/user/update`,
        cors(),
        (req: express.Request, res: express.Response) => {
            try {
                const authHeader = req.headers.authorization
                const token = authHeader && authHeader.split(' ')[1]
                if (token == null) return res.status(403).json({ code: 403, error: "invalid token", auten: false });
                if (secretkey === token) {
                    const req_body = req.body
                    const userid = req_body.userid
                    const jwt_token = jwt.sign(req_body, secretkey);
                    const data = {
                        userid: userid,
                        token: jwt_token
                    }
                    connection.query(user.updateUser({ data: data }), function (err, result) {
                        if (!err) {
                            return res.json({
                                code: 200, msg: "updated success", data: data
                            });
                        } else {
                            return res.json({
                                code: 400, msg: "" + err, id: userid
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
        `${BASE_PATH}/user`,
        cors(),
        (req: express.Request, res: express.Response) => {
            try {
                const authHeader = req.headers.authorization
                const token = authHeader && authHeader.split(' ')[1]
                if (token == null) return res.status(403).json({ code: 403, error: "invalid token", auten: false });
                if (secretkey === token) {
                    const userid = req.body.userid
                    connection.query(user.getProfileUser(userid), function (err, result) {
                        if (!err) {
                            return res.json({
                                code: 200,
                                data: JSON.parse(JSON.stringify(result))
                            })
                        } else {
                            res.status(403).json({ code: 403, error: "" + err });
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
        `${BASE_PATH}/user/:userID`,
        cors(),
        (req: express.Request, res: express.Response) => {
            try {
                const authHeader = req.headers.authorization
                const token = authHeader && authHeader.split(' ')[1]
                if (token == null) return res.status(403).json({ code: 403, error: "invalid token", auten: false });
                if (secretkey === token) {
                    const userid = req.params.userID
                    connection.query(user.getProfileUser(userid), function (err, result) {
                        if (!err) {
                            return res.json({
                                code: 200,
                                data: JSON.parse(JSON.stringify(result))
                            })
                        } else {
                            res.status(403).json({ code: 403, error: "" + err });
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

export default UserController