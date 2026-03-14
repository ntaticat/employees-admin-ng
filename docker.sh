docker build -t ntaticat/employees-admin:latest .
docker run -d -p 8080:80 --name employees-admin-angular ntaticat/employees-admin:latest
