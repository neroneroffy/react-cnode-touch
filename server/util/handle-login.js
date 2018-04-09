const router = require('express').Router();
const axios = require('axios');
const baseUrl = 'https://cnodejs.org/api/v1';

router.post('/login',function (req,res,next) {
  axios.post(`${basrUrl}/accesstoken`,{
    accesstoken:req.body.accessToken
  }).then(resp => {
    if(resp.status === 200 && res.data.success) {
      req.session.user = {
        accessToken:req.body.accessToken,
        loginName:resp.data.loginname,
        id:resp.data.id,
        avatarUrl:resp.data.avatar_url,
      }
      res.json({
        success:true,
        data:resp.data
      })
    }
  }).catch(err => {
    if(err.response){
      res.json({
        success:false,
        data:err.response
      })
    }else{
      next(err)
    }
  })
});

module.exports = router
