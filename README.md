# todo-list-backend

# Docker container
## build container
docker build -t todolist .
## run container
docker run -it -p 3000:3000 todolist

npx prisma migrate dev