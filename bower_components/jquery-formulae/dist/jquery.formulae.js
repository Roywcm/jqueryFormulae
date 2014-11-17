/*
 *  jQuery formulae - v0.0.1
 *  Build formula's with static values.
 *  #
 *
 *  Made by Roy Wulms
 *  Under MIT License
 */
(function ($, window, document, undefined) {

    var pluginName = "jqueryFormulae",
            defaults = {
                wrapper: "<ul class=\"jqueryFormulae\"></ul>",
                items: "li",
                newMsg: "<span class=\"glyphicon glyphicon-plus\">",
                removeicon: "glyphicon glyphicon-remove-circle",
                popoverPlacement: "auto bottom",
                inputs: {},
                defaultinputs: {
                    "number": {
                        "label": "custom",
                        "type": "number",
                        "class": "custom"
                    }
                },
                math: [
                    {"label": "<span class=\"glyphicon glyphicon-plus\"></span>", "value": "+"},
                    {"label": "<span class=\"glyphicon glyphicon-minus\"></span>", "value": "-"},
                    {"label": "<span class=\"glyphicon glyphicon-remove\"></span>", "value": "*"}
                ]
            };

    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        /**
         * Initialise project
         * 
         */
        init: function () {
            this.wrapper = $(this.options.wrapper);
            this.createBuilder();
        },
        /**
         * 
         * build action link
         */
        createBuilder: function () {
            //var items = $(this.options.items);
            var items = this.itemsBuilder(this.options.items);
            this.newlink = $("<a class=\"btn btn-default\">" + this.options.newMsg + "</a>")
                    .popover({
                        html: true,
                        placement: this.options.popoverPlacement,
                        content: this.addAction()
                    });

            $(this.element).html(this.wrapper.html(items.append(this.newlink)));
        },
        /**
         * returning action in popover 
         * @returns string
         */
        addAction: function () {
            var html, inputs;
            html = $("<ul></ul>").addClass("action-overview");
            inputs = $.extend({},this.options.defaultinputs, this.options.inputs);
            $.each(inputs, $.proxy(function (i, input) {
                var link = $("<a class=\"addAction\"></a>").html(input.label).on("click", $.proxy(function () {
                    $(this.newlink).popover("hide");
                    if (this.wrapper.children("li").length > 1) {
                        $(this.newlink).parent(this.options.items).before(this.mathBuilder());
                    }
                    $(this.newlink).parent(this.options.items).before(this.inputBuilder(input));
                }, this));
                html.append($("<li></li>").html(link));
            }, this));
            return html;
        },
        /**
         * returning formula operators in popovers
         * @param object element
         * @param input
         * @returns string
         */
        operatorsHtml: function (element, input) {
            var html, operator;
            html = $("<ul></ul>").addClass("operator-overview");
            $.each(this.options.math, $.proxy(function (i, maths) {
                var link = $("<a class=\"addMath\" data-operator =\"" + i + "\"></a>").html(maths.label)
                        .on("click", $.proxy(function (e) {
                            operator = $(e.currentTarget).attr("data-operator");
                            this.saveOperators($(e.currentTarget), element, operator, input);
                        }, this));
                html.append($("<li></li>").html(link));
            }, this));
            return html;
        },
        /**
         * Save operator to formula
         * @param object linkElement
         * @param  object operatorElement
         * @param object input
         */
        saveOperators: function (linkElement,operatorElement,  operator, input) {
            linkElement.closest("div.popover").popover("hide");
            $(operatorElement).html(this.options.math[operator].label);
            $(input).val(this.options.math[operator].value);
        },
        /**
         * Build formula format
         * @param object items
         * @returns string
         */
        itemsBuilder: function (items) {
            var html = "";
            switch (items) {
                case "li":
                    html = $("<li class=\"formulae-item\"></li>");
                    break;
                case "div":
                    html = $("<div class=\"formulae-item\"></div>");
                    break;
            }
            return html;
        },
        /**
         * returing formula items
         * @param object element
         * @returns string
         */
        inputBuilder: function (element) {
            var wrapper, inputgroup, inputhtml, removeItem, html;
            wrapper = this.itemsBuilder(this.options.items);
            inputhtml = "";
            switch (element.type) {
                case "number":
                    inputhtml = $("<input class=\"form-control\" type=\"number\" name=\"math[value]\"></input>");
                    break;
                case "select":
                    inputhtml = $("<select class=\"form-control\" name=\"math[value]\"></select>");
                    $.each(element.values, function (i, option) {
                        var optionTemplate = $("<option></option>").attr("value", option.value).html(option.label);
                        inputhtml.append(optionTemplate);
                    });
                    break;
            }
            removeItem = this.removeFormulaItem();
            inputgroup = $("<div></div>").addClass("input-group").append(inputhtml,removeItem);
            html = wrapper.addClass(element.class).html(inputgroup);
            return html;
        },
        /**
         * returning formula operators
         * @returns string
         */
        mathBuilder: function () {
            var wrapper, mathlink, mathinput;
            wrapper = this.itemsBuilder(this.options.items);
            mathlink = $("<a></a>").addClass("mathBuilder").html(this.options.math[0].label);
            mathinput = $("<input type=\"hidden\" name=\"math[formula]\">").val(this.options.math[0].value);
            mathlink.popover({
                html: true,
                placement: this.options.popoverPlacement,
                content: this.operatorsHtml(mathlink, mathinput)
            });
            return wrapper.addClass("operator").html(mathlink).append(mathinput);
        },
        removeFormulaItem: function () {
            var html, link, addon;
            addon = $("<span class=\"input-group-addon\">");
            link = $("<a></a>").addClass("removelink").append("<i class=\""+this.options.removeicon+"\"></i>")
                    .on("click", function () {
                        var parent, prevOperator;
                        parent = $(this).closest("li");
                        prevOperator = parent.prev("li.operator");
                        if(prevOperator.length === 0){
                            parent.next("li.operator").remove();
                        } else {
                            prevOperator.remove();
                        }
                        parent.remove();
                    });
            html = addon.append(link);
            return html;
        }
    };


    $.fn[ pluginName ] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);
