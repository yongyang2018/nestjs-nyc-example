#!/usr/bin/env bash

set -e
echo $0
CUR=$(dirname $0)
CUR=$(cd $CUR; pwd)

pushd $CUR >> /dev/null

NYC=./node_modules/.bin/nyc
NEST=./node_modules/.bin/nest

# instrument code
$NYC instrument src out

mv src tmp
mv out src

$NEST build

rm -rf src
mv tmp src

popd >> /dev/null