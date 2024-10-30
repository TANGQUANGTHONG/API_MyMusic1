const express = require('express');
const User = require('../model/User');
const router = express.Router();


// Endpoint: Lấy thông tin người dùng
router.get('/get_all', (req, res) => {
    res.send('Danh sách người dùng');
});

// Endpoint: Thêm người dùng
router.post('/register', async (req, res) => {
   const {UserName, Email, PassWord} = req.body
try{
    
    let user = await User.findOne({Email})
    if(user){
        return res.status(400).json({message : 'Email đã tồn tại'});
    } 
    user = new User({UserName, Email, PassWord})
    await user.save();
    res.status(200).json({message : 'tạo tài khoảng thành công'})
} 
    catch(error){
        res.status(500).json({message : 'Lỗi :' ,error : error.message});
    }
});

router.post('/login', async (req, res) => {
    const{Email, PassWord} = req.body
    try{
        const user = await User.findOne({Email});
        if(!user){
            return res.status(400).json({message : 'tài khoản đã tồn tại'});
        };
        if(PassWord !== user.PassWord){
            return res.status(400).json({message : 'mật khẩu sai'});
        }
        return ré.status(200).json({message: 'Đăng nhập thành công'});
    } 
    catch(error){
        res.status(500).json({ message: 'Lỗi đăng nhập', error: error.message });
    }
});

module.exports = router;
