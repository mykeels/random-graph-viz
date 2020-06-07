param (
    [Parameter(Mandatory=$true)][string]$commitMessage
)

# abort if no changes to commit
If (-Not (git status --porcelain)) {
	"No changes to commit. Aborted!"
	exit
}

"Deleting old buildation"
Remove-Item .\build -Force -Recurse -ErrorAction Ignore
mkdir build | out-null
git worktree prune
Remove-Item .git\worktrees\build\ -Force -Recurse -ErrorAction Ignore

"Checking out gh-pages branch into build"
git worktree add -B gh-pages build origin/gh-pages

"Removing existing files"
Remove-Item .\build\* -Force -Recurse -Exclude '.git'

"Generating site"
hugo --quiet

"Committing master branch"
git add --all
git commit -m $commitMessage

"Committing gh-pages branch"
Push-Location -path build
git add --all
git commit -m $commitMessage

"Pushing master to Github"
git push origin master

"Pushing gh-pages branch to Github"
git push origin gh-pages

# pop back to Hugo folder
Pop-Location