import user from "../models/user.js"
export function login(req, res) {
  res.render("auth/login");
}

export function signup(req, res) {
  res.render("auth/signup");
}
export async function verifySignup(req,res){
    try{
    const {username, email, pass, sem, branch, phoneno}=req.body;
    const existing=await user.findOne({email});
    if(existing){
        return res.send("Email Already Existed")
    }
    const users=new user({username, email, pass, sem, branch, phoneno});
    await users.save();
    res.send(" Signup successful!");
}
catch(err){
    console.error(err);
    const msg = err.errors
      ? Object.values(err.errors).map(e => e.message).join(", ")
      : "Signup failed";
    res.status(400).send(msg);
}
}
export async function verifyLogin(req, res) {
  try {
    const { email, pass } = req.body;
    if (!email || !pass) {
      return res.status(400).send("Email and password are required");
    }
    const userD = await user.findOne({ email });
    if (!userD) {
      return res.send("Invalid username or password");
    }
    if (userD.pass !== pass.trim()) {
      return res.send("Invalid username or password");
    }
    res.redirect("/unihub/notes");
  } catch (err) {
    res.status(500).send("Login error");
  }
}


export function logout(req,res){
  res.redirect("/");
}