import "./bundle-config";
import {Application } from "@nativescript/core"

Application.setCssFileName('app.css');
Application.run({ moduleName: 'app-root', backstackVisible: false });