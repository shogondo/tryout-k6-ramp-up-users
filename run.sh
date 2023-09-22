#! /bin/bash -eux

docker run \
    --rm \
    -i \
    --user `id -u`:`id -g` \
    --net=host \
    -e K6_STATSD_ENABLE_TAGS=true \
    -v "$(pwd)":/home/k6/project \
    grafana/k6 \
    run project/script.js
