agent.on('source', function(ev) {
    print(`Loaded ${ev.characters.length} chars from ${ev.name}.`);
});
