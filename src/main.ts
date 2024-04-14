import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { environment } from "./environments/environment"
import { AppComponent } from './app/app.component';

if(environment.production){
  window.console.log = () => {}
  window.console.error = () => {}
  window.console.warn = () => {}
  window.console.info = () => {}
  window.console.assert = () => {}
  window.console.debug = () => {}

}

bootstrapApplication(AppComponent, appConfig)  
  .catch((err) => console.error(err));
