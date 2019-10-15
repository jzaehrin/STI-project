#!/bin/bash

basepath=$(git rev-parse --show-toplevel)
prespath="$basepath/pres"
mdfile="$prespath/pres.md"
assets="$prespath/assets"
tmppath=$(mktemp -d)
branch=$(git branch | grep \* | cut -d ' ' -f2)

cd "$basepath"

function cleanup() {
    echo -en "\nCleaning up...\n        - "
    git checkout "$branch" 1>/dev/null
    git stash pop 1>/dev/null
    rm -rf "$tmppath"
}

echo "pandoc: Creating the reveal.js presentation..."
pandoc -t revealjs -s -o "$tmppath/index.html" "$mdfile" --highlight-style=breezedark --slide-level=2 --quiet

cp -r "$assets" "$tmppath"

echo "   git: Stashing any changes..." 
git stash 1>/dev/null

if [[ -z $(git rev-parse --verify gh-pages 2>/dev/null) ]];
then
    echo -en "   git: No 'gh-pages' branch found. Creating one...\n        - "
    git checkout --orphan gh-pages 1>/dev/null
    git rm -rf "$basepath" 1>/dev/null
else
    echo -en "   git: Existing 'gh-pages' branch found!\n        - "
    git checkout gh-pages 1>/dev/null
fi

cp -a "$tmppath/." "$basepath"

echo -e "   git: Pushing the new presentation with its assets...\n"
git add "$basepath/index.html" "$basepath/assets" 1>/dev/null
git commit -m "Push presentation (index.html)" 1>/dev/null
git push -u origin gh-pages 1>/dev/null

trap cleanup EXIT
