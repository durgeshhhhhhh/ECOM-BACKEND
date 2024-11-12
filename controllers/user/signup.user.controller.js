export function signupController(req, res) {
    let body = req.body;
    let fName = body?.fName;
    let lName = body?.lName;
    res.json({ fullName: fName + " " + lName});
}
