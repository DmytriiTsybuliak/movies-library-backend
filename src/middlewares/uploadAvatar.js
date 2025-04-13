import multer from 'multer';

// const storage = multer.diskStorage({
//     destination: 'uploads/',
//     filename: (_, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     },
// });

export const uploadAvatar = multer({ dest: 'uploads/' }).single('avatar');
