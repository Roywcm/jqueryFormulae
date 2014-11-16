Installation and usage
======================
Small plugin for building formulas with your own static values like product and shipping pricing. You can add multiple select options with integer values to build a formula on.

Installation: Bower
===================
```
bower install jquery-formulae
```

Add depencies
=============
Javascript

```
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"><script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"><script>
    <script src="/path/to/formulae/dist/jquery.formulae.js"><script>
```

Stylesheets

```
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="src/jquery.formulae.css"  media='all'/>
```

Setup Formulae
==============
```
    <div id="formulae"></div>
```

Add formulae with this code:
```
    $("#formulae").jqueryFormulae();
```

Options:
========
Add a select input form:
```
    $("#formula").jqueryFormulae({
        inputs: [
            {
                'name':'Shipping',
                'class': 'shipping',
                'type':'select',
                'values': {
                    1 : {'label':'Shipping 1 (€ 10,-)', 'value': 10},
                        2 : {'label':'Shipping 2 (€ 20,-)', 'value': 20},
                        3 : {'label':'Shipping 3 (€ 30,-)', 'value': 30},
                        4 : {'label':'Shipping 4 (€ 40,-)', 'value': 40}
                }
            }
        ]
    });
```
Defaults
==========
```
    wrapper: "<ul class=\"jqueryFormulae\"></ul>",
    items: "li",
    newMsg: "<span class=\"glyphicon glyphicon-plus\">",
    removeicon: "glyphicon glyphicon-remove-circle",
    popoverPlacement: "auto bottom",
    inputs: {},
    defaultinputs: [
        {
            "name": "custom",
            "type": "number",
            "class": "custom"
        }
    ],
    math: [
        {"label": "<span class=\"glyphicon glyphicon-plus\"></span>", "value": "+"},
        {"label": "<span class=\"glyphicon glyphicon-minus\"></span>", "value": "-"},
        {"label": "<span class=\"glyphicon glyphicon-remove\"></span>", "value": "*"}
    ]
```