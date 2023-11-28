const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const mysql = require('mysql2');


// 정적 파일 제공을 위한 미들웨어 추가
app.use(express.static('public'));

// views 폴더에서 HTML 파일 렌더링을 위한 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
  res.render('index');
});


// MariaDB 연결 정보 설정
const connection = mysql.createConnection({
  host: 'host-name',
  user: 'user-name',
  password: 'mypassword',
  database: 'database-name',
});

// 연결 시작
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MariaDB:', err);
    return;
  }
  console.log('Connected to MariaDB');
});

// 데이터베이스에 새로운 레코드 추가
const newData = { name: 'John Doe', age: 25 };

connection.query('INSERT INTO table_name SET ?', newData, (error, results) => {
  if (error) {
    console.error('Error inserting data:', error);
    throw error;
  }
  console.log('Inserted ID:', results.insertId);
});

// 연결 종료
connection.end((err) => {
  if (err) {
    console.error('Error disconnecting from MariaDB:', err);
    return;
  }
  console.log('Disconnected from MariaDB');
});


app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
