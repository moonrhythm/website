tar -zcf build.tar.gz -C dist/ .
gcloud compute copy-files build.tar.gz instance-1:/var/www/moonrhythm_info --project moonrhythm-1052 --zone asia-east1-a
gcloud compute ssh instance-1 --project moonrhythm-1052 --zone asia-east1-a --command "cd /var/www/moonrhythm_info && tar zxf build.tar.gz && rm build.tar.gz"
