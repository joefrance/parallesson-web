# Run with:
# docker run -d -p 8051:80 --restart always --network web-sites --ip 172.18.0.11 --name 'p9n-web' p9n-web
# Log into command line with:
# docker container run --interactive --tty  p9n-web sh
cd ..
docker build -t p9n-web -f server/Dockerfile .
echo ''
echo 'Run with:'
echo "docker run -d -p 8051:80 --restart always --network web-sites --ip 172.18.0.11 --name 'p9n-web' p9n-web"
echo ''
echo 'Log into command line with:'
echo 'docker container run --interactive --tty  p9n-web sh'
