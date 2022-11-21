import Model from '../model/model.js';
import { hashPassword, checkPassword } from '../utils/crypto.js';
import { generateAccessToken } from './auth.js';
import { checkForNulls } from '../utils/noNulls.js';

const userModel = new Model('users');
const timestamp = new Date().toISOString();

export const newUser = async (req, res) => {
    let success = false;
    let { username, password, email } = req.body;
    if (!checkForNulls(username) || !checkForNulls(password)) {
        res.status(400).json({ status: success, message: 'username and password are required' });
        return -1;
    }
    email ? email : email = null;
    const hashedPassword = await hashPassword(password);
    const columns = 'username, password, email';
    const values = `'${username}', '${hashedPassword}', '${email}'`;
    try {
        const data = await userModel.insertWithReturn(columns, values);
        success = true;
        res.status(200).json({
            message: 'user created succesfully',
            data: data.rows,
            status: true
        });
    } catch (error) {
        res.status(500).json({
            message: 'user creation failed',
            error: error,
            status: false
        });
    } finally {
        console.log(`${timestamp} USER CREATION ATTEMPT: [${username} / ${email}] ${success ? 'SUCCESS' : 'FAILED'}`);
    }
}

export const login = async (req, res) => {
    let success = false;
    const { username, password } = req.body;
    try {
        const data = await userModel.select('username, password', ` WHERE username='${username}'`);
        if (data.rows.length < 1) {
            res.status(404).json({
                message: 'user not found',
                status: false
            });
        } else {
            const user = data.rows[0];
            const pwMatch = await checkPassword(password, user.password);
            if (pwMatch) {
                success = true;
                const token = generateAccessToken({ username: user.username });
                res.status(200).json({
                    message: 'login successful',
                    status: true,
                    token: token
                })
            } else {
                res.status(401).json({
                    message: 'incorrect password',
                    status: false
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: 'login failed with error ' + error,
            status: false,
        });
    } finally {
        console.log(`${timestamp} LOGIN ATTEMPT: [${username}] ${success ? 'SUCCESS' : 'FAILED'}`);
    }
}