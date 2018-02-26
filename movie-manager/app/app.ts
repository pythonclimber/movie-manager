import "./bundle-config";
import application = require('application');
import * as navigationModule from './shared/navigation';

let mainModule = navigationModule.startingPage();
application.setCssFileName('app.css');
application.start({ moduleName: mainModule, backstackVisible: false });