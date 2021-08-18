import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import cp = require('child_process');
import fs = require('fs');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/coverage.x')
  getCoverage(@Res() res: Response): void {
    // generate coverage files and redirect to coverage/index.html
    const cov = global['__coverage__'];
    if (!cov) {
      res.send('nyc not configured right');
      return;
    }

    // make directory
    cp.execSync('mkdir -p .nyc_output');

    // write cov to file
    const fd = fs.openSync('.nyc_output/out.json', 'w', '0666');
    fs.writeSync(fd, JSON.stringify(cov));
    fs.closeSync(fd);

    // generate coverages
    cp.execSync('./node_modules/.bin/nyc report --reporter=html');
    res.redirect('/coverage/index.html');
  }
}
