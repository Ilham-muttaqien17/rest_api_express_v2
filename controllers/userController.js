import { db } from "../config/db.js";

const getAllUsers = (req, res) => {
    try {
        db.query(`SELECT * FROM users`, (err, result) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    message: "An error has occurred!",
                });
                throw err;
            }
            let users = JSON.parse(JSON.stringify(result));
            if (users) {
                return res.status(200).json({
                    error: false,
                    data: users,
                });
            } else {
                return res.status(404).json({
                    error: true,
                    message: "Data not found!",
                    data: null,
                });
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: true,
            message: err,
        });
    }
};

const getSingleUser = (req, res) => {
    try {
        const { id } = req.params;
        db.query(`SELECT * FROM users WHERE user_id = ${id}`, (err, result) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    message: "An error has occurred!",
                });
                throw err;
            }
            let user = JSON.parse(JSON.stringify(result))[0];
            if (user) {
                return res.status(200).json({
                    error: false,
                    data: user,
                });
            } else {
                return res.status(404).json({
                    error: true,
                    message: `Data with id ${id} not found!`,
                    data: null,
                });
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: true,
            message: err,
        });
    }
};

const createUser = (req, res) => {
    try {
        const { name, email, contact } = req.body;
        if (!name) {
            return res.status(400).json({
                error: true,
                message: `Name can't be empty!`,
            });
        }

        if (!email) {
            return res.status(400).json({
                error: true,
                message: `Email can't be empty!`,
            });
        }

        if (!contact) {
            return res.status(400).json({
                error: true,
                message: `Contact can't be empty!`,
            });
        }

        db.query(
            `INSERT INTO users(name, email, contact) VALUES('${name}', '${email}', '${contact}')`,
            (err, result) => {
                if (err) {
                    res.status(400).json({
                        error: true,
                        message: "An error has occurred!",
                    });
                    throw err;
                }
                if (result.affectedRows > 0) {
                    return res.status(201).json({
                        error: false,
                        message: "Data added successfully!",
                    });
                } else {
                    return res.status(400).json({
                        error: true,
                        message: "Data failed to add!",
                    });
                }
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: true,
            message: err,
        });
    }
};

const updateUser = (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, contact } = req.body;

        let dataToUpdate = [];

        if (name) dataToUpdate.push(` name =  '${name}'`);

        if (email) dataToUpdate.push(` email = '${email}'`);

        if (contact) dataToUpdate.push(` contact = '${contact}'`);

        let updateQuery = `UPDATE users SET ${dataToUpdate.join()} WHERE user_id = ${id}`;

        db.query(updateQuery, (err, result) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    message: "An error has occurred!",
                });
                throw err;
            }
            if (result.affectedRows > 0) {
                res.status(200).json({
                    error: false,
                    message: "Data updated successfully!",
                });
            } else {
                res.status(400).json({
                    error: true,
                    message: "Data failed to update!",
                });
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: true,
            message: err,
        });
    }
};

const deleteUser = (req, res) => {
    try {
        const { id } = req.params;
        db.query(`DELETE FROM users WHERE user_id = ${id}`, (err, result) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    message: "An error has occurred!",
                });
                throw err;
            }
            if (result.affectedRows > 0) {
                return res.status(200).json({
                    error: false,
                    message: "Data removed successfully!",
                });
            } else {
                return res.status(400).json({
                    error: true,
                    message: "Data failed to remove!",
                });
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: true,
            message: err,
        });
    }
};

export { getAllUsers, getSingleUser, createUser, updateUser, deleteUser };
