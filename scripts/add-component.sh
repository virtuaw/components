#!/usr/bin/env bash

BASEDIR=$(dirname "$0")
TEMPLATE_DIR="${BASEDIR}/templates"
COMPONENT_TEMPLATE="${TEMPLATE_DIR}/component/template"
COMPONENTS_DIR="${BASEDIR}/../src/components"

NAME=$1
CAMEL_NAME=$(echo $NAME | sed -r 's/(^|-)(\w)/\U\2/g')

SUBDIR=$2

TARGET="${COMPONENTS_DIR}/${NAME}"

cp -r $COMPONENT_TEMPLATE $TARGET

for file in $(find $TARGET -type f); do
  echo $file;
  sed -i "s/template/${NAME}/g" $file
  sed -i "s/Template/${CAMEL_NAME}/g" $file
  rename template $NAME $file
done
# sed -i 's/template/${NAME}/g' $TARGET"/"**"/"*.*
# sed -i 's/Template/${CAMEL_NAME}/g' $TARGET"/"**"/"*.*
# rename template $NAME $TARGET"/"**"/"*
