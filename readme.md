# commandline boilerplate PureMVC for node.js


### install

```
npm install npmvc-cli -g
```

### uninstall

```
npm uninstall npmvc-cli -g
```


When installed you can use it like this:

create directory for a new module:
```
╰─➤mkdir mynodemodule
╰─➤cd mynodemodule
╰─➤npm init
╰─➤npm install npmvc
```

Now add a 'namespace' property to the package.json
```
"namespace":"com.mydomain"
```


Use commandline to generate code:
```
╰─➤npmvc-cli boilerplate
```


Use npmvc-cli ClassName (see below for options) for example a Proxy class:
Then it asks for the Class name that has to be extended.
```
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

#### basic Startup project
npmvc-cli boilerplate

#### Single Class generation
npmvc-cli [Class]

For [Class] you can fill in:
Service
Mediator
ValueObject
Proxy
Commands
Constants
Facade
MacroCommand
SimpleCommand