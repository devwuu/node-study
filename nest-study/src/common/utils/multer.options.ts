import * as fs from 'fs';
import * as path from 'path';
import * as multer from 'multer';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const creatFolder = (folder: string) => {
  try {
    console.log('Create a root uploads folder...');
    fs.mkdirSync(path.join(__dirname, '..', 'uploads'));
    // __dirname : 현재 실행중인 스크립트 파일이 위치한 디렉토리의 경로
    // 현재 폴더의 부모 폴더에 uploads 라는 폴더를 만든다
  } catch (error) {
    console.log('root folder is already exist');
  }
  try {
    console.log(`create ${folder} upload folder...`);
    fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`));
  } catch (e) {
    console.log(`${folder} upload folder is already exist`);
  }
};

const storage = (folder: string) => {
  creatFolder(folder); // 루트 폴더 만들기
  // 파일 저장
  return multer.diskStorage({
    // 어디에 저장할지
    destination(req, file, callback) {
      const folderName = path.join(__dirname, '..', `uploads/${folder}`); // [ 'uploads/cats/', 'uploads/blog/' ...]
      // destination: '/dist/common/uploads/cats',
      // dist 폴더 안에 들어간다...
      callback(null, folderName);
    },
    // 어떤 이름으로 파일을 저장할지
    filename(req, file, callback) {
      const ext = path.extname(file.originalname); // 확장자
      const fileName = `${path.basename(
        file.originalname,
        ext,
      )}_${Date.now()}${ext}`;
      // originalname에서 확장자를 제거한 순수 fileName을 가져온다
      // 현재 시각을 붙이고 ( 이름이 겹치지 않게)
      // 다시 확장자를 붙여서 확장자를 포함한 풀네임으로 만든다
      callback(null, fileName);
    },
  });
};

export const multerOptions = (folder: string): MulterOptions => {
  const result: MulterOptions = {
    storage: storage(folder),
  };
  return result;
};
