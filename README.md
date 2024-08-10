# WEBBLOGVAN

English

A. Download and install xampp version 8.2.12 / PHP 8.2.12 to run files "php" on "https://www.apachefriends.org/download.html'

B. If "SQL Server Management Studio" is not installed, please download this application as the database is needed 

C. These are the following instructions to access sqlsrv (Microsoft Drivers for PHP for SQL Server) through the application "xampp": 
1. Download and install "driver SQLSRV"
- Access Microsoft Drivers for PHP for SQL Server: https://learn.microsoft.com/en-us/sql/connect/php/download-drivers-php-sql-server?view=sql-server-ver16
- Download the applicaible version of "php" and your OS:
- Also download "sqlsrv" and "pdo_sqlsrv"
- Extract the downloaded file. Once extracted, there will be a lot of files labeled ".dll" that is applicable with different "phps"
2. Copy the files ".dll" into the "XAMPP" folder
- Open the "XAMPP" folder
- Find the "php\ext" folder
- Copy the file ".dll" (I have copied files "php_pdo_sqlsrv_82_ts_x64.dll" and "php_sqlsrv_82_ts_x64.dll" on my device, however, depending the on the device that is being used to access these files, the file that needs to be copied may be different) into the folder labeled "ext"
3. Configure PHP to use the SQLSRV driver
- Open "file php.ini" (usually can be found with "C:\xampp\php\php.ini") with a text editor
- Add the following to "Dymanic Extensions" (To be more specific, I added the words '[CLI Server]' above the line.):
```
extension=php_pdo_sqlsrv_82_ts_x64.dll
extension=php_sqlsrv_82_ts_x64.dll
```
(Depending on which 2 files you copied in part 2, change the syntax according to the names of those 2 files)
- Save the file "php.ini" and close text editor 
4. Open the "Apache"
- Open "XAMPP Control Panel"
- Press the "stop" button for "Apache" before pressing "start"
5. Check the installation
- Ensure the extension is successfully installed. You can create "file php" to check. Create a new file entitled "check_sqlsrv.php" in the folder "htdocs" (C:\xampp\htdocs\check_sqlsrv.php) and add:
```
<?php
if (extension_loaded('sqlsrv')) {
    echo 'SQLSRV extension is loaded!';
} else {
    echo 'SQLSRV extension is not loaded.';
}

if (extension_loaded('pdo_sqlsrv')) {
    echo 'PDO_SQLSRV extension is loaded!';
} else {
    echo 'PDO_SQLSRV extension is not loaded.';
}
?>
```
- Access the file to be directed to this browser: http://localhost/check_sqlsrv.php. If the extension is installed corrected, "SQLSRV extension is loaded!" and "PDO_SQLSRV extension is loaded!" will appear.

D. If the installion is successful, move the folder that includes this project to "htdocs" in "XAMPP" (C:\xampp\htdocs on Windows)

E. Create a database in "sql server":
1. Open SQL Server Management Studio (SSMS)
2. Connect to SQL Server:
- In the "Connect to Server" window, fill out the following information:
+ Server type: Database Engine
+ Server name: your server name (this can be "localhost" or "remote server" name).
+ Authentication: Windows Authentication or SQL Server Authentication (if you use SQL Server Authentication, create a new username and password).
- Press Connect.
3. Press the button entitled "New Query" to create a space to code. Copy the code from "file webblog_database.sql" to the space that was previously created
4. Excute the code

F. Be aware: The file "db.php" will have the variable "$serverName = "LAPTOP-MUS82LPQ"." Change the value of that variable into your server name. If you use " SQL Server Authentication" in 'step 2' of 'part E,' you have to change the variable "$connectionOptions" of the "file connect.php" by using the following code:
```
$connectionOptions = array(
"Database" => "REACTLOGIN2",
);
```

G. Restart XAMPP Control Panel: Open XAMPP Control Panel and restart Apache

H. Access project from browser: http://localhost/your_project_name. Example: (http://localhost/WEBBLOG/html/index.html)

Vietnamese

A. Tải và cài đặt xampp version 8.2.12 / PHP 8.2.12 để chạy được các file php trên https://www.apachefriends.org/download.html

B. Nếu chưa có SQL Server Management Studio thì cần phải tải về vì em sử dụng công cụ đó để lưu database của web  

C. Sau khi tải xampp về thì để cài đặt và sử dụng thư viện sqlsrv (Microsoft Drivers for PHP for SQL Server) với XAMPP, cần thực hiện các bước sau:
1. Tải về và cài đặt driver SQLSRV:
- Truy cập trang Microsoft Drivers for PHP for SQL Server: https://learn.microsoft.com/en-us/sql/connect/php/download-drivers-php-sql-server?view=sql-server-ver16
- Tải về phiên bản tương thích với PHP và hệ điều hành của bạn.
- Đảm bảo tải về cả sqlsrv và pdo_sqlsrv.
- Giải nén file tải về, bạn sẽ thấy các file .dll tương ứng với các phiên bản PHP khác nhau.
2. Copy các file .dll vào thư mục XAMPP:
- Mở thư mục cài đặt XAMPP của bạn (thường là C:\xampp).
- Tìm thư mục php\ext (ví dụ: C:\xampp\php\ext).
- Copy các file .dll (em copy 2 file này: php_pdo_sqlsrv_82_ts_x64.dll và php_sqlsrv_82_ts_x64.dll, tùy vào cấu hình của máy để chọn) vào thư mục ext này.
3. Cấu hình PHP để sử dụng driver SQLSRV:
- Mở file php.ini (thường nằm ở C:\xampp\php\php.ini) bằng một trình soạn thảo văn bản.
- Thêm các dòng sau vào phần Dynamic Extensions (cụ thể hơn thì em thêm ở phía trên của dòng chữ'[CLI Server]'):
```
extension=php_pdo_sqlsrv_82_ts_x64.dll
extension=php_sqlsrv_82_ts_x64.dll
```
(Tùy theo 2 file nào mà bạn copy ở phần 2 thì đổi cú pháp theo tên 2 file đó)
- Lưu file php.ini và đóng trình soạn thảo.
4. Khởi động lại Apache
- Mở XAMPP Control Panel.
- Bấm nút "Stop" cho Apache, sau đó bấm nút "Start" để khởi động lại Apache.
5. Kiểm tra cài đặt:
- Để chắc chắn rằng các extension đã được cài đặt thành công, bạn có thể tạo một file PHP để kiểm tra. Tạo một file mới tên là check_sqlsrv.php trong thư mục htdocs của bạn (C:\xampp\htdocs\check_sqlsrv.php) và thêm nội dung sau:
```
<?php
if (extension_loaded('sqlsrv')) {
    echo 'SQLSRV extension is loaded!';
} else {
    echo 'SQLSRV extension is not loaded.';
}

if (extension_loaded('pdo_sqlsrv')) {
    echo 'PDO_SQLSRV extension is loaded!';
} else {
    echo 'PDO_SQLSRV extension is not loaded.';
}
?>
```
- Truy cập vào file này qua trình duyệt: http://localhost/check_sqlsrv.php. Nếu các extension được cài đặt đúng, bạn sẽ thấy thông báo SQLSRV extension is loaded! và PDO_SQLSRV extension is loaded!.

D. Sau khi cài đặt thành công thì đưa folder chứa project của em vào trong thư mục htdocs của XAMPP (thường nằm ở C:\xampp\htdocs trên Windows).

E. Sau đó cần phải tạo database trên sql server:

1. Mở SQL Server Management Studio (SSMS).
2. Kết Nối Tới SQL Server:
- Trong cửa sổ Connect to Server, điền các thông tin cần thiết:
+ Server type: Database Engine
+ Server name: Tên server của bạn (có thể là localhost hoặc tên máy chủ từ xa).
+ Authentication: Windows Authentication hoặc SQL Server Authentication (nếu sử dụng SQL Server Authentication, hãy nhập username và password của bạn).
- Nhấn Connect.
3. Nhấn vào nút New Query để tạo ra chỗ để viết code, sau đó copy code từ file webblog_database.sql vào chỗ đó.
4. Nhấn execute để chạy code

F. Lưu ý: Trong file "db.php" có biến $serverName = "LAPTOP-MUS82LPQ" hãy đổi hết giá trị của biến đó thành tên server của bạn và nếu bạn sử dụng SQL Server Authentication ở bước 2 của phần E thì cần sửa lại biến $connectionOptions của file connect.php như sau:
```
$connectionOptions = array(
"Database" => "REACTLOGIN2",
"Uid" => "your_username", // Tên đăng nhập SQL Server
"PWD" => "your_password" // Mật khẩu SQL Server*/
);
```

G. Khởi Động XAMPP Control Panel: Mở XAMPP Control Panel và khởi động Apache

H. Cài đặt React:

1. Cài đặt Node.js và npm
Node.js đi kèm với npm, nên khi bạn cài đặt Node.js, npm sẽ tự động được cài đặt cùng. Để cài đặt Node.js:

Truy cập trang web Node.js và tải phiên bản phù hợp với hệ điều hành của bạn.
Sau khi tải xuống, bạn chạy tệp cài đặt và làm theo các bước hướng dẫn để cài đặt Node.js.

2. Kiểm tra cài đặt Node.js và npm
Sau khi cài đặt Node.js, bạn có thể kiểm tra phiên bản Node.js và npm bằng các lệnh sau:
```
node -v
npm -v
```
Nếu bạn thấy phiên bản hiển thị, điều đó có nghĩa là Node.js và npm đã được cài đặt thành công.

3. Cài đặt create-react-app
create-react-app là một công cụ để tạo dự án React với cấu hình sẵn. Để cài đặt create-react-app toàn cục:
```
npm install -g create-react-app
```
I. Khởi động project:

1. Clone dự án từ github về máy
2. Sau khi clone thành công, bạn di chuyển vào thư mục của dự án: ``` cd webblogvan```
3. Cài đặt các dependencies: ```npm install```
4. Chạy ứng dụng: ```npm start```



