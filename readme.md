# commandline boilerplate PureMVC for node.js


### install

```
npm install npmvc-cli -g
```

### uninstall

```
npm uninstall npmvc-cli -g
```


When installed you can use it like this
```
╰─➤npm init
╰─➤npm install npmvc
```

Now add a 'namespace' property to the package.json like:
```
"namespace":"com.mydomain"
```

```
╰─➤npmvc-cli boilerplate
╰─➤npmvc-cli Proxy                
Running "templating:Proxy" (templating) task
Set class name for model/Proxy.js
prompt: classname:  TestProxy
```


Now you can use the generated code!
```
╰─➤node index.js
```

# npmvc-cli options:

boilerplate

## Single Class generation
Service
Mediator
ValueObject
Proxy
Commands
Constants
Facade
MacroCommand
SimpleCommand