# GraalVM T-Trace examples

T-Trace [documentation](https://github.com/oracle/graal/blob/master/tools/docs/T-Trace-Manual.md) and 
[javadoc](https://www.graalvm.org/tools/javadoc/com/oracle/truffle/tools/agentscript/AgentScript.html#VERSION).

T-Trace documentation: https://github.com/oracle/graal/blob/master/tools/docs/T-Trace-Tracing.md.
The code has been tested with https://github.com/graalvm/graalvm-ce-builds/releases/tag/vm-20.0.0.

Run Jaeger server:
```
docker run --rm -it --net=host jaegertracing/all-in-one:1.16.0
```

Install Jaeger tracer:
```
$GRAALVM_HOME/bin/npm install jaeger-client@3.17.2
```

Run the application:
```
$GRAALVM_HOME/bin/node --experimental-options --js.print=true  --agentscript=jaegernode.js server.js
curl localhost:3000/hello
```

Demo with admin server (broken at the moment):
```
$GRAALVM_HOME/bin/node --experimental-options --js.print=true  --agentscript=adminserver.js server.js
# now instrument the application on the fly
curl -ivX POST http://localhost:9999/ -d @jaegernode.js
```
