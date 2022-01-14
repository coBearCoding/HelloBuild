const dotenv = require('dotenv');
dotenv.config();

// const axios = require('axios');
const axios = require('axios').default;
const jwt = require('jsonwebtoken');
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENTID;
const GITHUB_SECRET_KEY = process.env.GITHUB_CLIENT_SECRET;



const githubOAuth = async(req, res) => {
    const code = req.query.code;
    const path = req.query.path;

    if(!code){
        return res.status(400).json({
            'error': 'No code returned'
        });
    }
    try{
        const axiosOptions= {
            'client_id': GITHUB_CLIENT_ID,
            'client_secret': GITHUB_SECRET_KEY,
            'code':code
        }
        const githubToken = await axios.post(`https://github.com/login/oauth/access_token`,axiosOptions);
    
        const accessToken = new URLSearchParams(githubToken.data).get('access_token');

        const axiosHeaders = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };

        const gitHubLogin = await axios.get('https://api.github.com/user', axiosHeaders);

        const token = jwt.sign(gitHubLogin.data, process.env.TOKEN_KEY);
        
        res.cookie("github-token", token, {
            httpOnly: false,
            domain: "localhost"
        });

        return res.redirect(`http://localhost:3000/repositories`);
    }catch(error){
        console.log(error);
        return res.status(400).json({
            'error': error
        });
    }

}

const getRepos = async(req, res) => {
    try{
    const {token} = req.body;
    if(!token){
        return res.status(400).json({
            'msg': 'No token provided'
        });
    }
    const validateToken = await jwt.verify(token, process.env.TOKEN_KEY);
    if(!validateToken){
        return res.status(400).json({
            'msg': 'Invalid token'
        });
    }
    const userInfo = jwt.decode(token);

    const repos = await axios.get(`https://api.github.com/users/${userInfo.login}/repos`);

    if(!repos.data){
        return res.status(200).json({
            'msg': 'No repos found',
        });
    }

    if(repos.status === 403){
        return res.status(200).json({
            'err': 'Error token invalid'
        });
    }

    
    let repoInfo = [];
    repos.data.map(repositories => {
        repoInfo.push({
            name: repositories.name,
            description: repositories.description,
            url: repositories.url,
            html_url: repositories.html_url
        });
    });

    return res.status(200).json({
        'user_avatar': userInfo.avatar_url,
        'username': userInfo.login,
        'user_url': userInfo.html_url,
        'repos': repoInfo
    });
    }catch(error){
        console.log(error);
        return res.status(403).json({
            err: 'Amount of attemps exceeded '
        });
    }
}

module.exports = {
    githubOAuth,
    getRepos
}