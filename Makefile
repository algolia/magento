all: release

dev:
	rm -rf _site && \
	yarn && \
	node buildComponents.js && \
	bundle install && \
	JEKYLL_ENV=development bundle exec jekyll serve
