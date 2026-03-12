#!/bin/sh
ENV="${RUNTIME_ENV:-production}"
echo "var RUNTIME_ENV = '$ENV';" > visualization/env.js
