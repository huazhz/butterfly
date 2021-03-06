/**
 * @fileoverview html 属性规则工厂
 * @author 张挺 <zhangting@taobao.com>
 *
 */
KISSY.add('gallery/form/1.3/auth/rule/ruleFactory', function (S, Node,Base, PropertyRule, Rule, undefined) {
    var $ = S.Node.all;
    var RuleFactory = function () {
        var self = this;

        RuleFactory.superclass.constructor.call(self);
    };

    RuleFactory.rules = {};

    //第一个参数一定是属性的value，后面的才是真正的参数
    S.mix(RuleFactory.rules, {
        required:function (pv, value,field) {
            var uploader = field.get('uploader');
            if(uploader){
                //异步文件上传 required验证的特殊处理
                return uploader.testRequired();
            }else{
                if(S.isArray(value)) {
                    return value.length>0;
                }
                return !!value;
            }
        },
        pattern:function (pv, value) {
            return new RegExp(pv).test(value);
        },
        max:function (pv, value,field) {
            var uploader = field.get('uploader');
            if(uploader){
                //异步文件上传max验证的特殊处理
                return uploader.testMax();
            }else{
                if (!S.isNumber(value)) {
                    return false;
                }
                return value <= pv;
            }
        },
        min:function (pv, value) {
            if (!S.isNumber(value)) {
                return false;
            }
            return value >= pv;
        },
        step:function (pv, value) {
            if (!S.isNumber(value)) {
                return false;
            }
            if(value == 0 || pv == 1) return true;

            return value % pv;
        },
        //添加1个特殊的属性
        equalTo:function(pv, value){
            //number same
            if (S.isNumber(value)) {
                return pv === value;
            }

            //selector same
            if(S.one(pv)) {
                return S.one(pv).val() === value;
            }

            //string same
            return pv === value;
        }
    });

    S.mix(RuleFactory, {
        HTML_PROPERTY:['required', 'pattern', 'max', 'min', 'step', 'equalTo'],
        register:function(name, rule) {
            RuleFactory.rules[name] = rule;
        },
        /**
         * 实例化Rule类
         * @param {String} ruleName 规则名称
         * @param  {Object} cfg 配置
         * @return {*}
         */
        create:function (ruleName, cfg) {
            if(!cfg.msg) cfg.msg = {};
            if(S.inArray(ruleName, RuleFactory.HTML_PROPERTY)) {
                return new PropertyRule(ruleName, RuleFactory.rules[ruleName], cfg);
            } else if(RuleFactory.rules[ruleName]) {
                return new Rule(ruleName, RuleFactory.rules[ruleName], cfg);
            }
            return undefined;
        }
    });

    return RuleFactory;

}, {
    requires:[
        'node',
        'base',
        './html/propertyRule',
        './rule'
    ]
});