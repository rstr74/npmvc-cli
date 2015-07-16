## commandline code generator for PureMVC in node.js

### install

```
npm install npmvc-cli -g
```

### uninstall

```
npm uninstall npmvc-cli -g
```

## Usage
First create the directory for a new node module project:

```
╰─➤mkdir mynodemodule
╰─➤cd mynodemodule
```

Now create the package.json with npm.

```
╰─➤npm init
```


Then create a 'namespace' property somewhere in the package.json.
For example:

```
"namespace":"com.mydomain"
```
Please note that the templating engine uses package.json
to lookup namespace, author and email properties. So be sure
they are there and not empty.

Install PureMVC for node.js

```
╰─➤npm install npmvc
```

Use the commandline to generate the boilerplate code:

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

```
npmvc-cli boilerplate
```

#### Single Class generation

npmvc-cli [Class]

for example:

```
npmvc-cli Mediator
```

For [Class] you can fill in:

* Service
* Mediator
* ValueObject
* Proxy
* Commands
* Constants
* Facade
* MacroCommand
* SimpleCommand

## Change Templates

The templates are located in the npmcv-cli module, in the folders
'template' and 'boilerplate'.

# License:

The MIT License

Copyright (c) 2015 Robbert Streng

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.