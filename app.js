const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 정적 파일 제공을 위한 미들웨어 추가
app.use(express.static('public'));

// views 폴더에서 HTML 파일 렌더링을 위한 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
