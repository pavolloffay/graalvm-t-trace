# GraalVM T-Trace examples

T-Trace [documentation](https://github.com/oracle/graal/blob/master/tools/docs/T-Trace-Manual.md) and 
[javadoc](https://www.graalvm.org/tools/javadoc/com/oracle/truffle/tools/agentscript/AgentScript.html#VERSION).

```
$GRAALVM_HOME/bin/node --experimental-options --js.print=true  --agentscript=http-instrumentation.js   server.js
curl localhost:3000/hello
```
