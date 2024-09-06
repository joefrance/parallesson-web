./tear-down.sh
./build.sh

docker run -d -p 8051:80 --restart always --network web-sites --ip 172.18.0.11 --name 'p9n-web' p9n-web

echo 'Complete!'