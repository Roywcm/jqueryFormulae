jqueryFormulae
==============
Build formulas with jquery

Small plugin for building formulas with your own depencies like sensor values. 
You can add  multiple select options with integer values to build a formula on.

Installation:
Bower
```
bower install jquery-formulae
```

Add this in your project

```
<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>

<script src="dist/jquery.formulae.js"></script>

<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="src/jquery.formulae.css"  media='all'/>
```

Just ad a placeholder in your html like this:

```
<div id="formulae"></div>
```

Add formulae with this code:

```
$("#formulae").jqueryFormulae();
```

Options:

Add a select input form:

```
$("#formula").jqueryFormulae({
    inputs: [
        {
            'name':'sensors',
            'class': 'sensorselect',
            'type':'select',
            'values': {
                1 : {'label':'sensor1', 'value': 100},
                2 : {'label':'sensor2', 'value': 200},
                3 : {'label':'sensor3', 'value': 300},
                4: {'label': 'sensor4', 'value': 400}
            }
        }
    ]
});
```
