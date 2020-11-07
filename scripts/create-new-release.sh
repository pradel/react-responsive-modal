# Generate CHANGELOG.md
yarn standard-version

# Use prettier to normalise the changed files
yarn prettier

NEW_VERSION=$(jq -r ".version" package.json)

# Publish changes on npm
yarn build
yarn npm publish

# git commit
RELEASE_COMMIT_MESSAGE="chore: publish v${NEW_VERSION}"
git add "./CHANGELOG.md"
git add "./package.json"
git commit -m "${RELEASE_COMMIT_MESSAGE}"

# create git tag for the previous release commit
git tag "v${NEW_VERSION}" HEAD
git push
git push --tags
gh release create "v${NEW_VERSION}" --title "v${NEW_VERSION}" --notes "Take a look at the [changelog](https://github.com/pradel/react-responsive-modal/blob/master/CHANGELOG.md) to see what's new in this release ✨."
