
let initializeAgent = function(tracer) {
    agent.on('enter', function(ctx, frame) {
        const args = frame.args;
        if ('request' !== frame.type || args.length !== 2 || typeof args[0] !== 'object' || typeof args[1] !== 'object') {
            return;
        }
        const req = args[0];
        const res = args[1];
        const span = tracer.startSpan(req.method);
        span.setTag("span.kind", "server");
        span.setTag("http.url", req.url);
        span.setTag("http.method", req.method);
        res.id = span.context().spanIdStr;
        res.span = span;
        console.log(`agent: handling #${res.id} request for ${req.url}`);
    }, {
        roots: true,
        rootNameFilter: name => name === 'emit',
        sourceFilter: src => src.name === 'events.js'
    });

    agent.on('return', function(ctx, frame) {
        var res = frame['this'];
        if (res.span) {
            res.span.setTag("http.status_code", res.statusCode);
            if (res.statusCode >= 400) {
                res.span.setTag("error", "true");
            }
            res.span.finish();
            console.log(`agent: finished #${res.id} request`);
        } else {
            // OK, caused for example by Tracer itself connecting to Jaeger server
        }
    }, {
        roots: true,
        rootNameFilter: name => name === 'end',
        sourceFilter: src => src.name === '_http_outgoing.js'
    });
    console.log('agent: ready');
};


let initializeJaeger = function (ctx, frame) {
    agent.off('enter', initializeJaeger);

    let jaeger = frame.jaeger;

    var initTracer = jaeger.initTracer;
    console.log('agent: Jaeger tracer obtained');

    // See schema https://github.com/jaegertracing/jaeger-client-node/blob/master/src/configuration.js#L37
    var config = {
        serviceName: 't-trace-demo',
        reporter: {
            // Provide the traces endpoint; this forces the client to connect directly to the Collector and send
            // spans over HTTP
            collectorEndpoint: 'http://localhost:14268/api/traces',
            // logSpans: true
        },
        sampler: {
            type : 'const',
            param : 1
        }
    };
    var options = {
        tags: {
            't-trace-demo.version': '1.1.2',
        },
        //  metrics: metrics,
        logger: console,
        sampler: {
            type : 'const',
            param : 1
        }
    };

    var tracer = initTracer(config, options);
    initializeAgent(tracer);
};

agent.on('return', initializeJaeger, {
    roots: true,
    rootNameFilter: name => name === 'jaegerAvailable'
});
