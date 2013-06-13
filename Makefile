BASE_FILES=src/jlog.js \
           src/mount.js \
           src/helpers.js \
           src/levels.js \
           src/logger.js \
           src/logging_event.js \
           src/layout.js \
           src/layouts/pattern.js \
           src/appender.js \
           src/appenders/console.js \
           src/appenders/ajax.js

all:
	cat ${BASE_FILES} > vendor/assets/javascripts/jlog.js
