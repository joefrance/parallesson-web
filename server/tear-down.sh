# Stop the container
echo 'Stopping the p9n-web container...'
docker stop p9n-web

# Remove the container
echo 'Removing the p9n-web container...'
docker rm p9n-web

echo 'Complete!'