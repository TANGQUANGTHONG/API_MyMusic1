const express = require('express');
const Song_ne = require('../model/Song');
const router = express.Router();

// Route để thêm bài nhạc mới
router.post('/add_new_song', async (req, res) => {
    const { Name_Song, Genre, Album, Singer, Template, URL_Song } = req.body;

    try {
        const _song = new Song_ne({ Name_Song, Genre, Album, Singer, Template, URL_Song });
        await _song.save();
        res.status(200).json('Thêm nhạc thành công!'); // Đảm bảo phản hồi dạng JSON
    } catch (error) {
        res.status(500).json({ message: 'không thể thêm', error: error.message }); // Đảm bảo phản hồi lỗi dạng JSON
    }
});

// Route để lấy tất cả bài hát
router.get('/get_all_song', async (req, res) => {
    try {
        const _song = await Song_ne.find();
        res.status(200).json(_song);
    } catch (error) {
        res.status(500).json({ message: 'không thể tải bài hát', error: error.message });
    }
});

// Route để lấy bài hát theo thể loại
router.get('/get_song_by_genre', async (req, res) => {
    const { Genre } = req.query;
    try {
        const songs = await Song_ne.find({ Genre });
        if (songs.length > 0) {
            res.status(200).json(songs);
        } else {
            res.status(400).json({ message: 'không tìm thấy bài hát nào thuộc thể loại này' });
        }
    } catch (error) {
        res.status(500).json({ message: 'không thể tải bài hát', error: error.message });
    }
});

// Route để lấy bài hát theo ID
router.get('/get_song_by_id/:id', async (req, res) => {
    const { id } = req.params; // Lấy id từ tham số

    try {
        const song = await Song_ne.findById(id); // Sử dụng findById để tìm bài hát
        if (song) {
            res.status(200).json(song); // Trả về thông tin bài hát
        } else {
            res.status(404).json({ message: 'Không tìm thấy bài hát với ID này' }); // Không tìm thấy
        }
    } catch (error) {
        res.status(500).json({ message: 'Không thể tải bài hát', error: error.message });
    }
});




module.exports = router;
