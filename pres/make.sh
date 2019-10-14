#!/bin/bash

basepath=$(git rev-parse --show-toplevel)
prespath="$basepath/pres"
mdfile="$prespath/pres.md"
assets="$prespath/assets"
tmppath=$(mktemp -d)
branch=$(git branch | grep \* | cut -d ' ' -f2)

pushd "$basepath" || exit

function cleanup() {
  git checkout "$branch"

  git stash pop
  rm -rf "$tmppath"
  popd || exit
}

pandoc -t revealjs -s -o "$tmppath/index.html" "$mdfile" -V revealjs-url=https://revealjs.com

cp -r "$assets" "$tmppath"

git stash

if [[ -z $(git rev-parse --verify gh-pages) ]];
then
  git checkout --orphan gh-pages
  git rm -rf "$basepath"
else
  git checkout gh-pages
fi

cp -a "$tmppath/." "$basepath"

git add "$basepath/index.html" "$basepath/assets"
git commit -m "Push presentation (index.html)"
git push -u origin gh-pages

trap cleanup EXIT
