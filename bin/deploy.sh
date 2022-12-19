#!/bin/bash

VERSION=0.0.1
sed -i -e "s/\"[.0-9].[.0-9].[.0-9]\"/\"$VERSION\"/" ./package.json
git add package.json
git commit -m "$VERSION"
git tag -a v$VERSION -m "$VERSION"
git push origin HEAD
git push origin tags/v$VERSION
npm publish ./