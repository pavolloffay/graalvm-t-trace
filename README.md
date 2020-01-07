# GraalVM T-Trace examples

T-Trace [documentation](https://github.com/oracle/graal/blob/master/tools/docs/T-Trace-Manual.md)

```
$GRAALVM_HOME/bin/node --experimental-options --js.print=true  --agentscript=http-instrumentation.js   server.js
curl localhost:3000/hello
```
