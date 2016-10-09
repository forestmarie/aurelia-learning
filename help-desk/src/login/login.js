import {inject} from 'aurelia-dependency-injection';
import {Aurelia} from 'aurelia-framework';
import {Server, User} from 'backend/server';

@inject(Aurelia, Server)
export class Login {
  constructor(aurelia, server) {
    this.aurelia = aurelia;
    this.server = server;
    this.username = 'un';
    this.password = 'pw';
    this.message = '';
  }

  login() {
    this.server.login(this.username, this.password).then(result => {
      if (result) {
        this.message = 'Login Succeeded';
        // Push User instance into the container.
        this.aurelia.use.instance(User, result);
        // Now that we're logged in, we're re-setting the root to the shell
        this.aurelia.setRoot('shell/shell');
      } else {
        this.message = 'Incorrect Username or Password!';
      }
    });
  }
}
