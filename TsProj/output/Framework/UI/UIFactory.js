"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIDefine_1 = require("./UIDefine");
const UILoginPage_1 = require("../../game/Modules/Login/UI/UILoginPage");
const CS = require('csharp');
class UIFactory {
    static createUI(pkg, name) {
        let comp = CS.FairyGUI.UIPackage.CreateObject(pkg, name).asCom;
        let ui = null;
        if (name == UIDefine_1.UINames.UILoginPage) {
            ui = new UILoginPage_1.UILoginPage();
        }
        if (ui != null) {
            ui.fui = comp;
            ui.name = name;
            ui.awake();
        }
        return ui;
    }
}
exports.UIFactory = UIFactory;
//# sourceMappingURL=UIFactory.js.map