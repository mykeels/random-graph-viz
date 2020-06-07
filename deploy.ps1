git branch -f gh-pages       

git checkout gh-pages

git reset --hard origin/master

yarn build

cp -r build/* .

git add -A .

git commit -a -m 'push to gh-pages'

git push origin gh-pages --force

git checkout master