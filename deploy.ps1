param (
    [Parameter(Mandatory=$true)][string]$commitMessage
)

"Deleting old buildation"
Remove-Item .\build -Force -Recurse -ErrorAction Ignore
yarn build
git worktree prune
Remove-Item .git\worktrees\build\ -Force -Recurse -ErrorAction Ignore

"Checking out gh-pages branch into build"
git worktree add -B gh-pages build origin/gh-pages

"Committing master branch"
git add --all
git commit -m $commitMessage --allow-empty

"Committing gh-pages branch"
Push-Location -path build
git add --all
git commit -m $commitMessage --allow-empty

"Pushing gh-pages branch to Github"
git push origin gh-pages

# pop back to Hugo folder
Pop-Location